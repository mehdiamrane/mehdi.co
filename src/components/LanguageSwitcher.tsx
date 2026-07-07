/** @jsxImportSource hono/jsx */
import type { FC } from "hono/jsx";
import type { Lang } from "../data/content";

export interface LanguageSwitcherProps {
  lang: Lang;
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ lang }) => (
  <nav class="inline-flex items-center p-0.5 rounded-full border border-[var(--color-border)] text-xs font-semibold" aria-label="Language switcher">
    <a
      href="/"
      class={`px-2.5 py-1 rounded-full transition-colors duration-150 ${lang === 'en' ? 'bg-[var(--color-accent)] text-white' : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'}`}
      aria-current={lang === 'en' ? 'page' : undefined}
    >
      EN
    </a>
    <a
      href="/fr/"
      class={`px-2.5 py-1 rounded-full transition-colors duration-150 ${lang === 'fr' ? 'bg-[var(--color-accent)] text-white' : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'}`}
      aria-current={lang === 'fr' ? 'page' : undefined}
    >
      FR
    </a>
  </nav>
);
