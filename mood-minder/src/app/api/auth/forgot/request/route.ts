import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendOtpEmail } from '@/lib/email'

const schema = z.object({ email: z.string().email() })

export async function POST(req: Request) {
  const body = await req.json()
  const { email } = schema.parse(body)
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return NextResponse.json({ ok: true })

  const code = Math.floor(100000 + Math.random() * 900000).toString()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000)
  await prisma.otpCode.create({ data: { userId: user.id, code, expiresAt } })
  await sendOtpEmail(email, code)
  return NextResponse.json({ ok: true })
}

