import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';

const MAIN_SITE_URL = import.meta.env.VITE_MAIN_SITE_URL || 'https://iyfmayapur.org';

export default function Footer() {
  const token = localStorage.getItem('token');
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsAdmin(decodedToken.role === 'admin');
    }
  }, [token]);

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
              <img src="logo.png" alt=""/>
            </div>
            <div>
              <p className="text-white font-bold text-sm">IYF Mayapur LMS</p>
              <p className="text-slate-500 text-xs">Learning Management System</p>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <Link to="/lms" className="hover:text-white transition">Courses</Link>
            {token && <Link to="/lms/dashboard" className="hover:text-white transition">Dashboard</Link>}
            {isAdmin && <Link to="/lms/admin" className="hover:text-white transition">Admin</Link>}
            <a href={MAIN_SITE_URL} className="hover:text-indigo-400 transition">← Main Site</a>
          </div>

          {/* Copyright & Credit */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-slate-500 text-xs">
            <p>© 2026 IYF Mayapur. All rights reserved.</p>
            <span className="hidden sm:inline">•</span>
            <p className="flex items-center gap-1">
              Made with <FaHeart className="text-rose-500 text-xs" /> for IYF Sridham Mayapur
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
