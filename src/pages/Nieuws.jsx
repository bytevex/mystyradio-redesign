import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { nl } from 'date-fns/locale'

export default function Nieuws() {
  const newsItems = [
    {
      id: 17,
      title: 'Discord Pingrollen',
      content:
        'Er zullen in onze Discord server pingrollen komen, zodat wij minder de luisteraar ping hoeven te gebruiken. Dit betekent dat je zelf kunt kiezen wanneer je een notificatie wilt ontvangen!',
      category: 'Feature',
      author: 'sjoerd',
      authorAvatar: 'SJ',
      date: new Date('2026-04-11'),
      gradient: 'from-purple-500/25 to-pink-500/25',
    },
    {
      id: 14,
      title: 'Openbare bot Offline',
      content:
        'Onze Openbare bot is weer online! We hebben enkele technische problemen opgelost en de bot draait nu stabiel. Bedankt voor jullie geduld.',
      category: 'MistyRadio Bot',
      author: 'sjoerd',
      authorAvatar: 'SJ',
      date: new Date('2026-04-06'),
      gradient: 'from-red-500/25 to-orange-500/25',
    },
    {
      id: 12,
      title: 'MistyRadio inloggen',
      content:
        'Op dit moment worden de accounts automatisch geblokkeerd na een periode van inactiviteit. Dit is een veiligheidsmaatregel. Neem contact op als je problemen hebt met inloggen.',
      category: 'Feature',
      author: 'sjoerd',
      authorAvatar: 'SJ',
      date: new Date('2026-04-06'),
      gradient: 'from-red-500/25 to-orange-500/25',
    },
    {
      id: 11,
      title: 'Nieuwe DJ aangekondigd',
      content:
        'We zijn trots om aan te kondigen dat DJ Emma vanaf volgende week woensdag haar eigen show krijgt! Tune in voor de beste chill vibes tijdens Coffee Break.',
      category: 'Aankondiging',
      author: 'sjoerd',
      authorAvatar: 'SJ',
      date: new Date('2026-04-01'),
      gradient: 'from-green-500/25 to-blue-500/25',
    },
  ]

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <section className="py-20 bg-gradient-to-b from-background via-background to-background-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <Calendar className="w-4 h-4 text-primary-light" />
              <span className="text-sm font-medium">Actueel</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Laatste <span className="gradient-text">Nieuws</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Blijf op de hoogte van nieuwe shows, DJ-nieuws en MistyRadio updates
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {newsItems.map((item, index) => (
              <motion.article
                key={item.id}
                id={`bericht-${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all"
              >
                <div
                  className={`h-32 bg-gradient-to-br ${item.gradient} flex items-center justify-center relative`}
                >
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary-light text-sm font-medium rounded-full">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <Calendar className="w-4 h-4" />
                      {format(item.date, 'd MMMM yyyy', { locale: nl })}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold">
                        {item.authorAvatar}
                      </div>
                      <span className="text-sm font-medium">{item.author}</span>
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold mb-4">{item.title}</h2>

                  <p className="text-muted leading-relaxed">{item.content}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
