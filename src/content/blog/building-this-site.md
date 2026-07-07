---
title: Building this site
date: 2026-06-02
description: Notes on rebuilding my personal site with Astro, Tailwind, and a bit of help from Claude Code.
lang: en
---

I rebuilt this site from scratch with Astro. No framework baggage, just static HTML with a sprinkle of client-side JS for the theme toggle.

A few decisions that mattered:

- **Astro over Next.js.** For a mostly-static personal site, shipping zero JS by default is the right trade-off.
- **Tailwind v4.** The new CSS-first config (`@theme` in `global.css`) removes the need for a `tailwind.config.js` entirely.
- **i18n via routing, not a library.** Astro's built-in `i18n` config handles `/fr/*` prefixing without pulling in `astro-i18next` or similar.

The whole thing is under 200KB of shipped JS, most of which is the theme toggle script and language switcher.

More notes to come as I keep tinkering with it.
