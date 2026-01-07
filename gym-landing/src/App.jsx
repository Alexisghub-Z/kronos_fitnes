import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Pesas from './pages/Areas/Pesas'
import Cardio from './pages/Areas/Cardio'
import Cycling from './pages/Areas/Cycling'
import Baile from './pages/Areas/Baile'
import Trainers from './pages/Trainers'
import Schedule from './pages/Schedule'
import Gallery from './pages/Gallery'
// Páginas adicionales - próximamente
// import Booking from './pages/Booking'
// import Checkout from './pages/Checkout'
// import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Rutas de áreas del gym */}
            <Route path="/areas/pesas" element={<Pesas />} />
            <Route path="/areas/cardio" element={<Cardio />} />
            <Route path="/areas/cycling" element={<Cycling />} />
            <Route path="/areas/baile" element={<Baile />} />
            {/* Páginas principales */}
            <Route path="/entrenadores" element={<Trainers />} />
            <Route path="/horarios" element={<Schedule />} />
            <Route path="/galeria" element={<Gallery />} />
            {/* Otras rutas - próximamente */}
            {/* <Route path="/reservar" element={<Booking />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/mi-cuenta" element={<Dashboard />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
