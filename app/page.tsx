import Link from "next/link"
import { Suspense } from "react"

import { getCards } from "@/lib/cards"
import GameStart from "@/components/game-start"

export default async function Home() {
  const cards = await getCards()
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <span className="text-gray-800">Контур</span>
            <span className="text-blue-500">Мотив</span>
          </h1>
          <nav className="flex space-x-4">
            <Link href="/" className="px-3 py-2 text-gray-700 font-medium">
              Игра
            </Link>
            <Link href="/admin" className="px-3 py-2 text-gray-500 hover:text-gray-700">
              Управление
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Suspense fallback={<div>Загрузка...</div>}>
          <GameStart cards={cards} />
        </Suspense>
      </main>
    </div>
  )
}
