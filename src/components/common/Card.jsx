import { } from 'framer-motion'
import { cardVariants } from '../../utils/animations'

export function Card({ className = '', children, ...props }) {
  return (
    <motion.section
      variants={cardVariants}
      whileHover="hover"
      className={`rounded-2xl border border-app-border bg-gradient-to-br from-app-card to-app-surface p-6 shadow-premium ${className}`}
      {...props}
    >
      {children}
    </motion.section>
  )
}
