import { AnimatePresence, motion as Motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../hooks/useQuiz'
import { shuffleQuestions } from '../utils/quizUtils'

const QUESTION_TIME = 15

export function Quiz() {
  const navigate = useNavigate()
  const { quizzes, activeQuizId, setAnswers } = useQuiz()
  const activeQuiz = quizzes.find((quiz) => quiz.id === activeQuizId) ?? quizzes[0]
  const questions = useMemo(
    () => shuffleQuestions(activeQuiz?.questions ?? []),
    [activeQuiz?.questions],
  )

  const [index, setIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME)
  const [answerMap, setAnswerMap] = useState({})

  const currentQuestion = questions[index]
  const totalQuestions = questions.length
  const progress = totalQuestions > 0 ? ((index + 1) / totalQuestions) * 100 : 0
  const isLastQuestion = index === totalQuestions - 1

  const selectedAnswerText = useMemo(() => {
    if (selectedOption === null || !currentQuestion) return ''
    return currentQuestion.options[selectedOption]
  }, [currentQuestion, selectedOption])

  const advanceQuestion = useCallback((selectedIndex) => {
    if (!currentQuestion) return

    const isCorrect = selectedIndex === currentQuestion.correctIndex
    const nextMap = {
      ...answerMap,
      [currentQuestion.id]: {
        selectedIndex,
        isCorrect,
        timedOut: selectedIndex === null,
      },
    }
    setAnswerMap(nextMap)
    setAnswers(nextMap)
    setSelectedOption(null)
    setTimeLeft(QUESTION_TIME)

    if (isLastQuestion) {
      navigate('/result')
      return
    }

    setIndex((prev) => prev + 1)
  }, [answerMap, currentQuestion, isLastQuestion, navigate, setAnswers])

  useEffect(() => {
    if (!currentQuestion) return undefined

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          advanceQuestion(null)
          return QUESTION_TIME
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timerId)
  }, [advanceQuestion, currentQuestion])

  useEffect(() => {
    setAnswers(answerMap)
  }, [answerMap, setAnswers])

  const handleNext = () => {
    if (!currentQuestion || selectedOption === null) return
    advanceQuestion(selectedOption)
  }

  if (!currentQuestion) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <section className="rounded-2xl border border-app-border bg-app-card p-6 text-app-muted">
          No quiz questions available right now.
        </section>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-300">
            Quiz Session
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-100 sm:text-3xl">{activeQuiz?.title}</h1>
        </div>
        <Motion.div
          animate={timeLeft <= 5 ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={
            timeLeft <= 5
              ? { duration: 0.8, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.2 }
          }
          className={`rounded-xl border px-4 py-2 ${
            timeLeft <= 5
              ? 'border-rose-500/70 bg-rose-900/30'
              : 'border-app-border bg-app-card'
          }`}
        >
          <p className="text-xs text-app-muted">Time Left</p>
          <p
            className={`text-lg font-semibold ${
              timeLeft <= 5 ? 'text-rose-300' : 'text-primary-300'
            }`}
          >
            {timeLeft}s
          </p>
        </Motion.div>
      </div>

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm text-app-muted">
          <span>
            Question {index + 1} of {totalQuestions}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-app-border/60">
          <Motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <Motion.section
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-app-border bg-app-card p-6 shadow-premium"
        >
          <h2 className="text-xl font-semibold text-slate-100">{currentQuestion.text}</h2>

          <div className="mt-5 grid gap-3">
            {currentQuestion.options.map((option, optionIndex) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelectedOption(optionIndex)}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                  selectedOption === optionIndex
                    ? 'border-primary-500 bg-primary-900/40 text-primary-200'
                    : 'border-app-border bg-app-surface text-slate-200 hover:border-primary-600/60'
                }`}
              >
                <span className="mr-2 text-app-muted">{String.fromCharCode(65 + optionIndex)}.</span>
                {option}
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-app-muted">
              {selectedAnswerText ? `Selected: ${selectedAnswerText}` : 'Select one option to continue'}
            </p>
            <button
              type="button"
              disabled={selectedOption === null}
              onClick={handleNext}
              className="rounded-xl bg-gradient-to-r from-primary-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-app-bg transition hover:from-primary-400 hover:to-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        </Motion.section>
      </AnimatePresence>
    </main>
  )
}
