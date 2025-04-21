"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { v4 as uuidv4 } from "uuid"
import { addCard, updateCard, deleteCard } from "@/lib/actions"
import type { MotivationCard } from "@/lib/types"

export default function CardManager({ initialCards }: { initialCards: MotivationCard[] }) {
  const [cardscur, setcardscur] = useState(initialCards)
  useEffect(() => {
    const cards = JSON.parse(localStorage.getItem("selectedCards") || "[]");

    if (cards.length === 0) {

      localStorage.setItem("selectedCards", JSON.stringify(cards));
    } else {
      setcardscur(cards)
    }
    }, []);

  const [cards, setCards] = useState<MotivationCard[]>(initialCards)
  const [custom, setCustom] = useState(false)



  if (!cards) {
    return <div>Загрузка...</div>
  }const [newCard, setNewCard] = useState<Partial<MotivationCard>>({
    title: "",
    description: "",
    icon: "https://masterpiecer-images.s3.yandex.net/5fd531dca6427c7:upscaled",
  })
  const [editingCard, setEditingCard] = useState<MotivationCard | null>(null)

  const handleAddCard = async () => {
    if (!newCard.title || !newCard.description) {
      return
    }

    const card = await addCard({
      title: newCard.title,
      description: newCard.description,
      icon: newCard.icon || "https://masterpiecer-images.s3.yandex.net/5fd531dca6427c7:upscaled",
    })
    const existingCards = JSON.parse(localStorage.getItem("selectedCards") || "[]")
    existingCards.push(card)
    localStorage.setItem("selectedCards", JSON.stringify(existingCards))

    setCards([...cards, card])
    setNewCard({
    title: "",
    description: "",
      icon: "https://masterpiecer-images.s3.yandex.net/5fd531dca6427c7:upscaled",
    })
  }

  const handleUpdateCard = async () => {
    if (!editingCard) return

    const updatedCard = await updateCard(editingCard)
    const existingCards = JSON.parse(localStorage.getItem("selectedCards") || "[]")
    const updatedCards = existingCards.map((card: { id: string }) => (card.id === updatedCard.id ? updatedCard : card))
    localStorage.setItem("selectedCards", JSON.stringify(updatedCards))
    setCards(cards.map((card) => (card.id === updatedCard.id ? updatedCard : card)))
    setEditingCard(null)  }

  const handleDeleteCard = async (id: string) => {
    await deleteCard(id)
    setCards(cards.filter((card) => card.id !== id))
    localStorage.setItem("selectedCards", JSON.stringify(cards.filter((card) => card.id !== id)))   
    window.location.reload()
  }

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Добавить новую карту</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Название</label>
            <input
              type="text"
              value={newCard.title || ""}
              onChange={(e) =>
                setNewCard({
                  ...newCard,
                  title: e.target.value
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Описание</label>
            <textarea
              value={newCard.description || ""}
              onChange={(e) =>
                setNewCard(
                 { ...newCard,
                  description: e.target.value}
              
                 )}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">URL иконки</label>
            <input
              type="text"
              value={newCard.icon || ""}
              onChange={(e) => setNewCard({ ...newCard, icon: e.target.value })}
              placeholder="/icons/example.svg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mt-6">
            <button
              onClick={handleAddCard}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              Добавить карту
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Существующие карты</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cardscur.map((card) => (
            <div key={card.id} className="overflow-hidden border rounded-lg shadow">
              <div className="bg-gray-800 text-white p-3">
                <h4 className="text-sm font-medium">{card.title}</h4>
              </div>
              <div className="p-4">
                <div className="flex justify-center mb-3">
                  {card.icon && (
                    <Image src={card.icon || "/placeholder.svg"} alt={card.title} width={64} height={64} className="mx-auto" />
                  )}
                </div>
                <p className="text-sm mb-4">{card.description}</p>
                <div className="flex space-x-2">
                  <button
                    className="px-3 py-1 border border-gray-300 hover:bg-gray-100 rounded text-sm"
                    onClick={() => setEditingCard(card)}
                  >
                    Изменить
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                    onClick={() => handleDeleteCard(card.id)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
            <h3 className="text-xl font-bold mb-4">Редактировать карту</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Название</label>
                <input
                  type="text"
                  value={editingCard.title}
                  onChange={(e) =>
                    setEditingCard({
                      ...editingCard,
                      description: e.target.value
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Описание</label>
                <textarea
                  value={editingCard.description}
                  onChange={(e) =>
                    setEditingCard({
                      ...editingCard,
                      description: e.target.value
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL иконки</label>
                <input
                  type="text"
                  value={editingCard.icon}
                  onChange={(e) => setEditingCard({ ...editingCard, icon: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setEditingCard(null)}
                  className="px-4 py-2 border border-gray-300 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={handleUpdateCard}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>

        </div>
      )}
      <div className= "mt-4 px-4 py-4">
          <button  
                      onClick={() => {
                        const selectedCards = JSON.parse(localStorage.getItem('selectedCards') || '[]')
                        const dataStr = JSON.stringify(selectedCards, null, 2)
                        const blob = new Blob([dataStr], { type: 'application/json' })
                        const url = URL.createObjectURL(blob)
                        const link = document.createElement('a')
                        link.href = url
                        link.download = 'selected-cards.json'
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                        URL.revokeObjectURL(url)
                      }}            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
          >
            Скачать JSON файл с карточками
          </button>
          <button
          onClick={() => {
              const fileInput = document.createElement('input')
              fileInput.type = 'file'
              fileInput.accept = '.json'
              fileInput.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onload = (e) => {
                    const jsonData = JSON.parse(e.target?.result as string)
                    localStorage.setItem('selectedCards', JSON.stringify(jsonData))
                    setCustom(true)
                    alert('Конфиг успешно загружен!')
                    console.log(jsonData)
                    window.location.reload()
                  }
                  reader.readAsText(file)
                }
              }
              fileInput.click()
            }}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors ml-2"
          >
            Загрузить мой конфиг карточек
          </button>
          </div>
    </div>
  )
}
