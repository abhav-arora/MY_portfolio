import { lazy, Suspense, useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Sun,
  Moon,
  Menu,
  X,
  Github,
  Linkedin,
  ArrowLeft,
  Rss,
  Search,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import portrait from "../assets/portrait.webp";
import resume from "../assets/Resume-March2026.pdf";
import { SOCIALS, CONTACT } from "./constants/profile";
import { projects, milestones, posts } from "./data";
import { categories, displayDate, readingTime } from "../lib/content";
const Studio = lazy(() => import("./Studio"));
function Header({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="wordmark" href="/" aria-label="Abhav Arora home">
        aa<span>.</span>
      </a>
      <span className="header-note">A WORK IN PROGRESS, ALWAYS.</span>
      <nav className={open ? "nav open" : "nav"} aria-label="Main navigation">
        {["Work", "Journal", "About"].map((item) => (
          <a
            key={item}
            href={`/#${item.toLowerCase()}`}
            onClick={() => setOpen(false)}
          >
            {item}
          </a>
        ))}
        <a className="contact-link" href={`mailto:${CONTACT.email}`}>
          Let’s talk <ArrowUpRight size={15} />
        </a>
      </nav>
      <button
        className="icon-button theme-button"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        onClick={toggleTheme}
      >
        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
      </button>
      <button
        className="icon-button menu-button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
function ProjectArt({ type }) {
  return (
    <div className={`project-art art-${type}`} aria-hidden="true">
      {type === "rag" ? (
        <>
          <div className="video-window">
            <div className="window-top">
              <i />
              <i />
              <i />
              <span>VIDEO → KNOWLEDGE</span>
            </div>
            <div className="waveform">
              {Array.from({ length: 36 }, (_, i) => (
                <b
                  key={i}
                  style={{ height: `${15 + (Math.sin(i * 1.7) + 1) * 28}%` }}
                />
              ))}
            </div>
            <div className="video-timeline">
              <span />
            </div>
          </div>
          <div className="answer-slip">
            <span>ASK. RETRIEVE. UNDERSTAND.</span>
            <strong>
              Find the idea.
              <br />
              Skip the scrubbing.
            </strong>
            <span className="slip-lines">
              ━━━━━━━━━━━━
              <br />
              ━━━━━━━━
            </span>
          </div>
        </>
      ) : type === "infra" ? (
        <div className="infra-diagram">
          <span className="infra-node">INTERNET</span>
          <span className="connector">↓</span>
          <span className="infra-node active-node">TRAEFIK / PROXY</span>
          <span className="connector fork">
            ↙ &nbsp;&nbsp;&nbsp;&nbsp; ↓ &nbsp;&nbsp;&nbsp;&nbsp; ↘
          </span>
          <div className="infra-row">
            <span>API / 01</span>
            <span>API / 02</span>
            <span>API / 03</span>
          </div>
          <span className="connector">↓</span>
          <div className="infra-row small">
            <span>REDIS</span>
            <span>MONGODB</span>
            <span>MINIO</span>
          </div>
        </div>
      ) : type === "campus" ? (
        <>
          <div className="map-grid" />
          <svg className="route-art" viewBox="0 0 400 240">
            <path d="M50 180 L120 180 L120 60 L260 60 L260 150 L350 150" />
            <circle cx="50" cy="180" r="9" />
            <circle cx="350" cy="150" r="9" />
          </svg>
          <span className="map-label label-one">HOSTEL</span>
          <span className="map-label label-two">CAMPUS</span>
          <span className="bus-marker">↗</span>
          <div className="map-note">
            A campus, connected.<span>REAL-TIME / REAL LIFE</span>
          </div>
        </>
      ) : (
        <>
          <svg className="spike-art" viewBox="0 0 400 230">
            <path d="M0 145 H35 L41 145 L48 40 L54 185 L61 145 H100 L108 145 L115 60 L121 185 L128 145 H190 L198 145 L205 25 L211 185 L218 145 H265 L273 145 L280 72 L286 185 L293 145 H340 L348 145 L355 45 L361 185 L368 145 H400" />
          </svg>
          <div className="spike-label">
            LESS ENERGY.
            <br />
            MORE SIGNAL.
          </div>
          <span className="spike-caption">SPIKING NEURAL NETWORKS / RUL</span>
        </>
      )}
    </div>
  );
}
function Work() {
  const [filter, setFilter] = useState("All");
  return (
    <section id="work" className="section work-section">
      <div className="section-top">
        <div>
          <p className="eyebrow">01 / SELECTED WORK</p>
          <h2>
            Ideas, made <em>real.</em>
          </h2>
        </div>
        <a
          className="text-link"
          href={SOCIALS.github}
          target="_blank"
          rel="noreferrer"
        >
          All repositories <ArrowUpRight size={17} />
        </a>
      </div>
      <div className="filters" aria-label="Filter projects">
        {["All", "AI & ML", "Systems", "Web"].map((t) => (
          <button
            aria-pressed={filter === t}
            className={filter === t ? "active" : ""}
            key={t}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {projects
          .filter((p) => filter === "All" || p.category === filter)
          .map((p) => (
            <a
              className="project"
              href={p.url}
              target="_blank"
              rel="noreferrer"
              key={p.name}
            >
              <ProjectArt type={p.visual} />
              <div className="project-meta">
                <span>{p.type}</span>
                <span>/{p.number}</span>
              </div>
              <div className="project-title">
                <h3>{p.name}</h3>
                <ArrowUpRight size={25} />
              </div>
              <p>{p.description}</p>
              <div className="tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </a>
          ))}
      </div>
    </section>
  );
}
function Journal() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = posts.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      `${p.title} ${p.excerpt} ${p.tags.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <section className="section journal-section" id="journal">
      <div className="section-top">
        <div>
          <p className="eyebrow">02 / THE OPEN NOTEBOOK</p>
          <h2>
            Beyond the <em>commit.</em>
          </h2>
        </div>
        <p className="section-aside">
          Things I’m learning, questions I’m asking,
          <br />
          and the occasional unfinished thought.
        </p>
      </div>
      <div className="journal-toolbar">
        <div className="filters" aria-label="Filter journal">
          {["All", ...categories].map((t) => (
            <button
              key={t}
              aria-pressed={category === t}
              className={category === t ? "active" : ""}
              onClick={() => setCategory(t)}
            >
              {t === "All"
                ? "Everything"
                : t === "Essay"
                  ? "Essays"
                  : t === "Thought"
                    ? "Thoughts"
                    : t === "Achievement"
                      ? "Achievements"
                      : t}
            </button>
          ))}
        </div>
        <label className="search-field">
          <Search size={16} />
          <input
            aria-label="Search journal"
            placeholder="Find a note…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <div aria-live="polite">
        {filtered.length ? (
          filtered.map((p) => (
            <a className="journal-row" href={`/journal/${p.slug}`} key={p.slug}>
              <span className="journal-date">{displayDate(p.date)}</span>
              <div>
                <span className="category-label">
                  {p.category} <span>· {readingTime(p.body)} MIN READ</span>
                </span>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
              </div>
              <ArrowUpRight />
            </a>
          ))
        ) : (
          <div className="empty-journal">
            <span className="notebook-mark" aria-hidden="true">
              ✳
            </span>
            <div>
              <h3>
                {posts.length
                  ? "No notes on this page yet."
                  : "A little room to think out loud."}
              </h3>
              <p>
                {posts.length
                  ? "Try another category or search term."
                  : "This notebook is open. Essays, small observations, and updates will find their home here."}
              </p>
            </div>
            <span className="empty-number">PAGE 001</span>
          </div>
        )}
      </div>
      <div className="journal-foot">
        <span>Notes from the process, not just the finished product.</span>
        <a href="/feed.xml">
          <Rss size={14} /> Subscribe via RSS
        </a>
      </div>
    </section>
  );
}
function Home() {
  return (
    <main id="main">
      <section className="hero">
        <div className="hero-topline">
          <span className="eyebrow">
            <i className="status-dot" /> STUDENT. BUILDER. CURIOUS HUMAN.
          </span>
          <span className="hero-location">IIT PATNA, INDIA ↗</span>
        </div>
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="intro">Hi, I’m Abhav.</p>
            <h1>
              I build things.
              <br />I ask <em>why.</em>
              <br />
              <span className="outline-word">Then repeat.</span>
            </h1>
            <p className="hero-description">
              Exploring the space between intelligent systems and things people
              actually use. AI & Data Science at IIT Patna, with a habit of
              learning by building.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                Explore my work <span aria-hidden="true">↘</span>
              </a>
              <a className="text-link" href="#journal">
                Read the notebook <ArrowRight size={17} />
              </a>
            </div>
          </div>
          <div className="hero-portrait">
            <div className="portrait-tape" />
            <img src={portrait} alt="Abhav Arora" fetchPriority="high" />
            <span className="portrait-stamp">
              IN PURSUIT
              <br />
              OF BETTER
              <br />
              <b>QUESTIONS ↗</b>
            </span>
            <div className="portrait-caption">
              <span>FIG. 01 — THE HUMAN BEHIND THE CODE</span>
              <span className="handwritten">hello, internet.</span>
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <span>BUILDING AT THE INTERSECTION OF</span>
          <span>
            Machine learning <b>✳</b> Full-stack engineering <b>✳</b> A little
            curiosity
          </span>
          <span className="scroll-note">SCROLL TO EXPLORE ↓</span>
        </div>
      </section>
      <Work />
      <Journal />
      <section className="section about-section" id="about">
        <div>
          <p className="eyebrow">03 / A LITTLE CONTEXT</p>
          <h2>
            Serious about building.
            <br />
            <em>Curious about everything.</em>
          </h2>
          <p className="about-body">
            I’m Abhav Arora, studying Artificial Intelligence & Data Science at
            IIT Patna. I like the full journey of an idea: understanding the
            problem, sketching a solution, and making the pieces work together.
          </p>
          <p className="about-body">
            My projects take me from retrieval-augmented AI to distributed
            infrastructure and campus tools. Along the way, hackathons have
            become a place to experiment, collaborate, and build under
            constraints.
          </p>
          <a className="text-link" href={resume} download>
            Download my résumé <ArrowUpRight size={17} />
          </a>
        </div>
        <aside className="about-note">
          <span className="note-pin" />
          <p className="eyebrow">THE SHORT VERSION</p>
          <dl>
            <div>
              <dt>Learning at</dt>
              <dd>IIT Patna</dd>
            </div>
            <div>
              <dt>Studying</dt>
              <dd>
                AI & Data Science
                <br />
                <small>B.Tech · 2024–2028</small>
              </dd>
            </div>
            <div>
              <dt>Drawn to</dt>
              <dd>
                Useful AI. Thoughtful systems.
                <br />
                Problems worth solving.
              </dd>
            </div>
          </dl>
          <span className="handwritten">Stay curious. Ship something.</span>
        </aside>
      </section>
      <section className="section milestones-section" id="milestones">
        <div className="section-top">
          <div>
            <p className="eyebrow">04 / ALONG THE WAY</p>
            <h2>
              Small steps.
              <br />
              <em>Meaningful milestones.</em>
            </h2>
          </div>
          <span className="section-aside">A few moments from the journey.</span>
        </div>
        <div className="milestones">
          {milestones.map((m) => (
            <article key={m.title}>
              <span className="eyebrow">{m.label}</span>
              <h3>{m.title}</h3>
              <p className="milestone-detail">{m.detail}</p>
              <p>{m.description}</p>
              {m.url && (
                <a
                  className="text-link"
                  href={m.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View submission <ArrowUpRight size={15} />
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
      <section className="contact-section" id="contact">
        <span className="eyebrow">
          HAVE AN IDEA, A QUESTION, OR A GOOD BOOK?
        </span>
        <a href={`mailto:${CONTACT.email}`}>
          <h2>
            Let’s make
            <br />
            <em>something matter.</em>
          </h2>
          <ArrowUpRight className="contact-arrow" />
        </a>
        <div className="contact-bottom">
          <span>{CONTACT.email}</span>
          <span>Always happy to meet thoughtful people.</span>
        </div>
      </section>
    </main>
  );
}
function Article({ slug }) {
  const post = posts.find((p) => p.slug === slug);
  useEffect(() => {
    document.title = post
      ? `${post.title} — Abhav Arora`
      : "Note not found — Abhav Arora";
  }, [post]);
  if (!post)
    return (
      <main id="main" className="article-page">
        <a className="text-link" href="/#journal">
          <ArrowLeft size={16} /> Back to the notebook
        </a>
        <h1>That page is still blank.</h1>
        <p>This note doesn’t exist, or hasn’t been published yet.</p>
      </main>
    );
  return (
    <main id="main" className="article-page">
      <a className="text-link" href="/#journal">
        <ArrowLeft size={16} /> Back to the notebook
      </a>
      <header className="article-header">
        <p className="eyebrow">
          {post.category} / {displayDate(post.date)} / {readingTime(post.body)}{" "}
          MIN READ
        </p>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
        <div className="tags">
          {post.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </header>
      <article className="prose">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </article>
      <footer className="article-end">
        <span>Written by Abhav Arora</span>
        <a
          href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Re: ${post.title}`)}`}
        >
          Continue the conversation <ArrowUpRight size={16} />
        </a>
      </footer>
    </main>
  );
}
function Footer() {
  return (
    <footer className="site-footer">
      <a className="wordmark" href="/">
        aa<span>.</span>
      </a>
      <span>
        © {new Date().getFullYear()} Abhav Arora
        <br />
        <small>Made with intention. Still evolving.</small>
      </span>
      <div>
        <a
          href={SOCIALS.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <Github size={18} />
        </a>
        <a
          href={SOCIALS.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <Linkedin size={18} />
        </a>
        <a href={SOCIALS.twitter} target="_blank" rel="noreferrer" aria-label="X">
          <span>𝕏</span>
        </a>
        <a href="/studio" className="studio-link">
          Writer’s desk <ArrowUpRight size={13} />
        </a>
      </div>
    </footer>
  );
}
export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("aa-theme") || "light";
    } catch {
      return "light";
    }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("aa-theme", theme);
    } catch {
      /* Theme still works when storage is unavailable. */
    }
  }, [theme]);
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header
        theme={theme}
        toggleTheme={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      />
      {path === "/studio" ? (
        <Suspense
          fallback={
            <main id="main" className="article-page">
              Opening the writer’s desk…
            </main>
          }
        >
          <Studio />
        </Suspense>
      ) : path === "/" ? (
        <Home />
      ) : (
        <Article slug={path.startsWith("/journal/") ? path.slice(9) : ""} />
      )}
      <Footer />
    </>
  );
}
