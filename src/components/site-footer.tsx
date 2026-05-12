import { Link } from "@tanstack/react-router";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
import { useContent } from "@/hooks/use-content";
import { useSetting } from "@/hooks/use-settings";
import { SocialIcons } from "@/components/social-icons";

export function SiteFooter() {
  const { brand, contacts, links } = useContent();
  const showTelegram = useSetting("telegram", false);
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt={brand.name} className="h-10 w-10 object-contain" />
              <span className="font-display text-lg font-bold">{brand.name}</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">{brand.description}</p>
            <div className="mt-5">
              <SocialIcons facebook={links.facebook} viber={links.viber} telegram={links.telegram} showTelegram={showTelegram} />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Навігація</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-brand">Послуги</Link></li>
              <li><Link to="/tariffs" className="hover:text-brand">Тарифи</Link></li>
              <li><Link to="/instructions" className="hover:text-brand">Інструкції</Link></li>
              <li><Link to="/support" className="hover:text-brand">Підтримка</Link></li>
              <li><Link to="/offer" className="hover:text-brand">Публічна оферта</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Контакти</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-brand" /><div>
                {contacts.phones.map((p) => (
                  <a key={p} href={`tel:+${p.replace(/\D/g, "")}`} className="block hover:text-brand">{p}</a>
                ))}
              </div></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand" />
                <a href={`mailto:${contacts.email}`} className="hover:text-brand">{contacts.email}</a>
              </li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand" /> {contacts.address}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Графік роботи</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-brand" /> {contacts.schedule}</li>
              <li className="pl-6 text-muted-foreground">{contacts.schedule_note}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} {brand.name}. Усі права захищені.</div>
          <div>{brand.footer_tagline}</div>
        </div>
      </div>
    </footer>
  );
}
