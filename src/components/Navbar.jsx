import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Courses', path: '/courses' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Store', path: '/store' },
    { name: 'Donation', path: '/donation' },
    { name: 'Srila Prabhupada', path: '/sp' },
  ];

  // Scroll percentage calculation
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic styles
  const textColor =
    scrollProgress < 0.1
      ? 'text-gray-700'
      : scrollProgress < 0.3
      ? 'text-black'
      : 'text-gray-900';

  const navStyle =
    scrollProgress < 0.01
      ? 'bg-transparent'
      : 'bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.2)]';

  const hoverStyle =
    scrollProgress < 0.5
      ? 'hover:text-blue-600'
      : 'hover:text-blue-300 hover:drop-shadow-[0_0_6px_rgba(147,197,253,0.8)]';

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-16 z-50 px-3 sm:px-7 flex items-center justify-between transition-all duration-300 ${navStyle}`}
    >
      {/* Logo */}
      <h1
        className={`text-lg xs:text-xl sm:text-2xl font-bold flex items-center space-x-2 sm:space-x-3 transition-colors duration-300 ${textColor}`}
      >
        <img
          src="/logo.png"
          alt="logo"
          className="h-8 w-12 sm:h-10 sm:w-16 object-contain px-1 sm:px-2"
        />
        <span>IYF Sridham Mayapur</span>
      </h1>

      {/* Hamburger */}
      <button
        className="sm:hidden flex flex-col justify-center items-center h-10 w-10 focus:outline-none"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span
          className={`block w-7 h-0.5 mb-1.5 transition-all duration-300 ${textColor} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
        ></span>
        <span
          className={`block w-7 h-0.5 mb-1.5 transition-all duration-300 ${textColor} ${menuOpen ? 'opacity-0' : ''}`}
        ></span>
        <span
          className={`block w-7 h-0.5 transition-all duration-300 ${textColor} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
        ></span>
      </button>

      {/* Desktop Menu */}
      <ul
        className={`hidden sm:flex items-end space-x-4 md:space-x-6 group transition-colors duration-300 ${textColor}`}
      >
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="transform transition-all duration-300 group-hover:scale-95 hover:!scale-110 hover:-translate-y-1"
          >
            <Link
              to={item.path}
              className={`block px-3 py-2 font-semibold transition-all duration-300 ${hoverStyle}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-300 ${
          menuOpen
            ? 'opacity-100 pointer-events-auto bg-black/40'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col space-y-8 text-2xl font-bold text-white">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="hover:text-blue-300 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
