import type React from "react"
import "./globals.css"

export const metadata = {
  title: 'Kontur - Определение мотивации',
  description: 'Сервис для отпределения мотивации сотрудников',
  generator: 'Next.js',
  applicationName: 'Kontur-motivation',
  keywords: ['motivation', 'React', 'JavaScript'],
  // icons: {
  //   icon: '/favicon.ico',
  //   apple: '/apple-touch-icon.png',
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}