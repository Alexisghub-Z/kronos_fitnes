import { useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaHome, FaUser, FaDumbbell } from 'react-icons/fa'
import confetti from 'canvas-confetti'
import useAuthStore from '../../stores/authStore'
import '../../styles/Checkout.css'

const CheckoutSuccess = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { isAuthenticated, user } = useAuthStore()

  const plan = searchParams.get('plan') || 'General'

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
      return
    }

    // Lanzar confetti
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      }))
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      }))
    }, 250)

    return () => clearInterval(interval)
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="checkout-success-page">
      <div className="container">
        <motion.div
          className="success-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="success-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <FaCheckCircle />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            ¡Pago Exitoso!
          </motion.h1>

          <motion.p
            className="success-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Tu membresía <strong>{plan}</strong> ha sido activada
          </motion.p>

          <motion.div
            className="success-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="detail-card">
              <h3>Detalles de tu Membresía</h3>
              <div className="detail-item">
                <span>Plan:</span>
                <strong>{plan}</strong>
              </div>
              <div className="detail-item">
                <span>Usuario:</span>
                <strong>{user?.name}</strong>
              </div>
              <div className="detail-item">
                <span>Email:</span>
                <strong>{user?.email}</strong>
              </div>
              <div className="detail-item">
                <span>Estado:</span>
                <span className="status-active">Activa</span>
              </div>
            </div>

            <div className="next-steps">
              <h3>Próximos Pasos</h3>
              <ul>
                <li>
                  <FaCheckCircle /> Tu membresía ya está activa
                </li>
                <li>
                  <FaCheckCircle /> Puedes reservar clases inmediatamente
                </li>
                <li>
                  <FaCheckCircle /> Revisa tu email para más detalles
                </li>
                <li>
                  <FaCheckCircle /> Descarga nuestra app móvil
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="success-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/mi-cuenta" className="btn btn-primary">
              <FaUser /> Ver Mi Cuenta
            </Link>
            <Link to="/horarios" className="btn btn-outline">
              <FaDumbbell /> Reservar Clase
            </Link>
            <Link to="/" className="btn btn-outline">
              <FaHome /> Volver al Inicio
            </Link>
          </motion.div>

          <motion.div
            className="success-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p>¿Necesitas ayuda? Contáctanos en <a href="mailto:soporte@khronos.com">soporte@khronos.com</a></p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default CheckoutSuccess
