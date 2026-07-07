import type { Lang } from "./content";

export interface UsesItem {
  name: string;
  description?: string;
  url?: string;
}

export interface UsesData {
  title: string;
  description: string;
  editor: UsesItem[];
  hardware: UsesItem[];
  software: UsesItem[];
  services: UsesItem[];
  desk: UsesItem[];
}

const uses: Record<Lang, UsesData> = {
  en: {
    title: "Uses",
    description: "Hardware, software, and tools I use daily.",
    editor: [
      { name: "Cursor", description: "AI-first code editor — my daily driver", url: "https://cursor.com/" },
      { name: "Material Theme Palenight High Contrast", description: "My go-to theme, adapted from the Material Palenight palette" },
      { name: "JetBrains Mono", description: "The only font that looks good at any size", url: "https://www.jetbrains.com/lp/mono/" },
      { name: "ZSH", description: "My shell of choice, configured via dotfiles", url: "https://github.com/mehdiamrane/dotfiles" },
    ],
    hardware: [
      { name: "MacBook Pro M4", description: "16GB RAM, 512GB SSD — 2025", url: "https://www.apple.com/macbook-pro/" },
      { name: "iPhone 13 Pro", description: "Still going strong", url: "https://www.apple.com/iphone/" },
      { name: "LG Curved Monitor", description: "UltraWide — the extra screen real estate is a game changer" },
      { name: "Logitech MX Master 3S", description: "Best mouse ever made", url: "https://www.logitech.com/products/mice/mx-master-3s.html" },
      { name: "Logitech MX Keys", description: "Low-profile, quiet, backlit", url: "https://www.logitech.com/products/keyboards/mx-keys.html" },
      { name: "AirPods", description: "For music, calls, and focus mode", url: "https://www.apple.com/airpods/" },
      { name: "Synology DS224+", description: "NAS with 2× 8TB WD Red HDDs — backups & media", url: "https://www.synology.com/products/DS224+" },
    ],
    software: [
      { name: "Claude Code", description: "Agentic coding in the terminal", url: "https://claude.ai/" },
      { name: "OpenAI Codex", description: "Another agent in the toolbox", url: "https://openai.com/" },
      { name: "Warp", description: "Modern terminal with AI built-in", url: "https://www.warp.dev/" },
      { name: "Raycast", description: "The GOAT launcher — shortcuts, clipboard, window management", url: "https://www.raycast.com/" },
      { name: "Arc Browser", description: "A browser that gets out of the way", url: "https://arc.net/" },
      { name: "1Password", description: "Passwords, SSH keys, 2FA — everything", url: "https://1password.com/" },
      { name: "NordVPN", description: "Because privacy matters", url: "https://nordvpn.com/" },
      { name: "Amphetamine", description: "Keeps the Mac awake when needed", url: "https://apps.apple.com/app/amphetamine/id937984704" },
      { name: "Rectangle", description: "Window snapping for macOS", url: "https://rectangleapp.com/" },
      { name: "Shottr", description: "Fast screenshot annotation", url: "https://shottr.cc/" },
      { name: "VoiceInk", description: "Voice-to-text everywhere", url: "https://voiceink.app/" },
      { name: "MonitorControl", description: "Control external display brightness from the keyboard", url: "https://github.com/MonitorControl/MonitorControl" },
      { name: "Spark", description: "Email client that doesn't suck", url: "https://sparkmailapp.com/" },
      { name: "Spotify", description: "Music for focus" },
      { name: "VLC", description: "Plays anything" },
      { name: "Tailscale", description: "Mesh VPN for all devices", url: "https://tailscale.com/" },
    ],
    services: [
      { name: "Cloudflare", description: "DNS, Tunnel, CDN", url: "https://www.cloudflare.com/" },
      { name: "GitHub", description: "Code, CI/CD, project management", url: "https://github.com/mehdiamrane" },
      { name: "Vercel", description: "Deployments for Next.js projects", url: "https://vercel.com/" },
      { name: "Dokploy", description: "Self-hosted PaaS for Docker", url: "https://dokploy.com/" },
      { name: "OpenRouter", description: "Unified API for 200+ AI models", url: "https://openrouter.ai/" },
      { name: "Z.AI", description: "AI playground with web search & reading", url: "https://z.ai/" },
      { name: "DeepSeek", description: "Powerful open-weight LLMs", url: "https://deepseek.com/" },
      { name: "Sentry", description: "Error tracking & performance monitoring", url: "https://sentry.io/" },
    ],
    desk: [
      { name: "Secretlab Titan XL", description: "2021 edition — built like a tank, comfortable for long coding sessions", url: "https://secretlab.co/" },
      { name: "LG Mousepad", description: "Clean, minimal, does the job" },
      { name: "Simple desk", description: "No dock, no hub — just a clean surface" },
    ],
  },
  fr: {
    title: "Uses",
    description: "Le matériel, les logiciels et les outils que j'utilise au quotidien.",
    editor: [
      { name: "Cursor", description: "Éditeur de code augmenté par IA — mon outil principal", url: "https://cursor.com/" },
      { name: "Material Theme Palenight High Contrast", description: "Mon thème fétiche, adapté de la palette Material Palenight" },
      { name: "JetBrains Mono", description: "La seule police qui reste nette quelle que soit la taille", url: "https://www.jetbrains.com/lp/mono/" },
      { name: "ZSH", description: "Mon shell, configuré via mes dotfiles", url: "https://github.com/mehdiamrane/dotfiles" },
    ],
    hardware: [
      { name: "MacBook Pro M4", description: "16 Go RAM, 512 Go SSD — 2025", url: "https://www.apple.com/fr/macbook-pro/" },
      { name: "iPhone 13 Pro", description: "Toujours au top", url: "https://www.apple.com/fr/iphone/" },
      { name: "Écran incurvé LG", description: "UltraWide — l'espace en plus change tout" },
      { name: "Logitech MX Master 3S", description: "La meilleure souris jamais créée", url: "https://www.logitech.com/fr-fr/products/mice/mx-master-3s.html" },
      { name: "Logitech MX Keys", description: "Clavier fin, silencieux, rétroéclairé", url: "https://www.logitech.com/fr-fr/products/keyboards/mx-keys.html" },
      { name: "AirPods", description: "Pour la musique, les appels, et le mode focus", url: "https://www.apple.com/fr/airpods/" },
      { name: "Synology DS224+", description: "NAS avec 2× 8 To WD Red — sauvegardes & média", url: "https://www.synology.com/fr-fr/products/DS224+" },
    ],
    software: [
      { name: "Claude Code", description: "Agent de code dans le terminal", url: "https://claude.ai/" },
      { name: "OpenAI Codex", description: "Un autre agent dans la boîte à outils", url: "https://openai.com/" },
      { name: "Warp", description: "Terminal moderne avec IA intégrée", url: "https://www.warp.dev/" },
      { name: "Raycast", description: "Le GOAT des launchers — raccourcis, presse-papier, fenêtres", url: "https://www.raycast.com/" },
      { name: "Arc Browser", description: "Un navigateur qui s'efface", url: "https://arc.net/" },
      { name: "1Password", description: "Mots de passe, clés SSH, 2FA — tout au même endroit", url: "https://1password.com/" },
      { name: "NordVPN", description: "Parce que la vie privée compte", url: "https://nordvpn.com/fr/" },
      { name: "Amphetamine", description: "Empêche le Mac de se mettre en veille", url: "https://apps.apple.com/fr/app/amphetamine/id937984704" },
      { name: "Rectangle", description: "Snapping de fenêtres pour macOS", url: "https://rectangleapp.com/" },
      { name: "Shottr", description: "Captures d'écran rapides avec annotations", url: "https://shottr.cc/" },
      { name: "VoiceInk", description: "Dictée vocale partout", url: "https://voiceink.app/" },
      { name: "MonitorControl", description: "Contrôler la luminosité de l'écran externe au clavier", url: "https://github.com/MonitorControl/MonitorControl" },
      { name: "Spark", description: "Client email qui ne pique pas les yeux", url: "https://sparkmailapp.com/" },
      { name: "Spotify", description: "Musique pour le focus" },
      { name: "VLC", description: "Lit tout ce qu'on lui donne" },
      { name: "Tailscale", description: "VPN mesh pour tous les appareils", url: "https://tailscale.com/" },
    ],
    services: [
      { name: "Cloudflare", description: "DNS, Tunnel, CDN", url: "https://www.cloudflare.com/" },
      { name: "GitHub", description: "Code, CI/CD, gestion de projet", url: "https://github.com/mehdiamrane" },
      { name: "Vercel", description: "Déploiements Next.js", url: "https://vercel.com/" },
      { name: "Dokploy", description: "PaaS auto-hébergé pour Docker", url: "https://dokploy.com/" },
      { name: "OpenRouter", description: "API unifiée pour 200+ modèles IA", url: "https://openrouter.ai/" },
      { name: "Z.AI", description: "Playground IA avec recherche web", url: "https://z.ai/" },
      { name: "DeepSeek", description: "LLMs open-weight puissants", url: "https://deepseek.com/" },
      { name: "Sentry", description: "Monitoring d'erreurs et de performances", url: "https://sentry.io/" },
    ],
    desk: [
      { name: "Secretlab Titan XL", description: "Édition 2021 — solide comme un roc, confortable pour les longues sessions", url: "https://secretlab.co/" },
      { name: "Tapis de souris LG", description: "Sobre, minimal, fait le job" },
      { name: "Bureau simple", description: "Pas de dock, pas de hub — juste une surface propre" },
    ],
  },
};

export default uses;
