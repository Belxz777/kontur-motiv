import fs from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import type { MotivationCard } from "./types"
import expert from '@/public/expert.png'
import team from '@/public/team.png'
import leader from '@/public/lidership.png'
import creative from '@/public/creativity.png'
import lifestyle from '@/public/lifestyle.png'
import challenge from '@/public/vis.png'
import feedback from '@/public/feedback.png'
import payment from '@/public/payment.png'
import talk from '@/public/talk.png'
import status from '@/public/status.png'
import contribution from '@/public/contribution.png'

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
      "id": "1c0d47bd-c291-469f-a0f1-2d33ea6fbd75",
      "title": "Экспертность",
      "description": "Помогать принимать важные решения, задавать стандарты в команде.",
      "icon": expert
    },
    {
      "id": "674b1f53-5519-4c87-9c17-8cb112923015",
      "title": "Творчество",
      "description": "Вам хочется придумывать нестандартные решения, создавать что-то новое и необычное.",
      "icon": creative
    },
    {
      "id": "f5651524-b642-48f2-830a-6f33342a4f7b",
      "title": "Образ жизни",
      "description": "Вы цените комфортный ритм жизни, гибкость и баланс между делами и личным временем.",
      "icon":lifestyle
    },
    {
      "id": "4725232a-ab39-4fd9-a06f-056ce4a53a1f",
      "title": "Заработок",
      "description": "Ваш труд должен справедливо вознаграждаться, для вас важна возможность для роста дохода.",
      "icon":payment
    },
    {
      "id": "e32e41e4-be7a-4595-a980-94df91078a86",
      "title": "Вклад",
      "description": "Вы хотите, чтобы ваша работа имела смысл и чувствуете, что ваша работа важна.",
      "icon": contribution
    },
    {
      "id": "34f22e62-6e5d-4b53-9c2b-42141b917886",
      "title": "Команда",
      "description": "Вам нравится работать с единомышленниками, общаться, чувствовать, что вас поддержат.",
      "icon": team
    },
    {
      "id": "2d85fc19-764f-4c1b-982b-49fbfc1afbd2",
      "title": "Статус",
      "description": "Ваша позиция в компании подчеркивает ваш профессионализм, вы заметны среди коллег.",
      "icon": status
    },
    {
      "id": "db0a0c0c-c961-4d7d-a332-f1466b853ac2",
      "title": "Общение",
      "description": "Вы цените возможность живого общения, влияние на других и помощь людям.",
      "icon": talk
    },
    {
      "id": "754d851a-c4be-4482-996d-a70b4fac083e",
      "title": "Вызов",
      "description": "Вам интересны сложные задачи, которые заставляют вас расти и учиться новому.",
      "icon": challenge
    },
    {
      "id": "09fe1efc-4615-4fc7-bfa2-789c92eaad07",
      "title": "Фидбэк",
      "description": "Вы цените возможность получения обратной связи и работы с руководством.",
      "icon": feedback
    },
    {
      "id": "fb2c57fe-4d0d-406f-b1b2-1d90203210da",
      "title": "Лидерство",
      "description": "Вы хотите вести за собой команду, принимать решения, влиять на других на равных.",
      "icon": leader
    }  ]
}