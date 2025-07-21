FROM oven/bun:1 AS base
WORKDIR /app
# Install dependencies only when needed
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
# Rebuild the source code only when needed
RUN bun --bun run build
# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

EXPOSE 3300

ENV PORT=3300
ENV HOSTNAME="0.0.0.0"

CMD ["bun" , "run", "start"]
