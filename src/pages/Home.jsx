import { useState } from "react";
import Masonry from "react-masonry-css";
import Prabhupada from "../assets/January_20.jpg";
// Import images from /src/assets/life
const lifeImages = [
  "img0.jpg",
  "img1.jpg",
  "img2.jpg",
  "img3.jpg",
  "img4.jpg",
  "img5.jpg",
  "img6.jpg",
  "img7.jpg",
  "img8.jpg",
  "img11.jpg",
  "img9.jpg",
  "img10.jpg",
].map((img) => `/life/${img}`);

export default function Home() {

  const [isOpen, setIsOpen] = useState(false);

  const fontstyle = {
    fontFamily: 'Antonio, sans-serif'
  }
  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden group min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center">
        <img
          src="/youth.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[15000ms] ease-in-out group-hover:scale-110 z-0"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-[radial-gradient(circle,_transparent_40%,_rgba(0,0,0,0.7)_100%)] z-10" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h1
            className="uppercase tracking-wider font-semibold text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-white text-center px-2 md:px-4 font-black tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] animate-pulse-slow"
            style={fontstyle}
          >
            DISCOVER. CONNECT. TRANSFORM.
          </h1>
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="flex flex-col md:flex-row justify-around items-center py-8 md:py-12 px-2 md:px-8 gap-8">
        {/* Left: Text and button */}
        <div className="flex-1 min-w-[220px] flex flex-col items-center text-center py-8 md:py-12 px-2 md:px-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group focus:outline-none"
          >
            <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl group-hover:text-[#BD8E2A]">WHO WE ARE</h1>
            <div
              className={`h-1 mt-6 transition-all duration-500 ${isOpen ? 'w-48 bg-[#BD8E2A]' : 'w-24 bg-gray-600 group-hover:bg-[#BD8E2A]'}`}
              style={{ width: isOpen ? '12rem' : '6rem' }}
            />
          </button>
          <div
            className={`grid transition-all duration-700 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-8' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
          >
            <div className="overflow-hidden">
              <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mb-6">
                The ISKCON Youth Forum(IYF) is a global initiative focused on engaging and empowering young people through spiritual and personal development. It includes Uncovering and harnessing internal potentials such as motivation, concentration, tolerance, self-confidence, and kindness. Protecting young people from self-destructive addictions that damage mind and body.
              </p>
            </div>
          </div>
        </div>
        {/* Right: Image */}
        <div className="flex-1 min-w-[180px] flex justify-center items-center py-6 md:py-8">
          <img
            src="/home.jpg"
            alt="Who we are"
            className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl w-full rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Prabhupada Daily Quote Section */}
      <div
        className="my-8 md:my-12 mx-2 md:mx-15 rounded-[3rem] md:rounded-[8rem] items-center py-8 md:py-12 px-2 md:px-4 justify-center flex flex-col relative overflow-hidden"
        style={{
          background: "radial-gradient(circle, #fefcbf 60%, #fde68a 80%, #f59e42 100%)"
        }}
      >
        <div className="font-semibold text-2xl sm:text-3xl md:text-5xl group-hover:text-[#BD8E2A] py-4 md:py-7 text-[#BD8E2A] z-10 text-center">Prabhupada Daily Quote</div>
        <img src={Prabhupada} alt="" className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl h-auto max-h-80 sm:max-h-96 md:max-h-[28rem] lg:max-h-[32rem] z-10 object-contain" />
      </div>

      {/* Gallery Section */}
      <div className="items-center text-center py-8 md:py-12 px-2 md:px-4">
        <div className="font-['Poppins'] text-xs sm:text-sm tracking-wide my-2 md:my-4">(Photo/Video Gallery)</div>
        <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl group-hover:text-[#BD8E2A]">Life at IYF Mayapur</h1>

        {/* Masonry Image Gallery */}
        <div className="max-w-6xl mx-auto px-1 sm:px-2 md:px-8 py-4 md:py-8">
          <Masonry
            breakpointCols={{ default: 3, 900: 2, 600: 1 }}
            className="flex w-auto gap-2 sm:gap-4"
            columnClassName="masonry-column flex flex-col gap-2 sm:gap-4"
          >
            {lifeImages.map((src, idx) => (
              <img
                key={src}
                src={src}
                alt={`Life at IYF Mayapur ${idx + 1}`}
                className="rounded-lg shadow-md w-full object-cover hover:scale-105 transition-transform duration-300 max-h-60 sm:max-h-72 md:max-h-80 lg:max-h-96"
                loading="lazy"
              />
            ))}
          </Masonry>
        </div>
      </div>
    </div>
  );
}