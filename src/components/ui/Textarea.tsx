// src/components/ui/Textarea.tsx
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string; // Opcjonalna etykieta do wyświetlenia nad textarea
  id: string; // ID jest wymagane, aby powiązać label z textarea dla dostępności
  className?: string; // Dodatkowe klasy CSS dla samego textarea
  wrapperClassName?: string; // Dodatkowe klasy CSS dla elementu otaczającego label i textarea
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, id, className, wrapperClassName, ...props }, ref) => {
    
    // Klasy dla samego textarea
    const textareaClasses = twMerge(
      clsx(
        // Domyślne style textarea, podobne do inputa
        'w-full px-4 py-3 bg-white/5 placeholder-philippineSilver rounded-lg',
        'focus:outline-none focus:ring-2 focus:ring-philippineSilver font-montserrat',
        'border border-philippineSilver/20 transition-all duration-200',
        props.disabled && 'opacity-60 cursor-not-allowed', // Styl dla wyłączonego textarea
        className // Dodatkowe klasy przekazane przez props
      )
    );

    // Klasy dla kontenera (div) otaczającego label i textarea
    const wrapperFinalClasses = twMerge(
      clsx(
        'relative', // Pozwala na pozycjonowanie wewnątrz, jeśli potrzebne
        wrapperClassName // Dodatkowe klasy dla wrappera
      )
    );

    const labelClasses = clsx(
      'block text-sm font-bold mb-1 font-montserrat' // Styl dla etykiety
    );

    return (
      <div className={wrapperFinalClasses}>
        {label && (
          <label htmlFor={id} className={labelClasses}>
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          className={textareaClasses}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };