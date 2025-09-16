import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'dev-secret'

export async function registerUser(data: { firstName: string; lastName: string; email: string; username: string; password: string }) {
  const existing = await prisma.user.findFirst({ where: { OR: [{ email: data.email }, { username: data.username }] } })
  if (existing) throw new Error('User already exists')
  const hashed = await bcrypt.hash(data.password, 10)
  const user = await prisma.user.create({ data: { ...data, password: hashed } })
  return user
}

export async function authenticate(identifier: string, password: string) {
  const user = await prisma.user.findFirst({ where: { OR: [{ email: identifier }, { username: identifier }] } })
  if (!user) throw new Error('Invalid credentials')
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) throw new Error('Invalid credentials')
  const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '7d' })
  return { user, token }
}

export function verifyToken(token: string): { sub: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { sub: string }
  } catch {
    return null
  }
}

