# Перенесення фронтенду на zurbagan.tv

Цей фронтенд побудовано як самостійний SPA на TanStack Start (React 19 + Vite 7). Він повністю замінює існуючу фронтенд-частину `zurbagan.tv` без залежностей від бекенду цього сайту, окрім легкого API адмін-панелі.

## Що включено
- Сторінки: Головна, Послуги, Тарифи, Інструкції, Підтримка, Оплата, Контакти, Публічна оферта
- Хедер з кнопками **Особистий кабінет** (`https://abadm.kntv.sumy.ua:9443/`) та **Адмін** (іконка-щит)
- Адмін-панель `/admin` (заявки, новини, перемикачі блоків сайту)
- Форма заявки → зберігається у БД (Lovable Cloud / Supabase)
- Toggle Telegram (за замовчуванням приховано)
- SpeedTest блок (speedtest.org.ua + speedtest.net)
- Facebook + Viber у футері
- "30+ років на ринку"

## Як замінити фронтенд zurbagan.tv

### Варіант 1 — статичний хостинг (рекомендовано, найпростіше)
1. Виконати білд:
   ```bash
   bun install
   bun run build
   ```
2. Завантажити папку `dist/` на ваш веб-сервер (Nginx / Apache) у корінь сайту `zurbagan.tv`.
3. У Nginx додати fallback для SPA-маршрутів:
   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```
4. SSL та домен — без змін.

### Варіант 2 — через Lovable Hosting
Натисніть **Publish** у Lovable → отримаєте `*.lovable.app` → додайте custom domain `zurbagan.tv`.

## Конфігурація під вашу інфраструктуру

| Що | Де змінити |
|---|---|
| Телефони | `src/components/site-header.tsx`, `site-footer.tsx`, `routes/contacts.tsx`, `support.tsx` |
| Email | `site-footer.tsx`, `contacts.tsx` |
| Посилання на ОК | `site-header.tsx` (`https://abadm.kntv.sumy.ua:9443/`) |
| Реквізити для оплати | `routes/payment.tsx`, `routes/instructions.tsx` |
| Telegram-бот | `routes/support.tsx` + увімкнути в адмінці |
| Тарифи | `routes/tariffs.tsx` (масиви `ethernet`, `gponCity`, `gponRural`, `businessPlans`) |
| Адреса розрах. рахунку | пошук `UA393052990000026005045201817` |
| Логотип | `src/assets/logo.png` |
| Кольори / шрифти | `src/styles.css` |

## База даних / адмінка

Адмінка та форма заявок використовують Lovable Cloud (Supabase під капотом). Якщо ви хочете перенести адмінку на ваш власний MySQL/PHP-бекенд:

1. Замініть виклики `supabase.from(...)` у файлах:
   - `src/components/application-form.tsx`
   - `src/routes/admin.tsx`
   - `src/hooks/use-settings.ts`
   - `src/hooks/use-auth.ts`
2. Створіть на вашому бекенді еквівалентні endpoints (REST/GraphQL) для таблиць `applications`, `news`, `site_settings`, `user_roles`.

## Перший адмін
Перейдіть на `/login`, зареєструйтеся — перший зареєстрований акаунт автоматично стає адміністратором.
