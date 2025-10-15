// src/components/ui/Input.tsx
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

// Definicja propsów dla komponentu Input
// Rozszerzamy React.InputHTMLAttributes, aby przyjmować wszystkie standardowe atrybuty inputa
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Opcjonalna etykieta do wyświetlenia nad inputem
  id: string; // ID jest wymagane, aby powiązać label z inputem dla dostępności
  className?: string; // Dodatkowe klasy CSS dla samego inputa
  wrapperClassName?: string; // Dodatkowe klasy CSS dla elementu otaczającego label i input
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, className, wrapperClassName, ...props }, ref) => {
    
    // Klasy dla samego inputa
    const inputClasses = twMerge(
      clsx(
        // Domyślne style inputa, które pasują do Twojego schematu
        'w-full px-4 py-3 bg-white/5 placeholder-philippineSilver rounded-lg',
        'focus:outline-none focus:ring-2 focus:ring-philippineSilver font-montserrat',
        'border border-philippineSilver/20 transition-all duration-200',
        props.disabled && 'opacity-60 cursor-not-allowed', // Styl dla wyłączonego inputa
        className // Dodatkowe klasy przekazane przez props
      )
    );

    // Klasy dla kontenera (div) otaczającego label i input
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
        <input
          id={id}
          ref={ref}
          className={inputClasses}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };