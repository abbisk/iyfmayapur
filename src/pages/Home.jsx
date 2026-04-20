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


import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import Prabhupada from "../assets/January_20.jpg";

// Gallery images
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

// Carousel images
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
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === crousalImages.length - 1 ? 0 : prev + 1
      );
    }, 5000); // 4 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* 🔥 Smooth Carousel */}
      <div className="relative w-full overflow-hidden">
        <div className="relative h-72 md:h-[30rem]">
          {crousalImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt=""
              className={`absolute w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
          {crousalImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-white scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Prev */}
        <button
          onClick={() =>
            setCurrentIndex(
              currentIndex === 0
                ? crousalImages.length - 1
                : currentIndex - 1
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50"
        >
          ‹
        </button>

        {/* Next */}
        <button
          onClick={() =>
            setCurrentIndex(
              currentIndex === crousalImages.length - 1
                ? 0
                : currentIndex + 1
            )
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50"
        >
          ›
        </button>
      </div>

      {/* Who We Are Section */}
      <div className="flex flex-col md:flex-row justify-around items-center py-8 md:py-12 px-2 md:px-8 gap-8">
        <div className="flex-1 min-w-[220px] flex flex-col items-center text-center py-8 md:py-12 px-2 md:px-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group focus:outline-none"
          >
            <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl group-hover:text-[#BD8E2A]">
              WHO WE ARE
            </h1>
            <div
              className={`h-1 mt-6 transition-all duration-500 ${
                isOpen
                  ? "w-48 bg-[#BD8E2A]"
                  : "w-24 bg-gray-600 group-hover:bg-[#BD8E2A]"
              }`}
              style={{ width: isOpen ? "12rem" : "6rem" }}
            />
          </button>

          <div
            className={`grid transition-all duration-700 ${
              isOpen
                ? "grid-rows-[1fr] opacity-100 mt-8"
                : "grid-rows-[0fr] opacity-0 mt-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mb-6">
                The ISKCON Youth Forum(IYF) is a global initiative focused on
                engaging and empowering young people through spiritual and
                personal development.
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-[180px] flex justify-center items-center py-6 md:py-8">
          <img
            src="/home.jpg"
            alt="Who we are"
            className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl w-full rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Prabhupada Quote */}
      <div className="my-8 md:my-12 mx-2 md:mx-15 rounded-[3rem] md:rounded-[8rem] items-center py-8 md:py-12 px-2 md:px-4 justify-center flex flex-col relative overflow-hidden">
        <div className="font-semibold text-2xl sm:text-3xl md:text-5xl text-[#BD8E2A] py-4 md:py-7 text-center">
          Prabhupada Daily Quote
        </div>
        <img
          src={Prabhupada}
          alt=""
          className="w-full max-w-2xl object-contain"
        />
      </div>

      {/* Gallery */}
      <div className="text-center py-8 md:py-12 px-2 md:px-4">
        <h1 className="font-semibold text-3xl md:text-5xl">
          Life at IYF Mayapur
        </h1>

        <div className="max-w-6xl mx-auto px-2 md:px-8 py-4 md:py-8">
          <Masonry
            breakpointCols={{ default: 3, 900: 2, 600: 1 }}
            className="flex gap-4"
            columnClassName="flex flex-col gap-4"
          >
            {lifeImages.map((src, idx) => (
              <img
                key={src}
                src={src}
                alt=""
                className="rounded-lg shadow-md w-full object-cover hover:scale-105 transition-transform"
              />
            ))}
          </Masonry>
        </div>
      </div>
    </div>
  );
}