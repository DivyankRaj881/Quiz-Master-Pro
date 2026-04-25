export function StatCard({ label, value, accent = false, className = '' }) {
  return (
    <article className={`rounded-2xl border border-app-border bg-app-card p-5 transition-colors hover:border-primary-500/50 ${className}`}>
      <p className="text-xs uppercase tracking-wide text-app-muted">{label}</p>
      <p className={`mt-2 text-2xl font-semibold ${accent ? 'text-primary-400' : 'text-slate-100'}`}>
        {value}
      </p>
    </article>
  )
}
