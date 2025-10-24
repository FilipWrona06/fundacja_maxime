//src/components/newsletter/SlideOutNewsletter.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';
import { useNewsletterStore } from '@/hooks/useNewsletterStore';

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);
  return matches;
};

const desktopVariants: Variants = {
  enter: { x: '100%', opacity: 0 },
  center: { 
    x: 0, 
    opacity: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.46, 0.45, 0.94]
    } 
  },
  exit: { 
    x: '100%', 
    opacity: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.55, 0.085, 0.68, 0.53]
    } 
  },
};

const mobileVariants: Variants = {
  enter: { y: '100%', opacity: 0 },
  center: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 30,
      mass: 0.8
    } 
  },
  exit: { 
    y: '100%', 
    opacity: 0,
    transition: { 
      duration: 0.35, 
      ease: [0.55, 0.085, 0.68, 0.53]
    } 
  },
};

interface SlideOutNewsletterProps {
  isUserLoggedIn?: boolean;
}

export const SlideOutNewsletter = ({ isUserLoggedIn = false }: SlideOutNewsletterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { status, hydrate, isHydrated } = useNewsletterStore();
  const isTablet = useMediaQuery('(min-width: 768px)');
  const isLargeDesktop = useMediaQuery('(min-width: 1025px)');

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (status === 'subscribed') {
      setIsExpanded(false);
    }
  }, [status]);
  
  if (isUserLoggedIn) {
    return null;
  }

  if (!isHydrated || status === 'subscribed') {
    return null;
  }

  const handleToggle = () => {
    if (!isLargeDesktop) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  const desktopInteractions = isLargeDesktop ? {
    onMouseEnter: () => setIsExpanded(true),
    onMouseLeave: () => setIsExpanded(false),
  } : {};

  return (
    <>
      <AnimatePresence>
        {isExpanded && !isLargeDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      <div 
        className={`fixed z-40 ${isTablet ? 'top-3/10 -translate-y-1/2 right-0' : 'bottom-0 left-0 w-full'}`}
        {...desktopInteractions}
      >
        {/* Tab/Przycisk - zawsze widoczny */}
        <motion.div
          className="cursor-pointer relative"
          onClick={handleToggle}
          whileHover={isTablet ? { x: -5 } : {}}
          whileTap={{ scale: 0.98 }}
        >
          {isTablet ? (
            <AnimatePresence>
              {!isExpanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="bg-zinc-800 p-4 rounded-l-lg border-l border-t border-b border-philippineSilver/20 shadow-lg hover:bg-zinc-700 transition-colors"
                >
                  <p className="font-bold text-xl" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                    Newsletter
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <div className="flex justify-center">
              <div className="bg-zinc-800 py-2 px-6 rounded-t-lg border-t border-x border-philippineSilver/20 shadow-lg">
                <p className="font-bold text-sm">Zapisz się do Newslettera</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Główny panel - nasuwa się nad przyciskiem na mobile */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key={isTablet ? 'desktop' : 'mobile'}
              variants={isTablet ? desktopVariants : mobileVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className={isTablet 
                ? "absolute top-1/2 -translate-y-1/2 right-0 p-6 bg-zinc-900 border border-philippineSilver/20 rounded-l-lg shadow-2xl w-80"
                : "absolute bottom-0 left-0 w-full p-6 pt-4 bg-zinc-900 border-t border-philippineSilver/20 shadow-2xl"
              }
            >
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                className="absolute top-3 left-3 text-philippineSilver/60 hover:text-white transition-colors z-10"
                aria-label="Zamknij"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </motion.button>
              
              {!isTablet && (
                <motion.div 
                  className="w-full flex justify-center pb-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="w-12 h-1.5 bg-philippineSilver/30 rounded-full"/>
                </motion.div>
              )}
              <motion.h4 
                className="font-bold text-lg mb-2 text-center mt-6 md:mt-0"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isTablet ? 0.1 : 0.15 }}
              >
                Bądź na bieżąco
              </motion.h4>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isTablet ? 0.15 : 0.2 }}
              >
                <NewsletterForm />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};