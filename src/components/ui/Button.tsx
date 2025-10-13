// src/components/ui/Button.tsx
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import Link from 'next/link';

const buttonVariants = {
  variant: {
    outline: 'bg-transparent border-2 border-philippineSilver hover:bg-philippineSilver hover:text-raisinBlack',
    solid: 'bg-philippineSilver text-raisinBlack border-2 border-philippineSilver',
  },
};

type BaseProps = {
  variant?: keyof typeof buttonVariants.variant;
  children: React.ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asLink?: false;
    href?: never;
  };

type ButtonAsLink = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    asLink: true;
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    
    const finalClasses = twMerge(
      clsx(
        'rounded-full px-6 py-3 text-sm font-montserrat font-bold tracking-wider transition-all duration-250 disabled:opacity-60 disabled:pointer-events-none inline-flex items-center justify-center',
        buttonVariants.variant[props.variant ?? 'outline'],
        props.className
      )
    );

    if (props.asLink) {
      // ======================================================================
      // ZMIANA TUTAJ: Dodajemy 'asLink' do destrukturyzacji,
      // aby nie zostało przekazane w obiekcie 'rest'.
      // ======================================================================
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

    const { className, variant, asLink, children, ...rest } = props;
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