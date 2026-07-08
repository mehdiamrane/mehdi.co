/** @jsxImportSource hono/jsx */
import type { FC } from "hono/jsx";
import type { Lang } from "../data/content";
import content, { techIcons, techStackCategories } from "../data/content";
import { Icon } from "./Icons";

export interface AboutContentProps {
  lang: Lang;
}

export const AboutContent: FC<AboutContentProps> = ({ lang }) => {
  const t = content[lang];
  const isFr = lang === "fr";

  const title = isFr ? "À propos" : "About";

  const bio1 = isFr
    ? "Je suis développeur front-end senior basé à Paris. Je passe mes journées à concevoir des interfaces, architecturer des codebases React, et construire des produits SaaS de A à Z."
    : "I'm a senior front-end developer based in Paris. I spend my days designing interfaces, architecting React codebases, and building SaaS products end-to-end.";

  const bio2 = isFr
    ? "Actuellement co-fondateur d'Inkvoice, un SaaS mobile-first pour les tatoueurs. J'ai précédemment piloté le shop et l'espace client chez Shadow, monté une librairie de composants de 50+ éléments chez Oxeva, et formé des développeurs en reconversion à La Capsule."
    : "Currently co-founding Inkvoice, a mobile-first SaaS for tattoo artists. Previously led the shop & customer portal at Shadow, built a 50+ component library at Oxeva, and trained career-changing developers at La Capsule.";

  const bio3 = isFr
    ? "Je suis animé par l'architecture front-end propre, les outils qui font gagner du temps, et l'écosystème React. Ces derniers mois, je plonge dans les agents de code IA (Claude Code, Cursor, Codex) et les stacks minimalistes sans build step. Ce site tourne avec 2 dépendances et zéro build — c'est un manifeste."
    : "I'm driven by clean front-end architecture, tools that save time, and the React ecosystem. Lately I've been deep into AI coding agents (Claude Code, Cursor, Codex) and minimalist zero-build stacks. This site runs on 2 dependencies and zero build steps — it's a statement.";

  return (
    <>
      {/* Hero */}
      <header class="mb-16">
        <h1 class="text-3xl font-semibold tracking-tight">{title}</h1>
      </header>

      {/* Bio narrative */}
      <section class="mb-16">
        <div class="prose max-w-none">
          <p class="text-lg leading-relaxed text-[var(--color-muted)]">{bio1}</p>
          <p class="leading-relaxed">{bio2}</p>
          <p class="leading-relaxed">{bio3}</p>
        </div>
      </section>

      {/* Journey timeline — all jobs, all highlights, all techs, all images */}
      <section class="mb-16">
        <h2 class="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-10">
          {isFr ? "Parcours" : "Journey"}
        </h2>
        <div class="space-y-10">
          {t.experience.map((job) => (
            <div class="border-l-2 border-[var(--color-border)] pl-6 pb-2 relative">
              <div class="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              {job.image && (
                <div class="mb-3 -ml-3 overflow-hidden rounded-xl border border-[var(--color-border)]">
                  {job.url ? (
                    <a href={job.url} target="_blank" rel="noopener noreferrer" class="block overflow-hidden">
                      <img src={job.image} alt={job.imageAlt || job.company} loading="lazy" class="w-full h-32 sm:h-40 object-cover transition-transform duration-500 hover:scale-[1.04]" />
                    </a>
                  ) : (
                    <img src={job.image} alt={job.imageAlt || job.company} loading="lazy" class="w-full h-32 sm:h-40 object-cover" />
                  )}
                </div>
              )}
              <div class="flex items-baseline justify-between gap-4 mb-2">
                <h3 class="font-semibold">{job.role}</h3>
                <span class="text-sm text-[var(--color-muted)] whitespace-nowrap tabular-nums">{job.period}</span>
              </div>
              <p class="text-sm text-[var(--color-muted)] mb-3">
                {job.url ? (
                  <a href={job.url} class="link-underline font-medium text-[var(--color-text)]" target="_blank" rel="noopener noreferrer">
                    {job.company}
                  </a>
                ) : (
                  <span class="font-medium text-[var(--color-text)]">{job.company}</span>
                )}
                <span class="mx-1.5">·</span>
                {job.location}
              </p>
              <ul class="list-disc list-outside ml-4 space-y-1.5 text-sm text-[var(--color-muted)] mb-3">
                {job.highlights.map((h) => (
                  <li>{h}</li>
                ))}
              </ul>
              {job.techs.length > 0 && (
                <div class="flex flex-wrap gap-1.5">
                  {job.techs.map((tech) => (
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full border border-[var(--color-border)] text-[var(--color-muted)]">
                      {techIcons[tech] && <img src={techIcons[tech]} alt="" width="10" height="10" class="w-2.5 h-2.5 object-contain" />}
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section class="mb-16">
        <h2 class="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-6">{t.educationTitle}</h2>
        <div class="space-y-4">
          {t.education.map((edu) => (
            <div class="flex items-baseline justify-between gap-4">
              <div>
                <h3 class="font-semibold">{edu.school}</h3>
                <p class="text-sm text-[var(--color-muted)]">{edu.degree} · {edu.location}</p>
              </div>
              <span class="text-sm text-[var(--color-muted)] whitespace-nowrap tabular-nums">{edu.period}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack — full categories */}
      <section class="mb-16">
        <h2 class="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-6">{t.techStackTitle}</h2>
        <div class="space-y-5">
          {techStackCategories[lang].map((category) => (
            <div>
              <h3 class="text-xs font-medium text-[var(--color-muted)] mb-2">{category.label}</h3>
              <div class="flex flex-wrap gap-2">
                {category.items.map((tech) => (
                  <span class="inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-[var(--color-card)] border border-[var(--color-border)] rounded-full text-[var(--color-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-colors duration-200 cursor-default">
                    {techIcons[tech] && <img src={techIcons[tech]} alt="" width="16" height="16" class="w-4 h-4 object-contain flex-shrink-0" />}
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 class="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-6">
          {isFr ? "Me contacter" : "Get in touch"}
        </h2>
        <p class="text-[var(--color-muted)] mb-5">
          {isFr
            ? "Toujours ouvert aux discussions — projet, collaboration, ou juste échanger sur la tech."
            : "Always open to chat — project, collaboration, or just talking tech."}
        </p>
        <div class="flex flex-wrap items-center gap-x-5 gap-y-2 mb-7">
          <span class="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)]">
            <Icon name="map-pin" size={14} />
            {t.contact.location}
          </span>
        </div>
        <div class="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {t.contact.links.map((link) => (
            <a href={link.href} class="link-underline inline-flex items-center gap-2 text-[var(--color-muted)]" target="_blank" rel="noopener noreferrer">
              <Icon name={link.icon} size={14} />
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </>
  );
};
