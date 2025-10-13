import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import { Divider, DividerProps } from '@/components/ui/Divider';

export interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  publishDate?: string;
  className?: string;
  dividerWidth?: DividerProps['width'];
  children?: React.ReactNode; // <-- NOWY, NAJWAŻNIEJSZY PROP
}

const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  ({ title, description, publishDate, className, dividerWidth, children, ...props }, ref) => {
    
    const finalClasses = twMerge(
      clsx('text-center mb-12 md:mb-16', className)
    );

    return (
      <header ref={ref} className={finalClasses} {...props}>
        <h1 className="text-4xl lg:text-5xl font-montserrat font-bold mb-4 tracking-tight">
          {title}
        </h1>

        {/* ======================================================= */}
        {/* NOWA LOGIKA RENDEROWANIA: Dzieci mają najwyższy priorytet */}
        {/* ======================================================= */}

        {/* 1. Jeśli komponent ma dzieci, renderuj je */}
        {children && <div className="mt-4">{children}</div>}

        {/* 2. Jeśli nie ma dzieci, użyj starej logiki dla opisu */}
        {!children && description && (
          <p className="mt-6 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        )}

        {/* 3. Jeśli nie ma ani dzieci, ani opisu, użyj logiki dla daty */}
        {!children && publishDate && !description && (
          <p className="mt-4 text-lg text-gray-400">
            Opublikowano: {publishDate}
          </p>
        )}

        <Divider 
          width={dividerWidth}
          className={clsx(
            "mt-5",
            dividerWidth !== 'full' && 'mx-auto'
          )}
        />
      </header>
    );
  }
);

PageHeader.displayName = 'PageHeader';

export { PageHeader };