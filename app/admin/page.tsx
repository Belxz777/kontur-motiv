import { Suspense } from "react"
import Link from "next/link"
import CardManager from "@/components/card-manager"
import { getCards } from "@/lib/cards"

export default async function AdminPage() {
  const cards = await getCards()

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <span className="text-gray-800">Контур</span>
            <span className="text-blue-500">Мотив</span>
            <span className="ml-2 text-gray-600 font-normal">Администрирование</span>
          </h1>
          <nav className="flex space-x-4">
            <Link href="/" className="px-3 py-2 text-gray-500 hover:text-gray-700">
              Игра
            </Link>
        
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Создайте карты под свои нужды!</h2>
          <Suspense fallback={<div>Загрузка...</div>}>
            <CardManager initialCards={cards} />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
