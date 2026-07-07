/** @jsxImportSource hono/jsx */
import type { FC } from "hono/jsx";
import type { Lang } from "../data/content";
import uses from "../data/uses";
import { Icon } from "./Icons";

export interface UsesContentProps {
  lang: Lang;
}

const Section: FC<{ title: string; items: { name: string; description?: string; url?: string }[] }> = ({ title, items }) => (
  <section class="mb-14">
    <h2 class="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-6">{title}</h2>
    <div class="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 transition-shadow duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_4px_16px_rgba(255,255,255,0.04)]">
          <h3 class="font-medium text-sm mb-1">
            {item.url ? (
              <a href={item.url} class="link-underline" target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
            ) : (
              item.name
            )}
          </h3>
          {item.description && <p class="text-xs text-[var(--color-muted)] leading-relaxed">{item.description}</p>}
        </div>
      ))}
    </div>
  </section>
);

export const UsesContent: FC<UsesContentProps> = ({ lang }) => {
  const t = uses[lang];
  const note = lang === "fr"
    ? "Cette page est un clin d'œil à uses.tech — un classique des sites perso de devs."
    : "This page is a nod to uses.tech — a classic among developer personal sites.";

  return (
    <>
      <header class="mb-12">
        <h1 class="text-3xl font-semibold tracking-tight mb-3">{t.title}</h1>
        <p class="text-[var(--color-muted)]">{t.description}</p>
      </header>

      <Section title={lang === "fr" ? "⌨️ Éditeur" : "⌨️ Editor"} items={t.editor} />
      <Section title={lang === "fr" ? "🖥 Matériel" : "🖥 Hardware"} items={t.hardware} />
      <Section title={lang === "fr" ? "💻 Logiciels" : "💻 Software"} items={t.software} />
      <Section title={lang === "fr" ? "☁️ Services" : "☁️ Services"} items={t.services} />
      <Section title={lang === "fr" ? "🪑 Bureau" : "🪑 Desk"} items={t.desk} />

      <p class="text-xs text-[var(--color-muted)] mt-8 italic">
        <a href="https://uses.tech" class="link-underline" target="_blank" rel="noopener noreferrer">uses.tech</a>
        {" "}— {note}
      </p>
    </>
  );
};
