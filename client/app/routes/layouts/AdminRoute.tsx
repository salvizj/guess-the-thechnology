import { Navigate, Outlet } from "react-router"
import { useAuthContext } from "../../context/useAuthContext"

const AdminRoute = () => {
  const { isAuthenticated, isAdmin, isLoading } = useAuthContext()

  if (isLoading) {
    return <div className="loading-spinner">Loading authorization...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
export default AdminRoute
