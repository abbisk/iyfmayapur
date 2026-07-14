import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Masonry from "react-masonry-css";
import Prabhupada from "../assets/January_20.jpg";

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

const carouselImages = [
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
  const [isOpen, setIsOpen] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return undefined;

    const interval = window.setInterval(() => {
      setCurrentIndex((previous) => (previous + 1) % carouselImages.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  const showPrevious = () => {
    setCurrentIndex((previous) =>
      previous === 0 ? carouselImages.length - 1 : previous - 1
    );
  };

  const showNext = () => {
    setCurrentIndex((previous) => (previous + 1) % carouselImages.length);
  };

  return (
    <div className="home-page">
      <section
        className="home-hero"
        aria-label="Life at IYF Mayapur slideshow"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="home-hero__images">
          {carouselImages.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`IYF Mayapur youth gathering ${index + 1}`}
              className={`home-hero__image ${
                index === currentIndex ? "is-active" : ""
              }`}
              fetchPriority={index === 0 ? "high" : "auto"}
            />
          ))}
        </div>

        <div className="home-hero__shade" />

        <button
          type="button"
          onClick={showPrevious}
          className="home-hero__arrow home-hero__arrow--left"
          aria-label="Show previous image"
        >
          <FiChevronLeft aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={showNext}
          className="home-hero__arrow home-hero__arrow--right"
          aria-label="Show next image"
        >
          <FiChevronRight aria-hidden="true" />
        </button>

        <div className="home-hero__pagination" aria-label="Choose slideshow image">
          {carouselImages.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={index === currentIndex ? "is-active" : ""}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === currentIndex ? "true" : undefined}
            />
          ))}
        </div>
      </section>

      <div>
        <section className="home-intro home-shell">
          <div className="home-intro__content">
            <button
              type="button"
              className="home-section-title home-section-title--button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls="who-we-are-copy"
            >
              <span>WHO WE ARE</span>
              <span className="home-title-rule" />
              <FiChevronDown
                className={isOpen ? "is-open" : ""}
                aria-hidden="true"
              />
            </button>

            <div
              id="who-we-are-copy"
              className={`home-intro__reveal ${isOpen ? "is-open" : ""}`}
            >
              <div>
                <p>
                  The ISKCON Youth Forum(IYF) is a global initiative focused on
                  engaging and empowering young people through spiritual and
                  personal development.
                </p>
              </div>
            </div>
          </div>

          <div className="home-intro__visual">
            <div className="home-intro__sun" aria-hidden="true" />
            <div className="home-intro__frame">
              <img src="/home.jpg" alt="Who we are at IYF Mayapur" />
            </div>
          </div>
        </section>

        <section className="home-quote-wrap">
          <div className="home-quote home-shell">
            <div className="home-quote__heading">
              <span className="home-quote__mark" aria-hidden="true">“</span>
              <h2>Prabhupada Daily Quote</h2>
              <span className="home-title-rule" />
            </div>
            <div className="home-quote__image-wrap">
              <img src={Prabhupada} alt="Prabhupada daily quote" />
            </div>
          </div>
        </section>

        <section className="home-gallery home-shell">
          <div className="home-gallery__heading">
            <h2>Life at IYF Mayapur</h2>
            <span className="home-title-rule" />
          </div>

          <Masonry
            breakpointCols={{ default: 3, 900: 2, 600: 1 }}
            className="home-masonry"
            columnClassName="home-masonry__column"
          >
            {lifeImages.map((src, index) => (
              <figure className="home-gallery__item" key={src}>
                <img
                  src={src}
                  alt={`Life at IYF Mayapur ${index + 1}`}
                  loading="lazy"
                />
              </figure>
            ))}
          </Masonry>
        </section>
      </div>
    </div>
  );
}
