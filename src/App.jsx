import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import StudentCourses from './pages/StudentCourses.jsx'
import Player from './pages/Player.jsx'
import { Home, Sp, Events, Seva, Store, Courses } from './pages/index.jsx'
import ViewCourse from './pages/ViewCourse.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import Dashboard from './pages/Dashboard.jsx'

function App() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sp" element={<Sp />} />
          <Route path="/events" element={<Events />} />
          <Route path="/seva" element={<Seva />} />
          <Route path="/store" element={<Store />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/youth-courses" element={<StudentCourses />} />
          <Route path="/course/:courseId" element={<ViewCourse />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/player" element={<Player />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App
