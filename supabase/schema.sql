-- ============================================================================
-- Zurbagan website — full database schema
-- ----------------------------------------------------------------------------
-- This file is a self-contained snapshot of every migration in
-- supabase/migrations/. Apply it once on a fresh Supabase project to get an
-- identical backend (tables, RLS policies, functions, triggers, storage).
--
-- How to apply on a new Supabase project:
--   1. Create a new project at https://supabase.com
--   2. Open SQL Editor → paste the contents of this file → Run
--   3. (Optional) Verify storage bucket `application-docs` was created in
--      Storage → Buckets
-- ============================================================================

-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins view all roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Auto-grant admin to the first registered user; user role to others
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  user_count INT;
BEGIN
  SELECT COUNT(*) INTO user_count FROM auth.users;
  IF user_count <= 1 THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Applications (connection requests)
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  last_name TEXT,
  phone TEXT NOT NULL,
  region TEXT,
  district TEXT,
  city TEXT,
  street TEXT,
  house TEXT,
  apartment TEXT,
  address TEXT,
  message TEXT,
  tariff TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  documents JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit application" ON public.applications
  FOR INSERT TO anon, authenticated WITH CHECK (status = 'new');
CREATE POLICY "Admins read applications"   ON public.applications FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update applications" ON public.applications FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete applications" ON public.applications FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- News
CREATE TABLE public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads published news" ON public.news FOR SELECT USING (published = true);
CREATE POLICY "Admins read all news" ON public.news FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage news"   ON public.news FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER news_updated BEFORE UPDATE ON public.news
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Site settings (boolean toggles for header/page blocks)
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  enabled BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads settings"   ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins manage settings"  ON public.site_settings FOR ALL USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.site_settings (key, enabled) VALUES
  ('telegram', false),
  ('news_block', true),
  ('services_block', true),
  ('tariffs_block', true),
  ('speedtest_block', true),
  ('connection_block', true),
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
  ('header_socials', true)
ON CONFLICT (key) DO NOTHING;

-- Site content (editable JSON blocks for brand, contacts, requisites, links)
CREATE TABLE public.site_content (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads content"  ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admins manage content" ON public.site_content FOR ALL
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER site_content_touch BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

INSERT INTO public.site_content (key, value) VALUES
  ('brand', '{"name":"ЗУРБАГАН","tagline":"Internet · TV","description":"Оператор кабельного ТБ та інтернет-провайдер у Конотопі. Понад 30 років на ринку.","footer_tagline":"Світ інформації та розваг","years":"30+"}'::jsonb),
  ('contacts', '{"phones":["067 300 22 00","066 300 22 00","073 200 22 00"],"primary_phone":"067 300 22 00","email":"info@zurbagan.tv","address":"м. Конотоп, Сумська обл.","schedule":"Пн–Пт: 9:00–18:00","schedule_note":"Перерва 13:00–14:00 · Сб–Нд: вихідні"}'::jsonb),
  ('requisites', '{"iban":"UA393052990000026005045201817","bank":"АТ КБ «ПРИВАТБАНК»","recipient":"ТОВ «Зурбаган»","notice":"Шановні абоненти, які поповнюють рахунок не з Приват24: оплата здійснюється на новий розрахунковий рахунок UA393052990000026005045201817, відкритий в АТ КБ «ПРИВАТБАНК»."}'::jsonb),
  ('links', '{"cabinet":"https://abadm.kntv.sumy.ua:9443/","facebook":"https://www.facebook.com/profile.php?id=100041707791128","viber":"viber://chat?number=%2B380673002200","telegram":"https://t.me/zurbagan_super_bot","speedtest":"https://speedtest.org.ua/ua/site/index"}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Storage: private bucket for uploaded passport / tax-id photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('application-docs', 'application-docs', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can upload application docs" ON storage.objects FOR INSERT
  TO anon, authenticated WITH CHECK (bucket_id = 'application-docs');
CREATE POLICY "Admins read application docs" ON storage.objects FOR SELECT
  TO authenticated USING (bucket_id = 'application-docs' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete application docs" ON storage.objects FOR DELETE
  TO authenticated USING (bucket_id = 'application-docs' AND public.has_role(auth.uid(), 'admin'));

-- Hardening: hide internal helpers from public role
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, app_role)        FROM public, anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user()               FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_updated_at()              FROM public, anon, authenticated;
