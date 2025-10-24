'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { updateUserPassword } from '@/actions/auth';
import { useEffect, useRef } from 'react';

// Mały komponent do obsługi stanu przycisku (ładowanie)
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
    >
      {pending ? 'Aktualizowanie...' : 'Zaktualizuj hasło'}
    </button>
  );
}

const initialState = {
  success: false,
  message: '',
};

export default function UpdatePasswordForm() {
  const [state, formAction] = useFormState(updateUserPassword, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Efekt do resetowania formularza po pomyślnej aktualizacji
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="mt-6 space-y-4 max-w-sm">
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Nowe hasło
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="passwordConfirmation"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Potwierdź nowe hasło
        </label>
        <input
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
          required
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {state?.message && (
        <p className={`text-sm ${state.success ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {state.message}
        </p>
      )}

      <div>
        <SubmitButton />
      </div>
    </form>
  );
}