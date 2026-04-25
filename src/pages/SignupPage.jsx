import { Link } from 'react-router-dom'
import { PageHeader } from '../components/common/PageHeader'

export function SignupPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <PageHeader title="Signup" subtitle="Create a new QuizMaster Pro account." />
      <section className="grid gap-3 rounded-2xl border border-app-border bg-app-card p-5 shadow-premium">
        <p className="text-app-muted">Signup form goes here.</p>
        <Link to="/login" className="inline-flex w-fit rounded-lg bg-primary-500 px-4 py-2 font-medium text-app-bg transition hover:bg-primary-400">
          Already have an account?
        </Link>
      </section>
    </main>
  )
}
