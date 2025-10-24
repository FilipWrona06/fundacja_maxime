// src/components/layout/AdminHeader.tsx
import React from 'react';
import { User } from '@supabase/supabase-js'; // Importujemy typ User
import SignOutButton from '@/components/ui/SignOutButton';

// Definiujemy typ propsów dla komponentu
interface AdminHeaderProps {
  user: User;
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex items-center justify-between px-6">
      <div className="flex items-center">
        {/* Możesz tu dodać np. wyszukiwarkę lub tytuł strony */}
      </div>
      <div className="flex items-center">
        <span className="text-sm text-gray-600 dark:text-gray-400 mr-4">{user.email}</span>
        <SignOutButton />
      </div>
    </header>
  );
}