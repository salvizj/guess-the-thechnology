import { type ReactNode } from "react"
import { Link } from "react-router"
import { useAuthContext } from "../context/useAuthContext"

type SidebarProps = {
  children?: ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  const { isAuthenticated } = useAuthContext()

  return (
    <aside>
      <nav>
        <Link to="/">Home</Link>
        {isAuthenticated && <Link to="/play">Play Quiz</Link>}
      </nav>

      {children && <nav>{children}</nav>}
    </aside>
  )
}
