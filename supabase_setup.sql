-- 1. Create the visitors table
CREATE TABLE visitors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id uuid UNIQUE NOT NULL,
  first_seen timestamptz DEFAULT now(),
  last_seen timestamptz DEFAULT now()
);

-- 2. Create the rate_limits table
CREATE TABLE rate_limits (
  ip_address text PRIMARY KEY,
  request_count int DEFAULT 1,
  last_request timestamptz DEFAULT now()
);

-- 3. Enable Row Level Security (RLS) on visitors table
-- We only want the backend to interact with these tables.
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- (No policies are created, meaning the public frontend via Anon Key cannot read/write directly.
-- The backend uses the SERVICE_ROLE_KEY to bypass RLS.)

-- 4. Create the rate limiting stored procedure
CREATE OR REPLACE FUNCTION check_rate_limit(client_ip text, max_requests int, window_seconds int)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_requests int;
BEGIN
  -- Cleanup old limits to prevent table bloat
  DELETE FROM rate_limits WHERE last_request < now() - (window_seconds || ' seconds')::interval;

  -- Insert new IP or update existing
  INSERT INTO rate_limits (ip_address, request_count, last_request)
  VALUES (client_ip, 1, now())
  ON CONFLICT (ip_address) DO UPDATE
  SET 
    request_count = CASE 
      WHEN rate_limits.last_request < now() - (window_seconds || ' seconds')::interval THEN 1
      ELSE rate_limits.request_count + 1 
    END,
    last_request = now()
  RETURNING request_count INTO current_requests;

  IF current_requests > max_requests THEN
    RETURN false;
  END IF;

  RETURN true;
END;
$$;
