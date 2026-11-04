export const categories = ["Essay", "Thought", "Progress", "Achievement"];
export const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export function validatePost(input) {
  if (!input || typeof input !== "object")
    throw new Error("A post is required.");
  const limits = { title: 140, slug: 100, excerpt: 320, body: 50000 };
  for (const [key, max] of Object.entries(limits)) {
    if (
      typeof input[key] !== "string" ||
      !input[key].trim() ||
      input[key].length > max
    )
      throw new Error(`${key} must contain 1–${max} characters.`);
  }
  if (!slugPattern.test(input.slug))
    throw new Error("Use lowercase words separated by hyphens for the URL.");
  if (!categories.includes(input.category))
    throw new Error("Choose a valid category.");
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(input.date) ||
    !Number.isFinite(Date.parse(input.date)) ||
    new Date(input.date).toISOString().slice(0, 10) !== input.date
  )
    throw new Error("Choose a valid date.");
  if (
    !Array.isArray(input.tags) ||
    input.tags.length > 6 ||
    input.tags.some((t) => typeof t !== "string" || !t.trim() || t.length > 32)
  )
    throw new Error("Use up to six tags of 1–32 characters.");
  return {
    title: input.title.trim(),
    slug: input.slug,
    excerpt: input.excerpt.trim(),
    body: input.body.trim(),
    category: input.category,
    date: input.date,
    tags: [...new Set(input.tags.map((t) => t.trim()))],
  };
}
export function readingTime(body) {
  return Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 220));
}
export function displayDate(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
