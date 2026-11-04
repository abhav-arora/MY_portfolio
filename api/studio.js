import { randomBytes, createHash, timingSafeEqual } from "node:crypto";
import { seal, unseal, cookies, cookie } from "../lib/session.js";
import { validatePost, slugPattern } from "../lib/content.js";
const REPO = "abhav-arora/MY_portfolio";
const OWNER_ID = 212839806;
const SESSION = "__Host-aa-session";
const STATE = "__Host-aa-oauth";
function configuration() {
  const {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    SESSION_SECRET,
    SITE_URL,
    VERCEL_ENV,
  } = process.env;
  let origin;
  try {
    const url = new URL(SITE_URL);
    if (url.protocol === "https:") origin = url.origin;
  } catch {
    /* Unconfigured deployments remain read-only. */
  }
  return {
    id: GITHUB_CLIENT_ID,
    secret: GITHUB_CLIENT_SECRET,
    key: SESSION_SECRET,
    origin,
    ready: !!(
      GITHUB_CLIENT_ID &&
      GITHUB_CLIENT_SECRET &&
      SESSION_SECRET?.length >= 32 &&
      origin &&
      VERCEL_ENV === "production"
    ),
  };
}
async function github(token, path, options = {}) {
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...options.headers,
    },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) {
    const error = new Error(
      response.status === 409 || response.status === 422
        ? "This post changed or its URL is already in use. Open the latest published version before editing."
        : response.status === 401
          ? "Your sign-in expired. Sign in again; your draft is safe."
          : response.status === 403
            ? "GitHub denied access. Check the App installation and Contents permission."
            : "GitHub could not complete the request. Your draft is safe.",
    );
    error.status = response.status;
    throw error;
  }
  return response.json();
}
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
  const json = (status, value) => res.status(status).json(value);
  const redirect = (url) => {
    res.statusCode = 302;
    res.setHeader("Location", url);
    res.end();
  };
  const config = configuration();
  const requestUrl = new URL(req.url, "https://local.invalid");
  const action = requestUrl.searchParams.get("action") || "session";
  try {
    const session = unseal(cookies(req)[SESSION], config.key);
    const authenticated = !!(
      config.ready &&
      session?.id === OWNER_ID &&
      session.token
    );
    if (action === "session" && req.method === "GET")
      return json(200, {
        configured: config.ready,
        authenticated,
        login: authenticated ? session.login : null,
      });
    if (!config.ready)
      return json(503, {
        error:
          "Publishing is not configured on this deployment. Drafting remains available.",
      });
    if (action === "login" && req.method === "GET") {
      const state = randomBytes(32).toString("base64url");
      const verifier = randomBytes(32).toString("base64url");
      res.setHeader(
        "Set-Cookie",
        cookie(STATE, seal({ state, verifier }, config.key, 600), 600),
      );
      const target = new URL("https://github.com/login/oauth/authorize");
      target.search = new URLSearchParams({
        client_id: config.id,
        redirect_uri: `${config.origin}/api/studio?action=callback`,
        state,
        code_challenge: createHash("sha256")
          .update(verifier)
          .digest("base64url"),
        code_challenge_method: "S256",
      }).toString();
      return redirect(target.toString());
    }
    if (action === "callback" && req.method === "GET") {
      const saved = unseal(cookies(req)[STATE], config.key);
      const state = requestUrl.searchParams.get("state");
      const code = requestUrl.searchParams.get("code");
      res.setHeader("Set-Cookie", cookie(STATE, "", 0));
      if (
        !saved?.state ||
        !state ||
        !code ||
        Buffer.byteLength(state) !== Buffer.byteLength(saved.state) ||
        !timingSafeEqual(Buffer.from(state), Buffer.from(saved.state))
      )
        return json(400, {
          error:
            "Sign-in expired or could not be verified. Return to the writer’s desk and try again.",
        });
      const response = await fetch(
        "https://github.com/login/oauth/access_token",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: config.id,
            client_secret: config.secret,
            code,
            code_verifier: saved.verifier,
            redirect_uri: `${config.origin}/api/studio?action=callback`,
          }),
          signal: AbortSignal.timeout(15000),
        },
      );
      const token = await response.json();
      if (!response.ok || !token.access_token)
        return json(401, {
          error:
            "GitHub sign-in failed. Return to the writer’s desk and try again.",
        });
      const user = await github(token.access_token, "/user");
      if (user.id !== OWNER_ID)
        return json(403, {
          error: "This writer’s desk belongs to Abhav Arora.",
        });
      const repository = await github(token.access_token, `/repos/${REPO}`);
      if (!repository.permissions?.push)
        return json(403, {
          error:
            "Install the GitHub App on the portfolio repository with Contents write access.",
        });
      const age = Math.min(3600, Number(token.expires_in) || 3600);
      res.setHeader("Set-Cookie", [
        cookie(STATE, "", 0),
        cookie(
          SESSION,
          seal(
            { id: user.id, login: user.login, token: token.access_token },
            config.key,
            age,
          ),
          age,
        ),
      ]);
      return redirect(`${config.origin}/studio`);
    }
    if (!authenticated)
      return json(401, { error: "Sign in with GitHub to publish." });
    if (req.method === "POST" && req.headers.origin !== config.origin)
      return json(403, { error: "Request origin could not be verified." });
    if (action === "logout" && req.method === "POST") {
      res.setHeader("Set-Cookie", cookie(SESSION, "", 0));
      return json(200, { ok: true });
    }
    if (action === "posts" && req.method === "GET") {
      const files = await github(
        session.token,
        `/repos/${REPO}/contents/content/posts?ref=main`,
      );
      return json(200, {
        posts: files
          .filter((f) => f.type === "file" && f.name.endsWith(".json"))
          .map((f) => ({ slug: f.name.slice(0, -5) })),
      });
    }
    if (action === "post" && req.method === "GET") {
      const slug = requestUrl.searchParams.get("slug");
      if (!slugPattern.test(slug || "") || slug.length > 100)
        return json(400, { error: "Invalid post URL." });
      const file = await github(
        session.token,
        `/repos/${REPO}/contents/content/posts/${slug}.json?ref=main`,
      );
      return json(200, {
        post: validatePost(
          JSON.parse(Buffer.from(file.content, "base64").toString("utf8")),
        ),
        sha: file.sha,
      });
    }
    if (action === "publish" && req.method === "POST") {
      if (!req.headers["content-type"]?.startsWith("application/json"))
        return json(415, { error: "Use a JSON request." });
      const body =
        typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      if (!body || JSON.stringify(body).length > 100000)
        return json(400, { error: "Post is too large." });
      let post;
      try {
        post = validatePost(body.post);
      } catch (e) {
        return json(400, { error: e.message });
      }
      if (
        body.sha !== null &&
        body.sha !== undefined &&
        !/^[a-f0-9]{40}$/.test(body.sha)
      )
        return json(400, {
          error: "Invalid revision. Open the latest published version.",
        });
      // A stale SHA is rejected by GitHub; creation never silently overwrites an existing post.
      const result = await github(
        session.token,
        `/repos/${REPO}/contents/content/posts/${post.slug}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            message: `${body.sha ? "Update" : "Publish"} journal: ${post.title}`,
            branch: "main",
            content: Buffer.from(JSON.stringify(post, null, 2) + "\n").toString(
              "base64",
            ),
            ...(body.sha ? { sha: body.sha } : {}),
          }),
        },
      );
      return json(200, {
        sha: result.content.sha,
        commitUrl: result.commit.html_url,
      });
    }
    return json(405, { error: "This action or method is not supported." });
  } catch (error) {
    return json(
      error.status === 401
        ? 401
        : error.status === 409 || error.status === 422
          ? 409
          : error.status === 403
            ? 403
            : 502,
      {
        error: error.status
          ? error.message
          : "The publishing service could not complete this request. Your local draft is safe.",
      },
    );
  }
}
