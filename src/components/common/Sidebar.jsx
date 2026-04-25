import {} from 'framer-motion'
import { NavLink } from 'react-router-dom'

export function Sidebar({ title = 'Navigation', items, open = false, onClose }) {
  return (
    <motion.aside
      initial={false}
      animate={{ x: open ? 0 : '-100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="fixed left-0 top-0 z-50 h-full w-64 border-r border-app-border bg-app-card p-4 shadow-premium lg:static lg:z-auto lg:h-auto lg:w-full lg:border-r-0 lg:shadow-none lg:translate-x-0"
    >
      <div className="flex items-center justify-between lg:hidden">
        <h2 className="text-lg font-semibold text-app-text">{title}</h2>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-app-muted hover:bg-app-surface hover:text-app-text"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        ) : null}
      </div>

      <p className="mb-3 mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary-300 lg:mt-0">
        {title}
      </p>

      <nav className="grid gap-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm transition ${
                isActive
                  ? 'bg-primary-900/50 text-primary-200'
                  : 'text-app-muted hover:bg-app-surface hover:text-slate-200'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  )
}
