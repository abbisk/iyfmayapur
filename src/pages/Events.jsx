import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCalendar, FiMapPin } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { events } from '../data/events.js'

const campStartTime = new Date('2026-10-16T00:00:00+05:30').getTime()

function getTimeLeft(targetTime) {
  const difference = Math.max(targetTime - Date.now(), 0)

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

export default function Events() {
  const featuredSlug = 'alumni-camp-jagannath-puri-2026'
  const featuredEvent = events.find((event) => event.slug === featuredSlug)
  const otherEvents = events.filter((event) => event.slug !== featuredSlug)
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(campStartTime))

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft(campStartTime)), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#fffaf2] text-[#252116]">
      <section className="relative isolate overflow-hidden bg-[#1f3b2d] px-5 py-20 text-white sm:py-28">
        <div className="absolute -left-20 top-4 -z-10 h-72 w-72 rounded-full bg-[#e9a23b]/25 blur-3xl" />
        <div className="absolute -right-20 bottom-0 -z-10 h-80 w-80 rounded-full bg-[#9fc66b]/20 blur-3xl" />
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide text-[#f9d995] backdrop-blur">
            Gather • Grow • Celebrate
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight sm:text-6xl lg:text-7xl">
            Experiences that stay with you.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
            Join IYF Mayapur for uplifting festivals, practical seminars, camps and spiritual journeys created especially for youth.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="mb-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#b66d24]">What’s happening</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Upcoming event spotlight</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-stone-600">Showing one exclusive upcoming event right now, like an upcoming contest highlight.</p>
        </div>

        {featuredEvent && (
          <Link
            to={`/events/${featuredEvent.slug}`}
            className="group block overflow-hidden rounded-[2rem] border border-[#e9dfcd] bg-white shadow-[0_22px_55px_rgba(75,55,24,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_62px_rgba(75,55,24,0.18)] focus:outline-none focus:ring-4 focus:ring-[#d99a43]/30"
            aria-label={`View details for ${featuredEvent.title}`}
          >
            <div className="grid md:grid-cols-[1.1fr_1fr]">
              <div className="relative min-h-[280px] overflow-hidden sm:min-h-[360px]">
                <img src={featuredEvent.image} alt={featuredEvent.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-[#fffaf2]/95 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-[#805019] shadow-sm">
                  Upcoming Exclusive
                </span>
              </div>

              <div className="flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b66d24]">{featuredEvent.category}</p>
                  <h3 className="mt-3 text-3xl font-black leading-tight transition group-hover:text-[#a85e19] sm:text-4xl">{featuredEvent.title}</h3>
                  <p className="mt-4 leading-7 text-stone-600">{featuredEvent.summary}</p>
                </div>

                <div className="mt-6">
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-stone-500">
                    <span className="flex items-center gap-2"><FiCalendar className="text-[#b66d24]" />{featuredEvent.date}</span>
                    <span className="flex items-center gap-2"><FiMapPin className="text-[#b66d24]" />{featuredEvent.location}</span>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-[#f0e1bb] bg-[#fffaf2] p-3 shadow-sm sm:p-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8b6338]">Starts in</p>
                    </div>
                    <div className="flex items-center gap-2 text-[#1f2a25]">
                      {[
                        { label: 'Days', value: timeLeft.days },
                        { label: 'Hours', value: String(timeLeft.hours).padStart(2, '0') },
                        { label: 'Min', value: String(timeLeft.minutes).padStart(2, '0') },
                        { label: 'Sec', value: String(timeLeft.seconds).padStart(2, '0') },
                      ].map((unit) => (
                        <div key={unit.label} className="min-w-[58px] rounded-xl bg-white px-2 py-2 text-center shadow-sm">
                          <div className="text-lg font-black">{unit.value}</div>
                          <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8b6338]">{unit.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#276244] px-5 py-3 font-bold text-white transition group-hover:bg-[#1d5037]">
                    View upcoming event <FiArrowRight className="transition group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {!!otherEvents.length && (
          <div className="mt-14">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#b66d24]">More events</p>
            <h3 className="mt-2 text-2xl font-black sm:text-3xl">Also explore</h3>
            <div className="mt-7 grid gap-7 md:grid-cols-2">
              {otherEvents.map((event, index) => (
                <motion.div
                  key={event.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <motion.div
                    whileHover={{
                      y: -12,
                      rotate: index % 2 === 0 ? -1.5 : 1.5,
                      scale: 1.02,
                      boxShadow: '0 22px 50px rgba(75,55,24,0.18)',
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  >
                    <Link
                      to={`/events/${event.slug}`}
                      className="group block overflow-hidden rounded-[1.75rem] border border-[#e9dfcd] bg-white shadow-[0_18px_45px_rgba(75,55,24,0.08)] focus:outline-none focus:ring-4 focus:ring-[#d99a43]/30"
                      aria-label={`View details for ${event.title}`}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img src={event.image} alt={event.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                        <span className="absolute left-5 top-5 rounded-full bg-[#fffaf2]/95 px-3 py-1.5 text-xs font-bold text-[#805019] shadow-sm">
                          {event.category}
                        </span>
                      </div>

                      <div className="p-6 sm:p-7">
                        <h3 className="text-2xl font-extrabold transition group-hover:text-[#a85e19]">{event.title}</h3>
                        <p className="mt-3 line-clamp-2 leading-7 text-stone-600">{event.summary}</p>
                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-stone-500">
                          <span className="flex items-center gap-2"><FiCalendar className="text-[#b66d24]" />{event.date}</span>
                          <span className="flex items-center gap-2"><FiMapPin className="text-[#b66d24]" />{event.location}</span>
                        </div>
                        <div className="mt-6 flex items-center gap-2 font-bold text-[#1f6345]">
                          View details <FiArrowRight className="transition group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
