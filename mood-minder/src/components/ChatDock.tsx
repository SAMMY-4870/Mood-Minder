"use client"
import { useEffect, useMemo, useRef, useState } from 'react'

type Message = { id: string; role: 'user' | 'bot'; text: string }

const starters = [
  "Tell me a pun!",
  "Give me an uplifting quote.",
  "I feel stressed.",
  "Recommend a quick game.",
]

const jokes = [
  "Why did the developer go broke? Because they used up all their cache.",
  "I would tell you a UDP joke, but you might not get it.",
  "Why do functions always break up? Because they have constant arguments.",
]

function generateBotReply(input: string): string {
  const lower = input.toLowerCase()
  if (lower.includes('pun') || lower.includes('joke')) {
    return jokes[Math.floor(Math.random() * jokes.length)]
  }
  if (lower.includes('quote') || lower.includes('uplift')) {
    return 'Keep going. One small step today is a giant stride tomorrow.'
  }
  if (lower.includes('game')) {
    return 'Try the Reaction Game in the Games tab for a quick mood boost!'
  }
  if (lower.includes('stress') || lower.includes('anx')) {
    return 'Let’s take 3 deep breaths together. Inhale... hold... exhale. You’ve got this.'
  }
  return 'I’m here to help! Ask for a pun, quote, or a quick game.'
}

export function ChatDock() {
  const [open, setOpen] = useState(true)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { id: 'm1', role: 'bot', text: 'Hi! I am your funny buddy. Ask me for a pun or a quote!' }
  ])
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const recommendations = useMemo(() => starters, [])

  function send() {
    const content = input.trim()
    if (!content) return
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', text: content }
    const botMsg: Message = { id: crypto.randomUUID(), role: 'bot', text: generateBotReply(content) }
    setMessages(prev => [...prev, userMsg, botMsg])
    setInput('')
  }

  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-3xl p-4 ${open ? '' : 'pointer-events-none'}`}>
      <div className="mx-4 rounded-t-xl border bg-white shadow-lg">
        <div className="flex items-center justify-between border-b p-3">
          <div className="text-sm font-semibold">Funny Chat</div>
          <button onClick={() => setOpen(!open)} className="rounded px-2 py-1 text-xs hover:bg-gray-100">{open ? 'Minimize' : 'Open'}</button>
        </div>
        {open && (
          <div className="max-h-80 overflow-y-auto p-3">
            {messages.map(m => (
              <div key={m.id} className={`mb-2 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${m.role === 'user' ? 'bg-brand text-white' : 'bg-gray-100'}`}>{m.text}</div>
              </div>
            ))}
            <div ref={endRef} />
            <div className="mt-3 text-xs text-gray-500">
              Try: {recommendations.map((r, i) => (
                <button key={i} onClick={() => setInput(r)} className="mr-2 underline hover:text-gray-700">{r}</button>
              ))}
            </div>
          </div>
        )}
        {open && (
          <div className="flex items-center gap-2 border-t p-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Say something funny..." className="flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand" />
            <button onClick={send} className="rounded-md bg-brand px-3 py-2 text-sm text-white hover:bg-brand-dark">Send</button>
          </div>
        )}
      </div>
    </div>
  )
}

