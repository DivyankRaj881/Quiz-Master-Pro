export function PageHeader({ title, subtitle }) {
  return (
    <header className="mb-6 space-y-2">
      <h1 className="text-4xl font-bold tracking-tight text-slate-100">{title}</h1>
      {subtitle ? <p className="text-sm text-app-muted">{subtitle}</p> : null}
    </header>
  )
}
