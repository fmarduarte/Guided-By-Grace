import Container from '../components/Container'
import Button from '../components/Button'
import EmailCapture from '../components/EmailCapture'
import GraceGuide from '../components/GraceGuide'
import { journey, totalDays } from '../data/journey'

/* ------------------------------------------------------------------ Hero -- */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-hero-quiet">
      {/* A quiet devotional opening — soft, unhurried, no marketing badge. */}
      <Container className="flex flex-col items-center px-5 pt-16 pb-28 text-center sm:pt-20 sm:pb-36">
        <h1 className="max-w-2xl font-serif text-3xl font-medium leading-snug tracking-tight text-sage-900 sm:text-[2.75rem] sm:leading-tight">
          Begin your day in God&apos;s presence.
        </h1>

        <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
          A quiet daily space for Scripture, prayer, and a simple reflection to help you
          walk with God.
        </p>

        <div className="mt-8">
          <Button to="/walk" size="lg" variant="soft">
            Begin Today&apos;s Walk
          </Button>
        </div>

        <p className="mt-6 text-sm text-ink-soft/90">
          No pressure. No noise. Just one quiet step with God.
        </p>
      </Container>

      {/* A gentle devotional card resting beneath the opening words. */}
      <Container size="narrow" className="relative z-10 -mt-16 px-5 pb-4 sm:-mt-20">
        <DevotionalCard />
      </Container>
    </section>
  )
}

/* ------------------------------------ A quiet "reading for today" card -- */
function DevotionalCard() {
  const day = journey.days[0]
  return (
    <div className="rounded-3xl border border-sand-200 bg-sand-50 p-8 shadow-grace sm:p-10">
      <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-sage-500">
        For today
      </p>

      <figure className="mt-6 text-center">
        <blockquote className="mx-auto max-w-md font-serif text-xl leading-relaxed text-sage-900 sm:text-2xl">
          {day.scripture}
        </blockquote>
        <figcaption className="mt-4 text-sm font-medium tracking-wide text-sage-500">
          {day.scriptureRef}
        </figcaption>
      </figure>

      <div className="mt-8 border-t border-sand-200 pt-6 text-center">
        <p className="text-xs uppercase tracking-widest text-ink-soft">Today&apos;s reflection</p>
        <p className="mt-2 font-serif text-lg text-sage-900">{day.title}</p>
        <Button to="/walk" variant="ghost" size="md" className="mt-3">
          Read today&apos;s reflection
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M7.3 4.3a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4L11.6 10 7.3 5.7a1 1 0 0 1 0-1.4z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------- How it works -- */
const steps = [
  {
    title: 'Open the Word',
    body: 'Each day begins with one short, well-chosen passage of Scripture.',
  },
  {
    title: 'Reflect & pray',
    body: 'A brief reflection and a written prayer help it settle into your heart.',
  },
  {
    title: 'Take one step',
    body: 'Close with a single, practical step to live out — not just read.',
  },
]

function HowItWorks() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>How it works</SectionEyebrow>
          <h2 className="mt-4 font-serif text-3xl font-medium text-sage-900 sm:text-[2.5rem] sm:leading-tight">
            Five quiet minutes, three gentle steps
          </h2>
          <p className="mt-4 text-ink-soft">
            No noise. No pressure. Just enough to meet with God and begin your day grounded.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="rounded-3xl border border-sand-200 bg-sand-50 p-8 shadow-grace"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-sage-100 font-serif text-lg font-semibold text-sage-700">
                {i + 1}
              </span>
              <h3 className="mt-5 font-serif text-xl font-medium text-sage-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* --------------------------------------------------- Featured Journey -- */
function FeaturedJourney() {
  return (
    <section id="journey" className="scroll-mt-20 py-8">
      <Container size="narrow">
        <div className="rounded-3xl border border-sand-200 bg-sand-50 p-8 shadow-grace sm:p-12">
          <div className="text-center">
            <SectionEyebrow>Featured journey</SectionEyebrow>
            <h2 className="mt-4 font-serif text-3xl font-medium text-sage-900 sm:text-4xl">
              {journey.title}
            </h2>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.16em] text-gold-500">
              A 7-Day Guided Journey
            </p>
            <p className="mx-auto mt-5 max-w-md text-ink-soft">{journey.description}</p>
          </div>

          <ol className="mx-auto mt-9 grid max-w-xl gap-x-8 gap-y-3 sm:grid-cols-2">
            {journey.days.map((day) => (
              <li key={day.day} className="flex items-center gap-3 text-sm text-sage-900">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sage-100 text-xs font-semibold text-sage-700">
                  {day.day}
                </span>
                <span className="truncate">{day.title}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col items-center gap-3">
            <Button to="/walk" size="lg" variant="gold">
              Start Today&apos;s Walk
            </Button>
            <p className="text-sm text-ink-soft">{totalDays} days · about 5 minutes each</p>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------ Differentiation -- */
const distinctives = [
  {
    title: 'Guided, not endless',
    body: 'A clear path with a beginning and an end — not a bottomless feed to scroll.',
  },
  {
    title: 'Short by design',
    body: 'Five focused minutes you can actually keep, instead of hours you never find.',
  },
  {
    title: 'Formation, not consumption',
    body: 'Every day ends with one small step to live — not just more content to read.',
  },
]

function Differentiation() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="rounded-[2rem] bg-sage-900 px-7 py-14 text-center text-sand-50 shadow-grace sm:px-14 sm:py-16">
          <SectionEyebrow tone="light">Why Guided by Grace</SectionEyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl font-medium leading-tight sm:text-[2.5rem]">
            Not another content library.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sage-100/90">
            You don&apos;t need more to read. You need a quiet, faithful rhythm — and a gentle
            hand to walk it with you.
          </p>

          <div className="mt-12 grid gap-8 text-left sm:grid-cols-3">
            {distinctives.map((item) => (
              <div key={item.title}>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-sage-700 text-gold-300">
                  <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.1 3.1 6.8-6.8a1 1 0 0 1 1.4 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <h3 className="mt-4 font-serif text-xl font-medium text-sand-50">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sage-100/80">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------ Pricing preview -- */
function Pricing() {
  return (
    <section className="py-8">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Simple from the start</SectionEyebrow>
          <h2 className="mt-4 font-serif text-3xl font-medium text-sage-900 sm:text-[2.5rem] sm:leading-tight">
            Begin free. More when you&apos;re ready.
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
          {/* Free */}
          <div className="flex flex-col rounded-3xl border border-sand-200 bg-sand-50 p-8 shadow-grace">
            <p className="font-serif text-xl font-medium text-sage-900">Free</p>
            <p className="mt-1 text-sm text-ink-soft">Everything you need to begin.</p>
            <p className="mt-5 font-serif text-4xl font-medium text-sage-900">
              $0
              <span className="ml-1 align-middle text-base font-sans font-normal text-ink-soft">
                forever
              </span>
            </p>
            <ul className="mt-6 space-y-3 text-sm text-sage-900">
              <Feature>The full 7-day “Finding Peace with God” journey</Feature>
              <Feature>Daily Scripture, reflection, prayer &amp; step</Feature>
              <Feature>Progress saved on your device</Feature>
            </ul>
            <div className="mt-8">
              <Button to="/walk" size="lg" variant="gold" className="w-full">
                Start Today&apos;s Walk
              </Button>
            </div>
          </div>

          {/* Plus */}
          <div className="relative flex flex-col rounded-3xl border border-sage-300 bg-sage-50/60 p-8 shadow-grace">
            <span className="absolute right-6 top-6 rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sage-700">
              Coming soon
            </span>
            <p className="font-serif text-xl font-medium text-sage-900">Plus</p>
            <p className="mt-1 text-sm text-ink-soft">For a deeper, daily rhythm.</p>
            <p className="mt-5 font-serif text-4xl font-medium text-sage-900">
              $4.99
              <span className="ml-1 align-middle text-base font-sans font-normal text-ink-soft">
                / month
              </span>
            </p>
            <ul className="mt-6 space-y-3 text-sm text-sage-900">
              <Feature>New guided journeys every month</Feature>
              <Feature>Gentle daily reminders</Feature>
              <Feature>Sync your walk across devices</Feature>
            </ul>
            <div className="mt-8">
              <Button size="lg" variant="secondary" className="w-full" disabled>
                Coming soon
              </Button>
              <p className="mt-3 text-center text-xs text-ink-soft">
                Nothing to pay today — Plus is on the way.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Feature({ children }) {
  return (
    <li className="flex items-start gap-2.5">
      <svg
        viewBox="0 0 20 20"
        className="mt-0.5 h-4 w-4 shrink-0 text-gold-500"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.1 3.1 6.8-6.8a1 1 0 0 1 1.4 0z"
          clipRule="evenodd"
        />
      </svg>
      <span className="leading-relaxed">{children}</span>
    </li>
  )
}

/* ---------------------------------------------------------- shared bits -- */
function SectionEyebrow({ children, tone = 'dark' }) {
  return (
    <span
      className={`text-xs font-semibold uppercase tracking-[0.18em] ${
        tone === 'light' ? 'text-gold-300' : 'text-gold-500'
      }`}
    >
      {children}
    </span>
  )
}

export default function Landing() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <FeaturedJourney />
      <GraceGuide />
      <Differentiation />
      <Pricing />
      <EmailCapture />
    </>
  )
}
