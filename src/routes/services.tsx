import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section, PageHeader } from "@/components/page-shell";
import { Wifi, Tv, Network, Building2, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [
    { title: "Послуги — Зурбаган" },
    { name: "description", content: "Інтернет за технологіями Ethernet та GPON, цифрове IPTV, підключення для бізнесу." },
  ]}),
  component: Services,
});

const services = [
  {
    icon: Wifi,
    title: "Ethernet-інтернет",
    desc: "Швидкий інтернет у багатоквартирних будинках за технологією Ethernet. Швидкість до 500 Мбіт/с.",
    long: "Послуга доступу до мережі Інтернет за технологією Ethernet надається мешканцям багатоквартирних будинків Конотопа. Підключення виконується витою парою від поверхового комутатора до квартири.",
    features: [
      "Швидкість до 500 Мбіт/с (симетрична)",
      "Безлімітний трафік без обмежень",
      "IPTV — 23 канали у подарунок",
      "Цілодобова технічна підтримка",
      "Безкоштовне підключення на типових тарифах",
    ],
  },
  {
    icon: Network,
    title: "GPON-інтернет",
    desc: "Енергонезалежний оптичний інтернет — обладнання працює навіть при відключеннях електроенергії.",
    long: "Технологія GPON — це підведення оптичного волокна безпосередньо у квартиру або будинок. Завдяки резервному живленню вузлів зв'язку послуга доступна навіть під час відключень електроенергії.",
    features: [
      "Оптика безпосередньо у квартиру",
      "Швидкість до 1 Гбіт/с",
      "Працює при відключеннях світла",
      "Wi-Fi роутер у комплекті",
      "IPTV у подарунок",
    ],
  },
  {
    icon: Tv,
    title: "IPTV",
    desc: "23 цифрові телеканали у комплекті з будь-яким тарифом інтернету. Без додаткової плати.",
    long: "IPTV — цифрове інтерактивне телебачення, що транслюється через нашу мережу. Перегляд на Smart TV, телефоні, планшеті чи комп'ютері за допомогою плеєра з підтримкою M3U-плейлистів.",
    features: [
      "23 канали у HD-якості",
      "Перегляд на будь-якому пристрої",
      "Архів передач (для підтримуваних каналів)",
      "Без додаткової абонплати при наявності інтернету",
    ],
  },
  {
    icon: Building2,
    title: "Для бізнесу",
    desc: "Виділені канали, статичні IP, SLA та індивідуальні умови для юридичних осіб.",
    long: "Корпоративним клієнтам ми пропонуємо індивідуальні рішення: виділені оптичні канали, гарантовану смугу пропускання, статичні IP-адреси, SLA та цілодобову підтримку.",
    features: [
      "Виділена оптична лінія",
      "Гарантована смуга пропускання",
      "Статичні IP-адреси",
      "SLA з гарантованим часом відновлення",
      "Персональний менеджер",
    ],
  },
];

function Services() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const active = openIdx !== null ? services[openIdx] : null;
  return (
    <>
      <PageHeader eyebrow="Послуги" title="Зв'язок, на який можна покластися" description="Повний спектр послуг для дому та бізнесу: оптичний інтернет, цифрове ТБ і професійна підтримка." />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setOpenIdx(i)}
              className="group text-left rounded-2xl border border-border bg-card p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card focus:outline-none focus:ring-2 focus:ring-brand"
            >
              <div className="mb-5 inline-flex rounded-xl bg-gradient-brand p-3 text-brand-foreground shadow-soft">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.desc}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand group-hover:underline">Детальніше →</span>
            </button>
          ))}
        </div>
      </Section>

      <Dialog open={openIdx !== null} onOpenChange={(o) => !o && setOpenIdx(null)}>
        <DialogContent className="max-w-lg">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <span className="inline-flex rounded-lg bg-gradient-brand p-2 text-brand-foreground">
                    <active.icon className="h-5 w-5" />
                  </span>
                  {active.title}
                </DialogTitle>
                <DialogDescription>{active.long}</DialogDescription>
              </DialogHeader>
              <ul className="mt-2 space-y-2">
                {active.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
