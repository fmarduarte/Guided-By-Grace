import Container from './Container'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-sand-200 py-10 text-center">
      <Container>
        <p className="font-serif text-lg text-sage-900">Guided by Grace</p>
        <p className="mt-1 text-sm text-ink-soft">Spend 5 minutes with God every day.</p>
        <p className="mt-4 text-xs text-ink-soft">
          &copy; {new Date().getFullYear()} Guided by Grace. Scripture quotations are from the ESV.
        </p>
      </Container>
    </footer>
  )
}
