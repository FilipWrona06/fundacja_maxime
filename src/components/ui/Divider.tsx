// src/components/ui/Divider.tsx
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export type DividerProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, ...props }, ref) => {
    
    const finalClasses = twMerge(
      clsx(
        'h-0.5 w-full bg-philippineSilver/20',
        className
      )
    );

    return (
      <div
        ref={ref}
        className={finalClasses}
        role="separator"
        aria-orientation="horizontal"
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';

export { Divider };