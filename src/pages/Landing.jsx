import { useEffect, useState } from 'react'
import { BookOpen, HandHeart, Footprints } from 'lucide-react'
import Button from '../components/Button'
import { journey, totalDays } from '../data/journey'

export default function Landing() {
  return (
    <>
      <Hero />
      <TodaysReflection />
      <WhyChoose />
      <Timeline />
      <EmailCapture />
      <FinalCTA />
    </>
  )
}

/* ================================================================ HERO ======= */
function Hero() {
  return (
    <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#faf8f3] via-[#f0ebe0] to-[#dfe8e0] px-5 py-20 sm:py-0">
      {/* Blur circles decorative */}
      <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gradient-to-br from-[rgba(201,168,106,0.15)] to-transparent blur-3xl" />
      <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-[rgba(93,122,87,0.1)] to-transparent blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl text-center">
        <h1 className="font-serif text-3xl font-normal tracking-tight text-[#2a3a2e] sm:text-5xl sm:leading-tight">
          Begin Your Day in God&apos;s Presence
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-[#8a9a8c] sm:text-xl">
          A quiet five minutes with Scripture, reflection, and one simple step to walk with God.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-5">
          <Button
            to="/walk"
            size="lg"
            variant="soft"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#5d7a57] to-[#4a6347] px-10 py-4 text-base font-medium text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Start Free Today
          </Button>
          <button className="inline-flex items-center justify-center rounded-full border-2 border-[#dfe8e0] bg-white/80 px-10 py-4 text-base font-medium text-[#2a3a2e] transition-all duration-300 hover:bg-white hover:border-[#5d7a57]">
            Learn More
          </button>
        </div>

        {/* Tagline */}
        <p className="mt-6 text-sm italic text-[#8a9a8c]">
          No login. No commitment. Just quiet time.
        </p>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap justify-center gap-12 sm:gap-20">
          <div className="text-center">
            <div className="font-serif text-3xl font-semibold text-[#c9a86a] sm:text-4xl">7</div>
            <div className="mt-2 text-xs uppercase tracking-widest text-[#8a9a8c]">Day Journey</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-3xl font-semibold text-[#c9a86a] sm:text-4xl">5</div>
            <div className="mt-2 text-xs uppercase tracking-widest text-[#8a9a8c]">Minutes</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-3xl font-semibold text-[#c9a86a] sm:text-4xl">∞</div>
            <div className="mt-2 text-xs uppercase tracking-widest text-[#8a9a8c]">Free</div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ====================================================== TODAY'S REFLECTION ======= */
function TodaysReflection() {
  const day = journey.days[0]

  return (
    <section className="bg-[#faf8f3] px-5 py-20 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="relative overflow-hidden rounded-3xl border border-[rgba(201,168,106,0.1)] bg-white p-10 shadow-lg sm:p-16">
          {/* Decorative blur circle */}
          <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-gradient-to-br from-[rgba(201,168,106,0.08)] to-transparent blur-3xl" />

          {/* Content */}
          <div className="relative z-10">
            <p className="text-center text-xs uppercase tracking-widest text-[#8a9a8c]">
              Today&apos;s Reflection
            </p>

            <figure className="mt-8 text-center">
              <blockquote className="font-serif text-2xl font-normal leading-relaxed text-[#2a3a2e] sm:text-3xl">
                &quot;{day.scripture}&quot;
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium text-[#8a9a8c]">
                {day.scriptureRef}
              </figcaption>
            </figure>

            <div className="mt-10 border-t border-[#dfe8e0] pt-8 text-center">
              <p className="text-xs uppercase tracking-widest text-[#8a9a8c]">Today&apos;s Title</p>
              <p className="mt-3 font-serif text-xl font-normal text-[#2a3a2e]">{day.title}</p>

              <button className="mt-6 text-sm font-medium text-[#5d7a57] transition-colors duration-300 hover:text-[#4a6347]">
                Read today&apos;s reflection →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ========================================================= WHY CHOOSE ======= */
function WhyChoose() {
  const features = [
    {
      icon: BookOpen,
      title: 'Scripture First',
      description: "Start with God's Word. Every reflection grounds you in Scripture.",
    },
    {
      icon: HandHeart,
      title: 'Guided Prayer',
      description: 'Thoughtful prompts help you pray, reflect, and connect with God.',
    },
    {
      icon: Footprints,
      title: 'One Step',
      description: 'A simple action to take your faith into the day with you.',
    },
  ]

  return (
    <section className="bg-gradient-to-b from-[#f0ebe0] to-[#faf8f3] px-5 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-serif text-3xl font-normal text-[#2a3a2e] sm:text-4xl">
          Why Guided by Grace?
        </h2>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-[rgba(201,168,106,0.2)] bg-white/60 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-lg sm:p-10"
              >
                <Icon
                  size={48}
                  strokeWidth={1.5}
                  className="mx-auto mb-[15px] block text-[#5d7a57]"
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-serif text-xl font-normal text-[#2a3a2e]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#8a9a8c]">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ========================================================= TIMELINE ======= */
function Timeline() {
  return (
    <section className="bg-[#faf8f3] px-5 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-normal text-[#2a3a2e] sm:text-4xl">
            {journey.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#8a9a8c]">
            {journey.description}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-16 space-y-6">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#c9a86a] to-[rgba(201,168,106,0.3)] sm:left-1/2 sm:-translate-x-1/2" />

          {/* Timeline items */}
          {journey.days.map((day, idx) => (
            <div
              key={day.day}
              className={`flex gap-6 sm:gap-0 ${
                idx % 2 === 0
                  ? 'sm:flex-row sm:pr-[calc(50%+24px)]'
                  : 'sm:flex-row-reverse sm:pl-[calc(50%+24px)]'
              }`}
            >
              {/* Timeline dot */}
              <div className="relative mt-1 flex-shrink-0">
                <div className="h-5 w-5 rounded-full border-4 border-[#faf8f3] bg-[#c9a86a] shadow-sm sm:h-6 sm:w-6" />
                {idx < journey.days.length - 1 && (
                  <div className="absolute top-5 left-2.5 h-5 w-0.5 bg-gradient-to-b from-[#c9a86a] to-transparent sm:top-6 sm:left-2.5" />
                )}
              </div>

              {/* Content card */}
              <div className="rounded-lg border border-[rgba(201,168,106,0.1)] bg-white p-4 shadow-sm sm:rounded-xl sm:p-6">
                <p className="text-xs uppercase tracking-wider text-[#c9a86a] font-semibold">
                  Day {day.day}
                </p>
                <p className="mt-2 font-serif text-base font-normal text-[#2a3a2e] sm:text-lg">
                  {day.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <Button
            to="/walk"
            size="lg"
            variant="soft"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#5d7a57] to-[#4a6347] px-10 py-4 text-base font-medium text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Start Today&apos;s Walk
          </Button>
          <p className="text-sm text-[#8a9a8c]">
            {totalDays} days, about 5 minutes each
          </p>
        </div>
      </div>
    </section>
  )
}

/* ====================================================== EMAIL CAPTURE ======= */
function EmailCapture() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Success confirmation fades away after 3 seconds.
  useEffect(() => {
    if (!success) return
    const t = setTimeout(() => setSuccess(false), 3000)
    return () => clearTimeout(t)
  }, [success])

  function handleSubmit(e) {
    e.preventDefault()
    if (loading) return
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return

    setLoading(true)
    // No backend yet — persist locally so the address isn't lost.
    try {
      localStorage.setItem('newsletter_email', email)
    } catch {
      /* storage unavailable (e.g. private mode) — fail silently */
    }
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setEmail('')
    }, 500)
  }

  return (
    <section className="bg-[#faf8f3] px-5 py-20">
      <div className="mx-auto max-w-[600px] text-center">
        <h2 className="font-serif text-3xl font-normal text-[#2a3a2e]">Stay Connected</h2>
        <p className="mt-3 text-sm text-[#8a9a8c]">
          New reflections and guided prayers delivered to your inbox.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Your email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-2xl border border-[rgba(201,168,106,0.2)] bg-white px-5 py-3 text-[#2a3a2e] placeholder:text-[#8a9a8c] focus:outline-none focus:ring-2 focus:ring-[#c9a86a]"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#5d7a57] to-[#4a6347] px-8 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70"
          >
            {loading ? 'Sending…' : 'Send Me Reflections'}
          </button>
        </form>

        <p className="mt-4 h-5 text-sm font-medium text-[#5d7a57]" role="status" aria-live="polite">
          {success ? 'Check your email to confirm!' : ''}
        </p>

        <p className="mt-2 text-xs italic text-[#8a9a8c]">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}

/* ========================================================= FINAL CTA ======= */
function FinalCTA() {
  return (
    <section className="bg-gradient-to-r from-[#5d7a57] to-[#4a6347] px-5 py-20 text-center text-white sm:py-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-serif text-3xl font-normal sm:text-4xl">
          Ready to Begin?
        </h2>
        <p className="mt-4 text-lg leading-relaxed opacity-95">
          Five quiet minutes that could change your entire day.
        </p>

        <button className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-base font-semibold text-[#5d7a57] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
          Start Your Journey
        </button>
      </div>
    </section>
  )
}