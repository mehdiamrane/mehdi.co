/** @jsxImportSource hono/jsx */
import type { FC, PropsWithChildren } from "hono/jsx";
import type { Lang } from "../data/content";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Icon } from "./Icons";

export interface BaseProps {
  lang: Lang;
  title: string;
  description?: string;
  image?: string;
  pathname?: string;
}

export const Base: FC<PropsWithChildren<BaseProps>> = ({
  lang,
  title,
  description,
  image = "/og-image.png",
  pathname = "/",
  children,
}) => {
  const desc = description || title;
  const homeHref = lang === "fr" ? "/fr/" : "/";
  const blogHref = lang === "fr" ? "/fr/blog" : "/blog";
  const isHomeActive = pathname === "/" || pathname === "/fr" || pathname === "/fr/";
  const isBlogActive = pathname.startsWith("/blog") || pathname.startsWith("/fr/blog");
  const navLabels = lang === "fr" ? { home: "Accueil", blog: "Blog" } : { home: "Home", blog: "Blog" };

  return (
    <html lang={lang}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme:dark)').matches;if(s?s==='dark':p)document.documentElement.classList.add('dark')})()`,
          }}
        />
        <meta charset="utf-8" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="64x64" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="description" content={desc} />
        <title>{title}</title>

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={image.startsWith("http") ? image : `https://mehdi.co${image}`} />
        <meta property="og:url" content={`https://mehdi.co${pathname}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={image.startsWith("http") ? image : `https://mehdi.co${image}`} />

        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `tailwind.config={darkMode:'class',theme:{extend:{colors:{accent:'#FD3659'}}}}`,
          }}
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
:root {
  --color-accent: #FD3659;
  --color-bg: #fafafa;
  --color-text: #1a1a1a;
  --color-muted: #4b5563;
  --color-border: #e5e7eb;
  --color-card: #fafafa;
}
.dark {
  --color-bg: #0f0f0f;
  --color-text: #e5e5e5;
  --color-muted: #d1d5db;
  --color-border: #2a2a2a;
  --color-card: #1a1a1a;
}
.dark img[src*='/images/techs/'] { filter: brightness(0) invert(1); }
body { font-family: 'Inter', system-ui, -apple-system, sans-serif; background: var(--color-bg); color: var(--color-text); -webkit-font-smoothing: antialiased; transition: background-color 0.2s ease-out, color 0.2s ease-out; }
::selection { background: var(--color-accent); color: white; }

.link-underline {
  color: inherit;
  text-decoration: none;
  box-shadow: inset 0 -0.125em 0 var(--color-accent);
  transition: all 150ms cubic-bezier(0.42, 0.14, 0.28, 0.93);
}
.link-underline:hover,
.link-underline:focus-visible {
  box-shadow: inset 0 -1.35em 0 0 var(--color-accent);
  color: #fff;
}

.refreshing svg {
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Logo animation */
.logo__text {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  vertical-align: bottom;
  width: 0;
  animation: typing 500ms steps(5, end) 1s forwards;
}
.logo__short { display: inline; }
.logo__full { display: none; }
@media (min-width: 640px) {
  .logo__short { display: none; }
  .logo__full { display: inline; }
}
.logo__underscore {
  color: var(--color-accent);
  animation: blinking 1s 3;
}
.logo:hover .logo__underscore {
  animation: blinking 1s infinite;
}
@keyframes typing { from { width: 0; } to { width: 100%; } }
@keyframes blinking { from { color: transparent; } to { color: var(--color-accent); } }
@media (prefers-reduced-motion: reduce) {
  .logo__text { animation: none; width: auto; }
  .logo__underscore { animation: none; }
}

/* Prose for blog posts */
.prose {
  color: var(--color-text);
  line-height: 1.75;
}
.prose p { margin-bottom: 1.25em; }
.prose p:last-child { margin-bottom: 0; }
.prose h2 {
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-top: 2em;
  margin-bottom: 0.75em;
}
.prose h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 1.75em;
  margin-bottom: 0.5em;
}
.prose ul, .prose ol { margin: 0 0 1.25em 1.25em; }
.prose ul { list-style: disc; }
.prose ol { list-style: decimal; }
.prose li { margin-bottom: 0.4em; }
.prose strong { font-weight: 600; }
.prose code {
  font-size: 0.875em;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 0.15em 0.4em;
}
.prose pre {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1em;
  overflow-x: auto;
  margin-bottom: 1.25em;
}
.prose pre code { border: none; background: none; padding: 0; }
.prose blockquote {
  border-left: 2px solid var(--color-border);
  padding-left: 1em;
  color: var(--color-muted);
  margin: 1.25em 0;
}
.prose a {
  color: var(--color-text);
  text-decoration: underline;
  text-decoration-color: var(--color-accent);
  text-underline-offset: 3px;
  transition: background-color 0.15s ease-out, color 0.15s ease-out;
}
.prose a:hover {
  text-decoration-color: transparent;
  background-color: var(--color-accent);
  color: #fff;
}
`,
          }}
        />
      </head>
      <body class="min-h-screen flex flex-col">
        <header class="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-sm">
          <div class="mx-auto max-w-2xl px-6 h-14 flex items-center justify-between">
            <a href={homeHref} class="logo inline-flex items-center text-xl font-semibold text-[var(--color-text)]" aria-label="mehdi.co">
              <span class="logo__text">
                <span class="logo__full">mehdi</span>
                <span class="logo__short">m</span>
              </span>
              <span class="logo__underscore" aria-hidden="true">_</span>
            </a>

            <div class="flex items-center gap-5">
              <nav class="hidden sm:flex items-center gap-5 text-sm font-medium" aria-label="Primary">
                <a
                  href={homeHref}
                  class={`transition-colors duration-150 ${isHomeActive ? 'text-[var(--color-text)] font-semibold' : 'text-[var(--color-muted)] hover:text-[var(--color-accent)]'}`}
                  style={isHomeActive ? 'box-shadow: inset 0 -0.125em 0 var(--color-accent)' : ''}
                  aria-current={isHomeActive ? 'page' : undefined}
                >
                  {navLabels.home}
                </a>
                <a
                  href={blogHref}
                  class={`transition-colors duration-150 ${isBlogActive ? 'text-[var(--color-text)] font-semibold' : 'text-[var(--color-muted)] hover:text-[var(--color-accent)]'}`}
                  style={isBlogActive ? 'box-shadow: inset 0 -0.125em 0 var(--color-accent)' : ''}
                  aria-current={isBlogActive ? 'page' : undefined}
                >
                  {navLabels.blog}
                </a>
              </nav>

              <div class="flex items-center gap-4">
                <ThemeToggle />
                <LanguageSwitcher lang={lang} />
              </div>

              <button
                id="mobile-menu-toggle"
                type="button"
                class="sm:hidden inline-flex items-center justify-center w-7 h-7 text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-150 cursor-pointer"
                aria-label="Toggle menu"
                aria-expanded="false"
                aria-controls="mobile-menu"
              >
                <Icon name="list" size={20} class="block" data-icon="open" />
                <Icon name="x" size={20} class="hidden" data-icon="close" />
              </button>
            </div>
          </div>

          <nav id="mobile-menu" class="hidden sm:hidden flex-col px-6 pb-4 text-sm font-medium" aria-label="Primary mobile">
            <a
              href={homeHref}
              class={`block py-2 transition-colors duration-150 ${isHomeActive ? 'text-[var(--color-text)] font-semibold' : 'text-[var(--color-muted)] hover:text-[var(--color-accent)]'}`}
              aria-current={isHomeActive ? 'page' : undefined}
            >
              <span style={isHomeActive ? 'box-shadow: inset 0 -0.125em 0 var(--color-accent)' : ''}>{navLabels.home}</span>
            </a>
            <a
              href={blogHref}
              class={`block py-2 transition-colors duration-150 ${isBlogActive ? 'text-[var(--color-text)] font-semibold' : 'text-[var(--color-muted)] hover:text-[var(--color-accent)]'}`}
              aria-current={isBlogActive ? 'page' : undefined}
            >
              <span style={isBlogActive ? 'box-shadow: inset 0 -0.125em 0 var(--color-accent)' : ''}>{navLabels.blog}</span>
            </a>
          </nav>
        </header>

        <main class="grow mx-auto w-full max-w-2xl px-6 py-16 md:py-24">
          {children}
        </main>

        <footer class="w-full mx-auto max-w-2xl px-6 pb-8 text-sm text-[var(--color-muted)] border-t border-[var(--color-border)] pt-8">
          <p>&copy; 2020 &ndash; {new Date().getFullYear()} Mehdi Amrane</p>
        </footer>

        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  function applyTheme() {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored ? stored === 'dark' : prefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  function setupMobileMenu() {
    var toggle = document.getElementById('mobile-menu-toggle');
    var menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;
    var newToggle = toggle.cloneNode(true);
    toggle.parentNode.replaceChild(newToggle, toggle);
    var openIcon = newToggle.querySelector('[data-icon="open"]');
    var closeIcon = newToggle.querySelector('[data-icon="close"]');
    newToggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('flex');
      menu.classList.toggle('hidden', !isOpen);
      newToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
      openIcon.classList.toggle('hidden', isOpen);
      openIcon.classList.toggle('block', !isOpen);
      closeIcon.classList.toggle('hidden', !isOpen);
      closeIcon.classList.toggle('block', isOpen);
    });
  }

  function setupThemeToggle() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', function () {
      var isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  function setupLogoAnimation() {
    var text = document.querySelector('.logo__text');
    var score = document.querySelector('.logo__underscore');
    if (sessionStorage.getItem('logo-done')) {
      if (text) { text.style.animation = 'none'; text.style.width = 'auto'; }
      if (score) { score.style.animation = 'none'; }
    } else {
      sessionStorage.setItem('logo-done', '1');
    }
  }

  applyTheme();
  setupMobileMenu();
  setupThemeToggle();
  setupLogoAnimation();
})();
`,
          }}
        />
      </body>
    </html>
  );
};
