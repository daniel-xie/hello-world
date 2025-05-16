import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { Photo } from "@/types";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ConditionalWrapper } from "../util/ConditionalWrapper";
import { ImageLightbox } from "./ImageLightbox";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface GalleryProps {
  title: string;
  description?: string;
  images: Photo[];
}

export const Gallery = ({ title, description, images }: GalleryProps) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  // Scroll functions
  const scrollLeft = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Update scroll button visibility
  const updateScrollButtons = () => {
    if (!galleryRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = galleryRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    updateScrollButtons();

    gallery.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons); // in case of resize

    return () => {
      gallery.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  return (
    <div className="relative mx-auto max-w-4/5 px-4 py-12">
      <header className="py-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm font-light">{description}</p>
      </header>

      {(canScrollLeft || canScrollRight) && (
        <div className="absolute top-0 right-0 z-10 flex gap-2 p-4">
          {/* Scroll Buttons */}
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`transform -translate-y-1/2 z-10 bg-transparent p-3 select-none ${
              canScrollLeft
                ? " hover:bg-gray-50 hover:scale-105"
                : "opacity-40 cursor-not-allowed pointer-events-none"
            }`}
          >
            <ArrowLeft />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`transform -translate-y-1/2 z-10 bg-transparent p-3 select-none ${
              canScrollRight
                ? " hover:bg-gray-50 hover:scale-105"
                : "opacity-40 cursor-not-allowed pointer-events-none"
            }`}
          >
            <ArrowRight />
          </button>
        </div>
      )}

      <div
        ref={galleryRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
      >
        {images.map((image, idx) => (
          <div
            key={idx}
            className="relative min-w-[200px] max-w-full flex-shrink-0 rounded-lg group"
          >
            <ConditionalWrapper
              condition={!!image.link}
              wrapper={(children) => (
                <Link to={image.link!} replace>
                  {children}
                </Link>
              )}
            >
              <AspectRatio ratio={9 / 16}>
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={`${import.meta.env.BASE_URL}${image.path}`}
                    alt={image.title}
                    onClick={() => !image.link && openLightbox(idx)}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white text-left p-4">
                    {image.title && (
                      <h3 className="text-lg font-semibold">{image.title}</h3>
                    )}
                    {image.caption && (
                      <p className="text-xs font-extralight">{image.caption}</p>
                    )}
                  </div>
                </div>
              </AspectRatio>
            </ConditionalWrapper>
          </div>
        ))}
      </div>

      <ImageLightbox
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        images={images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
};
