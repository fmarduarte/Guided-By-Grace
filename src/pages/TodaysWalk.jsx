import Container from '../components/Container'
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar'
import DayCard from '../components/DayCard'
import EmailCapture from '../components/EmailCapture'
import { journey } from '../data/journey'
import { useProgress } from '../lib/useProgress'

// A placeholder for the journey that comes next. Intentionally not in the
// content module yet — it has no readings, it's only a gentle "what's next".
const nextJourney = {
  title: 'Trusting God Again',
  subtitle: 'A 7-Day Guided Journey',
  description:
    "A gentle journey for learning to rest in God's faithfulness when the future feels uncertain.",
}

/* A quiet blessing shown once all seven days are complete. */
function CompletionCard({ completedCount, totalDays }) {
  return (
    <div className="rounded-3xl border border-sand-200 bg-sand-50 p-8 text-center shadow-grace sm:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-500">
        Journey complete
      </p>

      <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight text-sage-900 sm:text-4xl">
        You completed Finding Peace with God.
      </h1>

      <div className="mx-auto mt-5 max-w-md space-y-4 text-ink-soft">
        <p>
          For seven days, you returned to Scripture, prayer, and one quiet step with God.
        </p>
        <p className="font-serif text-lg text-sage-900">
          Your journey does not end here.
          <br />
          Your walk continues.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-xs">
        <ProgressBar value={completedCount} total={totalDays} />
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button to="/walk/day/1" size="lg" variant="primary">
          Begin Today&apos;s Walk
        </Button>
        <Button href="#next-journey" size="lg" variant="secondary">
          Preview the Next Journey
        </Button>
      </div>

      <p className="mt-6 text-sm italic text-ink-soft">Well done. Keep walking with grace.</p>

      <div className="mx-auto mt-8 max-w-md border-t border-sand-200 pt-8 text-left">
        <EmailCapture
          source="journey_completion"
          journey="Finding Peace with God"
          title={null}
          description="Be the first to know when the next guided journey is ready."
        />
      </div>
    </div>
  )
}

/* A soft preview of the next journey, with an optional reminder sign-up. */
function NextJourney() {
  return (
    <section
      id="next-journey"
      className="mt-6 scroll-mt-20 rounded-3xl border border-sand-200 bg-sand-50 p-8 shadow-grace sm:p-10"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-500">
        Continue your walk
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h2 className="font-serif text-2xl font-semibold text-sage-900">{nextJourney.title}</h2>
        <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sage-700">
          Coming Soon
        </span>
      </div>

      <p className="mt-1 text-sm font-medium uppercase tracking-wide text-ink-soft">
        {nextJourney.subtitle}
      </p>
      <p className="mt-4 max-w-md text-ink-soft">{nextJourney.description}</p>

      <div className="mt-6 border-t border-sand-200 pt-6">
        <EmailCapture
          source="next_journey_preview"
          journey="Trusting God Again"
          title={'Get notified when it\u2019s ready'}
          description={null}
        />
      </div>
    </section>
  )
}

export default function TodaysWalk() {
  const { completed, completedCount, totalDays, nextDay, isComplete, reset } = useProgress()
  const todaysDay = journey.days.find((d) => d.day === nextDay) ?? journey.days[0]
  const finished = completedCount === totalDays

  return (
    <div className="bg-grace-glow">
      <Container size="narrow" className="py-12 sm:py-16">
        {finished ? (
          <>
            <CompletionCard completedCount={completedCount} totalDays={totalDays} />
            <NextJourney />
          </>
        ) : (
          <>
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
              </div>
            </div>
          </>
        )}

        <div className="mt-10">
          <h2 className="font-serif text-xl font-semibold text-sage-900">
            {finished ? 'Revisit any day' : 'All 7 days'}
          </h2>
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
