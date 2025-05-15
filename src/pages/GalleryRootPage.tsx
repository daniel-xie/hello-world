import { Gallery } from "@/components/layout/Gallery";
import type { PhotoGalleryRegion } from "@/types";
import { useEffect, useState } from "react";

export const GalleryRootPage = () => {
  const [galleryRegions, setGalleryRegions] = useState<PhotoGalleryRegion[]>(
    []
  );

  useEffect(() => {
    const url = new URL("/src/data/galleries.json", import.meta.url).href;
    fetch(url)
      .then((res) => res.json())
      .then((data: PhotoGalleryRegion[]) => {
        setGalleryRegions(data);
      });
  }, []);

  return (
    <>
      <Gallery
        title={"Where to?"}
        images={galleryRegions.map((it) => it.coverPhoto)}
      />
    </>
  );
};
