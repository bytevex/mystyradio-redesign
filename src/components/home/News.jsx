import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'

export default function News() {
  const newsItems = [
    {
      id: 17,
      title: 'Discord Pingrollen',
      excerpt:
        'Er zullen in onze Discord server pingrollen komen, zodat wij minder de luisteraar ping hoeven te gebruiken.',
      category: 'Feature',
      author: 'sjoerd',
      authorAvatar: 'SJ',
      date: new Date('2026-04-11'),
      gradient: 'from-purple-500/25 to-pink-500/25',
    },
    {
      id: 14,
      title: 'Openbare bot Offline',
      excerpt: 'Onze Openbare bot is weer online!',
      category: 'MistyRadio Bot',
      author: 'sjoerd',
      authorAvatar: 'SJ',
      date: new Date('2026-04-06'),
      gradient: 'from-red-500/25 to-orange-500/25',
    },
    {
      id: 12,
      title: 'MistyRadio inloggen',
      excerpt: 'Op dit moment worden de accounts automatisch geblokkeerd.',
      category: 'Feature',
      author: 'sjoerd',
      authorAvatar: 'SJ',
      date: new Date('2026-04-06'),
      gradient: 'from-red-500/25 to-orange-500/25',
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-background-light/50 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary-light uppercase tracking-wider"
          >
            Actueel
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4"
          >
            Laatste nieuws
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg max-w-2xl mx-auto"
          >
            Blijf op de hoogte van nieuwe shows, DJ-nieuws en MistyRadio updates.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {newsItems.map((item, index) => (
            <motion.a
              key={item.id}
              href={`/nieuws#bericht-${item.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105"
            >
              {/* Image */}
              <div
                className={`h-48 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}
              >
                {/* Optional: Add image here */}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary-light text-xs font-medium rounded-full">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <Calendar className="w-3.5 h-3.5" />
                    {format(item.date, 'd MMM yyyy', { locale: nl })}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary-light transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-muted mb-4 line-clamp-2">{item.excerpt}</p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold">
                      {item.authorAvatar}
                    </div>
                    <span className="text-xs font-medium">{item.author}</span>
                  </div>
                  <span className="text-sm text-primary-light group-hover:gap-2 flex items-center gap-1 transition-all">
                    Lees meer
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/nieuws"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all hover:scale-105"
          >
            Alle nieuwsberichten
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
