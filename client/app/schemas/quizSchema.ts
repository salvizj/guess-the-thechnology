import { z } from "zod"

export const answerSchema = z.object({
  option_text: z.string().min(1, "Option text cannot be empty"),
  correct: z.preprocess((val) => val === "true" || val === true, z.boolean()),
})

export const questionSchema = z.object({
  title: z.string().min(3, "Question title must be at least 3 characters"),
  image_url: z.string().url("Must be a valid URL").or(z.literal("")),
  difficulty: z.enum(["easy", "medium", "hard"], {
    errorMap: () => ({ message: "Select a valid difficulty" }),
  }),
  category: z
    .string()
    .min(3, "Question category must be at least 3 characters"),
  answers: z
    .array(answerSchema)
    .min(2, "Each question requires at least 2 options")
    .refine((answers) => answers.some((a) => a.correct), {
      message: "At least one option must be marked as correct",
    }),
})

export const quizSchema = z.object({
  title: z.string().min(3, "Quiz title must be at least 3 characters"),
  questions: z
    .array(questionSchema)
    .min(1, "Quiz must contain at least 1 question"),
})

export type QuizFormValues = z.infer<typeof quizSchema>
