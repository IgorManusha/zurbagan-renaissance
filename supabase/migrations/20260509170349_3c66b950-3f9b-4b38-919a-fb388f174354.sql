
ALTER FUNCTION public.touch_updated_at() SET search_path = public;
ALTER FUNCTION public.handle_new_user() SET search_path = public;
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, app_role) FROM public, anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_updated_at() FROM public, anon, authenticated;

-- Tighten always-true policies
DROP POLICY "Anyone can submit application" ON public.applications;
CREATE POLICY "Anyone can submit application" ON public.applications
  FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'new');

-- Seed initial site settings
INSERT INTO public.site_settings (key, enabled) VALUES
  ('telegram', false),
  ('news_block', true),
  ('services_block', true),
  ('tariffs_block', true),
  ('speedtest_block', true)
ON CONFLICT (key) DO NOTHING;
