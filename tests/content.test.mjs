import test from "node:test";
import assert from "node:assert/strict";
import { validatePost, readingTime } from "../lib/content.js";
const post = {
  title: "A useful note",
  slug: "useful-note",
  excerpt: "A short introduction.",
  body: "## Hello\n\nSome ideas.",
  category: "Thought",
  date: "2026-11-04",
  tags: ["learning"],
};
test("all four publishing categories produce valid posts", () => {
  for (const category of ["Essay", "Thought", "Progress", "Achievement"])
    assert.equal(validatePost({ ...post, category }).category, category);
});
test("rejects paths and noncanonical slugs", () => {
  for (const slug of [
    "../secret",
    "a/b",
    "A-title",
    "-title",
    "a--b",
    "a.json",
    "",
  ])
    assert.throws(() => validatePost({ ...post, slug }));
});
test("rejects impossible dates and invalid categories", () => {
  assert.throws(() => validatePost({ ...post, date: "2026-02-30" }));
  assert.throws(() => validatePost({ ...post, category: "Other" }));
});
test("bounds post content and tags", () => {
  assert.throws(() => validatePost({ ...post, body: "a".repeat(50001) }));
  assert.throws(() => validatePost({ ...post, tags: ["a".repeat(33)] }));
  assert.throws(() => validatePost({ ...post, tags: Array(7).fill("a") }));
});
test("only whitelisted public fields leave the validator", () => {
  const p = validatePost({
    ...post,
    token: "private",
    sha: "abc",
    id: "draft-id",
    title: "  A useful note  ",
  });
  assert.equal(p.title, post.title);
  assert.equal(p.token, undefined);
  assert.equal(p.sha, undefined);
  assert.equal(p.id, undefined);
});
test("reading time has a minimum of one minute", () => {
  assert.equal(readingTime(""), 1);
  assert.equal(readingTime(Array(441).fill("word").join(" ")), 3);
});
