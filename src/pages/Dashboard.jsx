import { animate, motion as Motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppHeader } from '../components/common/AppHeader'
import { Sidebar } from '../components/common/Sidebar'
import { StatCard } from '../components/common/StatCard'
import { Card } from '../components/common/Card'
import { useAuth } from '../hooks/useAuth'
import { useQuiz } from '../hooks/useQuiz'
import { calculatePercentage, calculateScore } from '../utils/scoreUtils'

const sidebarLinks = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Quiz Session', to: '/quiz' },
  { label: 'Result', to: '/result' },
  { label: 'Analytics', to: '/analytics' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Profile', to: '/profile' },
  { label: 'Settings', to: '/settings' },
]

const quickActions = [
  { label: 'Browse Categories', to: '/categories' },
  { label: 'View Detailed Analytics', to: '/analytics' },
  { label: 'Check Leaderboard', to: '/leaderboard' },
]

function CountUp({ value, suffix = '' }) {
  const motionValue = useMotionValue(0)
  const rounded = useTransform(() => Math.round(motionValue.get()))

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.1,
      ease: 'easeOut',
    })
    return () => controls.stop()
  }, [motionValue, value])

  return (
    <Motion.span>
      {rounded}
      {suffix}
    </Motion.span>
  )
}

export function Dashboard() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  const { quizzes, activeQuizId, answers } = useQuiz()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const activeQuiz = quizzes.find((quiz) => quiz.id === activeQuizId) ?? quizzes[0]
  const totalQuestions = activeQuiz?.questions.length ?? 0
  const bestScore = calculateScore(answers)
  const accuracy = calculatePercentage(bestScore, totalQuestions)
  const quizzesPlayed = Object.keys(answers).length > 0 ? 1 : 0
  const streak = quizzesPlayed > 0 ? 3 : 0

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-app-bg text-app-text">
      <AppHeader
        title="QuizMaster Pro"
        onMenuToggle={() => setSidebarOpen((prev) => !prev)}
        isMenuOpen={sidebarOpen}
      >
        <span className="hidden text-sm text-app-muted sm:inline">
          Hi, {currentUser?.name ?? 'Learner'}
        </span>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-xl border border-app-border bg-app-surface px-3 py-2 text-sm text-slate-200 transition hover:border-primary-500/60 hover:text-white sm:px-4"
        >
          <span className="hidden sm:inline">Logout</span>
          <span className="sm:hidden">Out</span>
        </button>
      </AppHeader>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar
          items={sidebarLinks}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <section className="grid gap-6 lg:col-start-2">
          <Card className="p-4 sm:p-6">
            <p className="text-sm text-app-muted">Welcome back</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl lg:text-4xl">
              {currentUser?.name ?? 'QuizMaster Pro User'}
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-app-muted">
              Here is your performance snapshot for today. Keep your streak alive and improve your
              leaderboard rank.
            </p>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Quizzes Played" value={<CountUp value={quizzesPlayed} />} />
            <StatCard label="Best Score" value={<>{<CountUp value={bestScore} />}/{totalQuestions}</>} />
            <StatCard label="Accuracy" value={<CountUp value={accuracy} suffix="%" />} accent />
            <StatCard label="Streak" value={<>{<CountUp value={streak} />} days</>} />
          </div>

          <Card className="p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-slate-100">Quick Actions</h2>
            <p className="mt-2 text-sm text-app-muted">Jump into your most common workflows.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {quickActions.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-xl border border-app-border bg-app-surface px-4 py-3 text-sm font-medium text-slate-200 transition hover:-translate-y-0.5 hover:border-primary-500/60 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </Card>
        </section>
      </main>
    </div>
  )
}
