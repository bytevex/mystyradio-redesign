import { Link } from 'react-router-dom'
import { Mail, Facebook, Instagram, MessageCircle, Youtube } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  // TODO: add more social links later

  const navigationLinks = [
    { name: 'Home', path: '/' },
    { name: 'Programma', path: '/programma' },
    { name: "Onze DJ's", path: '/djs' },
    { name: 'Nieuws', path: '/nieuws' },
    { name: 'Verzoekje doen', path: '/verzoek' },
  ]

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/mistyradio', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/mistyradioofficial/', label: 'Instagram' },
    { icon: MessageCircle, href: 'https://discord.gg/pAQ4NFkK9g', label: 'Discord' },
    { icon: Youtube, href: 'https://www.youtube.com/@MistyRadioOfficial', label: 'YouTube' },
  ]

  return (
    <footer className="bg-background-light border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="MistyRadio Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold">MistyRadio</span>
            </Link>
            <p className="text-sm text-muted mb-6">
              Jouw plek voor de beste pop, dance en nederpop. 24/7 live, non-stop entertainment.
            </p>

            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-muted hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Navigatie</h4>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:info@mistyradio.org"
                  className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  info@mistyradio.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            © {currentYear} MistyRadio. Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted"></div>
        </div>

        {/* License */}
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-muted">
            🎙️ Uitzendlicentie <span className="text-foreground font-semibold">81319556</span> —
            MistyRadio.org
          </p>
        </div>
      </div>
    </footer>
  )
}
