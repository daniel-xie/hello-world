export interface Photo {
    path: string;
    id: string;
    title?: string;
    caption?: string;
    link?: string;
  }

  export interface PhotoGallery {
    id: string;
    title: string;
    description?: string;
    coverPhoto: Photo;
    photos: Photo[];
  }
  
  export interface PhotoGalleryRegion {
    id: string;
    name: string;
    coverPhoto: Photo;
    galleries: PhotoGallery[];
  }