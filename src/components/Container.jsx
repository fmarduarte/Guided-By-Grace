/** Centered, width-constrained content wrapper with responsive padding. */
export default function Container({ children, className = '', size = 'default' }) {
  const max = size === 'narrow' ? 'max-w-2xl' : 'max-w-5xl'
  return <div className={`mx-auto w-full ${max} px-5 sm:px-6 ${className}`}>{children}</div>
}
