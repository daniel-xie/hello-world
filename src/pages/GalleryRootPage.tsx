import { Gallery } from "@/components/layout/Gallery";
import type { Photo } from "@/types";

const photos: Photo[] = [
    {
      path: new URL("/src/assets/sikkim/sikkim1.JPEG", import.meta.url).href,
      id: "sikkim",
      title: "Sikkim",
      caption: "Dingggggggggg",
    },
    {
      path: new URL("/src/assets/nagaland/nagaland1.JPEG", import.meta.url).href,
      id: "nagaland",
      title: "Nagaland",
      caption: "Two heads are better than one",
    },
  ];

export const GalleryRootPage = () => {
  return (
    <>
      <Gallery
        title={"Where to?"}
        images={photos}
      />
    </>
  );
};
