import { createFileRoute } from "@tanstack/react-router";
import { Section, PageHeader } from "@/components/page-shell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CreditCard, Wallet, Ticket, Calculator, Router, Wifi, MonitorPlay, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/instructions")({
  head: () => ({
    meta: [
      { title: "Інструкції — Зурбаган" },
      { name: "description", content: "Інструкції з оплати, особистого кабінету, налаштування роутерів TP-Link, Netis, Mercusys, IPTV та підключення." },
    ],
  }),
  component: Instructions,
});

type Group = {
  id: string;
  title: string;
  icon: typeof CreditCard;
  items: { q: string; a: React.ReactNode }[];
};

const groups: Group[] = [
  {
    id: "payment",
    title: "Оплата послуг",
    icon: CreditCard,
    items: [
      {
        q: "Оплата послуг банківською карткою (Приват24)",
        a: (
          <>
            <p>Поповнення рахунку доступне власникам платіжних карток будь-якого банку через сервіс Приват24.</p>
            <ol className="mt-3 list-decimal space-y-1 pl-5">
              <li>Зайдіть у Приват24 (web або мобільний застосунок).</li>
              <li>Оберіть розділ <strong>«Усі послуги» → «Інтернет, ТБ, телефонія»</strong>.</li>
              <li>У пошуку введіть <strong>«Зурбаган»</strong> та виберіть провайдера.</li>
              <li>Введіть номер вашого договору (логін), суму та підтвердіть платіж.</li>
            </ol>
            <p className="mt-3 text-sm text-muted-foreground">Кошти зараховуються на особовий рахунок миттєво.</p>
          </>
        ),
      },
      {
        q: "Як увійти та перевірити баланс в особистому кабінеті",
        a: (
          <>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Відкрийте <a href="https://abadm.kntv.sumy.ua:9443/" target="_blank" rel="noreferrer" className="text-brand hover:underline">особистий кабінет</a>.</li>
              <li>Введіть <strong>логін</strong> (номер договору) та <strong>пароль</strong>, видані при підключенні.</li>
              <li>На головній сторінці кабінету відображається поточний баланс, дата наступного списання та статус послуги.</li>
            </ol>
          </>
        ),
      },
      {
        q: "Як поповнити рахунок карткою оплати (скретч-карткою)",
        a: (
          <ol className="list-decimal space-y-1 pl-5">
            <li>Увійдіть в особистий кабінет.</li>
            <li>У меню оберіть «Активувати картку оплати».</li>
            <li>Введіть PIN-код з прихованої смужки скретч-картки.</li>
            <li>Підтвердіть — сума автоматично зарахується на ваш рахунок.</li>
          </ol>
        ),
      },
      {
        q: "Як встановити обіцяний платіж (кредит)",
        a: (
          <>
            <p>Послуга доступна абонентам без активної заборгованості.</p>
            <ol className="mt-3 list-decimal space-y-1 pl-5">
              <li>В особистому кабінеті оберіть розділ «Кредит / Обіцяний платіж».</li>
              <li>Натисніть «Активувати» — на рахунок буде нараховано тимчасову суму.</li>
              <li>Поповніть рахунок до закінчення терміну, інакше послугу буде призупинено.</li>
            </ol>
          </>
        ),
      },
      {
        q: "Як дізнатися реквізити для безготівкової оплати",
        a: (
          <>
            <p>Реквізити для оплати без використання Приват24:</p>
            <ul className="mt-3 space-y-1 text-sm">
              <li><strong>Отримувач:</strong> ТОВ «Зурбаган»</li>
              <li><strong>Розрахунковий рахунок:</strong> UA393052990000026005045201817</li>
              <li><strong>Банк:</strong> АТ КБ «ПРИВАТБАНК»</li>
              <li><strong>Призначення платежу:</strong> Оплата за послуги Інтернет, договір №_____</li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    id: "router",
    title: "Налаштування роутерів",
    icon: Router,
    items: [
      {
        q: "TP-Link Archer C6 / C20 / C24 — базове налаштування",
        a: (
          <ol className="list-decimal space-y-1 pl-5">
            <li>Підключіть кабель провайдера у синій порт <strong>WAN</strong>.</li>
            <li>З комп'ютера або телефону підключіться до Wi-Fi мережі роутера (назва і пароль на наклейці знизу).</li>
            <li>Відкрийте у браузері <strong>tplinkwifi.net</strong> або <strong>192.168.0.1</strong>.</li>
            <li>Логін / пароль за замовчуванням: <strong>admin / admin</strong>.</li>
            <li>У майстрі швидкого налаштування оберіть тип з'єднання <strong>Динамічний IP (DHCP)</strong>.</li>
            <li>Задайте власне ім'я Wi-Fi мережі (SSID) та пароль (мінімум 8 символів) — для 2.4 ГГц і 5 ГГц.</li>
            <li>Збережіть налаштування. Роутер перезавантажиться через 30–60 секунд.</li>
          </ol>
        ),
      },
      {
        q: "TP-Link Archer AX23 (Wi-Fi 6)",
        a: (
          <ol className="list-decimal space-y-1 pl-5">
            <li>Кабель провайдера — у порт <strong>WAN</strong> (виділений кольором).</li>
            <li>У браузері відкрийте <strong>tplinkwifi.net</strong> та задайте новий пароль адміністратора.</li>
            <li>Тип WAN-з'єднання: <strong>Динамічний IP</strong>.</li>
            <li>У розділі «Бездротовий режим» увімкніть <strong>Smart Connect</strong> (об'єднує 2.4 і 5 ГГц).</li>
            <li>Задайте назву Wi-Fi та пароль. Збережіть.</li>
          </ol>
        ),
      },
      {
        q: "Netis WF2419E / WF2780",
        a: (
          <ol className="list-decimal space-y-1 pl-5">
            <li>Кабель — у порт WAN (синій).</li>
            <li>У браузері відкрийте <strong>192.168.1.1</strong> або <strong>netis.cc</strong>.</li>
            <li>На стартовому екрані оберіть тип <strong>Динамічна IP-адреса</strong>.</li>
            <li>Введіть нову назву та пароль Wi-Fi, натисніть «Зберегти».</li>
          </ol>
        ),
      },
      {
        q: "Mercusys MW301R / MW325R",
        a: (
          <ol className="list-decimal space-y-1 pl-5">
            <li>Підключіться до роутера за Wi-Fi (SSID на наклейці).</li>
            <li>Відкрийте <strong>mwlogin.net</strong> у браузері.</li>
            <li>Створіть пароль адміністратора.</li>
            <li>Тип з'єднання: <strong>Динамічний IP</strong>.</li>
            <li>Задайте Wi-Fi ім'я та пароль, збережіть.</li>
          </ol>
        ),
      },
      {
        q: "Налаштування GPON ONU терміналу",
        a: (
          <>
            <p>ONU термінал налаштовується нашим інженером під час підключення. Для роботи Wi-Fi у квартирі рекомендуємо підключити окремий роутер у LAN-порт ONU.</p>
            <p className="mt-3 text-sm text-muted-foreground">У разі скидання налаштувань зверніться у підтримку 067 300 22 00 — налаштування виконується віддалено.</p>
          </>
        ),
      },
    ],
  },
  {
    id: "iptv",
    title: "IPTV — цифрове ТБ",
    icon: MonitorPlay,
    items: [
      {
        q: "Як дивитися IPTV (23 канали)",
        a: (
          <>
            <p>IPTV доступне за допомогою застосунків на Smart TV, Android, iOS, ТВ-приставках або через VLC.</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>На Android / Android TV: <strong>IPTV Pro</strong>, <strong>OttPlayer</strong>.</li>
              <li>На iOS: <strong>IPTV Smarters</strong>.</li>
              <li>На ПК: <strong>VLC media player</strong> → «Медіа» → «Відкрити URL» → вкажіть посилання плейлиста.</li>
            </ul>
            <p className="mt-3 text-sm">Посилання на плейлист (M3U) видається в особистому кабінеті у розділі «IPTV».</p>
          </>
        ),
      },
      {
        q: "IPTV не працює — що робити?",
        a: (
          <ol className="list-decimal space-y-1 pl-5">
            <li>Перевірте, що ви підключені до домашньої мережі Зурбаган (IPTV не транслюється поза нашою мережею).</li>
            <li>Оновіть плейлист — посилання могло змінитися.</li>
            <li>Перезавантажте роутер та пристрій-плеєр.</li>
            <li>Якщо не допомогло — зателефонуйте у підтримку.</li>
          </ol>
        ),
      },
    ],
  },
  {
    id: "wifi",
    title: "Wi-Fi та підключення",
    icon: Wifi,
    items: [
      {
        q: "Як змінити пароль Wi-Fi",
        a: (
          <ol className="list-decimal space-y-1 pl-5">
            <li>Зайдіть у веб-інтерфейс роутера (адреси у розділі вище).</li>
            <li>Розділ «Бездротовий режим» / «Wireless».</li>
            <li>Введіть новий пароль (мінімум 8 символів) та збережіть.</li>
            <li>Перепідключіть пристрої з новим паролем.</li>
          </ol>
        ),
      },
      {
        q: "Низька швидкість по Wi-Fi",
        a: (
          <ul className="list-disc space-y-1 pl-5">
            <li>Перевірте швидкість по кабелю — якщо нормальна, обмеження саме у Wi-Fi.</li>
            <li>Розташуйте роутер у центрі квартири, подалі від металевих перешкод.</li>
            <li>Використовуйте діапазон <strong>5 ГГц</strong> для близьких пристроїв.</li>
            <li>Старі пристрої (стандарт 802.11 b/g/n) обмежують реальну швидкість.</li>
          </ul>
        ),
      },
    ],
  },
  {
    id: "security",
    title: "Безпека та авторизація",
    icon: ShieldCheck,
    items: [
      {
        q: "Як захистити кабінет від злому",
        a: (
          <ul className="list-disc space-y-1 pl-5">
            <li>Використовуйте складний пароль (літери різного регістру, цифри, символи).</li>
            <li>Не передавайте логін/пароль третім особам.</li>
            <li>Прив'яжіть e-mail у кабінеті — отримуватимете повідомлення про зміни балансу та входи.</li>
          </ul>
        ),
      },
    ],
  },
  {
    id: "calc",
    title: "Калькулятор та інше",
    icon: Calculator,
    items: [
      {
        q: "Як працює щоденне списання",
        a: (
          <p>
            Абонентська плата списується щодня рівними частинами (місячна ціна / кількість днів у місяці). При нульовому балансі послугу буде призупинено до наступного поповнення.
          </p>
        ),
      },
      {
        q: "Як заморозити послугу під час відпустки",
        a: (
          <p>
            У кабінеті оберіть «Призупинити послугу». Заморозка безкоштовна, до 60 днів на рік. У цей час абонплата не списується.
          </p>
        ),
      },
    ],
  },
];

function Instructions() {
  return (
    <>
      <PageHeader
        eyebrow="Інструкції"
        title="Все, що потрібно знати"
        description="Детальні інструкції з оплати, налаштування роутерів, IPTV та роботи особистого кабінету."
      />
      <Section className="space-y-10">
        {groups.map((g) => {
          const Icon = g.icon;
          return (
            <div key={g.id} className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gradient-brand p-2.5 text-brand-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">{g.title}</h2>
              </div>
              <Accordion type="single" collapsible className="mt-4">
                {g.items.map((it, idx) => (
                  <AccordionItem key={idx} value={`${g.id}-${idx}`}>
                    <AccordionTrigger className="text-left text-base font-semibold">{it.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-foreground/80 [&_a]:text-brand [&_a]:hover:underline">
                      {it.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          );
        })}
      </Section>
    </>
  );
}
