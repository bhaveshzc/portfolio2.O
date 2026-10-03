import { createClient } from "@supabase/supabase-js";
import * as cookie from "cookie";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

let supabase = null;

const getSupabase = () => {
  if (!supabase) {
    let supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase credentials in process.env!");
    }
    if (supabaseUrl) {
      supabaseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
    }
    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
};

const COOKIE_NAME = "anon_visitor_id";
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // Max 30 requests per minute

export default async function handler(req, res) {
  // CORS Configuration
  const allowedOrigins = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(",")
    : [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
        "http://localhost:3000",
      ];
  
  const origin = req.headers.origin;
  if (origin) {
    if (process.env.NODE_ENV !== "production" || allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
    }
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-visitor-id");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 1. IP-based Rate Limiting (Serverless compatible via DB)
    let ip = req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || req.socket?.remoteAddress || "unknown-ip";
    if (typeof ip === 'string') {
        ip = ip.split(',')[0].trim();
    }
    
    const supabase = getSupabase();
    if (ip !== "unknown-ip") {
      const { data: rlData, error: rlError } = await supabase.rpc('check_rate_limit', {
        client_ip: ip,
        max_requests: MAX_REQUESTS_PER_WINDOW,
        window_seconds: RATE_LIMIT_WINDOW_MS / 1000
      });
      
      if (!rlError && rlData === false) {
        return res.status(429).json({ error: "Too many requests" });
      }
    }

    // 2. Identify Anonymous Visitor
    // Check both HttpOnly cookie and x-visitor-id header (localStorage backup)
    const cookies = cookie.parseCookie(req.headers.cookie || "");
    const headerVisitorId = req.headers["x-visitor-id"];

    const isValidUUID = (id) =>
      typeof id === "string" &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    let visitorId = null;
    let isNewVisitor = false;

    if (cookies[COOKIE_NAME] && isValidUUID(cookies[COOKIE_NAME])) {
      visitorId = cookies[COOKIE_NAME];
    } else if (headerVisitorId && isValidUUID(headerVisitorId)) {
      visitorId = headerVisitorId;
    } else {
      visitorId = uuidv4();
      isNewVisitor = true;
    }

    // 3. Database Interaction
    let uniqueVisitors = 0;
    
    if (isNewVisitor) {
      // Attempt atomic insert.
      const { error } = await supabase
        .from("visitors")
        .insert([{ visitor_id: visitorId }])
        .select();

      if (error) {
        if (error.code === '23505') { // Unique violation, visitor already exists
          isNewVisitor = false;
        } else {
          console.error("Database Insert Error:", error);
        }
      }
    } else {
      // Update last_seen asynchronously
      supabase
        .from("visitors")
        .update({ last_seen: new Date().toISOString() })
        .eq('visitor_id', visitorId)
        .then(({ error }) => {
          if (error) console.error("Database Update Error:", error);
        });
    }

    // Get total count
    const { count, error: countError } = await supabase
      .from("visitors")
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error("Error fetching count:", countError.message);
      return res.status(500).json({ error: "Unable to retrieve count" });
    }

    uniqueVisitors = count || 0;
    const baseCount = parseInt(process.env.BASE_VISITOR_COUNT || "100", 10);
    const displayedCount = baseCount + uniqueVisitors;

    // 4. Set Secure Cookie with correct cookie@2.0.1 stringifySetCookie
    const cookieStr = cookie.stringifySetCookie({
      name: COOKIE_NAME,
      value: visitorId,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365 * 10, // 10 years
      path: "/",
    });
    res.setHeader("Set-Cookie", cookieStr);

    // 5. Return count and visitorId for dual client-side persistence
    return res.status(200).json({ count: displayedCount, visitorId });

  } catch (error) {
    console.error("Visitor count error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
