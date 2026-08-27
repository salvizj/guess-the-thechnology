import { useState } from "react"
import {
  fetchLogin,
  fetchRegister,
  fetchLogout,
  fetchVerifyJWT,
} from "../features/auth/api/auth"
import type { RegisterSchema } from "../schemas/registerSchema"
import type { LoginSchema } from "../schemas/loginSchema"

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const executeLogin = async (data: LoginSchema) => {
    setIsLoading(true)
    try {
      const res = await fetchLogin(data)
      return res
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed"
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const executeRegister = async (data: RegisterSchema) => {
    setIsLoading(true)
    try {
      const res = await fetchRegister(data)
      return res
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed"
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const executeLogout = async () => {
    setIsLoading(true)
    try {
      const res = await fetchLogout()
      return res
    } catch (err) {
      const message = err instanceof Error ? err.message : "Logout failed"
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const executeVerifyJWT = async () => {
    setIsLoading(true)
    try {
      const res = await fetchVerifyJWT()
      return res
    } catch (err) {
      return { isValid: false, isAdmin: false }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    executeLogin,
    executeRegister,
    executeLogout,
    executeVerifyJWT,
  }
}
export default useAuth
