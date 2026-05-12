import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, PageHeader } from "@/components/page-shell";
import { Phone, ExternalLink, Send, MessageCircle, MessageSquare, FileQuestion, Wifi, AlertTriangle, Tv, Headphones } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSetting } from "@/hooks/use-settings";
import { useContent } from "@/hooks/use-content";
import { SpeedTest } from "@/components/speed-test";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Підтримка — Зурбаган" },
      { name: "description", content: "Цілодобова підтримка абонентів Зурбаган: телефон, Viber, Telegram-бот, особистий кабінет, поширені запитання." },
    ],
  }),
  component: Support,
});

const BOT_FEATURES = [
  "Отримати інформацію по договору",
  "Перевірити залишок на рахунку",
  "Встановити кредит (обіцяний платіж)",
  "Поповнити рахунок карткою будь-якого банку (Приват24)",
  "Поповнити рахунок скретч-карткою",
  "Перевірити зв'язок вашого роутера",
  "Відправити повідомлення у техпідтримку",
];

function Support() {
  const telegramEnabled = useSetting("telegram", false);
  const { contacts, links } = useContent();

  return (
    <>
      <PageHeader
        eyebrow="Підтримка"
        title="Ми поряд, коли потрібно"
        description="Кілька зручних каналів зв'язку — оберіть той, що підходить вам. Підтримка працює щодня."
      />

      <Section className="space-y-12">
        {/* Contact channels */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              <Headphones className="h-3.5 w-3.5" /> Технічна підтримка
            </div>
            <h2 className="text-2xl font-bold">Зателефонуйте нам</h2>
            <p className="mt-2 text-sm text-muted-foreground">{contacts.schedule}. {contacts.schedule_note}</p>
            <div className="mt-5 space-y-3">
              {contacts.phones.map((p, i) => {
                const op = ["Київстар", "Vodafone", "lifecell"][i] || "Контакт";
                return (
                  <a key={p} href={`tel:+${p.replace(/\D/g, "")}`} className="flex items-center justify-between rounded-2xl border border-border bg-background p-4 transition-colors hover:border-brand">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-gradient-brand p-2.5 text-brand-foreground"><Phone className="h-4 w-4" /></div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-muted-foreground">{op}</div>
                        <div className="font-display text-lg font-bold">{p}</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-brand">Подзвонити</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            {telegramEnabled && (
              <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
                <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
                  <Send className="h-3.5 w-3.5" /> Telegram-бот
                </div>
                <h3 className="mt-3 text-xl font-bold">@zurbagan_super_bot</h3>
                <p className="mt-2 text-sm text-muted-foreground">У боті ви зможете легко:</p>
                <ul className="mt-3 grid gap-1.5 sm:grid-cols-1">
                  {BOT_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={links.telegram} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition-transform hover:scale-[1.02]">
                  Відкрити бот <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}

            <a href={links.viber} className="block rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-gradient-brand p-3 text-brand-foreground"><MessageCircle className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Viber</div>
                  <div className="font-display text-lg font-bold">Написати у Viber</div>
                </div>
              </div>
            </a>

            <a href={links.cabinet} target="_blank" rel="noreferrer" className="block rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-gradient-brand p-3 text-brand-foreground"><MessageSquare className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Особистий кабінет</div>
                  <div className="font-display text-lg font-bold">Звернення через кабінет</div>
                </div>
              </div>
            </a>
          </div>
        </div>

        <SpeedTest />

        {/* FAQ */}
        <div>
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-gradient-brand p-2.5 text-brand-foreground"><FileQuestion className="h-5 w-5" /></div>
            <h2 className="text-2xl font-bold">Поширені запитання</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-3 flex items-center gap-2 text-brand">
                <Wifi className="h-5 w-5" /> <span className="font-semibold">Інтернет не працює</span>
              </div>
              <Accordion type="single" collapsible>
                <AccordionItem value="no-net-1">
                  <AccordionTrigger className="text-left text-sm font-semibold">Що робити в першу чергу?</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    1. Перевірте, чи горять індикатори на роутері (Power, WAN/Internet, Wi-Fi).<br />
                    2. Перезавантажте роутер: вимкніть з розетки на 30 секунд і увімкніть знову.<br />
                    3. Перевірте, чи кабель щільно вставлений у WAN-порт.<br />
                    4. Перевірте баланс в особистому кабінеті — можливо, вичерпано абонплату.<br />
                    5. Якщо нічого не допомогло — зателефонуйте у техпідтримку.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="no-net-2">
                  <AccordionTrigger className="text-left text-sm font-semibold">Зник інтернет після грози / стрибка напруги</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    Можливо, ушкоджено обладнання провайдера або абонентську лінію. Залиште заявку у підтримку — інженер виконає віддалену перевірку, а в разі потреби бригада приїде на місце.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-3 flex items-center gap-2 text-brand">
                <AlertTriangle className="h-5 w-5" /> <span className="font-semibold">Низька швидкість</span>
              </div>
              <Accordion type="single" collapsible>
                <AccordionItem value="slow-1">
                  <AccordionTrigger className="text-left text-sm font-semibold">Швидкість нижча за тарифну</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    Виміряйте швидкість одночасно по кабелю та по Wi-Fi (у блоці «Перевірка швидкості» вище). Якщо по кабелю швидкість відповідає тарифу, а по Wi-Fi нижча — питання у роутері або відстані до нього.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="slow-2">
                  <AccordionTrigger className="text-left text-sm font-semibold">Як покращити Wi-Fi</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    Розташуйте роутер у центрі квартири, подалі від металевих перешкод і мікрохвильовки. Для близьких пристроїв використовуйте діапазон 5 ГГц. Старі пристрої (стандарт 802.11 b/g/n) обмежують реальну швидкість.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-3 flex items-center gap-2 text-brand">
                <Tv className="h-5 w-5" /> <span className="font-semibold">Не показує канал</span>
              </div>
              <Accordion type="single" collapsible>
                <AccordionItem value="tv-1">
                  <AccordionTrigger className="text-left text-sm font-semibold">Зник один або кілька каналів</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    Виконайте автопошук каналів у меню телевізора з параметрами: початкова частота 594 000 KHz, кінцева 746 000 KHz, швидкість 6 875 Ks/s, модуляція 64 QAM. Перевірте, що смарт-карта вставлена правильно.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="tv-2">
                  <AccordionTrigger className="text-left text-sm font-semibold">Помилка «Канал закодовано»</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    Перевірте баланс на договорі цифрового ТБ та правильність встановлення CAM-модуля чи смарт-карти. Якщо помилка не зникає — зателефонуйте у підтримку.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-3 flex items-center gap-2 text-brand">
                <FileQuestion className="h-5 w-5" /> <span className="font-semibold">Кабінет та оплата</span>
              </div>
              <Accordion type="single" collapsible>
                <AccordionItem value="cab-1">
                  <AccordionTrigger className="text-left text-sm font-semibold">Не пам'ятаю логін / пароль</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    Зверніться у техпідтримку з номером договору або з паспортом — ми відновимо доступ. Логін зазвичай збігається з номером договору.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="cab-2">
                  <AccordionTrigger className="text-left text-sm font-semibold">Оплатив, але не зараховано</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    Платежі через Приват24 зараховуються миттєво. Якщо за 30 хвилин кошти не з'явилися — надішліть скрін квитанції у Viber або Telegram-бот, ми перевіримо вручну.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-5 text-sm">
            Не знайшли відповідь? Перегляньте розширені <Link to="/instructions" className="font-semibold text-brand hover:underline">інструкції</Link> або зв'яжіться з нами одним зі способів вище.
          </div>
        </div>
      </Section>
    </>
  );
}
