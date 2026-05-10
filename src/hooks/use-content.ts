import { createContext, createElement, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Brand = { name: string; tagline: string; description: string; footer_tagline: string; years: string };
export type Contacts = { phones: string[]; primary_phone: string; email: string; address: string; schedule: string; schedule_note: string };
export type Requisites = { iban: string; bank: string; recipient: string; notice: string };
export type Links = { cabinet: string; facebook: string; viber: string; telegram: string; speedtest: string };

export type SiteContent = {
  brand: Brand;
  contacts: Contacts;
  requisites: Requisites;
  links: Links;
};

export const DEFAULT_CONTENT: SiteContent = {
  brand: { name: "ЗУРБАГАН", tagline: "Internet · TV", description: "Оператор кабельного ТБ та інтернет-провайдер у Конотопі. Понад 30 років на ринку.", footer_tagline: "Світ інформації та розваг", years: "30+" },
  contacts: { phones: ["067 300 22 00", "066 300 22 00", "073 200 22 00"], primary_phone: "067 300 22 00", email: "info@zurbagan.tv", address: "м. Конотоп, Сумська обл.", schedule: "Пн–Пт: 9:00–18:00", schedule_note: "Перерва 13:00–14:00 · Сб–Нд: вихідні" },
  requisites: { iban: "UA393052990000026005045201817", bank: "АТ КБ «ПРИВАТБАНК»", recipient: "ТОВ «Зурбаган»", notice: "Шановні абоненти, які поповнюють рахунок не з Приват24: оплата здійснюється на новий розрахунковий рахунок UA393052990000026005045201817, відкритий в АТ КБ «ПРИВАТБАНК»." },
  links: { cabinet: "https://abadm.kntv.sumy.ua:9443/", facebook: "https://www.facebook.com/profile.php?id=100041707791128", viber: "viber://chat?number=%2B380673002200", telegram: "https://t.me/zurbagan_super_bot", speedtest: "https://speedtest.org.ua/ua/site/index" },
};

const Ctx = createContext<SiteContent>(DEFAULT_CONTENT);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data } = await supabase.from("site_content").select("key,value");
      if (!active || !data) return;
      const next: any = { ...DEFAULT_CONTENT };
      for (const row of data) {
        if ((next as any)[row.key]) next[row.key] = { ...(next as any)[row.key], ...(row.value as object) };
      }
      setContent(next);
    };
    load();
    const ch = supabase.channel("site-content")
      .on("postgres_changes", { event: "*", schema: "public", table: "site_content" }, () => load())
      .subscribe();
    return () => { active = false; supabase.removeChannel(ch); };
  }, []);

  return createElement(Ctx.Provider, { value: content }, children);
}

export function useContent() { return useContext(Ctx); }
