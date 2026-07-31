import { motion } from 'framer-motion'

/** Fade-up reveal on scroll into view. */
export default function Reveal({ children, delay = 0, y = 28, className = '', ...rest }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.65, 0.28, 0.99] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
