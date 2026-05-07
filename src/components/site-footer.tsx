import { Link } from "@tanstack/react-router";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Зурбаган" className="h-10 w-10 object-contain" />
              <span className="font-display text-lg font-bold">ЗУРБАГАН</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Оператор кабельного ТБ та інтернет-провайдер у Конотопі. З вами з 2002 року.
            </p>
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
                <a href="tel:+380673002200" className="block hover:text-brand">067 300 22 00</a>
                <a href="tel:+380663002200" className="block hover:text-brand">066 300 22 00</a>
                <a href="tel:+380732002200" className="block hover:text-brand">073 200 22 00</a>
              </div></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand" />
                <a href="mailto:info@zurbagan.tv" className="hover:text-brand">info@zurbagan.tv</a>
              </li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand" /> м. Конотоп</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Графік роботи</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-brand" /> Пн–Пт: 9:00–18:00</li>
              <li className="pl-6 text-muted-foreground">Перерва 13:00–14:00</li>
              <li className="pl-6 text-muted-foreground">Сб–Нд: вихідні</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Зурбаган. Усі права захищені.</div>
          <div>Світ інформації та розваг</div>
        </div>
      </div>
    </footer>
  );
}
