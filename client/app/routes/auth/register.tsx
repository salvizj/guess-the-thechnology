import { useState } from "react"
import RegisterForm from "../../features/auth/components/RegisterForm"
import type { Route } from "./+types/register"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Register() {
  const [isOpen, setIsOpen] = useState(true)
  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <>
      <RegisterForm
        onSubmit={onSubmit}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
