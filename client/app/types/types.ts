export type Theme = "light" | "dark"

export type Variant =
  "primary" | "secondary" | "accent" | "outline" | "ghost" | "danger"

type BaseField = {
  name: string
  label: string
  placeholder?: string
  error?: string
}

export type PrimitiveFieldConfig = BaseField & {
  type:
    | "text"
    | "email"
    | "date"
    | "number"
    | "password"
    | "textarea"
    | "select"
    | "file"
  value: any
  options?: string[]
  onRemove?: () => void
  onChange: (value: any) => void
}

export type ArrayFieldConfig = BaseField & {
  type: "array"
  onRemove?: (index: number) => void
  onAdd: () => void

  fields: FieldConfig[][]
}

export type FieldConfig = PrimitiveFieldConfig | ArrayFieldConfig

export type Quiz = {
  quuizid?: number
  title: string
}

export type Quesiton = {
  question_id?: number
  title: string
  image_url: string
  difficulty: string
  category: string
}
export type Answer = {
  answer_id?: number
  title: string
  correct: boolean
}
