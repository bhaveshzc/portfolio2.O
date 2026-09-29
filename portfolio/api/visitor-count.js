import { Redis } from "@upstash/redis";

export default async function handler(req, res) {
  // Set CORS and prevent caching so the count is always live
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Content-Type", "application/json");

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    // Graceful fallback if Upstash environment variables are not configured yet
    return res.status(200).json({
      count: 35,
      note: "Setup UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in Vercel to activate live counting."
    });
  }


  try {
    const redis = new Redis({
      url: url,
      token: token,
    });

    // Atomically increment the portfolio visitor counter
    const count = await redis.incr("portfolio:visitors");

    return res.status(200).json({ count });
  } catch (error) {
    console.error("Error updating visitor count:", error);
    return res.status(500).json({ error: "Failed to update visitor count" });
  }
}
