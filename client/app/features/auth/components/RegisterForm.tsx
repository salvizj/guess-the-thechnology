import { useState } from "react"
import Form from "../../../components/base/Form"
import type { FieldConfig } from "../../../types/types"

type RegisterFormProps = {
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
  submitLabel?: string
  isOpen: boolean
  onClose: () => void
}

const RegisterForm = ({
  onSubmit,
  submitLabel = "Register",
}: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const registerFields: FieldConfig[] = [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Enter your username",
      value: formData.username,
      onChange: (value) => {
        setFormData({ ...formData, username: value })
      },
    },
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
      <h2>Register</h2>
      <Form
        fields={registerFields}
        onSubmit={onSubmit}
        submitLabel={submitLabel}
      />
    </div>
  )
}

export default RegisterForm
