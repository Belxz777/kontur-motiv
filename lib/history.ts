import fs from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import { getCard } from "./cards"
import type { HistoryEntry, MotivationCard } from "./types"

const dataDirectory = path.join(process.cwd(), "data")
const historyFile = path.join(dataDirectory, "history.json")

// Ensure the data directory exists
async function ensureDataDirectory() {
  try {
    await fs.access(dataDirectory)
  } catch (error) {
    await fs.mkdir(dataDirectory, { recursive: true })
  }
}

// Get all history entries
export async function getHistory(): Promise<HistoryEntry[]> {
  await ensureDataDirectory()

  try {
    const fileContent = await fs.readFile(historyFile, "utf8")
    return JSON.parse(fileContent)
  } catch (error) {
    // If file doesn't exist or is invalid, return empty array
    await fs.writeFile(historyFile, JSON.stringify([], null, 2), "utf8")
    return []
  }
}

// Add a new history entry
export async function addHistoryEntry(cardIds: string[]): Promise<HistoryEntry> {
  const history = await getHistory()

  // Get full card data for each selected card
  const selectedCards: MotivationCard[] = []
  for (const id of cardIds) {
    const card = await getCard(id)
    if (card) {
      selectedCards.push(card)
    }
  }

  const newEntry: HistoryEntry = {
    id: uuidv4(),
    date: new Date().toISOString(),
    selectedCards,
  }

  const updatedHistory = [newEntry, ...history]
  await fs.writeFile(historyFile, JSON.stringify(updatedHistory, null, 2), "utf8")

  return newEntry
}
