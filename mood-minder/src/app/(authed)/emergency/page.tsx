export default function EmergencyPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-red-600">Emergency Help</h2>
      <div className="card p-6">
        <p className="mb-4 text-sm text-gray-700">If you are in immediate danger, please call your local emergency number right now.</p>
        <ul className="list-inside list-disc text-sm text-gray-700">
          <li>Local emergency: 112/911/999</li>
          <li>Suicide & Crisis Lifeline (US): 988</li>
          <li>Text-based support (US): Text HOME to 741741</li>
        </ul>
      </div>
      <div className="card p-6">
        <p className="mb-2 text-sm">Reach someone you trust:</p>
        <div className="space-x-2">
          <a href="tel:911" className="rounded-md bg-red-600 px-4 py-2 text-white">Call Now</a>
          <a href="mailto:someone@example.com?subject=I need help" className="rounded-md border px-4 py-2">Send Email</a>
        </div>
      </div>
    </div>
  )
}

