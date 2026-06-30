import { useCallback, useEffect, useState } from 'react'
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

/**
 * Tracks which journey days the visitor has completed, persisted locally.
 * No account required — progress lives in the browser only.
 */
export function useProgress() {
  const [completed, setCompleted] = useState(readStored)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed))
    } catch {
      /* storage unavailable (e.g. private mode) — fail silently */
    }
  }, [completed])

  const markComplete = useCallback((day) => {
    setCompleted((prev) => (prev.includes(day) ? prev : [...prev, day].sort((a, b) => a - b)))
  }, [])

  const reset = useCallback(() => setCompleted([]), [])

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
