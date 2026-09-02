import { eq } from "drizzle-orm"
import { db } from "../db/db.js"
import { quizzes, questions, answers } from "../db/schema.js"

export const postCreateQuiz = async (req, res) => {
  try {
    const { title, questions: questionsData } = req.body

    if (!title || !Array.isArray(questionsData) || questionsData.length === 0) {
      return res
        .status(400)
        .json({ message: "Quiz title and questions are required" })
    }

    const newQuiz = db.transaction((tx) => {
      const quiz = tx.insert(quizzes).values({ title }).returning().get()

      for (const q of questionsData) {
        const question = tx
          .insert(questions)
          .values({
            quizId: quiz.id,
            title: q.title,
            imageUrl: q.image_url || q.imageUrl,
            difficulty: q.difficulty,
            category: q.category,
          })
          .returning()
          .get()

        if (Array.isArray(q.answers) && q.answers.length > 0) {
          for (const a of q.answers) {
            tx.insert(answers)
              .values({
                questionId: question.id,
                optionText: a.option_text || a.optionText,
                correct: Boolean(a.correct),
              })
              .run()
          }
        }
      }

      return quiz
    })

    return res.status(201).json({
      message: "Quiz created successfully",
      quiz: newQuiz,
    })
  } catch (error) {
    console.error("Create Quiz Error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export const getQuizzes = async (req, res) => {
  try {
    const allQuizzes = await db.query.quizzes.findMany({
      with: {
        questions: {
          with: {
            answers: true,
          },
        },
      },
    })

    return res.status(200).json(allQuizzes)
  } catch (error) {
    console.error("Get Quizzes Error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export const getQuizById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid quiz ID" })
    }

    const quiz = await db.query.quizzes.findFirst({
      where: (quizzes, { eq }) => eq(quizzes.id, id),
      with: {
        questions: {
          with: {
            answers: true,
          },
        },
      },
    })

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" })
    }

    return res.status(200).json(quiz)
  } catch (error) {
    console.error("Get Quiz By ID Error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export const putUpdateQuiz = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const { title, questions: questionsData } = req.body

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid quiz ID" })
    }

    const existingQuiz = db
      .select({ id: quizzes.id })
      .from(quizzes)
      .where(eq(quizzes.id, id))
      .get()
    if (!existingQuiz) {
      return res.status(404).json({ message: "Quiz not found" })
    }

    db.transaction((tx) => {
      if (title) {
        tx.update(quizzes).set({ title }).where(eq(quizzes.id, id)).run()
      }

      if (Array.isArray(questionsData)) {
        tx.delete(questions).where(eq(questions.quizId, id)).run()

        for (const q of questionsData) {
          const [question] = tx
            .insert(questions)
            .values({
              quizId: id,
              title: q.title,
              imageUrl: q.image_url || q.imageUrl,
              difficulty: q.difficulty,
              category: q.category,
            })
            .returning()

          if (Array.isArray(q.answers)) {
            for (const a of q.answers) {
              tx.insert(answers)
                .values({
                  questionId: question.id,
                  optionText: a.option_text || a.optionText,
                  correct: Boolean(a.correct),
                })
                .run()
            }
          }
        }
      }
    })

    return res.status(200).json({ message: "Quiz updated successfully" })
  } catch (error) {
    console.error("Update Quiz Error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export const deleteQuiz = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid quiz ID" })
    }

    const result = db.delete(quizzes).where(eq(quizzes.id, id)).run()

    if (result.changes === 0) {
      return res.status(404).json({ message: "Quiz not found" })
    }

    return res.status(200).json({ message: "Quiz deleted successfully" })
  } catch (error) {
    console.error("Delete Quiz Error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export default {
  postCreateQuiz,
  getQuizzes,
  getQuizById,
  putUpdateQuiz,
  deleteQuiz,
}
