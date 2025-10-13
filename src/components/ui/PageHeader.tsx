import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import { Divider } from '@/components/ui/Divider';

// Definicja typów dla propsów komponentu
export interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string; // Opis jest opcjonalny
  className?: string;
}

const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  ({ title, description, className, ...props }, ref) => {
    
    const finalClasses = twMerge(
      clsx('text-center mb-12 md:mb-16', className)
    );

    return (
      <header ref={ref} className={finalClasses} {...props}>
        <h1 className="text-4xl lg:text-5xl font-montserrat font-bold mb-4 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-6 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
        <Divider className="mt-8" />
      </header>
    );
  }
);

PageHeader.displayName = 'PageHeader';

export { PageHeader };