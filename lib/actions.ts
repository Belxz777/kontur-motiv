"use server"

import { v4 as uuidv4 } from "uuid"
import fs from "fs/promises"
import path from "path"
import type { MotivationCard } from "./types"
import { revalidatePath } from "next/cache"
import { getCards } from "./cards"

const dataDirectory = path.join(process.cwd(), "data")
const cardsFile = path.join(dataDirectory, "cards.json")

// Ensure the data directory exists
async function ensureDataDirectory() {
  try {
    await fs.access(dataDirectory)
  } catch (error) {
    await fs.mkdir(dataDirectory, { recursive: true })
  }
}

// Add a new card
export async function addCard(cardData: Omit<MotivationCard, "id">): Promise<MotivationCard> {
  await ensureDataDirectory()

  const cards = await getCards()

  const newCard: MotivationCard = {
    id: uuidv4(),
    ...cardData,
  }

  const updatedCards = [...cards, newCard]
  await fs.writeFile(cardsFile, JSON.stringify(updatedCards, null, 2), "utf8")

  revalidatePath("/")
  revalidatePath("/admin")

  return newCard
}

// Update an existing card
export async function updateCard(updatedCard: MotivationCard): Promise<MotivationCard> {
  await ensureDataDirectory()

  const cards = await getCards()
  const updatedCards = cards.map((card) => (card.id === updatedCard.id ? updatedCard : card))

  await fs.writeFile(cardsFile, JSON.stringify(updatedCards, null, 2), "utf8")

  revalidatePath("/")
  revalidatePath("/admin")

  return updatedCard
}

// Delete a card
export async function deleteCard(id: string): Promise<{ success: boolean }> {
  await ensureDataDirectory()

  const cards = await getCards()
  const updatedCards = cards.filter((card) => card.id !== id)

  await fs.writeFile(cardsFile, JSON.stringify(updatedCards, null, 2), "utf8")

  revalidatePath("/")
  revalidatePath("/admin")

  return { success: true }
}
