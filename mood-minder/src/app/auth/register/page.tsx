"use client"
import { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!firstName || !lastName || !email || !username || !password) {
      setError('Please fill all fields')
      return
    }
    try {
      const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ firstName, lastName, email, username, password }) })
      if (!res.ok) throw new Error((await res.json()).error || 'Registration failed')
      window.location.href = '/auth/login'
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <div className="card p-6">
        <h2 className="mb-4 text-xl font-semibold">Create your account</h2>
        <form onSubmit={submit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name" className="rounded-md border px-3 py-2 text-sm" />
            <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name" className="rounded-md border px-3 py-2 text-sm" />
          </div>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-md border px-3 py-2 text-sm" />
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="w-full rounded-md border px-3 py-2 text-sm" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-md border px-3 py-2 text-sm" />
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button className="w-full rounded-md bg-brand px-4 py-2 text-white">Create Account</button>
        </form>
        <div className="mt-4 text-right text-sm">
          <Link className="underline" href="/auth/login">Have an account? Sign in</Link>
        </div>
      </div>
    </main>
  )
}

