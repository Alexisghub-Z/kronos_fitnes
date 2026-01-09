import { Link } from 'react-router-dom'
import '../../styles/AreaPage.css'

const Pesas = () => {
  const benefits = [
    {
      icon: '💪',
      title: 'Aumento de Fuerza',
      description: 'Desarrolla músculo y aumenta tu fuerza con nuestro equipamiento profesional de última generación.'
    },
    {
      icon: '🔥',
      title: 'Quema de Calorías',
      description: 'El entrenamiento con pesas acelera tu metabolismo y te ayuda a quemar calorías incluso en reposo.'
    },
    {
      icon: '🦴',
      title: 'Huesos más Fuertes',
      description: 'Fortalece tus huesos y previene la osteoporosis con entrenamiento de resistencia.'
    },
    {
      icon: '🎯',
      title: 'Definición Muscular',
      description: 'Esculpe tu cuerpo y logra la definición que siempre has deseado.'
    },
    {
      icon: '🧠',
      title: 'Salud Mental',
      description: 'Reduce el estrés, mejora tu autoestima y libera endorfinas con cada sesión.'
    },
    {
      icon: '⚡',
      title: 'Más Energía',
      description: 'Aumenta tu nivel de energía y rendimiento en tu día a día.'
    }
  ]

  const equipment = [
    { icon: '🏋️', name: 'Mancuernas' },
    { icon: '💪', name: 'Barras Olímpicas' },
    { icon: '⚙️', name: 'Máquinas Guiadas' },
    { icon: '🔗', name: 'Poleas y Cables' },
    { icon: '🪑', name: 'Bancos Ajustables' },
    { icon: '🎯', name: 'Rack de Sentadillas' },
    { icon: '💯', name: 'Smith Machine' },
    { icon: '🔧', name: 'Peso Libre Variado' }
  ]

  const schedule = [
    {
      day: 'Lunes - Miércoles - Viernes',
      times: ['6:00 AM - Entrenamiento Matutino', '12:00 PM - Sesión Medio Día', '6:00 PM - Hora Pico', '8:00 PM - Noche Tranquila']
    },
    {
      day: 'Martes - Jueves',
      times: ['6:00 AM - Arranque del Día', '12:00 PM - Express', '5:30 PM - After Work', '8:00 PM - Última Sesión']
    },
    {
      day: 'Sábado',
      times: ['8:00 AM - Weekend Warriors', '10:00 AM - Medio Día', '4:00 PM - Tarde Activa']
    },
    {
      day: 'Domingo',
      times: ['9:00 AM - Domingo Fitness', '11:00 AM - Relax & Train', '5:00 PM - Cierre de Semana']
    }
  ]

  return (
    <div className="area-page">
      {/* Hero Section */}
      <section
        className="area-hero"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070)'
        }}
      >
        <div className="area-hero-overlay"></div>
        <div className="container area-hero-content">
          <div className="area-hero-icon">🏋️</div>
          <h1 className="area-hero-title">Zona de Pesas</h1>
          <p className="area-hero-subtitle">
            Equipamiento profesional de última generación para transformar tu físico
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="area-benefits">
        <div className="container">
          <h2 className="section-title">
            Beneficios del <span>Entrenamiento con Pesas</span>
          </h2>
          <p className="section-subtitle">
            Descubre cómo el entrenamiento de fuerza puede transformar tu vida
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

      {/* Equipment Section */}
      <section className="area-equipment">
        <div className="container">
          <h2 className="section-title">
            Nuestro <span>Equipamiento</span>
          </h2>
          <p className="section-subtitle">
            Tecnología de punta para maximizar tus resultados
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

      {/* Schedule Section */}
      <section className="area-schedule">
        <div className="container">
          <h2 className="section-title">
            Horarios <span>Disponibles</span>
          </h2>
          <p className="section-subtitle">
            Acceso 24/7 - Entrena cuando tú quieras
          </p>

          <div className="schedule-grid">
            {schedule.map((day, index) => (
              <div key={index} className="schedule-day">
                <h3 className="schedule-day-name">{day.day}</h3>
                <div className="schedule-times">
                  {day.times.map((time, idx) => (
                    <div key={idx} className="schedule-time">
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="area-cta">
        <div className="container">
          <h2>¿Listo para empezar?</h2>
          <p>Únete a KHRONOS FITNESS y transforma tu cuerpo hoy mismo</p>
          <div className="cta-buttons">
            <Link to="/reservar" className="cta-button-primary">
              Reservar Clase Gratis
            </Link>
            <Link to="/#pricing" className="cta-button-secondary">
              Ver Planes
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Pesas
