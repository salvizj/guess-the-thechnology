import Select from "./Select"
import Input from "./Input"
import Button from "./Button"
import type { FieldConfig } from "../../types/types"

type FormProps = {
  fields: FieldConfig[]
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
  submitLabel?: string
  isLoading?: boolean
  error?: string | null
}

const Form = ({
  fields,
  onSubmit,
  submitLabel = "Submit",
  isLoading,
  error,
}: FormProps) => {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(e)
      }}
    >
      {fields.map((field) => {
        if (field.type === "select") {
          return (
            <Select
              key={field.name}
              label={field.label}
              placeholder={field.placeholder ?? ""}
              options={field.options ?? []}
              value={field.value}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                field.onChange(e.target.value)
              }
              error={field.error}
            />
          )
        }
        if (field.type === "file") {
          return (
            <Input
              key={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder ?? ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.onChange(e.target.files?.[0] ?? null)
              }
              error={field.error}
            />
          )
        } else
          return (
            <Input
              key={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder ?? ""}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              error={field.error}
            />
          )
      })}
      <Button type="submit">{submitLabel}</Button>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  )
}

export default Form
