import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useSetting(key: string, fallback = true) {
  const [enabled, setEnabled] = useState(fallback);
  useEffect(() => {
    let active = true;
    supabase.from("site_settings").select("enabled").eq("key", key).maybeSingle()
      .then(({ data }) => { if (active && data) setEnabled(data.enabled); });
    const ch = supabase.channel(`setting-${key}-${Math.random().toString(36).slice(2)}`);
    ch.on("postgres_changes" as any, { event: "*", schema: "public", table: "site_settings", filter: `key=eq.${key}` },
        (p: any) => setEnabled(!!p.new?.enabled))
      .subscribe();
    return () => { active = false; supabase.removeChannel(ch); };
  }, [key]);
  return enabled;
}
