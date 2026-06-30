import { Link } from 'react-router-dom'
import Container from './Container'
import Logo from './Logo'
import { useSubscription } from '../lib/useSubscription'

export default function Navbar() {
  const { isSubscribed } = useSubscription()

  return (
    <header className="bg-transparent">
      <Container className="flex h-16 items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          {isSubscribed && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-700">
              <span className="h-1.5 w-1.5 rounded-full bg-sage-500" aria-hidden="true" />
              Subscribed
            </span>
          )}
          <Link
            to="/walk"
            className="text-sm font-medium text-sage-700 underline-offset-4 transition hover:text-sage-900 hover:underline"
          >
            Today&apos;s Walk
          </Link>
        </div>
      </Container>
    </header>
  )
}
