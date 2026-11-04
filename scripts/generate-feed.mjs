import { writeFile, readFile, mkdir } from "node:fs/promises";
import { readPosts } from "./validate-content.mjs";
const base = new URL(
  process.env.SITE_URL || "https://my-portfolio-zeta-swart-59.vercel.app",
).origin;
const posts = await readPosts();
const esc = (s) =>
  s.replace(
    /[<>&"']/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c],
  );
const rss = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Abhav Arora — The Open Notebook</title><link>${base}/#journal</link><description>Essays, thoughts, progress, and achievements.</description><language>en</language>${posts.map((p) => `<item><title>${esc(p.title)}</title><link>${base}/journal/${p.slug}</link><guid>${base}/journal/${p.slug}</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${esc(p.excerpt)}</description><category>${esc(p.category)}</category></item>`).join("")}</channel></rss>`;
await writeFile("dist/feed.xml", rss);
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${base}/</loc></url>${posts.map((p) => `<url><loc>${base}/journal/${p.slug}</loc><lastmod>${p.date}</lastmod></url>`).join("")}</urlset>`,
);
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nDisallow: /studio\nDisallow: /api/\nSitemap: ${base}/sitemap.xml\n`,
);
const template = await readFile("dist/index.html", "utf8");
for (const p of posts) {
  const html = template
    .replace(
      /<title>.*?<\/title>/,
      `<title>${esc(p.title)} — Abhav Arora</title>`,
    )
    .replace(
      /<meta name="description" content="[^"]*"\s*\/>/,
      `<meta name="description" content="${esc(p.excerpt)}" />`,
    )
    .replace(
      "</head>",
      `<link rel="canonical" href="${base}/journal/${p.slug}"/><meta property="og:title" content="${esc(p.title)}"/><meta property="og:description" content="${esc(p.excerpt)}"/><meta property="og:type" content="article"/><meta property="og:url" content="${base}/journal/${p.slug}"/></head>`,
    );
  await mkdir(`dist/journal/${p.slug}`, { recursive: true });
  await writeFile(`dist/journal/${p.slug}/index.html`, html);
}
console.log("Generated RSS, sitemap, robots.txt, and article metadata.");
