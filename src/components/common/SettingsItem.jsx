export function SettingsItem({ label, description, action, className = '' }) {
  return (
    <div className={`flex items-center justify-between gap-4 rounded-xl border border-app-border bg-app-surface p-4 ${className}`}>
      <div>
        <p className="text-sm font-medium text-app-text">{label}</p>
        <p className="text-sm text-app-muted">{description}</p>
      </div>
      <div>{action}</div>
    </div>
  )
}
