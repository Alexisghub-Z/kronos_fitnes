import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff,
  FaPercent, FaClock, FaCalendarCheck, FaTrophy,
  FaUsers, FaCrown, FaGift, FaTimes
} from 'react-icons/fa'
import toast from 'react-hot-toast'
import usePromotionsStore from '../../stores/promotionsStore'

const PromotionsManager = () => {
  const {
    promotions,
    challenges,
    addPromotion,
    updatePromotion,
    deletePromotion,
    addChallenge,
    updateChallenge,
    deleteChallenge
  } = usePromotionsStore()

  const [activeTab, setActiveTab] = useState('promotions')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState(null)
  const [editingItem, setEditingItem] = useState(null)

  const [promotionForm, setPromotionForm] = useState({
    title: '',
    description: '',
    discount: '',
    code: '',
    image: '🎉',
    startDate: '',
    endDate: '',
    type: 'discount',
    requirements: '',
    termsAndConditions: '',
    isActive: true
  })

  const [challengeForm, setChallengeForm] = useState({
    title: '',
    description: '',
    type: 'attendance',
    prize: '',
    image: '🏆',
    startDate: '',
    endDate: '',
    goal: 0,
    pointsReward: 0,
    rules: [''],
    isActive: true
  })

  const promotionIcons = ['🎉', '🎁', '🔥', '⚡', '💰', '🎊', '✨', '🌟']
  const challengeIcons = ['🏆', '👑', '🎖️', '🥇', '🎯', '💪', '🔥', '⭐']

  const openModal = (type, item = null) => {
    setModalType(type)
    setEditingItem(item)

    if (item) {
      if (type === 'promotion') {
        setPromotionForm({
          ...item,
          startDate: item.startDate instanceof Date
            ? item.startDate.toISOString().split('T')[0]
            : new Date(item.startDate).toISOString().split('T')[0],
          endDate: item.endDate instanceof Date
            ? item.endDate.toISOString().split('T')[0]
            : new Date(item.endDate).toISOString().split('T')[0]
        })
      } else if (type === 'challenge') {
        setChallengeForm({
          ...item,
          startDate: item.startDate instanceof Date
            ? item.startDate.toISOString().split('T')[0]
            : new Date(item.startDate).toISOString().split('T')[0],
          endDate: item.endDate instanceof Date
            ? item.endDate.toISOString().split('T')[0]
            : new Date(item.endDate).toISOString().split('T')[0],
          rules: item.rules || ['']
        })
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
    setPromotionForm({
      title: '',
      description: '',
      discount: '',
      code: '',
      image: '🎉',
      startDate: '',
      endDate: '',
      type: 'discount',
      requirements: '',
      termsAndConditions: '',
      isActive: true
    })
    setChallengeForm({
      title: '',
      description: '',
      type: 'attendance',
      prize: '',
      image: '🏆',
      startDate: '',
      endDate: '',
      goal: 0,
      pointsReward: 0,
      rules: [''],
      isActive: true
    })
  }

  const handlePromotionSubmit = (e) => {
    e.preventDefault()

    if (editingItem) {
      updatePromotion(editingItem.id, promotionForm)
      toast.success('Promoción actualizada exitosamente')
    } else {
      addPromotion(promotionForm)
      toast.success('Promoción creada exitosamente')
    }

    closeModal()
  }

  const handleChallengeSubmit = (e) => {
    e.preventDefault()

    const challengeData = {
      ...challengeForm,
      rules: challengeForm.rules.filter(r => r.trim() !== '')
    }

    if (editingItem) {
      updateChallenge(editingItem.id, challengeData)
      toast.success('Dinámica actualizada exitosamente')
    } else {
      addChallenge(challengeData)
      toast.success('Dinámica creada exitosamente')
    }

    closeModal()
  }

  const handleDeletePromotion = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta promoción?')) {
      deletePromotion(id)
      toast.success('Promoción eliminada')
    }
  }

  const handleDeleteChallenge = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta dinámica?')) {
      deleteChallenge(id)
      toast.success('Dinámica eliminada')
    }
  }

  const addRuleField = () => {
    setChallengeForm({
      ...challengeForm,
      rules: [...challengeForm.rules, '']
    })
  }

  const removeRuleField = (index) => {
    const newRules = challengeForm.rules.filter((_, i) => i !== index)
    setChallengeForm({ ...challengeForm, rules: newRules })
  }

  const updateRule = (index, value) => {
    const newRules = [...challengeForm.rules]
    newRules[index] = value
    setChallengeForm({ ...challengeForm, rules: newRules })
  }

  return (
    <div className="promotions-manager">
      {/* Tabs */}
      <div className="manager-tabs">
        <button
          className={`tab-btn ${activeTab === 'promotions' ? 'active' : ''}`}
          onClick={() => setActiveTab('promotions')}
        >
          <FaPercent /> Promociones
        </button>
        <button
          className={`tab-btn ${activeTab === 'challenges' ? 'active' : ''}`}
          onClick={() => setActiveTab('challenges')}
        >
          <FaTrophy /> Dinámicas y Retos
        </button>
      </div>

      {/* Promotions Section */}
      {activeTab === 'promotions' && (
        <div className="section-content">
          <div className="section-header">
            <h2>Gestionar Promociones</h2>
            <button
              className="btn-primary"
              onClick={() => openModal('promotion')}
            >
              <FaPlus /> Nueva Promoción
            </button>
          </div>

          <div className="items-grid">
            {promotions.map((promo) => (
              <motion.div
                key={promo.id}
                className="promo-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="promo-header">
                  <div className="promo-icon">{promo.image}</div>
                  <div className="promo-status">
                    {promo.isActive ? (
                      <span className="status-active"><FaToggleOn /> Activa</span>
                    ) : (
                      <span className="status-inactive"><FaToggleOff /> Inactiva</span>
                    )}
                  </div>
                </div>

                <h3>{promo.title}</h3>
                <p className="promo-description">{promo.description}</p>

                <div className="promo-details">
                  <div className="detail-item">
                    <FaPercent />
                    <span>{promo.discount}</span>
                  </div>
                  <div className="detail-item">
                    <FaClock />
                    <span>Código: {promo.code}</span>
                  </div>
                </div>

                <div className="promo-dates">
                  <FaCalendarCheck />
                  <span>
                    {new Date(promo.startDate).toLocaleDateString()} - {new Date(promo.endDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="promo-actions">
                  <button
                    className="btn-edit"
                    onClick={() => openModal('promotion', promo)}
                  >
                    <FaEdit /> Editar
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeletePromotion(promo.id)}
                  >
                    <FaTrash /> Eliminar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Challenges Section */}
      {activeTab === 'challenges' && (
        <div className="section-content">
          <div className="section-header">
            <h2>Gestionar Dinámicas y Retos</h2>
            <button
              className="btn-primary"
              onClick={() => openModal('challenge')}
            >
              <FaPlus /> Nueva Dinámica
            </button>
          </div>

          <div className="items-grid">
            {challenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                className="challenge-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="challenge-header">
                  <div className="challenge-icon">{challenge.image}</div>
                  <div className="challenge-type-badge">
                    {challenge.type === 'attendance' && <><FaUsers /> Asistencia</>}
                    {challenge.type === 'raffle' && <><FaGift /> Sorteo</>}
                    {challenge.type === 'leaderboard' && <><FaCrown /> Ranking</>}
                  </div>
                </div>

                <h3>{challenge.title}</h3>
                <p className="challenge-description">{challenge.description}</p>

                <div className="challenge-prize">
                  <FaTrophy />
                  <strong>Premio:</strong> {challenge.prize}
                </div>

                <div className="challenge-participants">
                  <FaUsers />
                  <span>{challenge.participants.length} participantes</span>
                </div>

                <div className="challenge-dates">
                  <FaCalendarCheck />
                  <span>
                    {new Date(challenge.startDate).toLocaleDateString()} - {new Date(challenge.endDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="challenge-actions">
                  <button
                    className="btn-edit"
                    onClick={() => openModal('challenge', challenge)}
                  >
                    <FaEdit /> Editar
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteChallenge(challenge.id)}
                  >
                    <FaTrash /> Eliminar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-content large"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeModal}>
                <FaTimes />
              </button>

              <h2>
                {modalType === 'promotion'
                  ? (editingItem ? 'Editar Promoción' : 'Nueva Promoción')
                  : (editingItem ? 'Editar Dinámica' : 'Nueva Dinámica')
                }
              </h2>

              {modalType === 'promotion' && (
                <form onSubmit={handlePromotionSubmit} className="admin-form">
                  <div className="form-row">
                    <div className="form-group full">
                      <label>Título *</label>
                      <input
                        type="text"
                        value={promotionForm.title}
                        onChange={(e) => setPromotionForm({ ...promotionForm, title: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group full">
                      <label>Descripción *</label>
                      <textarea
                        value={promotionForm.description}
                        onChange={(e) => setPromotionForm({ ...promotionForm, description: e.target.value })}
                        rows="3"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Descuento *</label>
                      <input
                        type="text"
                        placeholder="ej: 50% OFF"
                        value={promotionForm.discount}
                        onChange={(e) => setPromotionForm({ ...promotionForm, discount: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Código *</label>
                      <input
                        type="text"
                        placeholder="ej: WELCOME50"
                        value={promotionForm.code}
                        onChange={(e) => setPromotionForm({ ...promotionForm, code: e.target.value.toUpperCase() })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Tipo de Promoción *</label>
                      <select
                        value={promotionForm.type}
                        onChange={(e) => setPromotionForm({ ...promotionForm, type: e.target.value })}
                        required
                      >
                        <option value="discount">Descuento</option>
                        <option value="referral">Referidos</option>
                        <option value="flash">Oferta Flash</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Ícono</label>
                      <div className="icon-selector">
                        {promotionIcons.map((icon) => (
                          <button
                            key={icon}
                            type="button"
                            className={`icon-option ${promotionForm.image === icon ? 'selected' : ''}`}
                            onClick={() => setPromotionForm({ ...promotionForm, image: icon })}
                          >
                            {icon}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Fecha de Inicio *</label>
                      <input
                        type="date"
                        value={promotionForm.startDate}
                        onChange={(e) => setPromotionForm({ ...promotionForm, startDate: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Fecha de Fin *</label>
                      <input
                        type="date"
                        value={promotionForm.endDate}
                        onChange={(e) => setPromotionForm({ ...promotionForm, endDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group full">
                      <label>Requisitos</label>
                      <input
                        type="text"
                        placeholder="ej: Solo para nuevos usuarios"
                        value={promotionForm.requirements}
                        onChange={(e) => setPromotionForm({ ...promotionForm, requirements: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group full">
                      <label>Términos y Condiciones</label>
                      <textarea
                        value={promotionForm.termsAndConditions}
                        onChange={(e) => setPromotionForm({ ...promotionForm, termsAndConditions: e.target.value })}
                        rows="2"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={promotionForm.isActive}
                          onChange={(e) => setPromotionForm({ ...promotionForm, isActive: e.target.checked })}
                        />
                        <span>Promoción Activa</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={closeModal}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn-primary">
                      {editingItem ? 'Actualizar' : 'Crear'} Promoción
                    </button>
                  </div>
                </form>
              )}

              {modalType === 'challenge' && (
                <form onSubmit={handleChallengeSubmit} className="admin-form">
                  <div className="form-row">
                    <div className="form-group full">
                      <label>Título *</label>
                      <input
                        type="text"
                        value={challengeForm.title}
                        onChange={(e) => setChallengeForm({ ...challengeForm, title: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group full">
                      <label>Descripción *</label>
                      <textarea
                        value={challengeForm.description}
                        onChange={(e) => setChallengeForm({ ...challengeForm, description: e.target.value })}
                        rows="3"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Tipo de Dinámica *</label>
                      <select
                        value={challengeForm.type}
                        onChange={(e) => setChallengeForm({ ...challengeForm, type: e.target.value })}
                        required
                      >
                        <option value="attendance">Reto de Asistencia</option>
                        <option value="raffle">Sorteo</option>
                        <option value="leaderboard">Ranking/Competencia</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Ícono</label>
                      <div className="icon-selector">
                        {challengeIcons.map((icon) => (
                          <button
                            key={icon}
                            type="button"
                            className={`icon-option ${challengeForm.image === icon ? 'selected' : ''}`}
                            onClick={() => setChallengeForm({ ...challengeForm, image: icon })}
                          >
                            {icon}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group full">
                      <label>Premio *</label>
                      <input
                        type="text"
                        placeholder="ej: 1 mes gratis + Camiseta exclusiva"
                        value={challengeForm.prize}
                        onChange={(e) => setChallengeForm({ ...challengeForm, prize: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Fecha de Inicio *</label>
                      <input
                        type="date"
                        value={challengeForm.startDate}
                        onChange={(e) => setChallengeForm({ ...challengeForm, startDate: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Fecha de Fin *</label>
                      <input
                        type="date"
                        value={challengeForm.endDate}
                        onChange={(e) => setChallengeForm({ ...challengeForm, endDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {challengeForm.type === 'attendance' && (
                    <div className="form-row">
                      <div className="form-group">
                        <label>Meta (clases a completar) *</label>
                        <input
                          type="number"
                          min="1"
                          value={challengeForm.goal}
                          onChange={(e) => setChallengeForm({ ...challengeForm, goal: parseInt(e.target.value) })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Puntos de Recompensa *</label>
                        <input
                          type="number"
                          min="0"
                          value={challengeForm.pointsReward}
                          onChange={(e) => setChallengeForm({ ...challengeForm, pointsReward: parseInt(e.target.value) })}
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="form-row">
                    <div className="form-group full">
                      <label>Reglas del Reto</label>
                      {challengeForm.rules.map((rule, index) => (
                        <div key={index} className="rule-input">
                          <input
                            type="text"
                            placeholder={`Regla ${index + 1}`}
                            value={rule}
                            onChange={(e) => updateRule(index, e.target.value)}
                          />
                          {challengeForm.rules.length > 1 && (
                            <button
                              type="button"
                              className="btn-remove-rule"
                              onClick={() => removeRuleField(index)}
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn-add-rule"
                        onClick={addRuleField}
                      >
                        <FaPlus /> Agregar Regla
                      </button>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={challengeForm.isActive}
                          onChange={(e) => setChallengeForm({ ...challengeForm, isActive: e.target.checked })}
                        />
                        <span>Dinámica Activa</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={closeModal}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn-primary">
                      {editingItem ? 'Actualizar' : 'Crear'} Dinámica
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PromotionsManager
