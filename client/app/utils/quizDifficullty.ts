import type { Quiz } from "../types/types"
const difficultyMap: Record<string, number> = {
  easy: 1,
  medium: 5,
  hard: 10,
}
//Scale is based on 1 - 10
export const calculateQuizDifficulty = (quiz: Quiz): number => {
  const totalQuestions = quiz.questions.length
  const totalDifficulty = quiz.questions.reduce((acc, question) => {
    const difficultyValue = difficultyMap[question.difficulty] || 0
    return acc + difficultyValue
  }, 0)

  return Math.round(totalDifficulty / totalQuestions)
}
