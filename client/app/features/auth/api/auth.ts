import type { LoginSchema } from "../../../schemas/loginSchema"
import type { RegisterSchema } from "../../../schemas/registerSchema"

const BASE_PATH = "/api/auth"

const registerUser = async (data: RegisterSchema) => {
  const res = await fetch(`${BASE_PATH}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || "Registration failed")
  }

  return res.json()
}

const loginUser = async (data: LoginSchema) => {
  const res = await fetch(`${BASE_PATH}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || "Login failed")
  }

  return res.json()
}
const logoutUser = async () => {
  const res = await fetch(`${BASE_PATH}/logout`, {
    method: "POST",
    credentials: "include",
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || "Logout failed")
  }

  return res.json()
}

const verifyUsersJWT = async () => {
  const res = await fetch(`${BASE_PATH}/verify`, { credentials: "include" })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || "JWT verification failed")
  }

  return res.json()
}

export { registerUser, loginUser, logoutUser, verifyUsersJWT }
