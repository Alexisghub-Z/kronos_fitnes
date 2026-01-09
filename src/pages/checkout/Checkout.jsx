import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCreditCard, FaLock, FaCheckCircle, FaShieldAlt, FaRedoAlt } from 'react-icons/fa'
import toast from 'react-hot-toast'
import useAuthStore from '../../stores/authStore'
import usePaymentStore from '../../stores/paymentStore'
import '../../styles/Checkout.css'

const Checkout = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { isAuthenticated, user, activateMembership } = useAuthStore()
  const { addSavedCard, enableRecurringPayment } = usePaymentStore()

  const [isProcessing, setIsProcessing] = useState(false)
  const [saveCard, setSaveCard] = useState(false)
  const [enableAutoRenewal, setEnableAutoRenewal] = useState(false)
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })

  // Obtener plan y área de los parámetros de URL
  const plan = searchParams.get('plan') || 'General'
  const area = searchParams.get('area') || 'pesas'

  // Precios por plan
  const prices = {
    'Alumnos URSE': 200,
    'Estudiantes': 270,
    'General': 350,
    'Baile Reductivo': 450
  }

  const price = prices[plan] || 350

  useEffect(() => {
    // Redirigir si no está autenticado
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para continuar')
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value)
    if (formatted.replace(/\s/g, '').length <= 16) {
      setCardData({ ...cardData, cardNumber: formatted })
    }
  }

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value)
    if (formatted.replace('/', '').length <= 4) {
      setCardData({ ...cardData, expiryDate: formatted })
    }
  }

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/gi, '')
    if (value.length <= 4) {
      setCardData({ ...cardData, cvv: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validaciones básicas
    if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, '').length !== 16) {
      toast.error('Número de tarjeta inválido')
      return
    }
    if (!cardData.cardName) {
      toast.error('Nombre del titular es requerido')
      return
    }
    if (!cardData.expiryDate || cardData.expiryDate.length !== 5) {
      toast.error('Fecha de expiración inválida')
      return
    }
    if (!cardData.cvv || cardData.cvv.length < 3) {
      toast.error('CVV inválido')
      return
    }

    setIsProcessing(true)

    // Simular procesamiento de pago
    setTimeout(() => {
      // Guardar tarjeta si el usuario lo seleccionó
      let savedCardId = null
      if (saveCard) {
        const result = addSavedCard(user.id, cardData)
        if (result.success) {
          savedCardId = result.card.id
          toast.success('Tarjeta guardada para futuros pagos')
        }
      }

      // Activar cobro automático si el usuario lo seleccionó
      if (enableAutoRenewal && savedCardId) {
        const recurringResult = enableRecurringPayment(
          user.id,
          plan,
          price,
          savedCardId
        )
        if (recurringResult.success) {
          toast.success('Renovación automática activada')
        }
      }

      // Activar membresía en el store
      activateMembership(plan, area)

      toast.success('¡Pago procesado exitosamente!')

      // Redirigir a página de éxito
      navigate('/checkout/success?plan=' + encodeURIComponent(plan) + '&autoRenewal=' + enableAutoRenewal)
    }, 2000)
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <motion.div
          className="checkout-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Finalizar Compra</h1>
          <p>Estás a un paso de comenzar tu transformación</p>
        </motion.div>

        <div className="checkout-grid">
          {/* Formulario de pago */}
          <motion.div
            className="checkout-form-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="checkout-card">
              <div className="card-header">
                <h2>
                  <FaCreditCard /> Información de Pago
                </h2>
                <div className="security-badge">
                  <FaLock /> Pago Seguro
                </div>
              </div>

              <form onSubmit={handleSubmit} className="payment-form">
                <div className="form-group">
                  <label>Número de Tarjeta</label>
                  <div className="card-input-wrapper">
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.cardNumber}
                      onChange={handleCardNumberChange}
                      className="card-input"
                      disabled={isProcessing}
                    />
                    <div className="card-icons">
                      <img src="https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg" alt="Visa" />
                      <img src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg" alt="Mastercard" />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Nombre del Titular</label>
                  <input
                    type="text"
                    placeholder="JUAN PEREZ"
                    value={cardData.cardName}
                    onChange={(e) => setCardData({ ...cardData, cardName: e.target.value.toUpperCase() })}
                    disabled={isProcessing}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Fecha de Expiración</label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      value={cardData.expiryDate}
                      onChange={handleExpiryChange}
                      disabled={isProcessing}
                    />
                  </div>

                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={handleCvvChange}
                      disabled={isProcessing}
                    />
                  </div>
                </div>

                {/* Opciones de guardado */}
                <div className="payment-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={(e) => {
                        setSaveCard(e.target.checked)
                        if (!e.target.checked) {
                          setEnableAutoRenewal(false)
                        }
                      }}
                      disabled={isProcessing}
                    />
                    <span className="checkbox-text">
                      <FaCreditCard /> Guardar tarjeta para futuros pagos
                    </span>
                  </label>

                  {saveCard && (
                    <motion.label
                      className="checkbox-label indent"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <input
                        type="checkbox"
                        checked={enableAutoRenewal}
                        onChange={(e) => setEnableAutoRenewal(e.target.checked)}
                        disabled={isProcessing}
                      />
                      <span className="checkbox-text">
                        <FaRedoAlt /> Activar renovación automática mensual
                        <small className="checkbox-subtitle">
                          Tu membresía se renovará automáticamente cada mes sin interrupciones
                        </small>
                      </span>
                    </motion.label>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-pay"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="spinner"></div>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <FaLock /> Pagar ${price} MXN
                    </>
                  )}
                </button>

                <div className="payment-security">
                  <FaShieldAlt />
                  <p>Tus datos están protegidos con encriptación SSL de 256 bits</p>
                </div>
              </form>
            </div>

            {/* Tarjeta de prueba */}
            <div className="test-card-info">
              <h4>Tarjeta de Prueba</h4>
              <p>Número: 4242 4242 4242 4242</p>
              <p>Fecha: Cualquier fecha futura (ej: 12/28)</p>
              <p>CVV: Cualquier 3 dígitos (ej: 123)</p>
            </div>
          </motion.div>

          {/* Resumen de compra */}
          <motion.div
            className="checkout-summary-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="checkout-card summary-card">
              <h2>Resumen de Compra</h2>

              <div className="summary-item">
                <span className="label">Plan seleccionado</span>
                <span className="value">{plan}</span>
              </div>

              <div className="summary-item">
                <span className="label">Área</span>
                <span className="value area-badge">{area}</span>
              </div>

              <div className="summary-item">
                <span className="label">Periodo</span>
                <span className="value">Mensual</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-item subtotal">
                <span className="label">Subtotal</span>
                <span className="value">${price}</span>
              </div>

              <div className="summary-item">
                <span className="label">IVA (16%)</span>
                <span className="value">${Math.round(price * 0.16)}</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-item total">
                <span className="label">Total a Pagar</span>
                <span className="value">${Math.round(price * 1.16)} MXN</span>
              </div>

              <div className="benefits-list">
                <h3>
                  <FaCheckCircle /> Incluye:
                </h3>
                <ul>
                  <li>Acceso ilimitado a tu área</li>
                  <li>Vestuarios y duchas</li>
                  <li>WiFi gratis</li>
                  <li>Asesoría de entrenadores</li>
                  <li>Reservación de clases</li>
                  <li>App móvil</li>
                </ul>
              </div>

              <div className="guarantee">
                <FaShieldAlt />
                <div>
                  <h4>Garantía de 7 días</h4>
                  <p>Si no estás satisfecho, te devolvemos tu dinero</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
