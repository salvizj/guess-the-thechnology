import Form from "../../../components/base/Form"
import Modal from "../../../components/base/Modal"
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
  const registerFields: FieldConfig[] = [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Enter your username",
      value: "",
      onChange: () => {},
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      value: "",
      onChange: () => {},
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      value: "",
      onChange: () => {},
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
