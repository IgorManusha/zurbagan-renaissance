import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/page-shell";
import { ApplicationForm } from "@/components/application-form";
import { ClipboardList, Phone, CalendarCheck, Wrench, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/connection")({
  head: () => ({
    meta: [
      { title: "Підключення — Зурбаган" },
      { name: "description", content: "Як підключитися до інтернету Зурбаган у Конотопі: 4 простих кроки від заявки до інсталяції." },
    ],
  }),
  component: Connection,
});

const STEPS = [
  { icon: ClipboardList, title: "Залишаєте заявку", desc: "Заповнюєте форму нижче — вкажіть ПІБ, адресу та прикріпіть фото паспорта і коду. Заявка автоматично потрапляє у систему." },
  { icon: CalendarCheck, title: "Стаєте у чергу", desc: "Заявка реєструється і потрапляє у чергу підключення відповідно до вашої адреси та поточного завантаження бригад." },
  { icon: Phone, title: "Дзвінок за день", desc: "Коли черга доходить до вас, наш менеджер телефонує за день до підключення, узгоджує час візиту і уточнює, чи буде вам зручно." },
  { icon: Wrench, title: "Підключення", desc: "У призначений день приїжджає бригада, прокладає кабель, налаштовує обладнання — і ви вже в мережі!" },
];

function Connection() {
  return (
    <>
      <PageHeader
        eyebrow="Підключення"
        title="Як стати абонентом Зурбаган"
        description="Чотири прості кроки від заявки до моменту, коли у вас вдома з'являється швидкий інтернет."
      />

      <Section className="space-y-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.title} className="relative rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="absolute -top-3 -left-3 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-brand font-display text-sm font-bold text-brand-foreground shadow-soft">
                {i + 1}
              </div>
              <div className="mb-4 inline-flex rounded-xl bg-secondary p-3 text-brand">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>

        <div id="form" className="grid gap-8 rounded-3xl border border-border bg-gradient-to-br from-card to-secondary/40 p-8 shadow-soft md:grid-cols-[1.1fr_1fr] md:p-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Залишити заявку</div>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Запишіться на підключення</h2>
            <p className="mt-3 text-muted-foreground">
              Заповніть форму поряд. Для оформлення договору знадобиться <strong>фото паспорта</strong> та <strong>фото ідентифікаційного коду</strong> (для старих паспортів — окремо).
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-start gap-2"><ArrowRight className="mt-0.5 h-4 w-4 text-brand" /> Заявка обробляється протягом 1 робочого дня.</li>
              <li className="flex items-start gap-2"><ArrowRight className="mt-0.5 h-4 w-4 text-brand" /> Підключення безкоштовне на більшості тарифів.</li>
              <li className="flex items-start gap-2"><ArrowRight className="mt-0.5 h-4 w-4 text-brand" /> Документи передаються по захищеному каналу і доступні лише адміністратору.</li>
            </ul>
            <div className="mt-6 text-sm">
              Маєте питання? <Link to="/contacts" className="font-semibold text-brand hover:underline">Зв'яжіться з нами</Link>.
            </div>
          </div>
          <div className="rounded-2xl bg-background p-6 shadow-soft">
            <ApplicationForm />
          </div>
        </div>
      </Section>
    </>
  );
}
