import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUser, FaEnvelope, FaPhone, FaDumbbell, FaCalendarAlt, FaCreditCard, FaCheckCircle, FaTimes, FaClock, FaTrash, FaStar, FaRedoAlt, FaShieldAlt } from 'react-icons/fa'
import toast from 'react-hot-toast'
import useAuthStore from '../../stores/authStore'
import useBookingStore from '../../stores/bookingStore'
import usePaymentStore from '../../stores/paymentStore'
import { mockPayments } from '../../data/mockData'
import '../../styles/Dashboard.css'

const Dashboard = () => {
  const { user } = useAuthStore()
  const getUserBookings = useBookingStore(state => state.getUserBookings)
  const cancelBooking = useBookingStore(state => state.cancelBooking)
  const {
    getUserCards,
    removeCard,
    setDefaultCard,
    getUserRecurringPayment,
    disableRecurringPayment
  } = usePaymentStore()

  const [activeTab, setActiveTab] = useState('reservations')
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [bookingToCancel, setBookingToCancel] = useState(null)

  // Obtener reservaciones del usuario
  const userBookings = getUserBookings(user?.id)
  const upcomingBookings = userBookings.filter(b => b.status === 'confirmed')
  const pastBookings = userBookings.filter(b => b.status === 'completed')
  const cancelledBookings = userBookings.filter(b => b.status === 'cancelled')

  // Obtener pagos del usuario
  const userPayments = mockPayments.filter(p => p.userId === user?.id)

  // Obtener tarjetas guardadas
  const savedCards = getUserCards(user?.id)

  // Obtener configuración de cobro automático
  const recurringPayment = getUserRecurringPayment(user?.id)

  const handleCancelClick = (booking) => {
    setBookingToCancel(booking)
    setShowCancelModal(true)
  }

  const handleCancelConfirm = () => {
    const result = cancelBooking(bookingToCancel.id, user?.id)
    if (result.success) {
      toast.success('Reservación cancelada exitosamente')
    } else {
      toast.error(result.error)
    }
    setShowCancelModal(false)
    setBookingToCancel(null)
  }

  const handleRemoveCard = (cardId) => {
    if (window.confirm('¿Estás seguro de eliminar esta tarjeta?')) {
      const result = removeCard(cardId)
      if (result.success) {
        toast.success('Tarjeta eliminada')
      }
    }
  }

  const handleSetDefaultCard = (cardId) => {
    const result = setDefaultCard(user?.id, cardId)
    if (result.success) {
      toast.success('Tarjeta establecida como predeterminada')
    }
  }

  const handleDisableAutoRenewal = () => {
    if (window.confirm('¿Deseas desactivar la renovación automática? Tu membresía no se renovará al finalizar el período actual.')) {
      const result = disableRecurringPayment(user?.id)
      if (result.success) {
        toast.success('Renovación automática desactivada')
      }
    }
  }

  const getCardBrandIcon = (brand) => {
    const icons = {
      visa: '💳',
      mastercard: '💳',
      amex: '💳',
      discover: '💳'
    }
    return icons[brand] || '💳'
  }

  const getStatusBadge = (status) => {
    const badges = {
      confirmed: { text: 'Confirmada', className: 'badge-confirmed', icon: <FaCheckCircle /> },
      completed: { text: 'Completada', className: 'badge-completed', icon: <FaCheckCircle /> },
      cancelled: { text: 'Cancelada', className: 'badge-cancelled', icon: <FaTimes /> }
    }
    return badges[status] || badges.confirmed
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const canCancelBooking = (booking) => {
    const bookingDateTime = new Date(`${booking.date}T${booking.time}`)
    const now = new Date()
    const hoursUntilClass = (bookingDateTime - now) / (1000 * 60 * 60)
    return hoursUntilClass >= 2
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <motion.div
          className="dashboard-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Mi Cuenta</h1>
          <p>Bienvenido de nuevo, {user?.name}</p>
        </motion.div>

        <div className="dashboard-grid">
          {/* Perfil y Membresía */}
          <motion.div
            className="dashboard-card profile-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2>
              <FaUser /> Mi Perfil
            </h2>
            <div className="profile-info">
              <div className="profile-item">
                <FaUser className="profile-icon" />
                <div>
                  <label>Nombre</label>
                  <p>{user?.name}</p>
                </div>
              </div>
              <div className="profile-item">
                <FaEnvelope className="profile-icon" />
                <div>
                  <label>Email</label>
                  <p>{user?.email}</p>
                </div>
              </div>
              <div className="profile-item">
                <FaPhone className="profile-icon" />
                <div>
                  <label>Teléfono</label>
                  <p>{user?.phone}</p>
                </div>
              </div>
            </div>

            {user?.membershipActive ? (
              <div className="membership-status active">
                <FaDumbbell />
                <div>
                  <h3>Membresía Activa</h3>
                  <p className="membership-plan">
                    {user?.membershipPlan} - {user?.membershipArea}
                  </p>
                  <p className="membership-expires">Válida hasta: 15 Feb 2026</p>
                </div>
              </div>
            ) : (
              <div className="membership-status inactive">
                <FaTimes />
                <div>
                  <h3>Sin Membresía</h3>
                  <p>Adquiere una membresía para reservar clases</p>
                  <button className="btn btn-primary btn-sm">Ver Planes</button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Estadísticas rápidas */}
          <motion.div
            className="dashboard-stats"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="stat-card">
              <div className="stat-icon">
                <FaCalendarAlt />
              </div>
              <div className="stat-info">
                <h3>{upcomingBookings.length}</h3>
                <p>Clases Próximas</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <FaCheckCircle />
              </div>
              <div className="stat-info">
                <h3>{pastBookings.length}</h3>
                <p>Clases Completadas</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <FaCreditCard />
              </div>
              <div className="stat-info">
                <h3>${userPayments.reduce((sum, p) => sum + p.amount, 0)}</h3>
                <p>Total Pagado</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs de contenido */}
        <motion.div
          className="dashboard-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="tabs-header">
            <button
              className={`tab ${activeTab === 'reservations' ? 'active' : ''}`}
              onClick={() => setActiveTab('reservations')}
            >
              <FaCalendarAlt /> Mis Reservaciones
            </button>
            <button
              className={`tab ${activeTab === 'cards' ? 'active' : ''}`}
              onClick={() => setActiveTab('cards')}
            >
              <FaCreditCard /> Métodos de Pago
            </button>
            <button
              className={`tab ${activeTab === 'payments' ? 'active' : ''}`}
              onClick={() => setActiveTab('payments')}
            >
              <FaClock /> Historial de Pagos
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === 'reservations' && (
              <div className="reservations-content">
                {upcomingBookings.length > 0 ? (
                  <>
                    <h3>Próximas Clases</h3>
                    <div className="bookings-list">
                      {upcomingBookings.map((booking) => {
                        const badge = getStatusBadge(booking.status)
                        return (
                          <motion.div
                            key={booking.id}
                            className="booking-card"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <div className="booking-header">
                              <h4>{booking.className}</h4>
                              <span className={`status-badge ${badge.className}`}>
                                {badge.icon} {badge.text}
                              </span>
                            </div>
                            <div className="booking-details">
                              <p>
                                <FaUser /> Instructor: {booking.instructor}
                              </p>
                              <p>
                                <FaCalendarAlt /> {formatDate(booking.date)}
                              </p>
                              <p>
                                <FaClock /> {booking.time} ({booking.duration} min)
                              </p>
                            </div>
                            {canCancelBooking(booking) ? (
                              <button
                                className="btn btn-outline btn-sm btn-cancel"
                                onClick={() => handleCancelClick(booking)}
                              >
                                Cancelar Reservación
                              </button>
                            ) : (
                              <p className="cancel-notice">
                                No se puede cancelar (menos de 2 horas)
                              </p>
                            )}
                          </motion.div>
                        )
                      })}
                    </div>
                  </>
                ) : (
                  <div className="empty-state">
                    <FaCalendarAlt />
                    <h3>No tienes clases reservadas</h3>
                    <p>Explora nuestro horario y reserva tu próxima clase</p>
                    <button className="btn btn-primary">Ver Horarios</button>
                  </div>
                )}

                {pastBookings.length > 0 && (
                  <>
                    <h3 className="section-title">Historial de Clases</h3>
                    <div className="bookings-list past-bookings">
                      {pastBookings.map((booking) => {
                        const badge = getStatusBadge(booking.status)
                        return (
                          <div key={booking.id} className="booking-card past">
                            <div className="booking-header">
                              <h4>{booking.className}</h4>
                              <span className={`status-badge ${badge.className}`}>
                                {badge.icon} {badge.text}
                              </span>
                            </div>
                            <div className="booking-details">
                              <p>
                                <FaUser /> {booking.instructor}
                              </p>
                              <p>
                                <FaCalendarAlt /> {formatDate(booking.date)}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'cards' && (
              <div className="cards-content">
                {/* Cobro Automático */}
                {recurringPayment && (
                  <div className="recurring-payment-card">
                    <div className="recurring-header">
                      <div>
                        <h3><FaRedoAlt /> Renovación Automática Activa</h3>
                        <p>Tu membresía se renovará automáticamente</p>
                      </div>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={handleDisableAutoRenewal}
                      >
                        Desactivar
                      </button>
                    </div>
                    <div className="recurring-details">
                      <div className="recurring-item">
                        <span className="label">Membresía:</span>
                        <span className="value">{recurringPayment.membershipType}</span>
                      </div>
                      <div className="recurring-item">
                        <span className="label">Monto mensual:</span>
                        <span className="value">${recurringPayment.amount}</span>
                      </div>
                      <div className="recurring-item">
                        <span className="label">Próximo cobro:</span>
                        <span className="value">
                          {new Date(recurringPayment.nextChargeDate).toLocaleDateString('es-MX', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tarjetas Guardadas */}
                <h3>Tarjetas Guardadas</h3>
                {savedCards.length > 0 ? (
                  <div className="saved-cards-list">
                    {savedCards.map((card) => (
                      <motion.div
                        key={card.id}
                        className="saved-card"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="card-visual">
                          <div className="card-brand">
                            {getCardBrandIcon(card.brand)}
                            <span className="brand-name">{card.brand.toUpperCase()}</span>
                          </div>
                          <div className="card-number">•••• •••• •••• {card.last4}</div>
                          <div className="card-holder">
                            <div>
                              <small>Titular</small>
                              <p>{card.holderName}</p>
                            </div>
                            <div>
                              <small>Expira</small>
                              <p>{card.expiryMonth}/{card.expiryYear}</p>
                            </div>
                          </div>
                          {card.isDefault && (
                            <div className="default-badge">
                              <FaStar /> Predeterminada
                            </div>
                          )}
                        </div>
                        <div className="card-actions">
                          {!card.isDefault && (
                            <button
                              className="btn btn-outline btn-sm"
                              onClick={() => handleSetDefaultCard(card.id)}
                            >
                              Establecer como predeterminada
                            </button>
                          )}
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRemoveCard(card.id)}
                          >
                            <FaTrash /> Eliminar
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <FaCreditCard />
                    <h3>No tienes tarjetas guardadas</h3>
                    <p>Al realizar un pago, podrás guardar tu tarjeta para futuros pagos</p>
                  </div>
                )}

                <div className="payment-security-notice">
                  <FaShieldAlt />
                  <div>
                    <h4>Tus datos están seguros</h4>
                    <p>No almacenamos información completa de tarjetas. Todos los pagos son procesados de forma segura mediante encriptación SSL.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="payments-content">
                {userPayments.length > 0 ? (
                  <div className="payments-list">
                    {userPayments.map((payment) => (
                      <motion.div
                        key={payment.id}
                        className="payment-card"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="payment-icon">
                          <FaCreditCard />
                        </div>
                        <div className="payment-info">
                          <h4>{payment.plan} - {payment.area}</h4>
                          <p className="payment-date">
                            {new Date(payment.date).toLocaleDateString('es-MX', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          <p className="payment-method">
                            {payment.method === 'card' ? 'Tarjeta' : 'Efectivo'} ****{payment.last4}
                          </p>
                        </div>
                        <div className="payment-amount">
                          <span className="amount">${payment.amount}</span>
                          <span className="status paid">Pagado</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <FaCreditCard />
                    <h3>Sin historial de pagos</h3>
                    <p>Tus pagos aparecerán aquí</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Modal de confirmación de cancelación */}
      {showCancelModal && (
        <div className="modal-overlay" onClick={() => setShowCancelModal(false)}>
          <motion.div
            className="cancel-modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>¿Cancelar Reservación?</h3>
            <p>
              Estás a punto de cancelar tu clase de <strong>{bookingToCancel?.className}</strong>
            </p>
            <p className="warning">Esta acción no se puede deshacer.</p>
            <div className="modal-actions">
              <button
                className="btn btn-outline"
                onClick={() => setShowCancelModal(false)}
              >
                No, Mantener
              </button>
              <button
                className="btn btn-danger"
                onClick={handleCancelConfirm}
              >
                Sí, Cancelar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
