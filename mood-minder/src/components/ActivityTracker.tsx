"use client"
import { useEffect } from 'react'

export function ActivityTracker({ feature }: { feature: 'games' | 'quotes' | 'images' }) {
  useEffect(() => {
    const key = 'mm_activity_counts'
    const raw = localStorage.getItem(key)
    const counts = raw ? JSON.parse(raw) as Record<string, number> : {}
    counts[feature] = (counts[feature] ?? 0) + 1
    localStorage.setItem(key, JSON.stringify(counts))
  }, [feature])
  return null
}

