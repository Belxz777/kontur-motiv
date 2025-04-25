export interface MotivationCard {
  id: string
  title: string
  description: string
  icon: any
}

export interface HistoryEntry {
  id: string
  date: string
  selectedCards: MotivationCard[]
}
