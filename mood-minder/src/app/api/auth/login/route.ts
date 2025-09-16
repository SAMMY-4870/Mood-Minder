import { NextResponse } from 'next/server'
import { z } from 'zod'
import { authenticate } from '@/lib/auth'

const schema = z.object({ identifier: z.string().min(1), password: z.string().min(1) })

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { identifier, password } = schema.parse(body)
    const { token } = await authenticate(identifier, password)
    const res = NextResponse.json({ ok: true })
    res.cookies.set('mm_token', token, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 })
    return res
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'Invalid' }, { status: 400 })
  }
}

