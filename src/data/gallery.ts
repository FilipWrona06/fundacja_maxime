export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const galleryImages: readonly GalleryImage[] = [
  { src: '/gallery/photo1.jpg', alt: 'Opis zdjęcia numer 1', width: 1600, height: 1067 },
  { src: '/gallery/photo2.jpg', alt: 'Opis zdjęcia numer 2', width: 1600, height: 1067 },
  { src: '/gallery/photo3.jpg', alt: 'Opis zdjęcia numer 3', width: 1067, height: 1600 },
  { src: '/gallery/photo4.jpg', alt: 'Opis zdjęcia numer 4', width: 1600, height: 1067 },
  { src: '/gallery/photo5.jpg', alt: 'Opis zdjęcia numer 5', width: 1600, height: 1067 },
  { src: '/gallery/photo6.jpg', alt: 'Opis zdjęcia numer 6', width: 1067, height: 1600 },
  { src: '/gallery/photo7.jpg', alt: 'Opis zdjęcia numer 7', width: 1600, height: 1067 },
  { src: '/gallery/photo8.jpg', alt: 'Opis zdjęcia numer 8', width: 1600, height: 1067 },
] as const;