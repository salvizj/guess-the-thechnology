import { useCallback, useState } from "react"
import {
  fetchCreateQuiz,
  fetchDeleteQuiz,
  fetchGetQuizById,
  fetchGetQuizzes,
  fetchUpdateQuiz,
} from "../api/quiz"
import type { QuizSchema } from "../../../schemas/quizSchema"

const useQuiz = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createQuiz = useCallback(async (data: QuizSchema) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetchCreateQuiz(data)
      return response
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create quiz"
      setError(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateQuiz = useCallback(async (id: string, data: QuizSchema) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetchUpdateQuiz(id, data)
      return response
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update quiz"
      setError(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const deleteQuiz = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      await fetchDeleteQuiz(id)
      return null
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete quiz"
      setError(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getQuiz = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetchGetQuizById(id)
      return response
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch quiz"
      setError(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getQuizzes = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetchGetQuizzes()
      return response
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch quizzes"
      setError(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    isLoading,
    error,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getQuiz,
    getQuizzes,
  }
}

export default useQuiz
