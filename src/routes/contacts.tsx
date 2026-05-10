import { createFileRoute } from "@tanstack/react-router";
import { Section, PageHeader } from "@/components/page-shell";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { ApplicationForm } from "@/components/application-form";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакти — Зурбаган" },
      { name: "description", content: "Контакти Зурбаган: телефони, email, адреса, графік роботи. Залиште заявку на підключення." },
    ],
  }),
  component: Contacts,
});

function Contacts() {
  return (
    <>
      <PageHeader
        eyebrow="Контакти"
        title="Завжди на зв'язку"
        description="Зв'яжіться зручним способом або залиште заявку — ми передзвонимо."
      />
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

          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="font-display text-2xl font-bold">Залишити заявку</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Заповніть форму — і ми зателефонуємо вам найближчим часом.
            </p>
            <div className="mt-6">
              <ApplicationForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
