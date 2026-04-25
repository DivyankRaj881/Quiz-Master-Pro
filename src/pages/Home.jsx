import { motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { AppHeader } from '../components/common/AppHeader'

const features = [
  {
    title: 'Smart Quiz Builder',
    description:
      'Create interactive quizzes in minutes with reusable templates and auto-scoring logic.',
  },
  {
    title: 'Deep Analytics',
    description:
      'Track completion, accuracy, and engagement with real-time insights and trend snapshots.',
  },
  {
    title: 'Team Leaderboards',
    description:
      'Boost motivation with competitive rankings, weekly challenges, and shareable achievements.',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-app-bg text-app-text">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary-500/20 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute right-0 top-80 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl sm:h-72 sm:w-72" />
        <div className="absolute bottom-24 left-0 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl sm:h-72 sm:w-72" />
      </div>

      <Motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-20 border-b border-app-border/60 bg-app-bg/70 backdrop-blur-xl"
      >
        <AppHeader title="QuizMaster Pro">
          <Link
            to="/login"
            className="rounded-xl border border-app-border/80 px-3 py-2 text-sm text-app-muted transition duration-300 hover:-translate-y-0.5 hover:border-primary-500/50 hover:text-slate-100 sm:px-4"
          >
            <span className="hidden sm:inline">Login</span>
            <span className="sm:hidden">In</span>
          </Link>
          <Link
            to="/game-tutorial"
            className="rounded-xl bg-gradient-to-r from-primary-500 to-cyan-400 px-3 py-2 text-sm font-semibold text-app-bg shadow-lg shadow-primary-900/40 transition duration-300 hover:-translate-y-1 hover:from-primary-400 hover:to-cyan-300 sm:px-4"
          >
            <span className="hidden sm:inline">Start Free</span>
            <span className="sm:hidden">Free</span>
          </Link>
        </AppHeader>
      </Motion.header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-20 lg:pt-16">
          <Motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6 sm:space-y-8"
          >
            <Motion.span
              variants={item}
              className="inline-flex rounded-full border border-primary-700/60 bg-primary-900/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary-200 sm:px-3.5"
            >
              Premium Quiz SaaS Platform
            </Motion.span>
            <Motion.h1
              variants={item}
              className="max-w-xl bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-3xl font-bold leading-tight tracking-tight text-transparent sm:text-4xl lg:text-5xl xl:text-6xl"
            >
              Build, launch, and scale quizzes with confidence
            </Motion.h1>
            <Motion.p variants={item} className="max-w-xl text-base leading-relaxed text-app-muted sm:text-lg">
              QuizMaster Pro helps teams design engaging assessments, analyze learner progress,
              and improve outcomes with a modern workflow.
            </Motion.p>
            <Motion.div variants={item} className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                to="/game-tutorial"
                className="rounded-xl bg-gradient-to-r from-primary-500 to-cyan-400 px-6 py-3 text-center text-sm font-semibold text-app-bg shadow-lg shadow-primary-900/40 transition duration-300 hover:-translate-y-1 hover:from-primary-400 hover:to-cyan-300"
              >
                Get Started
              </Link>
              <Link
                to="/dashboard"
                className="rounded-xl border border-app-border/80 bg-app-surface/40 px-6 py-3 text-center text-sm font-semibold text-slate-200 transition duration-300 hover:-translate-y-1 hover:border-primary-500/60 hover:bg-app-surface/70"
              >
                View Demo Dashboard
              </Link>
            </Motion.div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -6 }}
            className="rounded-3xl border border-app-border/80 bg-gradient-to-b from-app-card to-app-surface p-6 shadow-premium sm:p-7"
          >
            <div className="grid gap-4">
              <div className="rounded-2xl border border-app-border/80 bg-app-surface/80 p-4 transition duration-300 hover:border-primary-500/50 hover:bg-app-surface">
                <p className="text-xs text-app-muted">Weekly Engagement</p>
                <p className="mt-1 text-2xl font-semibold text-slate-100">+38%</p>
              </div>
              <div className="rounded-2xl border border-app-border/80 bg-app-surface/80 p-4 transition duration-300 hover:border-primary-500/50 hover:bg-app-surface">
                <p className="text-xs text-app-muted">Average Completion Rate</p>
                <p className="mt-1 text-2xl font-semibold text-slate-100">92%</p>
              </div>
              <div className="rounded-2xl border border-app-border/80 bg-app-surface/80 p-4 transition duration-300 hover:border-primary-500/50 hover:bg-app-surface">
                <p className="text-xs text-app-muted">Active Learners</p>
                <p className="mt-1 text-2xl font-semibold text-slate-100">12.4K</p>
              </div>
            </div>
          </Motion.div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
          <Motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-primary-300">Features</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
              Everything your quiz business needs
            </h2>
          </Motion.div>
          <Motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid gap-5 md:grid-cols-3"
          >
            {features.map((feature) => (
              <Motion.article
                key={feature.title}
                variants={item}
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="group rounded-2xl border border-app-border/80 bg-gradient-to-b from-app-card to-app-surface p-6 shadow-premium/60"
              >
                <div className="mb-4 h-1.5 w-10 rounded-full bg-gradient-to-r from-primary-500 to-cyan-300 transition-all duration-300 group-hover:w-16" />
                <h3 className="text-lg font-semibold text-slate-100">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-app-muted">{feature.description}</p>
              </Motion.article>
            ))}
          </Motion.div>
        </section>
      </main>

      <footer className="border-t border-app-border/70 bg-app-surface/30">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 py-6 text-sm text-app-muted sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} QuizMaster Pro. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/settings">Settings</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/leaderboard">Leaderboard</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
