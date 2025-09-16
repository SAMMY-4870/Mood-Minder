"use client"
import { useEffect, useMemo, useState } from 'react'

type Activity = 'games' | 'quotes' | 'images'

export default function RecsPage() {
  const [counts, setCounts] = useState<Record<Activity, number>>({ games: 0, quotes: 0, images: 0 })

  useEffect(() => {
    const raw = localStorage.getItem('mm_activity_counts')
    if (raw) setCounts(JSON.parse(raw))
  }, [])

  const recommended: Activity = useMemo(() => {
    const entries = Object.entries(counts) as [Activity, number][]
    const sorted = entries.sort((a,b) => b[1]-a[1])
    return (sorted[0]?.[0] ?? 'games')
  }, [counts])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Recommendations</h2>
      <div className="card p-6">
        <div className="mb-2 text-sm text-gray-600">Based on your past usage, we suggest:</div>
        <a href={`/${recommended}`} className="rounded-md bg-brand px-4 py-2 text-white capitalize">Go to {recommended}</a>
      </div>
      <div className="card p-6">
        <div className="text-sm">Your interactions</div>
        <ul className="mt-2 text-sm text-gray-700">
          <li>Games: {counts.games}</li>
          <li>Quotes: {counts.quotes}</li>
          <li>Images: {counts.images}</li>
        </ul>
      </div>
    </div>
  )
}

