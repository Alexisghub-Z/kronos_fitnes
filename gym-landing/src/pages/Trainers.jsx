import '../styles/Trainers.css'

const Trainers = () => {
  const trainers = [
    {
      name: 'Ana Rodríguez',
      title: 'Especialista en Fuerza y Acondicionamiento',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400',
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
      available: true
    },
    {
      name: 'Carlos Méndez',
      title: 'Experto en Cardio y HIIT',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400',
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
      available: true
    },
    {
      name: 'María González',
      title: 'Instructora de Baile y Zumba',
      image: 'https://images.unsplash.com/photo-1583468982228-19f19164aee2?q=80&w=400',
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
      available: true
    },
    {
      name: 'Roberto Silva',
      title: 'Especialista en Cycling',
      image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=400',
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
      available: true
    },
    {
      name: 'Laura Martínez',
      title: 'Instructora de Yoga y Pilates',
      image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=400',
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
      available: false
    },
    {
      name: 'Diego Fernández',
      title: 'Coach de Alto Rendimiento',
      image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=400',
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
      available: true
    }
  ]

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
              <div key={index} className="trainer-card">
                <div className="trainer-image-container">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="trainer-image"
                  />
                  <div className="trainer-badge">{trainer.badge}</div>
                  <div className="trainer-status">
                    {trainer.available && <span className="status-dot"></span>}
                    {trainer.available ? 'Disponible' : 'No disponible'}
                  </div>
                </div>

                <div className="trainer-info">
                  <h2 className="trainer-name">{trainer.name}</h2>
                  <p className="trainer-title">{trainer.title}</p>
                  <p className="trainer-bio">{trainer.bio}</p>

                  {/* Stats */}
                  <div className="trainer-stats">
                    <div className="stat-item">
                      <span className="stat-value">{trainer.stats.experience}</span>
                      <span className="stat-label">Experiencia</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">{trainer.stats.clients}</span>
                      <span className="stat-label">Clientes</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">{trainer.stats.rating}</span>
                      <span className="stat-label">Rating</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="trainer-specialties">
                    <div className="specialties-title">
                      🎯 Especialidades
                    </div>
                    <div className="specialties-list">
                      {trainer.specialties.map((specialty, idx) => (
                        <span key={idx} className="specialty-tag">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="trainer-certifications">
                    <div className="certifications-title">
                      🏆 Certificaciones
                    </div>
                    <ul className="certifications-list">
                      {trainer.certifications.map((cert, idx) => (
                        <li key={idx} className="certification-item">
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact Button */}
                  <button className="trainer-contact">
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
