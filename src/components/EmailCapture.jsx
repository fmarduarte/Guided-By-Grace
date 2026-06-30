import { useState } from 'react'
import Container from './Container'
import Button from './Button'

const STORAGE_KEY = 'gbg.reminders.email'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Email capture for future daily reminders.
 *
 * There is no backend yet, so the address is stored locally in the browser.
 * Copy is intentionally honest about this — reminders are "coming soon".
 */
export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'error' | 'done'

  function handleSubmit(e) {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) {
      setStatus('error')
      return
    }
    try {
      localStorage.setItem(STORAGE_KEY, email)
    } catch {
      /* ignore storage errors */
    }
    setStatus('done')
  }

  return (
    <section className="py-20 sm:py-24" id="reminders">
      <Container size="narrow">
        <div className="rounded-[2rem] border border-sand-200 bg-sand-50 px-7 py-12 text-center shadow-grace sm:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-500">
            Stay gently reminded
          </p>
          <h2 className="mx-auto mt-4 max-w-md font-serif text-3xl font-medium text-sage-900">
            Build a daily rhythm
          </h2>
          <p className="mx-auto mt-3 max-w-md text-ink-soft">
            Daily reminders are coming soon. Leave your email and we&apos;ll let you know the
            moment they&apos;re ready.
          </p>

          {status === 'done' ? (
            <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-sage-100 px-5 py-3 text-sm font-medium text-sage-700">
              <svg viewBox="0 0 20 20" className="h-5 w-5 text-gold-500" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 0 1 1.4-1.4l3.1 3.1 6.8-6.8a1 1 0 0 1 1.4 0z"
                  clipRule="evenodd"
                />
              </svg>
              You&apos;re on the list. Thank you.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="reminder-email" className="sr-only">
                Email address
              </label>
              <input
                id="reminder-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status === 'error') setStatus('idle')
                }}
                className="w-full rounded-full border border-sand-200 bg-sand-100 px-5 py-3 text-ink placeholder:text-ink-soft/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                aria-invalid={status === 'error'}
              />
              <Button type="submit" variant="gold">
                Notify me
              </Button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-3 text-sm text-gold-500">Please enter a valid email address.</p>
          )}
        </div>
      </Container>
    </section>
  )
}
