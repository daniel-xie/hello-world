import { Gallery } from "@/components/layout/Gallery";
import type { PhotoGallery, PhotoGalleryRegion } from "@/types";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
  
export const GalleryPage = () => {
  const { regionId, galleryId } = useParams();
  const [gallery, setGallery] = useState<PhotoGallery | null>(null);

  useEffect(() => {
    const url = new URL('/src/data/galleries.json', import.meta.url).href;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const region = data.find((r: PhotoGalleryRegion) => r.id === regionId);
        const found = region?.galleries.find((g: PhotoGallery) => g.id === galleryId) ?? null;
        setGallery(found);
      });
  }, [galleryId]);

  return (
    <>
    <BackButton regionId={regionId}/>
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

interface BackButtonProps {
  regionId?: string; // or just `string` if it's guaranteed to be present
}

const BackButton = ({regionId}: BackButtonProps) => {
  const navigate = useNavigate();
  console.log(`regionId`, regionId)
  return (
    <button
      onClick={() => regionId != null ? navigate(`/region/${regionId}`) : navigate('/')}
      className="flex items-center text-sm font-medium text-blue-600 hover:underline"
    >
      <ArrowLeft className="mr-1 h-4 w-4" />
      Back
    </button>
  );
}