import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, Shield } from "lucide-react";
import logo from "@/assets/logo.png";
import { useAuth } from "@/hooks/use-auth";
import { useContent } from "@/hooks/use-content";
import { useSetting } from "@/hooks/use-settings";
import { SocialIcons } from "@/components/social-icons";

const NAV_ITEMS: { to: string; label: string; settingKey: string; exact?: boolean }[] = [
  { to: "/", label: "Головна", settingKey: "header_home", exact: true },
  { to: "/services", label: "Послуги", settingKey: "header_services" },
  { to: "/tariffs", label: "Тарифи", settingKey: "header_tariffs" },
  { to: "/instructions", label: "Інструкції", settingKey: "header_instructions" },
  { to: "/support", label: "Підтримка", settingKey: "header_support" },
  { to: "/payment", label: "Оплата", settingKey: "header_payment" },
  { to: "/contacts", label: "Контакти", settingKey: "header_contacts" },
];

function NavLinks({ onClick, mobile = false }: { onClick?: () => void; mobile?: boolean }) {
  // Read each toggle individually so the rules-of-hooks are respected.
  const visibility = NAV_ITEMS.map((i) => useSetting(i.settingKey, true));
  return (
    <>
      {NAV_ITEMS.map((item, idx) => {
        if (!visibility[idx]) return null;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onClick}
            className={
              mobile
                ? "block rounded-lg px-4 py-3 text-sm font-medium hover:bg-secondary"
                : "rounded-full px-4 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-secondary hover:text-foreground"
            }
            activeProps={{
              className: mobile
                ? "block rounded-lg px-4 py-3 text-sm font-semibold bg-secondary"
                : "rounded-full px-4 py-2 text-sm font-semibold bg-secondary text-foreground",
            }}
            activeOptions={{ exact: !!item.exact }}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { isAdmin } = useAuth();
  const { brand, contacts, links } = useContent();
  const showPhone = useSetting("header_phone", true);
  const showCabinet = useSetting("header_cabinet_btn", true);
  const showAdmin = useSetting("header_admin_btn", true);
  const showSocials = useSetting("header_socials", true);
  const showTelegram = useSetting("telegram", false);
  const phoneTel = "+" + (contacts.primary_phone || "").replace(/\D/g, "");

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt={brand.name} className="h-11 w-11 object-contain" />
          <div className="leading-tight">
            <div className="font-display text-lg font-bold tracking-tight">{brand.name}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{brand.tagline}</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <NavLinks />
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {showSocials && (
            <div className="hidden xl:block">
              <SocialIcons facebook={links.facebook} viber={links.viber} telegram={links.telegram} showTelegram={showTelegram} />
            </div>
          )}
          {showPhone && contacts.primary_phone && (
            <a href={`tel:${phoneTel}`} className="flex items-center gap-2 text-sm font-semibold text-foreground/80 hover:text-foreground">
              <Phone className="h-4 w-4 text-brand" />
              {contacts.primary_phone}
            </a>
          )}
          {showCabinet && (
            <a
              href={links.cabinet}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition-transform hover:scale-[1.02]"
            >
              Особистий кабінет
            </a>
          )}
          {showAdmin && (
            <Link
              to={isAdmin ? "/admin" : "/login"}
              title={isAdmin ? "Адмін-панель" : "Вхід для адміна"}
              className="rounded-full border border-border bg-background p-2.5 text-foreground/70 transition-colors hover:border-brand hover:text-brand"
            >
              <Shield className="h-4 w-4" />
            </Link>
          )}
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
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            <NavLinks mobile onClick={() => setOpen(false)} />
            {showCabinet && (
              <a
                href={links.cabinet}
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg bg-gradient-brand px-4 py-3 text-center text-sm font-semibold text-brand-foreground"
              >
                Особистий кабінет
              </a>
            )}
            {showSocials && (
              <div className="flex justify-center pt-3">
                <SocialIcons facebook={links.facebook} viber={links.viber} telegram={links.telegram} showTelegram={showTelegram} />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
