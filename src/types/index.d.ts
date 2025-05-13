export interface Photo {
    path: string;
    id: string;
    title?: string;
    caption?: string;
  }

  export interface PhotoGallery {
    id: string;
    title: string;
    description?: string;
    photos: Photo[];
  }
  