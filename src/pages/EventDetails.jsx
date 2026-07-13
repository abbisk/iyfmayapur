import { useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { FiArrowLeft, FiCalendar, FiCheck, FiClock, FiMapPin, FiUsers } from 'react-icons/fi'
import { getEventBySlug } from '../data/events.js'

const googleForm = {
  url: import.meta.env.VITE_GOOGLE_FORM_URL,
  name: import.meta.env.VITE_GOOGLE_FORM_NAME_FIELD,
  email: import.meta.env.VITE_GOOGLE_FORM_EMAIL_FIELD,
  phone: import.meta.env.VITE_GOOGLE_FORM_PHONE_FIELD,
  city: import.meta.env.VITE_GOOGLE_FORM_CITY_FIELD,
  age: import.meta.env.VITE_GOOGLE_FORM_AGE_FIELD,
  occupation: import.meta.env.VITE_GOOGLE_FORM_OCCUPATION_FIELD,
  event: import.meta.env.VITE_GOOGLE_FORM_EVENT_FIELD,
  message: import.meta.env.VITE_GOOGLE_FORM_MESSAGE_FIELD,
}

const jagannathPuriForm = {
  url: 'https://docs.google.com/forms/d/e/1FAIpQLSfEOZLmBt0DYKxdLKYOxTkCwIa3qUF1jc_b8cwtRXpSq5Kz5g/viewform',
  name: 'entry.997006378',
  phone: 'entry.1450428578',
  japaCount: 'entry.1973636941',
  date: 'entry.152846947',
}

const genericGoogleFields = ['url', 'name', 'email', 'phone', 'city', 'age', 'occupation', 'event', 'message']

function getResponseUrl(url) {
  return url?.replace(/\/viewform(?:\?.*)?$/, '/formResponse')
}

export default function EventDetails() {
  const { eventSlug } = useParams()
  const event = getEventBySlug(eventSlug)
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle')
  const [configurationError, setConfigurationError] = useState(false)

  if (!event) return <Navigate to="/events" replace />

  const isJagannathPuriCamp = event.registrationType === 'jagannath-puri'
  const activeGoogleForm = isJagannathPuriCamp ? jagannathPuriForm : googleForm
  const isGoogleFormConfigured = isJagannathPuriCamp || genericGoogleFields.every((field) => googleForm[field])

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

      <main className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[1fr_420px] lg:py-20">
        <article>
          <div className="grid gap-3 sm:grid-cols-3">
            <Info icon={<FiCalendar />} label="Date" value={event.date} />
            <Info icon={<FiMapPin />} label="Venue" value={event.location} />
            <Info icon={<FiClock />} label="Duration" value={event.duration} />
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
          {status === 'success' ? (
            <div className="py-12 text-center" role="status">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dfeeda] text-3xl text-[#276244]"><FiCheck /></span>
              <h2 className="mt-5 text-2xl font-black">{isJagannathPuriCamp ? 'Response received!' : 'Registration received!'}</h2>
              <p className="mt-3 leading-7 text-stone-600">
                {isJagannathPuriCamp ? `Thank you. Your response for ${event.title} has been submitted.` : `Thank you for your interest in ${event.title}. Our team will contact you with the next steps.`}
              </p>
              <button type="button" onClick={() => setStatus('idle')} className="mt-6 font-bold text-[#a85e19] hover:underline">Submit another response</button>
            </div>
          ) : (
            <>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#b66d24]">{isJagannathPuriCamp ? 'Camp response' : 'Reserve your place'}</p>
              <h2 className="mt-2 text-2xl font-black">{isJagannathPuriCamp ? 'Share your details' : 'Register your interest'}</h2>
              <p className="mt-2 text-sm leading-6 text-stone-500">
                {isJagannathPuriCamp ? 'Enter the details requested for the Jagannath Puri alumni camp.' : 'Fill in your details and we’ll share the schedule and registration information.'}
              </p>

              <form
                ref={formRef}
                className="mt-6 space-y-4"
                action={getResponseUrl(activeGoogleForm.url)}
                method="POST"
                target="google-form-response"
                onSubmit={handleSubmit}
              >
                {isJagannathPuriCamp ? (
                  <>
                    <FormField label="Full name" name={activeGoogleForm.name} type="text" placeholder="Your full name" autoComplete="name" />
                    <FormField label="Mobile number" name={activeGoogleForm.phone} type="tel" placeholder="Your mobile number" autoComplete="tel" pattern="[0-9+() -]{7,18}" />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField label="Japa count" name={activeGoogleForm.japaCount} type="number" placeholder="Number of rounds" min="0" />
                      <FormField label="Date" name={activeGoogleForm.date} type="date" />
                    </div>
                  </>
                ) : (
                  <>
                    <input type="hidden" name={activeGoogleForm.event} value={event.title} />
                    <FormField label="Full name" name={activeGoogleForm.name} type="text" placeholder="Your full name" autoComplete="name" />
                    <FormField label="Email address" name={activeGoogleForm.email} type="email" placeholder="you@example.com" autoComplete="email" />
                    <FormField label="Phone number" name={activeGoogleForm.phone} type="tel" placeholder="Your phone number" autoComplete="tel" pattern="[0-9+() -]{7,18}" />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField label="City" name={activeGoogleForm.city} type="text" placeholder="Your city" autoComplete="address-level2" />
                      <FormField label="Age" name={activeGoogleForm.age} type="number" placeholder="Age" min="12" max="100" />
                    </div>
                    <FormField label="Occupation / college" name={activeGoogleForm.occupation} type="text" placeholder="What do you do?" />
                    <label className="block text-sm font-bold text-stone-700">
                      Message <span className="font-normal text-stone-400">(optional)</span>
                      <textarea name={activeGoogleForm.message} rows="3" placeholder="Anything you would like us to know?" className="mt-2 w-full resize-none rounded-xl border border-stone-200 bg-[#fffcf7] px-4 py-3 font-normal outline-none transition placeholder:text-stone-400 focus:border-[#b87934] focus:ring-4 focus:ring-[#d99a43]/10" />
                    </label>
                  </>
                )}

                {configurationError && (
                  <p className="rounded-xl bg-red-50 p-3 text-sm leading-5 text-red-700" role="alert">Google Form settings are missing. Add the form URL and field IDs to your <code>.env</code> file.</p>
                )}

                <button disabled={status === 'submitting'} className="w-full rounded-xl bg-[#276244] px-5 py-3.5 font-extrabold text-white shadow-lg shadow-[#276244]/15 transition hover:bg-[#1d5037] disabled:cursor-wait disabled:opacity-70">
                  {status === 'submitting' ? 'Sending response…' : isJagannathPuriCamp ? 'Submit response' : 'Register for this event'}
                </button>
                <p className="text-center text-xs leading-5 text-stone-400">Your response is securely submitted to our Google Form.</p>
              </form>
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

function FormField({ label, ...inputProps }) {
  return (
    <label className="block text-sm font-bold text-stone-700">
      {label}
      <input required {...inputProps} className="mt-2 w-full rounded-xl border border-stone-200 bg-[#fffcf7] px-4 py-3 font-normal outline-none transition placeholder:text-stone-400 focus:border-[#b87934] focus:ring-4 focus:ring-[#d99a43]/10" />
    </label>
  )
}
