"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  DragOverlay,
  DragStartEvent,
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
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
      >
        <div className="bg-gray-800 text-white p-3 flex justify-between items-center">
          <h3 className="text-sm font-medium">{card.title}</h3>
          {/* {isSelected && (
            <div className="bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              ✓
            </div>
          )} */}
        </div>
        <div className="p-4 flex flex-col items-center">
          <div className="w-16 h-16 mb-3 flex items-center justify-center">
            {card.icon && <Image src={card.icon || "/placeholder.svg"} alt={card.title} width={64} height={64} />}
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
    const timer = setTimeout(() => {
      setSortedCards(cards)
      setIsAnimating(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [cards])

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
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative w-64 h-80"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 180 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-white rounded-lg shadow-lg border-2 border-gray-300 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="w-24 h-24 mx-auto mb-4">
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
                  </div>
                  <h3 className="text-xl font-bold">Колода мотивации</h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-6">
        <p className="text-gray-600">
          Перетаскивайте карты, чтобы изменить их порядок. Нажмите на карту, чтобы выбрать её для результатов.
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
      >
        <SortableContext items={sortedCards.map((card) => card.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {sortedCards.map((card, index) => (
              <SortableCard
                key={card.id}
                card={card}
                index={index}
                // isSelected={selectedCards.includes(card.id)}
                onClick={() => handleCardClick(card.id)}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {dragActiveCard ? (
            <div style={{ width: "100%", maxWidth: "200px",background:"black" }}>
              <DragOverlayCard card={dragActiveCard} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {activeCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20" onClick={() => setActiveCard(null)}>
          <motion.div
            className="bg-white rounded-lg shadow-lg max-w-md w-full p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">{sortedCards.find((c) => c.id === activeCard)?.title}</h3>
            <div className="mb-6 flex justify-center">
              <div className="w-24 h-24">
                {sortedCards.find((c) => c.id === activeCard)?.icon && (
                  <Image src={sortedCards.find((c) => c.id === activeCard)?.icon || ""} alt="" width={96} height={96} />
                )}
              </div>
            </div>
            <p className="mb-6">{sortedCards.find((c) => c.id === activeCard)?.description}</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setActiveCard(null)}
                className="px-4 py-2 border border-gray-300 hover:bg-gray-100 rounded-md transition-colors"
              >
                Закрыть
              </button>
              <button
                onClick={() => {
                  handleCardClick(activeCard)
                  setActiveCard(null)
                }}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
              >
                {selectedCards.includes(activeCard) ? "Отменить выбор" : "Выбрать"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="mt-8 flex justify-between items-center">
        <div className="text-sm">
     
        </div>
        <button
          onClick={handleFinish}
          // disabled={changes}
          className={`px-6 py-2 rounded-md transition-colors ${  changes 
              ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          Завершить
        </button>
      </div>
    </div>
  )
}