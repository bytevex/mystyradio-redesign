import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Shows() {
  const shows = [
    {
      title: 'Afternoon Boost',
      dj: 'Lucas',
      avatar: 'LU',
      time: 'Dinsdag · 13:00:00 – 14:00:00',
      genre: 'Upbeat muziek',
      gradient: 'from-yellow-500/20 to-red-500/20',
    },
    {
      title: 'Meezing Uurtje',
      dj: 'Pim',
      avatar: 'PI',
      time: 'Dinsdag · 15:30:00 – 16:30:00',
      genre: 'Meezing muziek',
      gradient: 'from-blue-500/20 to-purple-500/20',
    },
    {
      title: 'Hardcore hour',
      dj: 'Vikie',
      avatar: 'VI',
      time: 'Dinsdag · 16:30:00 – 17:30:00',
      genre: 'Hardstyle',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      title: 'Hardcore hour',
      dj: 'Vikie',
      avatar: 'VI',
      time: 'Dinsdag · 19:00:00 – 20:00:00',
      genre: 'Hardstyle',
      gradient: 'from-green-500/20 to-blue-500/20',
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-background-light to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary-light uppercase tracking-wider"
          >
            Op het programma
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4"
          >
            Trending & Live Shows
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg max-w-2xl mx-auto"
          >
            Van energieke ochtendshows tot soulvolle avondsets — er is altijd iets om naar te
            luisteren.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {shows.map((show, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105"
            >
              <div
                className={`h-40 bg-gradient-to-br ${show.gradient} flex items-center justify-center text-4xl`}
              >
                🎧
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold">
                    {show.avatar}
                  </div>
                  <span className="text-sm font-medium text-muted">{show.dj}</span>
                </div>

                <h3 className="text-lg font-bold mb-3">{show.title}</h3>

                <div className="flex items-center gap-2 text-xs text-muted mb-3">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{show.time}</span>
                </div>

                <span className="inline-block px-3 py-1 bg-primary/10 text-primary-light text-xs font-medium rounded-full">
                  {show.genre}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/programma"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all hover:scale-105"
          >
            Volledig programma bekijken
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
