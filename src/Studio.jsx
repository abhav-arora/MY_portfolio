import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Plus,
  Save,
  Upload,
  Download,
  Github,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { categories, validatePost, readingTime } from "../lib/content";

const STORAGE = "aa-writer-drafts-v1";
const today = () =>
  new Date(Date.now() + 330 * 60000).toISOString().slice(0, 10);
const blank = () => ({
  id: crypto.randomUUID(),
  title: "",
  slug: "",
  excerpt: "",
  category: "Thought",
  date: today(),
  tags: [],
  body: "",
  sha: null,
});
async function api(action, options = {}) {
  const response = await fetch(`/api/studio?action=${action}`, {
    credentials: "same-origin",
    ...options,
  });
  if (
    !(response.headers.get("content-type") || "").includes("application/json")
  )
    throw new Error(
      "Publishing is not connected in this preview. You can write, preview, and export drafts here.",
    );
  const result = await response.json();
  if (!response.ok)
    throw new Error(
      result.error || "The request failed. Your draft is still saved here.",
    );
  return result;
}
function downloadDraft(draft) {
  const blob = new Blob([JSON.stringify(draft, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${draft.slug || "untitled"}-draft.json`;
  link.click();
  URL.revokeObjectURL(url);
}
export default function Studio() {
  const [drafts, setDrafts] = useState(() => {
    try {
      const d = JSON.parse(localStorage.getItem(STORAGE) || "[]");
      return Array.isArray(d)
        ? d.filter(
            (x) =>
              x &&
              typeof x.id === "string" &&
              typeof x.title === "string" &&
              typeof x.body === "string" &&
              Array.isArray(x.tags),
          )
        : [];
    } catch {
      return [];
    }
  });
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("Write");
  const [session, setSession] = useState(null);
  const [notice, setNotice] = useState("Checking the publishing connection…");
  const [error, setError] = useState("");
  const [storageError, setStorageError] = useState("");
  const [busy, setBusy] = useState(false);
  const [remote, setRemote] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [result, setResult] = useState(null);
  const importing = useRef(null);
  const draft = drafts.find((d) => d.id === selected);
  useEffect(() => {
    document.title = "Writer’s desk — Abhav Arora";
    api("session")
      .then((s) => {
        setSession(s);
        setNotice(
          s.configured
            ? s.authenticated
              ? `Signed in as ${s.login}. Publishing is ready.`
              : "Sign in with GitHub to publish. Only Abhav’s account can publish."
            : "Publishing needs a one-time GitHub App connection. Drafting and previews work now.",
        );
        if (s.authenticated)
          api("posts")
            .then((p) => setRemote(p.posts))
            .catch((e) => setError(e.message));
      })
      .catch((e) => setNotice(e.message));
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE, JSON.stringify(drafts));
      setStorageError("");
    } catch {
      setStorageError(
        "Browser storage is unavailable or full. Export this draft to keep a copy before leaving.",
      );
    }
  }, [drafts]);
  function update(key, value) {
    setDrafts((ds) =>
      ds.map((d) =>
        d.id === selected
          ? { ...d, [key]: value, updatedAt: new Date().toISOString() }
          : d,
      ),
    );
    setConfirm(false);
    setResult(null);
  }
  function createDraft() {
    const d = blank();
    setDrafts((ds) => [d, ...ds]);
    setSelected(d.id);
    setMode("Write");
    setError("");
    setConfirm(false);
    setResult(null);
  }
  function choose(id) {
    setSelected(id);
    setConfirm(false);
    setResult(null);
    setError("");
  }
  async function importDraft(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      if (file.size > 100000)
        throw new Error("Please choose a draft smaller than 100 KB.");
      const data = JSON.parse(await file.text());
      const defaults = blank();
      const d = { ...defaults };
      for (const field of [
        "title",
        "slug",
        "excerpt",
        "body",
        "date",
        "category",
      ]) {
        if (typeof data[field] !== "string")
          throw new Error("This is not a valid draft file.");
        d[field] = data[field];
      }
      if (
        !Array.isArray(data.tags) ||
        data.tags.some((t) => typeof t !== "string") ||
        !categories.includes(d.category)
      )
        throw new Error("This is not a valid draft file.");
      d.tags = data.tags;
      setDrafts((ds) => [d, ...ds]);
      choose(d.id);
      setMode("Write");
    } catch (e) {
      setError(`Could not import: ${e.message}`);
    } finally {
      event.target.value = "";
    }
  }
  async function loadPost(slug) {
    setBusy(true);
    setError("");
    try {
      const p = await api(`post&slug=${encodeURIComponent(slug)}`);
      const d = { ...p.post, sha: p.sha, id: crypto.randomUUID() };
      setDrafts((ds) => [d, ...ds]);
      choose(d.id);
      setMode("Write");
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  function requestPublish() {
    try {
      validatePost(draft);
      setError("");
      setConfirm(true);
    } catch (e) {
      setError(e.message);
    }
  }
  async function publish() {
    setBusy(true);
    setError("");
    try {
      const r = await api("publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post: validatePost(draft),
          sha: draft.sha || null,
        }),
      });
      setDrafts((ds) =>
        ds.map((d) => (d.id === selected ? { ...d, sha: r.sha } : d)),
      );
      setResult(r);
      setConfirm(false);
      api("posts")
        .then((p) => setRemote(p.posts))
        .catch(() => {});
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  async function logout() {
    try {
      await api("logout", { method: "POST" });
      setSession((s) => ({ ...s, authenticated: false }));
      setNotice("Signed out. Your drafts are still on this browser.");
      setRemote([]);
    } catch (e) {
      setError(e.message);
    }
  }
  return (
    <main id="main" className="studio">
      <div className="studio-heading">
        <div>
          <span className="eyebrow">YOUR SPACE TO THINK OUT LOUD</span>
          <h1>
            The writer’s desk<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <p>
            Essays, passing thoughts, progress, and the wins worth remembering.
            Start with a sentence.
          </p>
        </div>
        {session?.authenticated ? (
          <button className="subtle-button" onClick={logout}>
            Sign out
          </button>
        ) : session?.configured ? (
          <a className="button primary" href="/api/studio?action=login">
            <Github size={15} /> Sign in to publish
          </a>
        ) : (
          <span className="editor-status">DRAFT MODE</span>
        )}
      </div>
      <div className="studio-notice">
        {notice}
        <br />
        <strong>Drafts stay in this browser.</strong> They are not synced
        between devices. Export a backup before clearing browser data. Published
        posts become public on GitHub and this site.
        {!session?.configured && (
          <details className="setup-details">
            <summary>One-time publishing setup</summary>
            <ol>
              <li>
                Create a GitHub App with Contents: read and write, installed
                only on <code>abhav-arora/MY_portfolio</code>.
              </li>
              <li>
                Set the callback URL to your site’s{" "}
                <code>/api/studio?action=callback</code>.
              </li>
              <li>
                Add <code>GITHUB_CLIENT_ID</code>,{" "}
                <code>GITHUB_CLIENT_SECRET</code>, <code>SESSION_SECRET</code>{" "}
                (at least 32 random characters), and <code>SITE_URL</code> to
                the Vercel production environment. Redeploy.
              </li>
            </ol>
            <p>
              The repository’s <code>docs/PUBLISHING.md</code> has the full
              instructions. Publishing is disabled in preview deployments.
            </p>
          </details>
        )}
      </div>
      {storageError && (
        <p className="error-message" role="alert">
          {storageError}
        </p>
      )}
      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}
      <div className="studio-layout">
        <aside className="draft-sidebar">
          <button
            className="button primary"
            onClick={createDraft}
            disabled={busy}
          >
            <Plus size={16} /> New draft
          </button>
          <h2>ON YOUR DESK / {drafts.length}</h2>
          {drafts.length ? (
            drafts.map((d) => (
              <button
                className={`draft-item ${d.id === selected ? "active" : ""}`}
                key={d.id}
                disabled={busy}
                onClick={() => choose(d.id)}
              >
                {d.title || "Untitled thought"}
                <small>
                  {d.category} · {d.sha ? "PUBLISHED / EDITING" : "LOCAL DRAFT"}
                </small>
              </button>
            ))
          ) : (
            <p>Your first draft starts here.</p>
          )}
          <h2>BACKUP & RESTORE</h2>
          <label className="import-label">
            Import a draft
            <input
              ref={importing}
              type="file"
              accept=".json,application/json"
              onChange={importDraft}
              disabled={busy}
            />
          </label>
          {session?.authenticated && (
            <>
              <h2>PUBLISHED / {remote.length}</h2>
              {remote.map((p) => (
                <button
                  className="draft-item"
                  key={p.slug}
                  disabled={busy}
                  onClick={() => loadPost(p.slug)}
                >
                  {p.slug}
                  <small>OPEN LATEST VERSION</small>
                </button>
              ))}
            </>
          )}
        </aside>
        <section className="editor" aria-label="Post editor">
          {draft ? (
            <>
              <div className="editor-toolbar">
                <div className="filters">
                  {["Write", "Preview"].map((t) => (
                    <button
                      key={t}
                      className={mode === t ? "active" : ""}
                      aria-pressed={mode === t}
                      onClick={() => setMode(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <span className="editor-status">
                  <Save size={11} />{" "}
                  {storageError ? "NOT SAVED" : "SAVED ON THIS BROWSER"} ·{" "}
                  {readingTime(draft.body || " ")} MIN READ
                </span>
              </div>
              {mode === "Write" ? (
                <div className="editor-fields">
                  <label className="wide">
                    TITLE
                    <input
                      className="title-input"
                      placeholder="An idea worth keeping…"
                      value={draft.title}
                      maxLength={140}
                      disabled={busy}
                      onChange={(e) => {
                        update("title", e.target.value);
                        if (
                          !draft.sha &&
                          (!draft.slug ||
                            draft.slug ===
                              draft.title
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/^-|-$/g, ""))
                        )
                          update(
                            "slug",
                            e.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, "-")
                              .replace(/^-|-$/g, ""),
                          );
                      }}
                    />
                  </label>
                  <label>
                    CATEGORY
                    <select
                      value={draft.category}
                      disabled={busy}
                      onChange={(e) => update("category", e.target.value)}
                    >
                      {categories.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    DATE
                    <input
                      type="date"
                      value={draft.date}
                      disabled={busy}
                      onChange={(e) => update("date", e.target.value)}
                    />
                  </label>
                  <label className="wide">
                    URL /journal/
                    <input
                      value={draft.slug}
                      maxLength={100}
                      disabled={busy || !!draft.sha}
                      onChange={(e) => update("slug", e.target.value)}
                    />
                  </label>
                  <label className="wide">
                    SHORT INTRODUCTION
                    <textarea
                      rows={2}
                      value={draft.excerpt}
                      maxLength={320}
                      placeholder="A sentence or two that invites someone in."
                      disabled={busy}
                      onChange={(e) => update("excerpt", e.target.value)}
                    />
                  </label>
                  <label className="wide">
                    TAGS (COMMA-SEPARATED, UP TO SIX)
                    <input
                      value={draft.tags.join(",")}
                      disabled={busy}
                      placeholder="building, machine-learning"
                      onChange={(e) =>
                        update(
                          "tags",
                          e.target.value ? e.target.value.split(",") : [],
                        )
                      }
                    />
                  </label>
                  <label className="wide">
                    YOUR NOTE · MARKDOWN SUPPORTED
                    <textarea
                      className="body-input"
                      value={draft.body}
                      maxLength={50000}
                      disabled={busy}
                      placeholder={
                        "Write freely.\n\n## A heading\n\n**A little emphasis**, a [link](https://example.com), or a list:\n\n- One idea\n- Another idea"
                      }
                      onChange={(e) => update("body", e.target.value)}
                    />
                  </label>
                </div>
              ) : (
                <div className="editor-preview">
                  <span className="eyebrow">
                    PREVIEW ONLY / {draft.category}
                  </span>
                  <h1>{draft.title || "Your title goes here"}</h1>
                  <p>{draft.excerpt}</p>
                  <article className="prose">
                    <ReactMarkdown>
                      {draft.body || "Your words will appear here."}
                    </ReactMarkdown>
                  </article>
                </div>
              )}
              <div className="editor-actions">
                <div>
                  <button
                    className="subtle-button"
                    onClick={() => downloadDraft(draft)}
                  >
                    <Download size={12} /> Export draft
                  </button>
                </div>
                <button
                  className="button primary"
                  disabled={!session?.authenticated || busy}
                  onClick={requestPublish}
                >
                  <Upload size={14} />{" "}
                  {busy
                    ? "Publishing…"
                    : draft.sha
                      ? "Publish changes"
                      : "Publish"}
                </button>
              </div>
              {confirm && (
                <div className="publish-confirm">
                  <strong>Ready to make this public?</strong>
                  <p>
                    “{draft.title}” will be committed to GitHub and deployed at{" "}
                    <code>/journal/{draft.slug}</code>. The date is a display
                    date; this publishes immediately.
                  </p>
                  <div>
                    <button
                      className="button primary"
                      disabled={busy}
                      onClick={publish}
                    >
                      Yes, publish <ArrowUpRight size={15} />
                    </button>
                    <button
                      className="subtle-button"
                      disabled={busy}
                      onClick={() => setConfirm(false)}
                    >
                      Keep writing
                    </button>
                  </div>
                </div>
              )}
              {result && (
                <div className="success-message" role="status">
                  <strong>Committed. Deployment will follow.</strong>
                  <p>
                    Your post is saved to GitHub. It appears on the site after
                    Vercel finishes a successful build.
                  </p>
                  <a href={result.commitUrl} target="_blank" rel="noreferrer">
                    View commit and checks ↗
                  </a>{" "}
                  ·{" "}
                  <a
                    href={`/journal/${draft.slug}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open post ↗
                  </a>
                </div>
              )}
            </>
          ) : (
            <div className="empty-editor">
              <h2>A blank page is a good beginning.</h2>
              <p>
                Select a draft or start a new one.
                <br />
                Nothing goes public until you choose Publish.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
