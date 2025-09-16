"use client"
import { useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

type MoodEntry = { date: string; score: number }

export default function HealthPage() {
  const [mood, setMood] = useState<number | null>(null)
  const [entries, setEntries] = useState<MoodEntry[]>([])

  function addEntry() {
    if (mood === null) return
    const today = new Date().toISOString().slice(0, 10)
    setEntries(prev => {
      const filtered = prev.filter(e => e.date !== today)
      return [...filtered, { date: today, score: mood }].sort((a,b) => a.date.localeCompare(b.date))
    })
    setMood(null)
  }

  const chartData = useMemo(() => {
    const labels = entries.map(e => e.date)
    const data = entries.map(e => e.score)
    return {
      labels,
      datasets: [
        {
          label: 'Mood Score (1-5)',
          data,
          borderColor: '#6c5ce7',
          backgroundColor: 'rgba(108,92,231,0.2)'
        }
      ]
    }
  }, [entries])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Health Tracking</h2>
      <div className="card p-6">
        <div className="mb-2 text-sm text-gray-600">How are you feeling today?</div>
        <div className="mb-4 flex items-center gap-2">
          {[1,2,3,4,5].map(s => (
            <button key={s} onClick={() => setMood(s)} className={`rounded-md px-3 py-2 text-sm ${mood === s ? 'bg-brand text-white' : 'border'}`}>{s}</button>
          ))}
          <button onClick={addEntry} className="ml-2 rounded-md bg-brand px-4 py-2 text-white">Log</button>
        </div>
        <div className="text-xs text-gray-500">Track daily mood; view trends weekly and monthly.</div>
      </div>
      <div className="card p-6">
        <Line data={chartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
      </div>
      <div className="card p-6">
        <h3 className="mb-2 font-semibold">Auto Report</h3>
        <p className="text-sm text-gray-700">{entries.length === 0 ? 'No data yet.' : `You logged ${entries.length} day(s). Average mood: ${ (entries.reduce((a,b)=>a+b.score,0)/entries.length).toFixed(1) }.`}</p>
      </div>
    </div>
  )
}

