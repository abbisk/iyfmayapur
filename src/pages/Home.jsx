// https://www.iskconforyouth.org/learn/home/Lead-Like-Arjuna/section/633153/lesson/4084834?

// Main Focus:
// Youth leaders to preach further
// Course should be simailar like coursera. After one section completion there should be a quiz then next session will oprn.
// Vistor-Seekers- Triee-Contributor-Leader
// These are courses section
// Prize and rewards
// Trust worthy UI and content
// Yoth journey
// Make homepage more attractive
// Notification (WhatsApp integration)
// Mission and Vision(By )
// Blog Section


import { useState } from "react";
import Masonry from "react-masonry-css";
import Prabhupada from "../assets/January_20.jpg";
import 'flowbite';
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
const crousalImages = [
  "/home/youth1.jpeg",
  "/home/youth2.jpeg",
  "/home/youth3.jpeg",
  "/home/youth4.jpeg",
  "/home/youth5.jpeg",
  "/home/youth6.jpeg",
  "/home/youth8.jpeg",
  "/home/youth9.jpeg",
  "/home/youth10.jpeg",
  "/home/youth11.jpeg",
  "/home/youth12.jpeg",
  "/home/youth13.jpeg",
  "/home/youth14.jpeg",
  "/home/youth15.jpeg",
  "/home/youth16.jpeg",
  "/home/youth17.jpeg",
];

export default function Home() {

  const [isOpen, setIsOpen] = useState(false);

  const fontstyle = {
    fontFamily: 'Antonio, sans-serif'
  }
  return (
    <div>
      {/* Crousel Section */}
      <div id="default-carousel" class="relative w-full" data-carousel="slide">
          {/* <!-- Carousel wrapper --> */}
          <div className="relative h-72 overflow-hidden rounded-base md:h-[30rem]">
            {crousalImages.map((src, index) => (
              <div
                key={index}
                className={`duration-700 ease-in-out ${
                  index === 0 ? "" : "hidden"
                }`}
                data-carousel-item={index === 0 ? "active" : ""}
              >
                <img
                  src={src}
                  alt={`slide-${index}`}
                  className="absolute block w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {/* <!-- Slider indicators --> */}
          <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
              <button type="button" class="w-3 h-3 rounded-base" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
              <button type="button" class="w-3 h-3 rounded-base" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
              <button type="button" class="w-3 h-3 rounded-base" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
              <button type="button" class="w-3 h-3 rounded-base" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
              <button type="button" class="w-3 h-3 rounded-base" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
          </div>
          {/* <!-- Slider controls --> */}
          <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
              <span class="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg class="w-5 h-5 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/></svg>
                  <span class="sr-only">Previous</span>
              </span>
          </button>
          <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
              <span class="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg class="w-5 h-5 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg>
                  <span class="sr-only">Next</span>
              </span>
          </button>
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