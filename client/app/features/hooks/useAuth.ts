import { useState } from "react"
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyUsersJWT,
} from "../auth/api/auth"
import type { RegisterSchema } from "../../schemas/registerSchema"
import type { LoginSchema } from "../../schemas/loginSchema"

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (data: LoginSchema) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await loginUser(data)
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed"
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: RegisterSchema) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await registerUser(data)
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed"
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await logoutUser()
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : "Logout failed"
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const verifyJWT = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await verifyUsersJWT()
      return result
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "JWT verification failed"
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    login,
    register,
    isLoading,
    error,
    logout,
    verifyJWT,
  }
}
export default useAuth
