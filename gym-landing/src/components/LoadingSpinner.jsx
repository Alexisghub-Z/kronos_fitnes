import { motion } from 'framer-motion'
import '../styles/LoadingSpinner.css'

const LoadingSpinner = ({ fullScreen = false, message = 'Cargando...' }) => {
  const containerClass = fullScreen ? 'loading-container fullscreen' : 'loading-container'

  return (
    <div className={containerClass}>
      <motion.div
        className="loading-spinner"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg viewBox="0 0 50 50">
          <motion.circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="4"
            stroke="#7ED321"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 0.75 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </motion.div>
      {message && (
        <motion.p
          className="loading-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  )
}

export default LoadingSpinner
