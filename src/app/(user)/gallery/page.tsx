// src/app/(user)/gallery/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import React from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { GalleryImage, galleryImages } from '@/data/gallery';
import { PageHeader } from '@/components/ui/PageHeader';

const slideVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 100 : -100,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    };
  }
};

// Komponent dla bocznego zdjęcia
const SideImage = ({ 
  image, 
  position, 
  onClick 
}: { 
  image: GalleryImage; 
  position: 'left' | 'right'; 
  onClick: () => void;
}) => {
  const positionClasses = position === 'left' 
    ? 'left-[5%]' 
    : 'right-[5%]';

  return (
    <div 
      className={`hidden xl:block absolute w-1/5 h-2/3 ${positionClasses} top-1/2 -translate-y-1/2 transition-opacity duration-300 opacity-20 hover:opacity-50 transform scale-80 cursor-pointer`}
      onClick={onClick}
    >
      <div className="relative w-full h-full">
        <Image 
          src={image.src} 
          alt={image.alt} 
          fill 
          className="object-cover rounded-2xl shadow-lg" 
          sizes="20vw"
          unoptimized
        />
      </div>
    </div>
  );
};

export default function GalleryPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return galleryImages.length - 1;
      if (next >= galleryImages.length) return 0;
      return next;
    });
  };

  const selectImage = (index: number) => {
    if (index === currentIndex) return;
    const newDirection = index > currentIndex ? 1 : -1;
    setDirection(newDirection);
    setCurrentIndex(index);
  };

  const getPrevIndex = () => {
    return currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
  };

  const getNextIndex = () => {
    return currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
  };

  // Obsługa klawiatury
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        paginate(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Preload sąsiednich obrazów
  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new window.Image();
      img.src = src;
    };

    const prevIndex = getPrevIndex();
    const nextIndex = getNextIndex();

    // Preload poprzedniego i następnego zdjęcia
    preloadImage(galleryImages[prevIndex].src);
    preloadImage(galleryImages[nextIndex].src);
  }, [currentIndex]);

  // Obsługa swipe na mobile
  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    
    if (info.offset.x > swipeThreshold) {
      paginate(-1);
    } else if (info.offset.x < -swipeThreshold) {
      paginate(1);
    }
  };

  const currentImage = galleryImages[currentIndex];
  const prevImage = galleryImages[getPrevIndex()];
  const nextImage = galleryImages[getNextIndex()];

  return (
    <main className="py-12">
      
      <div className="container mx-auto px-6">
        <PageHeader
          title='Nasza Galeria'
          description='Chwile, które tworzą naszą historię. Zobacz naszą pasję i zaangażowanie w działaniu.'
        />
      </div>

      <div className="relative w-full mt-12">
        
        <div className="relative flex items-center justify-center w-full h-[75vh] px-4 sm:px-10 lg:px-20 overflow-hidden">
          
          <button
            onClick={() => paginate(-1)}
            aria-label="Poprzednie zdjęcie"
            className="absolute left-2 sm:left-3 lg:left-6 z-30 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-3 hover:bg-black/60 transition-colors focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Lewe boczne zdjęcie */}
          <SideImage
            key={`prev-${getPrevIndex()}`}
            image={prevImage}
            position="left"
            onClick={() => paginate(-1)}
          />

          {/* Główne zdjęcie z animacją Classic Slide */}
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
                transition={{
                  x: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
                  opacity: { duration: 0.2, ease: "easeInOut" }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
              >
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fill
                  className="rounded-2xl shadow-2xl pointer-events-none"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 45vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prawe boczne zdjęcie */}
          <SideImage
            key={`next-${getNextIndex()}`}
            image={nextImage}
            position="right"
            onClick={() => paginate(1)}
          />

          <button
            onClick={() => paginate(1)}
            aria-label="Następne zdjęcie"
            className="absolute right-2 sm:right-3 lg:right-6 z-30 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-3 hover:bg-black/60 transition-colors focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Wskaźnik pozycji */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            {currentIndex + 1} / {galleryImages.length}
          </div>
        </div>

        <div className="container mx-auto px-6 mt-8">
            <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            {galleryImages.map((image, index) => (
                <div
                key={image.src}
                className={`w-16 h-16 md:w-20 md:h-20 cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                    currentIndex === index ? 'ring-1 scale-110' : 'hover:opacity-100 opacity-60'
                }`}
                onClick={() => selectImage(index)}
                >
                <Image src={image.src} alt={image.alt} width={100} height={100} className="w-full h-full object-cover" />
                </div>
            ))}
            </div>
        </div>
      </div>
    </main>
  );
}