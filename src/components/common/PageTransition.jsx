import { AnimatePresence, motion as Motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { pageVariants, pageTransition } from '../../utils/animations'

export function PageTransition({ children }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen"
      >
        {children}
      </Motion.div>
    </AnimatePresence>
  )
}