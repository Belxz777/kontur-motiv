
"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cards, type MotivationCard } from "@/lib/types"
import MotivationCardsv1 from "./motivation-cards"



export default function Start() {
  const [gameState, setGameState] = useState<"start" | "game">("start")
  useEffect(() => {
    const savedState = sessionStorage.getItem('gameState');
    if (savedState) {
      setGameState(savedState as "start" | "game");
    }  else {
      setGameState("game");
      sessionStorage.setItem('gameState', 'game');
    }
  }, []);

  const handleStartGame = () => {
    sessionStorage.setItem('gameState', 'game');
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
          {/* <button
            onClick={handleStartGame}
            className="px-8 py-6 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors shadow-md"
          >
            Начать игру
          </button> */}

              <motion.button
              onClick={()=>{
             handleStartGame()
            }}
            className={`bg-gradient-to-r from-[#A97FFF] to-[#CF70AC] text-white font-bold py-4 px-8 rounded-lg shadow-md  ml-4 hover:bg-[#1A0C41]
               hover:shadow-lg
               hover:shadow-white/50
               hover:scale-110 transition-transform duration-300 ease-in-out
               
               `}
  
          >
    
           Начать игру
            
     
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  // if (gameState === "deck") {
  //   return (
  //     <motion.div
  //       className="flex flex-col items-center justify-center py-12"
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1 }}
  //       transition={{ duration: 0.5 }}
  //     >
  //       <div className="text-center mb-8">
  //         <motion.h2
  //           className="text-3xl font-bold mb-4"
  //           initial={{ y: -20, opacity: 0 }}
  //           animate={{ y: 0, opacity: 1 }}
  //           transition={{ delay: 0.2, duration: 0.5 }}
  //         >
  //           Колода карт мотивации
  //         </motion.h2>
  //         <motion.p
  //           className="text-lg text-gray-600 max-w-2xl mx-auto"
  //           initial={{ y: 20, opacity: 0 }}
  //           animate={{ y: 0, opacity: 1 }}
  //           transition={{ delay: 0.4, duration: 0.5 }}
  //         >
  //           Перед вами колода карт с различными типами мотивации. Нажмите кнопку, чтобы разложить карты и выбрать те,
  //           которые вам подходят.
  //         </motion.p>
  //       </div>
  //       <motion.div
  //         initial={{ scale: 0.8, opacity: 0 }}
  //         animate={{ scale: 1, opacity: 1 }}
  //         transition={{ delay: 1.4, duration: 0.5 }}
  //         whileHover={{ scale: 1.05 }}
  //         whileTap={{ scale: 0.95 }}
  //       >
  //         <button
  //           onClick={handleSpreadDeck}
  //           className="px-8 py-6 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors shadow-md"
  //         >
  //          Начать игру
  //         </button>
  //       </motion.div>
  //     </motion.div>
  //   );
  // }

  return <MotivationCardsv1 cards={cards} />;
}