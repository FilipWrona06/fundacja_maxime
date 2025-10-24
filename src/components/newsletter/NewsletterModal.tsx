'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';
import { useNewsletterStore } from '@/hooks/useNewsletterStore';

interface NewsletterModalProps {
  isUserLoggedIn?: boolean;
}

export const NewsletterModal = ({ isUserLoggedIn = false }: NewsletterModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { status, setStatus, hydrate, isHydrated } = useNewsletterStore();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!isHydrated || status !== 'idle' || isUserLoggedIn) {
      return;
    }
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, [status, isHydrated, isUserLoggedIn]);

  useEffect(() => {
    if (!isOpen) return;

    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0] as HTMLElement;
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (status !== 'subscribed') {
      setStatus('closed');
    }
  };

  if (isUserLoggedIn || !isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-modal-title"
        aria-describedby="newsletter-modal-description"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
          aria-hidden="true"
        />

        <motion.div
          ref={modalRef}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-md bg-raisinBlack border-2 border-philippineSilver/20 rounded-3xl shadow-2xl"
        >
          <button
            onClick={handleClose}
            aria-label="Zamknij okno dialogowe"
            className="absolute top-4 right-4 text-philippineSilver hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-philippineSilver rounded-full p-2"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-8 md:p-10 text-center">
            <div className="text-4xl md:text-5xl font-youngest mb-6">
              Fundacja Maxime
            </div>
            <h3 
              id="newsletter-modal-title" 
              className="text-3xl lg:text-4xl font-montserrat font-bold mb-4 tracking-tight"
            >
              Bądź na bieżąco
            </h3>
            <p 
              id="newsletter-modal-description" 
              className="text-base lg:text-lg font-montserrat leading-relaxed text-philippineSilver mb-8"
            >
              Zapisz się do naszego newslettera i otrzymuj:
            </p>
            
            <div className="mb-8 space-y-3 text-left max-w-sm mx-auto">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-philippineSilver flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-montserrat text-philippineSilver">
                  Informacje o nadchodzących koncertach
                </span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-philippineSilver flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-montserrat text-philippineSilver">
                  Zaproszenia na wydarzenia specjalne
                </span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-philippineSilver flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-montserrat text-philippineSilver">
                  Wiadomości o działalności fundacji
                </span>
              </div>
            </div>
            
            <NewsletterForm />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};