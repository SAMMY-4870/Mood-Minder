"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/games", label: "Games" },
  { href: "/quotes", label: "Quotes" },
  { href: "/images", label: "Funny Images" },
  { href: "/health", label: "Health" },
  { href: "/recs", label: "Recommendations" },
  { href: "/emergency", label: "Emergency" },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="flex h-full w-56 flex-col border-r bg-white p-4">
      <h1 className="mb-6 text-xl font-bold text-brand">Mood Minder</h1>
      <nav className="space-y-2">
        {navItems.map(item => {
          const active = pathname?.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href} className={`block rounded-md px-3 py-2 text-sm ${active ? 'bg-brand text-white' : 'hover:bg-gray-100'}`}>
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto pt-4">
        <button
          onClick={async () => { await fetch('/api/auth/logout', { method: 'POST' }); window.location.href = '/' }}
          className="w-full rounded-md border px-3 py-2 text-left text-sm hover:bg-gray-50"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}

