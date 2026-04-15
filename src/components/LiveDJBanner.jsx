import { motion, AnimatePresence } from 'framer-motion'
import { Radio, X } from 'lucide-react'
import { usePlayerStore } from '../store/playerStore'
import { useState, useEffect } from 'react'

// DEBUG: zet op true om banner altijd te tonen
const DEBUG_MODE = false

export default function LiveDJBanner() {
  const { isLive, liveStreamer, broadcastStart, togglePlay } = usePlayerStore()
  const [dismissed, setDismissed] = useState(false)
  const [liveTime, setLiveTime] = useState('')

  // Debug data
  const debugData = {
    isLive: true,
    streamerName: 'DJ Mike',
    broadcastStart: new Date(Date.now() - 45 * 60000).toISOString(), // 45 min geleden
  }

  const actualIsLive = DEBUG_MODE ? debugData.isLive : isLive
  const actualStreamer = DEBUG_MODE ? debugData.streamerName : liveStreamer
  const actualBroadcastStart = DEBUG_MODE ? debugData.broadcastStart : broadcastStart

  useEffect(() => {
    if (!actualIsLive) {
      setDismissed(false)
    }
  }, [actualIsLive])

  useEffect(() => {
    if (actualBroadcastStart) {
      const updateTime = () => {
        const start = new Date(actualBroadcastStart.replace(' ', 'T'))
        const now = new Date()
        const diffMinutes = Math.floor((now - start) / 60000)

        // Custom formatting zonder "ongeveer"
        if (diffMinutes < 60) {
          setLiveTime(`${diffMinutes} min`)
        } else {
          const hours = Math.floor(diffMinutes / 60)
          const mins = diffMinutes % 60
          if (mins === 0) {
            setLiveTime(`${hours}u`)
          } else {
            setLiveTime(`${hours}u ${mins}m`)
          }
        }
      }

      updateTime()
      const interval = setInterval(updateTime, 60000) // update elke minuut

      return () => clearInterval(interval)
    }
  }, [actualBroadcastStart])

  if (!actualIsLive || dismissed) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="fixed top-16 sm:top-20 left-0 right-0 z-40"
      >
        <div className="bg-gradient-to-r from-red-500/90 via-pink-500/90 to-red-500/90 backdrop-blur-md shadow-lg border-b border-red-400/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Left: Live Indicator */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative flex-shrink-0">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Radio className="w-5 h-5 text-white" />
                  <span className="font-bold text-white text-sm sm:text-base">LIVE</span>
                </div>

                {/* DJ Info */}
                <div className="min-w-0 flex-1">
                  <p className="text-white font-semibold truncate">{actualStreamer || 'DJ Live'}</p>
                  {liveTime && (
                    <p className="text-white/80 text-xs sm:text-sm truncate">Al {liveTime} live</p>
                  )}
                </div>
              </div>

              {/* Right: CTA + Close */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlay}
                  className="px-3 sm:px-4 py-2 bg-white text-red-600 font-semibold rounded-lg hover:bg-white/90 transition-colors text-xs sm:text-sm"
                >
                  <span className="hidden sm:inline">Luister Nu</span>
                  <span className="sm:hidden">▶</span>
                </motion.button>

                <button
                  onClick={() => setDismissed(true)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Sluiten"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
