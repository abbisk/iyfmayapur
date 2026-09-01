import { motion } from 'framer-motion'

const hoverVariants = [
  {
    y: -12,
    rotate: -2,
    scale: 1.02,
    boxShadow: '0 22px 48px rgba(49, 31, 19, 0.16)',
    filter: 'brightness(1.02)',
  },
  {
    y: -16,
    x: 6,
    rotate: 2.5,
    scale: 1.035,
    boxShadow: '0 28px 62px rgba(55, 38, 23, 0.18)',
    filter: 'brightness(1.04)',
  },
  {
    y: -10,
    x: -7,
    rotate: -4,
    scale: 1.045,
    boxShadow: '0 24px 54px rgba(73, 48, 26, 0.17)',
    filter: 'brightness(1.03)',
  },
  {
    y: -18,
    rotateX: 8,
    rotateY: -10,
    scale: 1.03,
    boxShadow: '0 30px 68px rgba(47, 32, 17, 0.2)',
    filter: 'brightness(1.06)',
  },
  {
    y: -14,
    rotateZ: -1.5,
    scale: 1.04,
    boxShadow: '0 26px 58px rgba(62, 41, 24, 0.19)',
    filter: 'saturate(1.08)',
  },
]

export default function AnimatedCard({
  children,
  className = '',
  variantIndex = 0,
  element = 'article',
  ...props
}) {
  const MotionTag = motion[element] || motion.article

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={hoverVariants[variantIndex % hoverVariants.length]}
      whileTap={{ scale: 0.985, y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{ transformStyle: 'preserve-3d' }}
      {...props}
    >
      {children}
    </MotionTag>
  )
}
