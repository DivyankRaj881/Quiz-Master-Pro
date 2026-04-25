import { motion as Motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuiz } from '../hooks/useQuiz'
import { calculatePercentage, calculateScore } from '../utils/scoreUtils'

const confettiPieces = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: `${(index * 97) % 100}%`,
  delay: (index % 8) * 0.12,
  duration: 1.8 + (index % 5) * 0.25,
}))

export function Result() {
  const navigate = useNavigate()
  const { answers, quizzes, activeQuizId, setAnswers } = useQuiz()
  const [openReviews, setOpenReviews] = useState({})
  const activeQuiz = quizzes.find((quiz) => quiz.id === activeQuizId)
  const questions = activeQuiz?.questions ?? []
  const totalQuestions = activeQuiz?.questions.length ?? 0
  const correct = calculateScore(answers)
  const wrong = Math.max(totalQuestions - correct, 0)
  const accuracy = calculatePercentage(correct, totalQuestions)
  const isHighScore = accuracy >= 80

  const handleRestart = () => {
    setAnswers({})
    navigate('/quiz')
  }

  const toggleReview = (questionId) => {
    setOpenReviews((prev) => ({ ...prev, [questionId]: !prev[questionId] }))
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-app-border bg-app-card p-6 shadow-premium sm:p-8">
        {isHighScore ? (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {confettiPieces.map((piece) => (
              <Motion.span
                key={piece.id}
                className="absolute top-[-12px] h-3 w-2 rounded-sm bg-gradient-to-b from-primary-300 to-cyan-500"
                style={{ left: piece.left }}
                initial={{ y: -10, rotate: 0, opacity: 0 }}
                animate={{ y: 420, rotate: 360, opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: piece.duration,
                  delay: piece.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
          </div>
        ) : null}

        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-300">Quiz Completed</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">Final Result</h1>
          <p className="mt-2 text-sm text-app-muted">
            {isHighScore
              ? 'Excellent work. You achieved a high score.'
              : 'Good attempt. Review and try again to improve.'}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-app-border bg-app-surface p-5">
              <p className="text-xs uppercase tracking-wide text-app-muted">Final Score</p>
              <p className="mt-2 text-3xl font-semibold text-slate-100">
                {correct}/{totalQuestions}
              </p>
            </article>
            <article className="rounded-2xl border border-app-border bg-app-surface p-5">
              <p className="text-xs uppercase tracking-wide text-app-muted">Accuracy</p>
              <p className="mt-2 text-3xl font-semibold text-slate-100">{accuracy}%</p>
            </article>
            <article className="rounded-2xl border border-app-border bg-app-surface p-5">
              <p className="text-xs uppercase tracking-wide text-app-muted">Correct Answers</p>
              <p className="mt-2 text-3xl font-semibold text-emerald-300">{correct}</p>
            </article>
            <article className="rounded-2xl border border-app-border bg-app-surface p-5">
              <p className="text-xs uppercase tracking-wide text-app-muted">Wrong Answers</p>
              <p className="mt-2 text-3xl font-semibold text-rose-300">{wrong}</p>
            </article>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleRestart}
              className="rounded-xl bg-gradient-to-r from-primary-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-app-bg transition hover:from-primary-400 hover:to-cyan-300"
            >
              Restart Quiz
            </button>
            <Link
              to="/dashboard"
              className="rounded-xl border border-app-border bg-app-surface px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-primary-500/60 hover:text-white"
            >
              Go Dashboard
            </Link>
          </div>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-slate-100">Answer Review</h2>
            <p className="mt-1 text-sm text-app-muted">
              Expand each card to view selected answer, correct answer, and explanation.
            </p>

            <div className="mt-4 grid gap-3">
              {questions.map((question, index) => {
                const answerEntry = answers[question.id]
                const selectedIndex =
                  typeof answerEntry === 'object' ? answerEntry?.selectedIndex : null
                const isCorrect =
                  typeof answerEntry === 'boolean'
                    ? answerEntry
                    : Boolean(answerEntry?.isCorrect)
                const selectedText =
                  selectedIndex !== null && selectedIndex !== undefined
                    ? question.options[selectedIndex]
                    : 'Not answered'
                const correctText = question.options[question.correctIndex]
                const isOpen = Boolean(openReviews[question.id])

                return (
                  <article
                    key={question.id}
                    className="rounded-2xl border border-app-border bg-app-surface/70"
                  >
                    <button
                      type="button"
                      onClick={() => toggleReview(question.id)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                    >
                      <div>
                        <p className="text-sm text-app-muted">Question {index + 1}</p>
                        <p className="mt-1 font-medium text-slate-100">{question.text}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${
                            isCorrect
                              ? 'bg-emerald-900/50 text-emerald-300'
                              : 'bg-rose-900/50 text-rose-300'
                          }`}
                        >
                          {isCorrect ? 'Correct' : 'Wrong'}
                        </span>
                        <span className="text-app-muted">{isOpen ? '−' : '+'}</span>
                      </div>
                    </button>

                    {isOpen ? (
                      <div className="grid gap-2 border-t border-app-border px-4 py-3 text-sm">
                        <p className="text-app-muted">
                          Selected Answer:{' '}
                          <span className="font-medium text-slate-200">{selectedText}</span>
                        </p>
                        <p className="text-app-muted">
                          Correct Answer:{' '}
                          <span className="font-medium text-emerald-300">{correctText}</span>
                        </p>
                        <p className="text-app-muted">
                          Explanation:{' '}
                          <span className="text-slate-200">
                            {question.explanation ?? 'No explanation available.'}
                          </span>
                        </p>
                      </div>
                    ) : null}
                  </article>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
