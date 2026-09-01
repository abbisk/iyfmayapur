import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { FiArrowLeft, FiCalendar, FiCheck, FiClock, FiMapPin, FiUsers } from 'react-icons/fi'
import { getEventBySlug } from '../data/events.js'

const upcomingCampStart = new Date('2026-10-16T00:00:00+05:30').getTime()

function getResponseUrl(url) {
  return url?.replace(/\/viewform(?:\?.*)?$/, '/formResponse')
}

function getTimeLeft(targetTime) {
  const difference = Math.max(targetTime - Date.now(), 0)

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

export default function EventDetails() {
  const { eventSlug } = useParams()
  const event = getEventBySlug(eventSlug)
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle')
  const [configurationError, setConfigurationError] = useState(false)
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(upcomingCampStart))

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(upcomingCampStart))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  if (!event) return <Navigate to="/events" replace />

  const activeGoogleForm = event.registrationForm
  const showCampPosterInsteadOfForm = event.slug === 'alumni-camp-jagannath-puri-2026'
  const isGoogleFormConfigured = Boolean(
    activeGoogleForm?.url &&
    activeGoogleForm.fields?.length &&
    activeGoogleForm.fields.every((field) => field.entry),
  )

  const handleSubmit = (submitEvent) => {
    if (!isGoogleFormConfigured) {
      submitEvent.preventDefault()
      setConfigurationError(true)
      return
    }
    setConfigurationError(false)
    setStatus('submitting')
  }

  const handleGoogleResponse = () => {
    if (status !== 'submitting') return
    setStatus('success')
    formRef.current?.reset()
  }

  return (
    <div className="min-h-screen bg-[#fffaf2] text-[#252116]">
      <iframe name="google-form-response" title="Google Form response" className="hidden" onLoad={handleGoogleResponse} />

      <section className="relative min-h-[480px] overflow-hidden">
        <img src={event.image} alt={event.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#13251c]/95 via-[#13251c]/75 to-[#13251c]/20" />
        <div className="relative mx-auto flex min-h-[480px] max-w-6xl flex-col justify-end px-5 py-14 text-white">
          <Link to="/events" className="absolute top-8 inline-flex items-center gap-2 rounded-full bg-black/25 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-black/40">
            <FiArrowLeft /> Back to events
          </Link>
          <span className="mb-4 w-fit rounded-full bg-[#e5a74f] px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#31200b]">{event.category}</span>
          <h1 className="max-w-3xl text-4xl font-black sm:text-6xl">{event.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{event.summary}</p>
        </div>
      </section>

      {event.slug === 'alumni-camp-jagannath-puri-2026' && (
        <div className="mx-auto -mt-8 max-w-6xl px-5">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] border border-[#e9dfcd] bg-white p-5 shadow-[0_20px_50px_rgba(75,55,24,0.08)] sm:p-7">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b66d24]">Countdown</p>
              <h2 className="mt-2 text-2xl font-black text-[#1f2a25]">Camp starts in</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4" aria-label="Time left until the camp">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: String(timeLeft.hours).padStart(2, '0') },
                { label: 'Min', value: String(timeLeft.minutes).padStart(2, '0') },
                { label: 'Sec', value: String(timeLeft.seconds).padStart(2, '0') },
              ].map((unit) => (
                <div key={unit.label} className="rounded-2xl border border-[#f0e1bb] bg-[#fffaf2] px-4 py-3 text-center shadow-sm">
                  <div className="text-2xl font-black text-[#1f2a25] sm:text-3xl">{unit.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b6338]">{unit.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[1fr_420px] lg:py-20">
        <article>
          <div className="grid gap-3 sm:grid-cols-3">
            <Info icon={<FiCalendar />} label="Date" value={event.date} />
            <Info icon={<FiMapPin />} label="Venue" value={event.location} />
            <Info icon={<FiClock />} label="Duration" value={event.duration} />
            {event.contribution && <Info icon={<FiUsers />} label="Contribution" value={event.contribution} />}
            {event.registrationDeadline && <Info icon={<FiCalendar />} label="Register by" value={event.registrationDeadline} />}
          </div>

          <div className="mt-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#b66d24]">About the event</p>
            <h2 className="mt-2 text-3xl font-black">A meaningful experience awaits</h2>
            <p className="mt-5 text-lg leading-8 text-stone-600">{event.description}</p>
          </div>

          <div className="mt-10 rounded-3xl bg-[#e9f0dd] p-7 sm:p-9">
            <h3 className="flex items-center gap-3 text-xl font-extrabold"><FiUsers className="text-[#367153]" />What to look forward to</h3>
            <ul className="mt-5 space-y-4">
              {event.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-stone-700"><FiCheck className="mt-1 shrink-0 text-[#367153]" />{highlight}</li>
              ))}
            </ul>
          </div>
        </article>

        <aside id="registration" className="h-fit rounded-[1.75rem] border border-[#e9dfcd] bg-white p-6 shadow-[0_20px_50px_rgba(75,55,24,0.12)] sm:p-8 lg:sticky lg:top-24">
          {!activeGoogleForm ? (
            <div className="py-10 text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f5ead7] text-2xl text-[#a85e19]"><FiCalendar /></span>
              <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-[#b66d24]">Coming soon</p>
              <h2 className="mt-2 text-2xl font-black">Registration opening soon</h2>
              <p className="mt-3 leading-7 text-stone-600">The registration form for {event.title} will be available here once it is announced.</p>
            </div>
          ) : status === 'success' ? (
            <div className="py-12 text-center" role="status">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dfeeda] text-3xl text-[#276244]"><FiCheck /></span>
              <h2 className="mt-5 text-2xl font-black">Response received!</h2>
              <p className="mt-3 leading-7 text-stone-600">Thank you. Your response for {event.title} has been submitted.</p>
              <button type="button" onClick={() => setStatus('idle')} className="mt-6 font-bold text-[#a85e19] hover:underline">Submit another response</button>
            </div>
          ) : (
            <>
              {event.registrationUrl && (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mb-6 flex w-full items-center justify-center rounded-xl bg-[#276244] px-5 py-3.5 text-center font-extrabold text-white shadow-lg shadow-[#276244]/15 transition hover:bg-[#1d5037] focus:outline-none focus:ring-4 focus:ring-[#276244]/20"
                >
                  Register for the camp
                </a>
              )}
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#b66d24]">{activeGoogleForm.eyebrow || 'Reserve your place'}</p>
              <h2 className="mt-2 text-2xl font-black">{activeGoogleForm.title || 'Register your interest'}</h2>
              <p className="mt-2 text-sm leading-6 text-stone-500">{activeGoogleForm.description || 'Fill in your details to register for this event.'}</p>

              {showCampPosterInsteadOfForm ? (
                <div className="mt-6 overflow-hidden rounded-2xl border border-[#e9dfcd] bg-[#fffcf7]">
                  <img
                    src="/puriCamp.jpeg"
                    alt="Jagannath Puri camp registration details"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <form
                  ref={formRef}
                  className="mt-6 space-y-4"
                  action={getResponseUrl(activeGoogleForm.url)}
                  method="POST"
                  target="google-form-response"
                  onSubmit={handleSubmit}
                >
                  {activeGoogleForm.fields.map((field) => <FormField key={field.entry} field={field} />)}

                  {configurationError && (
                    <p className="rounded-xl bg-red-50 p-3 text-sm leading-5 text-red-700" role="alert">This event’s Google Form configuration is incomplete. Check its URL and field IDs in <code>events.js</code>.</p>
                  )}

                  <button disabled={status === 'submitting'} className="w-full rounded-xl bg-[#276244] px-5 py-3.5 font-extrabold text-white shadow-lg shadow-[#276244]/15 transition hover:bg-[#1d5037] disabled:cursor-wait disabled:opacity-70">
                    {status === 'submitting' ? 'Sending response…' : activeGoogleForm.submitLabel || 'Register for this event'}
                  </button>
                  <p className="text-center text-xs leading-5 text-stone-400">Your response is securely submitted to our Google Form.</p>
                </form>
              )}
            </>
          )}
        </aside>
      </main>
    </div>
  )
}

function Info({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-[#e9dfcd] bg-white p-5">
      <span className="text-xl text-[#b66d24]">{icon}</span>
      <p className="mt-3 text-xs font-bold uppercase tracking-wider text-stone-400">{label}</p>
      <p className="mt-1 font-bold text-stone-700">{value}</p>
    </div>
  )
}

function FormField({ field }) {
  const { label, entry, required, type = 'text', ...inputProps } = field

  return (
    <label className="block text-sm font-bold text-stone-700">
      {label}{!required && <span className="font-normal text-stone-400"> (optional)</span>}
      {type === 'textarea' ? (
        <textarea name={entry} required={required} {...inputProps} className="mt-2 w-full resize-none rounded-xl border border-stone-200 bg-[#fffcf7] px-4 py-3 font-normal outline-none transition placeholder:text-stone-400 focus:border-[#b87934] focus:ring-4 focus:ring-[#d99a43]/10" />
      ) : (
        <input name={entry} required={required} type={type} {...inputProps} className="mt-2 w-full rounded-xl border border-stone-200 bg-[#fffcf7] px-4 py-3 font-normal outline-none transition placeholder:text-stone-400 focus:border-[#b87934] focus:ring-4 focus:ring-[#d99a43]/10" />
      )}
    </label>
  )
}
