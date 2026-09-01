import CreateQuizForm from "../../../features/admin/components/CreateQuizForm"
import type { QuizFormValues } from "../../../schemas/quizSchema"
import type { Route } from "./+types/create-quiz"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function CreateQuiz() {
  const onSubmit = () => {}
  return (
    <>
      <CreateQuizForm onSubmit={onSubmit} />
    </>
  )
}
