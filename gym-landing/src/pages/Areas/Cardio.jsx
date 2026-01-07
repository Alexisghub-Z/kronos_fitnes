import { Link } from 'react-router-dom'
import '../../styles/AreaPage.css'

const Cardio = () => {
  const benefits = [
    {
      icon: '❤️',
      title: 'Corazón Saludable',
      description: 'Fortalece tu sistema cardiovascular y reduce el riesgo de enfermedades cardíacas.'
    },
    {
      icon: '🔥',
      title: 'Quema Calorías Rápido',
      description: 'El cardio es la forma más efectiva de quemar calorías y perder peso.'
    },
    {
      icon: '🫁',
      title: 'Mejor Respiración',
      description: 'Aumenta tu capacidad pulmonar y mejora tu resistencia física.'
    },
    {
      icon: '😊',
      title: 'Reduce Estrés',
      description: 'Libera endorfinas y mejora tu estado de ánimo naturalmente.'
    },
    {
      icon: '🩺',
      title: 'Control de Presión',
      description: 'Regula la presión arterial y mejora la circulación sanguínea.'
    },
    {
      icon: '💤',
      title: 'Mejor Sueño',
      description: 'Mejora la calidad de tu descanso y duerme profundamente.'
    }
  ]

  const equipment = [
    { icon: '🏃', name: 'Treadmills' },
    { icon: '🚴', name: 'Bicicletas Estáticas' },
    { icon: '🎯', name: 'Elípticas' },
    { icon: '⚡', name: 'Escaladoras' },
    { icon: '🏊', name: 'Remo Indoor' },
    { icon: '📺', name: 'Con Pantallas HD' },
    { icon: '📊', name: 'Monitor Cardíaco' },
    { icon: '🎧', name: 'Conexión Bluetooth' }
  ]

  const programs = [
    {
      name: 'HIIT Cardio',
      duration: '30 min',
      intensity: 'Alta',
      calories: '400-500 cal'
    },
    {
      name: 'Cardio Moderado',
      duration: '45 min',
      intensity: 'Media',
      calories: '300-400 cal'
    },
    {
      name: 'Fat Burn Zone',
      duration: '60 min',
      intensity: 'Media-Baja',
      calories: '350-450 cal'
    },
    {
      name: 'Cardio Intenso',
      duration: '20 min',
      intensity: 'Muy Alta',
      calories: '300-350 cal'
    }
  ]

  return (
    <div className="area-page">
      {/* Hero Section */}
      <section
        className="area-hero"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2075)'
        }}
      >
        <div className="area-hero-overlay"></div>
        <div className="container area-hero-content">
          <div className="area-hero-icon">❤️</div>
          <h1 className="area-hero-title">Área de Cardio</h1>
          <p className="area-hero-subtitle">
            Equipos de última generación para maximizar tu rendimiento cardiovascular
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="area-benefits">
        <div className="container">
          <h2 className="section-title">
            Beneficios del <span>Entrenamiento Cardiovascular</span>
          </h2>
          <p className="section-subtitle">
            Mejora tu salud y bienestar con cardio regular
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
            Equipamiento <span>Premium</span>
          </h2>
          <p className="section-subtitle">
            Máquinas con tecnología de punta y monitoreo en tiempo real
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

      {/* Programs Section */}
      <section className="area-schedule">
        <div className="container">
          <h2 className="section-title">
            Programas <span>Recomendados</span>
          </h2>
          <p className="section-subtitle">
            Elige el programa que mejor se adapte a tus objetivos
          </p>

          <div className="schedule-grid">
            {programs.map((program, index) => (
              <div key={index} className="schedule-day">
                <h3 className="schedule-day-name">{program.name}</h3>
                <div className="schedule-times">
                  <div className="schedule-time">⏱️ Duración: {program.duration}</div>
                  <div className="schedule-time">💪 Intensidad: {program.intensity}</div>
                  <div className="schedule-time">🔥 Calorías: {program.calories}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="area-cta">
        <div className="container">
          <h2>Activa tu Corazón</h2>
          <p>Prueba gratis nuestra área de cardio y siente la diferencia</p>
          <div className="cta-buttons">
            <Link to="/reservar" className="cta-button-primary">
              Clase Gratis
            </Link>
            <Link to="/#pricing" className="cta-button-secondary">
              Ver Membresías
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Cardio
