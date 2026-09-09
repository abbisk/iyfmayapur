import { useNavigate } from 'react-router-dom';

export default function Courses() {
  const navigate = useNavigate();

  return (
    <div className="lms-category-grid w-full">
      {/* Youth Courses */}
      <div
        className="lms-category-panel lms-category-panel--youth relative overflow-hidden group flex items-center justify-center cursor-pointer"
        onClick={() => navigate('/lms/youth')}
      >
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/road.jpg')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"></div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 transition-colors duration-700 group-hover:bg-black/60"></div>
        {/* Text */}
        <h2 className="relative z-10 text-white text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-semibold tracking-wide text-center px-2 transition-transform duration-700 group-hover:-translate-y-2">
          Youth Courses
        </h2>
      </div>

      {/* Vedic Courses */}
      <div
        className="lms-category-panel lms-category-panel--vedic relative overflow-hidden group flex items-center justify-center cursor-pointer"
        onClick={() => navigate('/lms/vedic')}
      >
        <div className="absolute inset-0 bg-[url('/dev.jpg')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"></div>
        <div className="absolute inset-0 bg-black/40 transition-colors duration-700 group-hover:bg-black/60"></div>
        <h2 className="relative z-10 text-white text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-semibold tracking-wide text-center px-2 transition-transform duration-700 group-hover:-translate-y-2">
          Vedic Courses
        </h2>
      </div>
    </div>
  );
}
