import type { Lang } from "./content";

export interface UsesItem {
  name: string;
  description?: string;
  url?: string;
  image?: string;
}

export interface SoftwareCategory {
  category: string;
  items: UsesItem[];
}

export interface UsesData {
  title: string;
  description: string;
  editor: UsesItem[];
  hardware: UsesItem[];
  software: SoftwareCategory[];
  services: UsesItem[];
}

const uses: Record<Lang, UsesData> = {
  en: {
    title: "Uses",
    description: "Hardware, software, and tools I use daily.",
    editor: [
      { name: "Cursor", description: "AI-first code editor, my daily driver", url: "https://cursor.com/", image: "/images/uses/cursor.svg" },
      { name: "Material Theme Palenight High Contrast", description: "The theme I have been using since my first VS Code install", url: "https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you" },
      { name: "JetBrains Mono", description: "The only font that looks good at any size", url: "https://www.jetbrains.com/lp/mono/", image: "/images/uses/jetbrains.svg" },
    ],
    hardware: [
      { name: "MacBook Air M4", description: '13" 2025, 24GB RAM, 512GB SSD', url: "https://www.apple.com/macbook-air/", image: "/images/uses/apple.svg" },
      { name: "iPhone 13 Pro", description: "Still going strong", url: "https://www.apple.com/iphone/", image: "/images/uses/apple.svg" },
      { name: "LG UltraWide 34WL80C-B", description: '34" curved, extra screen real estate', url: "https://www.amazon.fr/LG-UltraWide-34WL80C-B-Moniteur-incurv%C3%A9/dp/B083QT6Z8R", image: "/images/uses/lg.svg" },
      { name: "Logitech MX Master 3S", description: "Best mouse ever made", url: "https://www.amazon.fr/Logitech-Master-performante-ultra-rapide-Chrome-Graphite/dp/B0FHHV6YR5/", image: "/images/uses/logitech.svg" },
      { name: "Logitech MX Keys", description: "Low-profile, quiet, backlit", url: "https://www.amazon.fr/Logitech-programmables-r%C3%A9tro%C3%A9clair%C3%A9-Bluetooth-rechargeable/dp/B07W5JK2S7", image: "/images/uses/logitech.svg" },
      { name: "AirPods 2 + AirPods Max", description: "Everyday buds + over-ear for deep focus", url: "https://www.apple.com/airpods/", image: "/images/uses/apple.svg" },
      { name: "Synology DS224+", description: "NAS with 2x 8TB WD Red HDDs, backups and media", url: "https://www.amazon.fr/Synology-DS225-Bundle-Western-Digital/dp/B0FVG5J5CJ/", image: "/images/uses/synology.svg" },
      { name: "Logitech Desk Mat", description: "Clean, minimal desk mat", url: "https://www.amazon.fr/Logitech-Desk-Mat-Multifonctionnel-Anti-D%C3%A9rapage/dp/B07W5JK3Z2/", image: "/images/uses/logitech.svg" },
      { name: "Titan (Secretlab)", description: "Comfortable for long coding sessions", url: "https://secretlab.eu/pages/titan-evo-2022-series" },
    ],
    software: [
      {
        category: "AI Tools",
        items: [
          { name: "Claude Code", description: "Agentic coding in the terminal", url: "https://claude.com/product/claude-code", image: "/images/uses/anthropic.svg" },
          { name: "OpenAI Codex", description: "Another agent in the toolbox", url: "https://openai.com/codex/", image: "/images/uses/codex.png" },
        ],
      },
      {
        category: "Terminal & Launcher",
        items: [
          { name: "Warp", description: "Modern terminal with AI built in", url: "https://www.warp.dev/", image: "/images/uses/warp.svg" },
          { name: "Raycast", description: "The GOAT launcher, shortcuts, clipboard, window management", url: "https://www.raycast.com/", image: "/images/uses/raycast.svg" },
        ],
      },
      {
        category: "Browser",
        items: [
          { name: "Arc Browser", description: "A browser that gets out of the way", url: "https://arc.net/", image: "/images/uses/arc.svg" },
        ],
      },
      {
        category: "Security",
        items: [
          { name: "1Password", description: "Passwords, SSH keys, 2FA, everything", url: "https://1password.com/", image: "/images/uses/1password.svg" },
          { name: "NordVPN", description: "Because privacy matters", url: "https://nordvpn.com/", image: "/images/uses/nordvpn.svg" },
        ],
      },
      {
        category: "macOS Utilities",
        items: [
          { name: "Amphetamine", description: "Keeps the Mac awake when needed", url: "https://apps.apple.com/app/amphetamine/id937984704" },
          { name: "Rectangle", description: "Window snapping for macOS", url: "https://rectangleapp.com/" },
          { name: "Shottr", description: "Fast screenshot annotation", url: "https://shottr.cc/" },
          { name: "VoiceInk", description: "Voice-to-text everywhere", url: "https://voiceink.app/" },
          { name: "MonitorControl", description: "Control external display brightness from the keyboard", url: "https://github.com/MonitorControl/MonitorControl" },
          { name: "Spark", description: "Email client that doesn't suck", url: "https://sparkmailapp.com/" },
        ],
      },
      {
        category: "Media",
        items: [
          { name: "Spotify", description: "Music for focus", url: "https://spotify.com/", image: "/images/uses/spotify.svg" },
        ],
      },
      {
        category: "Networking",
        items: [
          { name: "Tailscale", description: "Mesh VPN for all devices", url: "https://tailscale.com/", image: "/images/uses/tailscale.svg" },
        ],
      },
    ],
    services: [
      { name: "Cloudflare", description: "DNS, Tunnel, CDN", url: "https://www.cloudflare.com/", image: "/images/uses/cloudflare.svg" },
      { name: "GitHub", description: "Code, CI/CD, project management", url: "https://github.com/mehdiamrane", image: "/images/uses/github.svg" },
      { name: "Dokploy", description: "Self-hosted PaaS for Docker", url: "https://dokploy.com/", image: "/images/uses/dokploy.svg" },
      { name: "OpenRouter", description: "Unified API for 200+ AI models", url: "https://openrouter.ai/", image: "/images/uses/openrouter.svg" },
    ],
  },
  fr: {
    title: "Uses",
    description: "Le matériel, les logiciels et les outils que j'utilise au quotidien.",
    editor: [
      { name: "Cursor", description: "Éditeur de code augmenté par IA, mon outil principal", url: "https://cursor.com/", image: "/images/uses/cursor.svg" },
      { name: "Material Theme Palenight High Contrast", description: "Le thème que j'utilise depuis mon premier install VS Code", url: "https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you" },
      { name: "JetBrains Mono", description: "La seule police qui reste nette quelle que soit la taille", url: "https://www.jetbrains.com/lp/mono/", image: "/images/uses/jetbrains.svg" },
    ],
    hardware: [
      { name: "MacBook Air M4", description: '13" 2025, 24 Go RAM, 512 Go SSD', url: "https://www.apple.com/fr/macbook-air/", image: "/images/uses/apple.svg" },
      { name: "iPhone 13 Pro", description: "Toujours au top", url: "https://www.apple.com/fr/iphone/", image: "/images/uses/apple.svg" },
      { name: "LG UltraWide 34WL80C-B", description: "34\" incurvé, l'espace en plus change tout", url: "https://www.amazon.fr/LG-UltraWide-34WL80C-B-Moniteur-incurv%C3%A9/dp/B083QT6Z8R", image: "/images/uses/lg.svg" },
      { name: "Logitech MX Master 3S", description: "La meilleure souris jamais créée", url: "https://www.amazon.fr/Logitech-Master-performante-ultra-rapide-Chrome-Graphite/dp/B0FHHV6YR5/", image: "/images/uses/logitech.svg" },
      { name: "Logitech MX Keys", description: "Clavier fin, silencieux, rétroéclairé", url: "https://www.amazon.fr/Logitech-programmables-r%C3%A9tro%C3%A9clair%C3%A9-Bluetooth-rechargeable/dp/B07W5JK2S7", image: "/images/uses/logitech.svg" },
      { name: "AirPods 2 + AirPods Max", description: "Écouteurs quotidiens + casque pour le focus", url: "https://www.apple.com/fr/airpods/", image: "/images/uses/apple.svg" },
      { name: "Synology DS224+", description: "NAS avec 2x 8 To WD Red, sauvegardes et média", url: "https://www.amazon.fr/Synology-DS225-Bundle-Western-Digital/dp/B0FVG5J5CJ/", image: "/images/uses/synology.svg" },
      { name: "Tapis de bureau Logitech", description: "Tapis de bureau propre et minimal", url: "https://www.amazon.fr/Logitech-Desk-Mat-Multifonctionnel-Anti-D%C3%A9rapage/dp/B07W5JK3Z2/", image: "/images/uses/logitech.svg" },
      { name: "Titan (Secretlab)", description: "Confortable pour les longues sessions de code", url: "https://secretlab.eu/pages/titan-evo-2022-series" },
    ],
    software: [
      {
        category: "Outils IA",
        items: [
          { name: "Claude Code", description: "Agent de code dans le terminal", url: "https://claude.com/product/claude-code", image: "/images/uses/anthropic.svg" },
          { name: "OpenAI Codex", description: "Un autre agent dans la boîte à outils", url: "https://openai.com/codex/", image: "/images/uses/codex.png" },
        ],
      },
      {
        category: "Terminal & Lanceur",
        items: [
          { name: "Warp", description: "Terminal moderne avec IA intégrée", url: "https://www.warp.dev/", image: "/images/uses/warp.svg" },
          { name: "Raycast", description: "Le GOAT des launchers, raccourcis, presse-papier, fenêtres", url: "https://www.raycast.com/", image: "/images/uses/raycast.svg" },
        ],
      },
      {
        category: "Navigateur",
        items: [
          { name: "Arc Browser", description: "Un navigateur qui s'efface", url: "https://arc.net/", image: "/images/uses/arc.svg" },
        ],
      },
      {
        category: "Sécurité",
        items: [
          { name: "1Password", description: "Mots de passe, clés SSH, 2FA, tout au même endroit", url: "https://1password.com/", image: "/images/uses/1password.svg" },
          { name: "NordVPN", description: "Parce que la vie privée compte", url: "https://nordvpn.com/fr/", image: "/images/uses/nordvpn.svg" },
        ],
      },
      {
        category: "Utilitaires macOS",
        items: [
          { name: "Amphetamine", description: "Empêche le Mac de se mettre en veille", url: "https://apps.apple.com/fr/app/amphetamine/id937984704" },
          { name: "Rectangle", description: "Snapping de fenêtres pour macOS", url: "https://rectangleapp.com/" },
          { name: "Shottr", description: "Captures d'écran rapides avec annotations", url: "https://shottr.cc/" },
          { name: "VoiceInk", description: "Dictée vocale partout", url: "https://voiceink.app/" },
          { name: "MonitorControl", description: "Contrôler la luminosité de l'écran externe au clavier", url: "https://github.com/MonitorControl/MonitorControl" },
          { name: "Spark", description: "Client email qui ne pique pas les yeux", url: "https://sparkmailapp.com/" },
        ],
      },
      {
        category: "Média",
        items: [
          { name: "Spotify", description: "Musique pour le focus", url: "https://spotify.com/", image: "/images/uses/spotify.svg" },
        ],
      },
      {
        category: "Réseau",
        items: [
          { name: "Tailscale", description: "VPN mesh pour tous les appareils", url: "https://tailscale.com/", image: "/images/uses/tailscale.svg" },
        ],
      },
    ],
    services: [
      { name: "Cloudflare", description: "DNS, Tunnel, CDN", url: "https://www.cloudflare.com/", image: "/images/uses/cloudflare.svg" },
      { name: "GitHub", description: "Code, CI/CD, gestion de projet", url: "https://github.com/mehdiamrane", image: "/images/uses/github.svg" },
      { name: "Dokploy", description: "PaaS auto-hébergé pour Docker", url: "https://dokploy.com/", image: "/images/uses/dokploy.svg" },
      { name: "OpenRouter", description: "API unifiée pour 200+ modèles IA", url: "https://openrouter.ai/", image: "/images/uses/openrouter.svg" },
    ],
  },
};

export default uses;
