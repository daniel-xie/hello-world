import { Gallery } from "@/components/layout/Gallery";
import type { Photo, PhotoGalleryRegion } from "@/types";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
      <BackButton />
      {region && (
        <Gallery
          title={region?.name ?? "Somewhere"}
          images={galleryCoverPhotos}
        />
      )}
    </>
  );
};

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="flex items-center text-sm font-medium text-blue-600 hover:underline"
    >
      <ArrowLeft className="mr-1 h-4 w-4" />
      Back
    </button>
  );
}
