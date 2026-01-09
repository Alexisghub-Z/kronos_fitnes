import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Store de autenticación simulado
const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      // Login simulado
      login: (email, password) => {
        // Usuarios de prueba
        const mockUsers = [
          {
            id: 1,
            email: 'admin@khronos.com',
            password: 'admin123',
            name: 'Administrador',
            phone: '555-0100',
            role: 'admin',
            membershipActive: true,
            membershipPlan: 'General',
            membershipArea: 'pesas'
          },
          {
            id: 2,
            email: 'usuario@test.com',
            password: 'user123',
            name: 'Juan Pérez',
            phone: '555-0101',
            role: 'user',
            membershipActive: true,
            membershipPlan: 'Estudiantes',
            membershipArea: 'pesas'
          },
          {
            id: 3,
            email: 'test@urse.com',
            password: 'test123',
            name: 'María García',
            phone: '555-0102',
            role: 'user',
            membershipActive: true,
            membershipPlan: 'Alumnos URSE',
            membershipArea: 'pesas'
          },
          {
            id: 4,
            email: 'nuevo@test.com',
            password: 'nuevo123',
            name: 'Carlos López',
            phone: '555-0103',
            role: 'user',
            membershipActive: false,
            membershipPlan: null,
            membershipArea: null
          }
        ]

        const user = mockUsers.find(
          u => u.email === email && u.password === password
        )

        if (user) {
          const { password: _, ...userWithoutPassword } = user
          set({ user: userWithoutPassword, isAuthenticated: true })
          return { success: true, user: userWithoutPassword }
        }

        return { success: false, error: 'Credenciales inválidas' }
      },

      // Registro simulado
      register: (userData) => {
        // En el mockup, simplemente creamos un usuario nuevo
        const newUser = {
          id: Date.now(),
          email: userData.email,
          name: userData.name,
          phone: userData.phone,
          role: 'user',
          membershipActive: false,
          membershipPlan: null,
          membershipArea: null
        }

        set({ user: newUser, isAuthenticated: true })
        return { success: true, user: newUser }
      },

      // Logout
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      // Actualizar perfil
      updateProfile: (updates) => {
        const currentUser = get().user
        if (currentUser) {
          const updatedUser = { ...currentUser, ...updates }
          set({ user: updatedUser })
          return { success: true, user: updatedUser }
        }
        return { success: false, error: 'No hay usuario autenticado' }
      },

      // Activar membresía (simulado para el checkout)
      activateMembership: (plan, area) => {
        const currentUser = get().user
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            membershipActive: true,
            membershipPlan: plan,
            membershipArea: area
          }
          set({ user: updatedUser })
          return { success: true }
        }
        return { success: false }
      }
    }),
    {
      name: 'khronos-auth-storage'
    }
  )
)

export default useAuthStore
