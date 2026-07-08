/** @jsxImportSource hono/jsx */
import type { FC } from "hono/jsx";
import type { Lang } from "../data/content";

export interface LanguageSwitcherProps {
  lang: Lang;
  pathname?: string;
}

// Slug mappings between English and French blog posts
const slugMap: Record<string, string> = {
  "building-this-site": "construire-ce-site",
  "construire-ce-site": "building-this-site",
};

/**
 * Maps a pathname from one language to the other.
 * Known paths are mapped explicitly; blog post slugs are mapped via slugMap.
 * Falls back to language-appropriate root.
 */
function buildLangHref(pathname: string, targetLang: Lang): string {
  const p = pathname || "/";

  // Strip trailing slash for matching, but preserve it for root
  const clean = p === "/" ? "/" : p.replace(/\/$/, "");

  // Root
  if (clean === "/" || clean === "" || clean === "/fr") {
    return targetLang === "fr" ? "/fr/" : "/";
  }

  // Strip /fr prefix to get the "base" path
  const isFrench = clean.startsWith("/fr/");
  const base = isFrench ? clean.slice(4) : clean.slice(1); // e.g. "blog/building-this-site" or "about"

  // Blog post: /blog/:slug → /fr/blog/:slug (with slug mapping)
  const blogMatch = base.match(/^blog\/(.+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    const mappedSlug = slugMap[slug] || slug;
    return targetLang === "fr" ? `/fr/blog/${mappedSlug}` : `/blog/${mappedSlug}`;
  }

  // Blog index
  if (base === "blog") {
    return targetLang === "fr" ? "/fr/blog" : "/blog";
  }

  // Everything else (generic): swap /fr prefix
  return targetLang === "fr" ? `/fr/${base}` : `/${base}`;
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ lang, pathname = "/" }) => {
  const enHref = lang === "en" ? pathname : buildLangHref(pathname, "en");
  const frHref = lang === "fr" ? pathname : buildLangHref(pathname, "fr");

  return (
    <nav class="inline-flex items-center p-0.5 rounded-full border border-[var(--color-border)] text-xs font-semibold" aria-label="Language switcher">
      <a
        href={enHref}
        class={`px-2.5 py-1 rounded-full transition-colors duration-150 ${lang === 'en' ? 'bg-[var(--color-accent)] text-white' : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'}`}
        aria-current={lang === 'en' ? 'page' : undefined}
      >
        EN
      </a>
      <a
        href={frHref}
        class={`px-2.5 py-1 rounded-full transition-colors duration-150 ${lang === 'fr' ? 'bg-[var(--color-accent)] text-white' : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'}`}
        aria-current={lang === 'fr' ? 'page' : undefined}
      >
        FR
      </a>
    </nav>
  );
};
