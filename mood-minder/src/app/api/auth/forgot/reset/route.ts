import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const schema = z.object({ email: z.string().email(), code: z.string().length(6), newPassword: z.string().min(6) })

export async function POST(req: Request) {
  const body = await req.json()
  const { email, code, newPassword } = schema.parse(body)
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return NextResponse.json({ ok: true })
  const otp = await prisma.otpCode.findFirst({ where: { userId: user.id, code, used: false, expiresAt: { gt: new Date() } }, orderBy: { createdAt: 'desc' } })
  if (!otp) return NextResponse.json({ error: 'Invalid code' }, { status: 400 })
  const hashed = await bcrypt.hash(newPassword, 10)
  await prisma.$transaction([
    prisma.user.update({ where: { id: user.id }, data: { password: hashed } }),
    prisma.otpCode.update({ where: { id: otp.id }, data: { used: true } }),
  ])
  return NextResponse.json({ ok: true })
}

