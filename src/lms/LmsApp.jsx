import { Routes, Route } from 'react-router-dom'
import './index.css'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Courses from './pages/Courses.jsx'
import StudentCourses from './pages/StudentCourses.jsx'
import VedicCourses from './pages/VedicCourses.jsx'
import ViewCourse from './pages/ViewCourse.jsx'
import Player from './pages/Player.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 ">
        <Routes>
          <Route index element={<Courses />} />
          <Route path="youth" element={<StudentCourses />} />
          <Route path="vedic" element={<VedicCourses />} />
          <Route path="course/:courseId" element={<ViewCourse />} />
          <Route path="player" element={<Player />} />
          <Route path="player/:courseId" element={<Player />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App
