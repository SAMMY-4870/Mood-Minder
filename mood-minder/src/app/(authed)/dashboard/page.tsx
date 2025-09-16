export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Your Dashboard</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="card p-4">
          <div className="text-sm text-gray-500">Today’s Mood</div>
          <div className="mt-2 text-3xl font-bold">🙂</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-500">Weekly Streak</div>
          <div className="mt-2 text-3xl font-bold">3 days</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-500">Suggestion</div>
          <div className="mt-2 text-sm">Try the Reaction Game for a quick dopamine boost!</div>
        </div>
      </div>
    </div>
  )
}

