// src/components/ImageGallery.jsx

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const gallery = Array.from(
  { length: 50 },
  (_, index) => `/gallery/G${index + 1}.jpeg`
);

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState(gallery);

  // Remove broken images automatically
  const handleImageError = (img) => {
    setLoadedImages((prev) => prev.filter((item) => item !== img));
  };

  return (
    <div className="gallery-wrapper">

      {/* Background Glow */}
      <div className="glow glow1"></div>
      <div className="glow glow2"></div>

      {/* Header */}
      <div className="gallery-header">
        <h1>Mayapur Gallery</h1>
        <p>Spiritual Moments & Divine Memories</p>
      </div>

      {/* Responsive Gallery */}
      <div className="gallery-grid">
        {loadedImages.map((img, index) => (
          <motion.div
            key={index}
            className="gallery-card"
            whileHover={{
              y: -6,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 18,
            }}
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={img}
              alt={`gallery-${index + 1}`}
              loading="lazy"
              onError={() => handleImageError(img)}
            />

            <div className="overlay"></div>

            <div className="content">
              <h2>Mayapur</h2>
              <p>Divine Experience #{index + 1}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Image Preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="preview-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedImage(null)}
            >
              <IoClose />
            </button>

            <motion.img
              src={selectedImage}
              alt="preview"
              className="preview-image"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        .gallery-wrapper {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          padding: 80px 20px;
          background:
            radial-gradient(circle at top, #1b2333 0%, #05060a 100%);
        }

        /* Header */

        .gallery-header {
          text-align: center;
          margin-bottom: 50px;
          position: relative;
          z-index: 2;
        }

        .gallery-header h1 {
          color: white;
          font-size: clamp(32px, 6vw, 62px);
          margin: 0;
          font-weight: 800;
          letter-spacing: 1px;
          line-height: 1.1;
        }

        .gallery-header p {
          margin-top: 14px;
          color: rgba(255,255,255,0.7);
          font-size: clamp(14px, 2vw, 18px);
        }

        /* Responsive Grid */

        .gallery-grid {
          position: relative;
          z-index: 2;

          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 22px;

          max-width: 1600px;
          margin: auto;
        }

        /* Card */

        .gallery-card {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          cursor: pointer;

          background: rgba(255,255,255,0.05);

          border: 1px solid rgba(255,255,255,0.08);

          backdrop-filter: blur(10px);

          box-shadow:
            0 10px 30px rgba(0,0,0,0.35),
            0 0 20px rgba(255,255,255,0.03);

          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .gallery-card:hover {
          box-shadow:
            0 20px 45px rgba(0,0,0,0.45),
            0 0 25px rgba(255,255,255,0.06);
        }

        .gallery-card img {
          width: 100%;
          height: 100%;
          min-height: 320px;
          max-height: 520px;
          object-fit: cover;
          display: block;

          transition: transform 0.7s ease;
        }

        .gallery-card:hover img {
          transform: scale(1.05);
        }

        /* Overlay */

        .overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              to top,
              rgba(0,0,0,0.88),
              rgba(0,0,0,0.2),
              transparent
            );

          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .gallery-card:hover .overlay {
          opacity: 1;
        }

        /* Content */

        .content {
          position: absolute;
          left: 20px;
          bottom: 20px;
          z-index: 3;

          opacity: 0;
          transform: translateY(20px);

          transition: all 0.4s ease;
        }

        .gallery-card:hover .content {
          opacity: 1;
          transform: translateY(0);
        }

        .content h2 {
          margin: 0;
          color: white;
          font-size: clamp(18px, 2vw, 28px);
          font-weight: 700;
        }

        .content p {
          margin-top: 8px;
          color: rgba(255,255,255,0.72);
          font-size: clamp(11px, 1.5vw, 14px);
        }

        /* Modal */

        .preview-modal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.92);

          display: flex;
          align-items: center;
          justify-content: center;

          z-index: 9999;

          padding: 20px;
        }

        .preview-image {
          width: auto;
          height: auto;

          max-width: 100%;
          max-height: 90vh;

          border-radius: 20px;

          object-fit: contain;

          box-shadow:
            0 20px 60px rgba(0,0,0,0.6);
        }

        /* Close Button */

        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;

          width: 48px;
          height: 48px;

          border: none;
          border-radius: 50%;

          background: rgba(255,255,255,0.12);

          color: white;
          font-size: 28px;

          cursor: pointer;

          display: flex;
          align-items: center;
          justify-content: center;

          backdrop-filter: blur(10px);

          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: rgba(255,255,255,0.22);
          transform: rotate(90deg);
        }

        /* Glow */

        .glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.18;
          z-index: 0;
        }

        .glow1 {
          width: 500px;
          height: 500px;
          background: #ff4d6d;
          top: -150px;
          left: -150px;
        }

        .glow2 {
          width: 450px;
          height: 450px;
          background: #6c63ff;
          right: -120px;
          bottom: -120px;
        }

        /* Large Desktop */

        @media (min-width: 1600px) {
          .gallery-grid {
            grid-template-columns:
              repeat(auto-fit, minmax(320px, 1fr));
          }
        }

        /* Tablet */

        @media (max-width: 992px) {

          .gallery-wrapper {
            padding: 60px 18px;
          }

          .gallery-grid {
            grid-template-columns:
              repeat(auto-fit, minmax(220px, 1fr));

            gap: 18px;
          }

          .gallery-card img {
            min-height: 260px;
          }
        }

        /* Mobile */

        @media (max-width: 576px) {

          .gallery-wrapper {
            padding: 40px 14px;
          }

          .gallery-header {
            margin-bottom: 35px;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .gallery-card {
            border-radius: 18px;
          }

          .gallery-card img {
            min-height: 260px;
            max-height: 420px;
          }

          .content {
            opacity: 1;
            transform: translateY(0);
          }

          .overlay {
            opacity: 1;
          }

          .close-btn {
            width: 42px;
            height: 42px;
            font-size: 24px;
          }

          .preview-image {
            border-radius: 14px;
          }
        }

      `}</style>
    </div>
  );
}