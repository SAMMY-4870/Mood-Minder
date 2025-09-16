"use client"
import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    // Placeholder: Accept any non-empty input for now
    if (!identifier || !password) {
      setError('Please enter your username/email and password')
      return
    }
    window.location.href = '/dashboard'
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <div className="card p-6">
        <h2 className="mb-4 text-xl font-semibold">Sign In</h2>
        <form onSubmit={onSubmit} className="space-y-3">
          <input value={identifier} onChange={e => setIdentifier(e.target.value)} placeholder="Username or Email" className="w-full rounded-md border px-3 py-2 text-sm" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-md border px-3 py-2 text-sm" />
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button className="w-full rounded-md bg-brand px-4 py-2 text-white">Sign In</button>
        </form>
        <div className="mt-4 flex items-center justify-between text-sm">
          <Link className="underline" href="/auth/forgot">Forgot password?</Link>
          <Link className="underline" href="/auth/register">Create account</Link>
        </div>
      </div>
    </main>
  )
}

