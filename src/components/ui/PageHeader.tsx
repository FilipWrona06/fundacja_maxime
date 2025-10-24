// src/components/ui/PageHeader.tsx

import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import { Divider } from '@/components/ui/Divider';

export interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  publishDate?: string;
  className?: string;
  children?: React.ReactNode;
  // ZMIANA: Dodajemy nową, opcjonalną właściwość
  showDivider?: boolean; 
}

const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  // ZMIANA: Destrukturyzujemy `showDivider` i ustawiamy jego domyślną wartość na `true`
  ({ title, description, publishDate, className, children, showDivider = true, ...props }, ref) => {
    
    const finalClasses = twMerge(
      clsx('text-center mb-12 md:mb-16', className)
    );

    return (
      <header ref={ref} className={finalClasses} {...props}>
        <h1 className="text-4xl lg:text-5xl font-montserrat font-bold mb-4 tracking-tight">
          {title}
        </h1>
        
        {children && <div className="mt-4">{children}</div>}

        {!children && (
          <>
            {description && (
              <p className="mt-6 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
                {description}
              </p>
            )}
            {publishDate && (
              <p className={`${description ? 'mt-4' : 'mt-6'} text-lg text-gray-400`}>
                Opublikowano: {publishDate}
              </p>
            )}
          </>
        )}

        {/* ZMIANA: Divider jest teraz renderowany warunkowo */}
        {showDivider && <Divider className="mt-5 w-3/4 mx-auto" />}
      </header>
    );
  }
);

PageHeader.displayName = 'PageHeader';

export { PageHeader };