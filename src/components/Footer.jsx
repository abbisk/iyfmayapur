export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 px-4 md:px-10 mt-16">
      
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            IYF Mayapur
          </h2>
          <p className="text-sm leading-relaxed">
            Empowering youth through spiritual wisdom, leadership, and
            personal growth. Join the journey from seeker to leader.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/courses" className="hover:text-white">Courses</a></li>
            <li><a href="/events" className="hover:text-white">Events</a></li>
            <li><a href="/donation" className="hover:text-white">Donate</a></li>
          </ul>
        </div>

        {/* Courses */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Journey
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Visitor</li>
            <li>Seeker</li>
            <li>Trainee</li>
            <li>Contributor</li>
            <li>Leader</li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Connect
          </h3>
          <p className="text-sm mb-3">Mayapur, West Bengal, India</p>
          <p className="text-sm mb-3">iyf@example.com</p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-3">
            <a href="#" className="hover:text-white">🌐</a>
            <a href="#" className="hover:text-white">📘</a>
            <a href="#" className="hover:text-white">📸</a>
            <a href="#" className="hover:text-white">▶️</a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
        © {new Date().getFullYear()} IYF Mayapur. All rights reserved.
      </div>
    </footer>
  );
}