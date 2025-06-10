
import Link from "next/link"
import { Suspense, useEffect } from "react"

import GameStart from "@/components/game-start"
import Header from "@/components/header"
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
      "title": "Экспертность",
      "description": "Помогать принимать важные решения, задавать стандарты в команде.",
      "icon": "expert.png",
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
      "boldness": 700,
      "background": "#F4A460",
      "isGradient": false,
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
<Header/>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Suspense fallback={<div>Загрузка...</div>}>
          <GameStart cards={cards} />
        </Suspense>
      </main>
    </div>
  )
}
// 0
// : 
// {id: '1c0d47bd-c291-469f-a0f1-2d33ea6fbd75', title: 'Экспертность', description: 'Помогать принимать важные решения, задавать стандарты в команде.', icon: 'expert.png'}
// 1
// : 
// {id: '674b1f53-5519-4c87-9c17-8cb112923015', title: 'Творчество', description: 'Вам хочется придумывать нестандартные решения, создавать что-то новое и необычное.', icon: 'creativity.png'}
// 2
// : 
// {id: 'f5651524-b642-48f2-830a-6f33342a4f7b', title: 'Образ жизни', description: 'Вы цените комфортный ритм жизни, гибкость и баланс между делами и личным временем.', icon: 'lifestyle.png'}
// 3
// : 
// {id: '4725232a-ab39-4fd9-a06f-056ce4a53a1f', title: 'Заработок', description: 'Ваш труд должен справедливо вознаграждаться, для вас важна возможность для роста дохода.', icon: 'payment.png'}
// 4
// : 
// {id: 'e32e41e4-be7a-4595-a980-94df91078a86', title: 'Вклад', description: 'Вы хотите, чтобы ваша работа имела смысл и чувствуете, что ваша работа важна.', icon: 'contribution.png'}
// 5
// : 
// {id: '34f22e62-6e5d-4b53-9c2b-42141b917886', title: 'Команда', description: 'Вам нравится работать с единомышленниками, общаться, чувствовать, что вас поддержат.', icon: 'team.png'}
// 6
// : 
// {id: '2d85fc19-764f-4c1b-982b-49fbfc1afbd2', title: 'Статус', description: 'Ваша позиция в компании подчеркивает ваш профессионализм, вы заметны среди коллег.', icon: 'status.png'}
// 7
// : 
// {id: 'db0a0c0c-c961-4d7d-a332-f1466b853ac2', title: 'Общение', description: 'Вы цените возможность живого общения, влияние на других и помощь людям.', icon: 'talk.png'}
// 8
// : 
// {id: '754d851a-c4be-4482-996d-a70b4fac083e', title: 'Вызов', description: 'Вам интересны сложные задачи, которые заставляют вас расти и учиться новому.', icon: 'challenge.png'}
// 9
// : 
// {id: '09fe1efc-4615-4fc7-bfa2-789c92eaad07', title: 'Фидбэк', description: 'Вы цените возможность получения обратной связи и работы с руководством.', icon: 'feedback.png'}
// 10
// : 
// {id: 'fb2c57fe-4d0d-406f-b1b2-1d90203210da', title: 'Лидерство', description: 'Вы хотите вести за собой команду, принимать решения, влиять на других на равных.', icon: 'lidership.png'}

