import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockBookings } from '../data/mockData'

const useBookingStore = create(
  persist(
    (set, get) => ({
      bookings: mockBookings,

      // Obtener reservaciones de un usuario
      getUserBookings: (userId) => {
        return get().bookings.filter(b => b.userId === userId)
      },

      // Crear nueva reservación
      createBooking: (bookingData) => {
        const newBooking = {
          id: Date.now(),
          ...bookingData,
          status: 'confirmed',
          bookedAt: new Date().toISOString()
        }

        set(state => ({
          bookings: [...state.bookings, newBooking]
        }))

        return { success: true, booking: newBooking }
      },

      // Cancelar reservación
      cancelBooking: (bookingId, userId) => {
        const booking = get().bookings.find(b => b.id === bookingId)

        if (!booking) {
          return { success: false, error: 'Reservación no encontrada' }
        }

        if (booking.userId !== userId) {
          return { success: false, error: 'No autorizado' }
        }

        // Verificar que falten más de 2 horas
        const bookingDateTime = new Date(`${booking.date}T${booking.time}`)
        const now = new Date()
        const hoursUntilClass = (bookingDateTime - now) / (1000 * 60 * 60)

        if (hoursUntilClass < 2) {
          return {
            success: false,
            error: 'No se puede cancelar con menos de 2 horas de anticipación'
          }
        }

        set(state => ({
          bookings: state.bookings.map(b =>
            b.id === bookingId ? { ...b, status: 'cancelled' } : b
          )
        }))

        return { success: true }
      },

      // Verificar si el usuario ya tiene una reservación para esta clase
      hasExistingBooking: (userId, className, date, time) => {
        return get().bookings.some(
          b => b.userId === userId &&
               b.className === className &&
               b.date === date &&
               b.time === time &&
               b.status === 'confirmed'
        )
      },

      // Contar reservaciones del día para un usuario
      getDailyBookingCount: (userId, date) => {
        return get().bookings.filter(
          b => b.userId === userId &&
               b.date === date &&
               b.status === 'confirmed'
        ).length
      }
    }),
    {
      name: 'khronos-bookings-storage'
    }
  )
)

export default useBookingStore
