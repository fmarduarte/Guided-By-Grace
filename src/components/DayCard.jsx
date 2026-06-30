import { Link } from 'react-router-dom'

/** A single day row in the journey list. */
export default function DayCard({ day, complete, current }) {
  return (
    <Link
      to={`/walk/day/${day.day}`}
      className={`group flex items-center gap-4 rounded-2xl border p-4 transition hover:shadow-md ${
        current
          ? 'border-sage-300 bg-sage-50'
          : 'border-sand-200 bg-sand-50 hover:border-sage-300'
      }`}
    >
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-semibold ${
          complete
            ? 'bg-sage-600 text-sand-50'
            : 'bg-sand-200 text-sage-700 group-hover:bg-sand-300'
        }`}
        aria-hidden="true"
      >
        {complete ? (
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 0 1 1.4-1.4l3.1 3.1 6.8-6.8a1 1 0 0 1 1.4 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          day.day
        )}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
          Day {day.day}
          {current && ' · Today'}
        </p>
        <p className="truncate font-serif text-lg font-semibold text-sage-900">{day.title}</p>
        <p className="truncate text-sm text-ink-soft">{day.scriptureRef}</p>
      </div>

      <svg
        viewBox="0 0 20 20"
        className="h-5 w-5 shrink-0 text-sage-500 transition group-hover:translate-x-0.5"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M7.3 4.3a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4L11.6 10 7.3 5.7a1 1 0 0 1 0-1.4z"
          clipRule="evenodd"
        />
      </svg>
    </Link>
  )
}
