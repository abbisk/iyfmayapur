import { useNavigate } from 'react-router-dom';

export default function Courses() {
  const navigate = useNavigate();

  return (
    <div className="grid h-[calc(100vh-4rem)] w-full grid-cols-2 gap-0 bg-slate-900 max-md:h-[calc(100dvh-4rem)] max-md:grid-cols-1">
      {/* Youth Courses */}
      <div
        className="relative flex min-h-0 min-w-0 cursor-pointer items-center justify-center overflow-hidden p-0 group"
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
        className="relative flex min-h-0 min-w-0 cursor-pointer items-center justify-center overflow-hidden p-0 group"
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
