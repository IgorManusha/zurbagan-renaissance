import { createFileRoute } from "@tanstack/react-router";
import { Section, PageHeader } from "@/components/page-shell";
import { CreditCard, Smartphone, Ticket, Building, AlertCircle } from "lucide-react";
import { useContent } from "@/hooks/use-content";

export const Route = createFileRoute("/payment")({
  head: () => ({ meta: [
    { title: "Оплата послуг — Зурбаган" },
    { name: "description", content: "Способи оплати інтернету: Приват24, банківська картка, скретч-картка, Telegram-бот." },
  ]}),
  component: Payment,
});

function Payment() {
  const { requisites } = useContent();
  const methods = [
    { icon: CreditCard, title: "Банківська картка", desc: "Оплата карткою будь-якого банку через сервіс Приват24." },
    { icon: Smartphone, title: "Telegram-бот", desc: "Поповнюйте рахунок прямо в Telegram через @zurbagan_super_bot." },
    { icon: Ticket, title: "Скретч-картка", desc: "Активуйте картку поповнення в особистому кабінеті або боті." },
    { icon: Building, title: "Банківський переказ", desc: "Реквізити для переказу — нижче на сторінці." },
  ];
  return (
    <>
      <PageHeader eyebrow="Оплата" title="Зручні способи поповнити рахунок" description="Оберіть найзручніший варіант — оплата зараховується миттєво." />
      <Section>
        <div className="rounded-2xl border border-accent/40 bg-accent/10 p-5 text-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-accent-foreground" />
            <div>
              <strong>Увага!</strong> {requisites.notice}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {methods.map((m) => (
            <div key={m.title} className="rounded-2xl border border-border bg-card p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
              <div className="mb-4 inline-flex rounded-xl bg-gradient-brand p-3 text-brand-foreground shadow-soft">
                <m.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{m.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{m.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8 shadow-soft">
          <h2 className="font-display text-2xl font-bold">Банківські реквізити</h2>
          <p className="mt-1 text-sm text-muted-foreground">Для оплати банківським переказом використовуйте дані нижче.</p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">Отримувач</dt>
              <dd className="mt-1 font-semibold">{requisites.recipient}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">Банк</dt>
              <dd className="mt-1 font-semibold">{requisites.bank}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">IBAN / Розрахунковий рахунок</dt>
              <dd className="mt-1 select-all break-all font-mono text-base font-semibold text-brand">{requisites.iban}</dd>
            </div>
          </dl>
        </div>
      </Section>
    </>
  );
}
