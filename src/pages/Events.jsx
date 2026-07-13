import { Link } from 'react-router-dom'
import { FiArrowRight, FiCalendar, FiMapPin } from 'react-icons/fi'
import { events } from '../data/events.js'

export default function Events() {
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
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Explore our events</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-stone-600">Choose an event to see the complete details and reserve your place.</p>
        </div>

        <div className="grid gap-7 md:grid-cols-2">
          {events.map((event) => (
            <Link
              key={event.slug}
              to={`/events/${event.slug}`}
              className="group overflow-hidden rounded-[1.75rem] border border-[#e9dfcd] bg-white shadow-[0_18px_45px_rgba(75,55,24,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_55px_rgba(75,55,24,0.16)] focus:outline-none focus:ring-4 focus:ring-[#d99a43]/30"
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
          ))}
        </div>
      </section>
    </div>
  )
}
