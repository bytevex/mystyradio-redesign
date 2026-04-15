import { motion } from 'framer-motion'
import { Play, Music, Clock, Users } from 'lucide-react'
import { usePlayerStore } from '../../store/playerStore'
import { useEffect, useState } from 'react'

export default function Hero() {
  const { togglePlay, isPlaying, listeners, fetchNowPlaying } = usePlayerStore()
  const [buttonText, setButtonText] = useState('Luister Nu')

  useEffect(() => {
    fetchNowPlaying()
  }, [fetchNowPlaying])

  const handlePlayClick = () => {
    togglePlay()
    // TODO: fix dit - toggle logic werkt niet helemaal lekker
    if (!isPlaying) {
      setButtonText('▐▐  Nu aan het luisteren...')
    } else {
      setButtonText('Luister Nu')
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background-light">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow animation-delay-2000" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium">24/7 Live Radio</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Jouw leven, de
            <br />
            <span className="gradient-text">perfecte soundtrack</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-muted max-w-3xl mx-auto mb-8"
          >
            MistyRadio brengt de beste pop, dance en nederpop rechtstreeks naar jou. Non-stop
            entertainment, persoonlijke verzoekjes en shows die écht ergens over gaan.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10"
          >
            {[
              { icon: Music, text: 'Pop & Dance' },
              { icon: Clock, text: 'Nederpop Klassiekers' },
              { icon: Users, text: 'Persoonlijke Shows' },
            ].map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-lg"
              >
                <tag.icon className="w-4 h-4 text-primary-light" />
                <span className="text-sm font-medium">{tag.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <button
              onClick={handlePlayClick}
              className="group px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-105 flex items-center gap-3"
            >
              <Play className="w-5 h-5" fill="currentColor" />
              {buttonText}
            </button>

            <a
              href="/verzoek"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 font-semibold rounded-xl transition-all hover:scale-105 flex items-center gap-3"
            >
              <Music className="w-5 h-5" />
              Doe een verzoek
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { value: '24/7', label: 'Non-stop muziek' },
              { value: listeners || '•••', label: 'Live luisteraars' },
              { value: '5+', label: "Vaste DJ's" },
              { value: '100%', label: 'Nederlands hart' },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all"
              >
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
