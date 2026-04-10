
-- Drop the permissive policy
DROP POLICY "Service role can manage auto posts" ON public.auto_posts;

-- Service role bypasses RLS anyway, so no explicit write policy needed
-- The SELECT policy for public read remains
