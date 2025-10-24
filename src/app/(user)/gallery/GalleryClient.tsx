'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import React from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

// Eksportujemy typ, aby komponent serwerowy mógł go używać
export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
}

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? '100%' : '-100%', opacity: 0 }),
};

// Komponent dla bocznego zdjęcia
const SideImage = ({ image, onClick }: { image: GalleryImage; onClick: () => void; }) => (
  <div className="hidden xl:block absolute w-1/5 h-2/3 top-1/2 -translate-y-1/2 transition-opacity duration-300 opacity-20 hover:opacity-50 transform scale-80 cursor-pointer" onClick={onClick}>
    <div className="relative w-full h-full">
      <Image src={image.src} alt={image.alt} fill className="object-cover rounded-2xl shadow-lg" sizes="20vw" />
    </div>
  </div>
);

// Komponent kliencki, który przyjmuje dane jako props
export function GalleryClient({ galleryImages }: { galleryImages: GalleryImage[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(prev => (prev + newDirection + galleryImages.length) % galleryImages.length);
  };

  const selectImage = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const getIndex = (offset: number) => (currentIndex + offset + galleryImages.length) % galleryImages.length;

  // Obsługa klawiatury
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') paginate(-1);
      else if (e.key === 'ArrowRight') paginate(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryImages.length]); // Zależność od długości tablicy, na wypadek gdyby się zmieniła

  // Obsługa swipe na mobile
  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 50) paginate(-1);
    else if (info.offset.x < -50) paginate(1);
  };

  // Obsługa pustej galerii
  if (galleryImages.length === 0) {
    return <p className="text-center mt-16 text-gray-500">W galerii nie ma jeszcze żadnych zdjęć.</p>;
  }
  
  const currentImage = galleryImages[currentIndex];
  const prevImage = galleryImages[getIndex(-1)];
  const nextImage = galleryImages[getIndex(1)];

  return (
    <div className="relative w-full mt-12">
      <div className="relative flex items-center justify-center w-full h-[75vh] px-4 sm:px-10 lg:px-20 overflow-hidden">
        
        {/* Przycisk "Poprzednie" */}
        <button onClick={() => paginate(-1)} aria-label="Poprzednie zdjęcie" className="absolute left-2 sm:left-3 lg:left-6 z-30 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-3 hover:bg-black/60 transition-colors focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        {/* Lewe boczne zdjęcie (na desktop) */}
        <div className="absolute left-[5%]"><SideImage image={prevImage} onClick={() => paginate(-1)} /></div>

        {/* Główne zdjęcie z animacją */}
        <div className="relative z-10 w-full md:w-[90%] xl:w-[45%] h-[90%]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              className="absolute w-full h-full"
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { duration: 0.3, ease: 'easeInOut' }, opacity: { duration: 0.3 } }}
              drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2} onDragEnd={handleDragEnd}
            >
              <Image src={currentImage.src} alt={currentImage.alt} width={currentImage.width} height={currentImage.height} className="rounded-2xl shadow-2xl pointer-events-none object-contain w-full h-full" priority sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 45vw" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prawe boczne zdjęcie (na desktop) */}
        <div className="absolute right-[5%]"><SideImage image={nextImage} onClick={() => paginate(1)} /></div>
        
        {/* Przycisk "Następne" */}
        <button onClick={() => paginate(1)} aria-label="Następne zdjęcie" className="absolute right-2 sm:right-3 lg:right-6 z-30 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-3 hover:bg-black/60 transition-colors focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>

        {/* Wskaźnik pozycji */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          {currentIndex + 1} / {galleryImages.length}
        </div>
      </div>

      {/* Miniaturki pod główną galerią */}
      <div className="container mx-auto px-6 mt-8">
        <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
          {galleryImages.map((image, index) => (
            <div key={image.id} className={`w-16 h-16 md:w-20 md:h-20 cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${currentIndex === index ? 'ring-2 ring-white scale-110' : 'hover:opacity-100 opacity-60'}`} onClick={() => selectImage(index)}>
              <Image src={image.src} alt={image.alt} width={100} height={100} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}