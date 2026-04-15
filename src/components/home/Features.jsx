import { motion } from 'framer-motion'
import { Music, Users, Calendar, FileText, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePlayerStore } from '../../store/playerStore'

export default function Features() {
  const { togglePlay } = usePlayerStore()

  const features = [
    {
      icon: Music,
      title: 'Verzoeknummers',
      description:
        'Dien je favoriete nummer in en hoor het live op MistyRadio. Gratis en altijd welkom!',
      link: '/verzoek',
      color: 'primary',
    },
    {
      icon: Users,
      title: "Onze DJ's",
      description: 'Ontmoet het team achter de muziek. Elk met hun eigen stijl en passie.',
      link: '/djs',
      color: 'primary',
    },
    {
      icon: Calendar,
      title: 'Weekprogramma',
      description:
        'Bekijk wanneer jouw favoriete show live gaat. Nooit meer een uitzending missen.',
      link: '/programma',
      color: 'primary',
    },
    {
      icon: FileText,
      title: 'Nieuws & Updates',
      description:
        'Wekelijks verse content: show-aankondigingen, playlists en MistyRadio achter de schermen.',
      link: '/nieuws',
      color: 'green',
    },
    {
      icon: Play,
      title: 'Nu Luisteren',
      description:
        'Klik hier om direct te beginnen met luisteren. Geen download, geen account nodig.',
      onClick: togglePlay,
      color: 'yellow',
    },
  ]

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary-light uppercase tracking-wider"
          >
            Ontdek meer
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3"
          >
            Alles wat MistyRadio biedt
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Component = feature.link ? Link : 'button'
            const props = feature.link
              ? { to: feature.link }
              : { onClick: feature.onClick, className: 'w-full text-left' }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Component
                  {...props}
                  className="group block p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-${feature.color}-500/10 border border-${feature.color}-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary-light transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted">{feature.description}</p>
                </Component>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
