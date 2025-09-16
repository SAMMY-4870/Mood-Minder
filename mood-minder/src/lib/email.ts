import nodemailer from 'nodemailer'

export function getTransport() {
  if (process.env.EMAIL_SERVER_HOST) {
    return nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT || 587),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })
  }
  return nodemailer.createTransport({ jsonTransport: true })
}

export async function sendOtpEmail(to: string, code: string) {
  const transporter = getTransport()
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'no-reply@mood-minder.local',
    to,
    subject: 'Your Mood Minder OTP',
    text: `Your OTP is ${code}. It expires in 10 minutes.`,
  })
  return info
}

