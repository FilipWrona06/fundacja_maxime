// src/components/ui/ContactDetails.tsx
import React from 'react';
import { contactDetails } from '@/data/contact';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

const contactIcons: { [key: string]: React.ReactNode } = {
  Adres: <FaMapMarkerAlt />,
  Email: <FaEnvelope />,
  Telefon: <FaPhone />,
};

interface ContactDetailsProps {
  className?: string;
  showLabels?: boolean; // <-- NOWY PROP: opcjonalny, do kontrolowania widoczności etykiet
}

export const ContactDetails = ({ className, showLabels = true }: ContactDetailsProps) => {
  const finalClasses = twMerge(clsx('space-y-6', className));

  return (
    <div className={finalClasses}>
      {contactDetails.map((detail) => (
        <a key={detail.label} href={detail.href} target="_blank" rel="noopener noreferrer" className="flex items-start group">
          <div className="flex-shrink-0 mt-1">{contactIcons[detail.label]}</div>
          <div className="ml-4">
            {/* 
              ZMIANA TUTAJ: Etykieta renderuje się tylko wtedy, 
              gdy showLabels jest 'true' (co jest domyślne) 
            */}
            {showLabels && <p className="font-bold">{detail.label}</p>}
            
            <p className="group-hover:font-bold transition-all">{detail.value}</p>
          </div>
        </a>
      ))}
    </div>
  );
};