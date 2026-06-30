import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Container from '../components/Container'
import Button from '../components/Button'
import ReadingBlock from '../components/ReadingBlock'
import { getDay, totalDays } from '../data/journey'
import { useProgress } from '../lib/useProgress'

const icons = {
  scripture: (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M4 3a2 2 0 0 1 2-2h9a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H6a1 1 0 0 0 0 2h9a1 1 0 1 1 0 0H6a2 2 0 0 1-2-2V3z" />
    </svg>
  ),
  prayer: (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M10 1c-.6 0-1 .4-1 1v3.2L6.7 3C6.3 2.6 5.7 2.6 5.3 3s-.4 1 0 1.4L8 7.1V10l-3.5 1.2c-.9.3-1.5 1.2-1.5 2.1V17a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1.7c0-.9-.6-1.8-1.5-2.1L12 12V7.1l2.7-2.7c.4-.4.4-1 0-1.4s-1-.4-1.4 0L11 5.2V2c0-.6-.4-1-1-1z" />
    </svg>
  ),
  step: (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.7-9.3a1 1 0 0 0-1.4-1.4L9 10.6 7.7 9.3a1 1 0 0 0-1.4 1.4l2 2a1 1 0 0 0 1.4 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  ),
}

export default function DayView() {
  const { day: dayParam } = useParams()
  const navigate = useNavigate()
  const day = getDay(dayParam)
  const { isComplete, markComplete } = useProgress()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [dayParam])

  if (!day) {
    return <Navigate to="/walk" replace />
  }

  const dayNum = day.day
  const done = isComplete(dayNum)
  const prev = dayNum > 1 ? dayNum - 1 : null
  const next = dayNum < totalDays ? dayNum + 1 : null

  function handleComplete() {
    markComplete(dayNum)
    if (next) {
      navigate(`/walk/day/${next}`)
    } else {
      navigate('/walk')
    }
  }

  return (
    <Container size="narrow" className="py-10 sm:py-14">
      <Button to="/walk" variant="ghost" size="md" className="-ml-2">
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M12.7 4.3a1 1 0 0 1 0 1.4L8.4 10l4.3 4.3a1 1 0 0 1-1.4 1.4l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.4 0z"
            clipRule="evenodd"
          />
        </svg>
        Today&apos;s Walk
      </Button>

      <header className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-sage-600">
          Day {dayNum} of {totalDays}
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight text-sage-900 sm:text-4xl">
          {day.title}
        </h1>
      </header>

      <div className="mt-8 space-y-5">
        <ReadingBlock label="Scripture" icon={icons.scripture}>
          <p className="font-serif text-xl leading-relaxed text-sage-900">{day.scripture}</p>
          <p className="mt-3 text-sm font-medium text-sage-600">{day.scriptureRef}</p>
        </ReadingBlock>

        <div className="px-1 py-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-sage-600">
            Reflection
          </p>
          <p className="mt-3 text-lg leading-relaxed text-ink">{day.reflection}</p>
        </div>

        <ReadingBlock label="Prayer" icon={icons.prayer}>
          <p className="italic leading-relaxed text-ink">{day.prayer}</p>
        </ReadingBlock>

        <ReadingBlock label="One practical step" icon={icons.step} className="bg-sage-50 border-sage-100">
          <p className="leading-relaxed text-ink">{day.step}</p>
        </ReadingBlock>
      </div>

      <div className="mt-10 flex flex-col gap-4">
        <Button onClick={handleComplete} size="lg" className="w-full sm:w-auto">
          {done ? 'Marked complete' : 'Mark complete'}
          {next ? ' · Next day' : ' · Finish journey'}
        </Button>

        <nav className="flex items-center justify-between text-sm">
          {prev ? (
            <Button to={`/walk/day/${prev}`} variant="ghost" size="md" className="-ml-2">
              Previous day
            </Button>
          ) : (
            <span />
          )}
          {next && (
            <Button to={`/walk/day/${next}`} variant="ghost" size="md" className="-mr-2">
              Next day
            </Button>
          )}
        </nav>
      </div>
    </Container>
  )
}
