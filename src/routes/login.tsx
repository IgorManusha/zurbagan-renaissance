import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PageHeader, Section } from "@/components/page-shell";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Вхід для адміністратора — Зурбаган" }] }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");
    if (!email || password.length < 6) { toast.error("Заповніть email та пароль (мін. 6 символів)"); return; }
    setLoading(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/admin" } });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Перевірте пошту для підтвердження або одразу увійдіть.");
      setMode("signin");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Вхід виконано");
      nav({ to: "/admin" });
    }
  }

  return (
    <>
      <PageHeader eyebrow="Адмін-доступ" title={mode === "signin" ? "Вхід" : "Реєстрація"} />
      <Section>
        <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-3 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <input name="email" type="email" required placeholder="Email" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
          <input name="password" type="password" required placeholder="Пароль" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
          <button disabled={loading} className="w-full rounded-full bg-gradient-brand px-6 py-3 font-semibold text-brand-foreground">
            {loading ? "…" : mode === "signin" ? "Увійти" : "Зареєструватися"}
          </button>
          <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="block w-full text-center text-sm text-muted-foreground hover:text-brand">
            {mode === "signin" ? "Створити акаунт" : "Уже є акаунт? Увійти"}
          </button>
          <p className="text-xs text-muted-foreground">Перший зареєстрований акаунт автоматично отримує права адміністратора.</p>
        </form>
      </Section>
    </>
  );
}
