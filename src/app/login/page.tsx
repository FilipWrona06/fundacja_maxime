// src/app/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false) // Dodajemy stan ładowania
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
      setError('Nieprawidłowy adres e-mail lub hasło. Spróbuj ponownie.')
    } else {
      router.refresh()
      router.push('/dashboard')
    }

    setLoading(false)
  }

  return (
    // Główny kontener centrujący wszystko na stronie
    <main className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 rounded-3xl shadow-2xl border m-5">
        
        {/* Tytuł z niestandardowym fontem */}
        <h1 className="text-6xl text-center">
          Logowanie
        </h1>
        
        <form onSubmit={handleSignIn} className="space-y-6">
          {/* Pole e-mail */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold"
            >
              Adres e-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 mt-1  border rounded-lg focus:outline-none focus:ring-2"
              placeholder="twoj@email.com"
            />
          </div>
          
          {/* Pole hasła */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold"
            >
              Hasło
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2"
              placeholder="••••••••"
            />
          </div>
          
          {/* Przycisk logowania */}
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

        {/* Komunikat o błędzie */}
        {error && (
          <p className="p-3 text-sm text-center text-red-800 bg-red-100 rounded-lg">
            {error}
          </p>
        )}
      </div>
    </main>
  )
}