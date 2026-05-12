import { Gauge, ExternalLink } from "lucide-react";

const TESTS = [
  { url: "https://speedtest.org.ua/ua/site/index", name: "speedtest.org.ua", note: "Український сервер" },
  { url: "https://www.speedtest.net/", name: "speedtest.net (Ookla)", note: "Глобальний сервіс" },
  { url: "https://beta.speedtest.net/ru", name: "beta.speedtest.net", note: "Бета-версія Ookla" },
];

export function SpeedTest() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-xl bg-gradient-brand p-2.5 text-brand-foreground">
          <Gauge className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold">Перевірка швидкості</h3>
          <p className="text-xs text-muted-foreground">Виміряйте реальну швидкість вашого з'єднання</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {TESTS.map((t) => (
          <a
            key={t.url}
            href={t.url}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col gap-1 rounded-2xl border border-border bg-background p-4 transition-colors hover:border-brand"
          >
            <span className="flex items-center justify-between text-sm font-semibold group-hover:text-brand">
              {t.name}
              <ExternalLink className="h-4 w-4 opacity-60 group-hover:opacity-100" />
            </span>
            <span className="text-xs text-muted-foreground">{t.note}</span>
          </a>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Для коректного вимірювання підключіть пристрій кабелем та зупиніть фонові завантаження.
      </p>
    </div>
  );
}
