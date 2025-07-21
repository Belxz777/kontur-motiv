import type React from "react"
import "./globals.css"

export const metadata = {
  title: 'Контур-мотивация',
  description: 'Сервис для отпределения мотивации сотрудников',
  applicationName: 'Kontur-motivation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
      </head>
      <body>{children}</body>
    </html>
  )
}