import { createFileRoute } from "@tanstack/react-router";
import { Section, PageHeader } from "@/components/page-shell";
import { CreditCard, Smartphone, Ticket, Building, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/payment")({
  head: () => ({ meta: [
    { title: "Оплата послуг — Зурбаган" },
    { name: "description", content: "Способи оплати інтернету: Приват24, банківська картка, скретч-картка, Telegram-бот." },
  ]}),
  component: Payment,
});

const methods = [
  { icon: CreditCard, title: "Банківська картка", desc: "Оплата карткою будь-якого банку через сервіс Приват24." },
  { icon: Smartphone, title: "Telegram-бот", desc: "Поповнюйте рахунок прямо в Telegram через @zurbagan_super_bot." },
  { icon: Ticket, title: "Скретч-картка", desc: "Активуйте картку поповнення в особистому кабінеті або боті." },
  { icon: Building, title: "Банківський переказ", desc: "На розрахунковий рахунок UA393052990000026005045201817 (АТ КБ «ПРИВАТБАНК»)." },
];

function Payment() {
  return (
    <>
      <PageHeader eyebrow="Оплата" title="Зручні способи поповнити рахунок" description="Оберіть найзручніший варіант — оплата зараховується миттєво." />
      <Section>
        <div className="rounded-2xl border border-accent/40 bg-accent/10 p-5 text-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-accent-foreground" />
            <div>
              <strong>Увага!</strong> Шановні абоненти, які поповнюють рахунок не з Приват24: оплата здійснюється на новий розрахунковий рахунок <strong>UA393052990000026005045201817</strong>, відкритий в АТ КБ «ПРИВАТБАНК».
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
      </Section>
    </>
  );
}
