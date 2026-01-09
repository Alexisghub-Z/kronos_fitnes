import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaClock,
  FaUser,
  FaDumbbell,
  FaFire,
  FaUsers,
  FaCalendarCheck
} from 'react-icons/fa'
import '../styles/Schedule.css'

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState(0)
  const [filters, setFilters] = useState({
    area: 'todas',
    level: 'todos',
    time: 'todo'
  })

  const weekSchedule = [
    {
      day: 'Lunes',
      date: '8 Enero',
      classes: [
        {
          time: '6:00 AM',
          name: 'Cardio Matutino',
          instructor: 'Carlos Méndez',
          area: 'Cardio',
          level: 'Todos',
          duration: '45 min',
          spots: 8,
          totalSpots: 15,
          icon: '❤️',
          intensity: 'media'
        },
        {
          time: '7:00 AM',
          name: 'Pesas Funcional',
          instructor: 'Ana Rodríguez',
          area: 'Pesas',
          level: 'Intermedio',
          duration: '60 min',
          spots: 5,
          totalSpots: 12,
          icon: '🏋️',
          intensity: 'alta'
        },
        {
          time: '9:00 AM',
          name: 'Zumba',
          instructor: 'María González',
          area: 'Baile',
          level: 'Todos',
          duration: '50 min',
          spots: 12,
          totalSpots: 20,
          icon: '💃',
          intensity: 'media'
        },
        {
          time: '6:00 PM',
          name: 'Cycling Power',
          instructor: 'Roberto Silva',
          area: 'Cycling',
          level: 'Avanzado',
          duration: '45 min',
          spots: 3,
          totalSpots: 15,
          icon: '🚴',
          intensity: 'alta'
        },
        {
          time: '7:30 PM',
          name: 'Yoga Flow',
          instructor: 'Laura Martínez',
          area: 'Clases',
          level: 'Todos',
          duration: '60 min',
          spots: 10,
          totalSpots: 15,
          icon: '🧘',
          intensity: 'baja'
        }
      ]
    },
    {
      day: 'Martes',
      date: '9 Enero',
      classes: [
        {
          time: '6:30 AM',
          name: 'HIIT',
          instructor: 'Carlos Méndez',
          area: 'Cardio',
          level: 'Avanzado',
          duration: '30 min',
          spots: 6,
          totalSpots: 12,
          icon: '🔥',
          intensity: 'alta'
        },
        {
          time: '10:00 AM',
          name: 'Dance Cardio',
          instructor: 'María González',
          area: 'Baile',
          level: 'Intermedio',
          duration: '45 min',
          spots: 15,
          totalSpots: 20,
          icon: '💃',
          intensity: 'media'
        },
        {
          time: '5:30 PM',
          name: 'Cycling Básico',
          instructor: 'Roberto Silva',
          area: 'Cycling',
          level: 'Principiante',
          duration: '40 min',
          spots: 8,
          totalSpots: 15,
          icon: '🚴',
          intensity: 'baja'
        },
        {
          time: '7:00 PM',
          name: 'Fuerza Total',
          instructor: 'Ana Rodríguez',
          area: 'Pesas',
          level: 'Todos',
          duration: '60 min',
          spots: 4,
          totalSpots: 12,
          icon: '💪',
          intensity: 'media'
        }
      ]
    },
    {
      day: 'Miércoles',
      date: '10 Enero',
      classes: [
        {
          time: '6:00 AM',
          name: 'Cardio Express',
          instructor: 'Carlos Méndez',
          area: 'Cardio',
          level: 'Todos',
          duration: '30 min',
          spots: 10,
          totalSpots: 15,
          icon: '❤️',
          intensity: 'media'
        },
        {
          time: '9:00 AM',
          name: 'Zumba Gold',
          instructor: 'María González',
          area: 'Baile',
          level: 'Principiante',
          duration: '45 min',
          spots: 18,
          totalSpots: 20,
          icon: '💃',
          intensity: 'baja'
        },
        {
          time: '12:00 PM',
          name: 'Cycling Medio Día',
          instructor: 'Roberto Silva',
          area: 'Cycling',
          level: 'Intermedio',
          duration: '45 min',
          spots: 7,
          totalSpots: 15,
          icon: '🚴',
          intensity: 'media'
        },
        {
          time: '6:00 PM',
          name: 'CrossFit',
          instructor: 'Ana Rodríguez',
          area: 'Pesas',
          level: 'Avanzado',
          duration: '60 min',
          spots: 2,
          totalSpots: 10,
          icon: '🏋️',
          intensity: 'alta'
        },
        {
          time: '8:00 PM',
          name: 'Pilates',
          instructor: 'Laura Martínez',
          area: 'Clases',
          level: 'Todos',
          duration: '50 min',
          spots: 12,
          totalSpots: 15,
          icon: '🧘',
          intensity: 'baja'
        }
      ]
    },
    {
      day: 'Jueves',
      date: '11 Enero',
      classes: [
        {
          time: '6:30 AM',
          name: 'Cardio + Abs',
          instructor: 'Carlos Méndez',
          area: 'Cardio',
          level: 'Intermedio',
          duration: '45 min',
          spots: 9,
          totalSpots: 15,
          icon: '🔥',
          intensity: 'alta'
        },
        {
          time: '10:00 AM',
          name: 'Salsa Fitness',
          instructor: 'María González',
          area: 'Baile',
          level: 'Todos',
          duration: '50 min',
          spots: 16,
          totalSpots: 20,
          icon: '💃',
          intensity: 'media'
        },
        {
          time: '5:30 PM',
          name: 'Cycling HIIT',
          instructor: 'Roberto Silva',
          area: 'Cycling',
          level: 'Avanzado',
          duration: '40 min',
          spots: 5,
          totalSpots: 15,
          icon: '🚴',
          intensity: 'alta'
        },
        {
          time: '7:00 PM',
          name: 'Pesas Glúteos',
          instructor: 'Ana Rodríguez',
          area: 'Pesas',
          level: 'Todos',
          duration: '50 min',
          spots: 6,
          totalSpots: 12,
          icon: '🍑',
          intensity: 'media'
        }
      ]
    },
    {
      day: 'Viernes',
      date: '12 Enero',
      classes: [
        {
          time: '6:00 AM',
          name: 'Cardio Viernes',
          instructor: 'Carlos Méndez',
          area: 'Cardio',
          level: 'Todos',
          duration: '45 min',
          spots: 11,
          totalSpots: 15,
          icon: '❤️',
          intensity: 'media'
        },
        {
          time: '9:00 AM',
          name: 'Reggaeton Fitness',
          instructor: 'María González',
          area: 'Baile',
          level: 'Todos',
          duration: '50 min',
          spots: 14,
          totalSpots: 20,
          icon: '🔊',
          intensity: 'media'
        },
        {
          time: '6:00 PM',
          name: 'Cycling Party',
          instructor: 'Roberto Silva',
          area: 'Cycling',
          level: 'Todos',
          duration: '50 min',
          spots: 1,
          totalSpots: 15,
          icon: '🚴',
          intensity: 'alta'
        },
        {
          time: '7:30 PM',
          name: 'Fuerza Weekend',
          instructor: 'Ana Rodríguez',
          area: 'Pesas',
          level: 'Intermedio',
          duration: '60 min',
          spots: 8,
          totalSpots: 12,
          icon: '💪',
          intensity: 'media'
        }
      ]
    },
    {
      day: 'Sábado',
      date: '13 Enero',
      classes: [
        {
          time: '8:00 AM',
          name: 'Cardio Sábado',
          instructor: 'Carlos Méndez',
          area: 'Cardio',
          level: 'Todos',
          duration: '45 min',
          spots: 13,
          totalSpots: 15,
          icon: '❤️',
          intensity: 'media'
        },
        {
          time: '10:00 AM',
          name: 'Zumba Weekend',
          instructor: 'María González',
          area: 'Baile',
          level: 'Todos',
          duration: '60 min',
          spots: 17,
          totalSpots: 20,
          icon: '💃',
          intensity: 'media'
        },
        {
          time: '11:30 AM',
          name: 'Cycling Matutino',
          instructor: 'Roberto Silva',
          area: 'Cycling',
          level: 'Intermedio',
          duration: '45 min',
          spots: 9,
          totalSpots: 15,
          icon: '🚴',
          intensity: 'media'
        },
        {
          time: '4:00 PM',
          name: 'Entrenamiento Funcional',
          instructor: 'Ana Rodríguez',
          area: 'Pesas',
          level: 'Todos',
          duration: '50 min',
          spots: 7,
          totalSpots: 12,
          icon: '🏋️',
          intensity: 'media'
        }
      ]
    }
  ]

  const filterClasses = (classes) => {
    return classes.filter(classItem => {
      const matchesArea = filters.area === 'todas' || classItem.area === filters.area
      const matchesLevel = filters.level === 'todos' || classItem.level === filters.level
      const matchesTime = filters.time === 'todo' ||
        (filters.time === 'manana' && parseInt(classItem.time) < 12) ||
        (filters.time === 'tarde' && parseInt(classItem.time) >= 12 && parseInt(classItem.time) < 18) ||
        (filters.time === 'noche' && parseInt(classItem.time) >= 18)

      return matchesArea && matchesLevel && matchesTime
    })
  }

  const getLevelColor = (level) => {
    const colors = {
      'Principiante': 'level-beginner',
      'Intermedio': 'level-intermediate',
      'Avanzado': 'level-advanced',
      'Todos': 'level-all'
    }
    return colors[level] || 'level-all'
  }

  const getIntensityBadge = (intensity) => {
    const badges = {
      'baja': { icon: <FaFire />, text: 'Baja', className: 'intensity-low' },
      'media': { icon: <FaFire />, text: 'Media', className: 'intensity-medium' },
      'alta': { icon: <FaFire />, text: 'Alta', className: 'intensity-high' }
    }
    return badges[intensity] || badges.media
  }

  const getAvailabilityStatus = (spots, total) => {
    const percentage = (spots / total) * 100
    if (percentage === 0) return { text: 'Lleno', className: 'status-full' }
    if (percentage <= 20) return { text: 'Últimos lugares', className: 'status-low' }
    if (percentage <= 50) return { text: 'Disponible', className: 'status-medium' }
    return { text: 'Muchos lugares', className: 'status-high' }
  }

  const currentDay = weekSchedule[selectedDay]
  const filteredClasses = filterClasses(currentDay.classes)

  return (
    <div className="schedule-page">
      {/* Header */}
      <motion.section
        className="schedule-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="container">
          <h1>Horario de <span>Clases</span></h1>
          <p>Encuentra tu clase perfecta y reserva tu lugar</p>
        </div>
      </motion.section>

      {/* Filters */}
      <motion.section
        className="schedule-filters"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="container">
          <div className="filters-grid">
            <div className="filter-group">
              <label htmlFor="area"><FaDumbbell /> Área</label>
              <select
                id="area"
                value={filters.area}
                onChange={(e) => setFilters({...filters, area: e.target.value})}
              >
                <option value="todas">Todas las áreas</option>
                <option value="Pesas">Pesas</option>
                <option value="Cardio">Cardio</option>
                <option value="Cycling">Cycling</option>
                <option value="Baile">Baile</option>
                <option value="Clases">Otras Clases</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="level"><FaFire /> Nivel</label>
              <select
                id="level"
                value={filters.level}
                onChange={(e) => setFilters({...filters, level: e.target.value})}
              >
                <option value="todos">Todos los niveles</option>
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="time"><FaClock /> Horario</label>
              <select
                id="time"
                value={filters.time}
                onChange={(e) => setFilters({...filters, time: e.target.value})}
              >
                <option value="todo">Todo el día</option>
                <option value="manana">Mañana (6AM-12PM)</option>
                <option value="tarde">Tarde (12PM-6PM)</option>
                <option value="noche">Noche (6PM-10PM)</option>
              </select>
            </div>

            <div className="filter-group">
              <Link to="/reservar" className="btn btn-primary reserve-btn">
                <FaCalendarCheck /> Reservar Clase
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Day Selector */}
      <motion.section
        className="day-selector-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="container">
          <div className="day-selector">
            {weekSchedule.map((day, index) => (
              <motion.button
                key={index}
                className={`day-btn ${selectedDay === index ? 'active' : ''}`}
                onClick={() => setSelectedDay(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="day-btn-name">{day.day}</div>
                <div className="day-btn-date">{day.date}</div>
                <div className="day-btn-count">{day.classes.length} clases</div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Classes List */}
      <section className="schedule-content">
        <div className="container">
          <motion.div
            className="classes-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {filteredClasses.length > 0 ? (
              filteredClasses.map((classItem, idx) => {
                const intensityBadge = getIntensityBadge(classItem.intensity)
                const availabilityStatus = getAvailabilityStatus(classItem.spots, classItem.totalSpots)
                const spotsPercentage = (classItem.spots / classItem.totalSpots) * 100

                return (
                  <motion.div
                    key={idx}
                    className="class-card-modern"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -8, boxShadow: '0 12px 32px rgba(126, 211, 33, 0.2)' }}
                  >
                    <div className="class-card-header">
                      <div className="class-icon-large">{classItem.icon}</div>
                      <div className="class-time-badge">
                        <FaClock /> {classItem.time}
                      </div>
                    </div>

                    <div className="class-card-body">
                      <h3 className="class-title">{classItem.name}</h3>

                      <div className="class-badges">
                        <span className={`level-badge ${getLevelColor(classItem.level)}`}>
                          {classItem.level}
                        </span>
                        <span className={`intensity-badge ${intensityBadge.className}`}>
                          {intensityBadge.icon} {intensityBadge.text}
                        </span>
                      </div>

                      <div className="class-info-grid">
                        <div className="info-item">
                          <FaUser className="info-icon" />
                          <span>{classItem.instructor}</span>
                        </div>
                        <div className="info-item">
                          <FaClock className="info-icon" />
                          <span>{classItem.duration}</span>
                        </div>
                        <div className="info-item">
                          <FaDumbbell className="info-icon" />
                          <span>{classItem.area}</span>
                        </div>
                      </div>

                      <div className="availability-section">
                        <div className="availability-header">
                          <span className={`availability-status ${availabilityStatus.className}`}>
                            {availabilityStatus.text}
                          </span>
                          <span className="availability-count">
                            <FaUsers /> {classItem.spots}/{classItem.totalSpots}
                          </span>
                        </div>
                        <div className="availability-bar">
                          <motion.div
                            className="availability-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${spotsPercentage}%` }}
                            transition={{ duration: 0.8, delay: idx * 0.05 }}
                            style={{
                              backgroundColor: spotsPercentage > 50 ? '#7ED321' :
                                spotsPercentage > 20 ? '#ffa500' : '#ff4444'
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="class-card-footer">
                      <Link
                        to="/reservar"
                        className={`btn-reserve ${classItem.spots === 0 ? 'disabled' : ''}`}
                      >
                        {classItem.spots > 0 ? 'Reservar Ahora' : 'Clase Llena'}
                      </Link>
                    </div>
                  </motion.div>
                )
              })
            ) : (
              <motion.div
                className="no-classes"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="no-classes-icon">📅</div>
                <h3>No hay clases disponibles</h3>
                <p>Intenta ajustar los filtros para ver más opciones</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Schedule
