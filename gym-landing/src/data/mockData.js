// Datos mockeados para el prototipo

export const mockBookings = [
  {
    id: 1,
    userId: 2,
    className: 'CrossFit Avanzado',
    instructor: 'Carlos Mendoza',
    area: 'pesas',
    date: '2026-01-10',
    time: '06:00',
    duration: 60,
    status: 'confirmed',
    bookedAt: '2026-01-08T10:30:00'
  },
  {
    id: 2,
    userId: 2,
    className: 'Cycling Intermedio',
    instructor: 'Ana Silva',
    area: 'cycling',
    date: '2026-01-12',
    time: '18:00',
    duration: 45,
    status: 'confirmed',
    bookedAt: '2026-01-08T11:00:00'
  },
  {
    id: 3,
    userId: 2,
    className: 'Zumba',
    instructor: 'Laura Torres',
    area: 'baile',
    date: '2026-01-08',
    time: '19:00',
    duration: 60,
    status: 'completed',
    bookedAt: '2026-01-05T14:20:00'
  },
  {
    id: 4,
    userId: 3,
    className: 'Spinning Avanzado',
    instructor: 'Ana Silva',
    area: 'cycling',
    date: '2026-01-11',
    time: '07:00',
    duration: 45,
    status: 'confirmed',
    bookedAt: '2026-01-07T09:15:00'
  }
]

export const mockPayments = [
  {
    id: 1,
    userId: 2,
    amount: 270,
    type: 'membership',
    plan: 'Estudiantes',
    area: 'pesas',
    status: 'paid',
    date: '2025-12-15',
    method: 'card',
    last4: '4242'
  },
  {
    id: 2,
    userId: 3,
    amount: 200,
    type: 'membership',
    plan: 'Alumnos URSE',
    area: 'pesas',
    status: 'paid',
    date: '2025-12-20',
    method: 'card',
    last4: '5555'
  }
]

// Estadísticas para el dashboard de admin
export const mockAdminStats = {
  todayBookings: 45,
  monthRevenue: 12500,
  activeMembers: 487,
  todayRevenue: 1200,
  weeklyBookings: [
    { day: 'Lun', bookings: 52 },
    { day: 'Mar', bookings: 48 },
    { day: 'Mié', bookings: 55 },
    { day: 'Jue', bookings: 50 },
    { day: 'Vie', bookings: 45 },
    { day: 'Sáb', bookings: 38 },
    { day: 'Dom', bookings: 30 }
  ],
  areaDistribution: [
    { area: 'Pesas', count: 250 },
    { area: 'Cardio', count: 150 },
    { area: 'Cycling', count: 87 },
    { area: 'Baile', count: 95 }
  ]
}

// Reservaciones recientes para admin
export const mockRecentBookings = [
  {
    id: 15,
    userName: 'Ana García',
    userEmail: 'ana@test.com',
    className: 'CrossFit Básico',
    instructor: 'Carlos Mendoza',
    date: '2026-01-08',
    time: '17:00',
    status: 'confirmed',
    bookedAt: '2026-01-08T15:45:00'
  },
  {
    id: 14,
    userName: 'Pedro Ramírez',
    userEmail: 'pedro@test.com',
    className: 'Spinning Intermedio',
    instructor: 'Ana Silva',
    date: '2026-01-09',
    time: '06:00',
    status: 'confirmed',
    bookedAt: '2026-01-08T14:30:00'
  },
  {
    id: 13,
    userName: 'Laura Martínez',
    userEmail: 'laura@test.com',
    className: 'Zumba',
    instructor: 'Laura Torres',
    date: '2026-01-09',
    time: '19:00',
    status: 'confirmed',
    bookedAt: '2026-01-08T13:20:00'
  }
]

// Ofertas activas
export const mockOffers = [
  {
    id: 1,
    title: 'Descuento de Año Nuevo',
    description: '20% de descuento en membresías anuales',
    code: 'ANIONUEVO2026',
    discount: 20,
    validFrom: '2026-01-01',
    validUntil: '2026-01-31',
    active: true,
    usageCount: 23
  },
  {
    id: 2,
    title: 'Descuento Estudiantes',
    description: '15% adicional para estudiantes',
    code: 'ESTUDIANTE15',
    discount: 15,
    validFrom: '2025-09-01',
    validUntil: '2026-06-30',
    active: true,
    usageCount: 156
  },
  {
    id: 3,
    title: 'Promo Black Friday',
    description: '30% en todas las membresías',
    code: 'BLACKFRIDAY30',
    discount: 30,
    validFrom: '2025-11-24',
    validUntil: '2025-11-30',
    active: false,
    usageCount: 89
  }
]
