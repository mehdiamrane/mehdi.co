FROM node:18-alpine AS base

# --- Dependencies ---
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# --- Builder ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV HUSKY=0

ARG GITHUB_PERSONAL_ACCESS_TOKEN
ARG SPOTIFY_APP_CLIENT_ID
ARG SPOTIFY_APP_CLIENT_SECRET
ARG SPOTIFY_APP_USER_REFRESH_TOKEN

ENV GITHUB_PERSONAL_ACCESS_TOKEN=$GITHUB_PERSONAL_ACCESS_TOKEN
ENV SPOTIFY_APP_CLIENT_ID=$SPOTIFY_APP_CLIENT_ID
ENV SPOTIFY_APP_CLIENT_SECRET=$SPOTIFY_APP_CLIENT_SECRET
ENV SPOTIFY_APP_USER_REFRESH_TOKEN=$SPOTIFY_APP_USER_REFRESH_TOKEN

RUN npm run build

# --- Runner ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
