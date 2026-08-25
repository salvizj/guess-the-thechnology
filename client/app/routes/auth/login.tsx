import LoginForm from "../../features/auth/components/LoginForm"
import type { Route } from "./+types/login"
import type { LoginSchema } from "../../schemas/loginSchema"
import { useAuthContext } from "../../context/useAuthContext"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Login() {
  const { login, isLoading, error } = useAuthContext()
  const onSubmit = (formData: LoginSchema) => {
    login(formData)
  }

  return (
    <>
      <LoginForm onSubmit={onSubmit} isLoading={isLoading} error={error} />
    </>
  )
}
