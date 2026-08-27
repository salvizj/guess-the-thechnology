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
import { useNavigate } from "react-router"

type AuthContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  handleLogin: (data: LoginSchema) => Promise<void>
  handleRegister: (data: RegisterSchema) => Promise<void>
  handleLogout: () => Promise<void>
  handleVerifyJWT: () => Promise<void>
  isAdmin: boolean
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const {
    error,
    isLoading,
    executeLogin,
    executeRegister,
    executeLogout,
    executeVerifyJWT,
  } = useAuth()
  console.log(
    "AuthProvider: isAuthenticated =",
    isAuthenticated,
    "isAdmin =",
    isAdmin,
  )
  const handleVerifyJWT = async () => {
    try {
      const res = await executeVerifyJWT()
      setIsAuthenticated(Boolean(res && res.isValid))
      setIsAdmin(Boolean(res && (res.isAdmin === 1 || res.isAdmin === true)))
    } catch {
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    handleVerifyJWT()
  }, [])

  const handleLogin = async (data: LoginSchema) => {
    try {
      const res = await executeLogin(data)
      console.log("Login response:", res)
      setIsAuthenticated(true)
      setIsAdmin(Boolean(res && (res.isAdmin === 1 || res.isAdmin === true)))
      navigate("/", { replace: true })
    } catch (err) {
      setIsAuthenticated(false)
      throw err
    }
  }

  const handleLogout = async () => {
    try {
      await executeLogout()
      navigate("/login", { replace: true })
      setIsAuthenticated(false)
    } catch (err) {
      throw err
    }
  }

  const handleRegister = async (data: RegisterSchema) => {
    try {
      await executeRegister(data)
      navigate("/login")
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
        handleLogout,
        handleLogin,
        handleRegister,
        handleVerifyJWT,
        isAdmin,
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
