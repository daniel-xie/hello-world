import { Gallery } from "@/components/layout/Gallery";
import { BackButton } from "@/components/ui/BackButton";
import type { PhotoGallery, PhotoGalleryRegion } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const GalleryPage = () => {
  const { regionId, galleryId } = useParams();
  const [gallery, setGallery] = useState<PhotoGallery | null>(null);

  useEffect(() => {
    const url = new URL("/src/data/galleries.json", import.meta.url).href;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const region = data.find((r: PhotoGalleryRegion) => r.id === regionId);
        const found =
          region?.galleries.find((g: PhotoGallery) => g.id === galleryId) ??
          null;
        setGallery(found);
      });
  }, [galleryId]);

  return (
    <>
      <BackButton to={`/region/${regionId}`} />
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
