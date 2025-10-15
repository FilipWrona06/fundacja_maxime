// src/app/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
// ZMIANA: Importujemy nasz nowy komponent Input
import { Input } from '@/components/ui/Input';


export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        setError('Nieprawidłowy adres e-mail lub hasło. Spróbuj ponownie.');
      } else if (error.message.includes('Email not confirmed') || error.message.includes('Email not verified')) {
        setError('Twój adres e-mail nie został potwierdzony. Sprawdź swoją skrzynkę odbiorczą.');
      } else if (error.message.includes('User not found') || error.message.includes('User is disabled')) {
        setError('Użytkownik nie istnieje lub jest nieaktywny.');
      }
      else {
        setError('Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.');
        console.error('Supabase login error:', error);
      }
    } else {
      router.refresh()
      router.push('/dashboard')
    }

    setLoading(false)
  }

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 rounded-3xl shadow-2xl border m-5">
        
        <h1 className="text-6xl text-center">
          Logowanie
        </h1>
        
        <form onSubmit={handleSignIn} className="space-y-6">
          {/* ZMIANA: Użycie komponentu Input dla pola e-mail */}
          <Input
            id="email"
            label="Adres e-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="twoj@email.com"
          />
          
          {/* ZMIANA: Użycie komponentu Input dla pola hasła */}
          <Input
            id="password"
            label="Hasło"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
          
          <div className='text-center'>
            <Button
                type="submit"
                disabled={loading}
                className='w-full'
            >
                {loading ? 'Logowanie...' : 'Zaloguj się'}
            </Button>
          </div>
        </form>

        {error && (
          <p className="p-3 text-sm text-center text-red-400 bg-red-900/20 rounded-lg">
            {error}
          </p>
        )}
      </div>
    </main>
  )
}