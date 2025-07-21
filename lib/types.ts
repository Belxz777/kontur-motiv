export interface MotivationCard {
  id: number | string
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
export const cards = [
    {
      id: 1,
      title: "Признание успехов",
      description: "Важно официальное признание ваших достижений, похвала  со стороны коллег и руководства.</br> </br> Желание быть лучшим ",
      icon: "rsp6.png",
      color: "#fffff",
      boldness: 700,
      width: 125,
      height: 125,
      background: "#fffff",
      isGradient: false,
      secondColor: "#fffff"
    },
    {
      id: 2,
      title: "Отношения с руководителем",
      description: "Важна личность руководителя.Насколько мои качества сходятся с его. Важны выстроенные отношения с непосредственным/вышестоящим руководителем, обратная связь, поддержка, общение с ним.",
      icon: "rsp7.png",
      color: "#fffff",
      boldness: 700,
      width: 125,
      height: 125,
      background: "#fffff",
      isGradient: false,
      secondColor: "#fffff"
    },
    {
      id: 3,
      title: "Содержание работы ",
      description: "Важен горизонтальный рост, наращивание экспертизы, работа над улучшением процессов/продукта.",
      icon: "rsp8.png",
      color: "#fffff",
      width: 125,
      height: 125,
      boldness: 700,
      background: "#fffff",
      isGradient: false,
      secondColor: "#fffff"
    },
    {
      id: 4,
      title: "Продвижение и карьера",
      description: "Важен горизонтальный рост, желание быть руководителем, влиять на другие, расти по вертикальной карьерной лестнице.",
      icon: "rsp5.png",
      from: "#4B0082",
      to: "#0000FF",
      boldness: 0,
      width: 150,
      height: 150,
      background: "#1A0C41",
      isGradient: true,
      secondColor: "#FFFFFF"
    },
    {
      id: 5,
      title: "Овтественность , самостоятельность , полномочия",
      description: "Важна свобода в принятии решений , выполнении задач , снижении контроля. Желание получить больший уровень полномочий.",
      icon: "rsp1.png",
      color: "#fffff",
      boldness: 700,
      width: 150,
      height: 150,
      background: "#fffff",
      isGradient: false,
      secondColor: "#fffff"
    },
    {
      id: 6,
      title: "Достижения",
      description: "Ориентация на достижение собственных целей, результат важнее процесса. Важна собственная оценка результатов(достиг/не достиг), внешняя оценка менее важна.",
      icon: "rsp2.png",
      color: "#fffff",
      width: 175,
      height: 175,
      boldness: 700,
      background: "#fffff",
      isGradient: false,
      secondColor: "#fffff"
    },
    {
      id: 7,
      title: "Сотрудничество",
      description: "Важна совместная деятельность в принятии решений. Важно наличие команды, обмен опытом с коллегами, неформальное общение.",
      icon: "rsp3.png",
      color: "#fffff",
      width: 150,
      height: 150,
      boldness: 700,
      background: "#F4A460",
      isGradient: false,
      secondColor: "#fffff"
    },
    {
      id: 8,
      title: "Финансовый мотиватор",
      description: "Ваша позиция в компании подчеркивает ваш профессионализм, вы заметны среди коллег.",
      icon: "rsp4.png",
      color: "#fffff",
      boldness: 700,
      width: 150,
      height: 150,
      background: "#fffff",
      isGradient: false,
      secondColor: "#fffff"
    },
]