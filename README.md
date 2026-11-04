# Abhav Arora — portfolio & open notebook

A responsive editorial portfolio with an ivory/ink/burnt-orange palette, light and dark themes, illustrated project previews, a searchable journal, and an owner publishing studio.

## Run locally

Node 22 or newer:

```sh
npm ci
npm run dev
```

```sh
npm test
npm run build
```

The public site and browser-local draft editor work in Vite. GitHub authentication and publishing run as Vercel serverless functions in production.

## Write & publish

Open `/studio`. Create a draft, choose a category, write Markdown, and preview. Drafts save on the current browser and can be exported/imported as JSON. Sign in through the repository-scoped GitHub App to publish. Publishing commits to GitHub; the existing Vercel integration tests, builds, and deploys it automatically.

**One-time GitHub App / Vercel setup is required before publishing works.** Follow [docs/PUBLISHING.md](docs/PUBLISHING.md). Production publishing is restricted to the owner's numeric GitHub ID. It is disabled in branch previews.

## Structure

- `src/data.js`: project and milestone content; published journal collection.
- `src/constants/profile.js`: contact and social links.
- `content/posts/*.json`: public posts, each with Markdown in `body`.
- `src/Studio.jsx`: local draft editor and authenticated publishing interface.
- `api/studio.js`: GitHub App OAuth, owner checks, and version-checked publishing.
- `lib/`: shared content validation and encrypted server sessions.
- `.github/workflows/ci.yml`: automated tests and build for PRs and main.
- `vercel.json`: test-gated builds and studio routing.

The journal starts empty. The existing résumé and project information are retained; conflicting achievement claims were reconciled against the résumé section. RSS, sitemap, and per-article metadata are generated during builds.
