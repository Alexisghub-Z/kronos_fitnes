import { useState } from 'react'
import '../styles/Gallery.css'

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('todas')

  const galleryImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
      category: 'pesas',
      title: 'Zona de Pesas',
      description: 'Equipamiento de última generación'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800',
      category: 'pesas',
      title: 'Área de Peso Libre',
      description: 'Espacio amplio para entrenamientos funcionales'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800',
      category: 'cardio',
      title: 'Zona de Cardio',
      description: 'Caminadoras y equipos de cardio modernos'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800',
      category: 'cardio',
      title: 'Área de Running',
      description: 'Vista panorámica mientras entrenas'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=800',
      category: 'cycling',
      title: 'Sala de Cycling',
      description: 'Ambiente energético con iluminación LED'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1590556409324-aa1d726e5c3c?q=80&w=800',
      category: 'cycling',
      title: 'Bicis Premium',
      description: 'Tecnología de monitoreo en tiempo real'
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800',
      category: 'baile',
      title: 'Sala de Baile',
      description: 'Espacio amplio con sistema de sonido profesional'
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=800',
      category: 'baile',
      title: 'Clase de Zumba',
      description: 'Diversión y energía en cada sesión'
    },
    {
      id: 9,
      url: 'https://images.unsplash.com/photo-1558017487-06bf9f82613a?q=80&w=800',
      category: 'instalaciones',
      title: 'Entrada Principal',
      description: 'Recepción moderna y acogedora'
    },
    {
      id: 10,
      url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
      category: 'instalaciones',
      title: 'Vestuarios',
      description: 'Instalaciones limpias y modernas'
    },
    {
      id: 11,
      url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800',
      category: 'instalaciones',
      title: 'Área de Descanso',
      description: 'Zona cómoda para relajarte después del entrenamiento'
    },
    {
      id: 12,
      url: 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?q=80&w=800',
      category: 'clases',
      title: 'Entrenamiento Grupal',
      description: 'Clases motivadoras con instructores profesionales'
    },
    {
      id: 13,
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800',
      category: 'clases',
      title: 'Sesión Personal',
      description: 'Entrenamiento personalizado uno a uno'
    },
    {
      id: 14,
      url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800',
      category: 'clases',
      title: 'Yoga & Mindfulness',
      description: 'Encuentra tu equilibrio interior'
    },
    {
      id: 15,
      url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800',
      category: 'eventos',
      title: 'Eventos Especiales',
      description: 'Competencias y actividades comunitarias'
    },
    {
      id: 16,
      url: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=800',
      category: 'eventos',
      title: 'Celebraciones',
      description: 'Festejamos tus logros con toda la comunidad'
    }
  ]

  const categories = [
    { id: 'todas', name: 'Todas', icon: '🏢' },
    { id: 'pesas', name: 'Pesas', icon: '🏋️' },
    { id: 'cardio', name: 'Cardio', icon: '❤️' },
    { id: 'cycling', name: 'Cycling', icon: '🚴' },
    { id: 'baile', name: 'Baile', icon: '💃' },
    { id: 'clases', name: 'Clases', icon: '👥' },
    { id: 'instalaciones', name: 'Instalaciones', icon: '🏛️' },
    { id: 'eventos', name: 'Eventos', icon: '🎉' }
  ]

  const filteredImages = selectedCategory === 'todas'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory)

  return (
    <div className="gallery-page">
      {/* Header */}
      <section className="gallery-header">
        <div className="container">
          <h1>Nuestra <span>Galería</span></h1>
          <p>Conoce nuestras instalaciones y vive la experiencia KHRONOS</p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="gallery-filters">
        <div className="container">
          <div className="filters-wrapper">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="filter-icon">{category.icon}</span>
                <span className="filter-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-content">
        <div className="container">
          <div className="gallery-grid">
            {filteredImages.map((image) => (
              <div key={image.id} className="gallery-item">
                <div className="gallery-image-wrapper">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="gallery-image"
                    loading="lazy"
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-info">
                      <h3 className="gallery-title">{image.title}</h3>
                      <p className="gallery-description">{image.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="no-results">
              <p>No se encontraron imágenes en esta categoría</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="gallery-cta">
        <div className="container">
          <div className="cta-content">
            <h2>¿Listo para Comenzar tu Transformación?</h2>
            <p>Agenda una visita guiada y conoce todas nuestras instalaciones en persona</p>
            <div className="cta-buttons">
              <button className="btn-primary">Agendar Visita</button>
              <button className="btn-secondary">Obtener Membresía</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Gallery
