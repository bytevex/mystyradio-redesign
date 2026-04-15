import { motion } from 'framer-motion'
import { useState } from 'react'
import { Music, Send, Search, AlertTriangle } from 'lucide-react'

export default function Verzoek() {
  const [formData, setFormData] = useState({
    name: '',
    song: '',
    artist: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('form submit', formData)
    alert(
      `Bedankt ${formData.name}! Je verzoek voor "${formData.song}" van ${formData.artist} is ingediend!`
    )
    setFormData({ name: '', song: '', artist: '', message: '' })
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <section className="py-20 bg-gradient-to-b from-background via-background to-background-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <Music className="w-4 h-4 text-primary-light" />
              <span className="text-sm font-medium">Verzoeknummer</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Dien een <span className="gradient-text">verzoek</span> in
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Wil je graag jouw favoriete nummer horen? Vul het formulier in en we draaien het zo
              snel mogelijk!
            </p>
          </motion.div>

          {/* Disabled Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mb-6"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-500 mb-1">Tijdelijk uitgeschakeld</h3>
                <p className="text-sm text-muted">
                  Verzoekjes zijn op dit moment uitgeschakeld wegens problemen. Excuses voor het
                  ongemak.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Jouw naam <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Bijv. Jan Jansen"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors opacity-50 cursor-not-allowed"
                />
              </div>

              {/* Song */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Titel van het nummer <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Bijv. Afscheid"
                    value={formData.song}
                    onChange={(e) => setFormData({ ...formData, song: e.target.value })}
                    required
                    disabled
                    className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors opacity-50 cursor-not-allowed"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                </div>
              </div>

              {/* Artist */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Artiest <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Bijv. Volumia!"
                  value={formData.artist}
                  onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                  required
                  disabled
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors opacity-50 cursor-not-allowed"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Persoonlijk bericht (optioneel)
                </label>
                <textarea
                  placeholder="Waarom wil je dit nummer horen?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  disabled
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors resize-none opacity-50 cursor-not-allowed"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled
                className="w-full px-6 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 opacity-50 cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                Tijdelijk uitgeschakeld
              </button>
            </form>

            <div className="mt-8 p-6 bg-primary/5 border border-primary/10 rounded-xl">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Music className="w-5 h-5 text-primary-light" />
                Spelregels
              </h3>
              <ul className="text-sm text-muted space-y-1 ml-7">
                <li>• Verzoeken worden zo snel mogelijk gedraaid</li>
                <li>• Maximaal 1 verzoek per persoon per show</li>
                <li>• Sommige nummers zijn mogelijk niet beschikbaar</li>
                <li>• Haat, discriminatie en vulgaire teksten zijn niet toegestaan</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
