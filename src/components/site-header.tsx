import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const nav = [
  { to: "/", label: "Головна" },
  { to: "/services", label: "Послуги" },
  { to: "/tariffs", label: "Тарифи" },
  { to: "/instructions", label: "Інструкції" },
  { to: "/support", label: "Підтримка" },
  { to: "/payment", label: "Оплата" },
  { to: "/contacts", label: "Контакти" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Зурбаган" className="h-11 w-11 object-contain" />
          <div className="leading-tight">
            <div className="font-display text-lg font-bold tracking-tight">ЗУРБАГАН</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Internet · TV</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "rounded-full px-4 py-2 text-sm font-semibold bg-secondary text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+380673002200" className="flex items-center gap-2 text-sm font-semibold text-foreground/80 hover:text-foreground">
            <Phone className="h-4 w-4 text-brand" />
            067 300 22 00
          </a>
          <a
            href="https://abadm.kntv.sumy.ua:9443/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition-transform hover:scale-[1.02]"
          >
            Особистий кабінет
          </a>
        </div>

        <button
          className="lg:hidden rounded-md p-2 hover:bg-secondary"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-4 space-y-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium hover:bg-secondary"
                activeProps={{ className: "block rounded-lg px-4 py-3 text-sm font-semibold bg-secondary" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://abadm.kntv.sumy.ua:9443/"
              target="_blank"
              rel="noreferrer"
              className="block rounded-lg bg-gradient-brand px-4 py-3 text-center text-sm font-semibold text-brand-foreground"
            >
              Особистий кабінет
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
