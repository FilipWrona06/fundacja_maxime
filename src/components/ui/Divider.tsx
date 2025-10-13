import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

// Definicja typów dla propsów komponentu
// Dziedziczymy standardowe atrybuty DIV i dodajemy opcjonalny className
export type DividerProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, ...props }, ref) => {
    
    // Łączymy bazowe, stałe style z dodatkowymi klasami przekazanymi przez props.
    // twMerge inteligentnie rozwiąże konflikty (np. jeśli przekażesz w className 'w-full').
    const finalClasses = twMerge(
      clsx(
        'w-3/4 h-0.5 bg-philippineSilver mx-auto mt-5', // Twoje bazowe, niezmienne style
        className // Dodatkowe klasy przekazane z zewnątrz
      )
    );

    return (
      <div
        ref={ref}
        className={finalClasses}
        role="separator" // Dobra praktyka dla dostępności (accessibility)
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';

export { Divider };