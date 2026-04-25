import { PageHeader } from '../components/common/PageHeader'

export function LeaderboardPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <PageHeader title="Leaderboard" subtitle="Top players and high scores." />
      <section className="grid gap-3 rounded-2xl border border-app-border bg-app-card p-5 shadow-premium">
        <p className="text-app-muted">Leaderboard rankings will be shown here.</p>
      </section>
    </main>
  )
}
