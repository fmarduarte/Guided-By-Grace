import { createClient } from '@supabase/supabase-js'

/**
 * Supabase browser client.
 *
 * Only the public anon key is used here — it is safe to ship in the client
 * bundle. NEVER put the service-role key in this file or in any VITE_* var.
 *
 * If the environment variables are missing (e.g. a fresh checkout without a
 * .env file), the client is left null so the app still builds and runs;
 * features that need it degrade gracefully instead of crashing.
 */
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

if (!isSupabaseConfigured) {
  // List exactly which variable is missing — never print the values.
  const missing = [
    !url && 'VITE_SUPABASE_URL',
    !anonKey && 'VITE_SUPABASE_ANON_KEY',
  ].filter(Boolean)
  console.error(
    `[Guided by Grace] Supabase is not configured. Missing: ${missing.join(', ')}. ` +
      'Add them to a .env file in the project root (see .env.example) and RESTART the dev server ' +
      '(Vite only reads .env at startup).',
  )
} else if (import.meta.env.DEV) {
  // Confirms the env actually loaded into the running dev server, without
  // exposing the key. If you don't see this log, .env was not picked up.
  console.info(
    `[Guided by Grace] Supabase configured. URL host: ${(() => {
      try {
        return new URL(url).host
      } catch {
        return '(invalid VITE_SUPABASE_URL — not a valid URL)'
      }
    })()}`,
  )
}

export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null
