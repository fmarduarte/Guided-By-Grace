import { Link } from 'react-router-dom'

/** Wordmark + simple dove/leaf mark for Guided by Grace. */
export default function Logo({ to = '/' }) {
  return (
    <Link to={to} className="flex items-center gap-2 text-sage-900" aria-label="Guided by Grace home">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-sage-600 text-sand-50 shadow-sm">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M4 14c4-1 7-4 8-9 1 5 4 8 8 9-4 1-7 4-8 9-1-5-4-8-8-9z"
            fill="currentColor"
            opacity="0.95"
          />
        </svg>
      </span>
      <span className="font-serif text-lg font-semibold tracking-tight">Guided by Grace</span>
    </Link>
  )
}
