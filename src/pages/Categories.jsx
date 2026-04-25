import { motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { containerVariants, cardVariants } from '../utils/animations'

const categories = [
  { name: 'Java', icon: '☕', difficulty: 'Medium', questions: 30, accent: 'from-orange-500 to-amber-400' },
  { name: 'DBMS', icon: '🗄️', difficulty: 'Hard', questions: 25, accent: 'from-indigo-500 to-violet-400' },
  { name: 'Web Dev', icon: '🌐', difficulty: 'Medium', questions: 40, accent: 'from-cyan-500 to-sky-400' },
  { name: 'DSA', icon: '🧩', difficulty: 'Hard', questions: 35, accent: 'from-emerald-500 to-teal-400' },
  { name: 'Aptitude', icon: '🧠', difficulty: 'Easy', questions: 20, accent: 'from-pink-500 to-rose-400' },
  { name: 'GK', icon: '📘', difficulty: 'Easy', questions: 30, accent: 'from-blue-500 to-indigo-400' },
]

export function Categories() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-7"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-300">Quiz Categories</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
          Pick your challenge area
        </h1>
        <p className="mt-2 text-sm text-app-muted">
          Choose a category and start practicing with curated questions.
        </p>
      </Motion.header>

      <Motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {categories.map((category) => (
          <Motion.article
            key={category.name}
            variants={cardVariants}
            whileHover="hover"
            className="rounded-2xl border border-app-border bg-app-card p-5 shadow-premium"
          >
            <Motion.div
              className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-xl ${category.accent}`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <span role="img" aria-label={`${category.name} icon`}>
                {category.icon}
              </span>
            </Motion.div>
            <h2 className="text-xl font-semibold text-slate-100">{category.name}</h2>
            <div className="mt-3 grid gap-2 text-sm text-app-muted">
              <p>
                Difficulty: <span className="font-medium text-slate-300">{category.difficulty}</span>
              </p>
              <p>
                Questions: <span className="font-medium text-slate-300">{category.questions}</span>
              </p>
            </div>
            <Motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/quiz"
                className="mt-5 inline-flex rounded-xl bg-gradient-to-r from-primary-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-app-bg transition hover:from-primary-400 hover:to-cyan-300"
              >
                Start {category.name}
              </Link>
            </Motion.div>
          </Motion.article>
        ))}
      </Motion.section>
    </main>
  )
}
