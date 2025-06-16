export interface MotivationCard {
  id: number
  title: string
  description: string
  icon: any
  color?: string,
  from?: string,
  to?: string,
  width?: number,
  height?: number
  boldness: number
  background: string
  isGradient: boolean
  secondColor: string
  
}

export interface HistoryEntry {
  id: string
  date: string
  selectedCards: MotivationCard[]
}
