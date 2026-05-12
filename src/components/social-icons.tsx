// Brand-styled circular social icons (Facebook, Telegram, Viber)
// Uses official brand SVG paths and color gradients.

type Props = { className?: string };

const wrap =
  "inline-flex h-10 w-10 items-center justify-center rounded-full text-white shadow-soft transition-transform hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background";

export function FacebookIcon({ className = "" }: Props) {
  return (
    <span
      className={`${wrap} ${className}`}
      style={{ background: "linear-gradient(135deg,#1877F2,#0a5ad9)" }}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.91h-2.33V22c4.78-.76 8.43-4.92 8.43-9.94Z" />
      </svg>
    </span>
  );
}

export function TelegramIcon({ className = "" }: Props) {
  return (
    <span
      className={`${wrap} ${className}`}
      style={{ background: "linear-gradient(135deg,#37BBFE,#007DBB)" }}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M9.78 15.27 9.6 19.1c.36 0 .52-.16.71-.34l1.71-1.63 3.55 2.6c.65.36 1.12.17 1.29-.6L20.94 4.7c.22-1.01-.36-1.4-1-1.16L2.36 9.81c-1 .39-.99.95-.17 1.21l4.46 1.39 10.37-6.53c.49-.32.93-.14.57.18l-7.81 7.21Z" />
      </svg>
    </span>
  );
}

export function ViberIcon({ className = "" }: Props) {
  return (
    <span
      className={`${wrap} ${className}`}
      style={{ background: "linear-gradient(135deg,#7B519D,#59267C)" }}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M19.4 4.6C18 3.2 14.5 3 12 3S6 3.2 4.6 4.6C3.2 6 3 9 3 11s.2 5 1.6 6.4c.7.7 1.9 1.2 3 1.4v2.4c0 .4.5.7.8.4l2.5-2.4h1.1c2.5 0 6-.2 7.4-1.6C20.8 16.2 21 13 21 11s-.2-5-1.6-6.4ZM12.7 6.4c2.4.1 4.5 1.6 4.6 4.4 0 .2-.2.4-.4.4-.3 0-.4-.2-.4-.4-.1-2.4-1.7-3.6-3.8-3.7-.2 0-.4-.2-.4-.4 0-.2.2-.3.4-.3Zm-.1 1.5c2 .1 3 1.2 3.1 3 0 .2-.2.4-.4.4-.3 0-.4-.2-.4-.4-.1-1.4-.8-2.1-2.3-2.2-.2 0-.4-.2-.3-.4 0-.3.1-.4.3-.4Zm0 1.6c1.2.1 1.7.6 1.8 1.6 0 .2-.2.4-.4.4-.2 0-.4-.2-.4-.4 0-.6-.3-.9-1-.9-.2 0-.4-.1-.4-.4 0-.2.2-.3.4-.3Zm4 6.5c-.5.9-1.4 1.9-2.4 1.6l-.9-.3c-2.4-.9-4.6-3.1-5.5-5.5l-.3-.9c-.3-1 .7-1.9 1.6-2.4.3-.2.7-.1.9.2l.7 1c.2.3.2.7-.1.9l-.3.3c-.2.2-.2.4-.1.6.4 1 1.4 2 2.4 2.4.2.1.5.1.6-.1l.3-.3c.3-.2.6-.3.9-.1l1 .7c.3.2.4.6.2.9Z" />
      </svg>
    </span>
  );
}

export function SocialIcons({ facebook, telegram, viber, showTelegram = true }: { facebook?: string; telegram?: string; viber?: string; showTelegram?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      {facebook && <a href={facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookIcon /></a>}
      {viber && <a href={viber} target="_blank" rel="noreferrer" aria-label="Viber"><ViberIcon /></a>}
      {showTelegram && telegram && <a href={telegram} target="_blank" rel="noreferrer" aria-label="Telegram"><TelegramIcon /></a>}
    </div>
  );
}
