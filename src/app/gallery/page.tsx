'use client';

import { useState, useCallback, useEffect, MouseEvent } from 'react';
import Image from 'next/image';
import React from 'react';

// =====================================================
//  1. CENTRALNA DEFINICJA DANYCH DLA GALERII
// ====================================================

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const galleryImages: readonly GalleryImage[] = [
  { src: '/gallery/photo1.jpg', alt: 'Opis zdjęcia numer 1', width: 1200, height: 800 },
  { src: '/gallery/photo2.jpg', alt: 'Opis zdjęcia numer 2', width: 1200, height: 800 },
  { src: '/gallery/photo3.jpg', alt: 'Opis zdjęcia numer 3', width: 800, height: 1200 },
  { src: '/gallery/photo4.jpg', alt: 'Opis zdjęcia numer 4', width: 1200, height: 800 },
  { src: '/gallery/photo5.jpg', alt: 'Opis zdjęcia numer 5', width: 1200, height: 800 },
  { src: '/gallery/photo6.jpg', alt: 'Opis zdjęcia numer 6', width: 800, height: 1200 },
  { src: '/gallery/photo7.jpg', alt: 'Opis zdjęcia numer 7', width: 1200, height: 800 },
  { src: '/gallery/photo8.jpg', alt: 'Opis zdjęcia numer 8', width: 1200, height: 800 },
] as const;


export default function GalleryPage(){

    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const openModal = useCallback((image: GalleryImage) => {
    setSelectedImage(image);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handleNext = useCallback(() => {
    setSelectedImage(currentImage => {
      if (!currentImage) return null;
      const currentIndex = galleryImages.findIndex((img) => img.src === currentImage.src);
      const nextIndex = (currentIndex + 1) % galleryImages.length;
      return galleryImages[nextIndex];
    });
  }, []);

  const handlePrevious = useCallback(() => {
    setSelectedImage(currentImage => {
      if (!currentImage) return null;
      const currentIndex = galleryImages.findIndex((img) => img.src === currentImage.src);
      const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      return galleryImages[prevIndex];
    });
  }, []);

  //ZINTEGROWANA LOGIKA OBSŁUGI KLAWIATURY
  useEffect(() => {
    const isOpen = !!selectedImage;
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape': closeModal(); break;
        case 'ArrowRight': handleNext(); break;
        case 'ArrowLeft': handlePrevious(); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage, closeModal, handleNext, handlePrevious]);

    return (
        <main className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
          Nasza Galeria
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Chwile, które tworzą naszą historię. Zobacz naszą pasję i zaangażowanie w działaniu.
        </p>
        <div className="w-3/4 h-0.5 bg-philippineSilver mx-auto mt-8"></div>
      </div>

      {/* ======================================= */}
      {/* SIATKA GALERII*/}
      {/* =========================================== */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {galleryImages.map((image, index) => (
          <div key={image.src} className="mb-4 break-inside-avoid">
            <div
              className="group cursor-pointer overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl aspect-square"
              onClick={() => openModal(image)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                priority={index < 8}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          </div>
        ))}
      </div>

      {/* =========================================== */}
      {/* LIGHTBOX*/}
      {/* ======================================== */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.alt}
        >
          {/*Przycisk "Poprzedni"*/}
          <button
            onClick={(e: MouseEvent) => { e.stopPropagation(); handlePrevious(); }}
            aria-label="Poprzednie zdjęcie"
            className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4 z-20 rounded-full bg-black/85 p-2 transition focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Główny obraz*/}
          <div className="relative h-[90vh] w-[90vw] max-w-5xl p-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={selectedImage.width}
              height={selectedImage.height}
              className="h-full w-full rounded-lg object-contain"
              sizes="90vw"
            />
          </div>

          {/* Przycisk "Następny"*/}
          <button
            onClick={(e: MouseEvent) => { e.stopPropagation(); handleNext(); }}
            aria-label="Następne zdjęcie"
            className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 z-20 rounded-full bg-black/85 p-2 transition focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/*Przycisk "Zamknij"*/}
          <button
            onClick={closeModal}
            className="absolute right-2 top-2 md:right-4 md:top-4 z-20 text-3xl transition-colors hover:text-philippineSilver"
            aria-label="Zamknij"
          >
            &times;
          </button>
        </div>
      )}
    </main>
  );
};