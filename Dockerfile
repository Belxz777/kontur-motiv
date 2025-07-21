# Используем официальный Node.js образ на Alpine (легковесный)
FROM node:22-alpine AS base

# Устанавливаем pnpm глобально
RUN corepack enable && corepack prepare pnpm@latest --activate

# ===== Этап сборки (builder) =====
FROM base AS builder

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json pnpm-lock.yaml* ./

# Устанавливаем зависимости (включая devDependencies)
RUN pnpm install --frozen-lockfile

# Копируем исходный код
COPY . .

# Собираем приложение
RUN pnpm run build

# ===== Этап запуска (production) =====
FROM base AS production

WORKDIR /app

# Копируем только production-зависимости
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Устанавливаем только production-зависимости
RUN pnpm install --prod --frozen-lockfile


EXPOSE 3300

# Запускаем сервер
CMD ["node", "server.js"]