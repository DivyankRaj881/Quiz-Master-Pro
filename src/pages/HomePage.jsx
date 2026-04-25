import { Link } from 'react-router-dom'
import { PageHeader } from '../components/common/PageHeader'
import { useQuiz } from '../hooks/useQuiz'

export function HomePage() {
  const { quizzes } = useQuiz()

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <PageHeader
        title="QuizMaster Pro"
        subtitle="Premium dark experience with Tailwind-powered design tokens."
      />

      <section className="grid gap-3 rounded-2xl border border-app-border bg-app-card p-5 shadow-premium">
        <h2 className="text-xl font-semibold text-slate-100">Available Quizzes</h2>
        <ul className="space-y-2 text-app-muted">
          {quizzes.map((quiz) => (
            <li key={quiz.id} className="rounded-lg border border-app-border bg-app-surface px-3 py-2">
              {quiz.title}
            </li>
          ))}
        </ul>
        <Link
          to="/quiz"
          className="inline-flex w-fit rounded-lg bg-primary-500 px-4 py-2 font-medium text-app-bg transition hover:bg-primary-400"
        >
          Start Quiz
        </Link>
      </section>
    </main>
  )
}
