// Shared TypeScript types for the application.
// Database row types live in `src/integrations/supabase/types.ts` and are
// re-exported via `@/services/supabase`.
export type ApplicationStatus =
  | "new"
  | "queue"
  | "done"
  | "rejected"
  | "no_option"
  | "postponed"
  | "kk";
