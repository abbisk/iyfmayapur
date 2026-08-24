import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiCalendar, FiClock, FiMapPin, FiMinus, FiPlus } from 'react-icons/fi'
import { events } from '../data/events.js'

const upcomingCamp = events.find((event) => event.category.toLowerCase().includes('camp'))
const campStartTime = new Date('2026-10-16T00:00:00+05:30').getTime()

function getTimeLeft() {
  const difference = Math.max(campStartTime - Date.now(), 0)

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}
export default function Banner() {
  const bannerRef = useRef(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const banner = bannerRef.current
    if (!banner) return undefined

    const updateBannerHeight = () => {
      document.documentElement.style.setProperty('--camp-banner-height', `${banner.offsetHeight}px`)
    }

    updateBannerHeight()
    const resizeObserver = new ResizeObserver(updateBannerHeight)
    resizeObserver.observe(banner)

    return () => {
      resizeObserver.disconnect()
      document.documentElement.style.removeProperty('--camp-banner-height')
    }
  }, [])

  if (!upcomingCamp) return null

  const toggleBanner = (event) => {
    if (event.target.closest('a, button')) return
    setIsMinimized((minimized) => !minimized)
  }

  return (
    <aside ref={bannerRef} onClick={toggleBanner} className={`camp-banner fixed inset-x-0 top-0 z-40 cursor-pointer overflow-hidden border-b text-[#342313] shadow-[0_8px_24px_rgba(79,50,11,0.12)] ${isScrolled ? 'camp-banner--scrolled' : ''} ${isMinimized ? 'camp-banner--minimized' : ''}`}>
      <span className="camp-banner__shine" aria-hidden="true" />
      <div className={`camp-banner__content relative mx-auto grid max-w-7xl items-center gap-4 px-4 py-3 sm:px-7 sm:py-2.5 ${isMinimized ? 'camp-banner__content--minimized' : ''}`}>
        <div className={`camp-banner__info min-w-0 ${isMinimized ? 'flex items-center gap-3' : ''}`}>
          <p className="flex items-center gap-2 text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-[#805019]">
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#bd4d24]" />
            Upcoming camp
          </p>
          <h2 className={`camp-banner__title ${isMinimized ? 'mt-0' : 'mt-1'} truncate font-serif text-lg font-bold leading-tight sm:text-xl`}>{upcomingCamp.title}</h2>
          {!isMinimized && (
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-[#684b27] sm:text-sm">
              <span className="flex items-center gap-1.5"><FiCalendar />{upcomingCamp.date}</span>
              <span className="hidden items-center gap-1.5 sm:flex"><FiMapPin />{upcomingCamp.location}</span>
            </div>
          )}
        </div>

        <div className="camp-banner__timer flex items-center gap-2" aria-label="Time left until the camp">
          <FiClock className="hidden text-lg sm:block" />
          <span><strong>{timeLeft.days}</strong><small>days</small></span>
          <span><strong>{String(timeLeft.hours).padStart(2, '0')}</strong><small>hours</small></span>
          <span><strong>{String(timeLeft.minutes).padStart(2, '0')}</strong><small>min</small></span>
          <span><strong>{String(timeLeft.seconds ?? 0).padStart(2, '0')}</strong><small>sec</small></span>
        </div>

        <div className="camp-banner__actions flex shrink-0 items-center gap-2">
          {!isMinimized && (
            <Link
              to={`/events/${upcomingCamp.slug}`}
              className="camp-banner__cta flex items-center gap-1.5 rounded-full bg-[#276244] px-3.5 py-2.5 text-xs font-extrabold text-white shadow-md shadow-[#276244]/20 transition hover:-translate-y-0.5 hover:bg-[#1d5037] focus:outline-none focus:ring-4 focus:ring-[#276244]/25 sm:px-5 sm:py-3 sm:text-sm"
            >
              <span>Register Now</span>
              <FiArrowUpRight className="text-base" />
            </Link>
          )}
          <button
            type="button"
            onClick={() => setIsMinimized((minimized) => !minimized)}
            aria-label={isMinimized ? 'Expand upcoming camp banner' : 'Minimize upcoming camp banner'}
            title={isMinimized ? 'Expand banner' : 'Minimize banner'}
            className="camp-banner__close grid h-8 w-8 shrink-0 place-items-center rounded-full text-current transition hover:bg-black/10 focus:outline-none focus:ring-4 focus:ring-current/20"
          >
            {isMinimized ? <FiPlus className="text-lg" /> : <FiMinus className="text-lg" />}
          </button>
        </div>
      </div>
    </aside>
  )
}