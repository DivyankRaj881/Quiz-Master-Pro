export function calculateScore(answers) {
  return Object.values(answers).filter((value) => {
    if (typeof value === 'boolean') return value
    return Boolean(value?.isCorrect)
  }).length
}

export function calculatePercentage(score, total) {
  if (total === 0) return 0
  return Math.round((score / total) * 100)
}
