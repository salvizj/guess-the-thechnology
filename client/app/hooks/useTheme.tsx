import { useEffect, useState } from "react"
import { getCookie, setCookie } from "../utils/cookie"

type Theme = "light" | "dark"

const toggleDocumentClass = (theme: Theme) => {
  if (theme === "dark") {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}
const getInitialTheme = (): Theme => {
  const storedTheme = getCookie("theme") as Theme | null
  if (storedTheme) {
    return storedTheme
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  return prefersDark ? "dark" : "light"
}

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme())

  useEffect(() => {
    toggleDocumentClass(theme)
    setCookie("theme", theme, 365)
  }, [theme])

  const themeToggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  return { theme, themeToggle }
}
