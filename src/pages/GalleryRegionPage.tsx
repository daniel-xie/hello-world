import { Gallery } from "@/components/layout/Gallery";
import { BackButton } from "@/components/ui/BackButton";
import type { Photo, PhotoGalleryRegion } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const GalleryRegionPage = () => {
  const { regionId } = useParams();
  const [region, setRegion] = useState<PhotoGalleryRegion | null>(null);

  useEffect(() => {
    const url = new URL("/src/data/galleries.json", import.meta.url).href;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find(
          (region: PhotoGalleryRegion) => region.id === regionId
        );
        setRegion(found);
      });
  }, [regionId]);

  const galleryCoverPhotos: Photo[] =
    region?.galleries?.map((it) => it.coverPhoto) ?? [];

  return (
    <>
      <BackButton to={'/'} />
      {region && (
        <Gallery
          title={region?.name ?? "Somewhere"}
          images={galleryCoverPhotos}
        />
      )}
    </>
  );
};
