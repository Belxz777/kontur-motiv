import fs from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import type { MotivationCard } from "./types"

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

// Get all cards
export async function getCards(): Promise<MotivationCard[]> {
  await ensureDataDirectory()


  try {
    const fileContent = await fs.readFile(cardsFile, "utf8")
    return JSON.parse(fileContent)
  } catch (error) {
    // If file doesn't exist or is invalid, return default cards
    const defaultCards = getDefaultCards()
    await fs.writeFile(cardsFile, JSON.stringify(defaultCards, null, 2), "utf8")
    return defaultCards
  }
}

// Get a card by ID
export async function getCard(id: string): Promise<MotivationCard | null> {
  const cards = await getCards()
  return cards.find((card) => card.id === id) || null
}

// Default cards based on the provided UI
function getDefaultCards(): MotivationCard[] {
  return [
    {
      id: uuidv4(),
      title: "Экспертность",
      description: "Помогать принимать важные решения, задавать стандарты в команде.",
      icon: "/placeholder.svg?height=64&width=64",
    },
    {
      id: uuidv4(),
      title: "Творчество",
      description: "Вам хочется придумывать нестандартные решения, создавать что-то новое и необычное.",
      icon: "/placeholder.svg?height=64&width=64",
    },
    {
      id: uuidv4(),
      title: "Образ жизни",
      description: "Вы цените комфортный ритм жизни, гибкость и баланс между делами и личным временем.",
      icon: "/placeholder.svg?height=64&width=64",
    },
    {
      id: uuidv4(),
      title: "Заработок",
      description: "Ваш труд должен справедливо вознаграждаться, для вас важна возможность для роста дохода.",
      icon: "/placeholder.svg?height=64&width=64",
    },
    {
      id: uuidv4(),
      title: "Вклад",
      description: "Вы хотите, чтобы ваша работа имела смысл и чувствуете, что ваша работа важна.",
      icon: "/placeholder.svg?height=64&width=64",
    },
    {
      id: uuidv4(),
      title: "Команда",
      description: "Вам нравится работать с единомышленниками, общаться, чувствовать, что вас поддержат.",
      icon: "/placeholder.svg?height=64&width=64",
    },
    {
      id: uuidv4(),
      title: "Статус",
      description: "Ваша позиция в компании подчеркивает ваш профессионализм, вы заметны среди коллег.",
      icon: "/placeholder.svg?height=64&width=64",
    },
    {
      id: uuidv4(),
      title: "Общение",
      description: "Вы цените возможность живого общения, влияние на других и помощь людям.",
      icon: "/placeholder.svg?height=64&width=64",
    },
    {
      id: uuidv4(),
      title: "Вызов",
      description: "Вам интересны сложные задачи, которые заставляют вас расти и учиться новому.",
      icon: "/placeholder.svg?height=64&width=64",
    },
    {
      id: uuidv4(),
      title: "Фидбэк",
      description: "Вы цените возможность получения обратной связи и работы с руководством.",
      icon: "/placeholder.svg?height=64&width=64",
    },
    {
      id: uuidv4(),
      title: "Лидерство",
      description: "Вы хотите вести за собой команду, принимать решения, влиять на других на равных.",
      icon: "/placeholder.svg?height=64&width=64",
    },
  ]
}