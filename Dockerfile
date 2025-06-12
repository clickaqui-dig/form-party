FROM node:22 AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:22 AS builder
WORKDIR /app
ENV NODE_ENV=production
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

FROM node:22 AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env.prod .env

EXPOSE 3000
CMD ["node", "server.js"]
