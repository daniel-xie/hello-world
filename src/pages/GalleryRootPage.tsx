import { Gallery } from "@/components/layout/Gallery";
import type { Photo } from "@/types";

const photos: Photo[] = [
    {
      path: `images/sikkim/sikkim1.JPEG`,
      id: "sikkim",
      title: "Sikkim",
      caption: "Dingggggggggg",
    },
    {
      path: `images/nagaland/nagaland1.JPEG`,
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
