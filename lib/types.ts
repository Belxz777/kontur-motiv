export interface MotivationCard {
  id: string
  title: string
  description: string
  icon: string
}

export interface HistoryEntry {
  id: string
  date: string
  selectedCards: MotivationCard[]
}
