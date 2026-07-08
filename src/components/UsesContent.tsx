/** @jsxImportSource hono/jsx */
import type { FC } from "hono/jsx";
import type { Lang } from "../data/content";
import uses from "../data/uses";
import type { UsesItem } from "../data/uses";

export interface UsesContentProps {
  lang: Lang;
}

const ItemRow: FC<{ item: UsesItem }> = ({ item }) => (
  <div class="flex items-start gap-3 py-3">
    {item.image ? (
      <img
        src={item.image}
        alt=""
        width={32}
        height={32}
        class="shrink-0 mt-0.5"
        loading="lazy"
      />
    ) : (
      <div class="w-8 shrink-0" />
    )}
    <div class="min-w-0 flex-1">
      {item.url ? (
        <a href={item.url} class="font-medium text-sm link-underline" target="_blank" rel="noopener noreferrer">
          {item.name}
        </a>
      ) : (
        <span class="font-medium text-sm">{item.name}</span>
      )}
      {item.description && (
        <p class="text-xs text-[var(--color-muted)] leading-relaxed mt-0.5">{item.description}</p>
      )}
    </div>
  </div>
);

const Section: FC<{ title: string; items: UsesItem[] }> = ({ title, items }) => (
  <section class="mb-10">
    <h2 class="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-4">{title}</h2>
    <div class="divide-y divide-[var(--color-border)]">
      {items.map((item) => (
        <ItemRow item={item} />
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
