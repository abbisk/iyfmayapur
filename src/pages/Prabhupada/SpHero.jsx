import React from "react";
import HeroImg from "../../assets/SpImg/SpImg.jpg";
import {
  BookOpen,
  HeartHandshake,
  Library,
  Landmark,
  Video,
} from "lucide-react";

const QUICK_LINKS = [
  {
    id: 1,
    title: "His Life",
    sub: "Journey & Mission",
    icon: BookOpen,
    href: "#life",
  },
  {
    id: 2,
    title: "Teachings",
    sub: "Timeless Wisdom",
    icon: HeartHandshake,
    href: "#teachings",
  },
  {
    id: 3,
    title: "His Books",
    sub: "Sacred Literature",
    icon: Library,
    href: "#books",
  },
  {
    id: 4,
    title: "Mission",
    sub: "Global Impact",
    icon: Landmark,
    href: "#mission",
  },
  {
    id: 5,
    title: "Media",
    sub: "Photos & Videos",
    icon: Video,
    href: "#media",
  },
];

const SpHero = () => {
  return (
    <section className="relative w-full bg-[#120d09] text-white overflow-visible">
      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-8 pb-28 sm:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[580px] lg:min-h-[640px]">
        <div className="lg:col-span-7 flex flex-col items-start gap-4 sm:gap-5 text-left z-10">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
           FOUNDER-ĀCĀRYA
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif leading-[1.12] tracking-tight">
            <span className="text-white font-normal block">
              His Divine Grace
            </span>
            <span className="text-[#f59e0b] font-semibold block mt-1">
              A.C. Bhaktivedanta
            </span>
            <span className="text-[#f59e0b] font-semibold block">
              Swami Prabhupāda
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-stone-200 font-poppins max-w-lg leading-relaxed">
            The visionary who brought ancient Vedic wisdom to the world with
            unwavering devotion and compassion.
          </p>

          <div className="mt-2 border-l-2 border-[#d4af37]/80 pl-4 py-1.5 flex items-start gap-3 bg-white/[0.03] rounded-r-lg max-w-xl">
            <span className="text-2xl font-serif text-[#d4af37] leading-none select-none">
              ❝
            </span>
            <div>
              <p className="text-xs sm:text-sm italic text-stone-200 font-serif leading-relaxed">
                Everyone is independent to think or desire, but the fulfillment of one’s desire depends on the supreme will. This law is expressed as “Man proposes, God disposes.”
              </p>
              <span className="text-[11px] text-[#d4af37] block mt-1.5 font-medium tracking-wide">
                — Śrīla Prabhupāda
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-end">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none" />

          <img
            src={HeroImg}
            alt="Srila Prabhupada"
            className="relative z-10 w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[450px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[92%] max-w-6xl z-20">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.15)] border border-stone-200/80 px-4 py-3 sm:py-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-stone-100">
          {QUICK_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                className="group flex items-center justify-center lg:justify-start gap-3 p-2.5 rounded-xl hover:bg-stone-50 transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 group-hover:bg-[#1b4332] text-[#b45309] group-hover:text-white flex items-center justify-center transition-colors duration-200 shrink-0">
                  <Icon className="w-8 h-8 stroke-[1.8]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-bold text-stone-800 group-hover:text-[#1b4332] leading-tight">
                    {item.title}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-stone-500 font-medium">
                    {item.sub}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpHero;
