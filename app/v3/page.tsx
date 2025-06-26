
import Link from "next/link"
import { Suspense, useEffect } from "react"

import GameStart from "@/components/game-start"
import Header from "@/components/header"
import GameStartv2 from "@/components/v2/startv2"
import GameStartv3 from "@/components/v3/startv3"
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
      "id":1,
      "title": "Признание успехов",
      "description": "Важно официальное признание ваших достижений, похвала и признание со стороны коллег и руководства.</br> Желание быть лучшим ",
      "icon": "3.jpg",
      "color": "#fffff",
      "boldness": 700,
      "background": "#fffff",
      "isGradient": false,
      "secondColor": "#fffff"
    },
    {
      "id":2,
      "title": "Творчество",
      "description": "Вам хочется придумывать нестандартные решения, создавать что-то новое и необычное.",
      "icon": "creativity.png",
      "color": "#fffff",
      "boldness": 700,
      "background": "#fffff",
      "isGradient": false,
      "secondColor": "#fffff"
    },
    {
      "id":3,
      "title": "Образ жизни",
      "description": "Вы цените комфортный ритм жизни, гибкость и баланс между делами и личным временем.",
      "icon": "lifestyle.png",
      "color": "#fffff",
      "boldness": 700,
      "background": "#fffff",
      "isGradient": false,
      "secondColor": "#fffff"
    },
    {
      "id":4,
      "title": "Заработок",
      "description": "Ваш труд должен справедливо вознаграждаться, для вас важна возможность для роста дохода.",
      "icon": "payment.png",
      "color": "#fffff",
      "boldness": 700,
      "background": "#fffff",
      "isGradient": false,
      "secondColor": "#fffff"
    },
    {
      "id":5,
   "title": "Вклад",
      "description": "Вы хотите, чтобы ваша работа имела смысл и чувствуете, что ваша работа важна.",
      "icon": "contribution.png",
      "color": "#fffff",
      "boldness": 700,
      "background": "#fffff",
      "isGradient": false,
      "secondColor": "#fffff"
    },
     {
      "id":6,
      "title": "Содержание работы",
      "description": "Важен горизонталььный рост, вы хотите развиваться и достигать новых высот.",
      "icon": "2.png",
      "color": "#fffff",
      "boldness": 700,
      "background": "#fffff",
      "isGradient": false,
      "secondColor": "#fffff"
    },
    {
      "id":7,
      "title": "Команда",
      "description": "Вам нравится работать с единомышленниками, общаться, чувствовать, что вас поддержат.",
      "icon": "team.png",
      "color": "#fffff",
      "secondColor": "#fffff"
    },
    {
      "id":8,
    "title": "Статус",
      "description": "Ваша позиция в компании подчеркивает ваш профессионализм, вы заметны среди коллег.",
      "icon": "status.png",
      "color": "#fffff",
      "boldness": 700,
      "background": "#fffff",
      "isGradient": false,
      "secondColor": "#fffff"
    },
    {
      "id":9,
      "title": "Общение",
      "description": "Вы цените возможность живого общения, влияние на других и помощь людям.",
      "icon": "talk.png",
      "color": "#fffff",
      "boldness": 700,
      "background": "#fffffs",
      "isGradient": false,
      "secondColor": "#fffff"
    },
    {
      "id":10,
      "title": "Вызов",
      "description": "Вам интересны сложные задачи, которые заставляют вас расти и учиться новому.",
      "icon": "1.png",
      "from":"#4B0082",
      "to":"#0000FF",
      "boldness": 1000, 
      "width":1000,
      "height":1000,
      "background":"#800080",
      "isGradient": true,
      "secondColor": "#FFFFFF"
    },
    {
      "id":11,
      "title": "Фидбэк",
      "description": "Вы цените возможность получения обратной связи и работы с руководством.",
      "icon": "feedback.png",
      "color": "#fffff",
      "boldness": 700,
      "background": "#fffff",
      "isGradient": false,
      "secondColor": "#fffff"
    },
    {
      "id":12,
      "title": "Лидерство",
      "description": "Вы хотите вести за собой команду, принимать решения, влиять на других на равных.",
      "icon": "lidership.png",
      "color": "#ADFF2F",
      "boldness": 1000,
      "background": "#FFFFE0",
      "isGradient": false,
      "secondColor": "#fffff"
    }  ] 
     const cards = JSON.parse(JSON.stringify(routh))
  console.log(cards)
  return (
    <div className="min-h-screen bg-gray-100">
<Header color="text-blue-500"  verstext="версия 3"/>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Suspense fallback={<div>Загрузка...</div>}>
          <GameStartv3 cards={cards} />
        </Suspense>
      </main>
    </div>
  )
}
