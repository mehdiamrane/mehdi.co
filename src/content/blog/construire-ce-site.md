---
title: Construire ce site
date: 2026-07-07
description: D'Astro à Bun + Hono — pourquoi j'ai viré le build et suis passé en SSR intégral avec deux dépendances.
lang: fr
---

J'ai reconstruit ce site deux fois en deux semaines. La première version utilisait Astro + Tailwind. Ça fonctionnait. Mais chaque modification imposait d'attendre la recompilation du serveur de dev Astro, et je n'arrêtais pas de me demander : *pourquoi je build un site statique qui a une seule page dynamique ?*

## Version 2 : Bun + Hono + JSX

La stack actuelle est brutalement simple :

- **Bun** fait tourner le serveur nativement. Pas de Node.js, pas de transpileur, pas de bundler.
- **Hono** gère le routing. C'est rapide, léger, et son moteur JSX fait le rendu côté serveur sans overhead client.
- **Tailwind CSS via CDN.** Pas de `tailwind.config.js`, pas de PostCSS, pas de build. Une balise `<script>` dans le `<head>` et Tailwind scanne le DOM à la volée. Oui, ça pèse ~70 Ko. Non, je m'en fous — le compromis vaut largement le fait de ne plus jamais attendre un build.
- **Deux dépendances : `hono` + `marked`.** C'est tout.

## Ce qui a changé

- **Zéro build.** `bun --watch server.tsx` recharge à chaque sauvegarde. Éditer, rafraîchir, terminé.
- **Un seul processus.** L'API du tableau de bord d'usage (`/api/usage`) tourne dans le même serveur. Pas de CORS, pas de port séparé, pas de deuxième tunnel.
- **Les assets sont de vrais fichiers.** Pas de symlinks, pas de dossier de build. Les fichiers statiques sont servis directement depuis `public/`.

## SSR, pas du statique

Contrairement à Astro qui pré-génère le HTML au build ou Next.js qui embarque un runtime client lourd, cette configuration fait du **rendu JSX pur côté serveur** — pas de build, pas de framework client, juste des chaînes HTML générées à chaque requête.

| | Astro SSG | Astro hybrid | **Cette stack** | Next.js |
|---|---|---|---|---|
| Build | Requis | Requis | **Aucun** | Requis |
| Pages statiques | HTML pré-buildé | `prerender: true` | SSR à la demande | SSG/ISR |
| Pages dynamiques | N/D | SSR | **SSR** | SSR + RSC |
| Routes API | Endpoints | Endpoints | **Même processus** | Route handlers |
| JS client | 0 Ko par défaut | 0 Ko par défaut | `<script>` vanilla | Runtime React |
| Dépendances | ~500 | ~500 | **2** | ~800+ |

Pour l'interactivité, du JS vanilla dans des balises `<script>` gère tout — bascule de thème, menu mobile, données du dashboard. Quand une UI réactive plus complexe est nécessaire, `hono/jsx/dom` fournit une couche réactive de 2 Ko sans dépendance supplémentaire. Et les API natives de Bun (`Bun.serve` WebSocket, `bun:sqlite`, `Bun.sql`) couvrent tout, du temps réel aux bases de données — sans packages additionnels.

## Pourquoi plus Astro ?

Astro est excellent pour les sites de contenu. Mais dès qu'on a besoin de SSR pour un dashboard, soit on ajoute un serveur API à côté, soit on passe en mode hybride — qui *garde* une étape de build. Je voulais zéro friction entre l'édition d'un fichier et le résultat visible. Bun + Hono me donne ça.

## Les chiffres

- **2 dépendances** (contre ~500 avec la toolchain Astro + Tailwind)
- **0 étape de build**
- **828 Ko** d'assets statiques (contre 1,5 Mo après optimisation)
- **1 commande** pour tout lancer

D'autres notes au fil de mes simplifications.
