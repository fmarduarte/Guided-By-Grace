import Container from '../components/Container'
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar'
import DayCard from '../components/DayCard'
import { journey } from '../data/journey'
import { useProgress } from '../lib/useProgress'

export default function TodaysWalk() {
  const { completed, completedCount, totalDays, nextDay, isComplete, reset } = useProgress()
  const todaysDay = journey.days.find((d) => d.day === nextDay) ?? journey.days[0]
  const finished = completedCount === totalDays

  return (
    <div className="bg-grace-glow">
      <Container size="narrow" className="py-12 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-sage-600">
          {journey.title}
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-sage-900 sm:text-4xl">
          Today&apos;s Walk
        </h1>
        <p className="mt-2 text-ink-soft">{journey.subtitle}</p>

        <div className="mt-8 rounded-3xl border border-sand-200 bg-sand-50 p-6 sm:p-8">
          <ProgressBar value={completedCount} total={totalDays} />

          <div className="mt-6 border-t border-sand-200 pt-6">
            {finished ? (
              <>
                <p className="font-serif text-2xl font-semibold text-sage-900">
                  You&apos;ve completed the journey.
                </p>
                <p className="mt-2 text-ink-soft">
                  Well walked. Revisit any day below, or carry the rhythm into tomorrow.
                </p>
              </>
            ) : (
              <>
                <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                  {completedCount === 0 ? 'Begin with' : 'Continue with'} Day {todaysDay.day}
                </p>
                <p className="mt-1 font-serif text-2xl font-semibold text-sage-900">
                  {todaysDay.title}
                </p>
                <p className="mt-1 text-ink-soft">{todaysDay.scriptureRef}</p>
                <div className="mt-5">
                  <Button to={`/walk/day/${todaysDay.day}`} size="lg">
                    {completedCount === 0 ? 'Start Today\u2019s Walk' : 'Continue'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="font-serif text-xl font-semibold text-sage-900">All 7 days</h2>
          <div className="mt-4 grid gap-3">
            {journey.days.map((day) => (
              <DayCard
                key={day.day}
                day={day}
                complete={isComplete(day.day)}
                current={!finished && day.day === nextDay}
              />
            ))}
          </div>
        </div>

        {completed.length > 0 && (
          <button
            onClick={reset}
            className="mt-8 text-sm text-ink-soft underline underline-offset-4 hover:text-sage-700"
          >
            Reset my progress
          </button>
        )}
      </Container>
    </div>
  )
}
