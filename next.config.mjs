/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Отключение проверок для ускорения сборки
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // 2. Оптимизация изображений
  images: {
    unoptimized: true, // Если используете внешний CDN
    domains: [],       // Пустой массив для ускорения
  },

  // 3. Настройки для production
  productionBrowserSourceMaps: false, // Отключаем sourcemaps
  
  // 4. Экспериментальные оптимизации
  experimental: {
    optimizePackageImports: [ // Tree-shaking для указанных пакетов
      'lodash',
      'react-icons',
    ],
    
    // Новый формат для Turbopack (если используется)
    turbo: {
      rules: {
        '*.md': ['markdown-loader'], // Пример для markdown-файлов
      }
    }
  }
}

export default nextConfig;