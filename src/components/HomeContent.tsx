/** @jsxImportSource hono/jsx */
import type { FC } from "hono/jsx";
import type { Lang } from "../data/content";
import content from "../data/content";
import { Icon } from "./Icons";

export interface HomeContentProps {
  lang: Lang;
}

export const HomeContent: FC<HomeContentProps> = ({ lang }) => {
  const t = content[lang];
  const isFr = lang === "fr";

  const aboutHref = isFr ? "/fr/about" : "/about";
  const blogHref = isFr ? "/fr/blog" : "/blog";
  const usesHref = isFr ? "/fr/uses" : "/uses";

  const blurb = isFr
    ? "Je construis des SaaS et des apps mobiles à Paris. Je co-fonde Inkvoice, un outil mobile-first pour les tatoueurs."
    : "Building SaaS products and mobile apps in Paris. Co-founding Inkvoice, a mobile-first tool for tattoo artists.";

  const navCards = [
    {
      href: aboutHref,
      label: isFr ? "À propos" : "About",
      description: isFr
        ? "Mon parcours, ma stack, mon histoire."
        : "My journey, my stack, my story.",
    },
    {
      href: blogHref,
      label: "Blog",
      description: isFr
        ? "Notes sur le dev front-end et les outils."
        : "Notes on front-end dev and tools.",
    },
    {
      href: usesHref,
      label: isFr ? "Uses" : "Uses",
      description: isFr
        ? "Mon setup hardware, logiciels et services."
        : "My hardware, software, and service setup.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <header class="mb-16">
        <div class="flex flex-col sm:flex-row items-start gap-5 mb-6">
          <div class="w-[88px] h-[88px] rounded-full ring-2 ring-[var(--color-border)] flex-shrink-0 overflow-hidden">
            <img
              src="/avatar.png"
              alt={t.hero.name}
              class="w-full h-full rounded-full object-cover scale-[1.25]"
              width="88" height="88"
            />
          </div>
          <div>
            <h1 class="text-3xl font-semibold tracking-tight mb-2">{t.hero.name}</h1>
            <p class="text-[var(--color-muted)] leading-relaxed max-w-md">
              {t.hero.description}
            </p>
          </div>
        </div>

        <div class="inline-flex items-center gap-1.5 text-xs mb-4">
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[var(--color-card)] border border-[var(--color-border)] rounded-full text-[var(--color-muted)]">
            <span class="relative flex h-1.5 w-1.5">
              <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            {t.contact.status}
          </span>
        </div>

        <nav class="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {t.links.map(link => (
            <a
              href={link.href}
              class="link-underline inline-flex items-center gap-2 text-[var(--color-muted)]"
              {...(link.external !== false ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Icon name={link.icon} size={16} />
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      {/* Intro blurb */}
      <section class="mb-16">
        <p class="text-base leading-relaxed text-[var(--color-muted)] max-w-lg">
          {blurb}
        </p>
      </section>

      {/* Nav cards — minimalist navigation */}
      <section class="space-y-3">
        {navCards.map((card) => (
          <a
            href={card.href}
            class="group block rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-4 transition-all duration-200 hover:border-[var(--color-accent)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_4px_16px_rgba(255,255,255,0.04)]"
          >
            <div class="flex items-center justify-between">
              <div>
                <h2 class="font-medium text-sm">{card.label}</h2>
                <p class="text-xs text-[var(--color-muted)] mt-0.5">{card.description}</p>
              </div>
              <span class="text-[var(--color-muted)] text-sm group-hover:text-[var(--color-accent)] transition-colors duration-200">→</span>
            </div>
          </a>
        ))}
      </section>
    </>
  );
};
