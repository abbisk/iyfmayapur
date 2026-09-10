 import { createElement, useEffect, useState } from "react";
import { motion } from 'framer-motion';
import {
  FiArrowUpRight,
  FiBookOpen,
  FiCalendar,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiHeart,
  FiUsers,
} from "react-icons/fi";
import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";
import Prabhupada from "../assets/January_20.jpg";
import AnimatedCard from '../components/AnimatedCard.jsx';
import { cloudinaryAsset } from "../lib/cloudinary";

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
].map((img) => cloudinaryAsset(`/life/${img}`, { width: 900, crop: "limit" }));

const homepageGalleryPreview = lifeImages.slice(0, 3);

const getDailyQuote = () => {
  const today = new Date();
  const month = today.toLocaleString("en-US", { month: "long" });
  const day = String(today.getDate()).padStart(2, "0");

  return {
    label: `${month} ${today.getDate()}`,
    url: `https://raw.githubusercontent.com/Namit210/q/main/output/${month}_${day}.jpg`,
  };
};

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
].map((image) => cloudinaryAsset(image, { width: 1600, crop: "limit" }));

const pathways = [
  {
    icon: FiBookOpen,
    eyebrow: "Learn",
    title: "Wisdom for everyday life",
    description:
      "Explore practical courses rooted in the Bhagavad Gita and timeless Vedic wisdom.",
    link: "/courses",
    label: "Explore courses",
  },
  {
    icon: FiCalendar,
    eyebrow: "Connect",
    title: "Gather, celebrate, grow",
    description:
      "Meet a vibrant youth community through retreats, festivals and weekly gatherings.",
    link: "/events",
    label: "View events",
  },
  {
    icon: FiHeart,
    eyebrow: "Contribute",
    title: "Make your time meaningful",
    description:
      "Use your energy and talents in service while building friendships that last.",
    link: "/seva",
    label: "Discover seva",
  },
];

export default function Home() {
  const dailyQuote = getDailyQuote();
  const [isOpen, setIsOpen] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [quoteImage, setQuoteImage] = useState(dailyQuote.url);
  const visibleCarouselImages = [
    currentIndex,
    (currentIndex + 1) % carouselImages.length,
  ];

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
      <motion.section
        className="home-hero"
        aria-label="Life at IYF Mayapur slideshow"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="home-hero__images">
          {visibleCarouselImages.map((imageIndex) => (
            <img
              key={carouselImages[imageIndex]}
              src={carouselImages[imageIndex]}
              alt={`IYF Mayapur youth gathering ${imageIndex + 1}`}
              className={`home-hero__image ${
                imageIndex === currentIndex ? "is-active" : ""
              }`}
              loading={imageIndex === currentIndex ? "eager" : "lazy"}
              fetchPriority={imageIndex === currentIndex ? "high" : "low"}
              decoding="async"
            />
          ))}
        </div>

        <div className="home-hero__shade" />

        <motion.div
          className="home-hero__content home-shell"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          <p className="home-hero__eyebrow">ISKCON Youth Forum · Sridham Mayapur</p>
          <h1>Find your purpose.<br />Live with wisdom.</h1>
          <p className="home-hero__lead">
            A joyful community helping young people discover clarity, character
            and a deeper connection through timeless spiritual wisdom.
          </p>
          <div className="home-hero__actions">
            <Link to="/courses" className="home-button home-button--gold">
              Begin your journey <FiArrowUpRight aria-hidden="true" />
            </Link>
            <Link to="/events" className="home-button home-button--glass">
              Upcoming events
            </Link>
          </div>
        </motion.div>

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
      </motion.section>

      <motion.div
        className="home-highlights home-shell"
        aria-label="IYF highlights"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45 }}
      >
        <div><strong>15+</strong><span>Transformative courses</span></div>
        <div><strong>500+</strong><span>Young lives inspired</span></div>
        <div><FiUsers aria-hidden="true" /><span>A welcoming community</span></div>
      </motion.div>

      <div>
        <motion.section
          className="home-intro home-shell"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
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
                  The ISKCON Youth Forum (IYF) is a global initiative focused on
                  engaging and empowering young people through spiritual and
                  personal development.
                </p>
                <Link to="/sp" className="home-text-link">
                  Our inspiration <FiArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          <div className="home-intro__visual">
            <div className="home-intro__sun" aria-hidden="true" />
            <div className="home-intro__frame">
              <img src={cloudinaryAsset("/home.jpg", { width: 1200, crop: "limit" })} alt="Who we are at IYF Mayapur" loading="lazy" decoding="async" />
            </div>
          </div>
        </motion.section>

        <motion.section
          className="home-pathways home-shell"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
        >
          <div className="home-pathways__heading">
            <p>There is a place for you here</p>
            <h2>Grow in every dimension of life.</h2>
          </div>
          <div className="home-pathways__grid">
            {pathways.map(({ icon, eyebrow, title, description, link, label }, index) => (
              <AnimatedCard
                key={title}
                element="article"
                variantIndex={index}
                className="home-pathway-card"
              >
                <div className="home-pathway-card__icon">
                  {createElement(icon, { "aria-hidden": true })}
                </div>
                <p>{eyebrow}</p>
                <h3>{title}</h3>
                <span>{description}</span>
                <Link to={link}>{label} <FiArrowUpRight aria-hidden="true" /></Link>
              </AnimatedCard>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="home-quote-wrap"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="home-quote home-shell">
            <div className="home-quote__heading">
              <span className="home-quote__mark" aria-hidden="true">“</span>
              <h2>Prabhupada Daily Quote</h2>
              <span className="home-title-rule" />
            </div>
            <div className="home-quote__image-wrap">
              <img
                src={quoteImage}
                alt={`Srila Prabhupada daily quote for ${dailyQuote.label}`}
                onError={() => setQuoteImage(Prabhupada)}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </motion.section>

        <motion.section
          className="home-gallery home-shell"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
        >
          <div className="home-gallery__heading">
            <h2>Life at IYF Mayapur</h2>
            <span className="home-title-rule" />
          </div>

          <Masonry
            breakpointCols={{ default: 3, 900: 2, 600: 1 }}
            className="home-masonry"
            columnClassName="home-masonry__column"
          >
            {homepageGalleryPreview.map((src, index) => (
              <figure className="home-gallery__item" key={src}>
                <img
                  src={src}
                  alt={`Life at IYF Mayapur ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </Masonry>
          <div className="home-gallery__action">
            <Link to="/gallery" className="home-button home-button--dark">
              Explore the gallery <FiArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </motion.section>

        <motion.section
          className="home-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="home-cta__content home-shell">
            <p>Your journey can begin today.</p>
            <h2>Come as you are.<br />Grow into who you can be.</h2>
            <Link to="/events" className="home-button home-button--gold">
              Meet the community <FiArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
