import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Введіть ім'я").max(100),
  phone: z.string().trim().min(7, "Введіть телефон").max(30),
  address: z.string().trim().max(200).optional(),
  message: z.string().trim().max(1000).optional(),
  tariff: z.string().trim().max(100).optional(),
});

export function ApplicationForm({ tariff, compact = false }: { tariff?: string; compact?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"), phone: fd.get("phone"),
      address: fd.get("address") || undefined,
      message: fd.get("message") || undefined,
      tariff: tariff || (fd.get("tariff") as string) || undefined,
    });
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setLoading(true);
    const { error } = await supabase.from("applications").insert({ ...parsed.data, status: "new" });
    setLoading(false);
    if (error) { toast.error("Не вдалось надіслати: " + error.message); return; }
    toast.success("Заявку прийнято! Ми зателефонуємо найближчим часом.");
    setDone(true);
    (e.currentTarget as HTMLFormElement).reset();
  }

  if (done && compact) {
    return <div className="rounded-xl bg-brand/10 p-4 text-sm text-brand">Дякуємо! Ваша заявка прийнята.</div>;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input name="name" required placeholder="Ваше ім'я" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand" />
      <input name="phone" required placeholder="Телефон" type="tel" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand" />
      <input name="address" placeholder="Адреса підключення" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand" />
      {!tariff && (
        <input name="tariff" placeholder="Бажаний тариф (необов'язково)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand" />
      )}
      {!compact && (
        <textarea name="message" rows={3} placeholder="Повідомлення" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand" />
      )}
      <button disabled={loading} className="w-full rounded-full bg-gradient-brand px-6 py-3 font-semibold text-brand-foreground shadow-soft transition-transform hover:scale-[1.01] disabled:opacity-60">
        {loading ? "Надсилаємо…" : "Залишити заявку"}
      </button>
    </form>
  );
}
