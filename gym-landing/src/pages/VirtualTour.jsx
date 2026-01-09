import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaDumbbell, FaRunning, FaUsers, FaShower, FaParking,
  FaChevronLeft, FaChevronRight, FaTimes, FaExpand,
  FaHeart, FaBiking, FaSwimmer, FaCoffee
} from 'react-icons/fa'
import '../styles/VirtualTour.css'

const VirtualTour = () => {
  const [selectedArea, setSelectedArea] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const tourAreas = [
    {
      id: 1,
      name: 'Zona de Pesas',
      icon: <FaDumbbell />,
      description: 'Área equipada con mancuernas, barras olímpicas y máquinas de última generación para entrenamiento de fuerza.',
      features: ['Mancuernas 1-50kg', 'Racks de Squat', 'Bancos ajustables', 'Máquinas de cable'],
      images: [
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200',
        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200',
        'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1200'
      ],
      color: '#7ED321'
    },
    {
      id: 2,
      name: 'Zona de Cardio',
      icon: <FaRunning />,
      description: 'Moderna área de cardio con caminadoras, elípticas y bicicletas con pantallas individuales de entretenimiento.',
      features: ['20 Caminadoras', 'Elípticas', 'Bicicletas estáticas', 'Pantallas HD'],
      images: [
        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200',
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200',
        'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200'
      ],
      color: '#ef4444'
    },
    {
      id: 3,
      name: 'Salón de Clases Grupales',
      icon: <FaUsers />,
      description: 'Amplio salón con piso acolchado, espejos de pared a pared y sistema de sonido profesional para nuestras clases.',
      features: ['150m² de espacio', 'Sistema de sonido Bose', 'Piso acolchado', 'Aire acondicionado'],
      images: [
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200',
        'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=1200',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200'
      ],
      color: '#ec4899'
    },
    {
      id: 4,
      name: 'Zona Funcional',
      icon: <FaHeart />,
      description: 'Espacio dedicado al entrenamiento funcional con equipamiento especializado y área libre para ejercicios.',
      features: ['TRX', 'Kettlebells', 'Plyo boxes', 'Battle ropes'],
      images: [
        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200',
        'https://images.unsplash.com/photo-1581009137042-c552e485697a?w=1200',
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200'
      ],
      color: '#f59e0b'
    },
    {
      id: 5,
      name: 'Zona de Spinning',
      icon: <FaBiking />,
      description: 'Sala exclusiva de spinning con 30 bicicletas de alta gama, iluminación LED y música envolvente.',
      features: ['30 Bicicletas profesionales', 'Iluminación LED', 'Sistema de sonido', 'Ventilación avanzada'],
      images: [
        'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?w=1200',
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200',
        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200'
      ],
      color: '#3b82f6'
    },
    {
      id: 6,
      name: 'Vestidores y Duchas',
      icon: <FaShower />,
      description: 'Vestidores amplios y modernos con lockers de cortesía, duchas individuales y área de grooming.',
      features: ['Lockers seguros', 'Duchas privadas', 'Secadores de pelo', 'Productos de higiene'],
      images: [
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200',
        'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1200',
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200'
      ],
      color: '#8b5cf6'
    },
    {
      id: 7,
      name: 'Juice Bar',
      icon: <FaCoffee />,
      description: 'Espacio de relajación con barra de jugos, smoothies proteicos y snacks saludables.',
      features: ['Jugos naturales', 'Smoothies proteicos', 'Snacks fitness', 'Café orgánico'],
      images: [
        'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200',
        'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=1200',
        'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200'
      ],
      color: '#10b981'
    },
    {
      id: 8,
      name: 'Estacionamiento',
      icon: <FaParking />,
      description: 'Amplio estacionamiento techado con seguridad 24/7 y espacios reservados para miembros.',
      features: ['150 espacios', 'Techado', 'Seguridad 24/7', 'Cámaras de vigilancia'],
      images: [
        'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=1200',
        'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1200',
        'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=1200'
      ],
      color: '#6b7280'
    }
  ]

  const currentArea = tourAreas[selectedArea]
  const totalImages = currentArea.images.length

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % totalImages)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + totalImages) % totalImages)
  }

  const nextArea = () => {
    setSelectedArea((prev) => (prev + 1) % tourAreas.length)
    setSelectedImage(0)
  }

  const prevArea = () => {
    setSelectedArea((prev) => (prev - 1 + tourAreas.length) % tourAreas.length)
    setSelectedImage(0)
  }

  return (
    <div className="virtual-tour-page">
      {/* Header */}
      <section className="tour-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>Tour <span>Virtual</span></h1>
            <p>Explora nuestras instalaciones desde la comodidad de tu hogar</p>
          </motion.div>
        </div>
      </section>

      {/* Main Tour */}
      <section className="tour-content">
        <div className="container">
          {/* Area Selector */}
          <div className="area-selector">
            <button className="selector-nav prev" onClick={prevArea}>
              <FaChevronLeft />
            </button>

            <div className="area-selector-scroll">
              {tourAreas.map((area, index) => (
                <motion.button
                  key={area.id}
                  className={`area-btn ${selectedArea === index ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedArea(index)
                    setSelectedImage(0)
                  }}
                  style={{
                    borderColor: selectedArea === index ? area.color : 'transparent'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className="area-icon"
                    style={{
                      background: selectedArea === index
                        ? `linear-gradient(135deg, ${area.color} 0%, ${area.color}dd 100%)`
                        : 'rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    {area.icon}
                  </div>
                  <span>{area.name}</span>
                </motion.button>
              ))}
            </div>

            <button className="selector-nav next" onClick={nextArea}>
              <FaChevronRight />
            </button>
          </div>

          {/* Main Viewer */}
          <div className="tour-viewer">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedArea}-${selectedImage}`}
                className="viewer-main"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={currentArea.images[selectedImage]}
                  alt={`${currentArea.name} - Vista ${selectedImage + 1}`}
                  className="main-image"
                />

                <button
                  className="fullscreen-btn"
                  onClick={() => setIsFullscreen(true)}
                >
                  <FaExpand />
                </button>

                <button className="image-nav prev" onClick={prevImage}>
                  <FaChevronLeft />
                </button>

                <button className="image-nav next" onClick={nextImage}>
                  <FaChevronRight />
                </button>

                <div className="image-counter">
                  {selectedImage + 1} / {totalImages}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Thumbnails */}
            <div className="thumbnails">
              {currentArea.images.map((img, index) => (
                <motion.button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img src={img} alt={`Vista ${index + 1}`} />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Area Info */}
          <motion.div
            key={selectedArea}
            className="area-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="area-info-header">
              <div
                className="area-info-icon"
                style={{ background: `linear-gradient(135deg, ${currentArea.color} 0%, ${currentArea.color}dd 100%)` }}
              >
                {currentArea.icon}
              </div>
              <div>
                <h2>{currentArea.name}</h2>
                <p>{currentArea.description}</p>
              </div>
            </div>

            <div className="area-features">
              <h3>Características:</h3>
              <div className="features-grid">
                {currentArea.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="feature-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="feature-bullet" style={{ backgroundColor: currentArea.color }}></div>
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fullscreen-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreen(false)}
          >
            <button className="close-fullscreen" onClick={() => setIsFullscreen(false)}>
              <FaTimes />
            </button>

            <motion.img
              src={currentArea.images[selectedImage]}
              alt={currentArea.name}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            />

            <button className="fullscreen-nav prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
              <FaChevronLeft />
            </button>

            <button className="fullscreen-nav next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
              <FaChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="tour-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>¿Te gustó lo que viste?</h2>
            <p>Ven a conocernos en persona y disfruta de un día de prueba gratuito</p>
            <div className="cta-buttons">
              <button className="btn-primary-large">Agendar Visita</button>
              <button className="btn-secondary-large">Ver Planes</button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default VirtualTour
