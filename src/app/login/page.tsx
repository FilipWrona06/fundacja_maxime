// app/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Error signing in:', error)
      // Tutaj możesz dodać obsługę błędów, np. wyświetlenie komunikatu
    } else {
      // Po pomyślnym zalogowaniu, odśwież stronę, aby Server Components
      // pobrały nową sesję użytkownika.
      router.refresh()
      router.push('/dashboard') // Opcjonalnie przekieruj na stronę główną
    }
  }

  return (
    <div>
      <h1>Logowanie</h1>
      <form onSubmit={handleSignIn}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          Hasło:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Zaloguj się</button>
      </form>
    </div>
  )
}