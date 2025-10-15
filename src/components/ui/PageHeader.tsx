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
}

const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  ({ title, description, publishDate, className, children, ...props }, ref) => {
    
    const finalClasses = twMerge(
      clsx('text-center mb-12 md:mb-16', className)
    );

    return (
      <header ref={ref} className={finalClasses} {...props}>
        <h1 className="text-4xl lg:text-5xl font-montserrat font-bold mb-4 tracking-tight">
          {title}
        </h1>

        {/* Priorytet dla children: jeśli są, renderuj je */}
        {children && <div className="mt-4">{children}</div>}

        {/* Jeśli NIE MA children, sprawdź description i publishDate */}
        {!children && (
          <>
            {description && (
              <p className="mt-6 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
                {description}
              </p>
            )}
            {/* ZMIANA: publishDate renderuje się, jeśli istnieje, niezależnie od description, gdy brak children */}
            {publishDate && (
              <p className={`${description ? 'mt-4' : 'mt-6'} text-lg text-gray-400`}>
                Opublikowano: {publishDate}
              </p>
            )}
          </>
        )}

        <Divider className="mt-5 w-3/4 mx-auto" />
      </header>
    );
  }
);

PageHeader.displayName = 'PageHeader';

export { PageHeader };