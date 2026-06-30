import { useEffect, useRef, useState } from 'react'
import Container from './Container'
import Button from './Button'

/**
 * Grace Guide — a *concept preview* of a future gentle Christian companion.
 *
 * IMPORTANT (positioning):
 *  - Grace Guide does NOT speak for God.
 *  - It does NOT replace Scripture, the church, pastors, counselors, or
 *    professional help.
 *  - It is only a gentle companion that points to the next small step inside
 *    Guided by Grace.
 *
 * There is no AI here yet. The modal is a mock with predefined options and
 * predefined, hand-written responses that link to existing parts of the app.
 */

const prompts = [
  {
    id: 'peace',
    label: 'I need peace',
    message:
      'Peace often begins simply by slowing down with God for a few minutes. The journey “Finding Peace with God” was made for a moment just like this.',
    action: { label: 'Begin the journey', to: '/walk' },
  },
  {
    id: 'pray',
    label: 'I want to pray',
    message:
      'You don’t need the right words to pray — only an honest heart. Today’s reading includes a short, written prayer you can quietly make your own.',
    action: { label: 'Open Today’s Walk', to: '/walk' },
  },
  {
    id: 'lost',
    label: 'I feel lost',
    message:
      'Feeling lost is a tender place to be, and you’re not alone in it. One small, guided step can help you find your footing again today.',
    action: { label: 'Take one small step', to: '/walk/day/1' },
  },
  {
    id: 'hope',
    label: 'I need hope',
    message:
      'Hope isn’t pretending everything is fine — it’s trusting the One who holds tomorrow. Day 7 rests on that very promise.',
    action: { label: 'Read about hope', to: '/walk/day/7' },
  },
  {
    id: 'start',
    label: 'Help me start',
    message:
      'Welcome — here’s all it takes: open the Word, read a short reflection and prayer, then carry one small step into your day. About five quiet minutes.',
    action: { label: 'Start Today’s Walk', to: '/walk' },
  },
]

const DISCLAIMER =
  'Grace Guide is a gentle companion to help you take your next step here — not the voice of God, and not a replacement for Scripture, your church, a pastor, or professional care.'

function GraceGuideModal({ onClose }) {
  const [selected, setSelected] = useState(null)
  const dialogRef = useRef(null)

  // Close on Escape and lock background scroll while open.
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="presentation"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-sage-900/30 backdrop-blur-sm" aria-hidden="true" />

      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="grace-guide-title"
        className="relative w-full max-w-md rounded-3xl border border-sand-200 bg-sand-50 shadow-float outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-sand-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-sage-100 text-sage-700">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M4 14c4-1 7-4 8-9 1 5 4 8 8 9-4 1-7 4-8 9-1-5-4-8-8-9z" />
              </svg>
            </span>
            <div>
              <p id="grace-guide-title" className="font-serif text-lg font-medium text-sage-900">
                Grace Guide
              </p>
              <p className="text-xs text-ink-soft">A gentle companion · preview</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Grace Guide"
            className="rounded-full p-1.5 text-ink-soft transition hover:bg-sand-200 hover:text-sage-900"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M6.3 5l3.7 3.7L13.7 5l1.3 1.3L11.3 10l3.7 3.7-1.3 1.3L10 11.3 6.3 15 5 13.7 8.7 10 5 6.3z" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-6">
          {selected ? (
            <div>
              <button
                onClick={() => setSelected(null)}
                className="mb-4 inline-flex items-center gap-1 text-sm text-ink-soft transition hover:text-sage-900"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.7 4.3a1 1 0 0 1 0 1.4L8.4 10l4.3 4.3a1 1 0 0 1-1.4 1.4l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.4 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Back
              </button>
              <p className="text-xs font-semibold uppercase tracking-widest text-sage-500">
                {selected.label}
              </p>
              <p className="mt-3 leading-relaxed text-sage-900">{selected.message}</p>
              <div className="mt-6">
                <Button to={selected.action.to} variant="gold" className="w-full" onClick={onClose}>
                  {selected.action.label}
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sage-900">What&apos;s on your heart today?</p>
              <p className="mt-1 text-sm text-ink-soft">
                Choose one, and Grace Guide will point you to a next step.
              </p>
              <div className="mt-5 grid gap-2.5">
                {prompts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelected(p)}
                    className="flex items-center justify-between rounded-2xl border border-sand-200 bg-sand-100/70 px-4 py-3 text-left text-sage-900 transition hover:border-sage-300 hover:bg-sage-50"
                  >
                    <span className="font-medium">{p.label}</span>
                    <svg
                      viewBox="0 0 20 20"
                      className="h-4 w-4 text-sage-500"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.3 4.3a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4L11.6 10 7.3 5.7a1 1 0 0 1 0-1.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="border-t border-sand-200 px-6 py-4 text-xs leading-relaxed text-ink-soft">
          {DISCLAIMER}{' '}
          If you&apos;re in crisis, please reach out to a trusted person or local emergency
          services.
        </p>
      </div>
    </div>
  )
}

export default function GraceGuide() {
  const [open, setOpen] = useState(false)

  return (
    <section className="py-8">
      <Container size="narrow">
        <div className="rounded-3xl border border-sage-300 bg-sage-50 p-8 text-center shadow-grace sm:p-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-sage-300 bg-sand-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-sage-700">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            Grace Guide · coming soon
          </span>

          <h2 className="mt-5 font-serif text-3xl font-medium text-sage-900">
            Need guidance today?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-ink-soft">
            Share what&apos;s on your heart, and Grace Guide will help you find a prayer,
            reflection, or journey for today.
          </p>

          <div className="mt-7">
            <Button onClick={() => setOpen(true)} size="lg" variant="gold">
              Talk to Grace Guide
            </Button>
          </div>

          <p className="mx-auto mt-5 max-w-sm text-xs text-ink-soft">
            A gentle companion to help you take the next step — never a replacement for
            Scripture, your church, or a pastor.
          </p>
        </div>
      </Container>

      {open && <GraceGuideModal onClose={() => setOpen(false)} />}
    </section>
  )
}
