import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import useAuthStore from '../../stores/authStore'
import toast from 'react-hot-toast'
import '../../styles/AuthModal.css'

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const login = useAuthStore(state => state.login)

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.email) {
      newErrors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const result = login(formData.email, formData.password)

    if (result.success) {
      toast.success(`¡Bienvenido ${result.user.name}!`)
      onClose()
      setFormData({ email: '', password: '' })
    } else {
      toast.error(result.error)
    }
  }

  const handleDemoLogin = (email, password) => {
    setFormData({ email, password })
    const result = login(email, password)
    if (result.success) {
      toast.success(`¡Bienvenido ${result.user.name}!`)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="auth-modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose}>
              <FaTimes />
            </button>

            <div className="auth-modal-header">
              <h2>Iniciar Sesión</h2>
              <p>Accede a tu cuenta de KHRONOS FITNESS</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">
                  <FaEnvelope /> Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <FaLock /> Contraseña
                </label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Tu contraseña"
                    className={errors.password ? 'error' : ''}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Iniciar Sesión
              </button>
            </form>

            <div className="auth-divider">
              <span>Cuentas de demo</span>
            </div>

            <div className="demo-accounts">
              <button
                className="demo-btn"
                onClick={() => handleDemoLogin('admin@khronos.com', 'admin123')}
              >
                Admin Demo
              </button>
              <button
                className="demo-btn"
                onClick={() => handleDemoLogin('usuario@test.com', 'user123')}
              >
                Usuario Demo
              </button>
            </div>

            <div className="auth-footer">
              <p>
                ¿No tienes cuenta?{' '}
                <button onClick={onSwitchToRegister} className="link-button">
                  Regístrate aquí
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoginModal
