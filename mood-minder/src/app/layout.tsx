import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mood Minder',
  description: 'Playful support: games, quotes, fun chat, and mood tracking.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}

