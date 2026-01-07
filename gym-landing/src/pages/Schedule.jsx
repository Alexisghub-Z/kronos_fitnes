import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Schedule.css'

const Schedule = () => {
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
          icon: '❤️'
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
          icon: '🏋️'
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
          icon: '💃'
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
          icon: '🚴'
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
          icon: '🧘'
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
          icon: '🔥'
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
          icon: '💃'
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
          icon: '🚴'
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
          icon: '💪'
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
          icon: '❤️'
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
          icon: '💃'
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
          icon: '🚴'
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
          icon: '🏋️'
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
          icon: '🧘'
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
          icon: '🔥'
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
          icon: '💃'
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
          icon: '🚴'
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
          icon: '🍑'
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
          icon: '❤️'
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
          icon: '🔊'
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
          icon: '🚴'
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
          icon: '💪'
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
          icon: '❤️'
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
          icon: '💃'
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
          icon: '🚴'
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
          icon: '🏋️'
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

  return (
    <div className="schedule-page">
      {/* Header */}
      <section className="schedule-header">
        <div className="container">
          <h1>Horario de <span>Clases</span></h1>
          <p>Encuentra tu clase perfecta y reserva tu lugar</p>
        </div>
      </section>

      {/* Filters */}
      <section className="schedule-filters">
        <div className="container">
          <div className="filters-grid">
            <div className="filter-group">
              <label htmlFor="area">Área</label>
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
              <label htmlFor="level">Nivel</label>
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
              <label htmlFor="time">Horario</label>
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
              <Link to="/reservar" className="btn btn-primary" style={{marginTop: '1.5rem'}}>
                Reservar Clase
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section className="schedule-content">
        <div className="container">
          <div className="week-calendar">
            {weekSchedule.map((day, index) => (
              <div key={index} className="day-card">
                <div className="day-header">
                  <div className="day-name">{day.day}</div>
                  <div className="day-date">{day.date}</div>
                </div>
                <div className="day-classes">
                  {filterClasses(day.classes).length > 0 ? (
                    filterClasses(day.classes).map((classItem, idx) => (
                      <div key={idx} className="class-item">
                        <div className="class-time">
                          <span className="class-time-icon">{classItem.icon}</span>
                          {classItem.time}
                        </div>
                        <div className="class-name">{classItem.name}</div>
                        <div className="class-details">
                          <span className="class-tag">📍 {classItem.area}</span>
                          <span className="class-tag">⏱️ {classItem.duration}</span>
                          <span className="class-tag">📊 {classItem.level}</span>
                        </div>
                        <div className="class-instructor">
                          👨‍🏫 {classItem.instructor}
                        </div>
                        <div className="class-spots">
                          <span className="spots-info">
                            <span className="spots-available">{classItem.spots}</span> lugares disponibles
                          </span>
                          <button
                            className="book-button"
                            disabled={classItem.spots === 0}
                          >
                            {classItem.spots > 0 ? 'Reservar' : 'Lleno'}
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{textAlign: 'center', color: '#6b7280', padding: '2rem'}}>
                      No hay clases que coincidan con tus filtros
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="schedule-legend">
            <h3 className="legend-title">Leyenda de Niveles</h3>
            <div className="legend-items">
              <div className="legend-item">
                <div className="legend-color" style={{backgroundColor: '#10b981'}}></div>
                <span className="legend-label">Principiante - Ideal para empezar</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{backgroundColor: '#f59e0b'}}></div>
                <span className="legend-label">Intermedio - Algo de experiencia</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{backgroundColor: '#ef4444'}}></div>
                <span className="legend-label">Avanzado - Muy exigente</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{backgroundColor: '#7ED321'}}></div>
                <span className="legend-label">Todos - Adaptable a tu nivel</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Schedule
