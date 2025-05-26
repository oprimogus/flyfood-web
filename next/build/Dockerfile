FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Copia .env.dev como .env.production se ARG MODE for "dev"
ARG MODE=prod
RUN if [ "$MODE" = "dev" ]; then cp .env.dev .env.production; fi

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]
