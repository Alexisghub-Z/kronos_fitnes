import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const usePaymentStore = create(
  persist(
    (set, get) => ({
      // Tarjetas guardadas por usuario
      savedCards: [],

      // Historial de cobros automáticos
      automaticCharges: [],

      // Configuración de cobro automático
      recurringPayments: [],

      // Agregar tarjeta guardada
      addSavedCard: (userId, cardData) => {
        const newCard = {
          id: `card_${Date.now()}`,
          userId,
          last4: cardData.cardNumber.slice(-4),
          brand: detectCardBrand(cardData.cardNumber),
          expiryMonth: cardData.expiryDate.split('/')[0],
          expiryYear: cardData.expiryDate.split('/')[1],
          holderName: cardData.cardName,
          isDefault: get().savedCards.filter(c => c.userId === userId).length === 0,
          createdAt: new Date().toISOString(),
          // En producción, aquí iría el token de Stripe, NO los datos reales
          stripeToken: `tok_${Math.random().toString(36).substr(2, 9)}`
        }

        set((state) => ({
          savedCards: [...state.savedCards, newCard]
        }))

        return { success: true, card: newCard }
      },

      // Obtener tarjetas de un usuario
      getUserCards: (userId) => {
        return get().savedCards.filter(card => card.userId === userId)
      },

      // Establecer tarjeta por defecto
      setDefaultCard: (userId, cardId) => {
        set((state) => ({
          savedCards: state.savedCards.map(card => ({
            ...card,
            isDefault: card.userId === userId && card.id === cardId
          }))
        }))
        return { success: true }
      },

      // Eliminar tarjeta
      removeCard: (cardId) => {
        set((state) => ({
          savedCards: state.savedCards.filter(card => card.id !== cardId)
        }))
        return { success: true }
      },

      // Activar cobro automático
      enableRecurringPayment: (userId, membershipType, amount, cardId) => {
        const card = get().savedCards.find(c => c.id === cardId)
        if (!card) {
          return { success: false, error: 'Tarjeta no encontrada' }
        }

        // Calcular próxima fecha de cobro (30 días desde hoy)
        const nextChargeDate = new Date()
        nextChargeDate.setDate(nextChargeDate.getDate() + 30)

        const newRecurring = {
          id: `recurring_${Date.now()}`,
          userId,
          cardId,
          membershipType,
          amount,
          frequency: 'monthly',
          nextChargeDate: nextChargeDate.toISOString(),
          status: 'active',
          createdAt: new Date().toISOString()
        }

        set((state) => ({
          recurringPayments: [...state.recurringPayments, newRecurring]
        }))

        return { success: true, recurring: newRecurring }
      },

      // Desactivar cobro automático
      disableRecurringPayment: (userId) => {
        set((state) => ({
          recurringPayments: state.recurringPayments.map(rp =>
            rp.userId === userId ? { ...rp, status: 'cancelled' } : rp
          )
        }))
        return { success: true }
      },

      // Obtener cobro automático de usuario
      getUserRecurringPayment: (userId) => {
        return get().recurringPayments.find(
          rp => rp.userId === userId && rp.status === 'active'
        )
      },

      // Simular cobro automático
      processAutomaticCharge: (recurringId) => {
        const recurring = get().recurringPayments.find(r => r.id === recurringId)
        if (!recurring || recurring.status !== 'active') {
          return { success: false, error: 'Cobro automático no encontrado o inactivo' }
        }

        const charge = {
          id: `charge_${Date.now()}`,
          userId: recurring.userId,
          cardId: recurring.cardId,
          amount: recurring.amount,
          status: 'succeeded',
          type: 'recurring',
          description: `Renovación automática - ${recurring.membershipType}`,
          createdAt: new Date().toISOString()
        }

        // Actualizar próxima fecha de cobro
        const nextChargeDate = new Date(recurring.nextChargeDate)
        nextChargeDate.setDate(nextChargeDate.getDate() + 30)

        set((state) => ({
          automaticCharges: [...state.automaticCharges, charge],
          recurringPayments: state.recurringPayments.map(rp =>
            rp.id === recurringId
              ? { ...rp, nextChargeDate: nextChargeDate.toISOString() }
              : rp
          )
        }))

        return { success: true, charge }
      },

      // Obtener historial de cobros automáticos de usuario
      getUserAutomaticCharges: (userId) => {
        return get().automaticCharges.filter(charge => charge.userId === userId)
      },

      // Procesar pago con tarjeta guardada
      chargeCard: (userId, cardId, amount, description) => {
        const card = get().savedCards.find(c => c.id === cardId && c.userId === userId)
        if (!card) {
          return { success: false, error: 'Tarjeta no encontrada' }
        }

        const charge = {
          id: `charge_${Date.now()}`,
          userId,
          cardId,
          amount,
          status: 'succeeded',
          type: 'manual',
          description,
          createdAt: new Date().toISOString()
        }

        set((state) => ({
          automaticCharges: [...state.automaticCharges, charge]
        }))

        return { success: true, charge }
      }
    }),
    {
      name: 'payment-storage'
    }
  )
)

// Función auxiliar para detectar marca de tarjeta
function detectCardBrand(cardNumber) {
  const number = cardNumber.replace(/\s/g, '')

  if (number.startsWith('4')) return 'visa'
  if (number.startsWith('5')) return 'mastercard'
  if (number.startsWith('37') || number.startsWith('34')) return 'amex'
  if (number.startsWith('6')) return 'discover'

  return 'unknown'
}

export default usePaymentStore
