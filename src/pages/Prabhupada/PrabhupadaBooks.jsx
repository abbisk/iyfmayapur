import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Books from "../../assets/SpImg/SpBooks.png";
import Quotebg from "../../assets/SpImg/QuoteBg.png";

const PrabhupadaBooks = () => {
  return (
    <section
      id="books"
      className="w-full py-12 px-4 sm:px-8 max-w-7xl mx-auto font-poppins flex flex-col gap-10"
    >
      {/* 1. Main Books Showcase White Card */}
      <div className="w-full bg-[#fdfcf9] border border-stone-200/80 rounded-[28px] p-6 sm:p-10 lg:p-12 shadow-[0_4px_25px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Typography & Button (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-start gap-4 text-left">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#c28422]">
            HIS SACRED LEGACY
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-serif font-bold text-[#1f5d42] leading-snug tracking-tight">
            His Books, His Gift to the World
          </h2>

          <div className="flex items-center gap-1 my-1 text-[#d4af37]">
            <div className="w-9 h-[1.5px] bg-[#d4af37]" />
            <span className="text-xs leading-none">›</span>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal max-w-sm">
            Srila Prabhupada's books are a treasury of spiritual knowledge. Over
            80 books translated into 80+ languages.
          </p>

          <div className="pt-2">
            <Link
              to="/store"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#171717] hover:bg-black text-white text-xs sm:text-sm font-semibold rounded-xl sm:rounded-2xl shadow-md transition-all duration-200 active:scale-95 group"
            >
              <span>Explore His Books</span>
              <FiArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7 flex items-center justify-center lg:justify-end">
          <img
            src={Books}
            alt="Srila Prabhupada Sacred Books"
            className="w-full h-auto max-h-[290px] sm:max-h-[340px] object-contain drop-shadow-md hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
      </div>

      <div className="relative w-full rounded-2xl sm:rounded-[24px] overflow-hidden bg-[#140e0a] px-6 sm:px-12 py-7 sm:py-8 shadow-lg flex items-center justify-between border border-[#d4af37]/25">
        <img
          src={Quotebg}
          alt=""
          className="absolute right-0 top-0 h-full w-auto object-cover opacity-20 pointer-events-none mix-blend-screen"
        />

        <div className="relative z-10 flex items-center gap-4 sm:gap-6 max-w-3xl">
          <span className="text-3xl sm:text-5xl font-serif text-[#d4af37] leading-none select-none shrink-0 -mt-2">
            ❝
          </span>

          <div className="flex flex-col gap-1 text-right">
            <p className="text-sm sm:text-base lg:text-lg font-serif italic text-stone-100 leading-relaxed">
             I will never die, I shall live for my books, and you will utilize
            </p>
            <span className="text-xs sm:text-sm text-[#d4af37] font-medium tracking-wide">
              — Śrīla Prabhupāda
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrabhupadaBooks;
