
-- Create auto_posts table to log all Facebook auto-posts
CREATE TABLE public.auto_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  topic TEXT,
  tags TEXT[],
  facebook_post_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'posted', 'failed')),
  error_message TEXT,
  posted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.auto_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read for displaying in the app
CREATE POLICY "Anyone can view auto posts"
ON public.auto_posts
FOR SELECT
USING (true);

-- Only service role can insert/update (edge functions)
CREATE POLICY "Service role can manage auto posts"
ON public.auto_posts
FOR ALL
USING (true)
WITH CHECK (true);

-- Index for faster queries
CREATE INDEX idx_auto_posts_status ON public.auto_posts(status);
CREATE INDEX idx_auto_posts_created_at ON public.auto_posts(created_at DESC);

-- Enable pg_cron and pg_net for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
