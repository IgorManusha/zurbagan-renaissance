import { createFileRoute } from "@tanstack/react-router";
import { Section, PageHeader } from "@/components/page-shell";
import { Wifi, Tv, Network, Building2 } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [
    { title: "Послуги — Зурбаган" },
    { name: "description", content: "Інтернет за технологіями Ethernet та GPON, цифрове IPTV, підключення для бізнесу." },
  ]}),
  component: Services,
});

const services = [
  { icon: Wifi, title: "Ethernet-інтернет", desc: "Швидкий інтернет у багатоквартирних будинках за технологією Ethernet. Швидкість до 500 Мбіт/с." },
  { icon: Network, title: "GPON-інтернет", desc: "Енергонезалежний оптичний інтернет — обладнання працює навіть при відключеннях електроенергії." },
  { icon: Tv, title: "IPTV", desc: "23 цифрові телеканали у комплекті з будь-яким тарифом інтернету. Без додаткової плати." },
  { icon: Building2, title: "Для бізнесу", desc: "Виділені канали, статичні IP, SLA та індивідуальні умови для юридичних осіб." },
];

function Services() {
  return (
    <>
      <PageHeader eyebrow="Послуги" title="Зв'язок, на який можна покластися" description="Повний спектр послуг для дому та бізнесу: оптичний інтернет, цифрове ТБ і професійна підтримка." />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
              <div className="mb-5 inline-flex rounded-xl bg-gradient-brand p-3 text-brand-foreground shadow-soft">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
