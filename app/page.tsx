

import Start from "@/components/game-start"
import Header from "@/components/header"

import { Suspense } from "react"


export default async function Home() {
return (
    <div className="min-h-screen bg-gray-100">
    <Header color="bg-gradient-to-r from-[#A97FFF] to-[#CF70AC] bg-clip-text text-transparent" />
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Suspense fallback={<div>Загрузка...</div>}>
          <Start  />
        </Suspense>
      </main>
    </div>
  )
}