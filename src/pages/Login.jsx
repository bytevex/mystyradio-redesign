import { motion } from 'framer-motion'
import { LogIn, Wrench } from 'lucide-react'

export default function Login() {
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
              <LogIn className="w-4 h-4 text-primary-light" />
              <span className="text-sm font-medium">Account</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Inloggen</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Toegang tot jouw persoonlijke luisterervaring
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-8 mb-6"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-4 bg-yellow-500/20 rounded-full">
                <Wrench className="w-12 h-12 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold text-yellow-500 mb-2 text-xl">
                  Tijdelijk niet beschikbaar
                </h3>
                <p className="text-muted max-w-xl">
                  Het inlogsysteem is momenteel uitgeschakeld wegens uitbreidingen aan het platform.
                  We werken hard aan nieuwe features om jullie luisterervaring nog beter te maken!
                </p>
                <p className="text-muted/70 text-sm mt-4">Excuses voor het ongemak.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
