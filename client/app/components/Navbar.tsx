import { Link } from "react-router"
import { ThemeToggler } from "./ThemeToggler"
import { useAuthContext } from "../context/useAuthContext"
import Button from "./base/Button"

type NavbarProps = {
  themeToggle: () => void
}

export default function Navbar({ themeToggle }: NavbarProps) {
  const { isAuthenticated, logout } = useAuthContext()
  return (
    <header className="border-b border-border bg-surface-elevated px-4">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold text-content transition-colors hover:text-primary"
        >
          MyApp
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Button onClick={logout} variant="outline">
                Logout
              </Button>
              <ThemeToggler themeToggle={themeToggle} />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary">Register</Button>
              </Link>
              <ThemeToggler themeToggle={themeToggle} />
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
