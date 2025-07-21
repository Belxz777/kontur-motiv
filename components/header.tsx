"use client"
import { useRouter } from "next/navigation";

export default function Header({ color,verstext }: { color: string,verstext?: string }) {
  const router = useRouter()
  return (
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center cursor-pointer">
          <h1 className="text-xl font-bold" onClick={() => router.push('/')}>
            <span className="text-gray-800">Контур</span>
            <span className={`${color} `}
            >Мотивация</span>
            {verstext && <div className="text-xs text-gray-500">{verstext}</div>}
          </h1>                
        </div>      
      </header>
  )
}