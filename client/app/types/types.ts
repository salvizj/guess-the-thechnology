export type Theme = "light" | "dark"

export type Variant =
  "primary" | "secondary" | "accent" | "outline" | "ghost" | "danger"

type BaseField = {
  name: string
  label: string
  placeholder?: string
  error?: string
}

type TextFieldConfig = BaseField & {
  type: "text" | "email" | "date" | "number" | "password" | "textarea"
  value: string
  onChange: (value: string) => void
}

type SelectFieldConfig = BaseField & {
  type: "select"
  options: string[]
  value: string
  onChange: (value: string) => void
}

type FileFieldConfig = BaseField & {
  type: "file"
  onChange: (file: File | null) => void
}

export type FieldConfig = TextFieldConfig | SelectFieldConfig | FileFieldConfig
