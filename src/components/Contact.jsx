import { useState } from 'react'
import '../styles/Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('¡Gracias por tu interés! Te contactaremos pronto.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">
          Comienza Tu <span>Transformación</span>
        </h2>
        <p className="section-subtitle">
          Contáctanos hoy y recibe 7 días gratis para probar nuestras instalaciones
        </p>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-info-card">
              <div className="contact-info-content">
                <div className="contact-info-icon">📍</div>
                <div className="contact-info-text">
                  <h3>Ubicación</h3>
                  <p>Av. Principal #123, Centro<br />Ciudad, CP 12345</p>
                </div>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-content">
                <div className="contact-info-icon">📞</div>
                <div className="contact-info-text">
                  <h3>Teléfono</h3>
                  <p>+1 (555) 123-4567<br />Lun - Dom: 24/7</p>
                </div>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-content">
                <div className="contact-info-icon">✉️</div>
                <div className="contact-info-text">
                  <h3>Email</h3>
                  <p>info@fitzone.com<br />Respuesta en menos de 24h</p>
                </div>
              </div>
            </div>

            <div className="contact-social">
              <h3>Síguenos</h3>
              <div className="contact-social-icons">
                <button className="contact-social-icon">
                  <span>📘</span>
                </button>
                <button className="contact-social-icon">
                  <span>📷</span>
                </button>
                <button className="contact-social-icon">
                  <span>🐦</span>
                </button>
                <button className="contact-social-icon">
                  <span>💼</span>
                </button>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Nombre Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="¿En qué te podemos ayudar?"
                ></textarea>
              </div>

              <button type="submit" className="contact-form-submit">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
