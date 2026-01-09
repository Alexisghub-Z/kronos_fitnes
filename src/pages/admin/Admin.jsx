import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaChartLine, FaDumbbell, FaCalendarAlt, FaUsers, FaUserTie,
  FaImages, FaTag, FaPlus, FaEdit, FaTrash, FaCheckCircle,
  FaTimesCircle, FaClock, FaDollarSign, FaChartPie, FaTrophy
} from 'react-icons/fa'
import toast from 'react-hot-toast'
import useAdminStore from '../../stores/adminStore'
import PromotionsManager from './PromotionsManager'
import '../../styles/Admin.css'

const Admin = () => {
  const {
    stats,
    classes,
    schedules,
    trainers,
    members,
    galleryImages,
    offers,
    addClass,
    updateClass,
    deleteClass,
    toggleClassStatus,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    addTrainer,
    updateTrainer,
    deleteTrainer,
    updateMemberStatus,
    addGalleryImage,
    deleteGalleryImage,
    addOffer,
    updateOffer,
    deleteOffer,
    toggleOfferStatus
  } = useAdminStore()

  const [activeTab, setActiveTab] = useState('dashboard')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState(null)
  const [editingItem, setEditingItem] = useState(null)

  // Form states
  const [classForm, setClassForm] = useState({
    name: '', instructor: '', area: '', level: '', duration: '', capacity: '', description: ''
  })
  const [scheduleForm, setScheduleForm] = useState({
    classId: '', day: '', time: ''
  })
  const [trainerForm, setTrainerForm] = useState({
    name: '', specialty: '', email: '', phone: '', bio: '', certifications: ''
  })
  const [offerForm, setOfferForm] = useState({
    title: '', description: '', discount: '', validFrom: '', validUntil: '', areas: []
  })

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaChartLine /> },
    { id: 'classes', label: 'Clases', icon: <FaDumbbell /> },
    { id: 'schedules', label: 'Horarios', icon: <FaCalendarAlt /> },
    { id: 'trainers', label: 'Entrenadores', icon: <FaUserTie /> },
    { id: 'members', label: 'Miembros', icon: <FaUsers /> },
    { id: 'gallery', label: 'Galería', icon: <FaImages /> },
    { id: 'offers', label: 'Ofertas', icon: <FaTag /> },
    { id: 'promotions', label: 'Promociones', icon: <FaTrophy /> }
  ]

  const openModal = (type, item = null) => {
    setModalType(type)
    setEditingItem(item)

    if (item) {
      if (type === 'class') {
        setClassForm(item)
      } else if (type === 'schedule') {
        setScheduleForm(item)
      } else if (type === 'trainer') {
        setTrainerForm({ ...item, certifications: item.certifications.join(', ') })
      } else if (type === 'offer') {
        setOfferForm({ ...item, areas: item.areas || [] })
      }
    } else {
      resetForms()
    }

    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setModalType(null)
    setEditingItem(null)
    resetForms()
  }

  const resetForms = () => {
    setClassForm({ name: '', instructor: '', area: '', level: '', duration: '', capacity: '', description: '' })
    setScheduleForm({ classId: '', day: '', time: '' })
    setTrainerForm({ name: '', specialty: '', email: '', phone: '', bio: '', certifications: '' })
    setOfferForm({ title: '', description: '', discount: '', validFrom: '', validUntil: '', areas: [] })
  }

  // Class Handlers
  const handleClassSubmit = (e) => {
    e.preventDefault()

    if (editingItem) {
      updateClass(editingItem.id, classForm)
      toast.success('Clase actualizada exitosamente')
    } else {
      addClass(classForm)
      toast.success('Clase agregada exitosamente')
    }

    closeModal()
  }

  const handleDeleteClass = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta clase?')) {
      deleteClass(id)
      toast.success('Clase eliminada')
    }
  }

  // Schedule Handlers
  const handleScheduleSubmit = (e) => {
    e.preventDefault()

    if (editingItem) {
      updateSchedule(editingItem.id, scheduleForm)
      toast.success('Horario actualizado exitosamente')
    } else {
      addSchedule(scheduleForm)
      toast.success('Horario agregado exitosamente')
    }

    closeModal()
  }

  const handleDeleteSchedule = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este horario?')) {
      deleteSchedule(id)
      toast.success('Horario eliminado')
    }
  }

  // Trainer Handlers
  const handleTrainerSubmit = (e) => {
    e.preventDefault()

    const trainerData = {
      ...trainerForm,
      certifications: trainerForm.certifications.split(',').map(c => c.trim())
    }

    if (editingItem) {
      updateTrainer(editingItem.id, trainerData)
      toast.success('Entrenador actualizado exitosamente')
    } else {
      addTrainer(trainerData)
      toast.success('Entrenador agregado exitosamente')
    }

    closeModal()
  }

  const handleDeleteTrainer = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este entrenador?')) {
      deleteTrainer(id)
      toast.success('Entrenador eliminado')
    }
  }

  // Offer Handlers
  const handleOfferSubmit = (e) => {
    e.preventDefault()

    if (editingItem) {
      updateOffer(editingItem.id, offerForm)
      toast.success('Oferta actualizada exitosamente')
    } else {
      addOffer(offerForm)
      toast.success('Oferta agregada exitosamente')
    }

    closeModal()
  }

  const handleDeleteOffer = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta oferta?')) {
      deleteOffer(id)
      toast.success('Oferta eliminada')
    }
  }

  const getClassName = (classId) => {
    const cls = classes.find(c => c.id === classId)
    return cls ? cls.name : 'Clase eliminada'
  }

  return (
    <div className="admin-page">
      <div className="container">
        <motion.div
          className="admin-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1>Panel de Administración</h1>
            <p>Gestiona tu gimnasio desde un solo lugar</p>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          className="admin-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="admin-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="dashboard-tab">
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon users">
                      <FaUsers />
                    </div>
                    <div className="stat-info">
                      <h3>{stats.activeMembers}</h3>
                      <p>Miembros Activos</p>
                      <span className="stat-detail">de {stats.totalMembers} totales</span>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon revenue">
                      <FaDollarSign />
                    </div>
                    <div className="stat-info">
                      <h3>${stats.monthlyRevenue.toLocaleString()}</h3>
                      <p>Ingresos Mensuales</p>
                      <span className="stat-detail">${stats.totalRevenue.toLocaleString()} total</span>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon classes">
                      <FaDumbbell />
                    </div>
                    <div className="stat-info">
                      <h3>{stats.upcomingClasses}</h3>
                      <p>Clases Próximas</p>
                      <span className="stat-detail">{stats.totalClasses} totales</span>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon bookings">
                      <FaCalendarAlt />
                    </div>
                    <div className="stat-info">
                      <h3>{stats.totalBookings}</h3>
                      <p>Reservaciones</p>
                      <span className="stat-detail">{stats.cancelledBookings} canceladas</span>
                    </div>
                  </div>
                </div>

                <div className="dashboard-charts">
                  <div className="chart-card">
                    <h3><FaChartPie /> Distribución de Membresías</h3>
                    <div className="chart-placeholder">
                      <p>General: 45%</p>
                      <p>Estudiantes: 30%</p>
                      <p>URSE: 15%</p>
                      <p>Baile: 10%</p>
                    </div>
                  </div>

                  <div className="chart-card">
                    <h3><FaClock /> Horarios Más Populares</h3>
                    <div className="chart-placeholder">
                      <p>06:00 - 08:00: Alta demanda</p>
                      <p>09:00 - 12:00: Media demanda</p>
                      <p>18:00 - 20:00: Alta demanda</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Classes Tab */}
            {activeTab === 'classes' && (
              <div className="classes-tab">
                <div className="tab-header">
                  <h2>Gestión de Clases</h2>
                  <button className="btn btn-primary" onClick={() => openModal('class')}>
                    <FaPlus /> Nueva Clase
                  </button>
                </div>

                <div className="table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Instructor</th>
                        <th>Área</th>
                        <th>Nivel</th>
                        <th>Duración</th>
                        <th>Capacidad</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classes.map((cls) => (
                        <tr key={cls.id}>
                          <td className="bold">{cls.name}</td>
                          <td>{cls.instructor}</td>
                          <td><span className="badge area">{cls.area}</span></td>
                          <td><span className="badge level">{cls.level}</span></td>
                          <td>{cls.duration} min</td>
                          <td>{cls.capacity} personas</td>
                          <td>
                            <button
                              className={`status-badge ${cls.active ? 'active' : 'inactive'}`}
                              onClick={() => toggleClassStatus(cls.id)}
                            >
                              {cls.active ? <><FaCheckCircle /> Activa</> : <><FaTimesCircle /> Inactiva</>}
                            </button>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn-icon edit"
                                onClick={() => openModal('class', cls)}
                                title="Editar"
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="btn-icon delete"
                                onClick={() => handleDeleteClass(cls.id)}
                                title="Eliminar"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Schedules Tab */}
            {activeTab === 'schedules' && (
              <div className="schedules-tab">
                <div className="tab-header">
                  <h2>Gestión de Horarios</h2>
                  <button className="btn btn-primary" onClick={() => openModal('schedule')}>
                    <FaPlus /> Nuevo Horario
                  </button>
                </div>

                <div className="table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Día</th>
                        <th>Hora</th>
                        <th>Clase</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedules.map((schedule) => (
                        <tr key={schedule.id}>
                          <td className="bold">{schedule.day}</td>
                          <td><FaClock /> {schedule.time}</td>
                          <td>{getClassName(schedule.classId)}</td>
                          <td>
                            <span className={`status-badge ${schedule.active ? 'active' : 'inactive'}`}>
                              {schedule.active ? 'Activo' : 'Inactivo'}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn-icon edit"
                                onClick={() => openModal('schedule', schedule)}
                                title="Editar"
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="btn-icon delete"
                                onClick={() => handleDeleteSchedule(schedule.id)}
                                title="Eliminar"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Trainers Tab */}
            {activeTab === 'trainers' && (
              <div className="trainers-tab">
                <div className="tab-header">
                  <h2>Gestión de Entrenadores</h2>
                  <button className="btn btn-primary" onClick={() => openModal('trainer')}>
                    <FaPlus /> Nuevo Entrenador
                  </button>
                </div>

                <div className="trainers-grid">
                  {trainers.map((trainer) => (
                    <motion.div
                      key={trainer.id}
                      className="trainer-card"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="trainer-avatar">
                        <FaUserTie />
                      </div>
                      <h3>{trainer.name}</h3>
                      <p className="specialty">{trainer.specialty}</p>
                      <div className="trainer-contact">
                        <p>{trainer.email}</p>
                        <p>{trainer.phone}</p>
                      </div>
                      <div className="trainer-certs">
                        {trainer.certifications.map((cert, idx) => (
                          <span key={idx} className="cert-badge">{cert}</span>
                        ))}
                      </div>
                      <div className="trainer-actions">
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => openModal('trainer', trainer)}
                        >
                          <FaEdit /> Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteTrainer(trainer.id)}
                        >
                          <FaTrash /> Eliminar
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Members Tab */}
            {activeTab === 'members' && (
              <div className="members-tab">
                <div className="tab-header">
                  <h2>Gestión de Miembros</h2>
                </div>

                <div className="table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Membresía</th>
                        <th>Área</th>
                        <th>Estado</th>
                        <th>Inicio</th>
                        <th>Fin</th>
                        <th>Total Pagado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((member) => (
                        <tr key={member.id}>
                          <td className="bold">{member.name}</td>
                          <td>{member.email}</td>
                          <td>{member.phone}</td>
                          <td>{member.membershipType}</td>
                          <td><span className="badge area">{member.membershipArea}</span></td>
                          <td>
                            <span className={`status-badge ${member.status === 'Activa' ? 'active' : 'inactive'}`}>
                              {member.status}
                            </span>
                          </td>
                          <td>{member.startDate}</td>
                          <td>{member.endDate}</td>
                          <td>${member.totalPaid}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && (
              <div className="gallery-tab">
                <div className="tab-header">
                  <h2>Gestión de Galería</h2>
                  <button className="btn btn-primary" onClick={() => toast.info('Función próximamente')}>
                    <FaPlus /> Nueva Imagen
                  </button>
                </div>

                <div className="gallery-grid">
                  {galleryImages.map((image) => (
                    <div key={image.id} className="gallery-item">
                      <div className="gallery-placeholder">
                        <FaImages />
                      </div>
                      <div className="gallery-info">
                        <h4>{image.title}</h4>
                        <p>{image.description}</p>
                        <span className="badge area">{image.category}</span>
                      </div>
                      <button
                        className="btn-delete"
                        onClick={() => {
                          if (window.confirm('¿Eliminar esta imagen?')) {
                            deleteGalleryImage(image.id)
                            toast.success('Imagen eliminada')
                          }
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Offers Tab */}
            {activeTab === 'offers' && (
              <div className="offers-tab">
                <div className="tab-header">
                  <h2>Gestión de Ofertas</h2>
                  <button className="btn btn-primary" onClick={() => openModal('offer')}>
                    <FaPlus /> Nueva Oferta
                  </button>
                </div>

                <div className="offers-list">
                  {offers.map((offer) => (
                    <motion.div
                      key={offer.id}
                      className="offer-card"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <div className="offer-header">
                        <div>
                          <h3>{offer.title}</h3>
                          <p>{offer.description}</p>
                        </div>
                        <div className="offer-discount">
                          <span>{offer.discount}%</span>
                          <small>descuento</small>
                        </div>
                      </div>
                      <div className="offer-details">
                        <p><strong>Válido desde:</strong> {offer.validFrom}</p>
                        <p><strong>Válido hasta:</strong> {offer.validUntil}</p>
                        <div className="offer-areas">
                          {offer.areas.map((area, idx) => (
                            <span key={idx} className="badge area">{area}</span>
                          ))}
                        </div>
                      </div>
                      <div className="offer-actions">
                        <button
                          className={`status-badge ${offer.active ? 'active' : 'inactive'}`}
                          onClick={() => toggleOfferStatus(offer.id)}
                        >
                          {offer.active ? 'Activa' : 'Inactiva'}
                        </button>
                        <div className="action-buttons">
                          <button
                            className="btn-icon edit"
                            onClick={() => openModal('offer', offer)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn-icon delete"
                            onClick={() => handleDeleteOffer(offer.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Promotions Tab */}
            {activeTab === 'promotions' && (
              <PromotionsManager />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <motion.div
              className="admin-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{editingItem ? 'Editar' : 'Agregar'} {modalType === 'class' ? 'Clase' : modalType === 'schedule' ? 'Horario' : modalType === 'trainer' ? 'Entrenador' : 'Oferta'}</h2>

              {/* Class Form */}
              {modalType === 'class' && (
                <form onSubmit={handleClassSubmit}>
                  <div className="form-group">
                    <label>Nombre de la Clase *</label>
                    <input
                      type="text"
                      value={classForm.name}
                      onChange={(e) => setClassForm({ ...classForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Instructor *</label>
                      <select
                        value={classForm.instructor}
                        onChange={(e) => setClassForm({ ...classForm, instructor: e.target.value })}
                        required
                      >
                        <option value="">Seleccionar</option>
                        {trainers.map((t) => (
                          <option key={t.id} value={t.name}>{t.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Área *</label>
                      <select
                        value={classForm.area}
                        onChange={(e) => setClassForm({ ...classForm, area: e.target.value })}
                        required
                      >
                        <option value="">Seleccionar</option>
                        <option value="Cardio">Cardio</option>
                        <option value="Pesas">Pesas</option>
                        <option value="Cycling">Cycling</option>
                        <option value="Baile">Baile</option>
                        <option value="Clases">Otras Clases</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nivel *</label>
                      <select
                        value={classForm.level}
                        onChange={(e) => setClassForm({ ...classForm, level: e.target.value })}
                        required
                      >
                        <option value="">Seleccionar</option>
                        <option value="Todos">Todos</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Duración (min) *</label>
                      <input
                        type="number"
                        value={classForm.duration}
                        onChange={(e) => setClassForm({ ...classForm, duration: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Capacidad *</label>
                      <input
                        type="number"
                        value={classForm.capacity}
                        onChange={(e) => setClassForm({ ...classForm, capacity: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Descripción</label>
                    <textarea
                      value={classForm.description}
                      onChange={(e) => setClassForm({ ...classForm, description: e.target.value })}
                      rows="3"
                    />
                  </div>
                  <div className="modal-actions">
                    <button type="button" className="btn btn-outline" onClick={closeModal}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingItem ? 'Actualizar' : 'Agregar'}
                    </button>
                  </div>
                </form>
              )}

              {/* Schedule Form */}
              {modalType === 'schedule' && (
                <form onSubmit={handleScheduleSubmit}>
                  <div className="form-group">
                    <label>Clase *</label>
                    <select
                      value={scheduleForm.classId}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, classId: parseInt(e.target.value) })}
                      required
                    >
                      <option value="">Seleccionar clase</option>
                      {classes.map((cls) => (
                        <option key={cls.id} value={cls.id}>{cls.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Día *</label>
                      <select
                        value={scheduleForm.day}
                        onChange={(e) => setScheduleForm({ ...scheduleForm, day: e.target.value })}
                        required
                      >
                        <option value="">Seleccionar</option>
                        <option value="Lunes">Lunes</option>
                        <option value="Martes">Martes</option>
                        <option value="Miércoles">Miércoles</option>
                        <option value="Jueves">Jueves</option>
                        <option value="Viernes">Viernes</option>
                        <option value="Sábado">Sábado</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Hora *</label>
                      <input
                        type="time"
                        value={scheduleForm.time}
                        onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button type="button" className="btn btn-outline" onClick={closeModal}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingItem ? 'Actualizar' : 'Agregar'}
                    </button>
                  </div>
                </form>
              )}

              {/* Trainer Form */}
              {modalType === 'trainer' && (
                <form onSubmit={handleTrainerSubmit}>
                  <div className="form-group">
                    <label>Nombre Completo *</label>
                    <input
                      type="text"
                      value={trainerForm.name}
                      onChange={(e) => setTrainerForm({ ...trainerForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Especialidad *</label>
                    <input
                      type="text"
                      value={trainerForm.specialty}
                      onChange={(e) => setTrainerForm({ ...trainerForm, specialty: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        value={trainerForm.email}
                        onChange={(e) => setTrainerForm({ ...trainerForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Teléfono *</label>
                      <input
                        type="tel"
                        value={trainerForm.phone}
                        onChange={(e) => setTrainerForm({ ...trainerForm, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Biografía</label>
                    <textarea
                      value={trainerForm.bio}
                      onChange={(e) => setTrainerForm({ ...trainerForm, bio: e.target.value })}
                      rows="3"
                    />
                  </div>
                  <div className="form-group">
                    <label>Certificaciones (separadas por coma)</label>
                    <input
                      type="text"
                      value={trainerForm.certifications}
                      onChange={(e) => setTrainerForm({ ...trainerForm, certifications: e.target.value })}
                      placeholder="Ej: NSCA-CPT, CrossFit Level 2"
                    />
                  </div>
                  <div className="modal-actions">
                    <button type="button" className="btn btn-outline" onClick={closeModal}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingItem ? 'Actualizar' : 'Agregar'}
                    </button>
                  </div>
                </form>
              )}

              {/* Offer Form */}
              {modalType === 'offer' && (
                <form onSubmit={handleOfferSubmit}>
                  <div className="form-group">
                    <label>Título de la Oferta *</label>
                    <input
                      type="text"
                      value={offerForm.title}
                      onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Descripción *</label>
                    <textarea
                      value={offerForm.description}
                      onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })}
                      rows="2"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Descuento (%) *</label>
                    <input
                      type="number"
                      value={offerForm.discount}
                      onChange={(e) => setOfferForm({ ...offerForm, discount: e.target.value })}
                      min="0"
                      max="100"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Válido Desde *</label>
                      <input
                        type="date"
                        value={offerForm.validFrom}
                        onChange={(e) => setOfferForm({ ...offerForm, validFrom: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Válido Hasta *</label>
                      <input
                        type="date"
                        value={offerForm.validUntil}
                        onChange={(e) => setOfferForm({ ...offerForm, validUntil: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button type="button" className="btn btn-outline" onClick={closeModal}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingItem ? 'Actualizar' : 'Agregar'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Admin
