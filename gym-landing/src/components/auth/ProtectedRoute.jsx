import { Navigate } from 'react-router-dom'
import useAuthStore from '../../stores/authStore'
import toast from 'react-hot-toast'

const ProtectedRoute = ({ children, requireMembership = false, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuthStore()

  // Check if user is authenticated
  if (!isAuthenticated) {
    toast.error('Debes iniciar sesión para acceder a esta página')
    return <Navigate to="/" replace />
  }

  // Check if admin access is required
  if (adminOnly && user?.role !== 'admin') {
    toast.error('No tienes permisos para acceder a esta página')
    return <Navigate to="/" replace />
  }

  // Check if membership is required
  if (requireMembership && !user?.membershipActive) {
    toast.error('Necesitas una membresía activa para acceder')
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
