import { useRef } from "react";

export default function Footer3D() {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y / rect.height - 0.5) * 10; // tilt up/down
    const rotateY = (x / rect.width - 0.5) * 10;   // tilt left/right

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const resetTilt = () => {
    cardRef.current.style.transform = "rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <footer className="bg-black py-10 px-4 md:px-10">
      
      {/* 3D Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        className="max-w-10xl mx-auto rounded-3xl p-10 
                   bg-white/10 backdrop-blur-xl 
                   border border-white/20 
                   shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                   transition-transform duration-300 ease-out
                   text-white"
        style={{ transformStyle: "preserve-3d" }}
      >

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo */}
          <div style={{ transform: "translateZ(40px)" }}>
            <h2 className="text-2xl font-bold mb-3">IYF Mayapur</h2>
            <p className="text-sm text-gray-300">
              Empowering youth through spiritual growth, leadership and purpose.
            </p>
          </div>

          {/* Links */}
          <div style={{ transform: "translateZ(30px)" }}>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-300 cursor-pointer"><a href="/">Home</a></li>
              <li className="hover:text-blue-300 cursor-pointer"><a href="/courses">Courses</a></li>
              <li className="hover:text-blue-300 cursor-pointer"><a href="/events">Events</a></li>
              <li className="hover:text-blue-300 cursor-pointer"><a href="/donation">Donate</a></li>
              <li className="hover:text-blue-300 cursor-pointer"><a href="/gallery">Gallery</a></li>
            </ul>
          </div>

          {/* Journey */}
          <div style={{ transform: "translateZ(30px)" }}>
            <h3 className="font-semibold mb-3">Course Journey</h3>
            <ul className="space-y-2 text-sm">
              <li>Visitor</li>
              <li>Seeker</li>
              <li>Trainee</li>
              <li>Contributor</li>
              <li>Leader</li>
            </ul>
          </div>

          {/* Contact */}
          <div style={{ transform: "translateZ(30px)" }}>
            <h3 className="font-semibold mb-3">Connect</h3>
            <p className="text-sm">Mayapur, India</p>
            <p className="text-sm mb-3">iyf@example.com</p>

            <div className="flex space-x-4 mt-3 text-lg">
              <span className="hover:scale-125 transition">🌐</span>
              <span className="hover:scale-125 transition">📘</span>
              <span className="hover:scale-125 transition">📸</span>
              <span className="hover:scale-125 transition">▶️</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="border-t border-white/20 mt-10 pt-6 text-center text-sm text-gray-300"
          style={{ transform: "translateZ(20px)" }}
        >
          © {new Date().getFullYear()} IYF Mayapur. All rights reserved.
        </div>
      </div>
    </footer>
  );
}