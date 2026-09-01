export const clearFieldError = (
  fieldName: string,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
) => {
  setErrors((prev) => {
    if (!prev[fieldName]) return prev
    const next = { ...prev }
    delete next[fieldName]
    return next
  })
}
