import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <section className="grid gap-3 rounded-2xl border border-app-border bg-app-card p-5 shadow-premium">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">Page Not Found</h1>
        <p className="text-app-muted">The page you requested does not exist.</p>
        <Link
          to="/"
          className="inline-flex w-fit rounded-lg bg-primary-500 px-4 py-2 font-medium text-app-bg transition hover:bg-primary-400"
        >
          Go to Home
        </Link>
      </section>
    </main>
  )
}
