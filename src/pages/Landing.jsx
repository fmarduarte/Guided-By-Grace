import { Link } from 'react-router-dom'
import { journey, totalDays } from '../data/journey'

/* Reusable literal class strings (kept as literals so Tailwind's scanner
   detects the arbitrary values). */
const serif = 'font-[Georgia,ui-serif,serif]'
const shadowSubtle = 'shadow-[0_2px_8px_rgba(42,58,46,0.06)]'
const shadowMedium = 'shadow-[0_10px_40px_rgba(42,58,46,0.08)]'
const shadowGlow = 'shadow-[0_8px_24px_rgba(93,122,87,0.2)]'
const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a86a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f3]'

/* ============================================================== HERO ===== */
function Hero() {
  return (
    <section className="relative isolate flex min-h-[90vh] items-center overflow-hidden bg-[linear-gradient(135deg,#faf8f3_0%,#f0ebe0_40%,#dfe8e0_100%)] px-5 py-20">
      {/* Premium, low-opacity blur circles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(201,168,106,0.15),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-40 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(93,122,87,0.1),transparent_70%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <h1
          className={`${serif} text-[2.2rem] font-normal leading-[1.2] tracking-[-0.5px] text-[#2a3a2e] md:text-[3.5rem]`}
        >
          Begin your day in God&apos;s presence.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-[1rem] leading-[1.8] text-[#8a9a8c] md:text-[1.1rem]">
          A quiet daily space for Scripture, prayer, and a simple reflection — five
          unhurried minutes to walk a little closer with God.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
          <Link
            to="/walk"
            className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#5d7a57] to-[#4a6347] px-10 py-4 text-[1rem] font-medium text-white transition duration-300 ${shadowGlow} hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(42,58,46,0.18)] ${focusRing}`}
          >
            Begin Today&apos;s Walk
          </Link>
          <a
            href="#journey"
            className={`inline-flex items-center justify-center rounded-full border-2 border-[#dfe8e0] bg-white/80 px-10 py-4 text-[1rem] font-medium text-[#2a3a2e] transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_40px_rgba(42,58,46,0.08)] ${focusRing}`}
          >
            Preview the Journey
          </a>
        </div>

        <p className="mt-6 text-[0.9rem] italic text-[#8a9a8c]">
          No login. No commitment. Just quiet time.
        </p>

        {/* Stats */}
        <div className="mt-14 flex flex-wrap items-start justify-center gap-x-[60px] gap-y-8">
          <Stat number={totalDays} label="Day Journey" />
          <Stat number="5" label="Minutes a Day" />
          <Stat number="∞" label="Always Free" />
        </div>
      </div>
    </section>
  )
}

function Stat({ number, label }) {
  return (
    <div className="text-center">
      <p className={`${serif} text-[2.5rem] font-semibold leading-none text-[#c9a86a]`}>{number}</p>
      <p className="mt-2 text-[0.85rem] uppercase tracking-[1px] text-[#8a9a8c]">{label}</p>
    </div>
  )
}

/* =============================================== TODAY'S REFLECTION ====== */
function TodayReflection() {
  const day = journey.days[0]
  return (
    <section className="bg-[#faf8f3] px-5 py-20">
      <figure
        className={`relative mx-auto max-w-[600px] overflow-hidden rounded-[24px] border border-[rgba(201,168,106,0.1)] bg-white p-10 md:p-[50px] ${shadowMedium}`}
      >
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-20 z-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(201,168,106,0.08),transparent_70%)]"
        />
        <div className="relative z-10">
          <p className="mb-[15px] text-[0.75rem] uppercase tracking-[2px] text-[#8a9a8c]">
            Today&apos;s Reflection
          </p>
          <blockquote className={`${serif} text-[1.8rem] leading-[1.5] text-[#2a3a2e]`}>
            {day.scripture}
          </blockquote>
          <figcaption className="mt-5 text-[0.95rem] font-medium text-[#8a9a8c]">
            {day.scriptureRef}
          </figcaption>
          <p
            className={`${serif} mt-[30px] border-t border-[#dfe8e0] pt-[30px] text-[1.5rem] text-[#2a3a2e]`}
          >
            {day.title}
          </p>
        </div>
      </figure>
    </section>
  )
}

/* ==================================================== WHY CHOOSE ========= */
const features = [
  {
    icon: '📖',
    title: 'Scripture First',
    body: "Start with God's Word. Every reflection is grounded in Scripture, not opinion.",
  },
  {
    icon: '🙏',
    title: 'Guided Prayer',
    body: 'Gentle prompts help you pray, reflect, and quietly connect with God.',
  },
  {
    icon: '👣',
    title: 'One Step',
    body: 'A single, simple action to carry your faith into the rest of your day.',
  },
]

function WhyChoose() {
  return (
    <section className="bg-[linear-gradient(180deg,#f0ebe0_0%,#faf8f3_100%)] px-5 py-20">
      <h2 className={`${serif} mb-[60px] text-center text-[2.5rem] text-[#2a3a2e]`}>
        Why Guided by Grace?
      </h2>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-3">
        {features.map((f) => (
          <article
            key={f.title}
            className={`rounded-[20px] border border-[rgba(201,168,106,0.2)] bg-white/60 px-[30px] py-10 text-center backdrop-blur-[10px] transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_10px_40px_rgba(42,58,46,0.08)]`}
          >
            <span className="block text-[3rem] leading-none" aria-hidden="true">
              {f.icon}
            </span>
            <h3 className={`${serif} mb-3 mt-4 text-[1.3rem] text-[#2a3a2e]`}>{f.title}</h3>
            <p className="text-[0.95rem] leading-[1.6] text-[#8a9a8c]">{f.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ================================================ JOURNEY TIMELINE ======= */
function JourneyTimeline() {
  return (
    <section className="bg-[#faf8f3] px-5 py-20">
      <div className="mb-[60px] text-center">
        <h2 className={`${serif} text-[2.5rem] text-[#2a3a2e]`}>The 7-Day Journey</h2>
        <p className="mt-3 text-[1.1rem] text-[#8a9a8c]">{journey.description}</p>
      </div>

      <ol className="relative mx-auto max-w-[800px] pl-2 md:pl-0">
        {/* the gold thread running the length of the journey */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-2 top-0 w-0.5 bg-[linear-gradient(180deg,#c9a86a_0%,rgba(201,168,106,0.3)_100%)] md:left-1/2 md:-translate-x-1/2"
        />

        {journey.days.map((day, i) => {
          const left = i % 2 === 0
          return (
            <li key={day.day} className="relative mb-10 last:mb-0">
              {/* dot anchored on the line */}
              <span
                aria-hidden="true"
                className="absolute left-2 top-5 z-10 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-[#faf8f3] bg-[#c9a86a] shadow-[0_0_0_2px_#dfe8e0] md:left-1/2 md:top-1/2 md:-translate-y-1/2"
              />

              <div
                className={`pl-10 md:w-1/2 md:pl-0 ${
                  left ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12 md:text-left'
                }`}
              >
                <article
                  className={`rounded-2xl border border-[rgba(201,168,106,0.1)] bg-white p-6 ${shadowSubtle}`}
                >
                  <p className="text-[0.85rem] font-semibold uppercase tracking-[1px] text-[#c9a86a]">
                    Day {day.day}
                  </p>
                  <h3 className={`${serif} mt-1 text-[1.1rem] font-semibold text-[#2a3a2e]`}>
                    {day.title}
                  </h3>
                </article>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

/* ===================================================== FINAL CTA ========= */
function FinalCTA() {
  return (
    <section className="bg-[linear-gradient(to_right,#5d7a57,#4a6347)] px-5 py-20 text-center text-white">
      <div className="mx-auto max-w-2xl">
        <h2 className={`${serif} mb-5 text-[2.5rem] font-normal`}>
          Your quiet morning is waiting.
        </h2>
        <p className="mb-10 text-[1.1rem] leading-[1.7] opacity-95">
          Take five minutes today. No noise, no pressure — just one gentle step with God.
        </p>
        <Link
          to="/walk"
          className={`inline-flex items-center justify-center rounded-full bg-white px-[50px] py-4 text-[1rem] font-semibold text-[#5d7a57] shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#4a6347]`}
        >
          Begin Today&apos;s Walk
        </Link>
      </div>
    </section>
  )
}

/* ========================================================= PAGE ========= */
export default function Landing() {
  return (
    <>
      <Hero />
      <TodayReflection />
      <WhyChoose />
      <JourneyTimeline />
      <FinalCTA />
    </>
  )
}
