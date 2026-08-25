import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const MENU_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Courses", path: "/courses" },
  { name: "Gallery", path: "/gallery" },
  { name: "Store", path: "/store" },
  { name: "Donation", path: "/donation" },
  { name: "Srila Prabhupada", path: "/prabhupada" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{ top: 'var(--camp-banner-height, 0px)' }}
      className={`fixed left-0 w-full h-16 z-40 px-4 sm:px-8 flex items-center justify-between transition-all duration-300 ${
        isScrolled
          ? "bg-white/20 backdrop-blur-md shadow-sm "
          : "bg-transparent"
      }`}
    >
      {/* Brand / Logo */}
      <NavLink to="/" className="flex items-center gap-3 py-4">
        <img
          src="/logo.png"
          alt="IYF Mayapur Logo"
          className="h-12 w-auto object-contain"
        />
        <div className="flex flex-col leading-tight font-semibold">
          <span className="text-xl font-bold text-[#1f5d42]">IYF</span>
          <span className="text-lg font-semibold text-[#1f5d42] font-serif">
            Sridham Mayapur
          </span>
        </div>
      </NavLink>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex items-center gap-8">
        {MENU_ITEMS.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `relative py-4 text-base font-medium transition-colors duration-200 block ${
                  isActive
                    ? "text-[#1f5d42] font-semibold"
                    : "text-gray-800 hover:text-[#1f5d42]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}

                  {/* Active Page Indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-1.5 pointer-events-none">
                      <div className="h-[1px] w-5 bg-gradient-to-r from-transparent to-amber-500" />
                      <span className="text-amber-500 text-[10px] animate-pulse">
                        ✦
                      </span>
                      <div className="h-[1px] w-5 bg-gradient-to-l from-transparent to-amber-500" />
                    </div>
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      <NavLink
        to="/join"
        onClick={() => setMenuOpen(false)}
        className="py-2 px-5 bg-[#1f5d42] hidden lg:block hover:bg-[#184a34] text-white text-center font-semibold rounded-xl shadow-md active:scale-98 transition-all duration-200"
      >
        Join Us
      </NavLink>

      {/* Mobile Hamburger Button */}
      <button
        type="button"
        aria-label="Toggle Navigation Menu"
        onClick={() => setMenuOpen((prev) => !prev)}
        className="sm:hidden p-2 text-gray-800 focus:outline-none"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span
            className={`h-0.5 w-full bg-current rounded transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`h-0.5 w-full bg-current rounded transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-full bg-current rounded transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </div>
      </button>

      {/* Mobile Dropdown Menu */}
      <div
        style={{ top: 'calc(var(--camp-banner-height, 0px) + 4rem)' }}
        className={`sm:hidden fixed inset-x-0 top-16 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-xl transition-all duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div
          style={{ maxHeight: 'calc(100vh - (var(--camp-banner-height, 0px) + 4rem))' }}
          className="flex flex-col px-6 py-6 overflow-y-auto"
        >
          {/* Navigation Links */}
          <ul className="flex flex-col space-y-1">
            {MENU_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? "bg-[#1f5d42]/10 text-[#1f5d42] font-semibold"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#1f5d42]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.name}</span>
                      {isActive && (
                        <span className="text-amber-500 text-xs">✦</span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Subtle Divider */}
          <div className="my-4 border-t border-gray-100" />

          {/* Join Us Call-To-Action Button */}
          <NavLink
            to="/join"
            onClick={() => setMenuOpen(false)}
            className="w-full py-3 px-4 bg-[#1f5d42] hover:bg-[#184a34] text-white text-center font-semibold rounded-xl shadow-md active:scale-98 transition-all duration-200"
          >
            Join Us
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
