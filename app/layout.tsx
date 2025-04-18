import type React from "react"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}

export const metadata = {
      generator: 'Next.js',
      applicationName: 'Kontur ',
      keywords: ['motivation', 'React', 'JavaScript'],
    };
