import { Link, useNavigate } from 'react-router-dom'

export function AppHeader({ title, children, onMenuToggle, isMenuOpen }) {
  const navigate = useNavigate()

  const navigationItems = [
    { icon: '👤', label: 'Profile', path: '/profile' },
    { icon: '🏆', label: 'Leaderboard', path: '/leaderboard' },
    { icon: '⚙️', label: 'Settings', path: '/settings' },
  ]

  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        {onMenuToggle ? (
          <button
            type="button"
            onClick={onMenuToggle}
            className="rounded-lg p-2 text-app-muted hover:bg-app-surface hover:text-app-text lg:hidden"
            aria-label="Toggle navigation"
          >
            <span className="text-xl">{isMenuOpen ? '✕' : '☰'}</span>
          </button>
        ) : null}

        <Link to="/" className="text-lg font-semibold tracking-tight text-slate-100">
          {title}
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-6 sm:gap-4">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="group flex flex-col items-center gap-1 rounded-lg px-2 py-2 transition hover:bg-app-surface"
              aria-label={item.label}
            >
              <span className="text-2xl transition group-hover:scale-110">{item.icon}</span>
              <span className="text-xs font-medium text-app-muted group-hover:text-primary-300 transition">
                {item.label}
              </span>
            </button>
          ))}
        </div>
        {children && <div className="flex items-center gap-3">{children}</div>}
      </div>
    </div>
  )
}
