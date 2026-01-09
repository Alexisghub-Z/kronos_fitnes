import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Home from './pages/Home'
import Pesas from './pages/Areas/Pesas'
import Cardio from './pages/Areas/Cardio'
import Cycling from './pages/Areas/Cycling'
import Baile from './pages/Areas/Baile'
import Trainers from './pages/Trainers'
import Schedule from './pages/Schedule'
import Gallery from './pages/Gallery'
import VirtualTour360 from './pages/VirtualTour360'
import Dashboard from './pages/user/Dashboard'
import Checkout from './pages/checkout/Checkout'
import CheckoutSuccess from './pages/checkout/CheckoutSuccess'
import Booking from './pages/booking/Booking'
import Admin from './pages/admin/Admin'

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
            <Route path="/tour-virtual" element={<VirtualTour360 />} />
            {/* Páginas protegidas (requieren autenticación) */}
            <Route
              path="/mi-cuenta"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout/success"
              element={
                <ProtectedRoute>
                  <CheckoutSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reservar"
              element={
                <ProtectedRoute requireMembership={true}>
                  <Booking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid #7ED321'
            },
            success: {
              iconTheme: {
                primary: '#7ED321',
                secondary: '#fff'
              }
            },
            error: {
              iconTheme: {
                primary: '#ff4444',
                secondary: '#fff'
              }
            }
          }}
        />
      </div>
    </Router>
  )
}

export default App
