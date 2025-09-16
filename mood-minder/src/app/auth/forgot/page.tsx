"use client"
import { useState } from 'react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSent(true)
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <div className="card p-6">
        <h2 className="mb-4 text-xl font-semibold">Reset password</h2>
        {!sent ? (
          <form onSubmit={submit} className="space-y-3">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-md border px-3 py-2 text-sm" />
            <button className="w-full rounded-md bg-brand px-4 py-2 text-white">Send OTP</button>
          </form>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">We sent an OTP to {email}. Enter it below with your new password.</p>
            <form className="space-y-3">
              <input placeholder="OTP" className="w-full rounded-md border px-3 py-2 text-sm" />
              <input type="password" placeholder="New password" className="w-full rounded-md border px-3 py-2 text-sm" />
              <button className="w-full rounded-md bg-brand px-4 py-2 text-white">Update Password</button>
            </form>
          </div>
        )}
      </div>
    </main>
  )
}

