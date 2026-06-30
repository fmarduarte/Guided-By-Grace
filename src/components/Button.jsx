import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition duration-200 ease-out ' +
  'motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-sand-100 disabled:opacity-60 disabled:pointer-events-none'

const variants = {
  primary:
    'bg-sage-600 text-sand-50 shadow-sm hover:bg-sage-700 hover:shadow-md active:bg-sage-900',
  // Soft, quiet, devotional — a calm muted sage rather than a salesy accent.
  soft:
    'bg-sage-500 text-sand-50 shadow-sm hover:bg-sage-600 hover:shadow-md active:bg-sage-700',
  gold:
    'bg-gold-400 text-sage-900 shadow-grace hover:bg-gold-300 hover:shadow-md active:bg-gold-500',
  secondary:
    'bg-sand-50 text-sage-900 ring-1 ring-sage-300 hover:bg-sage-50',
  ghost: 'text-sage-700 hover:text-sage-900 hover:bg-sage-50',
}

const sizes = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

/**
 * A single button primitive that renders as a router <Link>, an external
 * <a>, or a native <button> depending on the props passed.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
