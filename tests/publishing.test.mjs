import test, { afterEach } from "node:test";
import assert from "node:assert/strict";
import { seal, unseal } from "../lib/session.js";
import handler from "../api/studio.js";
const key = "test-only-session-secret-at-least-32-characters";
const originalFetch = global.fetch;
const env = { ...process.env };
afterEach(() => {
  global.fetch = originalFetch;
  for (const k of [
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",
    "SESSION_SECRET",
    "SITE_URL",
    "VERCEL_ENV",
  ]) {
    if (env[k] === undefined) delete process.env[k];
    else process.env[k] = env[k];
  }
});
function configure() {
  Object.assign(process.env, {
    GITHUB_CLIENT_ID: "test-client",
    GITHUB_CLIENT_SECRET: "test-secret",
    SESSION_SECRET: key,
    SITE_URL: "https://portfolio.example",
    VERCEL_ENV: "production",
  });
}
function response() {
  return {
    headers: {},
    statusCode: 200,
    setHeader(k, v) {
      this.headers[k] = v;
    },
    status(n) {
      this.statusCode = n;
      return this;
    },
    json(v) {
      this.body = v;
      return this;
    },
    end() {},
  };
}
function request(action, options = {}) {
  const token = seal(
    { id: 212839806, login: "abhav-arora", token: "test-token" },
    key,
  );
  return {
    url: `/api/studio?action=${action}`,
    method: "GET",
    headers: {
      cookie: `__Host-aa-session=${token}`,
      origin: "https://portfolio.example",
      "content-type": "application/json",
    },
    ...options,
  };
}
const post = {
  title: "Test note",
  slug: "test-note",
  excerpt: "A test.",
  body: "A useful idea.",
  category: "Thought",
  date: "2026-11-04",
  tags: [],
};
test("session encryption rejects tampering, expiration, and wrong keys", () => {
  const value = seal({ token: "secret" }, key);
  assert.equal(unseal(value, key).token, "secret");
  assert.equal(unseal(value, "another-secret-at-least-32-characters"), null);
  assert.equal(unseal(value.slice(0, 20) + "X" + value.slice(21), key), null);
  assert.equal(unseal(seal({ token: "old" }, key, -1), key), null);
});
test("unconfigured and preview deployments never allow publishing", async () => {
  configure();
  process.env.VERCEL_ENV = "preview";
  let r = response();
  await handler(request("publish", { method: "POST", body: { post } }), r);
  assert.equal(r.statusCode, 503);
  delete process.env.SESSION_SECRET;
  r = response();
  await handler(request("session"), r);
  assert.equal(r.body.configured, false);
});
test("unauthenticated requests and other GitHub accounts cannot publish", async () => {
  configure();
  for (const cookie of [
    "",
    `__Host-aa-session=${seal({ id: 123, token: "test" }, key)}`,
  ]) {
    const r = response();
    await handler(
      request("publish", { method: "POST", headers: { cookie } }),
      r,
    );
    assert.equal(r.statusCode, 401);
  }
});
test("cross-origin and missing-origin writes are rejected", async () => {
  configure();
  for (const origin of ["https://attacker.example", undefined]) {
    const req = request("publish", { method: "POST", body: { post } });
    req.headers.origin = origin;
    const r = response();
    await handler(req, r);
    assert.equal(r.statusCode, 403);
  }
});
test("OAuth callback rejects an invalid state before exchanging credentials", async () => {
  configure();
  let called = false;
  global.fetch = async () => {
    called = true;
    throw Error("Unexpected request");
  };
  const r = response();
  await handler(request("callback&code=bad&state=bad"), r);
  assert.equal(r.statusCode, 400);
  assert.equal(called, false);
});
test("login uses PKCE and a secure HttpOnly state cookie without broad OAuth scopes", async () => {
  configure();
  const r = response();
  await handler(request("login"), r);
  const url = new URL(r.headers.Location);
  assert.equal(url.searchParams.get("code_challenge_method"), "S256");
  assert.equal(url.searchParams.has("scope"), false);
  assert.match(r.headers["Set-Cookie"], /HttpOnly; Secure; SameSite=Lax/);
});
test("publish commits only validated content to the fixed repository and main branch", async () => {
  configure();
  let called;
  global.fetch = async (url, options) => {
    called = { url, body: JSON.parse(options.body) };
    return {
      ok: true,
      json: async () => ({
        content: { sha: "a".repeat(40) },
        commit: {
          html_url: "https://github.com/abhav-arora/MY_portfolio/commit/test",
        },
      }),
    };
  };
  const r = response();
  await handler(
    request("publish", {
      method: "POST",
      body: {
        post: { ...post, secret: "discard" },
        repo: "attacker/repo",
        branch: "other",
      },
    }),
    r,
  );
  assert.equal(r.statusCode, 200);
  assert.equal(
    called.url,
    "https://api.github.com/repos/abhav-arora/MY_portfolio/contents/content/posts/test-note.json",
  );
  assert.equal(called.body.branch, "main");
  assert.equal(called.body.sha, undefined);
  assert.equal(
    JSON.parse(Buffer.from(called.body.content, "base64")).secret,
    undefined,
  );
});
test("edit passes the expected SHA and returns a conflict without retrying", async () => {
  configure();
  let count = 0;
  const sha = "b".repeat(40);
  global.fetch = async (url, options) => {
    count++;
    assert.equal(JSON.parse(options.body).sha, sha);
    return { ok: false, status: 409 };
  };
  const r = response();
  await handler(request("publish", { method: "POST", body: { post, sha } }), r);
  assert.equal(r.statusCode, 409);
  assert.equal(count, 1);
});
test("invalid post cannot reach GitHub", async () => {
  configure();
  let called = false;
  global.fetch = async () => {
    called = true;
  };
  const r = response();
  await handler(
    request("publish", {
      method: "POST",
      body: { post: { ...post, slug: "../escape" } },
    }),
    r,
  );
  assert.equal(r.statusCode, 400);
  assert.equal(called, false);
});
