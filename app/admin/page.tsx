import { Suspense } from "react"
import Link from "next/link"
import CardManager from "@/components/card-manager"
import { getCards } from "@/lib/cards"
import { MotivationCard } from "@/lib/types"
import Header from "@/components/header"

export default async function AdminPage() {
  const cards = await getCards()

  return (
    <div className="min-h-screen bg-gray-100">
<Header/>

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
