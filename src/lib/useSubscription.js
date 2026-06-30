import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'guided_by_grace_subscribed_email'
const EVENT = 'gbg:subscription-changed'

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY) || ''
  } catch {
    return ''
  }
}

/**
 * Tracks whether this browser has subscribed for future journey updates.
 *
 * This is NOT authentication — there is no account, no login, no session.
 * It only remembers the email address locally so the UI can show a calm
 * "you're on the list" state instead of the signup form.
 *
 * State is shared across every component using this hook (e.g. the form and
 * the header indicator) via a custom window event, and across tabs via the
 * native `storage` event.
 */
export function useSubscription() {
  const [email, setEmail] = useState(readStored)

  useEffect(() => {
    const sync = () => setEmail(readStored())
    window.addEventListener(EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const subscribe = useCallback((value) => {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* storage unavailable (e.g. private mode) — fail silently */
    }
    setEmail(value)
    window.dispatchEvent(new Event(EVENT))
  }, [])

  const unsubscribe = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore storage errors */
    }
    setEmail('')
    window.dispatchEvent(new Event(EVENT))
  }, [])

  return { email, isSubscribed: Boolean(email), subscribe, unsubscribe }
}
