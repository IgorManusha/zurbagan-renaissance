import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Section, PageHeader } from "@/components/page-shell";
import {
  CheckCircle2,
  Wifi,
  Building2,
  Home,
  Tv,
  Gauge,
  Infinity as InfinityIcon,
  ShieldCheck,
  Zap,
  Router,
  Settings,
  CircuitBoard,
  Users,
  HelpCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/tariffs")({
  head: () => ({
    meta: [
      { title: "Тарифи — Зурбаган | Інтернет в Конотопі" },
      {
        name: "description",
        content:
          "Тарифні плани Зурбаган: Ethernet та GPON для квартир, приватного сектору та сільської місцевості. Безлімітний інтернет, IPTV у подарунок. Від 200 грн/міс.",
      },
    ],
  }),
  component: Tariffs,
});

type Plan = {
  name: string;
  speed: string;
  price: number;
  badge?: string;
  highlight?: boolean;
  note?: string;
};

const ethernet: Plan[] = [
  { name: "FiberNET 100", speed: "до 100 / 100", price: 200, badge: "Базовий" },
  {
    name: "FiberNET 200",
    speed: "до 200 / 200",
    price: 250,
    highlight: true,
    badge: "Популярний",
    note: "За умов технічної можливості (тільки гігабітний порт)",
  },
  {
    name: "FiberNET 500",
    speed: "до 500 / 500",
    price: 500,
    badge: "Максимум",
    note: "За умов технічної можливості (тільки гігабітний порт)",
  },
];

const gponCity: Plan[] = [
  { name: "PON FiberNET 100 M", speed: "до 100 / 100", price: 230, badge: "Базовий" },
  { name: "PON FiberNET 200 M", speed: "до 200 / 200", price: 270, highlight: true, badge: "Популярний" },
  { name: "PON FiberNET 500 M", speed: "до 500 / 500", price: 500, badge: "Максимум" },
];

const gponRural: Plan[] = [
  { name: "PON FiberNET 100 S", speed: "до 100 / 100", price: 250, badge: "Базовий" },
  { name: "PON FiberNET 200 S", speed: "до 200 / 200", price: 300, highlight: true, badge: "Популярний" },
  { name: "PON FiberNET 500 S", speed: "до 500 / 500", price: 500, badge: "Максимум" },
];

const businessPlans: Plan[] = [
  { name: "Бізнес 100", speed: "до 100 / 100", price: 600, badge: "Старт" },
  { name: "Бізнес 300", speed: "до 300 / 300", price: 1200, highlight: true, badge: "Офіс" },
  { name: "Бізнес 1000", speed: "до 1000 / 1000", price: 2500, badge: "Pro" },
];

type Category = {
  id: string;
  label: string;
  short: string;
  icon: typeof Wifi;
  title: string;
  subtitle: string;
  description: string;
  plans: Plan[];
  techBadge: string;
};

const categories: Category[] = [
  {
    id: "ethernet",
    label: "Багатоквартирні будинки",
    short: "Квартира · Ethernet",
    icon: Building2,
    title: "Ethernet для багатоквартирних будинків",
    subtitle: "Технологія FTTB · UTP",
    techBadge: "Ethernet",
    description:
      "Класичне підключення оптикою до будинку та кабелем UTP до квартири. Швидке під'єднання, стабільний сигнал.",
    plans: ethernet,
  },
  {
    id: "gpon-city",
    label: "GPON · м. Конотоп",
    short: "GPON · місто",
    icon: Home,
    title: "Енергонезалежний інтернет — м. Конотоп",
    subtitle: "Технологія GPON",
    techBadge: "GPON",
    description:
      "Оптика безпосередньо в квартиру/будинок. Працює з нашими резервними джерелами живлення під час відключень.",
    plans: gponCity,
  },
  {
    id: "gpon-rural",
    label: "Приватний сектор / село",
    short: "GPON · село",
    icon: Wifi,
    title: "Приватний сектор та сільська місцевість",
    subtitle: "Технологія GPON",
    techBadge: "GPON",
    description:
      "Покриття у приміських селах та віддалених районах. Завжди стабільний сигнал та цілодобова підтримка.",
    plans: gponRural,
  },
  {
    id: "business",
    label: "Юридичні особи",
    short: "Бізнес",
    icon: Users,
    title: "Інтернет для бізнесу",
    subtitle: "Окремі тарифні плани · договір",
    techBadge: "Бізнес",
    description:
      "Виділена смуга, статичні IP, SLA та персональний менеджер. Ціни орієнтовні — фінальна вартість після обстеження.",
    plans: businessPlans,
  },
];

const includes = [
  { icon: InfinityIcon, title: "Безлімітний трафік", text: "Жодних обмежень за обсягом" },
  { icon: Tv, title: "IPTV у подарунок", text: "23 телеканали в HD-якості" },
  { icon: Gauge, title: "Симетрична швидкість", text: "Однакова на віддачу та прийом" },
  { icon: ShieldCheck, title: "Безкоштовне підключення", text: "За умов технічної можливості" },
  { icon: Zap, title: "Резерв живлення", text: "Працюємо під час блекаутів" },
  { icon: Router, title: "Без прив'язки до пристрою", text: "Підключення Wi-Fi роутера на ваш вибір" },
];

const equipment = [
  { name: "Wi-Fi роутер TP-Link Archer C6", price: "650 грн", note: "Двочастотний, 1167 Мбіт/с" },
  { name: "Wi-Fi роутер TP-Link Archer AX23", price: "1850 грн", note: "Wi-Fi 6, AX1800" },
  { name: "GPON ONU термінал", price: "Включено в підключення", note: "Видається у користування" },
  { name: "Монтаж кабелю в межах квартири", price: "від 100 грн / м", note: "За домовленістю з майстром" },
];

const faq = [
  {
    q: "Чи є плата за підключення?",
    a: "Підключення безкоштовне за умови технічної можливості та вибору тарифу від 200 грн/міс. Обладнання сплачується окремо.",
  },
  {
    q: "Як змінити тариф?",
    a: "Зміна тарифу відбувається з першого числа наступного місяця через особистий кабінет, Telegram-бот або за дзвінком 067 300 22 00.",
  },
  {
    q: "Що таке FiberNET та PON FiberNET?",
    a: "FiberNET — підключення кабелем Ethernet (UTP) у багатоквартирних будинках. PON FiberNET — підключення оптичним волокном GPON безпосередньо у квартиру або приватний будинок.",
  },
  {
    q: "Чи працює інтернет під час відключення світла?",
    a: "Так. Активне обладнання Зурбаган має резервне живлення. У вас вдома повинен бути власний UPS для роутера/ONU.",
  },
  {
    q: "Як орендувати публічну IP-адресу?",
    a: "Послуга коштує 50 грн/міс, мінімальний термін оренди — 6 місяців. Залиште заявку у підтримці або через особистий кабінет.",
  },
];

function PriceCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`relative flex flex-col rounded-3xl border p-7 transition-all hover:-translate-y-1 ${
        plan.highlight
          ? "border-brand bg-gradient-to-br from-card to-surface shadow-glow"
          : "border-border bg-card shadow-soft"
      }`}
    >
      {plan.badge && (
        <div
          className={`absolute -top-3 left-7 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${
            plan.highlight
              ? "bg-gradient-brand text-brand-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          {plan.badge}
        </div>
      )}
      <div className="font-display text-xl font-bold">{plan.name}</div>
      <div className="mt-1 text-sm text-muted-foreground">{plan.speed} Мбіт/с</div>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-display text-5xl font-bold text-gradient">{plan.price}</span>
        <span className="text-sm font-medium text-muted-foreground">грн / міс</span>
      </div>

      {plan.note && <p className="mt-3 text-xs text-muted-foreground">{plan.note}</p>}

      <ul className="mt-6 space-y-2 text-sm">
        <li className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-brand" /> Безлімітний трафік
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-brand" /> IPTV (23 канали)
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-brand" /> Цілодобова підтримка
        </li>
      </ul>

      <Link
        to="/contacts"
        className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
          plan.highlight
            ? "bg-gradient-brand text-brand-foreground shadow-soft"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
      >
        Підключити
      </Link>
    </div>
  );
}

function Tariffs() {
  const [active, setActive] = useState<string>(categories[0].id);
  const current = categories.find((c) => c.id === active)!;

  return (
    <>
      <PageHeader
        eyebrow="Тарифи · з 1 квітня 2026 р."
        title="Швидкість, що відповідає вашим потребам"
        description="Безлімітні тарифні плани для дому та бізнесу. Оберіть категорію — ми покажемо ціни та умови підключення."
      />

      <Section className="space-y-12">
        {/* Category selector */}
        <div className="flex flex-wrap gap-2 rounded-2xl border border-border bg-surface p-2">
          {categories.map((c) => {
            const Icon = c.icon;
            const isActive = c.id === active;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`flex flex-1 min-w-[160px] items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-gradient-brand text-brand-foreground shadow-soft"
                    : "text-foreground/70 hover:bg-card hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{c.label}</span>
                <span className="sm:hidden">{c.short}</span>
              </button>
            );
          })}
        </div>

        {/* Active category info */}
        <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              <CircuitBoard className="h-3.5 w-3.5" /> {current.subtitle}
            </div>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">{current.title}</h2>
            <p className="mt-3 text-muted-foreground">{current.description}</p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-gradient-soft px-5 py-4">
            <Tv className="h-8 w-8 text-brand" />
            <div className="text-sm">
              <div className="font-semibold">+ IPTV у подарунок</div>
              <div className="text-muted-foreground">23 канали в комплекті будь-якого тарифу</div>
            </div>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {current.plans.map((p) => (
            <PriceCard key={p.name} plan={p} />
          ))}
        </div>

        {/* Includes */}
        <div>
          <h3 className="text-2xl font-bold">У кожному тарифі</h3>
          <p className="mt-2 text-muted-foreground">Те, що ви отримуєте без доплат</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {includes.map((i) => {
              const Icon = i.icon;
              return (
                <div
                  key={i.title}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft"
                >
                  <div className="rounded-xl bg-gradient-brand p-2.5 text-brand-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{i.title}</div>
                    <div className="text-sm text-muted-foreground">{i.text}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional services */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <div className="flex items-center gap-3">
              <Settings className="h-6 w-6 text-brand" />
              <h3 className="text-2xl font-bold">Додаткові послуги</h3>
            </div>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex justify-between gap-4 border-b border-border pb-3">
                <span>Оренда публічної IP-адреси</span>
                <span className="font-semibold text-brand whitespace-nowrap">50 грн / міс</span>
              </li>
              <li className="flex justify-between gap-4 border-b border-border pb-3">
                <span>Тимчасова заморозка послуги (до 60 днів/рік)</span>
                <span className="font-semibold text-brand whitespace-nowrap">безкоштовно</span>
              </li>
              <li className="flex justify-between gap-4 border-b border-border pb-3">
                <span>Повторний виклик майстра з вини абонента</span>
                <span className="font-semibold text-brand whitespace-nowrap">200 грн</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Налаштування Wi-Fi роутера</span>
                <span className="font-semibold text-brand whitespace-nowrap">150 грн</span>
              </li>
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Мінімальний термін оренди IP-адреси — 6 місяців.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <div className="flex items-center gap-3">
              <Router className="h-6 w-6 text-brand" />
              <h3 className="text-2xl font-bold">Обладнання</h3>
            </div>
            <ul className="mt-6 space-y-4 text-sm">
              {equipment.map((e) => (
                <li key={e.name} className="flex justify-between gap-4 border-b border-border pb-3 last:border-0">
                  <div>
                    <div className="font-semibold">{e.name}</div>
                    <div className="text-xs text-muted-foreground">{e.note}</div>
                  </div>
                  <span className="font-semibold text-brand whitespace-nowrap">{e.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FAQ */}
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          <div className="flex items-center gap-3">
            <HelpCircle className="h-6 w-6 text-brand" />
            <h3 className="text-2xl font-bold">Часті запитання</h3>
          </div>
          <Accordion type="single" collapsible className="mt-6">
            {faq.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 text-white">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h3 className="text-3xl font-bold md:text-4xl">Не впевнені, який тариф обрати?</h3>
              <p className="mt-2 text-white/80">
                Залиште заявку — наш менеджер передзвонить, перевірить технічну можливість та підбере оптимальний план.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contacts"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-soft transition-transform hover:scale-[1.02]"
              >
                Залишити заявку
              </Link>
              <a
                href="tel:+380673002200"
                className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur transition-colors hover:bg-white/20"
              >
                067 300 22 00
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
