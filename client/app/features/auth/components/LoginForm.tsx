import { useState } from "react"
import Form from "../../../components/base/Form"
import Modal from "../../../components/base/Modal"
import type { FieldConfig } from "../../../types/types"

type LoginFormProps = {
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
  submitLabel?: string
}

const LoginForm = ({ onSubmit, submitLabel = "Login" }: LoginFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const loginFields: FieldConfig[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      value: formData.email,
      onChange: (value) => {
        setFormData({ ...formData, email: value })
      },
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      value: formData.password,
      onChange: (value) => {
        setFormData({ ...formData, password: value })
      },
    },
  ]
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4">
      <h2>Login</h2>
      <Form
        fields={loginFields}
        onSubmit={onSubmit}
        submitLabel={submitLabel}
      />
    </div>
  )
}

export default LoginForm
