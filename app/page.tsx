
import Link from "next/link"
import { Suspense, useEffect } from "react"

import GameStart from "@/components/game-start"
// import expert from '@/public/expert.png'
// import team from '@/public/team.png'
// import leader from '@/public/lidership.png'
// import creative from '@/public/creativity.png'
// import lifestyle from '@/public/lifestyle.png'
// import challenge from '@/public/vis.png'
// import feedback from '@/public/feedback.png'
// import payment from '@/public/payment.png'
// import talk from '@/public/talk.png'
// import status from '@/public/status.png'
// import contribution from '@/public/contribution.png'
export default async function Home() {
  const routh = [
    {
      "id": "1c0d47bd-c291-469f-a0f1-2d33ea6fbd75",
      "title": "Экспертность",
      "description": "Помогать принимать важные решения, задавать стандарты в команде.",
      "icon": "expert.png"
    },
    {
      "id": "674b1f53-5519-4c87-9c17-8cb112923015",
      "title": "Творчество",
      "description": "Вам хочется придумывать нестандартные решения, создавать что-то новое и необычное.",
      "icon": "creativity.png"
    },
    {
      "id": "f5651524-b642-48f2-830a-6f33342a4f7b",
      "title": "Образ жизни",
      "description": "Вы цените комфортный ритм жизни, гибкость и баланс между делами и личным временем.",
      "icon":"lifestyle.png"
    },
    {
      "id": "4725232a-ab39-4fd9-a06f-056ce4a53a1f",
      "title": "Заработок",
      "description": "Ваш труд должен справедливо вознаграждаться, для вас важна возможность для роста дохода.",
      "icon":"payment.png"
    },
    {
      "id": "e32e41e4-be7a-4595-a980-94df91078a86",
      "title": "Вклад",
      "description": "Вы хотите, чтобы ваша работа имела смысл и чувствуете, что ваша работа важна.",
      "icon": "contribution.png"
    },
    {
      "id": "34f22e62-6e5d-4b53-9c2b-42141b917886",
      "title": "Команда",
      "description": "Вам нравится работать с единомышленниками, общаться, чувствовать, что вас поддержат.",
      "icon": "team.png"
    },
    {
      "id": "2d85fc19-764f-4c1b-982b-49fbfc1afbd2",
      "title": "Статус",
      "description": "Ваша позиция в компании подчеркивает ваш профессионализм, вы заметны среди коллег.",
      "icon": "status.png"
    },
    {
      "id": "db0a0c0c-c961-4d7d-a332-f1466b853ac2",
      "title": "Общение",
      "description": "Вы цените возможность живого общения, влияние на других и помощь людям.",
      "icon": "talk.png"
    },
    {
      "id": "754d851a-c4be-4482-996d-a70b4fac083e",
      "title": "Вызов",
      "description": "Вам интересны сложные задачи, которые заставляют вас расти и учиться новому.",
      "icon": "challenge.png"
    },
    {
      "id": "09fe1efc-4615-4fc7-bfa2-789c92eaad07",
      "title": "Фидбэк",
      "description": "Вы цените возможность получения обратной связи и работы с руководством.",
      "icon": "feedback.png"
    },
    {
      "id": "fb2c57fe-4d0d-406f-b1b2-1d90203210da",
      "title": "Лидерство",
      "description": "Вы хотите вести за собой команду, принимать решения, влиять на других на равных.",
      "icon": "lidership.png"
    }  ]
  const cards = JSON.parse(JSON.stringify(routh))
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold" 

        >
            <span className="text-gray-800">Контур</span>
            <span className="text-blue-500"
            >Мотив</span>
          </h1>
          <nav className="flex space-x-4">
            <Link href="/" className="px-3 py-2 text-gray-700 font-medium">
              Игра
            </Link>
            <Link href="/admin" className="px-3 py-2 text-gray-500 hover:text-gray-700">
             Своя игра
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
