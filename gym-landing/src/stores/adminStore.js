import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAdminStore = create(
  persist(
    (set, get) => ({
      // Dashboard Stats
      stats: {
        totalMembers: 156,
        activeMembers: 142,
        totalRevenue: 48750,
        monthlyRevenue: 12500,
        totalClasses: 45,
        upcomingClasses: 12,
        totalBookings: 234,
        cancelledBookings: 12
      },

      // Classes Management
      classes: [
        {
          id: 1,
          name: 'Cardio Matutino',
          instructor: 'Carlos Méndez',
          area: 'Cardio',
          level: 'Todos',
          duration: 45,
          capacity: 15,
          description: 'Sesión de cardio intenso para empezar el día',
          active: true,
          image: null
        },
        {
          id: 2,
          name: 'Pesas Funcional',
          instructor: 'Ana Rodríguez',
          area: 'Pesas',
          level: 'Intermedio',
          duration: 60,
          capacity: 12,
          description: 'Entrenamiento funcional con pesas',
          active: true,
          image: null
        },
        {
          id: 3,
          name: 'Zumba',
          instructor: 'María González',
          area: 'Baile',
          level: 'Todos',
          duration: 50,
          capacity: 20,
          description: 'Baile fitness latino para quemar calorías',
          active: true,
          image: null
        },
        {
          id: 4,
          name: 'Cycling Power',
          instructor: 'Roberto Silva',
          area: 'Cycling',
          level: 'Avanzado',
          duration: 45,
          capacity: 15,
          description: 'Cycling de alta intensidad',
          active: true,
          image: null
        },
        {
          id: 5,
          name: 'Yoga Flow',
          instructor: 'Laura Martínez',
          area: 'Clases',
          level: 'Todos',
          duration: 60,
          capacity: 15,
          description: 'Yoga para flexibilidad y relajación',
          active: true,
          image: null
        }
      ],

      // Schedules Management
      schedules: [
        { id: 1, classId: 1, day: 'Lunes', time: '06:00', active: true },
        { id: 2, classId: 2, day: 'Lunes', time: '07:00', active: true },
        { id: 3, classId: 3, day: 'Lunes', time: '09:00', active: true },
        { id: 4, classId: 4, day: 'Lunes', time: '18:00', active: true },
        { id: 5, classId: 1, day: 'Martes', time: '06:30', active: true },
        { id: 6, classId: 3, day: 'Martes', time: '10:00', active: true },
        { id: 7, classId: 2, day: 'Martes', time: '19:00', active: true },
        { id: 8, classId: 4, day: 'Miércoles', time: '07:00', active: true },
        { id: 9, classId: 5, day: 'Miércoles', time: '18:30', active: true },
        { id: 10, classId: 1, day: 'Jueves', time: '06:00', active: true },
        { id: 11, classId: 3, day: 'Jueves', time: '09:30', active: true },
        { id: 12, classId: 2, day: 'Viernes', time: '07:00', active: true },
        { id: 13, classId: 4, day: 'Viernes', time: '19:00', active: true }
      ],

      // Trainers Management
      trainers: [
        {
          id: 1,
          name: 'Carlos Méndez',
          specialty: 'Cardio & HIIT',
          email: 'carlos@khronos.com',
          phone: '555-0101',
          bio: 'Especialista en entrenamiento cardiovascular con 8 años de experiencia',
          certifications: ['NSCA-CPT', 'CrossFit Level 2'],
          active: true,
          image: null
        },
        {
          id: 2,
          name: 'Ana Rodríguez',
          specialty: 'Fuerza & Funcional',
          email: 'ana@khronos.com',
          phone: '555-0102',
          bio: 'Entrenadora de fuerza con enfoque en entrenamiento funcional',
          certifications: ['ACE', 'TRX Instructor'],
          active: true,
          image: null
        },
        {
          id: 3,
          name: 'María González',
          specialty: 'Baile & Zumba',
          email: 'maria@khronos.com',
          phone: '555-0103',
          bio: 'Instructora de Zumba certificada con pasión por el baile fitness',
          certifications: ['Zumba Instructor', 'Dance Fitness'],
          active: true,
          image: null
        },
        {
          id: 4,
          name: 'Roberto Silva',
          specialty: 'Cycling & Spinning',
          email: 'roberto@khronos.com',
          phone: '555-0104',
          bio: 'Instructor de cycling con experiencia en competencias',
          certifications: ['Spinning Instructor', 'Indoor Cycling'],
          active: true,
          image: null
        },
        {
          id: 5,
          name: 'Laura Martínez',
          specialty: 'Yoga & Pilates',
          email: 'laura@khronos.com',
          phone: '555-0105',
          bio: 'Instructora de yoga certificada con enfoque en bienestar integral',
          certifications: ['RYT 200', 'Pilates Mat Instructor'],
          active: true,
          image: null
        }
      ],

      // Members Management
      members: [
        {
          id: 1,
          name: 'Juan Pérez',
          email: 'juan@test.com',
          phone: '555-1001',
          membershipType: 'General',
          membershipArea: 'pesas',
          status: 'Activa',
          startDate: '2025-12-01',
          endDate: '2026-01-01',
          totalPaid: 350
        },
        {
          id: 2,
          name: 'María López',
          email: 'maria@test.com',
          phone: '555-1002',
          membershipType: 'Estudiantes',
          membershipArea: 'pesas',
          status: 'Activa',
          startDate: '2025-11-15',
          endDate: '2025-12-15',
          totalPaid: 270
        },
        {
          id: 3,
          name: 'Carlos Ramírez',
          email: 'carlos@test.com',
          phone: '555-1003',
          membershipType: 'Alumnos URSE',
          membershipArea: 'pesas',
          status: 'Activa',
          startDate: '2025-12-10',
          endDate: '2026-01-10',
          totalPaid: 200
        },
        {
          id: 4,
          name: 'Ana Torres',
          email: 'ana@test.com',
          phone: '555-1004',
          membershipType: 'Baile Reductivo',
          membershipArea: 'baile',
          status: 'Activa',
          startDate: '2025-12-05',
          endDate: '2026-01-05',
          totalPaid: 450
        },
        {
          id: 5,
          name: 'Luis Hernández',
          email: 'luis@test.com',
          phone: '555-1005',
          membershipType: 'General',
          membershipArea: 'pesas',
          status: 'Vencida',
          startDate: '2025-10-01',
          endDate: '2025-11-01',
          totalPaid: 350
        }
      ],

      // Gallery Management
      galleryImages: [
        {
          id: 1,
          title: 'Zona de Pesas',
          category: 'pesas',
          url: '/images/gallery/pesas-1.jpg',
          description: 'Área completamente equipada con pesas libres',
          active: true
        },
        {
          id: 2,
          title: 'Área de Cardio',
          category: 'cardio',
          url: '/images/gallery/cardio-1.jpg',
          description: 'Equipos de cardio de última generación',
          active: true
        },
        {
          id: 3,
          title: 'Salón de Cycling',
          category: 'cycling',
          url: '/images/gallery/cycling-1.jpg',
          description: 'Espacio dedicado para clases de spinning',
          active: true
        }
      ],

      // Offers Management
      offers: [
        {
          id: 1,
          title: 'Promoción de Inicio de Año',
          description: '20% de descuento en membresías anuales',
          discount: 20,
          validFrom: '2026-01-01',
          validUntil: '2026-01-31',
          active: true,
          areas: ['pesas', 'baile']
        },
        {
          id: 2,
          title: 'Descuento Estudiantes',
          description: 'Precio especial para estudiantes con credencial',
          discount: 15,
          validFrom: '2026-01-01',
          validUntil: '2026-12-31',
          active: true,
          areas: ['pesas']
        }
      ],

      // CRUD Operations for Classes
      addClass: (classData) => {
        const newClass = {
          ...classData,
          id: Date.now(),
          active: true
        }
        set((state) => ({
          classes: [...state.classes, newClass]
        }))
        return { success: true, class: newClass }
      },

      updateClass: (id, classData) => {
        set((state) => ({
          classes: state.classes.map((cls) =>
            cls.id === id ? { ...cls, ...classData } : cls
          )
        }))
        return { success: true }
      },

      deleteClass: (id) => {
        set((state) => ({
          classes: state.classes.filter((cls) => cls.id !== id)
        }))
        return { success: true }
      },

      toggleClassStatus: (id) => {
        set((state) => ({
          classes: state.classes.map((cls) =>
            cls.id === id ? { ...cls, active: !cls.active } : cls
          )
        }))
        return { success: true }
      },

      // CRUD Operations for Schedules
      addSchedule: (scheduleData) => {
        const newSchedule = {
          ...scheduleData,
          id: Date.now(),
          active: true
        }
        set((state) => ({
          schedules: [...state.schedules, newSchedule]
        }))
        return { success: true, schedule: newSchedule }
      },

      updateSchedule: (id, scheduleData) => {
        set((state) => ({
          schedules: state.schedules.map((schedule) =>
            schedule.id === id ? { ...schedule, ...scheduleData } : schedule
          )
        }))
        return { success: true }
      },

      deleteSchedule: (id) => {
        set((state) => ({
          schedules: state.schedules.filter((schedule) => schedule.id !== id)
        }))
        return { success: true }
      },

      // CRUD Operations for Trainers
      addTrainer: (trainerData) => {
        const newTrainer = {
          ...trainerData,
          id: Date.now(),
          active: true
        }
        set((state) => ({
          trainers: [...state.trainers, newTrainer]
        }))
        return { success: true, trainer: newTrainer }
      },

      updateTrainer: (id, trainerData) => {
        set((state) => ({
          trainers: state.trainers.map((trainer) =>
            trainer.id === id ? { ...trainer, ...trainerData } : trainer
          )
        }))
        return { success: true }
      },

      deleteTrainer: (id) => {
        set((state) => ({
          trainers: state.trainers.filter((trainer) => trainer.id !== id)
        }))
        return { success: true }
      },

      // CRUD Operations for Members
      updateMemberStatus: (id, status) => {
        set((state) => ({
          members: state.members.map((member) =>
            member.id === id ? { ...member, status } : member
          )
        }))
        return { success: true }
      },

      // CRUD Operations for Gallery
      addGalleryImage: (imageData) => {
        const newImage = {
          ...imageData,
          id: Date.now(),
          active: true
        }
        set((state) => ({
          galleryImages: [...state.galleryImages, newImage]
        }))
        return { success: true, image: newImage }
      },

      deleteGalleryImage: (id) => {
        set((state) => ({
          galleryImages: state.galleryImages.filter((img) => img.id !== id)
        }))
        return { success: true }
      },

      // CRUD Operations for Offers
      addOffer: (offerData) => {
        const newOffer = {
          ...offerData,
          id: Date.now(),
          active: true
        }
        set((state) => ({
          offers: [...state.offers, newOffer]
        }))
        return { success: true, offer: newOffer }
      },

      updateOffer: (id, offerData) => {
        set((state) => ({
          offers: state.offers.map((offer) =>
            offer.id === id ? { ...offer, ...offerData } : offer
          )
        }))
        return { success: true }
      },

      deleteOffer: (id) => {
        set((state) => ({
          offers: state.offers.filter((offer) => offer.id !== id)
        }))
        return { success: true }
      },

      toggleOfferStatus: (id) => {
        set((state) => ({
          offers: state.offers.map((offer) =>
            offer.id === id ? { ...offer, active: !offer.active } : offer
          )
        }))
        return { success: true }
      },

      // Get class by ID
      getClassById: (id) => {
        return get().classes.find((cls) => cls.id === id)
      },

      // Get trainer by name
      getTrainerByName: (name) => {
        return get().trainers.find((trainer) => trainer.name === name)
      }
    }),
    {
      name: 'admin-storage'
    }
  )
)

export default useAdminStore
