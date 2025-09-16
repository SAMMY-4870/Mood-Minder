"use client"
import { useEffect, useRef, useState } from 'react'

function ReactionGame() {
  const [state, setState] = useState<'idle' | 'waiting' | 'go' | 'done'>('idle')
  const [message, setMessage] = useState('Click start and wait for green')
  const [time, setTime] = useState<number | null>(null)
  const startTime = useRef<number>(0)
  const timeoutRef = useRef<number | null>(null)

  function start() {
    setState('waiting')
    setMessage('Wait for green...')
    const delay = 1000 + Math.random() * 3000
    timeoutRef.current = window.setTimeout(() => {
      setState('go')
      setMessage('GO! Click now!')
      startTime.current = performance.now()
    }, delay)
  }

  function click() {
    if (state === 'waiting') {
      setMessage('Too soon!')
      setState('done')
      return
    }
    if (state === 'go') {
      const ms = performance.now() - startTime.current
      setTime(Math.round(ms))
      setMessage('Nice!')
      setState('done')
    }
  }

  useEffect(() => () => { if (timeoutRef.current) window.clearTimeout(timeoutRef.current) }, [])

  return (
    <div className="card p-6 text-center">
      <div className={`mb-4 h-40 rounded-lg ${state === 'go' ? 'bg-green-400' : state === 'waiting' ? 'bg-red-400' : 'bg-gray-200'}`} onClick={click} />
      <div className="mb-2 text-sm text-gray-600">{message}</div>
      {time !== null && <div className="mb-4 text-2xl font-bold">{time} ms</div>}
      <div className="space-x-2">
        <button onClick={start} className="rounded-md bg-brand px-4 py-2 text-white">Start</button>
        <button onClick={() => { setState('idle'); setTime(null); setMessage('Click start and wait for green') }} className="rounded-md border px-4 py-2">Reset</button>
      </div>
    </div>
  )
}

import { ActivityTracker } from '@/components/ActivityTracker'

export default function GamesPage() {
  return (
    <div className="space-y-6">
      <ActivityTracker feature="games" />
      <h2 className="text-2xl font-semibold">Games</h2>
      <ReactionGame />
    </div>
  )
}

