import { useCallback, useState } from 'react'
import { totalDays } from '../data/journey'

const STORAGE_KEY = 'gbg.progress.finding-peace-with-god'

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((n) => Number.isInteger(n)) : []
  } catch {
    return []
  }
}

function writeStored(days) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(days))
  } catch {
    /* storage unavailable (e.g. private mode) — fail silently */
  }
}

/**
 * Tracks which journey days the visitor has completed, persisted locally.
 * No account required — progress lives in the browser only.
 *
 * Persistence is written synchronously on every mutation (not in an effect)
 * so that completing the *final* day still saves even though the page
 * immediately navigates away and unmounts this component.
 */
export function useProgress() {
  const [completed, setCompleted] = useState(readStored)

  const markComplete = useCallback((day) => {
    // Persist against the authoritative stored value so the write survives
    // navigation/unmount, then mirror it into local state for reactivity.
    const stored = readStored()
    if (!stored.includes(day)) {
      writeStored([...stored, day].sort((a, b) => a - b))
    }
    setCompleted((prev) => (prev.includes(day) ? prev : [...prev, day].sort((a, b) => a - b)))
  }, [])

  const reset = useCallback(() => {
    writeStored([])
    setCompleted([])
  }, [])

  const isComplete = useCallback((day) => completed.includes(day), [completed])

  // The next unfinished day, capped at the final day of the journey.
  const nextDay = Math.min(
    (completed.length ? Math.max(...completed) : 0) + 1,
    totalDays,
  )

  return {
    completed,
    completedCount: completed.length,
    totalDays,
    nextDay,
    isComplete,
    markComplete,
    reset,
  }
}
