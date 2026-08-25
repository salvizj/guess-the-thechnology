import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import useAuth from "../features/hooks/useAuth"
import type { RegisterSchema } from "../schemas/registerSchema"
import type { LoginSchema } from "../schemas/loginSchema"
import { loginUser } from "../features/auth/api/auth"

type AuthContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  logout: () => Promise<void>
  register: (data: RegisterSchema) => Promise<void>
  login: (data: LoginSchema) => Promise<void>
  verifyJWT: () => Promise<void>
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const {
    login: apiLogin,
    register,
    logout: apiLogout,
    verifyJWT,
    isLoading,
    error,
  } = useAuth()

  const checkAuth = async () => {
    try {
      const res = await verifyJWT()
      setIsAuthenticated(Boolean(res && res.isValid))
    } catch {
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const login = async (data: LoginSchema) => {
    try {
      const result = await apiLogin(data)
      localStorage.setItem("token", result.token)

      setIsAuthenticated(true)
    } catch (err) {
      setIsAuthenticated(false)
      throw err
    }
  }

  const logout = async () => {
    try {
      const result = await apiLogout()
      setIsAuthenticated(false)
    } catch (err) {
      throw err
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        error,
        isAuthenticated,
        setIsAuthenticated,
        logout,
        register,
        login,
        verifyJWT,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }

  return context
}
