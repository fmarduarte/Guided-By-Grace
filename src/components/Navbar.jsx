import { Link } from 'react-router-dom'
import Container from './Container'
import Logo from './Logo'

export default function Navbar() {
  return (
    <header className="bg-transparent">
      <Container className="flex h-16 items-center justify-between">
        <Logo />
        <Link
          to="/walk"
          className="text-sm font-medium text-sage-700 underline-offset-4 transition hover:text-sage-900 hover:underline"
        >
          Today&apos;s Walk
        </Link>
      </Container>
    </header>
  )
}
