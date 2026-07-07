---
title: Construire ce site
date: 2026-06-02
description: Notes sur la refonte de mon site personnel avec Astro, Tailwind, et un peu d'aide de Claude Code.
lang: fr
---

J'ai reconstruit ce site de zéro avec Astro. Pas de framework superflu, juste du HTML statique avec une pointe de JS côté client pour le sélecteur de thème.

Quelques décisions qui comptent :

- **Astro plutôt que Next.js.** Pour un site personnel majoritairement statique, ne rien envoyer en JS par défaut est le bon compromis.
- **Tailwind v4.** La nouvelle configuration CSS-first (`@theme` dans `global.css`) supprime le besoin d'un `tailwind.config.js`.
- **i18n via le routing, pas une librairie.** La config `i18n` intégrée d'Astro gère le préfixe `/fr/*` sans avoir besoin d'`astro-i18next` ou équivalent.

L'ensemble pèse moins de 200 Ko de JS, principalement le script du sélecteur de thème et de langue.

D'autres notes à venir au fil de mes bidouillages.
