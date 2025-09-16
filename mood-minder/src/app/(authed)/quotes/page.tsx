const QUOTES = [
  { text: 'This too shall pass.', author: 'Unknown' },
  { text: 'No rain, no flowers.', author: 'Unknown' },
  { text: 'Be the reason someone smiles today.', author: 'Unknown' },
  { text: 'The best time for new beginnings is now.', author: 'Unknown' },
]

import { ActivityTracker } from '@/components/ActivityTracker'

export default function QuotesPage() {
  return (
    <div className="space-y-6">
      <ActivityTracker feature="quotes" />
      <h2 className="text-2xl font-semibold">Quotes</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {QUOTES.map((q, idx) => (
          <div key={idx} className="card p-6">
            <div className="mb-2 text-lg">“{q.text}”</div>
            <div className="text-sm text-gray-500">— {q.author}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

