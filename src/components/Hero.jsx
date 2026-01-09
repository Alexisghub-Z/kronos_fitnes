import '../styles/Hero.css'

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-background"></div>

      <div className="container hero-content">
        <h1 className="hero-title">
          Transforma Tu <span className="highlight">Cuerpo</span>
        </h1>
        <h2 className="hero-title">
          Transforma Tu <span className="highlight">Vida</span>
        </h2>
        <p className="hero-subtitle">
          Healthy Center - El gimnasio más completo con zona de pesas, cycling indoor y área de cardio de última generación
        </p>

        <div className="hero-buttons">
          <button
            onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
            className="btn btn-primary"
          >
            Comienza Gratis 7 Días
          </button>
          <button
            onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
            className="btn btn-outline"
          >
            Ver Servicios
          </button>
        </div>

        <div className="hero-stats">
          <div className="hero-stat-card">
            <h3 className="hero-stat-number">500+</h3>
            <p className="hero-stat-label">Miembros Activos</p>
          </div>
          <div className="hero-stat-card">
            <h3 className="hero-stat-number">24/7</h3>
            <p className="hero-stat-label">Acceso Total</p>
          </div>
          <div className="hero-stat-card">
            <h3 className="hero-stat-number">10+</h3>
            <p className="hero-stat-label">Entrenadores Expertos</p>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  )
}

export default Hero
