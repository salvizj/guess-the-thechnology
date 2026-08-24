import { useState } from "react"
import LoginForm from "../../features/auth/components/LoginForm"
import type { Route } from "./+types/login"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Login() {
  const [isOpen, setIsOpen] = useState(true)
  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <>
      <LoginForm
        onSubmit={onSubmit}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
