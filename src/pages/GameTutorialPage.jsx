import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import { PageHeader } from '../components/common/PageHeader'
import { Card } from '../components/common/Card'
import { AnimatedButton } from '../components/common/AnimatedButton'

export function GameTutorialPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const handleNext = () => {
    setStep(2)
  }

  const handleStartQuiz = () => {
    navigate('/quiz')
  }

  return (
    <main className="min-h-screen bg-app-bg text-app-text">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
        <PageHeader
          title="Game Tutorial"
          subtitle={step === 1 ? 'Learn how to play' : 'Watch the demo'}
        />

        <Motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {step === 1 ? (
            <Card className="space-y-6 p-8">
              <Motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-semibold text-app-text"
              >
                How to Play QuizMaster Pro
              </Motion.h2>

              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-app-text">Select Your Quiz</h3>
                    <p className="text-app-muted">
                      Choose from a variety of quiz categories and difficulty levels to match your
                      learning goals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-app-text">Answer Questions</h3>
                    <p className="text-app-muted">
                      Read each question carefully and select your answer from the available
                      options. You can use hints if enabled in settings.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-app-text">Get Instant Feedback</h3>
                    <p className="text-app-muted">
                      Receive immediate feedback on your answers with detailed explanations to
                      help you learn.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-white font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-app-text">View Your Results</h3>
                    <p className="text-app-muted">
                      See your score, accuracy, and detailed analytics. Track your progress over
                      time on the leaderboard.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-white font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-app-text">Compete & Improve</h3>
                    <p className="text-app-muted">
                      Compete with other players on the leaderboard and challenge yourself to
                      improve your scores.
                    </p>
                  </div>
                </div>
              </Motion.div>

              <Motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleNext}
                className="w-full rounded-lg bg-gradient-to-r from-primary-500 to-cyan-400 px-6 py-3 font-semibold text-app-bg shadow-lg shadow-primary-900/40 transition hover:from-primary-400 hover:to-cyan-300"
              >
                Next →
              </Motion.button>
            </Card>
          ) : (
            <Card className="space-y-6 p-8">
              <Motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-semibold text-app-text"
              >
                Demo Video
              </Motion.h2>

              <Motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="aspect-video w-full overflow-hidden rounded-lg border border-app-border bg-app-surface">
                  <video
                    className="h-full w-full object-cover"
                    controls
                    poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 720'%3E%3Crect fill='%23111827' width='1280' height='720'/%3E%3Ctext x='50%25' y='50%25' font-size='48' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle' font-family='Arial'%3EDemo Video: How to Play QuizMaster Pro%3C/text%3E%3C/svg%3E"
                  >
                    <source
                      src="https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="space-y-3 rounded-lg border border-primary-500/30 bg-primary-900/20 p-4">
                  <h3 className="font-semibold text-primary-200">What you saw in the demo:</h3>
                  <ul className="space-y-2 text-sm text-app-muted">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary-500 flex-shrink-0"></span>
                      <span>Browse and select from various quiz categories</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary-500 flex-shrink-0"></span>
                      <span>Read questions and select your answers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary-500 flex-shrink-0"></span>
                      <span>Get immediate feedback with explanations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary-500 flex-shrink-0"></span>
                      <span>View detailed results and track your progress</span>
                    </li>
                  </ul>
                </div>
              </Motion.div>

              <div className="flex gap-3">
                <Motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setStep(1)}
                  className="flex-1 rounded-lg border border-app-border bg-app-surface px-6 py-3 font-semibold text-app-text transition hover:bg-app-border"
                >
                  ← Back
                </Motion.button>
                <Motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleStartQuiz}
                  className="flex-1 rounded-lg bg-gradient-to-r from-primary-500 to-cyan-400 px-6 py-3 font-semibold text-app-bg shadow-lg shadow-primary-900/40 transition hover:from-primary-400 hover:to-cyan-300"
                >
                  Start Quiz →
                </Motion.button>
              </div>
            </Card>
          )}
        </Motion.div>
      </div>
    </main>
  )
}
