import { Link } from 'react-router-dom'
import { PageHeader } from '../components/common/PageHeader'
import { useQuiz } from '../hooks/useQuiz'
import { calculatePercentage, calculateScore } from '../utils/scoreUtils'

export function ResultPage() {
  const { answers, quizzes, activeQuizId } = useQuiz()
  const activeQuiz = quizzes.find((quiz) => quiz.id === activeQuizId)
  const totalQuestions = activeQuiz?.questions.length ?? 0
  const score = calculateScore(answers)
  const percentage = calculatePercentage(score, totalQuestions)

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <PageHeader title="Result" subtitle="Your latest quiz result summary." />
      <section className="grid gap-3 rounded-2xl border border-app-border bg-app-card p-5 shadow-premium">
        <p className="text-app-text">
          Score: {score}/{totalQuestions}
        </p>
        <p className="text-app-muted">Percentage: {percentage}%</p>
        <Link to="/leaderboard" className="inline-flex w-fit rounded-lg bg-primary-500 px-4 py-2 font-medium text-app-bg transition hover:bg-primary-400">
          View Leaderboard
        </Link>
      </section>
    </main>
  )
}
