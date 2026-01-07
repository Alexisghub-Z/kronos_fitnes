import { Link } from 'react-router-dom'
import '../../styles/AreaPage.css'

const Cycling = () => {
  const benefits = [
    {
      icon: '🚴',
      title: 'Tonifica Piernas',
      description: 'Fortalece y define cuádriceps, glúteos, pantorrillas y abdomen.'
    },
    {
      icon: '🔥',
      title: 'Alta Quema Calórica',
      description: 'Quema hasta 600 calorías en una sesión de 45 minutos.'
    },
    {
      icon: '🎵',
      title: 'Motivación Grupal',
      description: 'La energía del grupo y la música te llevan al siguiente nivel.'
    },
    {
      icon: '💪',
      title: 'Bajo Impacto',
      description: 'Ejercicio intenso que cuida tus articulaciones.'
    },
    {
      icon: '🧠',
      title: 'Reduce Estrés',
      description: 'Libera tensiones y mejora tu estado mental.'
    },
    {
      icon: '⚡',
      title: 'Aumenta Resistencia',
      description: 'Mejora tu capacidad cardiovascular y resistencia muscular.'
    }
  ]

  const classTypes = [
    {
      name: 'Cycling Principiantes',
      duration: '30 min',
      intensity: 'Baja-Media',
      description: 'Perfecto para comenzar tu journey en cycling'
    },
    {
      name: 'Cycling Intermedio',
      duration: '45 min',
      intensity: 'Media-Alta',
      description: 'Combina sprints y resistencia'
    },
    {
      name: 'Cycling Avanzado',
      duration: '60 min',
      intensity: 'Alta',
      description: 'Para ciclistas experimentados'
    },
    {
      name: 'HIIT Cycling',
      duration: '40 min',
      intensity: 'Muy Alta',
      description: 'Intervalos de alta intensidad'
    }
  ]

  const equipment = [
    { icon: '🚴', name: 'Bicicletas IC7' },
    { icon: '📊', name: 'Monitores Cardíacos' },
    { icon: '🔧', name: 'Ajuste Personalizado' },
    { icon: '🎵', name: 'Sistema de Audio' },
    { icon: '💡', name: 'Iluminación Dinámica' },
    { icon: '📱', name: 'App Conectada' },
    { icon: '❄️', name: 'Climatización' },
    { icon: '🧴', name: 'Amenidades Premium' }
  ]

  return (
    <div className="area-page">
      <section
        className="area-hero"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070)'
        }}
      >
        <div className="area-hero-overlay"></div>
        <div className="container area-hero-content">
          <div className="area-hero-icon">🚴</div>
          <h1 className="area-hero-title">Cycling Indoor</h1>
          <p className="area-hero-subtitle">
            Clases grupales de spinning con música en vivo e instructores certificados
          </p>
        </div>
      </section>

      <section className="area-benefits">
        <div className="container">
          <h2 className="section-title">
            Por Qué <span>Cycling</span>
          </h2>
          <p className="section-subtitle">
            El entrenamiento más completo y divertido que existe
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
            Sala de <span>Cycling</span>
          </h2>
          <p className="section-subtitle">
            Instalaciones diseñadas para la mejor experiencia de spinning
          </p>

          <div className="equipment-grid">
            {equipment.map((item, index) => (
              <div key={index} className="equipment-item">
                <div className="equipment-icon">{item.icon}</div>
                <div className="equipment-name">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="area-schedule">
        <div className="container">
          <h2 className="section-title">
            Tipos de <span>Clases</span>
          </h2>
          <p className="section-subtitle">
            Encuentra la clase perfecta para tu nivel
          </p>

          <div className="schedule-grid">
            {classTypes.map((classType, index) => (
              <div key={index} className="schedule-day">
                <h3 className="schedule-day-name">{classType.name}</h3>
                <div className="schedule-times">
                  <div className="schedule-time">⏱️ {classType.duration}</div>
                  <div className="schedule-time">💪 {classType.intensity}</div>
                  <div className="schedule-time">ℹ️ {classType.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="area-cta">
        <div className="container">
          <h2>¡Súbete a la Bici!</h2>
          <p>Reserva tu lugar en la próxima clase de cycling</p>
          <div className="cta-buttons">
            <Link to="/reservar" className="cta-button-primary">
              Reservar Ahora
            </Link>
            <Link to="/horarios" className="cta-button-secondary">
              Ver Horarios
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Cycling
