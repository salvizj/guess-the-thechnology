import type { FieldConfig } from "../../types/types"
import { RenderField } from "../RenderField"
import { Button } from "./Button"

type FormProps = {
  fields: FieldConfig[]
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
  submitLabel?: string
  isLoading?: boolean
  error?: string | null
}

export const Form = ({
  fields,
  onSubmit,
  submitLabel = "Submit",
  isLoading,
  error,
}: FormProps) => {
  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(e)
      }}
    >
      {fields.map((field) => (
        <RenderField key={field.name} field={field} />
      ))}
      <Button type="submit">{submitLabel}</Button>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-error">{error}</p>}
    </form>
  )
}
