---
title: Building this site
date: 2026-07-07
description: From Astro to Bun + Hono — why I dropped the build step and went full SSR with two dependencies.
lang: en
---

I rebuilt this site twice in two weeks. The first version was Astro + Tailwind. It worked. But every change meant waiting for Astro's dev server to recompile, and I kept asking myself: *why am I building a static site that has exactly one dynamic page?*

## Version 2: Bun + Hono + JSX

The current stack is brutally simple:

- **Bun** runs the server natively. No Node.js, no transpiler, no bundler.
- **Hono** handles routing. It's fast, lightweight, and its JSX engine renders pages server-side with zero client overhead.
- **Tailwind CSS via CDN.** No `tailwind.config.js`, no PostCSS, no build. One `<script>` tag in the `<head>` and Tailwind scans the DOM at runtime. Yes, it's ~70KB. No, I don't care — the trade-off is worth never running a build again.
- **Two dependencies: `hono` + `marked`.** That's it.

## What changed

- **No build step.** `bun --watch server.tsx` reloads on every file save. Edit, refresh, done.
- **Single process.** The usage dashboard API (`/api/usage`) lives inside the same server. No CORS, no separate port, no second tunnel.
- **Assets are real files.** No symlinks, no build output. Static files served directly from `public/`.

## SSR, not static

Unlike Astro which pre-builds HTML at build time or Next.js which ships a heavy client runtime, this setup does **pure server-side JSX rendering** — no build, no client framework, just HTML strings generated per request.

| | Astro SSG | Astro hybrid | **This setup** | Next.js |
|---|---|---|---|---|
| Build step | Required | Required | **None** | Required |
| Static pages | Pre-built HTML | `prerender: true` | SSR on demand | SSG/ISR |
| Dynamic pages | N/A | SSR | **SSR** | SSR + RSC |
| API routes | Endpoints | Endpoints | **Same process** | Route handlers |
| Client JS | 0 KB default | 0 KB default | Vanilla `<script>` | React runtime |
| Dependencies | ~500 | ~500 | **2** | ~800+ |

For interactivity, vanilla JS in `<script>` tags handles everything — theme toggle, mobile menu, dashboard fetches. When more complex reactive UI is needed, `hono/jsx/dom` provides a 2KB reactive layer without adding a dependency. And Bun's built-in APIs (`Bun.serve` WebSocket, `bun:sqlite`, `Bun.sql`) cover everything from real-time features to databases — no extra packages required.

## Why not Astro anymore?

Astro is great for content sites. But once you need SSR for a dashboard, you're either adding an API server alongside it or switching to Astro's hybrid mode — which *still* has a build step. I wanted zero friction between editing a file and seeing the result. Bun + Hono gives me that.

## The numbers

- **2 dependencies** (down from ~500 with Astro + Tailwind toolchain)
- **0 build steps**
- **828 KB** of static assets (down from 1.5 MB after optimization)
- **1 command** to run everything

More notes as I keep simplifying.
