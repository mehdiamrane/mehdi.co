# mehdi.co

Personal site & AI usage dashboard. Two dependencies, zero build steps.

```
bun --watch server.tsx
```

That's it. Edit any file, refresh, done.

## Stack

| Layer | Tech |
|-------|------|
| Runtime | [Bun](https://bun.sh) |
| Server | [Hono](https://hono.dev) |
| Templating | Hono JSX (SSR) |
| Styling | Tailwind CSS (CDN) |
| Deployment | Cloudflare Tunnel → VPS |

**Why no build step?** Because this is a personal site, not a SaaS. Bun runs TypeScript and JSX natively. Hono renders pages server-side. Tailwind CDN scans the DOM at runtime. There is nothing to compile.

## How it works

This is **not a static site**. Every request is server-side rendered (SSR):

1. Request hits Hono → route matched
2. JSX component renders to an HTML string on the server
3. Full HTML page returned to the browser

No build step, no pre-generated HTML files, no hydration. The JSX is evaluated at request time.

### SSR vs Astro vs Next.js

| | Astro SSG | Astro hybrid | **This setup** | Next.js |
|---|---|---|---|---|
| Build step | Required | Required | **None** | Required |
| Static pages | Pre-built HTML | `prerender: true` | SSR on demand | SSG/ISR |
| Dynamic pages | N/A | SSR | **SSR** | SSR + RSC |
| API routes | Endpoints | Endpoints | **Same process** | Route handlers |
| Client JS | 0 KB default | 0 KB default | Vanilla `<script>` | React runtime |
| Dependencies | ~500 | ~500 | **2** | ~800+ |

### Can it do webapp stuff like Next.js?

Yes — but differently. For interactivity, use:
- Vanilla JS in `<script>` tags (what we do now — theme toggle, mobile menu, dashboard fetch)
- `hono/jsx/dom` — a 2KB reactive UI layer (like a mini-React) for complex interactive pages, no extra dependency needed

And because it's Bun:
- WebSocket support is built-in (`Bun.serve` WebSocket)
- SQLite via `bun:sqlite` (no ORM needed)
- Postgres via `Bun.sql`
- File system, streams, crypto — all native

## Project structure

```
├── server.tsx              # Hono app — all routes, API, blog rendering
├── public/                 # Static assets (images, favicon, SVGs)
├── usage/
│   ├── collector.ts        # Cron script — fetches AI service usage
│   ├── usage.json          # Output data (consumed by /api/usage)
│   └── .env                # API keys (not committed)
├── src/
│   ├── data/
│   │   └── content.ts      # i18n strings, experience, tech stack
│   ├── components/
│   │   ├── Base.tsx        # HTML shell, meta tags, header, footer
│   │   ├── HomeContent.tsx # Hero, experience, education, tech stack
│   │   ├── UsageGauges.tsx # AI usage dashboard (client-side fetch)
│   │   ├── ThemeToggle.tsx # Dark/light toggle
│   │   ├── LanguageSwitcher.tsx
│   │   └── Icons.tsx       # Phosphor SVG icons (inline)
│   └── content/
│       └── blog/           # Markdown blog posts
└── package.json            # Two deps: hono, marked
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage (EN) |
| `/fr/` | Homepage (FR) |
| `/usage` | AI services dashboard |
| `/blog` | Blog list |
| `/blog/:slug` | Blog post |
| `/cv` | Google Drive redirect |
| `/api/usage` | Usage data (JSON) |
| `/api/refresh` | Trigger collector refresh |
| `/health` | Health check |

## Usage dashboard

The `/usage` page displays real-time consumption across AI services: Claude, OpenAI Codex, Cursor, Z.AI, OpenCode Go, DeepSeek, OpenRouter, Kiro.

Data is collected every 15 minutes by a Hermes cron job running `usage/collector.ts`. The collector fetches from each service's API and writes to `usage/usage.json`. The server reads this file when `/api/usage` is called.

### Adding a new service

1. Add fetch logic in `usage/collector.ts`
2. Add rendering logic in `src/components/UsageGauges.tsx`
3. To display, add corresponding env vars in `usage/.env`

## Local development

```bash
# Install (two deps)
bun install

# Start dev server with hot reload
bun --watch server.tsx
# → http://localhost:4321

# Run the usage collector manually
cd usage && source .env && bun run collector.ts
```

## Deployment

Runs on a VPS behind Cloudflare Tunnel:

```bash
# On the VPS
git clone https://github.com/mehdiamrane/mehdi.co -b bun
cd mehdi.co
bun install
bun --watch server.tsx &

# Expose via Cloudflare Tunnel
cloudflared tunnel --url http://localhost:4321
```

For a custom domain (`mehdi.co`), configure a named tunnel in Cloudflare Zero Trust and route DNS.
