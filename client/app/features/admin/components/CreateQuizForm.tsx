import { useState } from "react"
import Form from "../../../components/base/Form"
import type { FieldConfig } from "../../../types/types"
import type z from "zod"
import { quizSchema, type QuizFormValues } from "../../../schemas/quizSchema"
import { clearFieldError } from "../../../utils/clearFieldErrors"

type CreateQuizFormProps = {
  onSubmit: (formData: QuizFormValues) => void
  submitLabel?: string
  isLoading?: boolean
  error?: string | null
}

const CreateQuizForm = ({
  onSubmit,
  submitLabel = "Create Quiz",
  isLoading,
  error,
}: CreateQuizFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    questions: [
      {
        title: "",
        image_url: "",
        difficulty: "easy",
        category: "",
        answers: [
          { option_text: "", correct: true },
          { option_text: "", correct: false },
        ],
      },
    ],
  })

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string
  }>({})

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValidationErrors({})

    const res = quizSchema.safeParse(formData)

    if (!res.success) {
      const fieldErrors = Object.fromEntries(
        res.error.issues.map((issue: z.core.$ZodIssue) => [
          issue.path.join("."),
          issue.message,
        ]),
      )
      console.log("Validation errors:", fieldErrors)
      setValidationErrors(fieldErrors)
      return
    }

    setValidationErrors({})
    onSubmit(res.data)
  }

  const handleQuestionAdd = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          title: "",
          image_url: "",
          difficulty: "easy",
          category: "",
          answers: [
            { option_text: "", correct: true },
            { option_text: "", correct: false },
          ],
        },
      ],
    }))
  }

  const handleQuestionRemove = (qIndex: number) => {
    setFormData((prev) => {
      const nextQuestions = [...prev.questions]
      nextQuestions.splice(qIndex, 1)
      return { ...prev, questions: nextQuestions }
    })
  }

  const handleAnswerAdd = (qIndex: number) => {
    setFormData((prev) => {
      const nextQuestions = prev.questions.map((q, idx) => {
        if (idx !== qIndex) return q
        return {
          ...q,
          answers: [...q.answers, { option_text: "", correct: false }],
        }
      })
      return { ...prev, questions: nextQuestions }
    })
  }

  const handleAnswerRemove = (qIndex: number, aIndex: number) => {
    setFormData((prev) => {
      const nextQuestions = prev.questions.map((q, idx) => {
        if (idx !== qIndex) return q
        return {
          ...q,
          answers: q.answers.filter((_, answerIdx) => answerIdx !== aIndex),
        }
      })
      return { ...prev, questions: nextQuestions }
    })
  }
  const quizFields: FieldConfig[] = [
    {
      name: "title",
      label: "Quiz Title",
      type: "text",
      placeholder: "Enter quiz title",
      value: formData.title,
      onChange: (value) => {
        setFormData((prev) => ({ ...prev, title: value }))
        clearFieldError("title", setValidationErrors)
      },
      error: validationErrors.title,
    },
    {
      name: "questions",
      label: "Questions",
      type: "array",
      onAdd: handleQuestionAdd,
      onRemove: (qIndex: number) => handleQuestionRemove(qIndex),
      fields: formData.questions.map((question, qIndex) => [
        {
          name: `questions.${qIndex}.title`,
          label: "Question Text",
          type: "text",
          placeholder: "Enter question text",
          value: question.title,
          error: validationErrors[`questions.${qIndex}.title`],
          onChange: (value) => {
            ;(setFormData((prev) => {
              const nextQuestions = [...prev.questions]
              nextQuestions[qIndex].title = value
              return { ...prev, questions: nextQuestions }
            }),
              clearFieldError(`questions.${qIndex}.title`, setValidationErrors))
          },
        },
        {
          name: `questions.${qIndex}.image_url`,
          label: "Image URL",
          type: "text",
          placeholder: "http://example.com/image.png",
          value: question.image_url,
          error: validationErrors[`questions.${qIndex}.image_url`],
          onChange: (value) => {
            ;(setFormData((prev) => {
              const nextQuestions = [...prev.questions]
              nextQuestions[qIndex].image_url = value
              return { ...prev, questions: nextQuestions }
            }),
              clearFieldError(
                `questions.${qIndex}.image_url`,
                setValidationErrors,
              ))
          },
        },
        {
          name: `questions.${qIndex}.difficulty`,
          label: "Difficulty",
          type: "select",
          options: ["easy", "medium", "hard"],
          value: question.difficulty,
          error: validationErrors[`questions.${qIndex}.difficulty`],
          onChange: (value) => {
            ;(setFormData((prev) => {
              const nextQuestions = [...prev.questions]
              nextQuestions[qIndex].difficulty = value
              return { ...prev, questions: nextQuestions }
            }),
              clearFieldError(
                `questions.${qIndex}.difficulty`,
                setValidationErrors,
              ))
          },
        },
        {
          name: `questions.${qIndex}.category`,
          label: "Category",
          type: "text",
          placeholder: "Category name",
          value: question.category,
          error: validationErrors[`questions.${qIndex}.category`],
          onChange: (value) => {
            ;(setFormData((prev) => {
              const nextQuestions = [...prev.questions]
              nextQuestions[qIndex].category = value
              return { ...prev, questions: nextQuestions }
            }),
              clearFieldError(
                `questions.${qIndex}.category`,
                setValidationErrors,
              ))
          },
        },
        {
          name: `questions.${qIndex}.answers`,
          label: "Answer Options",
          type: "array",
          onAdd: () => handleAnswerAdd(qIndex),
          onRemove: (aIndex: number) => handleAnswerRemove(qIndex, aIndex),
          fields: question.answers.map((answer, aIndex) => [
            {
              name: `questions.${qIndex}.answers.${aIndex}.option_text`,
              label: "Option Text",
              type: "text",
              placeholder: "Enter option text",
              value: answer.option_text,
              error:
                validationErrors[
                  `questions.${qIndex}.answers.${aIndex}.option_text`
                ],
              onChange: (value) => {
                ;(setFormData((prev) => {
                  const nextQuestions = [...prev.questions]
                  nextQuestions[qIndex].answers[aIndex].option_text = value
                  return { ...prev, questions: nextQuestions }
                }),
                  clearFieldError(
                    `questions.${qIndex}.answers.${aIndex}.option_text`,
                    setValidationErrors,
                  ))
              },
            },
            {
              name: `questions.${qIndex}.answers.${aIndex}.correct`,
              label: "Is Correct Choice?",
              type: "select",
              options: ["true", "false"],
              error:
                validationErrors[
                  `questions.${qIndex}.answers.${aIndex}.correct`
                ],
              value: String(answer.correct),
              onChange: (value) => {
                ;(setFormData((prev) => {
                  const nextQuestions = [...prev.questions]
                  nextQuestions[qIndex].answers[aIndex].correct =
                    value === "true"
                  return { ...prev, questions: nextQuestions }
                }),
                  clearFieldError(
                    `questions.${qIndex}.answers.${aIndex}.correct`,
                    setValidationErrors,
                  ))
              },
            },
          ]),
        },
      ]),
    },
  ]

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4">
      <h2>Quiz Form</h2>
      <Form
        fields={quizFields}
        onSubmit={handleSubmit}
        submitLabel={submitLabel}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}

export default CreateQuizForm
