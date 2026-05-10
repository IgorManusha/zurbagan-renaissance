CREATE TABLE IF NOT EXISTS public.site_content (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone reads content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admins manage content" ON public.site_content FOR ALL
  USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE TRIGGER site_content_touch BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

INSERT INTO public.site_content (key, value) VALUES
  ('brand', '{"name":"ЗУРБАГАН","tagline":"Internet · TV","description":"Оператор кабельного ТБ та інтернет-провайдер у Конотопі. Понад 30 років на ринку.","footer_tagline":"Світ інформації та розваг","years":"30+"}'::jsonb),
  ('contacts', '{"phones":["067 300 22 00","066 300 22 00","073 200 22 00"],"primary_phone":"067 300 22 00","email":"info@zurbagan.tv","address":"м. Конотоп, Сумська обл.","schedule":"Пн–Пт: 9:00–18:00","schedule_note":"Перерва 13:00–14:00 · Сб–Нд: вихідні"}'::jsonb),
  ('requisites', '{"iban":"UA393052990000026005045201817","bank":"АТ КБ «ПРИВАТБАНК»","recipient":"ТОВ «Зурбаган»","notice":"Шановні абоненти, які поповнюють рахунок не з Приват24: оплата здійснюється на новий розрахунковий рахунок UA393052990000026005045201817, відкритий в АТ КБ «ПРИВАТБАНК»."}'::jsonb),
  ('links', '{"cabinet":"https://abadm.kntv.sumy.ua:9443/","facebook":"https://www.facebook.com/profile.php?id=100041707791128","viber":"viber://chat?number=%2B380673002200","telegram":"https://t.me/zurbagan_super_bot","speedtest":"https://speedtest.org.ua/ua/site/index"}'::jsonb)
ON CONFLICT (key) DO NOTHING;