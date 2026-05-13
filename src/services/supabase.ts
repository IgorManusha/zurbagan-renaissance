/**
 * Single Supabase client entry point for the application.
 *
 * The auto-generated `src/integrations/supabase/client.ts` is managed by the
 * project tooling and should not be edited. This module re-exports it under a
 * stable path so the rest of the codebase only ever imports from
 * `@/services/supabase`.
 *
 * Server-only access (service-role) lives in
 * `src/integrations/supabase/client.server.ts` and must never be imported
 * from browser code.
 */
export { supabase } from "@/integrations/supabase/client";
export type { Database } from "@/integrations/supabase/types";
