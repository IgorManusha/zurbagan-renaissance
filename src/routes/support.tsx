import { createFileRoute } from "@tanstack/react-router";
import { Section, PageHeader } from "@/components/page-shell";
import { MessageCircle, Phone, Send, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/support")({
  head: () => ({ meta: [
    { title: "Підтримка — Зурбаган" },
    { name: "description", content: "Цілодобова підтримка абонентів: телефон, Telegram-бот, Viber та особистий кабінет." },
  ]}),
  component: Support,
});

const features = [
  "Отримати інформацію по договору",
  "Перевірити залишок на рахунку",
  "Встановити кредит",
  "Поповнити рахунок карткою будь-якого банку (Приват24)",
  "Поповнити рахунок скретч-карткою",
  "Перевірити зв'язок вашого роутера",
  "Відправити повідомлення у техпідтримку",
];

function Support() {
  return (
    <>
      <PageHeader eyebrow="Підтримка" title="Ми поряд, коли потрібно" description="Декілька зручних каналів зв'язку — оберіть той, що підходить вам." />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              <Send className="h-3.5 w-3.5" /> Telegram-бот
            </div>
            <h2 className="mt-4 text-2xl font-bold">@zurbagan_super_bot</h2>
            <p className="mt-3 text-muted-foreground">Запущено для зручності наших абонентів. У боті ви зможете легко:</p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted-foreground">
              Для підключення введіть у Telegram <strong>@zurbagan_super_bot</strong> та підтвердіть свій номер телефону, що вказаний у вашому обліковому записі користувача Інтернет.
            </p>
            <a
              href="https://t.me/zurbagan_super_bot"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 font-semibold text-brand-foreground shadow-soft transition-transform hover:scale-[1.02]"
            >
              Відкрити бот <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="space-y-4">
            <a href="tel:+380673002200" className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1">
              <div className="rounded-xl bg-gradient-brand p-3 text-brand-foreground"><Phone className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Київстар</div>
                <div className="font-display text-xl font-bold">067 300 22 00</div>
              </div>
            </a>
            <a href="tel:+380663002200" className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1">
              <div className="rounded-xl bg-gradient-brand p-3 text-brand-foreground"><Phone className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Vodafone</div>
                <div className="font-display text-xl font-bold">066 300 22 00</div>
              </div>
            </a>
            <a href="tel:+380732002200" className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1">
              <div className="rounded-xl bg-gradient-brand p-3 text-brand-foreground"><Phone className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">lifecell</div>
                <div className="font-display text-xl font-bold">073 200 22 00</div>
              </div>
            </a>
            <a href="viber://chat?number=%2B380673002200" className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1">
              <div className="rounded-xl bg-gradient-brand p-3 text-brand-foreground"><MessageCircle className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Viber</div>
                <div className="font-display text-xl font-bold">Написати у Viber</div>
              </div>
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
