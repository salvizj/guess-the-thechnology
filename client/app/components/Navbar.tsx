import { Link } from "react-router"
import { ThemeToggler } from "./ThemeToggler"
import type { Theme } from "../types/types"

type NavbarProps = {
  user: { email: string } | undefined
  onLogout: () => void
  themeToggle: () => void
}

export default function Navbar({ user, onLogout, themeToggle }: NavbarProps) {
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
          <Link
            to="/"
            className="text-sm font-medium text-content-secondary transition-colors hover:text-content"
          >
            Home
          </Link>

          {user ? (
            <div className="flex items-center gap-4 pl-2">
              <span className="text-sm text-content-muted">{user.email}</span>
              <button
                onClick={onLogout}
                className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium text-content transition-all hover:bg-surface-secondary"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-medium text-content-secondary transition-colors hover:text-content"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-all hover:bg-primary-light active:scale-95"
              >
                Register
              </Link>

              <ThemeToggler themeToggle={themeToggle} />
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
