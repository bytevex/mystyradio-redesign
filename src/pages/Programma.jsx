import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Clock, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { format, addDays, startOfWeek, addWeeks } from 'date-fns'
import { nl } from 'date-fns/locale'

export default function Programma() {
  const [weekOffset, setWeekOffset] = useState(0)
  const [schedule, setSchedule] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const DAG_NAMEN = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag']

  // Genereer week dagen
  const getWeekDays = () => {
    const today = new Date()
    const weekStart = startOfWeek(addWeeks(today, weekOffset), { weekStartsOn: 1 })
    const days = []

    for (let i = 0; i < 7; i++) {
      const date = addDays(weekStart, i)
      const dayIndex = date.getDay()
      days.push({
        date: format(date, 'yyyy-MM-dd'),
        dagNaam: DAG_NAMEN[dayIndex],
        dayNum: format(date, 'd'),
        monthLabel: format(date, 'MMM', { locale: nl }),
        isToday: format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'),
      })
    }
    return days
  }

  const days = getWeekDays()
  const weekLabel = `${days[0].dayNum} – ${days[6].dayNum} ${days[6].monthLabel} ${format(addDays(new Date(), weekOffset * 7), 'yyyy')}`

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true)
      setError(null)

      try {
        const from = days[0].date
        const to = days[6].date
        const response = await fetch(`/api/rooster?action=week&from=${from}&to=${to}`)

        if (!response.ok) throw new Error('Rooster API niet beschikbaar')

        const contentType = response.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Rooster API is momenteel niet beschikbaar')
        }

        const data = await response.json()

        if (!data.ok) {
          throw new Error('Rooster kan niet worden geladen')
        }

        // Groepeer shows per datum
        const byDate = {}
        if (data.data) {
          data.data.forEach((show) => {
            if (!byDate[show.date]) byDate[show.date] = []
            byDate[show.date].push(show)
          })
        }

        setSchedule(byDate)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSchedule()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekOffset])

  // Check of show live is
  const isShowLive = (date, start, end) => {
    const today = format(new Date(), 'yyyy-MM-dd')
    if (date !== today) return false

    const now = format(new Date(), 'HH:mm')
    return now >= start && now < end
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      {/* Hero */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-background via-background to-background-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-primary-light rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary-light">
                Live Rooster
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Uitzend<span className="gradient-text">rooster</span>
            </h1>
            <p className="text-muted max-w-md mx-auto">
              Bekijk wie er deze week op de radio is bij MistyRadio.
            </p>
          </motion.div>

          {/* Week navigatie */}
          <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
            <button
              onClick={() => setWeekOffset(weekOffset - 1)}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors text-sm font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              Vorige week
            </button>

            <span className="px-4 py-2 font-semibold text-sm min-w-[200px] text-center">
              {weekOffset === 0 ? 'Deze week · ' : ''}
              {weekLabel}
            </span>

            <button
              onClick={() => setWeekOffset(weekOffset + 1)}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors text-sm font-semibold"
            >
              Volgende week
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Loading / Error states */}
          {loading && (
            <div className="text-center py-16">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-light" />
              <p className="text-muted">Rooster wordt geladen...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8 px-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
              <p className="text-red-400">⚠️ {error}</p>
            </div>
          )}

          {/* Rooster Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {days.map((day, index) => {
                const dayShows = schedule[day.date] || []

                return (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-white/5 backdrop-blur-sm border rounded-2xl overflow-hidden ${
                      day.isToday
                        ? 'border-primary/40 shadow-md shadow-primary/10'
                        : 'border-white/10'
                    }`}
                  >
                    {/* Header */}
                    <div
                      className={`px-3 py-2.5 border-b flex items-baseline gap-2 ${
                        day.isToday
                          ? 'bg-primary/10 border-primary/20'
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <span
                        className={`text-xs font-bold uppercase tracking-wider ${
                          day.isToday ? 'text-primary-light' : 'text-muted'
                        }`}
                      >
                        {day.dagNaam.substring(0, 2)}
                      </span>
                      <span className="text-xs text-muted opacity-70">
                        {day.dayNum} {day.monthLabel}
                      </span>
                      {day.isToday && (
                        <span className="ml-auto text-[10px] font-bold tracking-wider px-2 py-0.5 bg-primary/20 border border-primary/30 rounded-full text-primary-light">
                          VANDAAG
                        </span>
                      )}
                    </div>

                    {/* Shows */}
                    <div className="p-2 space-y-2 min-h-[100px]">
                      {dayShows.length === 0 ? (
                        <div className="text-center text-muted text-sm opacity-50 py-4">—</div>
                      ) : (
                        dayShows.map((show, showIndex) => {
                          const isLive = isShowLive(day.date, show.start, show.end)
                          const isCancelled = show.status === 'cancelled'
                          const borderColor = show.color || '#3b82f6'

                          return (
                            <div
                              key={showIndex}
                              className={`p-2.5 rounded-lg border-l-3 transition-colors ${
                                isLive ? 'bg-primary/10 shadow-sm' : 'bg-white/5 hover:bg-white/10'
                              } ${isCancelled ? 'opacity-50 line-through grayscale' : ''}`}
                              style={{ borderLeftColor: borderColor, borderLeftWidth: '3px' }}
                            >
                              <div className="flex items-center gap-1 text-[11px] text-muted mb-1">
                                {isLive && (
                                  <span className="w-1 h-1 bg-primary-light rounded-full animate-pulse" />
                                )}
                                <Clock className="w-3 h-3" />
                                <span>
                                  {show.start} – {show.end}
                                </span>
                              </div>
                              <div className="text-sm font-bold leading-tight mb-0.5 truncate">
                                {show.title}
                              </div>
                              {show.dj && (
                                <div className="text-xs text-muted truncate">{show.dj}</div>
                              )}
                            </div>
                          )
                        })
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
