import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCalendarAlt, FaUser, FaClock, FaDumbbell, FaTimes, FaCheckCircle, FaExclamationCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import toast from 'react-hot-toast'
import useAuthStore from '../../stores/authStore'
import useBookingStore from '../../stores/bookingStore'
import '../../styles/Booking.css'

const Booking = () => {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuthStore()
  const { createBooking, hasExistingBooking, getDailyBookingCount } = useBookingStore()

  const [selectedDayIndex, setSelectedDayIndex] = useState(0)
  const [selectedClass, setSelectedClass] = useState(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [filters, setFilters] = useState({
    area: 'todas',
    level: 'todos'
  })

  // Horario completo (mismo del Schedule.jsx)
  const weekSchedule = [
    {
      day: 'Lunes',
      date: '2026-01-12',
      classes: [
        {
          id: 101,
          time: '06:00',
          name: 'Cardio Matutino',
          instructor: 'Carlos Méndez',
          area: 'Cardio',
          level: 'Todos',
          duration: 45,
          spots: 8,
          totalSpots: 15
        },
        {
          id: 102,
          time: '07:00',
          name: 'Pesas Funcional',
          instructor: 'Ana Rodríguez',
          area: 'Pesas',
          level: 'Intermedio',
          duration: 60,
          spots: 5,
          totalSpots: 12
        },
        {
          id: 103,
          time: '09:00',
          name: 'Zumba',
          instructor: 'María González',
          area: 'Baile',
          level: 'Todos',
          duration: 50,
          spots: 12,
          totalSpots: 20
        },
        {
          id: 104,
          time: '18:00',
          name: 'Cycling Power',
          instructor: 'Roberto Silva',
          area: 'Cycling',
          level: 'Avanzado',
          duration: 45,
          spots: 3,
          totalSpots: 15
        }
      ]
    },
    {
      day: 'Martes',
      date: '2026-01-13',
      classes: [
        {
          id: 201,
          time: '06:30',
          name: 'HIIT',
          instructor: 'Carlos Méndez',
          area: 'Cardio',
          level: 'Avanzado',
          duration: 30,
          spots: 6,
          totalSpots: 12
        },
        {
          id: 202,
          time: '10:00',
          name: 'Dance Cardio',
          instructor: 'María González',
          area: 'Baile',
          level: 'Intermedio',
          duration: 45,
          spots: 15,
          totalSpots: 20
        },
        {
          id: 203,
          time: '19:00',
          name: 'CrossFit',
          instructor: 'Ana Rodríguez',
          area: 'Pesas',
          level: 'Todos',
          duration: 60,
          spots: 4,
          totalSpots: 10
        }
      ]
    },
    {
      day: 'Miércoles',
      date: '2026-01-14',
      classes: [
        {
          id: 301,
          time: '07:00',
          name: 'Spinning',
          instructor: 'Roberto Silva',
          area: 'Cycling',
          level: 'Intermedio',
          duration: 45,
          spots: 8,
          totalSpots: 15
        },
        {
          id: 302,
          time: '18:30',
          name: 'Yoga Flow',
          instructor: 'Laura Martínez',
          area: 'Clases',
          level: 'Todos',
          duration: 60,
          spots: 10,
          totalSpots: 15
        }
      ]
    },
    {
      day: 'Jueves',
      date: '2026-01-15',
      classes: [
        {
          id: 401,
          time: '06:00',
          name: 'Boot Camp',
          instructor: 'Carlos Méndez',
          area: 'Cardio',
          level: 'Avanzado',
          duration: 45,
          spots: 5,
          totalSpots: 12
        },
        {
          id: 402,
          time: '09:30',
          name: 'Zumba Fitness',
          instructor: 'María González',
          area: 'Baile',
          level: 'Todos',
          duration: 50,
          spots: 14,
          totalSpots: 20
        }
      ]
    },
    {
      day: 'Viernes',
      date: '2026-01-16',
      classes: [
        {
          id: 501,
          time: '07:00',
          name: 'Functional Training',
          instructor: 'Ana Rodríguez',
          area: 'Pesas',
          level: 'Intermedio',
          duration: 60,
          spots: 7,
          totalSpots: 12
        },
        {
          id: 502,
          time: '19:00',
          name: 'Cycling Night',
          instructor: 'Roberto Silva',
          area: 'Cycling',
          level: 'Todos',
          duration: 45,
          spots: 9,
          totalSpots: 15
        }
      ]
    }
  ]

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para reservar clases')
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const getCurrentDaySchedule = () => {
    return weekSchedule[selectedDayIndex]
  }

  const getFilteredClasses = () => {
    const daySchedule = getCurrentDaySchedule()
    if (!daySchedule) return []

    return daySchedule.classes.filter(cls => {
      if (filters.area !== 'todas' && cls.area !== filters.area) return false
      if (filters.level !== 'todos' && cls.level !== filters.level) return false
      return true
    })
  }

  const goToPreviousDay = () => {
    if (selectedDayIndex > 0) {
      setSelectedDayIndex(selectedDayIndex - 1)
    }
  }

  const goToNextDay = () => {
    if (selectedDayIndex < weekSchedule.length - 1) {
      setSelectedDayIndex(selectedDayIndex + 1)
    }
  }

  const handleReserveClick = (cls) => {
    // Validar membresía activa
    if (!user?.membershipActive) {
      toast.error('Necesitas una membresía activa para reservar clases')
      setTimeout(() => navigate('/'), 2000)
      return
    }

    // Validar cupo disponible
    if (cls.spots <= 0) {
      toast.error('Esta clase está llena')
      return
    }

    setSelectedClass(cls)
    setShowConfirmModal(true)
  }

  const handleConfirmBooking = () => {
    const daySchedule = getCurrentDaySchedule()

    // Validar reservación duplicada
    if (hasExistingBooking(user.id, selectedClass.name, daySchedule.date, selectedClass.time)) {
      toast.error('Ya tienes una reservación para esta clase')
      setShowConfirmModal(false)
      return
    }

    // Validar límite diario
    const dailyCount = getDailyBookingCount(user.id, daySchedule.date)
    if (dailyCount >= 3) {
      toast.error('Has alcanzado el límite de 3 clases por día')
      setShowConfirmModal(false)
      return
    }

    // Crear reservación
    const bookingData = {
      userId: user.id,
      className: selectedClass.name,
      instructor: selectedClass.instructor,
      area: selectedClass.area,
      date: daySchedule.date,
      time: selectedClass.time,
      duration: selectedClass.duration
    }

    const result = createBooking(bookingData)

    if (result.success) {
      toast.success('¡Clase reservada exitosamente!')
      setShowConfirmModal(false)
      setSelectedClass(null)

      // Actualizar spots disponibles (simulado)
      selectedClass.spots -= 1
    }
  }

  const getAreaIcon = (area) => {
    const icons = {
      'Cardio': '❤️',
      'Pesas': '🏋️',
      'Cycling': '🚴',
      'Baile': '💃',
      'Clases': '🧘'
    }
    return icons[area] || '💪'
  }

  const getLevelColor = (level) => {
    const colors = {
      'Todos': 'level-all',
      'Intermedio': 'level-intermediate',
      'Avanzado': 'level-advanced'
    }
    return colors[level] || 'level-all'
  }

  if (!isAuthenticated) {
    return null
  }

  const filteredClasses = getFilteredClasses()
  const currentDay = getCurrentDaySchedule()

  return (
    <div className="booking-page">
      <div className="container">
        <motion.div
          className="booking-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Reservar Clase</h1>
          <p>Selecciona una clase y asegura tu lugar</p>
        </motion.div>

        {/* Navegador de días */}
        <motion.div
          className="day-navigator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <button
            className="nav-btn"
            onClick={goToPreviousDay}
            disabled={selectedDayIndex === 0}
          >
            <FaChevronLeft />
          </button>

          <div className="current-day-info">
            <h2>{currentDay.day}</h2>
            <p>{currentDay.classes.length} clases disponibles</p>
            <span className="day-indicator">{selectedDayIndex + 1} / {weekSchedule.length}</span>
          </div>

          <button
            className="nav-btn"
            onClick={goToNextDay}
            disabled={selectedDayIndex === weekSchedule.length - 1}
          >
            <FaChevronRight />
          </button>
        </motion.div>

        {/* Filtros */}
        <motion.div
          className="booking-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="filter-group">
            <label>Área</label>
            <select
              value={filters.area}
              onChange={(e) => setFilters({ ...filters, area: e.target.value })}
            >
              <option value="todas">Todas las Áreas</option>
              <option value="Cardio">Cardio</option>
              <option value="Pesas">Pesas</option>
              <option value="Cycling">Cycling</option>
              <option value="Baile">Baile</option>
              <option value="Clases">Otras Clases</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Nivel</label>
            <select
              value={filters.level}
              onChange={(e) => setFilters({ ...filters, level: e.target.value })}
            >
              <option value="todos">Todos los Niveles</option>
              <option value="Todos">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
          </div>
        </motion.div>

        {/* Lista de clases */}
        <motion.div
          className="classes-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filteredClasses.length > 0 ? (
            filteredClasses.map((cls, index) => (
              <motion.div
                key={cls.id}
                className="class-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="class-icon">
                  {getAreaIcon(cls.area)}
                </div>

                <div className="class-info">
                  <div className="class-main">
                    <h3>{cls.name}</h3>
                    <span className={`level-badge ${getLevelColor(cls.level)}`}>
                      {cls.level}
                    </span>
                  </div>

                  <div className="class-details">
                    <span>
                      <FaUser /> {cls.instructor}
                    </span>
                    <span>
                      <FaClock /> {cls.time} ({cls.duration} min)
                    </span>
                    <span>
                      <FaDumbbell /> {cls.area}
                    </span>
                  </div>

                  <div className="class-availability">
                    <div className="spots-indicator">
                      <div
                        className="spots-bar"
                        style={{ width: `${(cls.spots / cls.totalSpots) * 100}%` }}
                      />
                    </div>
                    <span className="spots-text">
                      {cls.spots} de {cls.totalSpots} lugares disponibles
                    </span>
                  </div>
                </div>

                <button
                  className={`btn ${cls.spots > 0 ? 'btn-primary' : 'btn-disabled'}`}
                  onClick={() => handleReserveClick(cls)}
                  disabled={cls.spots <= 0}
                >
                  {cls.spots > 0 ? 'Reservar' : 'Lleno'}
                </button>
              </motion.div>
            ))
          ) : (
            <div className="empty-state">
              <FaExclamationCircle />
              <h3>No hay clases disponibles</h3>
              <p>Intenta con otros filtros</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Modal de confirmación */}
      <AnimatePresence>
        {showConfirmModal && selectedClass && (
          <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
            <motion.div
              className="booking-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setShowConfirmModal(false)}
              >
                <FaTimes />
              </button>

              <div className="modal-icon success">
                <FaCalendarAlt />
              </div>

              <h2>Confirmar Reservación</h2>

              <div className="modal-details">
                <div className="detail-row">
                  <span className="label">Clase:</span>
                  <span className="value">{selectedClass.name}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Instructor:</span>
                  <span className="value">{selectedClass.instructor}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Día:</span>
                  <span className="value">{currentDay.day}, {currentDay.date}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Hora:</span>
                  <span className="value">{selectedClass.time}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Duración:</span>
                  <span className="value">{selectedClass.duration} minutos</span>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="btn btn-outline"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleConfirmBooking}
                >
                  <FaCheckCircle /> Confirmar Reservación
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Booking
