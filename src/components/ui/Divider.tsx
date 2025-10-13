import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

// Definicja wariantów dla komponentu Divider
const dividerVariants = {
  width: {
    'full': 'w-full',
    '4/5': 'w-4/5', // <-- DODANO NOWĄ WARTOŚĆ
    '3/4': 'w-3/4',
    '1/2': 'w-1/2',
  },
};

// Zaktualizowane typy propsów
export type DividerProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  width?: keyof typeof dividerVariants.width;
};

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  // =======================================================
  // ZMIANA TUTAJ: Zmieniamy domyślną wartość z '3/4' na '4/5'
  // =======================================================
  ({ className, width = '4/5', ...props }, ref) => {
    
    const finalClasses = twMerge(
      clsx(
        'h-0.5 bg-philippineSilver',
        dividerVariants.width[width],
        className
      )
    );

    return (
      <div
        ref={ref}
        className={finalClasses}
        role="separator"
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';

export { Divider };