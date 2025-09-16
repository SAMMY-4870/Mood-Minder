import { NextResponse } from 'next/server'
import { z } from 'zod'
import { registerUser } from '@/lib/auth'

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(6),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = schema.parse(body)
    const user = await registerUser(data)
    return NextResponse.json({ id: user.id })
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'Invalid' }, { status: 400 })
  }
}

