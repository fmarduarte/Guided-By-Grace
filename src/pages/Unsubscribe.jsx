import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Container from '../components/Container'
import Button from '../components/Button'
import { supabase } from '../lib/supabase'
import { useSubscription } from '../lib/useSubscription'

/**
 * Unsubscribe confirmation page.
 *
 * Reads the token from the email link and calls the `unsubscribe` Edge
 * Function, which performs the privileged update with the service-role key.
 * The browser NEVER updates email_subscribers directly (no public update
 * policy). No login, no account — just a token.
 */
export default function Unsubscribe() {
  const [params] = useSearchParams()
  const token = params.get('token') || ''
  const [state, setState] = useState('working') // working | done | error
  const { unsubscribe } = useSubscription()
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    if (!token) {
      setState('error')
      return
    }

    // Clear any local subscribed state on this browser (header indicator, form).
    unsubscribe()

    async function run() {
      if (!supabase) {
        setState('error')
        return
      }
      try {
        const { data, error } = await supabase.functions.invoke('unsubscribe', {
          body: { token },
        })
        // The function returns { ok: true } on success, and also for an
        // already-unsubscribed token (idempotent).
        if (error || !data?.ok) {
          if (import.meta.env.DEV) {
            console.error('[Unsubscribe] request failed:', error || data)
          }
          setState('error')
          return
        }
        setState('done')
      } catch (err) {
        if (import.meta.env.DEV) {
          console.error('[Unsubscribe] request threw:', err)
        }
        setState('error')
      }
    }
    run()
  }, [token, unsubscribe])

  return (
    <div className="bg-grace-glow">
      <Container
        size="narrow"
        className="flex min-h-[70vh] flex-col items-center justify-center py-16 text-center"
      >
        {state === 'working' && (
          <p className="text-ink-soft" role="status" aria-live="polite">
            One moment&hellip;
          </p>
        )}

        {state === 'done' && (
          <div className="animate-fade-in">
            <h1 className="font-serif text-3xl font-semibold text-sage-900 sm:text-4xl">
              You&apos;ve been unsubscribed.
            </h1>
            <p className="mx-auto mt-4 max-w-md text-ink-soft">
              You will no longer receive Guided by Grace updates.
            </p>
            <p className="mt-2 text-sm italic text-ink-soft">You&apos;re always welcome back.</p>
            <div className="mt-8">
              <Button to="/" variant="primary" size="lg">
                Return to Guided by Grace
              </Button>
            </div>
          </div>
        )}

        {state === 'error' && (
          <div className="animate-fade-in">
            <h1 className="font-serif text-3xl font-semibold text-sage-900 sm:text-4xl">
              We couldn&apos;t complete your unsubscribe request.
            </h1>
            <p className="mx-auto mt-4 max-w-md text-ink-soft">
              Please try again or contact support.
            </p>
            <div className="mt-8">
              <Button to="/" variant="primary" size="lg">
                Return to Guided by Grace
              </Button>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
