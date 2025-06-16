"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header({ color,verstext }: { color: string,verstext?: string }) {
  const router = useRouter()
  return (
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center cursor-pointer">
          <h1 className="text-xl font-bold" 
onClick={
  () => {
    router.push('/')
  }
}
        >
            <span className="text-gray-800">Контур</span>
            <span className={`${color} `}
            >Мотивация</span>
            {verstext && <div className="text-xs text-gray-500">{verstext}</div>}
          </h1>
        
          
                    <select className="text-sm border border-gray-300 rounded-md px-2 py-1"
      value={'/'}
      onChange={
        (e) => {
          router.push(`/${e.target.value}`)
        }
      }
                    >
                      <option value="/">Выберите версию</option>
                      <option value="v1">Версия рейнбоу (v1)</option>
                      <option value="v2">Версия `ничего лишнего `(v2)</option>
                      <option value="v3">Версия `ненавижу png`(v3)</option>
                      <option value="admin">Своя игра</option>
                      <option value="docs">Документация</option>
                    </select>
                        
        </div>      </header>
  )
}