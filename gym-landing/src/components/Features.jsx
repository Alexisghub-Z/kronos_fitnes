import '../styles/Features.css'

const Features = () => {
  const features = [
    { title: 'Acceso 24/7', description: 'Entrena cuando quieras, sin restricciones de horario', icon: '🕐' },
    { title: 'Entrenadores Certificados', description: 'Personal altamente capacitado para guiarte', icon: '👨‍🏫' },
    { title: 'Vestuarios Premium', description: 'Casilleros, duchas y amenidades incluidas', icon: '🚿' },
    { title: 'Clases Grupales', description: 'Yoga, HIIT, Zumba, Spinning y más', icon: '🧘' },
    { title: 'App Móvil', description: 'Reserva clases y trackea tu progreso', icon: '📱' },
    { title: 'WiFi Gratis', description: 'Conexión de alta velocidad en todas las áreas', icon: '📶' },
    { title: 'Estacionamiento', description: 'Amplio y seguro para todos los miembros', icon: '🅿️' },
    { title: 'Nutricionista', description: 'Asesoría personalizada para mejores resultados', icon: '🥗' }
  ]

  return (
    <section id="features" className="features">
      <div className="container">
        <h2 className="section-title">
          ¿Por Qué Elegir <span>KHRONOS FITNESS</span>?
        </h2>
        <p className="section-subtitle">
          Más que un gimnasio, una experiencia completa de bienestar
        </p>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
