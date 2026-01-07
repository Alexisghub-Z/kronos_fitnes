import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAreasOpen, setIsAreasOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div>
          <Link to="/" className="navbar-logo">
            <span className="logo-highlight">KHRONOS</span> FITNESS
          </Link>
        </div>

        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" className="navbar-link" onClick={() => setIsOpen(false)}>
              Inicio
            </Link>
          </li>

          <li className="navbar-dropdown">
            <button
              className="navbar-link navbar-dropdown-toggle"
              onClick={() => setIsAreasOpen(!isAreasOpen)}
            >
              Áreas <span className="dropdown-arrow">{isAreasOpen ? '▲' : '▼'}</span>
            </button>
            {isAreasOpen && (
              <ul className="navbar-dropdown-menu">
                <li>
                  <Link to="/areas/pesas" className="navbar-dropdown-link" onClick={() => { setIsOpen(false); setIsAreasOpen(false); }}>
                    🏋️ Zona de Pesas
                  </Link>
                </li>
                <li>
                  <Link to="/areas/cardio" className="navbar-dropdown-link" onClick={() => { setIsOpen(false); setIsAreasOpen(false); }}>
                    ❤️ Cardio
                  </Link>
                </li>
                <li>
                  <Link to="/areas/cycling" className="navbar-dropdown-link" onClick={() => { setIsOpen(false); setIsAreasOpen(false); }}>
                    🚴 Cycling
                  </Link>
                </li>
                <li>
                  <Link to="/areas/baile" className="navbar-dropdown-link" onClick={() => { setIsOpen(false); setIsAreasOpen(false); }}>
                    💃 Baile & Zumba
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/entrenadores" className="navbar-link" onClick={() => setIsOpen(false)}>
              Entrenadores
            </Link>
          </li>

          <li>
            <Link to="/horarios" className="navbar-link" onClick={() => setIsOpen(false)}>
              Horarios
            </Link>
          </li>

          <li>
            <Link to="/galeria" className="navbar-link" onClick={() => setIsOpen(false)}>
              Galería
            </Link>
          </li>

          <li>
            <button onClick={() => scrollToSection('pricing')} className="navbar-link">
              Planes
            </button>
          </li>

          <li>
            <Link to="/reservar" className="navbar-cta" onClick={() => setIsOpen(false)}>
              Reservar Clase
            </Link>
          </li>
        </ul>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="navbar-toggle"
        >
          <svg stroke="currentColor" fill="none" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
