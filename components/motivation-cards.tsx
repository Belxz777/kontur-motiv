"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable"
import { restrictToParentElement } from "@dnd-kit/modifiers"
import type { MotivationCard } from "@/lib/types"

function SortableCard({
  card,
  index,
  onClick,
}: {
  card: MotivationCard
  index: number
  onClick: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card.id })

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition: isDragging ? 'none' : transition,
    zIndex: isDragging ? 100 : 1,
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={`relative ${isDragging ? "z-10 cursor-grabbing" : "cursor-grab"}`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ 
        opacity: isDragging ? 0.9 : 1, 
        scale: isDragging ? 1.08 : 1,
        y: 0,
        boxShadow: isDragging 
          ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      }}
      transition={{ 
        delay: index * 0.05,
        duration: 0.3,
        scale: { type: "spring", stiffness: 500, damping: 30 },
        opacity: { duration: 0.2 }
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      {...attributes}
      {...listeners}
    >
      <div
        className={`transition-all rounded-lg overflow-hidden border bg-[#1A0C41] isolation-isolate h-full`}
        onDoubleClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
      >
        <div className={`p-3 flex justify-between items-center`}>
          <div className="w-full h-[200px] mb-3 flex items-center justify-center rounded-2xl">
            {card.icon && (
              <Image 
                src={card.icon || "/challenge.png"} 
                alt={card.title} 
                aria-expanded="true"
                width={(card.width || 100) * 1.2} 
                height={(card.height || 100) * 1.2} 
                priority
                className="rounded-xl  scale-150" 
              />
            )}
          </div>
        </div>
        <h2 className={`text-2xl font-[${card.boldness.toString()}] ml-4 mt-4 bg-gradient-to-r from-[#A97FFF] to-[#CF70AC] bg-clip-text text-transparent font-extrabold`}>
          {card.title}
        </h2>
        <div className="p-4 flex flex-col items-center flex-grow">
          <p className={`text-[#ffffff]`} dangerouslySetInnerHTML={{ __html: card.description }}></p>
        </div>
      </div>    </motion.div>
  )
}
function DragOverlayCard({ card }: { card: MotivationCard }) {
  return (
    <motion.div
      className="rounded-lg overflow-hidden border-2 border-blue-500 shadow-2xl bg-[#1A0C41] w-full h-full"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1.1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
       <div
        className={`transition-all rounded-lg overflow-hidden border bg-[#1A0C41] isolation-isolate h-full`}
        onDoubleClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className={`p-3 flex justify-between items-center`}>
          <div className="w-full h-full mb-3 flex items-center justify-center rounded-2xl">
            {card.icon && (
              <Image 
                src={card.icon || "/not_found.png"} 
                alt={card.title} 
                aria-expanded="true"
                width={card.width || 100} 
                height={card.height || 100} 
                priority
                className="rounded-xl" 
              />
            )}
          </div>
        </div>
        <h2 className={`text-lg font-[${card.boldness.toString()}] ml-4 bg-gradient-to-r from-[#A97FFF] to-[#CF70AC] bg-clip-text text-transparent font-extrabold`}>
          {card.title}
        </h2>
        <div className="p-4 flex flex-col items-center flex-grow">
          <p className={`text-[#ffffff]`} dangerouslySetInnerHTML={{ __html: card.description }}></p>
        </div>
      </div>
    </motion.div>
  )
}export default function MotivationCardsv1({ cards }: { cards: MotivationCard[] }) {
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [dragActiveCard, setDragActiveCard] = useState<MotivationCard | null>(null)
  const [completed, setCompleted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)
  const [sortedCards, setSortedCards] = useState<MotivationCard[]>([])
  const [changes, setChanges] = useState(false)

  const [showDeck, setShowDeck] = useState(true)
  const [visibleCards, setVisibleCards] = useState<MotivationCard[]>([])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  useEffect(() => {
    // Initialize with no cards visible
    setSortedCards([])
    setIsAnimating(false)
  }, [cards])

  const handleDeckClick = () => {
    if (visibleCards.length < cards.length) {
      // Add one more card
      const nextCard = cards[visibleCards.length]
      setVisibleCards([...visibleCards, nextCard])
      setSortedCards([...visibleCards, nextCard])
    }
    if (visibleCards.length + 1 >= cards.length) {
      setShowDeck(false)
    }
  }

  const handleDeckDoubleClick = () => {
    // Show all cards at once
    setVisibleCards(cards)
    setSortedCards(cards)
    setShowDeck(false)
  }
  const handleCardClick = (cardId: number) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter((id) => id !== cardId))
    } else {
      setSelectedCards([...selectedCards, cardId])
    }
  }

  const handleCardDetails = (cardId: string) => {
    setActiveCard(cardId)
  }

  function handleFinish() {
    setSelectedCards(sortedCards.map((card) => Number(card.id)))
    setCompleted(true)
  }

  const handleReset = () => {
    setSelectedCards([])
    setCompleted(false)
    setVisibleCards([])
    setSortedCards([])
    setShowDeck(true)
    setChanges(false)
  }

  const handleDragStart = (event: DragStartEvent) => {
    const card = sortedCards.find((c) => c.id === event.active.id)
    if (card) {
      setDragActiveCard(card)
    }
    setChanges(true)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setDragActiveCard(null)

    if (over && active.id !== over.id) {
      setSortedCards((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  if (completed) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center flex-col">
            <h2 className="text-2xl font-bold mb-6">Результаты </h2>
            <p className="mb-6">Вот ваш лист:</p>
          </div>
          <button
            onClick={handleReset}
            className=" text-white bg-[#1A0C41] font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 ease-in-out ml-4"
          >
            Начать заново
          </button>
        </div>
        <div className="space-y-4 mb-8">
          {selectedCards.map((cardId, index) => {
            const card = sortedCards.find((c) => c.id === cardId)
            if (!card) return null
            return (
              <div key={card.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center">
                <div className=" text-white bg-gradient-to-r from-[#A97FFF] to-[#CF70AC]  rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold mb-1">{card.title}</h3>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="flex flex-row justify-between items-center mb-6">
   
        {
          showDeck ? 
          <motion.p
          className="text-gray-600 inline-block  select-none cursor-pointer"
          initial={{ backgroundColor: "transparent" }}
          animate={{
            backgroundColor: ["rgba(139, 92, 246, 0)", "rgba(139, 92, 246, 0.5)", "rgba(139, 92, 246, 0)"],
            color: ["#4b5563", "#2563eb", "#4b5563"],
          }}
          transition={{
            duration: 2,
            repeat: 1,
            repeatType: "reverse",
    
          }}
        >
   
              Нажмите на кнопку справа, чтобы открыть карту. Двойной клик откроет все карты.

        </motion.p>           :
        <motion.p
        className="text-gray-600 inline-block select-none cursor-pointer"
        initial={{ backgroundColor: "transparent" }}
        animate={{
            backgroundColor: ["rgba(139, 92, 246, 0)", "rgba(139, 92, 246, 0.5)", "rgba(139, 92, 246, 0)"],
          color: ["#4b5563", "#2563eb", "#4b5563"],
        }}
        transition={{
          duration: 2,
          repeat: 1,
          repeatType: "reverse",
          delay: 1
  
        }}
      >
        Перетаскивайте карты, чтобы изменить их порядок.
      Двойной клик что бы посмотреть подробнее.
      </motion.p>   
        }
              <motion.button
              onClick={()=>{
              if(showDeck){
              handleDeckClick()
              }else{
              handleFinish()
              }
            }}
            onDoubleClick={handleDeckDoubleClick}
            className={`bg-[#1A0C41] font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 ease-in-out ml-4 ${!showDeck && !changes ? 'opacity-50 cursor-not-allowed' : ''}`}
            whileHover={!showDeck && !changes ? {} : { scale: 1.05 }}
            whileTap={!showDeck && !changes ? {} : { scale: 0.95 }}
            disabled={!showDeck && !changes}
          >
    
            <p className="text-white">{showDeck ? "Открыть" : "Завершить"}</p>
            
     
          </motion.button>
        </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
      >
        <SortableContext items={sortedCards.map((card) => card.id.toString())} strategy={rectSortingStrategy}>
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 select-none relative auto-rows-fr">
              {sortedCards.map((card, index) => (
                <SortableCard key={card.id} card={card} index={index} onClick={() => handleCardDetails(card.id.toString())} />
              ))}
            </div>
          </div>
        </SortableContext>  

        <DragOverlay>
          {dragActiveCard ? (
            <div style={{ width: "100%", maxWidth: "200px", background: "black" }}>
              <DragOverlayCard card={dragActiveCard} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {activeCard && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
          onClick={() => setActiveCard(null)}
        >
          <motion.div
            className="bg-[#1A0C41] rounded-lg shadow-lg max-w-md w-full p-6 select-none"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
    
            <div className="mb-6 flex justify-center">
              <div className="w-24 h-24 select-none">
                {sortedCards.find((c) => c.id.toString() === activeCard)?.icon && (
                  <Image src={sortedCards.find((c) => c.id.toString() === activeCard)?.icon || ""} alt="card"
                    aria-expanded="true"
        
                priority
                className="rounded-xl   scale-150"  
                    width={(240) * 1.2} 
                height={(240) * 1.2} />
                )}
              </div>
            </div>
                  <h3 className="text-xl  bg-gradient-to-r from-[#A97FFF] to-[#CF70AC] bg-clip-text text-transparent font-extrabold mb-4 text-center break-words overflow-hidden text-white">
              {sortedCards.find((c) => c.id.toString() === activeCard)?.title}
            </h3>
            <p className="mb-6 font-medium text-center text-white whitespace-pre-line">

  {sortedCards
    .find((c) => c.id.toString() === activeCard)
    ?.description.replace(/<\/?br\s*\/?>/gi, "\n")}
            </p>
          </motion.div> 
        </div>
      )}

      <div className="mt-8 flex justify-between items-center">
        <div className="text-sm">
          {visibleCards.length > 0 && (
            <span>
              Открыто {visibleCards.length} из {cards.length} карт
            </span>
          )}
        </div>
        </div>
    </div>
  )
}
