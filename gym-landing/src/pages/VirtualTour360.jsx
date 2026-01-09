import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaDumbbell, FaRunning, FaUsers, FaShower, FaParking,
  FaHeart, FaBiking, FaCoffee, FaExpand, FaCompress,
  FaInfoCircle, FaTimes, FaMapMarkerAlt
} from 'react-icons/fa'
import '../styles/VirtualTour360.css'

const VirtualTour360 = () => {
  const viewerRef = useRef(null)
  const [viewer, setViewer] = useState(null)
  const [currentScene, setCurrentScene] = useState('pesas')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Definición de escenas con imágenes panorámicas 360°
  const scenes = {
    pesas: {
      id: 'pesas',
      title: 'Zona de Pesas',
      icon: <FaDumbbell />,
      color: '#7ED321',
      // Para producción: usar imagen panorámica 360° real
      // Por ahora simulamos con una imagen equirectangular
      panorama: 'https://pannellum.org/images/alma.jpg',
      description: 'Área completamente equipada con mancuernas, barras olímpicas y máquinas de última generación.',
      pitch: -10,
      yaw: 180,
      hotSpots: [
        {
          pitch: -5,
          yaw: 180,
          type: 'info',
          text: 'Racks de Squat y Bancos Ajustables',
          icon: '🏋️'
        },
        {
          pitch: 0,
          yaw: 90,
          type: 'scene',
          text: 'Ir a Zona de Cardio',
          sceneId: 'cardio',
          icon: '→'
        },
        {
          pitch: -10,
          yaw: 270,
          type: 'info',
          text: 'Mancuernas 1-50kg',
          icon: '💪'
        }
      ]
    },
    cardio: {
      id: 'cardio',
      title: 'Zona de Cardio',
      icon: <FaRunning />,
      color: '#ef4444',
      panorama: 'https://pannellum.org/images/bma-0.jpg',
      description: 'Moderna área de cardio con caminadoras, elípticas y bicicletas con pantallas individuales.',
      pitch: -5,
      yaw: 0,
      hotSpots: [
        {
          pitch: 0,
          yaw: 90,
          type: 'scene',
          text: 'Ir a Salón de Clases',
          sceneId: 'clases',
          icon: '→'
        },
        {
          pitch: 0,
          yaw: 270,
          type: 'scene',
          text: 'Volver a Zona de Pesas',
          sceneId: 'pesas',
          icon: '←'
        },
        {
          pitch: -15,
          yaw: 0,
          type: 'info',
          text: '20 Caminadoras con Pantallas HD',
          icon: '📺'
        }
      ]
    },
    clases: {
      id: 'clases',
      title: 'Salón de Clases Grupales',
      icon: <FaUsers />,
      color: '#ec4899',
      panorama: 'https://pannellum.org/images/bma-1.jpg',
      description: 'Amplio salón con piso acolchado y sistema de sonido profesional.',
      pitch: 0,
      yaw: 180,
      hotSpots: [
        {
          pitch: 0,
          yaw: 180,
          type: 'scene',
          text: 'Ir a Zona Funcional',
          sceneId: 'funcional',
          icon: '→'
        },
        {
          pitch: 0,
          yaw: 90,
          type: 'scene',
          text: 'Volver a Cardio',
          sceneId: 'cardio',
          icon: '←'
        },
        {
          pitch: -10,
          yaw: 270,
          type: 'info',
          text: 'Sistema de sonido Bose',
          icon: '🔊'
        }
      ]
    },
    funcional: {
      id: 'funcional',
      title: 'Zona Funcional',
      icon: <FaHeart />,
      color: '#f59e0b',
      panorama: 'https://pannellum.org/images/bma-2.jpg',
      description: 'Espacio dedicado al entrenamiento funcional con equipamiento especializado.',
      pitch: -5,
      yaw: 90,
      hotSpots: [
        {
          pitch: 0,
          yaw: 0,
          type: 'scene',
          text: 'Ir a Spinning',
          sceneId: 'spinning',
          icon: '→'
        },
        {
          pitch: 0,
          yaw: 180,
          type: 'scene',
          text: 'Volver a Salón de Clases',
          sceneId: 'clases',
          icon: '←'
        },
        {
          pitch: -10,
          yaw: 90,
          type: 'info',
          text: 'TRX, Kettlebells y Battle Ropes',
          icon: '⚡'
        }
      ]
    },
    spinning: {
      id: 'spinning',
      title: 'Zona de Spinning',
      icon: <FaBiking />,
      color: '#3b82f6',
      panorama: 'https://pannellum.org/images/bma-3.jpg',
      description: 'Sala exclusiva con 30 bicicletas profesionales e iluminación LED.',
      pitch: 0,
      yaw: 270,
      hotSpots: [
        {
          pitch: 0,
          yaw: 90,
          type: 'scene',
          text: 'Ir a Vestidores',
          sceneId: 'vestidores',
          icon: '→'
        },
        {
          pitch: 0,
          yaw: 270,
          type: 'scene',
          text: 'Volver a Funcional',
          sceneId: 'funcional',
          icon: '←'
        },
        {
          pitch: -15,
          yaw: 0,
          type: 'info',
          text: '30 Bicicletas Profesionales',
          icon: '🚴'
        }
      ]
    },
    vestidores: {
      id: 'vestidores',
      title: 'Vestidores y Duchas',
      icon: <FaShower />,
      color: '#8b5cf6',
      panorama: 'https://pannellum.org/images/bma-4.jpg',
      description: 'Vestidores amplios con lockers seguros y duchas privadas.',
      pitch: -5,
      yaw: 0,
      hotSpots: [
        {
          pitch: 0,
          yaw: 90,
          type: 'scene',
          text: 'Ir a Juice Bar',
          sceneId: 'juicebar',
          icon: '→'
        },
        {
          pitch: 0,
          yaw: 270,
          type: 'scene',
          text: 'Volver a Spinning',
          sceneId: 'spinning',
          icon: '←'
        },
        {
          pitch: -10,
          yaw: 180,
          type: 'info',
          text: 'Duchas Privadas',
          icon: '🚿'
        }
      ]
    },
    juicebar: {
      id: 'juicebar',
      title: 'Juice Bar',
      icon: <FaCoffee />,
      color: '#10b981',
      panorama: 'https://pannellum.org/images/bma-5.jpg',
      description: 'Espacio de relajación con jugos naturales y smoothies proteicos.',
      pitch: 0,
      yaw: 180,
      hotSpots: [
        {
          pitch: 0,
          yaw: 0,
          type: 'scene',
          text: 'Ir a Estacionamiento',
          sceneId: 'estacionamiento',
          icon: '→'
        },
        {
          pitch: 0,
          yaw: 180,
          type: 'scene',
          text: 'Volver a Vestidores',
          sceneId: 'vestidores',
          icon: '←'
        },
        {
          pitch: -15,
          yaw: 90,
          type: 'info',
          text: 'Smoothies y Café Orgánico',
          icon: '☕'
        }
      ]
    },
    estacionamiento: {
      id: 'estacionamiento',
      title: 'Estacionamiento',
      icon: <FaParking />,
      color: '#6b7280',
      panorama: 'https://pannellum.org/images/bma-6.jpg',
      description: 'Amplio estacionamiento techado con seguridad 24/7.',
      pitch: -10,
      yaw: 0,
      hotSpots: [
        {
          pitch: 0,
          yaw: 180,
          type: 'scene',
          text: 'Volver a Entrada',
          sceneId: 'pesas',
          icon: '←'
        },
        {
          pitch: 0,
          yaw: 270,
          type: 'scene',
          text: 'Volver a Juice Bar',
          sceneId: 'juicebar',
          icon: '←'
        },
        {
          pitch: -5,
          yaw: 90,
          type: 'info',
          text: '150 Espacios con Seguridad 24/7',
          icon: '🅿️'
        }
      ]
    }
  }

  useEffect(() => {
    // Cargar el script de Pannellum dinámicamente
    const loadPannellum = async () => {
      setIsLoading(true)

      // Cargar CSS de Pannellum
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css'
      document.head.appendChild(link)

      // Cargar JS de Pannellum
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js'
      script.async = true

      script.onload = () => {
        initViewer()
      }

      document.body.appendChild(script)

      return () => {
        document.head.removeChild(link)
        document.body.removeChild(script)
      }
    }

    loadPannellum()
  }, [])

  const initViewer = () => {
    if (window.pannellum && viewerRef.current) {
      const newViewer = window.pannellum.viewer(viewerRef.current, {
        default: {
          firstScene: 'pesas',
          sceneFadeDuration: 1000,
          autoLoad: true
        },
        scenes: Object.fromEntries(
          Object.entries(scenes).map(([key, scene]) => [
            key,
            {
              title: scene.title,
              type: 'equirectangular',
              panorama: scene.panorama,
              pitch: scene.pitch,
              yaw: scene.yaw,
              hotSpots: scene.hotSpots.map(hotspot => ({
                ...hotspot,
                cssClass: hotspot.type === 'scene' ? 'custom-hotspot scene-hotspot' : 'custom-hotspot info-hotspot',
                createTooltipFunc: hotspot.type === 'info'
                  ? (hotSpotDiv) => {
                      hotSpotDiv.classList.add('info-tooltip')
                      hotSpotDiv.innerHTML = `<div class="hotspot-content"><span class="hotspot-icon">${hotspot.icon}</span><span>${hotspot.text}</span></div>`
                    }
                  : (hotSpotDiv) => {
                      hotSpotDiv.classList.add('scene-tooltip')
                      hotSpotDiv.innerHTML = `<div class="hotspot-content"><span class="hotspot-icon">${hotspot.icon}</span><span>${hotspot.text}</span></div>`
                    },
                clickHandlerFunc: hotspot.type === 'scene'
                  ? () => loadScene(hotspot.sceneId)
                  : undefined
              }))
            }
          ])
        )
      })

      newViewer.on('load', () => {
        setIsLoading(false)
      })

      setViewer(newViewer)
    }
  }

  const loadScene = (sceneId) => {
    if (viewer) {
      viewer.loadScene(sceneId)
      setCurrentScene(sceneId)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const scenesList = Object.values(scenes)
  const currentSceneData = scenes[currentScene]

  return (
    <div className="virtual-tour-360-page">
      {/* Header */}
      <section className="tour-360-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>Tour Virtual <span>360°</span></h1>
            <p>Explora nuestras instalaciones con vista panorámica interactiva</p>
          </motion.div>
        </div>
      </section>

      {/* Main Viewer */}
      <section className="tour-360-content">
        <div className="container">
          <div className="viewer-wrapper">
            {/* Loading */}
            {isLoading && (
              <div className="viewer-loading">
                <div className="loading-spinner"></div>
                <p>Cargando vista 360°...</p>
              </div>
            )}

            {/* Pannellum Viewer */}
            <div ref={viewerRef} className="pannellum-viewer" />

            {/* Controls Overlay */}
            <div className="viewer-controls">
              <div className="control-top">
                <div className="current-scene-info">
                  <div
                    className="scene-icon-badge"
                    style={{ background: currentSceneData.color }}
                  >
                    {currentSceneData.icon}
                  </div>
                  <div>
                    <h3>{currentSceneData.title}</h3>
                    <p>{currentSceneData.description}</p>
                  </div>
                </div>

                <div className="control-buttons">
                  <button
                    className="control-btn"
                    onClick={() => setShowInfo(!showInfo)}
                    title="Información"
                  >
                    <FaInfoCircle />
                  </button>
                  <button
                    className="control-btn"
                    onClick={toggleFullscreen}
                    title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
                  >
                    {isFullscreen ? <FaCompress /> : <FaExpand />}
                  </button>
                </div>
              </div>

              {/* Help Instructions */}
              <div className="control-help">
                <div className="help-item">
                  <span className="help-icon">🖱️</span>
                  <span>Arrastra para mirar alrededor</span>
                </div>
                <div className="help-item">
                  <span className="help-icon">🔍</span>
                  <span>Rueda del mouse para zoom</span>
                </div>
                <div className="help-item">
                  <span className="help-icon">👆</span>
                  <span>Haz clic en los puntos para navegar</span>
                </div>
              </div>
            </div>

            {/* Scene Selector */}
            <div className="scene-selector-360">
              <button
                className="selector-toggle"
                onClick={() => document.querySelector('.scene-selector-360').classList.toggle('expanded')}
              >
                <FaMapMarkerAlt /> Áreas ({scenesList.length})
              </button>

              <div className="scene-list">
                {scenesList.map((scene) => (
                  <button
                    key={scene.id}
                    className={`scene-item ${currentScene === scene.id ? 'active' : ''}`}
                    onClick={() => loadScene(scene.id)}
                    style={{
                      borderColor: currentScene === scene.id ? scene.color : 'transparent'
                    }}
                  >
                    <div
                      className="scene-item-icon"
                      style={{
                        background: currentScene === scene.id
                          ? scene.color
                          : 'rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      {scene.icon}
                    </div>
                    <span>{scene.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Info Panel */}
          {showInfo && (
            <motion.div
              className="info-panel"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
            >
              <div className="info-panel-header">
                <h3>Cómo usar el Tour 360°</h3>
                <button onClick={() => setShowInfo(false)}>
                  <FaTimes />
                </button>
              </div>

              <div className="info-panel-content">
                <div className="info-section">
                  <h4>Navegación</h4>
                  <ul>
                    <li>Haz clic y arrastra para mirar alrededor</li>
                    <li>Usa la rueda del mouse o pellizca para hacer zoom</li>
                    <li>Haz clic en los puntos azules para moverte entre áreas</li>
                    <li>Haz clic en los puntos verdes para ver información</li>
                  </ul>
                </div>

                <div className="info-section">
                  <h4>Tipos de Puntos</h4>
                  <div className="hotspot-types">
                    <div className="hotspot-example scene">
                      <span className="example-dot">→</span>
                      <span>Navegación entre áreas</span>
                    </div>
                    <div className="hotspot-example info">
                      <span className="example-dot">ℹ️</span>
                      <span>Información adicional</span>
                    </div>
                  </div>
                </div>

                <div className="info-section">
                  <h4>Consejos</h4>
                  <ul>
                    <li>Usa el menú lateral para saltar rápidamente entre áreas</li>
                    <li>Presiona F11 para experiencia inmersiva completa</li>
                    <li>Funciona mejor en computadora o tablet</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="tour-360-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>¿Te gustó el tour virtual?</h2>
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

export default VirtualTour360
