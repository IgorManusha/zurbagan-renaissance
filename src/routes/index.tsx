import { createFileRoute, Link } from "@tanstack/react-router";
import { Wifi, Tv, Zap, Shield, Headphones, Award, ArrowRight, CheckCircle2, Gauge, Users } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

const features = [
  { icon: Gauge, title: "До 500 Мбіт/с", desc: "Симетрична швидкість прийому/передачі для всіх пристроїв" },
  { icon: Tv, title: "23 ТВ-канали", desc: "IPTV у подарунок при підключенні інтернету" },
  { icon: Zap, title: "Енергонезалежність", desc: "GPON-технологія працює навіть при відключеннях" },
  { icon: Shield, title: "Стабільність", desc: "Власна оптична мережа — мінімум втрат і затримок" },
  { icon: Headphones, title: "Підтримка 24/7", desc: "Телеграм-бот @zurbagan_super_bot та жива лінія" },
  { icon: Award, title: "З 2002 року", desc: "Більше 20 років досвіду в Конотопі" },
];

const tariffs = [
  { name: "FiberNET 100", speed: "100 / 100", price: 200, tag: "Старт" },
  { name: "FiberNET 200", speed: "200 / 200", price: 250, tag: "Популярний", featured: true },
  { name: "FiberNET 500", speed: "500 / 500", price: 500, tag: "Максимум" },
];

const news = [
  { date: "15.03.2026", title: "Актуалізація тарифних планів — квітень 2026", excerpt: "З 1 квітня 2026 р. оновлюється абонентська плата за тарифними планами Ethernet та GPON для фізичних осіб." },
  { date: "07.07.2025", title: "Зміна реквізитів для оплати", excerpt: "Оплата для абонентів, які не використовують Приват24, здійснюється на новий розрахунковий рахунок." },
  { date: "02.06.2025", title: "Запущено телеграм-бот для абонентів", excerpt: "Дізнавайтеся залишок, поповнюйте рахунок та керуйте підключенням прямо у Telegram — @zurbagan_super_bot." },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-brand-glow/30 blur-3xl animate-float" />
        <div className="absolute -bottom-32 -left-20 h-[400px] w-[400px] rounded-full bg-accent/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Оператор зв'язку · Конотоп
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
              Світ інформації <br />
              <span className="text-gradient bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">та розваг</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/80">
              Швидкий оптичний інтернет до 500 Мбіт/с та цифрове ТБ для дому й бізнесу. Без обмежень трафіку. Працюємо навіть під час відключень світла.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/tariffs" className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-accent-foreground shadow-glow transition-transform hover:scale-[1.02]">
                Обрати тариф
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/contacts" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-semibold backdrop-blur transition-colors hover:bg-white/10">
                Підключитися
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { v: "20+", l: "років роботи" },
                { v: "500", l: "Мбіт/с макс." },
                { v: "23", l: "ТВ-канали" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl font-bold">{s.v}</div>
                  <div className="text-xs uppercase tracking-wider text-white/60">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 -m-8 rounded-3xl bg-white/5 blur-2xl" />
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-glow">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/60">Поточна швидкість</div>
                  <div className="font-display text-5xl font-bold">500 <span className="text-lg text-white/60">Мбіт/с</span></div>
                </div>
                <div className="rounded-2xl bg-accent/20 p-3"><Wifi className="h-8 w-8 text-accent" /></div>
              </div>
              <div className="space-y-3">
                {[
                  { l: "Завантаження", v: "498.7" },
                  { l: "Віддача", v: "499.1" },
                  { l: "Пінг", v: "3 мс" },
                ].map((r) => (
                  <div key={r.l} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <span className="text-sm text-white/70">{r.l}</span>
                    <span className="font-semibold">{r.v}</span>
                  </div>
                ))}
              </div>
              <a href="https://speedtest.org.ua/ua/site/index" target="_blank" rel="noreferrer" className="mt-6 block rounded-xl bg-white/10 px-4 py-3 text-center text-sm font-semibold backdrop-blur hover:bg-white/15">
                Перевірити швидкість →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Чому Зурбаган</div>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Якісний зв'язок без компромісів</h2>
          <p className="mt-3 text-muted-foreground">Власна оптична інфраструктура, локальна команда інженерів і десятиліття довіри абонентів Конотопа.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
              <div className="mb-4 inline-flex rounded-xl bg-gradient-brand p-3 text-brand-foreground shadow-soft">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TARIFFS */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Тарифи</div>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">Інтернет для багатоквартирних будинків</h2>
              <p className="mt-3 text-muted-foreground">Технологія Ethernet · IPTV (23 канали) у подарунок · з 1 квітня 2026 р.</p>
            </div>
            <Link to="/tariffs" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
              Усі тарифи <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {tariffs.map((t) => (
              <div
                key={t.name}
                className={`relative rounded-3xl border p-8 transition-all ${
                  t.featured
                    ? "border-transparent bg-gradient-hero text-white shadow-glow scale-[1.02]"
                    : "border-border bg-card shadow-soft hover:-translate-y-1 hover:shadow-card"
                }`}
              >
                <div className={`text-xs font-semibold uppercase tracking-wider ${t.featured ? "text-accent" : "text-brand"}`}>{t.tag}</div>
                <div className="mt-2 font-display text-2xl font-bold">{t.name}</div>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold">{t.price}</span>
                  <span className={t.featured ? "text-white/60" : "text-muted-foreground"}>грн/міс</span>
                </div>
                <div className={`mt-4 text-sm ${t.featured ? "text-white/80" : "text-muted-foreground"}`}>До {t.speed} Мбіт/с</div>
                <ul className="mt-6 space-y-2 text-sm">
                  {["Безлімітний трафік", "IPTV — 23 канали", "Підтримка 24/7"].map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className={`h-4 w-4 ${t.featured ? "text-accent" : "text-brand"}`} /> {i}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contacts"
                  className={`mt-8 block rounded-full px-6 py-3 text-center font-semibold transition-colors ${
                    t.featured ? "bg-accent text-accent-foreground hover:bg-accent/90" : "bg-foreground text-background hover:opacity-90"
                  }`}
                >
                  Підключити
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Новини</div>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Останні оголошення</h2>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {news.map((n) => (
            <article key={n.title} className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
              <time className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{n.date}</time>
              <h3 className="mt-3 text-lg font-semibold leading-snug group-hover:text-brand">{n.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                Деталі <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 text-white shadow-glow md:p-16">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur">
                <Users className="h-3.5 w-3.5" /> Понад 10 000 абонентів
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Готові підключитися?</h2>
              <p className="mt-3 max-w-xl text-white/80">Залиште заявку — наші інженери зв'яжуться з вами та підкажуть найкращий тариф для вашої адреси.</p>
            </div>
            <Link to="/contacts" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 font-semibold text-accent-foreground shadow-glow transition-transform hover:scale-105">
              Залишити заявку <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
