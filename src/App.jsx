import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Prabhupada from './pages/Prabhupada/Prabhupada.jsx'
import StudentCourses from './pages/StudentCourses.jsx'
import Player from './pages/Player.jsx'
import { Home, Events, Seva, Store, Courses, Donation } from './pages/index.jsx'
import ViewCourse from './pages/ViewCourse.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Footer from './components/Footer.jsx'
import Gallery from "./pages/Gallery.jsx"
import EventDetails from './pages/EventDetails.jsx'
import Banner from './updates/Banner.jsx'


function App() {
  return (
    <>
      <Banner />
      <Navbar />

      <main style={{ paddingTop: 'calc(4rem + var(--camp-banner-height, 0px))' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prabhupada" element={<Prabhupada />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventSlug" element={<EventDetails />} />
          <Route path="/seva" element={<Seva />} />
          <Route path="/store" element={<Store />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/youth-courses" element={<StudentCourses />} />
          <Route path="/course/:courseId" element={<ViewCourse />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/player" element={<Player />} />
          <Route path="/player/:courseId" element={<Player />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App
