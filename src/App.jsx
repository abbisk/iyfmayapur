import { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import PageTransition from './components/PageTransition.jsx'
import { getEventBySlug } from './data/events.js'

const Home = lazy(() => import('./pages/Home.jsx'))
const Prabhupada = lazy(() => import('./pages/Prabhupada/Prabhupada.jsx'))
const StudentCourses = lazy(() => import('./pages/StudentCourses.jsx'))
const Player = lazy(() => import('./pages/Player.jsx'))
const ViewCourse = lazy(() => import('./pages/ViewCourse.jsx'))
const PageNotFound = lazy(() => import('./pages/PageNotFound.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const Gallery = lazy(() => import('./pages/Gallery.jsx'))
const EventDetails = lazy(() => import('./pages/EventDetails.jsx'))
const Events = lazy(() => import('./pages/Events.jsx'))
const Seva = lazy(() => import('./pages/Seva.jsx'))
const Store = lazy(() => import('./pages/Store.jsx'))
const Courses = lazy(() => import('./pages/Courses.jsx'))
const Donation = lazy(() => import('./pages/Donation.jsx'))

function PageLoader() {
  return <div className="flex min-h-[40vh] items-center justify-center text-sm text-stone-500">Loading...</div>
}

function App() {
  const location = useLocation()
  const [showEventPopup, setShowEventPopup] = useState(false)
  const event = getEventBySlug('alumni-camp-jagannath-puri-2026')

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('iyf-event-popup-seen')
    if (!hasSeenPopup && event) {
      const popupTimer = window.setTimeout(() => {
        setShowEventPopup(true)
      }, 2000)

      return () => window.clearTimeout(popupTimer)
    }

    return undefined
  }, [event])

  const closePopup = () => {
    setShowEventPopup(false)
    sessionStorage.setItem('iyf-event-popup-seen', 'true')
  }

  return (
    <>
      <Navbar />

      <main className="pt-16">
        <AnimatePresence mode="wait">
          <Suspense fallback={<PageLoader />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/prabhupada" element={<PageTransition><Prabhupada /></PageTransition>} />
              <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
              <Route path="/events/:eventSlug" element={<PageTransition><EventDetails /></PageTransition>} />
              <Route path="/seva" element={<PageTransition><Seva /></PageTransition>} />
              <Route path="/store" element={<PageTransition><Store /></PageTransition>} />
              <Route path="/donation" element={<PageTransition><Donation /></PageTransition>} />
              <Route path="/courses" element={<PageTransition><Courses /></PageTransition>} />
              <Route path="/youth-courses" element={<PageTransition><StudentCourses /></PageTransition>} />
              <Route path="/course/:courseId" element={<PageTransition><ViewCourse /></PageTransition>} />
              <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
              <Route path="/player" element={<PageTransition><Player /></PageTransition>} />
              <Route path="/player/:courseId" element={<PageTransition><Player /></PageTransition>} />
              <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
              <Route path="*" element={<PageTransition><PageNotFound /></PageTransition>} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showEventPopup && event && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="event-popup fixed inset-0 z-50 flex items-center justify-center bg-[#0a1714]/65 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.93, rotateX: -8 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 180, damping: 20, mass: 0.9 }}
              className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-[#e9dfcd] bg-white shadow-[0_30px_90px_rgba(19,29,23,0.28)]"
            >
              <button
                type="button"
                onClick={closePopup}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-lg font-bold text-[#1f3b2d] shadow-sm transition hover:scale-105"
                aria-label="Close event announcement"
              >
                ×
              </button>

              <img src={event.image} alt={event.title} className="h-56 w-full object-cover" />

              <div className="space-y-4 p-5 sm:p-6">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#b66d24]">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_14px_rgba(16,185,129,0.95)]" />
                  Upcoming event
                </div>

                <div>
                  <h3 className="text-2xl font-black leading-snug text-[#1f2a25]">{event.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{event.summary}</p>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#f7f1e6] px-3 py-2 text-sm text-[#563d22]">
                  <span>{event.date}</span>
                  <span>{event.location}</span>
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={closePopup}
                    className="flex-1 rounded-xl border border-[#dcc9ad] bg-white px-4 py-3 font-semibold text-[#2e2a27] transition hover:bg-[#f9f3eb]"
                  >
                    Later
                  </button>
                  <Link
                    to={`/events/${event.slug}`}
                    onClick={closePopup}
                    className="flex-1 rounded-xl bg-[#276244] px-4 py-3 text-center font-bold text-white shadow-lg shadow-[#276244]/20 transition hover:bg-[#1d5037]"
                  >
                    Register now
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}

export default App
