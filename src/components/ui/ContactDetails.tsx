// src/components/ui/ContactDetails.tsx
import React from 'react';
// ZMIANA: Importujemy również typ ContactDetail
import { contactDetails, ContactDetail } from '@/data/contact';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

// ZMIANA: Mapowanie ikon opiera się teraz na 'type' z ContactDetail
const contactIcons: { [key in ContactDetail['type']]: React.ReactNode } = {
  address: <FaMapMarkerAlt />,
  email: <FaEnvelope />,
  phone: <FaPhone />,
};

interface ContactDetailsProps {
  className?: string;
  showLabels?: boolean;
}

export const ContactDetails = ({ className, showLabels = true }: ContactDetailsProps) => {
  const finalClasses = twMerge(clsx('space-y-4', className));

  return (
    <div className={finalClasses}>
      {contactDetails.map((detail) => (
        <a 
          key={detail.label} // Można nadal używać label jako klucza, jeśli jest unikalny
          href={detail.href} 
          target="_blank" 
          rel="noopener noreferrer" 
          // ZMIANA: Dodano aria-label dla lepszej dostępności
          aria-label={`${detail.label}: ${detail.value}`}
          className="flex items-start group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-philippineSilver rounded p-2 -m-1"
        >
          <div className="flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
            {/* ZMIANA: Używamy detail.type do wyboru ikony */}
            {contactIcons[detail.type]}
          </div>
          <div className="ml-4">
            {showLabels && <p className="font-bold">{detail.label}</p>}
            <p className="group-hover:font-bold group-hover:text-philippineSilver transition-all duration-300">
              {detail.value}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
};