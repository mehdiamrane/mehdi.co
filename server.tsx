/** @jsxImportSource hono/jsx */
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { jsx } from "hono/jsx";
import type { FC } from "hono/jsx";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Base } from "./src/components/Base";
import { HomeContent } from "./src/components/HomeContent";
import { AboutContent } from "./src/components/AboutContent";
import { UsesContent } from "./src/components/UsesContent";
import { UsageGauges } from "./src/components/UsageGauges";
import { marked } from "marked";
import type { Lang } from "./src/data/content";
import { shared, blogDescription } from "./src/data/content";

const PORT = parseInt(process.env.PORT || "4321");
const BLOG_DIR = join(import.meta.dir, "src", "content", "blog");
const USAGE_JSON = join(import.meta.dir, "usage", "usage.json");
const COLLECTOR_PATH = join(import.meta.dir, "usage", "collector.ts");

// ─── Helpers ─────────────────────────────────────────────────────

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function renderPage(lang: Lang, Component: FC<{ lang: Lang }>, extra?: { title?: string; description?: string; image?: string; pathname?: string }): string {
  const t = extra || {};
  return "<!doctype html>" + String(
    jsx(Base, {
      lang,
      title: t.title || "Mehdi Amrane",
      description: t.description || "",
      image: t.image || "/og-image.png",
      pathname: t.pathname || "/",
      children: jsx(Component, { lang }),
    })
  );
}

function renderUsagePage(lang: Lang): string {
  return "<!doctype html>" + String(
    jsx(Base, {
      lang,
      title: "Usage — Mehdi Amrane",
      description: "AI services usage dashboard",
      image: "/og-image.png",
      pathname: "/usage",
      children: jsx(UsageGauges, {}),
    })
  );
}

// ─── Simple Markdown to HTML ─────────────────────────────────────

function parseFrontmatter(raw: string): { data: Record<string, any>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const data: Record<string, any> = {};
  const frontmatter = match[1];
  for (const line of frontmatter.split("\n")) {
    const kv = line.match(/^(\w+):\s*(.+)$/);
    if (kv) {
      const key = kv[1];
      let val: any = kv[2].trim();
      // Remove surrounding quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (key === "date") val = new Date(val);
      data[key] = val;
    }
  }
  return { data, body: match[2] };
}

function mdToHtml(md: string): string {
  const html = marked.parse(md) as string;
  // Strip dangerous tags (marked allows raw HTML by default)
  return html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
             .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "");
}

// ─── Blog helpers ─────────────────────────────────────────────────

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: Date;
  lang: string;
  html: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  try {
    const dir = BLOG_DIR;
    const files = Array.from(new Bun.Glob("*.md").scanSync({ cwd: dir, absolute: true }));
    for (const file of files) {
      try {
        const raw = await readFile(file.toString(), "utf-8");
        const { data, body } = parseFrontmatter(raw);
        if (data.draft === true) continue; // Skip draft posts
        posts.push({
          slug: file.toString().split("/").pop()!.replace(".md", ""),
          title: data.title || "Untitled",
          description: data.description || "",
          date: data.date instanceof Date ? data.date : new Date(data.date),
          lang: data.lang || "en",
          html: mdToHtml(body),
        });
      } catch (e) { console.warn("Failed to parse blog post:", file, e); }
    }
  } catch (e) { console.warn("Failed to read blog directory:", e); }
  return posts;
}

function renderBlogListPage(posts: BlogPost[], lang: Lang): string {
  const heading = "Blog";
  const dateFormatter = new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-US", {
    year: "numeric", month: "short", day: "numeric",
  });

  const content = (
    <>
      <header class="mb-16">
        <h1 class="text-3xl font-semibold tracking-tight">{heading}</h1>
      </header>
      <ul>
        {posts.map(post => (
          <li>
            <a
              href={lang === "fr" ? `/fr/blog/${post.slug}` : `/blog/${post.slug}`}
              class="flex items-baseline justify-between gap-4 py-3 border-b border-[var(--color-border)] transition-colors duration-150 hover:text-[var(--color-accent)]"
            >
              <span class="font-medium">{post.title}</span>
              <time datetime={post.date.toISOString()} class="text-sm text-[var(--color-muted)] whitespace-nowrap tabular-nums flex-shrink-0">
                {dateFormatter.format(post.date)}
              </time>
            </a>
          </li>
        ))}
      </ul>
    </>
  );

  return "<!doctype html>" + String(
    jsx(Base, {
      lang,
      title: "Blog — Mehdi Amrane",
      description: blogDescription[lang],
      image: "/og-image.png",
      pathname: lang === "fr" ? "/fr/blog" : "/blog",
      children: content,
    })
  );
}

function renderBlogPostPage(post: BlogPost, lang: Lang): string {
  const backHref = lang === "fr" ? "/fr/blog" : "/blog";
  const backLabel = "Blog";
  const dateFormatter = new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  const content = (
    <>
      <a href={backHref} class="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-150 mb-10">
        ← {backLabel}
      </a>
      <article>
        <header class="mb-10">
          <h1 class="text-3xl font-semibold tracking-tight mb-3">{post.title}</h1>
          <time datetime={post.date.toISOString()} class="text-sm text-[var(--color-muted)] tabular-nums">
            {dateFormatter.format(post.date)}
          </time>
        </header>
        <div class="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </>
  );

  return "<!doctype html>" + String(
    jsx(Base, {
      lang,
      title: `${post.title} — Mehdi Amrane`,
      description: post.description,
      image: "/og-image.png",
      pathname: lang === "fr" ? `/fr/blog/${post.slug}` : `/blog/${post.slug}`,
      children: content,
    })
  );
}

// ─── App ──────────────────────────────────────────────────────────

const app = new Hono();

// Cache-Control for static assets
app.use("/images/*", async (c, next) => {
  await next();
  c.res.headers.set("Cache-Control", "public, max-age=31536000, immutable");
});
app.use("/fonts/*", async (c, next) => {
  await next();
  c.res.headers.set("Cache-Control", "public, max-age=31536000, immutable");
});
app.use("/avatar.png", async (c, next) => {
  await next();
  c.res.headers.set("Cache-Control", "public, max-age=31536000, immutable");
});
app.use("/og-image.png", async (c, next) => {
  await next();
  c.res.headers.set("Cache-Control", "public, max-age=31536000, immutable");
});
app.use("/favicon.ico", async (c, next) => {
  await next();
  c.res.headers.set("Cache-Control", "public, max-age=31536000, immutable");
});
app.use("/favicon.png", async (c, next) => {
  await next();
  c.res.headers.set("Cache-Control", "public, max-age=31536000, immutable");
});

// CSP header
app.use("*", async (c, next) => {
  await next();
  c.res.headers.set("Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:");
});

// Static files
app.use("/favicon.ico", serveStatic({ path: "./public/favicon.ico" }));
app.use("/favicon.png", serveStatic({ path: "./public/favicon.png" }));
app.use("/avatar.png", serveStatic({ path: "./public/avatar.png" }));
app.use("/og-image.png", serveStatic({ path: "./public/og-image.png" }));
app.use("/robots.txt", serveStatic({ path: "./public/robots.txt" }));
app.use("/site.webmanifest", serveStatic({ path: "./public/site.webmanifest" }));
app.use("/images/*", serveStatic({ root: "./public" }));
app.use("/fonts/*", serveStatic({ root: "./public" }));

// ─── Homepage ─────────────────────────────────────────────────────

app.get("/", (c) => c.html(renderPage("en", HomeContent, {
  title: "Mehdi Amrane — Senior Front-End Developer",
  description: "Senior Front-End Developer specializing in React, Next.js, and TypeScript. Based in Paris.",
  pathname: "/",
})));
app.get("/fr/", (c) => c.html(renderPage("fr", HomeContent, {
  title: "Mehdi Amrane — Développeur Front-End Senior",
  description: "Développeur Front-End Senior spécialisé en React, Next.js et TypeScript. Basé à Paris.",
  pathname: "/fr/",
})));

// ─── Usage Dashboard ──────────────────────────────────────────────

app.get("/usage", (c) => c.html(renderUsagePage("en")));
app.get("/fr/usage", (c) => c.html(renderUsagePage("fr")));

// ─── CV Redirect ──────────────────────────────────────────────────

app.get("/cv", (c) => c.redirect(shared.cvUrl, 307));
app.get("/fr/cv", (c) => c.redirect(shared.cvUrl, 307));

// ─── About Page ────────────────────────────────────────────────────

app.get("/about", (c) => c.html(renderPage("en", AboutContent, {
  title: "About — Mehdi Amrane",
  description: "Senior Front-End Developer based in Paris. React, Next.js, TypeScript. Building SaaS and mobile apps.",
  pathname: "/about",
})));
app.get("/fr/about", (c) => c.html(renderPage("fr", AboutContent, {
  title: "À propos — Mehdi Amrane",
  description: "Développeur Front-End Senior basé à Paris. React, Next.js, TypeScript. Je construis des SaaS et des apps mobiles.",
  pathname: "/fr/about",
})));

// ─── Uses Page ─────────────────────────────────────────────────────

app.get("/uses", (c) => c.html(renderPage("en", UsesContent, {
  title: "Uses — Mehdi Amrane",
  description: "Hardware, software, and tools I use daily.",
  pathname: "/uses",
})));
app.get("/fr/uses", (c) => c.html(renderPage("fr", UsesContent, {
  title: "Uses — Mehdi Amrane",
  description: "Le matériel, les logiciels et les outils que j'utilise au quotidien.",
  pathname: "/fr/uses",
})));

// ─── API Routes ───────────────────────────────────────────────────

// Rate limit for API endpoints
const apiCooldowns = new Map<string, number>();
const API_COOLDOWN = 10_000; // 10s between API calls per IP

function checkApiRateLimit(c: any): boolean {
  const ip = c.req.header("x-forwarded-for") || c.req.header("x-real-ip") || "unknown";
  const last = apiCooldowns.get(ip);
  const now = Date.now();
  if (last && (now - last) < API_COOLDOWN) return false;
  apiCooldowns.set(ip, now);
  return true;
}

app.get("/api/usage", async (c) => {
  if (!checkApiRateLimit(c)) return c.json({ error: "Rate limited" }, 429);
  try {
    const raw = await readFile(USAGE_JSON, "utf-8");
    const data = JSON.parse(raw);
    return c.json(data);
  } catch {
    return c.json({ error: "No data yet", updated: null, services: {} }, 503);
  }
});

// Simple rate limiter for /api/refresh
const refreshCooldowns = new Map<string, number>();
const REFRESH_COOLDOWN = 60_000; // 1 minute between refreshes

app.post("/api/refresh", async (c) => {
  const ip = c.req.header("x-forwarded-for") || c.req.header("x-real-ip") || "unknown";
  const last = refreshCooldowns.get(ip);
  const now = Date.now();
  if (last && (now - last) < REFRESH_COOLDOWN) {
    return c.json({ error: "Rate limited — try again in " + Math.ceil((REFRESH_COOLDOWN - (now - last)) / 1000) + "s" }, 429);
  }
  refreshCooldowns.set(ip, now);

  const proc = Bun.spawn(["bun", "run", COLLECTOR_PATH], {
    stdout: "pipe",
    stderr: "pipe",
    cwd: join(import.meta.dir, "usage"),
  });
  const timeout = setTimeout(() => { proc.kill(); }, 30_000);

  const output = await new Response(proc.stdout).text();
  await proc.exited;
  clearTimeout(timeout);

  if (proc.exitCode !== 0) {
    return c.json({ error: "Collector failed", output }, 500);
  }

  const raw = await readFile(USAGE_JSON, "utf-8");
  return c.json(JSON.parse(raw));
});

// ─── Blog Routes ──────────────────────────────────────────────────

app.get("/blog", async (c) => {
  const allPosts = await getBlogPosts();
  const posts = allPosts.filter(p => p.lang === "en").sort((a, b) => b.date.getTime() - a.date.getTime());
  return c.html(renderBlogListPage(posts, "en"));
});

app.get("/fr/blog", async (c) => {
  const allPosts = await getBlogPosts();
  const posts = allPosts.filter(p => p.lang === "fr").sort((a, b) => b.date.getTime() - a.date.getTime());
  return c.html(renderBlogListPage(posts, "fr"));
});

app.get("/blog/:slug", async (c) => {
  const slug = c.req.param("slug");
  const allPosts = await getBlogPosts();
  const post = allPosts.find(p => p.slug === slug && p.lang === "en");
  if (!post) return c.notFound();
  return c.html(renderBlogPostPage(post, "en"));
});

app.get("/fr/blog/:slug", async (c) => {
  const slug = c.req.param("slug");
  const allPosts = await getBlogPosts();
  const post = allPosts.find(p => p.slug === slug && p.lang === "fr");
  if (!post) return c.notFound();
  return c.html(renderBlogPostPage(post, "fr"));
});

// ─── Sitemap ───────────────────────────────────────────────────────

app.get("/sitemap.xml", async (c) => {
  const allPosts = await getBlogPosts();
  const baseUrl = "https://mehdi.co";

  const staticPages = [
    { loc: "/", changefreq: "monthly", priority: "1.0" },
    { loc: "/fr/", changefreq: "monthly", priority: "1.0" },
    { loc: "/usage", changefreq: "daily", priority: "0.8" },
    { loc: "/fr/usage", changefreq: "daily", priority: "0.8" },
    { loc: "/blog", changefreq: "weekly", priority: "0.9" },
    { loc: "/fr/blog", changefreq: "weekly", priority: "0.9" },
    { loc: "/cv", changefreq: "monthly", priority: "0.7" },
    { loc: "/fr/cv", changefreq: "monthly", priority: "0.7" },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const page of staticPages) {
    xml += `  <url>\n    <loc>${baseUrl}${page.loc}</loc>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>\n`;
  }

  for (const post of allPosts) {
    const loc = post.lang === "fr" ? `/fr/blog/${post.slug}` : `/blog/${post.slug}`;
    const lastmod = post.date instanceof Date ? post.date.toISOString() : new Date(post.date).toISOString();
    xml += `  <url>\n    <loc>${baseUrl}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
  }

  xml += `</urlset>`;

  return c.text(xml, 200, { "Content-Type": "application/xml" });
});

// ─── RSS Feed ──────────────────────────────────────────────────────

function renderRss(posts: BlogPost[], lang: "en" | "fr"): string {
  const baseUrl = "https://mehdi.co";
  const isFr = lang === "fr";
  const title = isFr ? "Mehdi Amrane — Blog" : "Mehdi Amrane — Blog";
  const desc = isFr ? "Articles de Mehdi Amrane sur le développement front-end." : "Blog posts by Mehdi Amrane on front-end development.";
  const feedPath = isFr ? "/fr/rss.xml" : "/rss.xml";

  const items = posts
    .filter(p => p.lang === lang)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map(post => {
      const loc = `/blog/${post.slug}`;
      const pubDate = post.date instanceof Date ? post.date.toUTCString() : new Date(post.date).toUTCString();
      return `    <item xml:lang="${lang}">\n      <title>${escapeXml(post.title)}</title>\n      <link>${baseUrl}${loc}</link>\n      <description>${escapeXml(post.description)}</description>\n      <pubDate>${pubDate}</pubDate>\n      <guid>${baseUrl}${loc}</guid>\n    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>${title}</title>\n    <link>${baseUrl}</link>\n    <description>${desc}</description>\n    <language>${lang}</language>\n    <atom:link href="${baseUrl}${feedPath}" rel="self" type="application/rss+xml"/>\n${items}\n  </channel>\n</rss>`;
}

app.get("/rss.xml", async (c) => {
  const posts = await getBlogPosts();
  return c.text(renderRss(posts, "en"), 200, { "Content-Type": "application/rss+xml" });
});

app.get("/fr/rss.xml", async (c) => {
  const posts = await getBlogPosts();
  return c.text(renderRss(posts, "fr"), 200, { "Content-Type": "application/rss+xml" });
});

// ─── Health ───────────────────────────────────────────────────────

app.get("/health", (c) => c.json({ status: "ok" }));

// ─── CMS Page System ───────────────────────────────────────────────

const PAGES_DIR = join(import.meta.dir, "src", "content", "pages");

app.get("/:page", async (c) => {
  const page = c.req.param("page");
  // Skip reserved paths
  if (["blog", "usage", "cv", "api", "health", "rss.xml", "sitemap.xml", "favicon.ico", "favicon.png", "robots.txt", "site.webmanifest", "about", "uses"].includes(page)) {
    return c.notFound();
  }

  const filePath = join(PAGES_DIR, `${page}.en.md`);
  try {
    const raw = await readFile(filePath, "utf-8");
    const { data, body } = parseFrontmatter(raw);
    if (data.draft === true) return c.notFound();

    const html = mdToHtml(body);
    const title = data.title || page;
    const description = data.description || "";

    return c.html(renderPage("en", () => (
      <article>
        <header class="mb-10">
          <h1 class="text-3xl font-semibold tracking-tight mb-3">{title}</h1>
          {data.date && (
            <time datetime={new Date(data.date).toISOString()} class="text-sm text-[var(--color-muted)] tabular-nums">
              {new Date(data.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </time>
          )}
        </header>
        <div class="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    ), {
      title: `${title} — Mehdi Amrane`,
      description,
      pathname: `/${page}`,
    }));
  } catch {
    return c.notFound();
  }
});

app.get("/fr/:page", async (c) => {
  const page = c.req.param("page");
  if (["blog", "usage", "cv", "api", "health", "rss.xml", "sitemap.xml", "favicon.ico", "favicon.png", "robots.txt", "site.webmanifest", "about", "uses"].includes(page)) {
    return c.notFound();
  }

  const filePath = join(PAGES_DIR, `${page}.fr.md`);
  try {
    const raw = await readFile(filePath, "utf-8");
    const { data, body } = parseFrontmatter(raw);
    if (data.draft === true) return c.notFound();

    const html = mdToHtml(body);
    const title = data.title || page;
    const description = data.description || "";

    return c.html(renderPage("fr", () => (
      <article>
        <header class="mb-10">
          <h1 class="text-3xl font-semibold tracking-tight mb-3">{title}</h1>
          {data.date && (
            <time datetime={new Date(data.date).toISOString()} class="text-sm text-[var(--color-muted)] tabular-nums">
              {new Date(data.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
            </time>
          )}
        </header>
        <div class="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    ), {
      title: `${title} — Mehdi Amrane`,
      description,
      pathname: `/fr/${page}`,
    }));
  } catch {
    return c.notFound();
  }
});

// ─── 404 ───────────────────────────────────────────────────────────

app.notFound((c) => {
  const isFr = c.req.path.startsWith("/fr");
  const lang: Lang = isFr ? "fr" : "en";
  const txt = isFr
    ? { title: "404 — Page introuvable", msg: "Cette page n'existe pas.", back: "← Retour" }
    : { title: "404 — Page not found", msg: "This page doesn't exist.", back: "← Back home" };
  return c.html(renderPage(lang, () => (
    <div class="text-center py-24">
      <h1 class="text-6xl font-bold text-[var(--color-muted)] mb-4">404</h1>
      <p class="text-[var(--color-muted)] mb-6">{txt.msg}</p>
      <a href={isFr ? "/fr/" : "/"} class="text-[var(--color-accent)] hover:underline">{txt.back}</a>
    </div>
  ), { title: txt.title, pathname: c.req.path }), 404);
}, 404);

// ─── Error handler ─────────────────────────────────────────────────

app.onError((err, c) => {
  console.error("Server error:", err);
  const isFr = c.req.path.startsWith("/fr");
  const lang: Lang = isFr ? "fr" : "en";
  const txt = isFr
    ? { title: "500 — Erreur serveur", msg: "Une erreur est survenue.", back: "← Retour" }
    : { title: "500 — Server error", msg: "Something went wrong.", back: "← Back home" };
  return c.html(renderPage(lang, () => (
    <div class="text-center py-24">
      <h1 class="text-6xl font-bold text-[var(--color-muted)] mb-4">500</h1>
      <p class="text-[var(--color-muted)] mb-6">{txt.msg}</p>
      <a href={isFr ? "/fr/" : "/"} class="text-[var(--color-accent)] hover:underline">{txt.back}</a>
    </div>
  ), { title: txt.title, pathname: c.req.path }), 500);
});

// ─── Start ────────────────────────────────────────────────────────

console.log(`🚀 mehdi.co running on http://0.0.0.0:${PORT}`);
export default { port: PORT, fetch: app.fetch };
