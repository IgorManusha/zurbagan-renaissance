
-- 1. Extend applications table
ALTER TABLE public.applications
  ADD COLUMN IF NOT EXISTS last_name text,
  ADD COLUMN IF NOT EXISTS region text,
  ADD COLUMN IF NOT EXISTS district text,
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS street text,
  ADD COLUMN IF NOT EXISTS house text,
  ADD COLUMN IF NOT EXISTS apartment text,
  ADD COLUMN IF NOT EXISTS documents jsonb NOT NULL DEFAULT '[]'::jsonb;

-- Allow new status values via free-text status; no enum change needed (status is text).
-- Document allowed: new, queue, done, rejected, no_option, postponed, kk

-- 2. Header / block toggles in site_settings
INSERT INTO public.site_settings (key, enabled) VALUES
  ('header_home', true),
  ('header_tariffs', true),
  ('header_services', true),
  ('header_payment', true),
  ('header_instructions', true),
  ('header_support', true),
  ('header_contacts', true),
  ('header_cabinet_btn', true),
  ('header_admin_btn', true),
  ('header_phone', true),
  ('header_socials', true),
  ('connection_block', true),
  ('news_block', true)
ON CONFLICT (key) DO NOTHING;

-- 3. Storage bucket for application documents (private)
INSERT INTO storage.buckets (id, name, public)
VALUES ('application-docs', 'application-docs', false)
ON CONFLICT (id) DO NOTHING;

-- Anyone (anon) can upload (write) into the bucket; only admins can read/delete.
DROP POLICY IF EXISTS "Public can upload application docs" ON storage.objects;
CREATE POLICY "Public can upload application docs"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'application-docs');

DROP POLICY IF EXISTS "Admins read application docs" ON storage.objects;
CREATE POLICY "Admins read application docs"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'application-docs' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins delete application docs" ON storage.objects;
CREATE POLICY "Admins delete application docs"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'application-docs' AND public.has_role(auth.uid(), 'admin'));
