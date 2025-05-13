'use client'
import { useState } from 'react'
import Image from 'next/image'
export default function DocsPage() {
    const [showDetails, setshowDetails] = useState<
    | "basic"
    | "advanced"
    | "help"
  >('basic')
return (
<div className="min-h-screen bg-blue-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-6">
 Документация
          </h1>
          <div className="prose prose-blue max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
Основыне моменты
              </h2>
              <p className="text-gray-600">
Здесь описаны основные функциональные особенности и детали работы приложения              </p>
            </section>
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
               Разделы
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  onClick={() => setshowDetails('basic')} 
                  className="border border-blue-100 rounded-lg p-6 hover:bg-blue-50 transition cursor-pointer"
                >
                  <h3 className="text-xl font-medium text-blue-600 mb-2">
                    Основные понятия
                  </h3>
                  <p className="text-gray-600">
                    Изучение базы
                  </p>
                </div>
                 <div
      onClick={() => setshowDetails('advanced')} 
className="border border-blue-100 rounded-lg p-6 hover:bg-blue-50 transition">
                  <h3 className="text-xl font-medium text-blue-600 mb-2">
                    Дополнительная инфо
                  </h3>
                  <p className="text-gray-600">

                  </p>
                </div>
              </div>
            </section>
            {showDetails =="basic" ? (
                  <div className="border border-blue-100 rounded-lg p-6 mt-4">
                    <h4 className="text-lg font-medium text-blue-600 mb-2">
Файлы                    </h4>
      <div className=" bg-slate-300  rounded-lg mx-2 my-2 px-2 py-2">
      Локальные картинки находятся в папке public  <br/>
      также можно посмотреть содержимое public по роуту
        /api/getFiles
        </div>
        <h4 className="text-lg font-medium text-blue-600 mb-2">
                 Хранение карточек
                    </h4>
                    <div className=" bg-slate-300 flex flex-col mx-2 my-2 px-2 py-2 rounded-lg">
      Локальное хранилище заполняется при первом начале игры <br/>
      Заполение произходит дефолтными карточками  <br/>
      Скачать можно кнопкой снизу 
      <button  
                      onClick={async () => {
                        try {
                          const response = await fetch('api/data/')
                          const data = await response.json()
                          const dataStr = JSON.stringify(data, null, 2)
                          const blob = new Blob([dataStr], { type: 'application/json' })
                          const url = URL.createObjectURL(blob)
                          const link = document.createElement('a')
                          link.href = url
                          link.download = 'cards.json'
                          document.body.appendChild(link)
                          link.click()
                          document.body.removeChild(link)
                          URL.revokeObjectURL(url)
                        } catch (error) {
                          console.error('Error downloading file:', error)
                        }
                      }}            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors   w-1/4 mx-5 my-4"          >
            Скачать JSON файл с дефолтными карточками
          </button>
        </div>
       
        <div className=" bg-slate-300  rounded-lg mx-2 my-2 px-2 py-2">
        <h4 className="text-lg font-medium text-blue-600 mb-2">
Рекомендации
</h4>
<ul>
    <li>
        Используйте интернет картинки(это просто сейчас есть бесплатные s3 хранилища)
    </li>
    <li>
        При возникшей ошибке писать <strong>@telegram:belxz999</strong> <br/>
        Отправляйте скриншот по возможности
    </li>
</ul>
</div>
<h1>Рекомендую загружать картинки с абсолютным url</h1>
<h1>ПРи загрузке конфига карточек своего указывате любой уникальный id можно не uuid 4 формата (Константин)</h1>

{/* <pre className=" text-red-700 font-extrabold  text-3xl">ФУНКЦИЯ ЗАГРУЗКИ НАХОДИТСЯ В РАБОТЕ! </pre> */}
                
                  </div>
                )
            :
            <div className="border border-blue-100 rounded-lg p-6 mt-4">
            <h4 className="text-lg font-medium text-blue-600 mb-2">
              
            </h4>
        <Image src="https://avatars.mds.yandex.net/i?id=f5a77b549cad33dfeecae8a97c529275_l-5466682-images-thumbs&n=13"
        width={200} height={300} alt="Cat" />
          </div>
        }               
          </div>
        </div>
      </div>
    </div>
)
}

