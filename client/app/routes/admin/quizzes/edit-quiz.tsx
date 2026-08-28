import type { Route } from "./+types/edit-quiz"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function EditQuiz() {
  return <>Edit Quiz</>
}
