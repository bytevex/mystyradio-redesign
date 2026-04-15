import { motion } from 'framer-motion'
import { Music, Users, Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function About() {
  const features = [
    {
      icon: Music,
      title: 'Persoonlijke verzoekjes',
      description: 'Hoor jouw favoriete nummer live via onze verzoekjeslijn.',
    },
    {
      icon: Users,
      title: 'Community-gedreven',
      description: 'Jij bepaalt mee: stem op nummers, doe polls en chat live mee.',
    },

    {
      icon: Clock,
      title: 'Vaste programmering',
      description: 'Elke dag dezelfde shows op dezelfde tijden. Betrouwbaar, altijd.',
    },
  ]

  const stats = [
    {
      icon: Clock,
      value: '24/7',
      label: "Non-stop uitzenden, ook 's nachts",
      color: 'primary',
    },
    {
      icon: Users,
      value: '5+',
      label: "Gepassioneerde vaste DJ's",
      color: 'accent',
    },
    {
      icon: Music,
      value: '∞',
      label: 'Verzoekjes mogelijk, elke dag',
      color: 'green',
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-background to-background-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-primary-light uppercase tracking-wider">
              Over ons
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-6">
              Meer dan
              <br />
              alleen muziek
            </h2>

            <p className="text-muted text-lg mb-4">
              MistyRadio is opgericht met één doel: mensen verbinden via muziek. We draaien de beste
              Nederlandse pop, internationale dance-hits en tijdloze klassiekers — geselecteerd door
              mensen die écht van muziek houden.
            </p>

            <p className="text-muted text-lg mb-8">
              Onze DJ's brengen niet alleen nummers, maar ook persoonlijkheid, verhalen en
              betrokkenheid. Dat maakt MistyRadio uniek: het voelt als luisteren naar een vriend die
              geweldig muziekgevoel heeft.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary-light" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              to="/djs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Maak kennis met onze DJ's
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-6 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all"
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 flex items-center justify-center flex-shrink-0`}
                >
                  <stat.icon className={`w-8 h-8 text-${stat.color}-400`} />
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-muted">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
