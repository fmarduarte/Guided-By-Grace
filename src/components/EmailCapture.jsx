import { useId, useState } from 'react'
import Button from './Button'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { useSubscription } from '../lib/useSubscription'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Fire-and-forget welcome email via the `send-welcome-email` Edge Function.
 *
 * Intentionally never throws and never blocks the UI: a failed welcome email
 * must NOT fail the subscription. Errors are surfaced only in development.
 * Called only for fresh signups (not duplicates) to avoid re-welcoming.
 */
async function sendWelcomeEmail(email, source, journey) {
  if (!supabase) return
  try {
    const { error } = await supabase.functions.invoke('send-welcome-email', {
      body: { email, source, journey },
    })
    if (error && import.meta.env.DEV) {
      console.error('[EmailCapture] Welcome email failed (subscription still succeeded):', error)
    }
  } catch (err) {
    if (import.meta.env.DEV) {
      console.error('[EmailCapture] Welcome email threw (subscription still succeeded):', err)
    }
  }
}

/**
 * A calm, reusable email capture block.
 *
 * Renders only its own content (heading + form), so the caller controls the
 * surrounding layout — it can sit inside a section, a card, or a footer.
 *
 * Emails are saved to the Supabase `email_subscribers` table (see
 * supabase/migrations). This is a subscriber list, not authentication: no
 * login, no password, no account.
 *
 * Props:
 *  - source       where the signup happened (e.g. "landing_footer")
 *  - journey      the journey it relates to, if any
 *  - title        heading text (pass null to hide)
 *  - description  supporting line (pass null to hide)
 *  - buttonLabel  submit button label
 *  - className    extra classes for the wrapper
 */
export default function EmailCapture({
  source = 'unknown',
  journey = null,
  title = 'Continue your walk with God.',
  description = 'Receive the next guided journey and future reflections when they\u2019re ready.',
  buttonLabel = 'Notify Me',
  className = '',
}) {
  const inputId = useId()
  const [email, setEmail] = useState('')
  // idle | invalid | submitting | duplicate | error
  const [status, setStatus] = useState('idle')
  const { email: subscribedEmail, isSubscribed, subscribe, unsubscribe } = useSubscription()

  function handleUseAnother() {
    unsubscribe()
    setEmail('')
    setStatus('idle')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const value = email.trim().toLowerCase()

    if (!EMAIL_RE.test(value)) {
      setStatus('invalid')
      return
    }

    setStatus('submitting')

    if (!isSupabaseConfigured || !supabase) {
      console.error(
        '[EmailCapture] Cannot submit: Supabase is not configured. ' +
          'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (see .env.example).',
      )
      setStatus('error')
      return
    }

    try {
      // New subscribers are created with status='active' and a unique
      // unsubscribe_token — both filled by Supabase column defaults, so we only
      // send the fields the visitor actually provided. The unsubscribe_token is
      // used later (server-side) to generate one-click unsubscribe links.
      const { error } = await supabase
        .from('email_subscribers')
        .insert({ email: value, source, journey })

      if (error) {
        // 23505 = unique_violation → this email already exists on the list.
        //
        // We deliberately do NOT update the row from the frontend. The anon key
        // has no UPDATE/SELECT policy (RLS stays secure), so we can't read the
        // row's `status` here. Reactivating a previously-unsubscribed address is
        // intentionally deferred to a future Supabase Edge Function (service-role) —
        // never a direct frontend update or a public UPDATE policy.
        //
        // For now we simply confirm they're already on the list.
        if (error.code === '23505') {
          setStatus('duplicate')
        } else {
          // TEMP DEBUG: surface the real Supabase error in the console.
          // Safe to log — contains no keys, only the failure reason.
          console.error('[EmailCapture] Supabase insert failed', {
            table: 'email_subscribers',
            payload: { source, journey }, // email omitted on purpose
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint,
          })
          setStatus('error')
        }
        return
      }

      setEmail('')
      subscribe(value)
      // Fresh signup only — send the calm welcome email without blocking.
      void sendWelcomeEmail(value, source, journey)
    } catch (err) {
      // TEMP DEBUG: network / client-side failure (e.g. bad URL, CORS, fetch).
      console.error('[EmailCapture] Unexpected error during signup:', err)
      setStatus('error')
    }
  }

  if (isSubscribed) {
    return (
      <div className={className}>
        <div
          className="animate-fade-in rounded-2xl bg-sage-100 px-5 py-5 text-left"
          role="status"
          aria-live="polite"
        >
          <p className="flex items-center gap-2 font-serif text-lg font-medium text-sage-900">
            <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-sage-600" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 0 1 1.4-1.4l3.1 3.1 6.8-6.8a1 1 0 0 1 1.4 0z"
                clipRule="evenodd"
              />
            </svg>
            You&apos;re on the list.
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            We&apos;ll let you know when the next guided journey is ready.
          </p>
          {subscribedEmail && (
            <p className="mt-3 text-xs text-ink-soft/80">
              Updates will be sent to: {subscribedEmail}
            </p>
          )}
          <button
            type="button"
            onClick={handleUseAnother}
            className="mt-3 text-xs font-medium text-sage-700 underline underline-offset-4 transition hover:text-sage-900"
          >
            Use another email
          </button>
        </div>
      </div>
    )
  }

  if (status === 'duplicate') {
    return (
      <div className={className}>
        <p
          className="animate-fade-in inline-flex items-center gap-2 rounded-2xl bg-sage-100 px-5 py-4 text-sm font-medium text-sage-700"
          role="status"
          aria-live="polite"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-sage-600" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 0 1 1.4-1.4l3.1 3.1 6.8-6.8a1 1 0 0 1 1.4 0z"
              clipRule="evenodd"
            />
          </svg>
          You&apos;re already on the list. We&apos;ll keep you updated.
        </p>
      </div>
    )
  }

  const submitting = status === 'submitting'

  return (
    <div className={className}>
      {title && (
        <p className="font-serif text-xl font-medium text-sage-900 sm:text-2xl">{title}</p>
      )}
      {description && <p className="mt-2 text-ink-soft">{description}</p>}

      <form onSubmit={handleSubmit} noValidate className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          disabled={submitting}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'invalid') setStatus('idle')
          }}
          className="w-full rounded-full border border-sand-200 bg-sand-100 px-5 py-3 text-ink placeholder:text-ink-soft/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 disabled:opacity-60 sm:flex-1"
          aria-invalid={status === 'invalid'}
        />
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Sending\u2026' : buttonLabel}
        </Button>
      </form>

      {status === 'invalid' && (
        <p className="mt-2 text-sm text-sage-700">Please enter a valid email address.</p>
      )}
      {status === 'error' && (
        <p className="mt-2 text-sm text-sage-700">
          Something gentle went wrong. Please try again in a moment.
        </p>
      )}
    </div>
  )
}
