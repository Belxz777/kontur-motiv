"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { MotivationCard } from "@/lib/types"
import MotivationCardsv2 from "@/components/v2/motiv-cards"

export default function GameStartv3({ cards }: { cards: MotivationCard[] }) {
  const [gameState, setGameState] = useState<"start" | "deck" | "game">("start")
  const [cardscur, setcardscur] = useState(cards)
  useEffect(() => {
  const routh = [
 {
      "id": 1,
      "title": "Признание успехов",
      "description": "Важно официальное признание ваших достижений, похвала и признание со стороны коллег и руководства.</br> </br> Желание быть лучшим ",
      "icon": "4v3.jpg",
      "color": "#fffff",
      "boldness": 700,
      "width":1000,
      "height":1000,
      "background": "#fffff",
      "isGradient": false,
      "secondColor": "#fffff"
    },
     {
      "id": 2,
      "title": "Сотрудничество",
      "description": "Важна совместная деятельность в решении задач. Важно наличие команды, обмен опытом с коллегами, неформальное общение.",
      "icon": "1v3.jpg",
      "color": "#FEFEFE",
      "width":1000,
      "height":1000,
      "boldness": 700,
      "background": "FEFEFE",
      "isGradient": false,
      "secondColor": "#fffff"
    },
    {
      "id": 3,
      "title": "Образ жизни",
      "description": "Вам нравится работать с единомышленниками, общаться, чувствовать, что вас поддержат.",
      "icon": "2v3.jpg",
      "width":1000,
      "height":1000,
      "color": "#fffff",
      "boldness": 700,
      "background": "#F4A460",
      "isGradient": false,
      "secondColor": "#fffff"
    },
    {
      "id": 4,
      "title": "Финансовый мотиватор",
      "description": "Ваша позиция в компании подчеркивает ваш профессионализм, вы заметны среди коллег.",
      "icon": "3v3.jpg",
      "width":1000,
      "height":1000,
      "color": "#fffff",
      "boldness": 700,
      "background": "#fffff",
      "isGradient": false,
      "secondColor": "#fffff"
    },
    {
      "id": 5,
      "title": "Отношения с руководителем",
      "description": "Важна личность руководителя.Насколько мои качества сходятся  с его. Важны выстроенные отношения с непосредственнм/вышестоящим руководителем, обратная связь, поддержка, общение с ним.",
      "icon": "2s.jpg",
      "color": "#fffff",
      "boldness": 700,
      "background": "#fffff",
      "isGradient": false,
      "secondColor": "#fffff"
    },
    {
      "id": 6,
      "title": "Содержание работы ",
      "description": "Важен горизонтальный рост, наращивание экспертизы, работа над улучшением процессвов/продукта.",
      "icon": "2.png",
      "color": "#fffff",
      "boldness": 700,
      "background": "#fffff",
      "isGradient": false,
      "secondColor": "#fffff"
    },
    {
      "id": 7,
      "title": "Ответственность, самостоятельность, полномочия", 
      "description": "Важна свобода в принятии решений, выполнении задач, снижение контроля. Желание получить больший уровень полномочий. ",
      "icon": "1v2.jpg",
      "color": "#fffff",
      "boldness": 700,
      "background": "#fffff",
      "isGradient": false,
      "secondColor": "#fffff"
    },
    {
      "id": 8,
      "title": "Достижения ",
      "description": "Ориентация на достижение собственных целей, результат важнее процесса. Важна собственная оценка результатов(достиг/не достиг), внешняя оценка менее важна.",
      "icon": "2v2.jpg",
      "color": "#fffff",
      "boldness": 700,
      "background": "#fffff",
      "isGradient": false,
      "secondColor": "#fffff"
    },
    {
      "id": 9,
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
      "id": 10,
      "title": "Вызов",
      "description": "Важен горизонтальный рост, желание быть руководителем, влиять на другие, расти по вертикальной карьерной лестнице.",
      "icon": "1.png",
      "from":"#4B0082",
      "to":"#0000FF",
      "boldness": 1000, 
      "width":1000,
      "height":1000,
      "background":"#1A0C41",
      "isGradient": true,
      "secondColor": "#FFFFFF"
    },
    {
      "id": 11,
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
      "id": 12,
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
    if (cards.length === 0) {
      setGameState("deck");
      localStorage.setItem("selectedCards", JSON.stringify(cardscur));
    console.log(cardscur)
    } else {
      setGameState("game");
      console.log('cd',cards)
      setcardscur(cards)
    }
    }, []);

  const handleStartGame = () => {
    setGameState("deck");
  };

  const handleSpreadDeck = () => {
    setGameState("game");
  };

  if (gameState === "start") {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Определение мотивации сотрудников
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Выберите карточки, которые наиболее точно отражают вашу мотивацию в работе. Это поможет лучше понять, что
            вас вдохновляет и мотивирует.
          </motion.p>
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <button
            onClick={handleStartGame}
            className="px-8 py-6 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors shadow-md"
          >
            Начать игру
          </button>
        </motion.div>
      </motion.div>
    );
  }

  if (gameState === "deck") {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Колода карт мотивации
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Перед вами колода карт с различными типами мотивации. Нажмите кнопку, чтобы разложить карты и выбрать те,
            которые вам подходят.
          </motion.p>
        </div>
        {/* <motion.div
          className="relative w-64 h-80 mb-8"
          initial={{ rotateY: 180 }}
          animate={{ rotateY: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <AnimatePresence>
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 bg-white rounded-lg shadow-md border border-gray-200"
                initial={{
                  x: Math.random() * 10 - 5,
                  y: Math.random() * 10 - 5,
                  rotate: Math.random() * 6 - 3,
                }}
                animate={{
                  x: i * 3,
                  y: i * -3,
                  rotate: i * 2 - 4,
                  transition: {
                    delay: 0.8 + i * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100,
                  },
                }}
                style={{ zIndex: -i }}
              />
            ))}
          </AnimatePresence>
          <motion.div
            className="absolute inset-0 bg-white rounded-lg shadow-lg border-2 border-gray-300 flex items-center justify-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="text-center p-4">
              <motion.div
                className="w-24 h-24 mx-auto mb-4"
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-full h-full text-gray-700"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </motion.div>
              <motion.h3
                className="text-xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                Колода мотивации
              </motion.h3>
            </div>
          </motion.div>
        </motion.div> */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={handleSpreadDeck}
            className="px-8 py-6 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors shadow-md"
          >
           Начать игру
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return <MotivationCardsv2 cards={cardscur} />;
}