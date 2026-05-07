import { createFileRoute } from "@tanstack/react-router";
import { Section, PageHeader } from "@/components/page-shell";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/tariffs")({
  head: () => ({ meta: [
    { title: "Тарифи — Зурбаган" },
    { name: "description", content: "Тарифні плани з безлімітним трафіком: Ethernet та GPON. Від 200 грн/міс. IPTV у подарунок." },
  ]}),
  component: Tariffs,
});

type Plan = { name: string; speed: string; price: number; note?: string };

const ethernet: Plan[] = [
  { name: "FiberNET 100", speed: "до 100 / 100", price: 200 },
  { name: "FiberNET 200", speed: "до 200 / 200", price: 250, note: "За умов технічної можливості (тільки гігабітний порт)" },
  { name: "FiberNET 500", speed: "до 500 / 500", price: 500, note: "За умов технічної можливості (тільки гігабітний порт)" },
];

const gponCity: Plan[] = [
  { name: "PON FiberNET 100 M", speed: "до 100 / 100", price: 230 },
  { name: "PON FiberNET 200 M", speed: "до 200 / 200", price: 270 },
  { name: "PON FiberNET 500 M", speed: "до 500 / 500", price: 500 },
];

const gponRural: Plan[] = [
  { name: "PON FiberNET 100 S", speed: "до 100 / 100", price: 250 },
  { name: "PON FiberNET 200 S", speed: "до 200 / 200", price: 300 },
  { name: "PON FiberNET 500 S", speed: "до 500 / 500", price: 500 },
];

function Group({ title, subtitle, plans }: { title: string; subtitle: string; plans: Plan[] }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">{subtitle}</div>
      <h3 className="mt-2 text-2xl font-bold">{title}</h3>
      <div className="mt-6 overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-4">Тариф</th>
              <th className="px-5 py-4">Швидкість, Мбіт/с</th>
              <th className="px-5 py-4 text-right">Вартість, грн</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((p) => (
              <tr key={p.name} className="border-t border-border">
                <td className="px-5 py-4 font-semibold">
                  {p.name}
                  {p.note && <div className="mt-1 text-xs font-normal text-muted-foreground">{p.note}</div>}
                </td>
                <td className="px-5 py-4 text-muted-foreground">{p.speed}</td>
                <td className="px-5 py-4 text-right font-display text-xl font-bold text-brand">{p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand" /> Безлімітний трафік</li>
        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand" /> IPTV (23 телеканали) включено</li>
        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand" /> Розрахунковий період — календарний місяць</li>
      </ul>
    </div>
  );
}

function Tariffs() {
  return (
    <>
      <PageHeader eyebrow="Тарифи" title="Швидкість, що відповідає вашим потребам" description="Тарифні плани з необмеженим трафіком. Чинні з 1 квітня 2026 р. для фізичних осіб." />
      <Section className="space-y-8">
        <Group title="Багатоквартирні будинки" subtitle="Технологія Ethernet" plans={ethernet} />
        <Group title="Енергонезалежний інтернет — м. Конотоп" subtitle="Технологія GPON" plans={gponCity} />
        <Group title="Приватний сектор · сільська місцевість" subtitle="Технологія GPON" plans={gponRural} />

        <div className="rounded-2xl border border-border bg-surface p-6 text-sm">
          <strong>Оренда публічної IP-адреси</strong> — 50 грн/міс (мінімальний термін оренди — 6 місяців).
        </div>
      </Section>
    </>
  );
}
