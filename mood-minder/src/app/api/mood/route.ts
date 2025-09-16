import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'

const schema = z.object({ score: z.number().min(1).max(5), dateKey: z.string().regex(/\d{4}-\d{2}-\d{2}/).optional() })

export async function GET() {
  const token = cookies().get('mm_token')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const payload = verifyToken(token)
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await prisma.mood.findMany({ where: { userId: payload.sub }, orderBy: { date: 'asc' } })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const token = cookies().get('mm_token')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const payload = verifyToken(token)
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { score, dateKey } = schema.parse(body)
  const key = dateKey ?? new Date().toISOString().slice(0,10)
  const d = new Date(key)
  const created = await prisma.mood.upsert({
    where: { userId_dateKey: { userId: payload.sub, dateKey: key } },
    update: { score },
    create: { userId: payload.sub, score, date: d, dateKey: key },
  })
  return NextResponse.json(created)
}

