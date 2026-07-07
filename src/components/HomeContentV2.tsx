/** @jsxImportSource hono/jsx */
import type { FC } from "hono/jsx";
import type { Lang } from "../data/content";
import content from "../data/content";
import { Icon } from "./Icons";

export interface HomeContentV2Props {
  lang: Lang;
}

export const HomeContentV2: FC<HomeContentV2Props> = ({ lang }) => {
  const t = content[lang];
  const isFr = lang === "fr";

  const aboutHref = isFr ? "/fr/about" : "/about";
  const usesHref = isFr ? "/fr/uses" : "/uses";
  const blogHref = isFr ? "/fr/blog" : "/blog";

  const tagline = isFr
    ? "Développeur Front-End Senior — React, Next.js, TypeScript. Je construis des SaaS et des apps mobiles à Paris."
    : "Senior Front-End Developer — React, Next.js, TypeScript. I build SaaS and mobile apps in Paris.";

  const aboutLabel = isFr ? "En savoir plus sur moi" : "More about me";
  const workLabel = isFr ? "Mon travail" : "My work";
  const blogLabel = isFr ? "Blog" : "Blog";
  const usesLabel = isFr ? "Outils & setup" : "Tools & setup";

  const workBlurb = isFr
    ? "Co-fondateur d'Inkvoice, anciennement Shadow, Oxeva. Spécialiste React et architecture front-end."
    : "Co-founder at Inkvoice, formerly at Shadow, Oxeva. React and front-end architecture specialist.";

  const blogBlurb = isFr
    ? "Notes sur le dev front-end, les outils, et la construction de projets."
    : "Notes on front-end development, tools, and building things.";

  const usesBlurb = isFr
    ? "Mon setup hardware, logiciels et services au quotidien."
    : "My daily hardware, software, and services setup.";

  return (
    <>
      {/* Hero */}
      <header class="mb-20">
        <div class="flex flex-col sm:flex-row items-start gap-5 mb-8">
          <div class="w-[92px] h-[92px] rounded-full ring-2 ring-[var(--color-border)] flex-shrink-0 overflow-hidden">
            <img
              src="/avatar.png"
              alt={t.hero.name}
              class="w-full h-full rounded-full object-cover scale-[1.25]"
              width="92" height="92"
            />
          </div>
          <div>
            <h1 class="text-3xl font-semibold tracking-tight mb-3">{t.hero.name}</h1>
            <p class="text-[var(--color-muted)] leading-relaxed max-w-lg">{tagline}</p>
          </div>
        </div>

        <div class="flex flex-wrap gap-3 mb-8">
          {t.links.map(link => (
            <a
              href={link.href}
              class="link-underline inline-flex items-center gap-2 text-sm text-[var(--color-muted)]"
              {...(link.external !== false ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Icon name={link.icon} size={16} />
              {link.label}
            </a>
          ))}
        </div>

        <div class="inline-flex items-center gap-1.5 text-xs">
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[var(--color-card)] border border-[var(--color-border)] rounded-full text-[var(--color-muted)]">
            <span class="relative flex h-1.5 w-1.5">
              <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            {t.contact.status}
          </span>
        </div>
      </header>

      {/* Quick links — cards pointing to deeper pages */}
      <section class="space-y-4">
        <a
          href={aboutHref}
          class="block rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_8px_24px_rgba(255,255,255,0.05)]"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="font-semibold mb-1.5">{aboutLabel}</h2>
              <p class="text-sm text-[var(--color-muted)]">{workBlurb}</p>
            </div>
            <span class="text-[var(--color-muted)] text-sm flex-shrink-0 mt-1">→</span>
          </div>
        </a>

        <a
          href={blogHref}
          class="block rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_8px_24px_rgba(255,255,255,0.05)]"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="font-semibold mb-1.5">{blogLabel}</h2>
              <p class="text-sm text-[var(--color-muted)]">{blogBlurb}</p>
            </div>
            <span class="text-[var(--color-muted)] text-sm flex-shrink-0 mt-1">→</span>
          </div>
        </a>

        <a
          href={usesHref}
          class="block rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_8px_24px_rgba(255,255,255,0.05)]"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="font-semibold mb-1.5">{usesLabel}</h2>
              <p class="text-sm text-[var(--color-muted)]">{usesBlurb}</p>
            </div>
            <span class="text-[var(--color-muted)] text-sm flex-shrink-0 mt-1">→</span>
          </div>
        </a>
      </section>
    </>
  );
};
