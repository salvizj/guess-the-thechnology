import { useState } from "react"
import Form from "../../../components/base/Form"
import type { FieldConfig } from "../../../types/types"
import type z from "zod"
import { quizSchema, type QuizFormValues } from "../../../schemas/quizSchema"

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
      const nextQuestions = [...prev.questions]
      nextQuestions[qIndex].answers.push({ option_text: "", correct: false })
      return { ...prev, questions: nextQuestions }
    })
  }

  const handleAnswerRemove = (qIndex: number, aIndex: number) => {
    setFormData((prev) => {
      const nextQuestions = [...prev.questions]
      nextQuestions[qIndex].answers.splice(aIndex, 1)
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
      onChange: (value) => setFormData((prev) => ({ ...prev, title: value })),
      error: validationErrors?.title,
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
          onChange: (val) =>
            setFormData((prev) => {
              const nextQuestions = [...prev.questions]
              nextQuestions[qIndex].title = val
              return { ...prev, questions: nextQuestions }
            }),
        },
        {
          name: `questions.${qIndex}.image_url`,
          label: "Image URL",
          type: "text",
          placeholder: "http://example.com/image.png",
          value: question.image_url,
          onChange: (val) =>
            setFormData((prev) => {
              const nextQuestions = [...prev.questions]
              nextQuestions[qIndex].image_url = val
              return { ...prev, questions: nextQuestions }
            }),
        },
        {
          name: `questions.${qIndex}.difficulty`,
          label: "Difficulty",
          type: "select",
          options: ["easy", "medium", "hard"],
          value: question.difficulty,
          onChange: (val) =>
            setFormData((prev) => {
              const nextQuestions = [...prev.questions]
              nextQuestions[qIndex].difficulty = val
              return { ...prev, questions: nextQuestions }
            }),
        },
        {
          name: `questions.${qIndex}.category`,
          label: "Category",
          type: "text",
          placeholder: "Category name",
          value: question.category,
          onChange: (val) =>
            setFormData((prev) => {
              const nextQuestions = [...prev.questions]
              nextQuestions[qIndex].category = val
              return { ...prev, questions: nextQuestions }
            }),
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
              onChange: (val) =>
                setFormData((prev) => {
                  const nextQuestions = [...prev.questions]
                  nextQuestions[qIndex].answers[aIndex].option_text = val
                  return { ...prev, questions: nextQuestions }
                }),
            },
            {
              name: `questions.${qIndex}.answers.${aIndex}.correct`,
              label: "Is Correct Choice?",
              type: "select",
              options: ["true", "false"],
              value: String(answer.correct),
              onChange: (val) =>
                setFormData((prev) => {
                  const nextQuestions = [...prev.questions]
                  nextQuestions[qIndex].answers[aIndex].correct = val === "true"
                  return { ...prev, questions: nextQuestions }
                }),
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
