import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section, PageHeader } from "@/components/page-shell";
import { CreditCard, Smartphone, Ticket, Building, AlertCircle, ExternalLink, Copy, Check } from "lucide-react";
import { useContent } from "@/hooks/use-content";

export const Route = createFileRoute("/payment")({
  head: () => ({ meta: [
    { title: "Оплата послуг — Зурбаган" },
    { name: "description", content: "Оплата інтернету онлайн: Приват24, банківська картка, скретч-картка, Telegram-бот." },
  ]}),
  component: Payment,
});

function Payment() {
  const { requisites, links } = useContent();
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const payViaPrivat24 = () => {
    if (!account.trim()) return;
    // Open Privat24 transfer-to-account page; user pastes prefilled details
    const url = `https://next.privat24.ua/payments/form/transfer-iban`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const copy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const methods = [
    { icon: CreditCard, title: "Банківська картка (Приват24)", desc: "Оплата карткою будь-якого банку через сервіс Приват24. Зарахування — миттєве." },
    { icon: Smartphone, title: "Telegram-бот", desc: "Поповнюйте рахунок прямо в Telegram через @zurbagan_super_bot." },
    { icon: Ticket, title: "Скретч-картка", desc: "Активуйте картку поповнення в особистому кабінеті або в Telegram-боті." },
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

        {/* ONLINE PAYMENT FORM */}
        <div className="mt-8 rounded-3xl border border-border bg-gradient-hero p-8 text-white shadow-glow md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Онлайн-оплата</div>
              <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">Оплата послуг банківською карткою</h2>
              <p className="mt-3 text-sm text-white/80">
                Введіть номер вашого особового рахунку та суму поповнення. Ви будете перенаправлені на захищену сторінку Приват24, де можна оплатити карткою будь-якого банку.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-white/70">
                <li>• Зарахування коштів — миттєве</li>
                <li>• Без додаткової комісії з боку провайдера</li>
                <li>• Підтримка карток Visa / Mastercard</li>
              </ul>
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); payViaPrivat24(); }}
              className="rounded-2xl bg-white/10 p-6 backdrop-blur-xl"
            >
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">Особовий рахунок</label>
              <input
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                required
                inputMode="numeric"
                placeholder="Напр. 12345"
                className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/40 outline-none focus:border-accent"
              />
              <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-white/70">Сума, грн</label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                inputMode="decimal"
                placeholder="200"
                className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/40 outline-none focus:border-accent"
              />
              <button
                type="submit"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-accent-foreground shadow-glow transition-transform hover:scale-[1.01]"
              >
                Оплатити через Приват24 <ExternalLink className="h-4 w-4" />
              </button>
              <p className="mt-3 text-center text-xs text-white/60">
                Перехід на сайт <strong>privat24.ua</strong> — сторінка відкриється у новій вкладці.
              </p>
            </form>
          </div>
        </div>

        {/* TELEGRAM + SCRATCH */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <a
            href={links.telegram || "https://t.me/zurbagan_super_bot"}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-border bg-card p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
          >
            <div className="mb-4 inline-flex rounded-xl bg-gradient-brand p-3 text-brand-foreground shadow-soft">
              <Smartphone className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">Оплата через Telegram-бот</h3>
            <p className="mt-2 text-sm text-muted-foreground">Швидке поповнення рахунку прямо в месенджері. Підтримка карток та активація скретч-карток.</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
              Відкрити бот <ExternalLink className="h-3.5 w-3.5" />
            </span>
          </a>
          <a
            href={links.cabinet}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-border bg-card p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
          >
            <div className="mb-4 inline-flex rounded-xl bg-gradient-brand p-3 text-brand-foreground shadow-soft">
              <Ticket className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">Активувати скретч-картку</h3>
            <p className="mt-2 text-sm text-muted-foreground">Увійдіть в особистий кабінет, відкрийте розділ «Поповнення» та введіть код з картки.</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
              Особистий кабінет <ExternalLink className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>

        {/* METHOD CARDS */}
        <h2 className="mt-12 font-display text-2xl font-bold">Усі способи оплати</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {methods.map((m) => (
            <div key={m.title} className="rounded-2xl border border-border bg-card p-8 shadow-soft">
              <div className="mb-4 inline-flex rounded-xl bg-gradient-brand p-3 text-brand-foreground shadow-soft">
                <m.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{m.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* REQUISITES */}
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
              <dd className="mt-1 flex flex-wrap items-center gap-3">
                <span className="select-all break-all font-mono text-base font-semibold text-brand">{requisites.iban}</span>
                <button
                  type="button"
                  onClick={() => copy(requisites.iban, "iban")}
                  className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-semibold hover:bg-surface"
                >
                  {copied === "iban" ? <><Check className="h-3.5 w-3.5" /> Скопійовано</> : <><Copy className="h-3.5 w-3.5" /> Копіювати</>}
                </button>
              </dd>
            </div>
          </dl>
          <p className="mt-6 text-xs text-muted-foreground">
            У призначенні платежу обов'язково вкажіть свій <strong>особовий рахунок</strong> та ПІБ абонента.
          </p>
        </div>
      </Section>
    </>
  );
}
