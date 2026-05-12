import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { PageHeader, Section } from "@/components/page-shell";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Адмінка — Зурбаган" }] }),
  component: Admin,
});

type Tab = "applications" | "news" | "content" | "settings" | "account";

function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const nav = useNavigate();
  const [tab, setTab] = useState<Tab>("applications");

  useEffect(() => { if (!loading && !user) nav({ to: "/login" }); }, [loading, user, nav]);

  if (loading) return <Section><p>Завантаження…</p></Section>;
  if (!user) return null;
  if (!isAdmin) return (
    <Section>
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-sm">
        Ви ввійшли як <strong>{user.email}</strong>, але не маєте прав адміністратора.
        <button onClick={() => supabase.auth.signOut()} className="ml-3 text-brand underline">Вийти</button>
      </div>
    </Section>
  );

  return (
    <>
      <PageHeader eyebrow="Адмінпанель" title="Керування сайтом" description={`Ви: ${user.email}`} />
      <Section>
        <div className="mb-6 flex flex-wrap gap-2">
          {(["applications", "news", "content", "settings", "account"] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${tab === t ? "bg-gradient-brand text-brand-foreground" : "bg-secondary text-foreground hover:bg-secondary/70"}`}>
              {t === "applications" ? "Заявки" : t === "news" ? "Новини" : t === "content" ? "Контент" : t === "settings" ? "Налаштування" : "Мій акаунт"}
            </button>
          ))}
          <button onClick={() => supabase.auth.signOut().then(() => nav({ to: "/" }))}
            className="ml-auto rounded-full border border-border px-5 py-2 text-sm hover:bg-secondary">Вийти</button>
          <Link to="/" className="rounded-full border border-border px-5 py-2 text-sm hover:bg-secondary">На сайт</Link>
        </div>
        {tab === "applications" && <Applications />}
        {tab === "news" && <News />}
        {tab === "content" && <Content />}
        {tab === "settings" && <Settings />}
        {tab === "account" && <Account />}
      </Section>
    </>
  );
}

function Applications() {
  const [rows, setRows] = useState<any[]>([]);
  const load = async () => {
    const { data } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
    setRows(data || []);
  };
  useEffect(() => { load(); }, []);
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-secondary text-left"><tr>
          <th className="p-3">Дата</th><th className="p-3">Ім'я</th><th className="p-3">Телефон</th>
          <th className="p-3">Адреса</th><th className="p-3">Тариф</th><th className="p-3">Статус</th><th></th>
        </tr></thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-t border-border">
              <td className="p-3 whitespace-nowrap">{new Date(r.created_at).toLocaleString("uk")}</td>
              <td className="p-3">{r.name}</td>
              <td className="p-3"><a href={`tel:${r.phone}`} className="text-brand">{r.phone}</a></td>
              <td className="p-3">{r.address || "—"}</td>
              <td className="p-3">{r.tariff || "—"}</td>
              <td className="p-3">
                <select value={r.status} onChange={async (e) => {
                  await supabase.from("applications").update({ status: e.target.value }).eq("id", r.id); load();
                }} className="rounded border border-border bg-background px-2 py-1">
                  <option value="new">Нова</option><option value="in_progress">В роботі</option>
                  <option value="done">Підключено</option><option value="rejected">Відмова</option>
                </select>
              </td>
              <td className="p-3"><button onClick={async () => {
                if (!confirm("Видалити?")) return;
                await supabase.from("applications").delete().eq("id", r.id); load();
              }} className="text-destructive">×</button></td>
            </tr>
          ))}
          {rows.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">Заявок немає</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function News() {
  const [rows, setRows] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const load = async () => {
    const { data } = await supabase.from("news").select("*").order("published_at", { ascending: false });
    setRows(data || []);
  };
  useEffect(() => { load(); }, []);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      title: String(fd.get("title")), excerpt: String(fd.get("excerpt") || ""),
      content: String(fd.get("content")), published: fd.get("published") === "on",
    };
    const { error } = editing?.id
      ? await supabase.from("news").update(payload).eq("id", editing.id)
      : await supabase.from("news").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Збережено"); setEditing(null); load();
  }

  return (
    <div className="space-y-6">
      <button onClick={() => setEditing({})} className="rounded-full bg-gradient-brand px-5 py-2 text-sm font-semibold text-brand-foreground">+ Додати новину</button>
      {editing && (
        <form onSubmit={save} className="space-y-3 rounded-2xl border border-border bg-card p-5">
          <input name="title" required defaultValue={editing.title} placeholder="Заголовок" className="w-full rounded-xl border border-border bg-background px-3 py-2" />
          <input name="excerpt" defaultValue={editing.excerpt} placeholder="Короткий опис" className="w-full rounded-xl border border-border bg-background px-3 py-2" />
          <textarea name="content" required defaultValue={editing.content} rows={6} placeholder="Повний текст" className="w-full rounded-xl border border-border bg-background px-3 py-2" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="published" defaultChecked={editing.published ?? true} /> Опубліковано</label>
          <div className="flex gap-2">
            <button className="rounded-full bg-gradient-brand px-5 py-2 text-sm font-semibold text-brand-foreground">Зберегти</button>
            <button type="button" onClick={() => setEditing(null)} className="rounded-full border border-border px-5 py-2 text-sm">Скасувати</button>
          </div>
        </form>
      )}
      <div className="space-y-2">
        {rows.map(n => (
          <div key={n.id} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4">
            <div>
              <div className="font-semibold">{n.title} {!n.published && <span className="ml-2 text-xs text-muted-foreground">(чернетка)</span>}</div>
              <div className="text-xs text-muted-foreground">{new Date(n.published_at).toLocaleDateString("uk")}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(n)} className="text-brand text-sm">Редагувати</button>
              <button onClick={async () => { if (confirm("Видалити?")) { await supabase.from("news").delete().eq("id", n.id); load(); } }} className="text-destructive text-sm">Видалити</button>
            </div>
          </div>
        ))}
        {rows.length === 0 && <p className="text-muted-foreground">Новин немає</p>}
      </div>
    </div>
  );
}

function Settings() {
  const [rows, setRows] = useState<any[]>([]);
  const load = async () => {
    const { data } = await supabase.from("site_settings").select("*").order("key");
    setRows(data || []);
  };
  useEffect(() => { load(); }, []);
  const labels: Record<string, string> = {
    telegram: "Telegram-бот (показувати у підтримці й заголовку)",
    news_block: "Блок «Останні оголошення» на головній",
    services_block: "Блок «Послуги» на головній",
    tariffs_block: "Блок «Тарифи» на головній",
    speedtest_block: "Віджет Speedtest",
  };
  return (
    <div className="space-y-2">
      {rows.map(s => (
        <label key={s.key} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4">
          <div>
            <div className="font-medium">{labels[s.key] || s.key}</div>
            <div className="text-xs text-muted-foreground">{s.key}</div>
          </div>
          <input type="checkbox" checked={s.enabled} onChange={async (e) => {
            await supabase.from("site_settings").update({ enabled: e.target.checked }).eq("key", s.key); load();
          }} className="h-5 w-10" />
        </label>
      ))}
    </div>
  );
}

const SCHEMA: Record<string, { label: string; fields: { key: string; label: string; type?: "text" | "textarea" | "list" }[] }> = {
  brand: {
    label: "Бренд",
    fields: [
      { key: "name", label: "Назва бренду" },
      { key: "tagline", label: "Підпис під логотипом" },
      { key: "description", label: "Опис у футері", type: "textarea" },
      { key: "footer_tagline", label: "Слоган у футері" },
      { key: "years", label: "Років на ринку (напр. 30+)" },
    ],
  },
  contacts: {
    label: "Контакти",
    fields: [
      { key: "phones", label: "Телефони (по одному на рядок)", type: "list" },
      { key: "primary_phone", label: "Основний телефон (у шапці)" },
      { key: "email", label: "Email" },
      { key: "address", label: "Адреса" },
      { key: "schedule", label: "Графік роботи" },
      { key: "schedule_note", label: "Примітка до графіку" },
    ],
  },
  requisites: {
    label: "Реквізити",
    fields: [
      { key: "recipient", label: "Отримувач" },
      { key: "iban", label: "IBAN / р/р" },
      { key: "bank", label: "Банк" },
      { key: "notice", label: "Текст попередження на сторінці Оплата", type: "textarea" },
    ],
  },
  links: {
    label: "Посилання",
    fields: [
      { key: "cabinet", label: "Особистий кабінет (URL)" },
      { key: "facebook", label: "Facebook (URL)" },
      { key: "viber", label: "Viber (URL, viber://…)" },
      { key: "telegram", label: "Telegram (URL)" },
      { key: "speedtest", label: "Speedtest (URL)" },
    ],
  },
};

function Content() {
  const [rows, setRows] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState<string | null>(null);

  const load = async () => {
    const { data } = await supabase.from("site_content").select("key,value");
    const m: Record<string, any> = {};
    (data || []).forEach((r: any) => { m[r.key] = r.value; });
    setRows(m);
  };
  useEffect(() => { load(); }, []);

  async function save(key: string, value: any) {
    setSaving(key);
    const { error } = await supabase.from("site_content").upsert({ key, value });
    setSaving(null);
    if (error) toast.error(error.message);
    else { toast.success("Збережено"); load(); }
  }

  return (
    <div className="space-y-8">
      {Object.entries(SCHEMA).map(([sectionKey, section]) => {
        const value = rows[sectionKey] || {};
        return (
          <form key={sectionKey} onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const next: any = { ...value };
            section.fields.forEach(f => {
              const raw = String(fd.get(f.key) ?? "");
              next[f.key] = f.type === "list" ? raw.split("\n").map(s => s.trim()).filter(Boolean) : raw;
            });
            save(sectionKey, next);
          }} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">{section.label}</h3>
              <button disabled={saving === sectionKey} className="rounded-full bg-gradient-brand px-5 py-2 text-sm font-semibold text-brand-foreground disabled:opacity-50">
                {saving === sectionKey ? "Збереження…" : "Зберегти"}
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {section.fields.map(f => {
                const v = value[f.key];
                const def = f.type === "list" ? (Array.isArray(v) ? v.join("\n") : "") : (v ?? "");
                return (
                  <label key={f.key} className={`block text-sm ${f.type === "textarea" || f.type === "list" ? "md:col-span-2" : ""}`}>
                    <span className="mb-1 block text-xs font-medium text-muted-foreground">{f.label}</span>
                    {f.type === "textarea" || f.type === "list" ? (
                      <textarea name={f.key} defaultValue={def} rows={f.type === "list" ? 4 : 3}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2" />
                    ) : (
                      <input name={f.key} defaultValue={def}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2" />
                    )}
                  </label>
                );
              })}
            </div>
          </form>
        );
      })}
    </div>
  );
}

