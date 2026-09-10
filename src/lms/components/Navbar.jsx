import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {  FaBars, FaTimes, FaArrowLeft } from 'react-icons/fa';
import {jwtDecode} from 'jwt-decode';

// URL of the main IYF site — update for production
const MAIN_SITE_URL = import.meta.env.VITE_MAIN_SITE_URL || 'https://iyfmayapur.org';

const navLinks = [
  { name: 'Courses', path: '/' },
  { name: 'Youth Courses', path: '/youth' },
  { name: 'Vedic Courses', path: '/vedic' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem('token'));


  const isActive = (path) => {
    const routePath = path === '/' ? '/lms' : `/lms${path}`;
    if (path === '/') return location.pathname === '/lms' || location.pathname === '/lms/';
    return location.pathname === routePath || location.pathname.startsWith(`${routePath}/`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(false);
    window.location.href = '/login'; // Redirect to login page after logout
  };

  return (
    <nav className="fixed top-0 left-0 z-50 h-16 w-full border-b border-slate-800 bg-blue-300 shadow-lg backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">

        {/* Logo */}
        <Link to="/lms" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-500/30 transition-all duration-300 group-hover:shadow-indigo-500/50">
            <img className="block h-full w-full object-contain" src="/logo.png" alt="IYF Mayapur"/>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg leading-tight font-lexend">IYF Mayapur LMS</span>
            <span className="text-indigo-800 text-[10px] font-semibold uppercase tracking-widest leading-tight">Learning Portal</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden list-none items-center gap-5 p-0 md:flex">
          {navLinks.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path === '/' ? '/lms' : `/lms${item.path}`}
                className={`px-3 py-2 rounded text-sm font-semibold transition-all duration-200 ${
                  isActive(item.path)
                    ? ' text-blue-800 border-y border-indigo-700 border-b-2'
                    : 'text-black hover:text-white hover:bg-indigo-800'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}

          {token && (
            <li>
             <Link
                to='/lms/dashboard'
                className={`px-3 py-2 rounded text-sm font-semibold transition-all duration-200 ${
                  isActive('/dashboard')
                    ? ' text-blue-800 border-y border-indigo-700 border-b-2'
                    : 'text-black hover:text-white hover:bg-indigo-800'
                }`}
              >
                Dashboard
              </Link>
            
          </li>
          )}

          {token && jwtDecode(token).role === 'admin' && (
            <li>
             <Link
                to='/lms/admin'
                className={`px-3 py-2 rounded text-sm font-semibold transition-all duration-200 ${
                  isActive('/admin')
                    ? ' text-blue-800 border-y border-indigo-700 border-b-2'
                    : 'text-black hover:text-white hover:bg-indigo-800'
                }`}
              >
                Admin Portal
              </Link>
            
          </li>
          )}

          <li>
            <a
              href={MAIN_SITE_URL}
              className="rounded border border-indigo-950/25 bg-white/70 px-3 py-2 text-sm font-semibold text-indigo-950 transition-all duration-200 hover:bg-indigo-950 hover:text-white"
            >
              Main Site
            </a>
          </li>
          
        </ul>

        {/* Back to Main Site + Hamburger */}
        <div className="flex shrink-0 items-center gap-3">
          {token ? (
            <button
            onClick={handleLogout}
            className="hidden min-h-9 items-center gap-2 rounded-lg border border-slate-700 bg-indigo-300 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:border-indigo-950 hover:bg-indigo-800 hover:text-white sm:flex"
          >
            <FaArrowLeft className="text-xs" />
            Logout
          </button>
          ):(<>
            <Link
            to='/lms/register'
            className="hidden min-h-9 items-center gap-2 rounded-lg border border-slate-700 bg-indigo-300 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:border-indigo-950 hover:bg-indigo-800 hover:text-white sm:flex"
          >
            Register
          </Link>
            <Link
            to='/lms/login'
            className="hidden min-h-9 items-center gap-2 rounded-lg border border-slate-700 bg-indigo-500 px-3 py-2 text-xs font-semibold text-white transition hover:border-indigo-950 hover:bg-indigo-800 sm:flex"
          >
            <FaArrowLeft className="text-xs" />
            Login
          </Link></>
          )}
          

          {/* Mobile hamburger */}
          <button
            type="button"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed left-0 top-16 z-40 block w-full overflow-hidden border-b border-slate-800 bg-blue-300 backdrop-blur-xl transition-all duration-300 md:hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col p-4 gap-1">
          {navLinks.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path === '/' ? '/lms' : `/lms${item.path}`}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-indigo-600/20 text-indigo-600'
                    : 'text-black hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}

          {token && <li>
              <Link
                to='/lms/dashboard'
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive("/dashboard")
                    ? 'bg-indigo-600/20 text-indigo-600'
                    : 'text-black hover:text-white hover:bg-slate-800'
                }`}
              >
                Dashboard
              </Link>
            </li>}

            {token && jwtDecode(token).role === 'admin' && <li>
              <Link
                to='/lms/admin'
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive("/admin")
                    ? 'bg-indigo-600/20 text-indigo-600'
                    : 'text-black hover:text-white hover:bg-slate-800'
                }`}
              >
                Admin Portal
              </Link>
            </li>}

            <li>
              {!token ? (<><Link
                to='/lms/register'
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive("/register")
                    ? 'bg-indigo-600/20 text-indigo-600'
                    : 'text-black hover:text-white hover:bg-slate-800'
                }`}
              >
                Register
              </Link>
              <Link
                to='/lms/login'
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive("/login")
                    ? 'bg-indigo-600/20 text-indigo-600'
                    : 'text-black hover:text-white hover:bg-slate-800'
                }`}
              >
                Login
              </Link></>)
              :(<Link
                to='/logout'
                onClick={handleLogout}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 bg-red-600 text-white hover:bg-red-800`}
              >
                Logout
              </Link>)}
              
              
            </li>

          <li className="pt-2 border-t border-slate-800 mt-2">
            <a
              href={MAIN_SITE_URL}
              className="flex items-center gap-2 px-4 py-3 text-slate-700 hover:text-white text-sm font-semibold"
            >
              <FaArrowLeft className="text-xs" />
              Back to IYF Main Site
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
