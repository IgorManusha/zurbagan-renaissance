import { Gauge, ExternalLink } from "lucide-react";

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
      <div className="grid gap-3 sm:grid-cols-2">
        <a
          href="https://speedtest.org.ua/ua/site/index"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold transition-colors hover:border-brand hover:text-brand"
        >
          speedtest.org.ua
          <ExternalLink className="h-4 w-4" />
        </a>
        <a
          href="https://www.speedtest.net/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold transition-colors hover:border-brand hover:text-brand"
        >
          speedtest.net (Ookla)
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Для коректного вимірювання підключіть пристрій кабелем та зупиніть фонові завантаження.
      </p>
    </div>
  );
}
