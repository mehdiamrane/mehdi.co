/** @jsxImportSource hono/jsx */
import type { FC } from "hono/jsx";
import type { Lang } from "../data/content";
import content from "../data/content";
import { Icon } from "./Icons";

export interface AboutContentProps {
  lang: Lang;
}

export const AboutContent: FC<AboutContentProps> = ({ lang }) => {
  const t = content[lang];
  const isFr = lang === "fr";

  const title = isFr ? "À propos" : "About";
  const bio1 = isFr
    ? "Je suis développeur front-end senior basé à Paris, spécialisé en React, Next.js et TypeScript. Je construis des SaaS, des applications mobiles, et des codebases propres et maintenables."
    : "I'm a senior front-end developer based in Paris, specializing in React, Next.js, and TypeScript. I build SaaS products, mobile apps, and clean, maintainable codebases.";

  const bio2 = isFr
    ? "Actuellement, je co-fonde Inkvoice, un SaaS mobile-first pour les tatoueurs. Avant ça, j'ai travaillé chez Shadow, Oxeva, et en freelance. J'ai aussi enseigné le développement web à La Capsule, formant des personnes en reconversion professionnelle."
    : "Currently, I'm co-founding Inkvoice, a mobile-first SaaS for tattoo artists. Before that, I worked at Shadow, Oxeva, and as a freelancer. I've also taught web development at La Capsule, training career changers.";

  const bio3 = isFr
    ? "Je suis passionné par l'architecture front-end, les outils de développement, et l'écosystème React. Ces derniers temps, je m'intéresse beaucoup aux agents IA pour le développement (Claude Code, Cursor, Codex) et aux stacks minimalistes sans build step."
    : "I'm passionate about front-end architecture, developer tooling, and the React ecosystem. Lately, I've been deep into AI coding agents (Claude Code, Cursor, Codex) and minimalist zero-build stacks.";

  const journeyTitle = isFr ? "Mon parcours" : "My journey";
  const contactTitle = isFr ? "Me contacter" : "Get in touch";
  const contactText = isFr
    ? "Je suis toujours ouvert aux discussions — que ce soit pour un projet, une collaboration, ou juste échanger sur la tech."
    : "I'm always open to chat — whether it's about a project, a collaboration, or just talking tech.";

  return (
    <>
      <header class="mb-16">
        <h1 class="text-3xl font-semibold tracking-tight">{title}</h1>
      </header>

      {/* Bio */}
      <section class="mb-16">
        <div class="prose max-w-none">
          <p class="text-lg leading-relaxed text-[var(--color-muted)]">{bio1}</p>
          <p class="leading-relaxed">{bio2}</p>
          <p class="leading-relaxed">{bio3}</p>
        </div>
      </section>

      {/* Journey / Timeline */}
      <section class="mb-16">
        <h2 class="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-10">{journeyTitle}</h2>
        <div class="space-y-8">
          {t.experience.map((job) => (
            <div class="border-l-2 border-[var(--color-border)] pl-6 pb-2 relative">
              <div class="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              <div class="flex items-baseline justify-between gap-4 mb-1">
                <h3 class="font-semibold">{job.role}</h3>
                <span class="text-sm text-[var(--color-muted)] whitespace-nowrap tabular-nums">{job.period}</span>
              </div>
              <p class="text-sm text-[var(--color-muted)] mb-2">
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
              <ul class="list-disc list-outside ml-4 space-y-1 text-sm text-[var(--color-muted)]">
                {job.highlights.slice(0, 2).map((h) => (
                  <li>{h}</li>
                ))}
              </ul>
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

      {/* Contact */}
      <section>
        <h2 class="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-6">{contactTitle}</h2>
        <p class="text-[var(--color-muted)] mb-6">{contactText}</p>
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
