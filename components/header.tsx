import Link from "next/link";

export default function Header() {
  return (
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center cursor-pointer">
          <h1 className="text-xl font-bold" 

        >
            <span className="text-gray-800">Контур</span>
            <span className="text-blue-500"
            >Мотивация</span>
          </h1>
          <nav className="flex space-x-4">
            <Link href="/" className="px-3 py-2 text-gray-700 font-medium">
              Игра
            </Link>
            <Link href="/admin" className="px-3 py-2 text-gray-500 hover:text-gray-700">
             Своя игра
            </Link>
          </nav>
        </div>
      </header>
  )
}