import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronLeft, FaChevronRight, FaPercent, FaClock, FaTag } from 'react-icons/fa'
import usePromotionsStore from '../stores/promotionsStore'
import '../styles/PromotionsBanner.css'

const PromotionsBanner = () => {
  const { getActivePromotions } = usePromotionsStore()
  const activePromotions = getActivePromotions()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (activePromotions.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activePromotions.length)
    }, 5000) // Cambiar cada 5 segundos

    return () => clearInterval(interval)
  }, [activePromotions.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % activePromotions.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + activePromotions.length) % activePromotions.length)
  }

  if (activePromotions.length === 0) return null

  const currentPromo = activePromotions[currentIndex]

  const daysRemaining = Math.ceil(
    (new Date(currentPromo.endDate) - new Date()) / (1000 * 60 * 60 * 24)
  )

  return (
    <section className="promotions-banner">
      <div className="container">
        <div className="banner-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="promo-banner"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="promo-banner-icon">
                {currentPromo.image}
              </div>

              <div className="promo-banner-content">
                <div className="promo-type-badge">
                  {currentPromo.type === 'flash' && (
                    <><FaClock /> Oferta Flash</>
                  )}
                  {currentPromo.type === 'referral' && (
                    <><FaTag /> Programa de Referidos</>
                  )}
                  {currentPromo.type === 'discount' && (
                    <><FaPercent /> Descuento Especial</>
                  )}
                </div>

                <h2>{currentPromo.title}</h2>
                <p>{currentPromo.description}</p>

                <div className="promo-banner-details">
                  <div className="promo-discount">
                    <span className="discount-value">{currentPromo.discount}</span>
                    <span className="discount-label">de descuento</span>
                  </div>

                  <div className="promo-code">
                    <span className="code-label">Código:</span>
                    <span className="code-value">{currentPromo.code}</span>
                  </div>

                  <div className="promo-timer">
                    <FaClock />
                    <span>{daysRemaining} día{daysRemaining !== 1 ? 's' : ''} restantes</span>
                  </div>
                </div>

                <button className="btn-promo">
                  Aprovechar Oferta
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {activePromotions.length > 1 && (
            <>
              <button className="banner-nav prev" onClick={prevSlide}>
                <FaChevronLeft />
              </button>
              <button className="banner-nav next" onClick={nextSlide}>
                <FaChevronRight />
              </button>

              <div className="banner-indicators">
                {activePromotions.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default PromotionsBanner
