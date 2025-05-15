import { Gallery } from "@/components/layout/Gallery";
import type { Photo } from "@/types";

const photos: Photo[] = [
    {
      path: `images/sikkim/sikkim1.JPEG`,
      id: "sikkim",
      title: "Sikkim",
      caption: "Into the Himalayas",
      link: 'gallery/sikkim',
    },
    {
      path: `images/nagaland/nagaland1.JPEG`,
      id: "nagaland",
      title: "Nagaland",
      caption: "Two heads are better than one",
      link: 'gallery/nagaland',
    },
    {
      path: `images/assam/IMG_0593.JPEG`,
      id: "assam",
      title: "Assam",
      caption: "Where the Brahmaputra Breathes Life",
      link: 'gallery/assam',
    },
    {
      path: `images/darjeeling/IMG_9359.JPEG`,
      id: "darjeeling",
      title: "Darjeeling",
      caption: "Time for tea",
      link: 'gallery/darjeeling',
    },
    {
      path: `images/meghalaya/IMG_4813.JPEG`,
      id: "meghalaya",
      title: "Meghalaya",
      caption: "Abode of clouds",
      link: 'gallery/meghalaya',
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
