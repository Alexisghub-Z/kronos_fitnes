import { FaDumbbell, FaRunning, FaMusic, FaBiking, FaYinYang, FaMedal, FaStar, FaUsers, FaClock, FaCheckCircle, FaFire } from 'react-icons/fa'
import '../styles/Trainers.css'

const Trainers = () => {
  const trainers = [
    {
      name: 'Ana Rodríguez',
      title: 'Especialista en Fuerza y Acondicionamiento',
      icon: <FaDumbbell />,
      bio: 'Con 8 años de experiencia en entrenamiento funcional y levantamiento olímpico. Apasionada por ayudar a las personas a alcanzar sus metas físicas.',
      specialties: ['Pesas', 'CrossFit', 'Funcional', 'Fuerza', 'Nutrición Deportiva'],
      certifications: [
        'Certificación NSCA-CPT',
        'Especialista en Levantamiento Olímpico',
        'Nutrición Deportiva Nivel 2',
        'Entrenador CrossFit L1'
      ],
      stats: {
        experience: '8 años',
        clients: '200+',
        rating: '4.9/5'
      },
      badge: 'Jefa de Entrenadores',
      color: '#7ED321',
      available: true
    },
    {
      name: 'Carlos Méndez',
      title: 'Experto en Cardio y HIIT',
      icon: <FaRunning />,
      bio: 'Entrenador certificado especializado en programas de alta intensidad y acondicionamiento cardiovascular. Ayudo a mis clientes a superar sus límites.',
      specialties: ['HIIT', 'Cardio', 'Running', 'Resistencia', 'Pérdida de Peso'],
      certifications: [
        'ACE Certified Personal Trainer',
        'Especialista en HIIT',
        'Entrenador de Maratón',
        'Primeros Auxilios CPR/AED'
      ],
      stats: {
        experience: '6 años',
        clients: '150+',
        rating: '4.8/5'
      },
      badge: 'Top Trainer',
      color: '#ef4444',
      available: true
    },
    {
      name: 'María González',
      title: 'Instructora de Baile y Zumba',
      icon: <FaMusic />,
      bio: 'Instructora certificada de Zumba y danza fitness. Mi misión es hacer que el ejercicio sea divertido y que cada clase sea una fiesta inolvidable.',
      specialties: ['Zumba', 'Baile', 'Salsa', 'Reggaeton', 'Dance Cardio'],
      certifications: [
        'Zumba Instructor Certificado',
        'Salsa Fitness Instructor',
        'Coreografía Fitness',
        'Group Fitness Instructor'
      ],
      stats: {
        experience: '5 años',
        clients: '300+',
        rating: '5.0/5'
      },
      badge: 'Estrella del Baile',
      color: '#ec4899',
      available: true
    },
    {
      name: 'Roberto Silva',
      title: 'Especialista en Cycling',
      icon: <FaBiking />,
      bio: 'Ciclista profesional y entrenador de spinning. Diseño entrenamientos de alta energía que te llevarán al límite mientras disfrutas cada pedalada.',
      specialties: ['Cycling', 'Spinning', 'Resistencia', 'Intervalos', 'Indoor Bike'],
      certifications: [
        'Spinning Instructor Certificado',
        'Cycling Coach Level 3',
        'Entrenamiento de Resistencia',
        'Técnica de Ciclismo'
      ],
      stats: {
        experience: '7 años',
        clients: '180+',
        rating: '4.9/5'
      },
      badge: 'Rey del Cycling',
      color: '#3b82f6',
      available: true
    },
    {
      name: 'Laura Martínez',
      title: 'Instructora de Yoga y Pilates',
      icon: <FaYinYang />,
      bio: 'Maestra certificada de Yoga y Pilates con enfoque en mindfulness y bienestar integral. Ayudo a conectar cuerpo, mente y espíritu.',
      specialties: ['Yoga', 'Pilates', 'Meditación', 'Flexibilidad', 'Mindfulness'],
      certifications: [
        'RYT 500 Yoga Instructor',
        'Pilates Mat & Reformer',
        'Meditación Mindfulness',
        'Yoga Terapéutico'
      ],
      stats: {
        experience: '10 años',
        clients: '250+',
        rating: '5.0/5'
      },
      badge: 'Maestra Yoga',
      color: '#8b5cf6',
      available: false
    },
    {
      name: 'Diego Fernández',
      title: 'Coach de Alto Rendimiento',
      icon: <FaMedal />,
      bio: 'Entrenador personal especializado en atletas y deportistas de alto rendimiento. Programas personalizados para alcanzar el máximo potencial.',
      specialties: ['Alto Rendimiento', 'Fuerza', 'Velocidad', 'Agilidad', 'Atletas'],
      certifications: [
        'CSCS Certified Strength Coach',
        'Performance Enhancement Specialist',
        'Olympic Weightlifting Coach',
        'Sports Nutrition'
      ],
      stats: {
        experience: '12 años',
        clients: '100+',
        rating: '5.0/5'
      },
      badge: 'Elite Coach',
      color: '#f59e0b',
      available: true
    }
  ]

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('')
  }

  return (
    <div className="trainers-page">
      {/* Header */}
      <section className="trainers-header">
        <div className="container">
          <h1>Nuestro <span>Equipo</span></h1>
          <p>Entrenadores certificados comprometidos con tu éxito</p>
        </div>
      </section>

      {/* Trainers Grid */}
      <section className="trainers-content">
        <div className="container">
          <div className="trainers-grid">
            {trainers.map((trainer, index) => (
              <div key={index} className="trainer-card-modern">
                {/* Header with Icon and Badge */}
                <div className="trainer-card-header-modern">
                  <div className="trainer-icon-container" style={{ background: `linear-gradient(135deg, ${trainer.color} 0%, ${trainer.color}dd 100%)` }}>
                    <div className="trainer-icon-large">
                      {trainer.icon}
                    </div>
                    <div className="trainer-initials">{getInitials(trainer.name)}</div>
                  </div>

                  <div className="trainer-header-info">
                    <div className="trainer-status-modern">
                      {trainer.available && <span className="status-dot-modern"></span>}
                      {trainer.available ? 'Disponible' : 'No disponible'}
                    </div>
                    <div className="trainer-badge-modern">{trainer.badge}</div>
                  </div>
                </div>

                {/* Main Info */}
                <div className="trainer-info-modern">
                  <h2 className="trainer-name-modern">{trainer.name}</h2>
                  <p className="trainer-title-modern">
                    <FaFire className="title-icon" />
                    {trainer.title}
                  </p>
                  <p className="trainer-bio-modern">{trainer.bio}</p>

                  {/* Stats Grid */}
                  <div className="trainer-stats-modern">
                    <div className="stat-item-modern">
                      <FaClock className="stat-icon" />
                      <div className="stat-content">
                        <span className="stat-value-modern">{trainer.stats.experience}</span>
                        <span className="stat-label-modern">Experiencia</span>
                      </div>
                    </div>
                    <div className="stat-item-modern">
                      <FaUsers className="stat-icon" />
                      <div className="stat-content">
                        <span className="stat-value-modern">{trainer.stats.clients}</span>
                        <span className="stat-label-modern">Clientes</span>
                      </div>
                    </div>
                    <div className="stat-item-modern">
                      <FaStar className="stat-icon" />
                      <div className="stat-content">
                        <span className="stat-value-modern">{trainer.stats.rating}</span>
                        <span className="stat-label-modern">Rating</span>
                      </div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="trainer-section">
                    <div className="section-title-modern">
                      <FaDumbbell className="section-icon" />
                      Especialidades
                    </div>
                    <div className="specialties-list-modern">
                      {trainer.specialties.map((specialty, idx) => (
                        <span key={idx} className="specialty-tag-modern" style={{ borderColor: trainer.color }}>
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="trainer-section">
                    <div className="section-title-modern">
                      <FaCheckCircle className="section-icon" />
                      Certificaciones
                    </div>
                    <div className="certifications-grid-modern">
                      {trainer.certifications.map((cert, idx) => (
                        <div key={idx} className="certification-item-modern">
                          <div className="cert-check" style={{ color: trainer.color }}>✓</div>
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Button */}
                  <button className="trainer-contact-modern" style={{ background: `linear-gradient(135deg, ${trainer.color} 0%, ${trainer.color}dd 100%)` }}>
                    <FaMedal />
                    Agendar Sesión
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Team Values */}
          <div className="team-values">
            <h2>Nuestros <span>Valores</span></h2>
            <p>
              En KHRONOS FITNESS creemos que cada persona merece un entrenador que no solo sea un experto
              en fitness, sino también un mentor, motivador y amigo. Nuestro equipo está comprometido con
              tu transformación y éxito.
            </p>

            <div className="values-grid">
              <div className="value-item">
                <div className="value-icon">🎓</div>
                <h3 className="value-title">Certificados y Profesionales</h3>
                <p className="value-description">
                  Todos nuestros entrenadores cuentan con certificaciones internacionales
                </p>
              </div>

              <div className="value-item">
                <div className="value-icon">❤️</div>
                <h3 className="value-title">Pasión por tu Éxito</h3>
                <p className="value-description">
                  Tu progreso es nuestra motivación. Celebramos cada logro contigo
                </p>
              </div>

              <div className="value-item">
                <div className="value-icon">👥</div>
                <h3 className="value-title">Atención Personalizada</h3>
                <p className="value-description">
                  Programas adaptados a tus necesidades, objetivos y nivel
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Trainers
