import { useState } from 'react'
import '../styles/Pricing.css'

const Pricing = () => {
  const [activeArea, setActiveArea] = useState('pesas')

  const pricingByArea = {
    pesas: [
      {
        name: 'Alumnos URSE',
        price: '200',
        period: 'mes',
        description: 'Precio especial para estudiantes de la URSE',
        features: [
          'Acceso ilimitado a zona de pesas',
          'Acceso a área de cardio',
          'Máquinas de fuerza y cardio',
          'Área de peso libre',
          'Vestuarios y duchas',
          'WiFi gratis',
          'Credencial de estudiante requerida'
        ],
        popular: false,
        badge: 'URSE'
      },
      {
        name: 'Estudiantes',
        price: '270',
        period: 'mes',
        description: 'Descuento especial para estudiantes',
        features: [
          'Acceso ilimitado a zona de pesas',
          'Acceso a área de cardio',
          'Máquinas de fuerza y cardio',
          'Área de peso libre',
          'Vestuarios y duchas',
          'WiFi gratis',
          'Credencial vigente requerida'
        ],
        popular: true,
        badge: 'ESTUDIANTE'
      },
      {
        name: 'General',
        price: '350',
        period: 'mes',
        description: 'Acceso completo a pesas y cardio',
        features: [
          'Acceso ilimitado a zona de pesas',
          'Acceso a área de cardio',
          'Máquinas de fuerza y cardio',
          'Área de peso libre',
          'Vestuarios y duchas',
          'WiFi gratis',
          'Horario extendido'
        ],
        popular: false,
        badge: 'GENERAL'
      }
    ],
    baile: [
      {
        name: 'Baile Reductivo',
        price: '450',
        period: 'mes',
        description: 'Programa especializado de baile reductivo',
        features: [
          'Clases de baile reductivo ilimitadas',
          'Instructores especializados',
          'Coreografías diseñadas para quemar grasa',
          'Rutinas de tonificación',
          'Seguimiento personalizado',
          'Vestuarios y duchas',
          'WiFi gratis',
          'Comunidad de apoyo'
        ],
        popular: true,
        badge: 'REDUCTIVO'
      }
    ]
  }

  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <h2 className="section-title">
          Planes y <span>Precios</span>
        </h2>
        <p className="section-subtitle">
          Elige el plan que mejor se adapte a tus objetivos
        </p>
        <div className="pricing-badge">
          💪 Elige el plan que mejor se adapte a ti
        </div>

        {/* Area Tabs */}
        <div className="pricing-tabs">
          <button
            className={`pricing-tab ${activeArea === 'pesas' ? 'active' : ''}`}
            onClick={() => setActiveArea('pesas')}
          >
            <span className="tab-icon">🏋️</span>
            <span className="tab-label">Pesas & Cardio</span>
          </button>
          <button
            className={`pricing-tab ${activeArea === 'baile' ? 'active' : ''}`}
            onClick={() => setActiveArea('baile')}
          >
            <span className="tab-icon">💃</span>
            <span className="tab-label">Baile Reductivo</span>
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-grid">
          {pricingByArea[activeArea].map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.popular ? 'popular' : 'standard'}`}>
              <div className="pricing-popular-badge">
                {plan.popular ? '⭐ MÁS POPULAR' : `✓ ${plan.badge}`}
              </div>

              <div className="pricing-header">
                <h3 className="pricing-plan-name">{plan.name}</h3>
                <p className="pricing-plan-description">{plan.description}</p>
                <div className="pricing-amount">
                  <span className="pricing-price">${plan.price}</span>
                  <span className="pricing-period">/{plan.period}</span>
                </div>
              </div>

              <ul className="pricing-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="pricing-feature">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="pricing-cta">
                Comenzar Ahora
              </button>
            </div>
          ))}
        </div>

        <div className="pricing-footer">
          <p>¿Necesitas un plan corporativo o para grupos?</p>
          <button>Contáctanos para planes personalizados</button>
        </div>
      </div>
    </section>
  )
}

export default Pricing
