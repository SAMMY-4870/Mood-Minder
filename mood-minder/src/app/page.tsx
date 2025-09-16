import Link from 'next/link'

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="card p-8 text-center">
        <h1 className="mb-4 text-3xl font-bold text-brand">Mood Minder</h1>
        <p className="mb-6 text-gray-600">Games, quotes, fun chat, and mood tracking to brighten your day.</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/auth/register" className="rounded-md bg-brand px-4 py-2 text-white hover:bg-brand-dark">Get Started</Link>
          <Link href="/auth/login" className="rounded-md border px-4 py-2 hover:bg-gray-50">Sign In</Link>
        </div>
      </div>
    </main>
  )
}

