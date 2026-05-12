import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, X, FileImage } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Введіть ім'я").max(60),
  last_name: z.string().trim().max(60).optional().or(z.literal("")),
  phone: z.string().trim().min(7, "Введіть телефон").max(30),
  region: z.string().trim().max(60).optional().or(z.literal("")),
  district: z.string().trim().max(60).optional().or(z.literal("")),
  city: z.string().trim().min(2, "Місто/село").max(80),
  street: z.string().trim().min(2, "Вулиця").max(100),
  house: z.string().trim().min(1, "Будинок").max(20),
  apartment: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  tariff: z.string().trim().max(100).optional().or(z.literal("")),
});

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

type Doc = { kind: "passport" | "tax_id"; file: File };

export function ApplicationForm({ tariff, compact = false }: { tariff?: string; compact?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [docs, setDocs] = useState<Doc[]>([]);

  function addFiles(kind: Doc["kind"], list: FileList | null) {
    if (!list) return;
    const next: Doc[] = [];
    for (const f of Array.from(list)) {
      if (!f.type.startsWith("image/") && f.type !== "application/pdf") {
        toast.error(`Файл ${f.name}: дозволено тільки зображення або PDF.`);
        continue;
      }
      if (f.size > MAX_SIZE) {
        toast.error(`Файл ${f.name} більше за 5 МБ.`);
        continue;
      }
      next.push({ kind, file: f });
    }
    setDocs((d) => [...d, ...next]);
  }

  function removeAt(i: number) { setDocs((d) => d.filter((_, idx) => idx !== i)); }

  async function uploadDocs(): Promise<{ kind: string; path: string; name: string }[]> {
    const uploaded: { kind: string; path: string; name: string }[] = [];
    for (const d of docs) {
      const ext = d.file.name.split(".").pop() || "bin";
      const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${d.kind}.${ext}`;
      const { error } = await supabase.storage.from("application-docs").upload(path, d.file, { contentType: d.file.type, upsert: false });
      if (error) throw new Error(`Завантаження ${d.file.name}: ${error.message}`);
      uploaded.push({ kind: d.kind, path, name: d.file.name });
    }
    return uploaded;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      last_name: fd.get("last_name") || "",
      phone: fd.get("phone"),
      region: fd.get("region") || "",
      district: fd.get("district") || "",
      city: fd.get("city"),
      street: fd.get("street"),
      house: fd.get("house"),
      apartment: fd.get("apartment") || "",
      message: fd.get("message") || "",
      tariff: tariff || (fd.get("tariff") as string) || "",
    });
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }

    setLoading(true);
    try {
      const uploaded = await uploadDocs();
      const v = parsed.data;
      const address = [v.region, v.district, v.city, v.street && `вул. ${v.street}`, v.house && `буд. ${v.house}`, v.apartment && `кв. ${v.apartment}`].filter(Boolean).join(", ");
      const { error } = await supabase.from("applications").insert({
        name: v.name,
        last_name: v.last_name || null,
        phone: v.phone,
        region: v.region || null,
        district: v.district || null,
        city: v.city,
        street: v.street,
        house: v.house,
        apartment: v.apartment || null,
        address,
        message: v.message || null,
        tariff: v.tariff || null,
        status: "new",
        documents: uploaded,
      });
      if (error) throw new Error(error.message);
      toast.success("Заявку прийнято! Ми зателефонуємо найближчим часом.");
      setDone(true);
      (e.currentTarget as HTMLFormElement).reset();
      setDocs([]);
    } catch (err: any) {
      toast.error("Не вдалось надіслати: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  if (done && compact) {
    return <div className="rounded-xl bg-brand/10 p-4 text-sm text-brand">Дякуємо! Ваша заявка прийнята.</div>;
  }

  const inp = "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-brand";

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" required placeholder="Ім'я *" className={inp} />
        <input name="last_name" placeholder="Прізвище" className={inp} />
      </div>
      <input name="phone" required placeholder="Телефон *" type="tel" className={inp} />

      {!compact && (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="region" placeholder="Область" defaultValue="Сумська" className={inp} />
            <input name="district" placeholder="Район" className={inp} />
          </div>
          <input name="city" required placeholder="Місто / село *" defaultValue="Конотоп" className={inp} />
          <div className="grid gap-3 sm:grid-cols-[1fr_120px_120px]">
            <input name="street" required placeholder="Вулиця *" className={inp} />
            <input name="house" required placeholder="Будинок *" className={inp} />
            <input name="apartment" placeholder="Квартира" className={inp} />
          </div>

          {/* Documents */}
          <div className="rounded-xl border border-dashed border-border bg-secondary/30 p-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Документи</div>
            <p className="mb-3 text-xs text-muted-foreground">
              Прикріпіть фото паспорта (1–2 сторінки) і фото ідентифікаційного коду (якщо паспорт старого зразка). Зображення до 5 МБ.
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5 text-xs font-semibold text-foreground/80 transition-colors hover:border-brand hover:text-brand">
                <Upload className="h-4 w-4" /> Фото паспорта
                <input type="file" accept="image/*,application/pdf" multiple className="hidden" onChange={(e) => addFiles("passport", e.target.files)} />
              </label>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5 text-xs font-semibold text-foreground/80 transition-colors hover:border-brand hover:text-brand">
                <Upload className="h-4 w-4" /> Фото ІПН
                <input type="file" accept="image/*,application/pdf" multiple className="hidden" onChange={(e) => addFiles("tax_id", e.target.files)} />
              </label>
            </div>
            {docs.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {docs.map((d, i) => (
                  <li key={i} className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-xs">
                    <span className="flex items-center gap-2 truncate">
                      <FileImage className="h-3.5 w-3.5 text-brand" />
                      <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
                        {d.kind === "passport" ? "Паспорт" : "ІПН"}
                      </span>
                      <span className="truncate">{d.file.name}</span>
                    </span>
                    <button type="button" onClick={() => removeAt(i)} className="rounded p-1 text-destructive hover:bg-destructive/10" aria-label="Видалити">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}

      {!tariff && !compact && (
        <input name="tariff" placeholder="Бажаний тариф (необов'язково)" className={inp} />
      )}
      {!compact && (
        <textarea name="message" rows={3} placeholder="Коментар (необов'язково)" className={inp} />
      )}

      <button disabled={loading} className="w-full rounded-full bg-gradient-brand px-6 py-3 font-semibold text-brand-foreground shadow-soft transition-transform hover:scale-[1.01] disabled:opacity-60">
        {loading ? "Надсилаємо…" : "Залишити заявку"}
      </button>
      <p className="text-[11px] text-muted-foreground">
        Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних згідно з умовами публічної оферти.
      </p>
    </form>
  );
}
