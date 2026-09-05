import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import PrabhupadaImg from "../../assets/SpImg/PrabhupadaImg.jpg";
import Teachingbg from "../../assets/SpImg/Teachings.png";

const TIMELINE_DATA = [
  {
    year: "1896",
    text: "Born in Kolkata, India",
  },
  {
    year: "1922",
    text: "Met his spiritual master, Srila Bhaktisiddhanta Sarasvati Thakura",
  },
  {
    year: "1944",
    text: "Began Back to Godhead magazine",
  },
  {
    year: "1965",
    text: "Sailed to New York to spread Kṛṣṇa consciousness",
  },
  {
    year: "1966",
    text: "Founded ISKCON in New York",
  },
  {
    year: "1977",
    text: "Left this world in Vrindavan, but his mission continues eternally",
  },
];

const PrabhupadaLife = () => {
  return (
    <>
      <section
        id="life"
        className="w-full pt-36 sm:pt-36 pb-16 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto font-poppins"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 flex flex-col items-start gap-5 text-left">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#c28422]">
              A LIFE DEDICATED TO KṚṢṆA
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-bold text-[#1f5d42] leading-[1.18] tracking-tight">
              His Life. <br /> His Mission. <br />
              His Legacy.
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal pr-2">
              Born in Kolkata in 1896, Srila Prabhupada dedicated his life to
              spreading the message of Lord Kṛṣṇa. At the age of 70, he sailed
              to the West with nothing but unwavering faith — and founded
              ISKCON, a global spiritual movement that continues to transform
              lives today.
            </p>

            <div className="pt-2">
              <Link
                to="/Prabhupada"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#141414] hover:bg-black text-white text-xs sm:text-sm font-semibold rounded-full shadow-md transition-all duration-200 active:scale-95 group"
              >
                <span>Explore His Life Story</span>
                <FiArrowUpRight className="w-4 h-4 text-[#c28422] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#fdfcf9] border border-stone-200/70 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.04)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Timeline */}
            <div className="md:col-span-7 relative py-2">
              <div className="absolute left-[60px] sm:left-[60px] top-3 bottom-4 w-[1.5px] bg-[#d4af37]/80" />

              <div className="flex flex-col gap-6">
                {TIMELINE_DATA.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 relative">
                    <span className="w-10 text-right text-xs font-bold text-stone-900 tracking-tight shrink-0 pt-0.5">
                      {item.year}
                    </span>

                    <div className="relative z-10 flex items-center justify-center shrink-0 pt-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] ring-4 ring-[#fdfcf9]" />
                    </div>

                    <p className="text-xs text-stone-700 font-medium leading-snug">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 h-full flex items-center justify-center">
              <div className="w-full h-[450px] sm:h-[360px] rounded-2xl overflow-hidden shadow-sm border border-stone-100 bg-stone-100">
                <img
                  src={PrabhupadaImg}
                  alt="Srila Prabhupada walking"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="teachings"
        className="w-full py-2 px-4 sm:px-8 max-w-8xl mx-auto font-poppins"
      >
        <div className="relative w-full rounded-[28px] overflow-hidden min-h-[320px] sm:min-h-[300px] md:h-[260px] flex items-center justify-center shadow-xl bg-[#0d0906]">
          <img
            src={Teachingbg}
            alt="Teachings Background"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center px-6 sm:px-12 max-w-xl ">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37] mb-1">
              TIMELESS WISDOM
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-serif font-bold text-white tracking-tight leading-tight">
              Teachings for Life
            </h2>

            <div className="flex items-center gap-1 my-3 text-[#d4af37]">
              <div className="w-8 h-[1.5px] bg-[#d4af37]" />
              <span className="text-xs leading-none">›</span>
            </div>

            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed max-w-md font-light">
              His teachings are a practical guide to spiritual living in the
              modern world. Simple, profound and life-transforming.
            </p>

            <div className="mt-5">
              <Link
                to="/store"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#d4af37]/80 hover:border-[#d4af37] bg-black/40 hover:bg-[#d4af37]/10 text-[#d4af37] text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95 group"
              >
                <span>Read Teachings</span>
                <FiArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrabhupadaLife;
