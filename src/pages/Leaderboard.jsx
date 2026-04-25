import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const mockPlayers = [
  { id: 'p1', name: 'Aarav Mehta', score: 980, quizzes: 42, accuracy: 96 },
  { id: 'p2', name: 'Isha Kapoor', score: 945, quizzes: 39, accuracy: 94 },
  { id: 'p3', name: 'Rohan Verma', score: 920, quizzes: 37, accuracy: 92 },
  { id: 'p4', name: 'Neha Sharma', score: 885, quizzes: 34, accuracy: 90 },
  { id: 'p5', name: 'Kunal Gupta', score: 860, quizzes: 33, accuracy: 88 },
  { id: 'p6', name: 'Sana Ali', score: 845, quizzes: 30, accuracy: 87 },
  { id: 'p7', name: 'Priya Nair', score: 810, quizzes: 29, accuracy: 85 },
  { id: 'p8', name: 'Aditya Rao', score: 790, quizzes: 27, accuracy: 84 },
  { id: 'p9', name: 'Meera Jain', score: 765, quizzes: 25, accuracy: 82 },
  { id: 'p10', name: 'Vikram Das', score: 740, quizzes: 24, accuracy: 80 },
]

const medalByRank = {
  1: '🥇',
  2: '🥈',
  3: '🥉',
}

export function Leaderboard() {
  const { currentUser } = useAuth()

  const players = mockPlayers.map((player, index) => ({
    ...player,
    rank: index + 1,
  }))

  const currentUserName = currentUser?.name?.trim().toLowerCase()

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-300">
            Competition Board
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            Top 10 Players
          </h1>
          <p className="mt-2 text-sm text-app-muted">
            Premium ranking snapshot based on score, quiz volume, and consistency.
          </p>
        </div>
        <Link
          to="/dashboard"
          className="rounded-xl border border-app-border bg-app-surface px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-primary-500/60 hover:text-white"
        >
          Back to Dashboard
        </Link>
      </header>

      <section className="grid gap-3">
        {players.map((player) => {
          const isCurrentUser =
            currentUserName && player.name.toLowerCase() === currentUserName
          const isTopThree = player.rank <= 3

          return (
            <article
              key={player.id}
              className={`rounded-2xl border p-4 shadow-premium transition sm:p-5 ${
                isCurrentUser
                  ? 'border-primary-500 bg-primary-900/20'
                  : 'border-app-border bg-app-card'
              }`}
            >
              <div className="grid gap-3 sm:grid-cols-[120px_1fr_auto] sm:items-center">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-app-surface px-2.5 py-1 text-sm font-semibold text-slate-100">
                    #{player.rank}
                  </span>
                  {isTopThree ? (
                    <span className="text-xl" aria-label={`Rank ${player.rank} medal`}>
                      {medalByRank[player.rank]}
                    </span>
                  ) : null}
                </div>

                <div>
                  <p className="text-base font-semibold text-slate-100">{player.name}</p>
                  <p className="mt-1 text-xs text-app-muted">
                    Quizzes: {player.quizzes} • Accuracy: {player.accuracy}%
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-xs uppercase tracking-wide text-app-muted">Score</p>
                  <p className="text-2xl font-bold text-primary-300">{player.score}</p>
                </div>
              </div>

              {isCurrentUser ? (
                <p className="mt-3 text-xs font-medium text-primary-300">You are here</p>
              ) : null}
            </article>
          )
        })}
      </section>
    </main>
  )
}
