import { Gallery } from "@/components/layout/Gallery";
import type { PhotoGallery } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
  
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
