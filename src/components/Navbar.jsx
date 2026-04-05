import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full h-16 z-50 bg-black/10 backdrop-blur-md px-3 sm:px-7 flex items-center justify-between">
      <h1 className="text-lg xs:text-xl sm:text-2xl font-bold flex items-center space-x-2 sm:space-x-3">
        <img src="/logo.png" alt="" className="h-8 w-12 sm:h-10 sm:w-16 object-contain px-1 sm:px-2" />
        <span>IYF Sridham Mayapur</span>
      </h1>

      {/* Hamburger for mobile */}
      <button
        className="sm:hidden flex flex-col justify-center items-center h-10 w-10 focus:outline-none"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle menu"
      >
        <span className={`block w-7 h-0.5 bg-white mb-1.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-7 h-0.5 bg-white mb-1.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-7 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Desktop menu */}
      <ul className="hidden sm:flex space-x-4 md:space-x-6">
        <li>
          <Link to='/' className='hover:text-blue-600 transition-colors font-bold'>Home</Link>
        </li>
        <li>
          <Link to='/events' className='hover:text-blue-600 transition-colors font-bold'>Events</Link>
        </li>
        <li>
          <Link to='/courses' className='hover:text-blue-600 transition-colors font-bold'>Courses</Link>
        </li>
        <li>
          <Link to='/store' className='hover:text-blue-600 transition-colors font-bold'>Store</Link>
        </li>
        <li>
          <Link to='/sp' className='hover:text-blue-600 transition-colors font-bold'>Srila Prabhupada</Link>
        </li>
      </ul>

      {/* Mobile menu */}
      <div
        className={`sm:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-black/80 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col space-y-8 text-2xl font-bold">
          <li>
            <Link to='/' className='hover:text-blue-400 transition-colors' onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to='/events' className='hover:text-blue-400 transition-colors' onClick={() => setMenuOpen(false)}>Events</Link>
          </li>
          <li>
            <Link to='/courses' className='hover:text-blue-400 transition-colors' onClick={() => setMenuOpen(false)}>Courses</Link>
          </li>
          <li>
            <Link to='/store' className='hover:text-blue-400 transition-colors' onClick={() => setMenuOpen(false)}>Store</Link>
          </li>
          <li>
            <Link to='/sp' className='hover:text-blue-400 transition-colors' onClick={() => setMenuOpen(false)}>Srila Prabhupada</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}