import {} from 'framer-motion'
import { buttonVariants } from '../../utils/animations'

export function AnimatedButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-app-card'

  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'border border-app-border bg-app-surface text-app-text hover:bg-app-border focus:ring-app-border',
    danger: 'border border-red-500 bg-red-500/10 text-red-400 hover:bg-red-500/20 focus:ring-red-500',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <motion.button
      variants={buttonVariants}
      whileHover={disabled ? undefined : 'hover'}
      whileTap={disabled ? undefined : 'tap'}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      {...props}
    >
      {children}
    </motion.button>
  )
}