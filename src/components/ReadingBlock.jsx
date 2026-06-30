/**
 * A labeled block within a day's reading (Scripture, Prayer, Practical Step…).
 * `icon` is an optional small inline SVG element.
 */
export default function ReadingBlock({ label, icon, children, className = '' }) {
  return (
    <section className={`rounded-2xl border border-sand-200 bg-sand-50 p-6 ${className}`}>
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sage-600">
        {icon}
        {label}
      </p>
      <div className="mt-3 text-ink">{children}</div>
    </section>
  )
}
