import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Photo } from "@/types";

interface ImageLightboxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: Photo[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export const ImageLightbox = ({
  open,
  onOpenChange,
  images,
  currentIndex,
  setCurrentIndex,
}: ImageLightboxProps) => {
  const image = images[currentIndex];

  const prev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const next = () => {
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex]);

  const hasMetadata = image.title || image.caption;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl p-0 overflow-hidden bg-white flex flex-col md:flex-row">
        {/* Left Nav */}
        {currentIndex > 0 && (
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Right Nav */}
        {currentIndex < images.length - 1 && (
          <button
            onClick={next}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Image */}
        <div className={`w-full ${hasMetadata ? 'md:w-2/3' : ''} bg-black flex items-center justify-center`}>
          <img
            src={`${import.meta.env.BASE_URL}${image.path}`}
            alt={image.title}
            className="w-full h-auto max-h-[80vh] object-contain"
          />
        </div>

        {/* Caption */}
        {(image.title || image.caption) && (
          <div className="w-full md:w-1/3 p-6 bg-white">
            <h2 className="text-xl font-semibold mb-2">{image.title}</h2>
            <p className="text-gray-600">{image.caption}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
