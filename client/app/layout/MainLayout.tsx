import { Footer } from "../components/Footer"
import Navbar from "../components/Navbar"
import { useTheme } from "../hooks/useTheme"
import type { Theme } from "../types/types"

type LayoutProps = {
  children: React.ReactNode
  initialTheme: Theme
}

const MainLayout = ({ children, initialTheme }: LayoutProps) => {
  const user = undefined

  const handleLogout = () => {}
  const { themeToggle } = useTheme(initialTheme)
  return (
    <div className="flex min-h-screen flex-col bg-surface text-content">
      <Navbar themeToggle={themeToggle} />

      <main className="flex-1 flex min-h-screen">{children}</main>

      <Footer />
    </div>
  )
}
export default MainLayout
