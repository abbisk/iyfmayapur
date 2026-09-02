import { useEffect, useState } from "react";
import { FiArrowDown, FiX } from "react-icons/fi";
import { cloudinaryAsset } from "../lib/cloudinary";

const youthImageNumbers = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

const allGalleryImages = [
  ...Array.from({ length: 34 }, (_, index) => `/gallery/G${index + 1}.jpeg`),
  "/home/youth.jpg",
  ...youthImageNumbers.map((number) => `/home/youth${number}.jpeg`),
  ...Array.from({ length: 12 }, (_, index) => `/life/img${index}.jpg`),
].map((image) => cloudinaryAsset(image));

const uniqueGalleryImages = allGalleryImages.filter(
  (image, index, images) => images.indexOf(image) === index
);

const imageColumns = Array.from({ length: 4 }, (_, columnIndex) =>
  uniqueGalleryImages.filter((_, imageIndex) => imageIndex % 4 === columnIndex)
);

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!selectedImage) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedImage]);

  return (
    <div className="infinite-gallery-page">
      <header className="infinite-gallery-hero">
        <div className="infinite-gallery-hero__orb" aria-hidden="true" />
        <div className="infinite-gallery-shell">
          <p className="infinite-gallery-kicker">Life at IYF Mayapur</p>
          <h1>Moments that<br />move with us.</h1>
          <div className="infinite-gallery-hero__footer">
            <p>
              A living collection of friendship, wisdom, celebration and
              service from our youth community.
            </p>
            <span><FiArrowDown aria-hidden="true" /> Scroll to explore</span>
          </div>
        </div>
      </header>

      <main className="infinite-gallery-stage">
        <div className="infinite-gallery-fade infinite-gallery-fade--top" />
        <div className="infinite-gallery-fade infinite-gallery-fade--bottom" />
        <div className="infinite-gallery-columns infinite-gallery-shell">
          {imageColumns.map((column, columnIndex) => (
            <div
              className={`infinite-gallery-column infinite-gallery-column--${columnIndex + 1}`}
              key={`column-${columnIndex + 1}`}
            >
              {[...column, ...column].map((src, imageIndex) => (
                <button
                  type="button"
                  className="infinite-gallery-card"
                  onClick={() => setSelectedImage(src)}
                  key={`${src}-${imageIndex}`}
                  aria-label={`Open IYF Mayapur gallery image ${(imageIndex % column.length) + 1}`}
                >
                  <img
                    src={src}
                    alt="A moment from life at IYF Mayapur"
                    loading={imageIndex < 2 ? "eager" : "lazy"}
                  />
                  <span aria-hidden="true">View</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </main>

      {selectedImage && (
        <div
          className="infinite-gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="infinite-gallery-lightbox__close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image preview"
          >
            <FiX aria-hidden="true" />
          </button>
          <img
            src={selectedImage}
            alt="Enlarged moment from life at IYF Mayapur"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
