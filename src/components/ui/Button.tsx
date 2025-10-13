// src/components/ui/Button.tsx
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import Link from 'next/link';

const buttonVariants = {
  variant: {
    outline: 'bg-transparent border-2 border-philippineSilver hover:bg-philippineSilver hover:text-raisinBlack hover:scale-105',
    solid: 'bg-philippineSilver text-raisinBlack border-2 border-philippineSilver hover:bg-philippineSilver/90',
  },
};

type BaseProps = {
  variant?: keyof typeof buttonVariants.variant;
  children: React.ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    asLink?: false;
    href?: never;
  };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    asLink: true;
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    
    const finalClasses = twMerge(
      clsx(
        'rounded-full px-4.5 py-3 text-sm font-montserrat font-bold tracking-wider transition-all duration-300 disabled:opacity-60 disabled:pointer-events-none inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-philippineSilver focus-visible:ring-offset-2 focus-visible:ring-offset-raisinBlack',
        buttonVariants.variant[props.variant ?? 'outline'],
        props.className
      )
    );

    if (props.asLink) {
      const { className, variant, children, asLink, ...rest } = props;
      
      return (
        <Link 
          className={finalClasses} 
          ref={ref as React.Ref<HTMLAnchorElement>} 
          {...rest}
        >
          {children}
        </Link>
      );
    }

    // Dla button nie destrukturyzujemy 'asLink', bo nie istnieje w tym typie
    const { className, variant, children, ...rest } = props;
    return (
      <button 
        className={finalClasses} 
        ref={ref as React.Ref<HTMLButtonElement>} 
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };