import { readdir, readFile } from "node:fs/promises";
import { validatePost } from "../lib/content.js";
export async function readPosts() {
  const names = await readdir(new URL("../content/posts/", import.meta.url));
  const posts = await Promise.all(
    names
      .filter((n) => n.endsWith(".json"))
      .map(async (name) => {
        const raw = JSON.parse(
          await readFile(
            new URL(`../content/posts/${name}`, import.meta.url),
            "utf8",
          ),
        );
        const post = validatePost(raw);
        if (`${post.slug}.json` !== name)
          throw new Error(`Post filename must match its slug: ${name}`);
        if (Object.keys(raw).some((k) => !Object.hasOwn(post, k)))
          throw new Error(
            `Unexpected fields in ${name}; only published post fields belong here.`,
          );
        return post;
      }),
  );
  return posts.sort(
    (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
  );
}
await readPosts().then((posts) =>
  console.log(`Validated ${posts.length} published posts.`),
);
