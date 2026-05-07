import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section, PageHeader } from "@/components/page-shell";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export const Route = createFileRoute("/contacts")({
  head: () => ({ meta: [
    { title: "Контакти — Зурбаган" },
    { name: "description", content: "Контакти Зурбаган: телефони, email, адреса, графік роботи. Залиште заявку на підключення." },
  ]}),
  component: Contacts,
});

function Contacts() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader eyebrow="Контакти" title="Завжди на зв'язку" description="Зв'яжіться зручним способом або залиште заявку — ми передзвонимо." />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-gradient-brand p-3 text-brand-foreground"><Phone className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Телефони</div>
                  <a href="tel:+380673002200" className="block font-display text-lg font-bold hover:text-brand">067 300 22 00</a>
                  <a href="tel:+380663002200" className="block font-display text-lg font-bold hover:text-brand">066 300 22 00</a>
                  <a href="tel:+380732002200" className="block font-display text-lg font-bold hover:text-brand">073 200 22 00</a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-gradient-brand p-3 text-brand-foreground"><Mail className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
                  <a href="mailto:info@zurbagan.tv" className="font-display text-lg font-bold hover:text-brand">info@zurbagan.tv</a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-gradient-brand p-3 text-brand-foreground"><MapPin className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Адреса</div>
                  <div className="font-display text-lg font-bold">м. Конотоп, Сумська обл.</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-gradient-brand p-3 text-brand-foreground"><Clock className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Графік роботи</div>
                  <div className="font-semibold">Пн–Пт: 9:00–18:00</div>
                  <div className="text-sm text-muted-foreground">Перерва 13:00–14:00 · Сб–Нд: вихідні</div>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="rounded-3xl border border-border bg-card p-8 shadow-soft"
          >
            <h2 className="font-display text-2xl font-bold">Залишити заявку</h2>
            <p className="mt-2 text-sm text-muted-foreground">Заповніть форму — і ми зателефонуємо вам найближчим часом.</p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ім'я</label>
                <input required className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-brand" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Телефон</label>
                <input required type="tel" placeholder="+380" className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-brand" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Адреса підключення</label>
                <input className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-brand" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Повідомлення</label>
                <textarea rows={4} className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-brand" />
              </div>
            </div>

            <button
              type="submit"
              disabled={sent}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 font-semibold text-brand-foreground shadow-soft transition-transform hover:scale-[1.01] disabled:opacity-60"
            >
              {sent ? "Дякуємо! Ми зв'яжемося." : (<>Надіслати заявку <Send className="h-4 w-4" /></>)}
            </button>
          </form>
        </div>
      </Section>
    </>
  );
}
