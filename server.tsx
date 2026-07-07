/** @jsxImportSource hono/jsx */
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { jsx } from "hono/jsx";
import type { FC } from "hono/jsx";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Base } from "./src/components/Base";
import { HomeContent } from "./src/components/HomeContent";
import { UsageGauges } from "./src/components/UsageGauges";
import { Icon } from "./src/components/Icons";
import type { Lang } from "./src/data/content";

const PORT = parseInt(process.env.PORT || "4321");
const CV_URL = "https://drive.google.com/drive/folders/1HeYTn72Iy9IqNsPSv6_5kWeDEiaAbjze?usp=sharing";
const BLOG_DIR = join(import.meta.dir, "src", "content", "blog");
const USAGE_JSON = join(import.meta.dir, "usage", "usage.json");
const COLLECTOR_PATH = join(import.meta.dir, "usage", "collector.ts");

// ─── Helpers ─────────────────────────────────────────────────────

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
      image: "/og/home.png",
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
  let html = md;

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Headings (must be before paragraphs)
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr />");

  // Unordered lists — group consecutive list items
  // First wrap each list item
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  // Then wrap consecutive <li> blocks in <ul>
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>");

  // Paragraphs: wrap lines that aren't already HTML block elements
  const lines = html.split("\n");
  const result: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      result.push("");
      continue;
    }
    // Skip lines that start with HTML tags
    if (trimmed.match(/^<(h[1-6]|ul|ol|li|hr|div|pre|blockquote|p)/)) {
      result.push(line);
    } else {
      result.push(`<p>${trimmed}</p>`);
    }
  }
  html = result.join("\n");

  return html;
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
        posts.push({
          slug: file.toString().split("/").pop()!.replace(".md", ""),
          title: data.title || "Untitled",
          description: data.description || "",
          date: data.date instanceof Date ? data.date : new Date(data.date),
          lang: data.lang || "en",
          html: mdToHtml(body),
        });
      } catch {}
    }
  } catch {}
  return posts;
}

function renderBlogListPage(posts: BlogPost[], lang: Lang): string {
  const heading = "Blog";
  const descEn = "Notes on front-end development, tools, and building things.";
  const descFr = "Notes sur le développement front-end, les outils, et la construction de projets.";
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
      description: lang === "fr" ? descFr : descEn,
      image: "/og/blog.png",
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
      image: `/og/${post.slug}.png`,
      pathname: lang === "fr" ? `/fr/blog/${post.slug}` : `/blog/${post.slug}`,
      children: content,
    })
  );
}

// ─── App ──────────────────────────────────────────────────────────

const app = new Hono();

// Static files
app.use("/favicon.ico", serveStatic({ path: "./public/favicon.ico" }));
app.use("/favicon.png", serveStatic({ path: "./public/favicon.png" }));
app.use("/avatar.png", serveStatic({ path: "./public/avatar.png" }));
app.use("/og-image.png", serveStatic({ path: "./public/og-image.png" }));
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

app.get("/cv", (c) => c.redirect(CV_URL, 307));
app.get("/fr/cv", (c) => c.redirect(CV_URL, 307));

// ─── API Routes ───────────────────────────────────────────────────

app.get("/api/usage", async (c) => {
  try {
    const raw = await readFile(USAGE_JSON, "utf-8");
    const data = JSON.parse(raw);
    return c.json(data);
  } catch {
    return c.json({ error: "No data yet", updated: null, services: {} }, 503);
  }
});

app.post("/api/refresh", async (c) => {
  const proc = Bun.spawn(["bun", "run", COLLECTOR_PATH], {
    stdout: "pipe",
    stderr: "pipe",
    cwd: join(import.meta.dir, "usage"),
  });
  const output = await new Response(proc.stdout).text();
  await proc.exited;

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

// ─── Health ───────────────────────────────────────────────────────

app.get("/health", (c) => c.json({ status: "ok" }));

// ─── Start ────────────────────────────────────────────────────────

console.log(`🚀 mehdi.co running on http://0.0.0.0:${PORT}`);
export default { port: PORT, fetch: app.fetch };
