import { Link } from 'react-router-dom'
import { PageHeader } from '../components/common/PageHeader'
import { useQuiz } from '../hooks/useQuiz'

export function QuizPage() {
  const { quizzes, activeQuizId, setAnswers } = useQuiz()
  const activeQuiz = quizzes.find((quiz) => quiz.id === activeQuizId)

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <PageHeader title="Quiz Session" subtitle={activeQuiz?.description} />
      <section className="grid gap-3 rounded-2xl border border-app-border bg-app-card p-5 shadow-premium">
        <h2 className="text-xl font-semibold text-slate-100">{activeQuiz?.title}</h2>
        <p className="text-app-muted">Questions: {activeQuiz?.questions.length ?? 0}</p>
        <button
          className="w-fit rounded-lg border border-primary-700 bg-primary-900/40 px-4 py-2 text-primary-300 transition hover:bg-primary-800/60"
          type="button"
          onClick={() => setAnswers({ q1: true, q2: false })}
        >
          Mock Submit Answers
        </button>
        <Link
          to="/result"
          className="inline-flex w-fit rounded-lg bg-primary-500 px-4 py-2 font-medium text-app-bg transition hover:bg-primary-400"
        >
          View Result
        </Link>
      </section>
    </main>
  )
}
