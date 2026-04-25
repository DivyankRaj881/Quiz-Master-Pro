import { useMemo, useState } from 'react'
import { sampleQuizzes } from '../data/sampleQuizzes'
import { QuizContext } from './QuizContextInstance'

export function QuizProvider({ children }) {
  const [activeQuizId, setActiveQuizId] = useState(sampleQuizzes[0]?.id ?? null)
  const [answers, setAnswers] = useState({})

  const value = useMemo(
    () => ({
      activeQuizId,
      setActiveQuizId,
      answers,
      setAnswers,
      quizzes: sampleQuizzes,
    }),
    [activeQuizId, answers],
  )

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}
