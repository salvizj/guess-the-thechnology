type DateFormatStyle = "short" | "long"

export const timestampToDate = (
  timestamp: string,
  style: DateFormatStyle = "long",
): string => {
  const date = new Date(timestamp)

  if (style === "short") {
    return date.toLocaleDateString("en-LV", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return date.toLocaleDateString("en-LV", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}
