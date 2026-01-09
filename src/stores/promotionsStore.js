import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const usePromotionsStore = create(
  persist(
    (set, get) => ({
      // Promociones
      promotions: [
        {
          id: 'promo_1',
          title: '50% OFF Primera Mensualidad',
          description: 'Promoción especial para nuevos miembros. ¡Aprovecha este increíble descuento en tu primer mes!',
          discount: '50%',
          code: 'WELCOME50',
          image: '🎉',
          startDate: new Date('2026-01-01'),
          endDate: new Date('2026-01-31'),
          isActive: true,
          type: 'discount',
          requirements: 'Solo para nuevos usuarios',
          termsAndConditions: 'Válido solo para el primer mes. No acumulable con otras promociones.'
        },
        {
          id: 'promo_2',
          title: 'Invita y Gana',
          description: 'Invita a un amigo y ambos obtienen 1 mes gratis cuando se registre.',
          discount: '1 mes gratis',
          code: 'REFERFRIEND',
          image: '👥',
          startDate: new Date('2026-01-01'),
          endDate: new Date('2026-12-31'),
          isActive: true,
          type: 'referral',
          requirements: 'Tu amigo debe completar su primer mes',
          termsAndConditions: 'Máximo 3 referidos por usuario al mes.'
        },
        {
          id: 'promo_3',
          title: 'Black Friday KHRONOS',
          description: '3 meses al precio de 2. ¡La mejor oferta del año está aquí!',
          discount: '33% OFF',
          code: 'BLACKFRIDAY26',
          image: '🔥',
          startDate: new Date('2026-01-15'),
          endDate: new Date('2026-01-20'),
          isActive: true,
          type: 'flash',
          requirements: 'Pago anticipado de 3 meses',
          termsAndConditions: 'Oferta válida solo durante 5 días.'
        }
      ],

      // Dinámicas/Retos
      challenges: [
        {
          id: 'challenge_1',
          title: 'Reto 30 Días Fit',
          description: 'Asiste a 20 clases en 30 días y gana 1 mes gratis + camiseta KHRONOS edición especial',
          type: 'attendance',
          prize: '1 mes gratis + Camiseta exclusiva',
          image: '🏆',
          startDate: new Date('2026-01-01'),
          endDate: new Date('2026-01-31'),
          isActive: true,
          goal: 20,
          participants: [],
          winners: [],
          rules: [
            'Asistir a 20 clases durante enero 2026',
            'Hacer check-in en cada clase',
            'Solo clases presenciales cuentan',
            'Ganadores anunciados el 1 de febrero'
          ],
          pointsReward: 500
        },
        {
          id: 'challenge_2',
          title: 'Sorteo Mensual',
          description: 'Cada mes sorteamos 3 meses gratis entre todos los miembros activos',
          type: 'raffle',
          prize: '3 meses gratis',
          image: '🎁',
          startDate: new Date('2026-01-01'),
          endDate: new Date('2026-01-31'),
          isActive: true,
          participants: [],
          winners: [],
          rules: [
            'Solo miembros con membresía activa participan',
            'Se realizará sorteo en vivo el último día del mes',
            'Sorteo transparente con números de membresía',
            'Ganador tiene 7 días para reclamar premio'
          ],
          pointsReward: 100,
          entriesPerUser: 1
        },
        {
          id: 'challenge_3',
          title: 'Rey/Reina del GYM',
          description: 'El usuario con más puntos al final del mes gana 6 meses gratis',
          type: 'leaderboard',
          prize: '6 meses gratis + Título de Rey/Reina del GYM',
          image: '👑',
          startDate: new Date('2026-01-01'),
          endDate: new Date('2026-01-31'),
          isActive: true,
          participants: [],
          winners: [],
          rules: [
            'Gana puntos asistiendo a clases (10 pts)',
            'Gana puntos invitando amigos (50 pts)',
            'Gana puntos participando en eventos (25 pts)',
            'Tabla de posiciones actualizada en tiempo real'
          ],
          pointsReward: 1000
        }
      ],

      // Sistema de Puntos de Usuarios
      userPoints: {},

      // Actions para Promociones
      addPromotion: (promotion) => {
        const newPromotion = {
          ...promotion,
          id: `promo_${Date.now()}`,
          startDate: new Date(promotion.startDate),
          endDate: new Date(promotion.endDate)
        }
        set((state) => ({
          promotions: [...state.promotions, newPromotion]
        }))
        return newPromotion
      },

      updatePromotion: (id, updates) => {
        set((state) => ({
          promotions: state.promotions.map((promo) =>
            promo.id === id ? { ...promo, ...updates } : promo
          )
        }))
      },

      deletePromotion: (id) => {
        set((state) => ({
          promotions: state.promotions.filter((promo) => promo.id !== id)
        }))
      },

      getActivePromotions: () => {
        const now = new Date()
        return get().promotions.filter(
          (promo) =>
            promo.isActive &&
            new Date(promo.startDate) <= now &&
            new Date(promo.endDate) >= now
        )
      },

      // Actions para Dinámicas/Retos
      addChallenge: (challenge) => {
        const newChallenge = {
          ...challenge,
          id: `challenge_${Date.now()}`,
          startDate: new Date(challenge.startDate),
          endDate: new Date(challenge.endDate),
          participants: [],
          winners: []
        }
        set((state) => ({
          challenges: [...state.challenges, newChallenge]
        }))
        return newChallenge
      },

      updateChallenge: (id, updates) => {
        set((state) => ({
          challenges: state.challenges.map((challenge) =>
            challenge.id === id ? { ...challenge, ...updates } : challenge
          )
        }))
      },

      deleteChallenge: (id) => {
        set((state) => ({
          challenges: state.challenges.filter((challenge) => challenge.id !== id)
        }))
      },

      getActiveChallenges: () => {
        const now = new Date()
        return get().challenges.filter(
          (challenge) =>
            challenge.isActive &&
            new Date(challenge.startDate) <= now &&
            new Date(challenge.endDate) >= now
        )
      },

      participateInChallenge: (challengeId, userId) => {
        set((state) => ({
          challenges: state.challenges.map((challenge) => {
            if (challenge.id === challengeId) {
              // Verificar si ya está participando
              if (challenge.participants.some(p => p.userId === userId)) {
                return challenge
              }

              return {
                ...challenge,
                participants: [
                  ...challenge.participants,
                  {
                    userId,
                    joinedAt: new Date(),
                    progress: 0
                  }
                ]
              }
            }
            return challenge
          })
        }))
      },

      updateChallengeProgress: (challengeId, userId, progress) => {
        set((state) => ({
          challenges: state.challenges.map((challenge) => {
            if (challenge.id === challengeId) {
              return {
                ...challenge,
                participants: challenge.participants.map((p) =>
                  p.userId === userId ? { ...p, progress } : p
                )
              }
            }
            return challenge
          })
        }))
      },

      // Sistema de Puntos
      initializeUserPoints: (userId) => {
        set((state) => ({
          userPoints: {
            ...state.userPoints,
            [userId]: {
              total: 100, // Puntos de bienvenida
              history: [
                {
                  points: 100,
                  reason: 'Bienvenida a KHRONOS FITNESS',
                  date: new Date(),
                  type: 'welcome'
                }
              ]
            }
          }
        }))
      },

      addPoints: (userId, points, reason, type = 'general') => {
        set((state) => {
          const currentPoints = state.userPoints[userId] || { total: 0, history: [] }
          return {
            userPoints: {
              ...state.userPoints,
              [userId]: {
                total: currentPoints.total + points,
                history: [
                  ...currentPoints.history,
                  {
                    points,
                    reason,
                    date: new Date(),
                    type
                  }
                ]
              }
            }
          }
        })
      },

      getUserPoints: (userId) => {
        return get().userPoints[userId] || { total: 0, history: [] }
      },

      getLeaderboard: () => {
        const points = get().userPoints
        return Object.entries(points)
          .map(([userId, data]) => ({
            userId,
            points: data.total
          }))
          .sort((a, b) => b.points - a.points)
      },

      // Canjear promoción con puntos
      redeemPromotion: (userId, promoId, pointsCost) => {
        const userPoints = get().getUserPoints(userId)
        if (userPoints.total >= pointsCost) {
          get().addPoints(userId, -pointsCost, `Canjeado: ${promoId}`, 'redeem')
          return { success: true, newBalance: userPoints.total - pointsCost }
        }
        return { success: false, message: 'Puntos insuficientes' }
      }
    }),
    {
      name: 'promotions-storage'
    }
  )
)

export default usePromotionsStore
