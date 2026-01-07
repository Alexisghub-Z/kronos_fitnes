import '../styles/Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">
              <span className="logo-highlight">KHRONOS</span> FITNESS
            </h3>
            <p>Healthy Center - Tu destino para una vida más saludable y activa.</p>
            <div className="footer-social">
              <button className="footer-social-icon">
                <span>📘</span>
              </button>
              <button className="footer-social-icon">
                <span>📷</span>
              </button>
              <button className="footer-social-icon">
                <span>🐦</span>
              </button>
            </div>
          </div>

          <div className="footer-section">
            <h4>Enlaces Rápidos</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}>
                  Servicios
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}>
                  Planes
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                  Contacto
                </button>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Horarios</h4>
            <ul className="footer-hours">
              <li>Lunes - Viernes: 24/7</li>
              <li>Sábado: 24/7</li>
              <li>Domingo: 24/7</li>
              <li className="highlight">¡Abierto todo el tiempo!</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><a href="#">Términos y Condiciones</a></li>
              <li><a href="#">Política de Privacidad</a></li>
              <li><a href="#">Política de Cancelación</a></li>
              <li><a href="#">Reglamento Interno</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 KHRONOS FITNESS. Todos los derechos reservados.</p>
          <p>Hecho con ❤️ para tu salud</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
