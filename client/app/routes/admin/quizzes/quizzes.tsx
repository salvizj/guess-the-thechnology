import type { Route } from "../+types/quizzes"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Quizzes() {
  return <>Quizzes</>
}
