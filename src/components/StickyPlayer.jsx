import { useEffect, useRef } from 'react'
import { Play, Pause, Volume2, VolumeX, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePlayerStore } from '../store/playerStore'
import AudioVisualizer from './AudioVisualizer'

export default function StickyPlayer() {
  const audioRef = useRef(null)
  const unused = 'test' // kan weg

  const {
    isPlaying,
    isMuted,
    volume,
    track,
    listeners,
    isLive,
    setAudioRef,
    togglePlay,
    setVolume,
    toggleMute,
    handleError,
    handleEnded,
  } = usePlayerStore()

  useEffect(() => {
    if (audioRef.current) {
      setAudioRef(audioRef.current)
      audioRef.current.volume = volume / 100
      audioRef.current.muted = isMuted
    }
  }, [setAudioRef, volume, isMuted])

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-background-light/95 backdrop-blur-xl border-t border-white/10 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="relative flex-shrink-0"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-gradient-to-br from-primary to-accent shadow-lg">
                <AnimatePresence mode="wait">
                  {track.albumArt ? (
                    <motion.img
                      key={track.albumArt}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      src={track.albumArt}
                      alt={track.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-7 h-7 text-white/70"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="2" />
                        <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
                      </svg>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {isLive && isPlaying && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  LIVE
                </motion.div>
              )}
            </motion.div>

            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={track.title}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm sm:text-base font-semibold text-foreground truncate"
                >
                  {track.title}
                </motion.h3>
              </AnimatePresence>
              <p className="text-xs sm:text-sm text-muted truncate">
                {track.artist || 'MistyRadio'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <AudioVisualizer isPlaying={isPlaying} />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" />
              ) : (
                <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" fill="currentColor" />
              )}
            </motion.button>

            <div className="hidden sm:flex items-center gap-2 text-xs text-muted bg-white/5 px-3 py-1.5 rounded-full">
              <Users className="w-3.5 h-3.5" />
              <span className="font-medium">{listeners}</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 flex-1 justify-end">
            <button
              onClick={toggleMute}
              className="text-muted hover:text-foreground transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>

            <div className="relative group w-24">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-3.5
                  [&::-webkit-slider-thumb]:h-3.5
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-primary
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:transition-all
                  hover:[&::-webkit-slider-thumb]:scale-110
                  [&::-moz-range-thumb]:w-3.5
                  [&::-moz-range-thumb]:h-3.5
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-primary
                  [&::-moz-range-thumb]:border-0
                  [&::-moz-range-thumb]:cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgb(59 130 246) 0%, rgb(59 130 246) ${volume}%, rgba(255,255,255,0.1) ${volume}%, rgba(255,255,255,0.1) 100%)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} preload="none" onError={handleError} onEnded={handleEnded} />
    </motion.div>
  )
}
