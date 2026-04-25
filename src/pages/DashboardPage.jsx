import { Link } from 'react-router-dom'
import { PageHeader } from '../components/common/PageHeader'

export function DashboardPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <PageHeader title="Dashboard" subtitle="Overview of quizzes, stats, and recent activity." />
      <section className="grid gap-3 rounded-2xl border border-app-border bg-app-card p-5 shadow-premium">
        <p className="text-app-muted">Dashboard widgets will be added here.</p>
        <Link to="/analytics" className="inline-flex w-fit rounded-lg bg-primary-500 px-4 py-2 font-medium text-app-bg transition hover:bg-primary-400">
          View Analytics
        </Link>
      </section>
    </main>
  )
}
