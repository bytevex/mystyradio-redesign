import { motion } from 'framer-motion'
import { useState } from 'react'
import { Facebook, Instagram, MessageCircle, Send } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: '#',
      color: 'blue',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: '#',
      color: 'pink',
    },
    {
      name: 'Discord',
      icon: MessageCircle,
      href: '#',
      color: 'indigo',
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    // Show success message (simplified)
    alert('Bedankt! We reageren zo snel mogelijk.')
    setFormData({ name: '', email: '', message: '' })
  }

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
            In contact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4"
          >
            Contact & Social
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg max-w-2xl mx-auto"
          >
            Volg ons, stuur een berichtje of dien een verzoek in. We horen graag van je!
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Send className="w-5 h-5 text-primary-light" />
              </div>
              Volg ons
            </h3>

            <div className="space-y-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:scale-105 group"
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-${social.color}-500/10 border border-${social.color}-500/20 flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <social.icon className={`w-6 h-6 text-${social.color}-400`} />
                  </div>
                  <span className="font-medium text-lg">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Send className="w-5 h-5 text-primary-light" />
              </div>
              Stuur ons een bericht
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Je naam"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Je e-mailadres"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              <div>
                <textarea
                  placeholder="Je bericht..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Verstuur bericht
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
