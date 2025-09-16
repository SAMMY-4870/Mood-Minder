import { NextResponse } from 'next/server'
import PDFDocument from 'pdfkit'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'

export async function GET() {
  const token = cookies().get('mm_token')?.value
  if (!token) return new NextResponse('Unauthorized', { status: 401 })
  const payload = verifyToken(token)
  if (!payload) return new NextResponse('Unauthorized', { status: 401 })
  const moods = await prisma.mood.findMany({ where: { userId: payload.sub }, orderBy: { date: 'asc' } })

  const doc = new PDFDocument({ size: 'A4', margin: 50 })
  const chunks: Buffer[] = []
  doc.on('data', chunk => chunks.push(chunk as Buffer))
  const done = new Promise<Buffer>((resolve) => {
    doc.on('end', () => resolve(Buffer.concat(chunks)))
  })

  doc.fontSize(20).text('Mood Minder - Health Report', { align: 'center' })
  doc.moveDown()
  doc.fontSize(12).text(`Entries: ${moods.length}`)
  if (moods.length > 0) {
    const avg = moods.reduce((a, m) => a + m.score, 0) / moods.length
    doc.text(`Average mood: ${avg.toFixed(2)}`)
  }
  doc.moveDown()
  moods.forEach(m => {
    doc.text(`${new Date(m.date).toISOString().slice(0,10)} - score ${m.score}`)
  })
  doc.end()

  const pdf = await done
  return new NextResponse(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="mood-report.pdf"'
    }
  })
}

