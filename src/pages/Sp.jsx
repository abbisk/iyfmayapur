import { useEffect, useState } from "react";
import { useTypewriter } from "../components/Typewriter";

export default function Sp() {
  const [scrollY, setScrollY] = useState(0);
const [vh, setVh] = useState(window.innerHeight);


  const  clamp = (num, min=0, max=1) => Math.min(Math.max(num, min), max);

  const fadeBetween = (scrollY, start, end) =>  clamp((scrollY - start) / (end - start));

  useEffect(() => {
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  const handleResize = () => {
    setVh(window.innerHeight);
  };

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);

  handleScroll(); // initialize

  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);
  };
}, []);


  const opacities = [
    1-fadeBetween(scrollY, vh * 0, vh * 1),
    fadeBetween(scrollY, vh * 0.6, vh * 1.6),
    fadeBetween(scrollY, vh * 1.8, vh * 2.2),
    fadeBetween(scrollY, vh * 2.6, vh * 2.8),
    fadeBetween(scrollY, vh * 3.2, vh * 3.4),
  ];

  return (
    <div>
      {/* Slide 1 */}
      <div
        className="fixed top-0 left-0 h-screen w-full
                   bg-[url('/prabhupada-noback.png')]
                   bg-contain bg-right bg-no-repeat
                   items-center 
                   text-white text-3xl font-bold
                   pointer-events-none"
        style={{ opacity: opacities[0] }}
      >
        <div className="mt-20 px-10 md:px-20 lg:px-40 text-[3rem]">
          WHO IS 
          <div>
              SRILA PRABHUPADA  
            </div>?
            <p className="text-[2rem] w-[90vh]">
              
              For millennia the teachings and the rich culture of bhakti-yoga, or Krishna Consciousness, had been hidden within the borders of India. Today, millions around the globe express their gratitude to Srila Prabhupada for revealing the timeless wisdom of bhakti to a world.
            </p>
        </div>
      </div>


      <div className="fixed top-0 left-0 h-screen w-full
                   bg-[url('/prabhupada-with-his-father.jpg')]
                   bg-cover bg-no-repeat
                   pointer-events-none"
                   
                   style={{opacity: opacities[1]}}>
       
         <p className="absolute bottom-20 md:right-20 lg:right-40 w-[170vh] text-center text-white text-[2.5rem] font-bold bg-black/30">
           Srila Prabhupada was born Abhay Charan De on September 1, 1896 to a pious Hindu family in Calcutta.
         </p>
      </div>

      {/* Slide 2 */}
      <div
        className="fixed top-0 left-0 h-screen w-full
                   bg-[url('/prabhupada-gradient.png')]
                   bg-cover bg-no-repeat
                   pointer-events-none"
        style={{ opacity: opacities[2] }}
      >

        <p className="absolute top-20 right-10 md:right-20 lg:right-40 w-[60vh] text-right text-white text-[2.5rem] font-bold">
          
  Abhay, later known by the honorific <br />
  A.C. Bhaktivedanta Swami Prabhupada,<br /> 
  spent the next 32 years preparing for his journey west.
</p>

      </div>
      {/* Slide 3 */}
      <div
        className="fixed top-0 left-0 h-screen w-full
                   bg-[url('/prabhupada-gradient.png')]
                   bg-cover bg-no-repeat
                   pointer-events-none"
        style={{ opacity: opacities[3] }}
      >

        <p className="absolute top-20 right-10 md:right-20 lg:right-40 w-[60vh] text-right text-white text-[2.5rem] font-bold">
          In 1965, at the age of sixty-nine, Srila Prabhupada traveled to New York City aboard a cargo ship.  
</p>

      </div>
      {/* Slide 3 */}
      <div
        className="fixed top-0 left-0 h-screen w-full
                   bg-[url('/prabhupada-gradient.png')]
                   bg-cover bg-no-repeat
                   pointer-events-none"
        style={{ opacity: opacities[4] }}
      >

        <p className="absolute top-20 right-10 md:right-20 lg:right-40 w-[60vh] text-right text-white text-[2.5rem] font-bold">
         The journey was treacherous, and the elderly spiritual teacher suffered two heart attacks aboard ship.  
</p>

      </div>

      {/* Scroll space */}
      <div className="h-[500vh] bg-black" />
    </div>
  );
}
