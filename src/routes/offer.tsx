import { createFileRoute } from "@tanstack/react-router";
import { Section, PageHeader } from "@/components/page-shell";

export const Route = createFileRoute("/offer")({
  head: () => ({ meta: [
    { title: "Публічна оферта — Зурбаган" },
    { name: "description", content: "Публічна оферта про надання послуг доступу до мережі Інтернет та кабельного ТБ." },
  ]}),
  component: Offer,
});

function Offer() {
  return (
    <>
      <PageHeader eyebrow="Документи" title="Публічна оферта" description="Договір про надання телекомунікаційних послуг." />
      <Section>
        <article className="prose prose-neutral mx-auto max-w-3xl text-foreground">
          <h2 className="font-display text-2xl font-bold">1. Загальні положення</h2>
          <p className="mt-3 text-muted-foreground">Цей документ є офіційною публічною пропозицією (офертою) ТОВ «Зурбаган» (далі — Оператор) укласти договір про надання послуг доступу до мережі Інтернет та послуг кабельного телебачення на викладених нижче умовах.</p>

          <h2 className="mt-8 font-display text-2xl font-bold">2. Предмет договору</h2>
          <p className="mt-3 text-muted-foreground">Оператор надає Абоненту телекомунікаційні послуги відповідно до обраного тарифного плану, а Абонент зобов'язується їх своєчасно оплачувати.</p>

          <h2 className="mt-8 font-display text-2xl font-bold">3. Порядок розрахунків</h2>
          <p className="mt-3 text-muted-foreground">Розрахунковий період — календарний місяць. Абонентська плата стягується щомісяця згідно з обраним тарифним планом. Поточні тарифи опубліковані на сайті <a href="/tariffs" className="text-brand hover:underline">/tariffs</a>.</p>

          <h2 className="mt-8 font-display text-2xl font-bold">4. Права та обов'язки сторін</h2>
          <p className="mt-3 text-muted-foreground">Оператор зобов'язується забезпечувати якість послуг відповідно до чинного законодавства України. Абонент зобов'язується дотримуватися правил користування послугами та своєчасно вносити оплату.</p>

          <h2 className="mt-8 font-display text-2xl font-bold">5. Контакти</h2>
          <p className="mt-3 text-muted-foreground">З усіх питань щодо публічної оферти звертайтеся: info@zurbagan.tv, 067 300 22 00.</p>
        </article>
      </Section>
    </>
  );
}
