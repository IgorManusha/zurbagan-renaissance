import { createFileRoute } from "@tanstack/react-router";
import { Section, PageHeader } from "@/components/page-shell";
import { FileText, Router, Cable, MonitorPlay } from "lucide-react";

export const Route = createFileRoute("/instructions")({
  head: () => ({ meta: [
    { title: "Інструкції — Зурбаган" },
    { name: "description", content: "Інструкції з підключення інтернету, налаштування роутерів, IPTV та оплати послуг." },
  ]}),
  component: Instructions,
});

const items = [
  { icon: Router, title: "Налаштування роутера", desc: "Покрокова інструкція налаштування Wi-Fi роутера для роботи в мережі Зурбаган." },
  { icon: Cable, title: "Підключення кабелю", desc: "Як правильно під'єднати мережевий кабель до комп'ютера або роутера." },
  { icon: MonitorPlay, title: "Налаштування IPTV", desc: "Як подивитися 23 цифрові канали на ТБ, телефоні чи приставці." },
  { icon: FileText, title: "Оплата послуг", desc: "Інструкції з оплати через Приват24, банківську картку, скретч-картку та Telegram-бот." },
];

function Instructions() {
  return (
    <>
      <PageHeader eyebrow="Інструкції" title="Налаштування за хвилини" description="Зрозумілі покрокові інструкції для самостійного підключення та налаштування послуг." />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((i) => (
            <a key={i.title} href="#" className="group rounded-2xl border border-border bg-card p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
              <div className="mb-4 inline-flex rounded-xl bg-gradient-brand p-3 text-brand-foreground shadow-soft">
                <i.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold group-hover:text-brand">{i.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.desc}</p>
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
