# Zurbagan — website (React + Supabase)

Production website for ЗУРБАГАН (cable TV / internet provider in Konotop).
The codebase is a standalone React + TypeScript app powered by [TanStack
Start](https://tanstack.com/start) (Vite + React 19 + file-based routing,
SSR-ready) and a Supabase backend.

The project has **no Lovable Cloud lock-in**: every backend resource lives in
your own Supabase project, every secret comes from `.env`, and the build
runs on any standard host (Vercel, Netlify, Cloudflare Pages, or your own
Node server).

---

## Tech stack

- **Frontend**: React 19, TypeScript, Vite 7, Tailwind CSS v4
- **Routing**: TanStack Router (file-based, see `src/routes/`)
- **Backend**: Supabase (Postgres + Auth + Storage)
- **UI**: shadcn/ui (Radix primitives) + custom design tokens in `src/styles.css`

---

## Project structure

```
src/
├── assets/              static images and logos imported by components
├── components/          presentational + feature components (header, footer,
│                        admin form, site widgets, ui/ for shadcn primitives)
├── hooks/               React hooks (use-auth, use-settings, use-content, ...)
├── integrations/
│   └── supabase/        auto-generated Supabase client + types (do not edit)
├── lib/                 framework-agnostic utilities and seed data
├── routes/              TanStack Start file-based pages (one file = one URL)
├── services/
│   └── supabase.ts      single re-export — import supabase from here
└── styles.css           Tailwind v4 theme tokens

supabase/
├── schema.sql           full schema snapshot — apply on any new project
└── migrations/          historical migrations
```

> **Routing note** — TanStack Start uses file-based routes under `src/routes/`.
> A `src/pages/` directory is intentionally absent; pages live in `src/routes/`
> (e.g. `services.tsx`, `news.$slug.tsx`). The router file is `src/router.tsx`.

---

## Environment variables

Copy `.env.example` to `.env` and fill in the values from
**Supabase Dashboard → Project Settings → API**:

| Variable                          | Where to get it                | Notes                          |
| --------------------------------- | ------------------------------ | ------------------------------ |
| `VITE_SUPABASE_URL`               | Project URL                    | exposed to browser (safe)      |
| `VITE_SUPABASE_PUBLISHABLE_KEY`   | `anon` / `publishable` key     | exposed to browser (safe; RLS) |
| `VITE_SUPABASE_PROJECT_ID`        | the `ref` in the project URL   | exposed to browser (safe)      |
| `SUPABASE_URL`                    | same as above                  | server/SSR mirror              |
| `SUPABASE_PUBLISHABLE_KEY`        | same as above                  | server/SSR mirror              |

⚠️ Never put `SUPABASE_SERVICE_ROLE_KEY` in this `.env` file or in any
`VITE_*` variable. The browser bundle never needs it; only server-only code
does.

---

## Local development

```bash
# 1. Install
bun install      # or: npm install / pnpm install

# 2. Configure
cp .env.example .env
# fill in your Supabase URL + publishable key

# 3. Run
bun run dev      # http://localhost:8080
```

The dev server runs on the port configured by Vite (defaults to 8080 in this
template).

---

## Connecting to a different Supabase project

The app talks to Supabase **only** through the values in `.env` plus the
auto-generated client in `src/integrations/supabase/client.ts`. To migrate to
a brand-new Supabase account:

1. Create a new project at <https://supabase.com>.
2. Open **SQL Editor** → paste the contents of `supabase/schema.sql` → **Run**.
   This recreates every table, RLS policy, function, trigger and the
   `application-docs` storage bucket.
3. Copy the new project URL and publishable key into your `.env`.
4. (Optional) Regenerate the typed Supabase client locally:
   ```bash
   npx supabase gen types typescript \
     --project-id <new-project-id> --schema public \
     > src/integrations/supabase/types.ts
   ```
5. Restart the dev server / redeploy. **Done.**

The first user that signs up via `/login` automatically becomes admin (see
`handle_new_user` trigger in `supabase/schema.sql`).

---

## Deployment

The app builds to a Node-compatible SSR bundle. Choose one of:

### Vercel
1. Import the repository in Vercel.
2. Framework preset: **Vite** (or **Other** — Vercel auto-detects TanStack).
3. Add the environment variables from `.env` in **Project Settings → Env**.
4. Deploy.

### Netlify
1. Import the repository.
2. Build command: `bun run build` (or `npm run build`).
3. Publish directory: `dist/`.
4. Add the environment variables in **Site → Settings → Environment**.

### Cloudflare Pages / Workers
The default build target in this template is Cloudflare. After connecting
your repo in Cloudflare Pages:
1. Build command: `bun run build`.
2. Add environment variables (same names as above).
3. Deploy.

### Static hosting (Nginx, Apache, S3, etc.)
1. `bun run build`
2. Upload `dist/` to your web root.
3. Add an SPA fallback so deep links don't 404 on refresh:
   ```nginx
   location / { try_files $uri $uri/ /index.html; }
   ```

---

## Handing the project over to the customer

Checklist for a clean handover:

1. **Source code** — give the customer access to the repository (GitHub,
   GitLab, or a zip of the working tree minus `node_modules` and `.env`).
2. **Supabase** — either:
   - **Option A (fastest):** invite the customer to your existing Supabase
     project as Owner, then leave the project. Nothing in the code changes.
   - **Option B (clean separation):** the customer creates their own
     Supabase project and follows the
     *"Connecting to a different Supabase project"* steps above.
3. **Domain** — point the customer's DNS to the chosen host (Vercel /
   Netlify / Cloudflare).
4. **First login** — after deploy, the customer opens `/login`,
   registers an email/password — the very first registered user gets the
   `admin` role automatically and unlocks `/admin`.
5. **Editing content** — all texts, contacts, IBAN/recipient/notice and
   social links are stored in the `site_content` table and managed from
   `/admin → Контент`. Changes appear on the live site within a few seconds
   without rebuilding.

That's it — the project no longer depends on any account other than the
Supabase one.

---

## Useful scripts

```bash
bun run dev     # development server
bun run build   # production build → dist/
bun run start   # preview the production build
bun run lint    # ESLint
```

---

## License

Proprietary — © Zurbagan. All rights reserved.
