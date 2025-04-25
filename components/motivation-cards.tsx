"use client"

import { useState, useEffect } from "react"
import kol from '@/public/kol.png'
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

// Компонент для сортируемой карты
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
    transition,
    zIndex: isDragging ? 10 : 1,
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={`relative ${isDragging ? "z-10" : ""}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isDragging ? 0.8 : 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      {...attributes}
      {...listeners}
    >
      <div
        className={`cursor-grab active:cursor-grabbing transition-all rounded-lg overflow-hidden border   ${isDragging ? "shadow-xl" : "shadow"} bg-white`}
        onDoubleClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
      >
        <div className="bg-gray-800 text-white p-3 flex justify-between items-center">
          <h3 className="text-lg font-bold">{card.title}</h3>
          {/* {isSelected && (
            <div className="bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              ✓
            </div>
          )} */}
        </div>
        <div className="p-4 flex flex-col items-center">
          <div className="w-24  h-24 mb-3 flex items-center justify-center  rounded-2xl">
            {card.icon && (
              <Image src={card.icon || "/challenge.png"} alt={card.title} width={100} height={100} priority />
            )}{" "}
          </div>
          <p className="text-xs text-center">{card.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Компонент для отображения карты при перетаскивании
function DragOverlayCard({ card }: { card: MotivationCard }) {
  return (
    <div className="rounded-lg overflow-hidden border-2 border-blue-500 shadow-2xl bg-white opacity-90 w-[105%] scale-105">
      <div className="bg-gray-800 text-white p-3">
        <h3 className="text-sm font-medium">{card.title}</h3>
      </div>
      <div className="p-4 flex flex-col items-center">
        <div className="w-16 h-16 mb-3 flex items-center justify-center">
          {card.icon && <Image src={card.icon || "/placeholder.svg"} alt={card.title} width={64} height={64} />}
        </div>
        <p className="text-xs text-center">{card.description}</p>
      </div>
    </div>
  )
}

export default function MotivationCards({ cards }: { cards: MotivationCard[] }) {
  const [selectedCards, setSelectedCards] = useState<string[]>([])
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

  const handleCardClick = (cardId: string) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter((id) => id !== cardId))
    } else {
      setSelectedCards([...selectedCards, cardId])
    }
  }

  const handleCardDetails = (cardId: string) => {
    setActiveCard(cardId)
  }

  // const handleFinish = () => {
  //     setSelectedCards(sortedCards.map((card) => card.id))
  //     setCompleted(true)
  //     alert("Вы завершили сортировку!")
  // }
  function handleFinish() {
    setSelectedCards(sortedCards.map((card) => card.id))
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
    const card = sortedCards.find((c) => c.id === event.active.id.toString())
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
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
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
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
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
      <div className="mb-6">
   
        {
          showDeck ? 
          <motion.p
          className="text-gray-600 inline-block  select-none cursor-pointer"
          initial={{ backgroundColor: "transparent" }}
          animate={{
            backgroundColor: ["rgba(59, 130, 246, 0)", "rgba(59, 130, 246, 0.3)", "rgba(59, 130, 246, 0)"],
            color: ["#4b5563", "#2563eb", "#4b5563"],
          }}
          transition={{
            duration: 2,
            repeat: 1,
            repeatType: "reverse",
    
          }}
        >
   
             Нажмите на колоду, чтобы открыть карту. Двойной клик откроет все карты.

        </motion.p>           :
        <motion.p
        className="text-gray-600 inline-block select-none cursor-pointer"
        initial={{ backgroundColor: "transparent" }}
        animate={{
          backgroundColor: ["rgba(59, 130, 246, 0)", "rgba(59, 130, 246, 0.3)", "rgba(59, 130, 246, 0)"],
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
        </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
      >
        <SortableContext items={sortedCards.map((card) => card.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 select-none relative">
            {sortedCards.map((card, index) => (
              <SortableCard key={card.id} card={card} index={index} onClick={() => handleCardDetails(card.id)} />
            ))}

            {showDeck && (
              <div className="relative col-span-1 lg:col-start-6">
                <motion.div
                  className="cursor-pointer transition-all rounded-lg overflow-hidden border shadow bg-gray-800 h-[200px] absolute top-0 right-0 w-full"
                  onClick={handleDeckClick}
                  onDoubleClick={handleDeckDoubleClick}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >

                  <div className="p-4 flex flex-col items-center  justify-center h-full">
                  <h1 className="text-lg font-bold text-center text-white">Колода карт</h1>

                  <div className="w-24  h-24 mb-3 flex items-center justify-center  rounded-2xl">
      
              <Image  src={kol} width={100} height={100} priority alt={""} />
            
          </div>
                    <p className="text-xs text-center text-white">
                      {visibleCards.length === 0
                        ? "Нажмите, чтобы открыть карту"
                        : `Открыто ${visibleCards.length} из ${cards.length} карт`}
                    </p>
                  </div>
                </motion.div>              </div>
            )}
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
            className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 select-none"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4 text-center">
              {sortedCards.find((c) => c.id === activeCard)?.title}
            </h3>
            <div className="mb-6 flex justify-center">
              <div className="w-24 h-24 select-none">
                {sortedCards.find((c) => c.id === activeCard)?.icon && (
                  <Image src={sortedCards.find((c) => c.id === activeCard)?.icon || ""} alt="" width={96} height={96} />
                )}
              </div>
            </div>
            <p className="mb-6 font-medium text-center">{sortedCards.find((c) => c.id === activeCard)?.description}</p>
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
        <button
          onClick={handleFinish}
          disabled={visibleCards.length === 0}
          className={`px-6 py-2 rounded-md transition-colors ${
            visibleCards.length > 0
              ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
              : "bg-gray-200 text-gray-100 cursor-not-allowed"
          }`}
        >
          Завершить
        </button>
      </div>
    </div>
  )
}
