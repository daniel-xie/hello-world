import { Gallery } from "@/components/layout/Gallery";
import type { PhotoGallery } from "@/types";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
  
export const GalleryPage = () => {
  const { id } = useParams();
  const [gallery, setGallery] = useState<PhotoGallery | null>(null);

  useEffect(() => {
    const url = new URL('/src/data/galleries.json', import.meta.url).href;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((g: PhotoGallery) => g.id === id);
        setGallery(found);
      });
  }, [id]);

  return (
    <>
    <BackButton/>
      {gallery && (
        <Gallery
          title={gallery.title}
          description={gallery.description}
          images={gallery.photos}
        />
      )}
    </>
  );
};

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className="flex items-center text-sm font-medium text-blue-600 hover:underline"
    >
      <ArrowLeft className="mr-1 h-4 w-4" />
      Back
    </button>
  );
}