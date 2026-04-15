import { useState } from 'react'

export default function DJs() {
  const djs = [
    {
      name: 'Bram',
      initials: 'BR',
      specialty: '🎵 Piraten hits',
      bio: 'Bram is onze zend piraten en doe elke vrijdag de weekend om met piraten muziek om je weekend gezellig in te knallen',
    },
    {
      name: 'Cas',
      initials: 'CA',
      bio: 'DJ bij MistyRadio.',
    },

    {
      name: 'Lucas',
      initials: 'LU',
      bio: 'DJ bij MistyRadio.',
    },
    {
      name: 'Pim',
      initials: 'PI',
      bio: 'DJ bij MistyRadio.',
    },
    {
      name: 'Steef',
      initials: 'ST',
      bio: 'DJ bij MistyRadio.',
    },
    {
      name: 'Thomas',
      initials: 'TH',
      bio: 'DJ bij MistyRadio.',
    },
    {
      name: 'vikie',
      initials: 'VI',
      specialty: '🎵 happy hardcore',
      bio: 'DJ bij MistyRadio.',
    },
  ]

  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-primary-light mb-4">
            Het team
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">Onze DJ&apos;s</h1>
          <p className="text-lg text-muted">De mensen achter de muziek.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {djs.map((dj, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-250 hover:-translate-y-1"
              style={{
                borderColor: hoveredCard === index ? 'rgba(59,130,246,0.4)' : '',
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="h-[140px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <div className="w-[90px] h-[90px] rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white border-[3px] border-white/15">
                  {dj.initials}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold">{dj.name}</h3>
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-md border border-blue-500/20">
                    DJ
                  </span>
                </div>

                {dj.specialty && (
                  <div className="text-sm text-primary-light mb-3">{dj.specialty}</div>
                )}

                <p className="text-sm text-muted leading-relaxed">{dj.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
