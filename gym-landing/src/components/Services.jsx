import '../styles/Services.css'

const Services = () => {
  const services = [
    {
      title: 'Zona de Pesas',
      description: 'Equipamiento profesional con máquinas de última generación, mancuernas, barras y todo lo necesario para tu entrenamiento de fuerza.',
      icon: '🏋️',
      features: ['Máquinas guiadas', 'Peso libre completo', 'Racks y jaulas', 'Entrenadores disponibles']
    },
    {
      title: 'Cycling Indoor',
      description: 'Clases de spinning en grupo con instructores certificados, música motivadora y bicicletas de alto rendimiento.',
      icon: '🚴',
      features: ['Clases grupales', 'Instructores certificados', 'Varios niveles', 'Música en vivo']
    },
    {
      title: 'Área de Cardio',
      description: 'Zona exclusiva con caminadoras, elípticas, escaladoras y bicicletas estáticas con pantallas interactivas.',
      icon: '❤️',
      features: ['Equipos modernos', 'Pantallas interactivas', 'Variedad de máquinas', 'Monitoreo cardíaco']
    }
  ]

  return (
    <section id="services" className="services">
      <div className="container">
        <h2 className="section-title">
          Nuestros <span>Servicios</span>
        </h2>
        <p className="section-subtitle">
          Instalaciones de primer nivel diseñadas para ayudarte a alcanzar tus objetivos
        </p>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="service-feature">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
