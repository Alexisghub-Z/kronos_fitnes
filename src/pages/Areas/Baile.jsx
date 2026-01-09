import { Link } from 'react-router-dom'
import '../../styles/AreaPage.css'

const Baile = () => {
  const benefits = [
    {
      icon: '💃',
      title: 'Diversión Garantizada',
      description: 'Ejercítate mientras bailas tus ritmos favoritos. ¡No sentirás que estás entrenando!'
    },
    {
      icon: '🔥',
      title: 'Quema hasta 800 Cal',
      description: 'Una clase de Zumba puede quemar entre 500-800 calorías.'
    },
    {
      icon: '🧘',
      title: 'Coordinación',
      description: 'Mejora tu coordinación, equilibrio y agilidad con cada movimiento.'
    },
    {
      icon: '😊',
      title: 'Libera Endorfinas',
      description: 'Baila, sonríe y mejora tu estado de ánimo naturalmente.'
    },
    {
      icon: '👥',
      title: 'Socializa',
      description: 'Conoce gente nueva en un ambiente divertido y sin presiones.'
    },
    {
      icon: '🎯',
      title: 'Tonifica Todo',
      description: 'Trabaja todo tu cuerpo de forma divertida y efectiva.'
    }
  ]

  const danceStyles = [
    {
      name: 'Zumba',
      icon: '💃',
      description: 'Ritmos latinos y movimientos fáciles de seguir'
    },
    {
      name: 'Reggaeton',
      icon: '🔊',
      description: 'Lo mejor del urbano latino'
    },
    {
      name: 'Salsa Fitness',
      icon: '🎺',
      description: 'Sabor caribeño con cardio intenso'
    },
    {
      name: 'Dance Cardio',
      icon: '🎵',
      description: 'Mix de estilos contemporáneos'
    },
    {
      name: 'Hip Hop',
      icon: '🎤',
      description: 'Movimientos urbanos y energía pura'
    },
    {
      name: 'Bollywood',
      icon: '🪷',
      description: 'Danza india fusionada con fitness'
    },
    {
      name: 'Ritmos Africanos',
      icon: '🥁',
      description: 'Tambores y movimientos tradicionales'
    },
    {
      name: 'K-Pop Dance',
      icon: '⭐',
      description: 'Coreografías de tus grupos favoritos'
    }
  ]

  const schedule = [
    {
      day: 'Lunes',
      classes: ['9:00 AM - Zumba Matutina', '6:00 PM - Reggaeton Fitness', '7:30 PM - Salsa Cardio']
    },
    {
      day: 'Martes',
      classes: ['10:00 AM - Dance Cardio', '5:30 PM - Zumba', '7:00 PM - Hip Hop']
    },
    {
      day: 'Miércoles',
      classes: ['9:00 AM - Bollywood', '6:00 PM - Zumba Power', '7:30 PM - K-Pop']
    },
    {
      day: 'Jueves',
      classes: ['10:00 AM - Salsa Fitness', '5:30 PM - Dance Mix', '7:00 PM - Reggaeton']
    },
    {
      day: 'Viernes',
      classes: ['9:00 AM - Zumba', '6:00 PM - Fiesta Latina', '7:30 PM - Weekend Party']
    },
    {
      day: 'Sábado',
      classes: ['10:00 AM - Zumba Gold', '11:30 AM - Hip Hop', '5:00 PM - Dance Cardio']
    }
  ]

  return (
    <div className="area-page">
      <section
        className="area-hero"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070)'
        }}
      >
        <div className="area-hero-overlay"></div>
        <div className="container area-hero-content">
          <div className="area-hero-icon">💃</div>
          <h1 className="area-hero-title">Baile & Zumba</h1>
          <p className="area-hero-subtitle">
            Fitness divertido con ritmos que te harán mover
          </p>
        </div>
      </section>

      <section className="area-benefits">
        <div className="container">
          <h2 className="section-title">
            Beneficios de <span>Bailar</span>
          </h2>
          <p className="section-subtitle">
            Ejercítate mientras te diviertes al máximo
          </p>

          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="area-equipment">
        <div className="container">
          <h2 className="section-title">
            Estilos de <span>Baile</span>
          </h2>
          <p className="section-subtitle">
            Variedad de ritmos para todos los gustos
          </p>

          <div className="equipment-grid">
            {danceStyles.map((style, index) => (
              <div key={index} className="equipment-item">
                <div className="equipment-icon">{style.icon}</div>
                <div className="equipment-name">{style.name}</div>
                <p style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                  {style.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="area-schedule">
        <div className="container">
          <h2 className="section-title">
            Horario de <span>Clases</span>
          </h2>
          <p className="section-subtitle">
            Encuentra tu clase favorita cada día de la semana
          </p>

          <div className="schedule-grid">
            {schedule.map((day, index) => (
              <div key={index} className="schedule-day">
                <h3 className="schedule-day-name">{day.day}</h3>
                <div className="schedule-times">
                  {day.classes.map((classInfo, idx) => (
                    <div key={idx} className="schedule-time">
                      {classInfo}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="area-cta">
        <div className="container">
          <h2>¡Mueve tu Cuerpo!</h2>
          <p>Ven a tu primera clase gratis y descubre lo divertido que es ejercitarse</p>
          <div className="cta-buttons">
            <Link to="/reservar" className="cta-button-primary">
              Clase Gratis
            </Link>
            <Link to="/horarios" className="cta-button-secondary">
              Todos los Horarios
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Baile
