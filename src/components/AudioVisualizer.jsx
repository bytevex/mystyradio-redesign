import { motion } from 'framer-motion'

export default function AudioVisualizer({ isPlaying }) {
  const bars = [
    { delay: 0, height: 'h-3' },
    { delay: 0.1, height: 'h-5' },

    { delay: 0.2, height: 'h-4' },
    { delay: 0.3, height: 'h-6' },
    { delay: 0.4, height: 'h-4' },
  ]

  return (
    <div className="hidden sm:flex items-center gap-0.5 h-6">
      {bars.map((bar, index) => (
        <motion.div
          key={index}
          animate={{
            scaleY: isPlaying ? [0.3, 1, 0.3] : 0.3,
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: bar.delay,
            ease: 'easeInOut',
          }}
          className={`w-1 ${bar.height} bg-primary rounded-full origin-bottom`}
        />
      ))}
    </div>
  )
}
