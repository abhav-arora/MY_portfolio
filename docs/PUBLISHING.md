# The writer’s desk

## Everyday publishing

1. Open `/studio` on your portfolio. Choose **New draft**.
2. Choose Essay, Thought, Progress, or Achievement. Write a title, introduction, and body. Markdown supports headings, links, lists, images, quotes, and code blocks.
3. Switch to **Preview** to read it as an article. Drafts automatically save in this browser only. They are not synced to the cloud or other devices. Use **Export draft** for backups; **Import a draft** restores a valid export.
4. Sign in with GitHub, press **Publish**, and confirm. The post is committed to `content/posts/<slug>.json` on `main`. Vercel runs tests, validates every post, and builds the site before deploying. If any step fails, the last successful production deployment remains live.
5. The commit link shows the deployment status. The new URL becomes available after deployment succeeds. The date field is a display date, **not** a schedule: Publish publishes immediately.

To revise a live post, open it under **Published**. This loads the latest revision from GitHub. Conflicting edits are rejected instead of overwriting another change. Keep an export of your text, reopen the latest version, and reapply edits if needed. Published URLs are fixed in the editor. Published posts and their Git history are public. Unpublishing/removing a post is deliberately not part of this editor.

## One-time production setup

Use the existing Vercel project linked to `abhav-arora/MY_portfolio`. No hosting migration is required. The editor needs a GitHub App (fine-grained repository access), not a broad personal access token.

1. In GitHub **Settings → Developer settings → GitHub Apps → New GitHub App**, create an app owned by your account. Set:
   - Homepage: `https://my-portfolio-zeta-swart-59.vercel.app`
   - Callback URL: `https://my-portfolio-zeta-swart-59.vercel.app/api/studio?action=callback`
   - Webhook: disable **Active** (the app does not receive webhooks).
   - Repository permissions: **Contents — Read and write**; Metadata read is automatic. No other permissions are required.
   - Installation: **Only on this account**.
2. Install the app on **Only select repositories → MY_portfolio**. Copy its **Client ID** and generate a **Client secret**. An App ID or private key is not used by this integration.
3. In your Vercel project’s **Settings → Environment Variables**, add these for **Production only**:

   | Name | Value |
   |---|---|
   | `GITHUB_CLIENT_ID` | GitHub App Client ID |
   | `GITHUB_CLIENT_SECRET` | GitHub App Client secret |
   | `SESSION_SECRET` | At least 32 random characters; e.g. generate 32 random bytes as hex using a trusted password manager or Node crypto |
   | `SITE_URL` | `https://my-portfolio-zeta-swart-59.vercel.app` (or your canonical HTTPS custom domain) |

4. Redeploy production. Visit `/studio`, sign in, and publish your first actual note. If using a custom domain, update both `SITE_URL` and the GitHub App callback URL before redeploying.

Secrets must never be committed or exposed with a `VITE_` prefix. GitHub App tokens live in encrypted, Secure, HttpOnly, same-site cookies for at most one hour; the browser JavaScript never receives them. OAuth uses a one-use browser state cookie and PKCE. Publishing is restricted to your numeric GitHub account ID `212839806` and this fixed repository. Preview deployments cannot publish, even if environment variables are accidentally available there.

## CI/CD behavior

- Pull requests, pushes to `main`, and manual dispatch run **Portfolio checks**: clean dependency installation, security/content tests, content validation, and production build.
- The existing Vercel Git integration creates branch previews and deploys `main` to production. `vercel.json` also runs tests before the build, so a failed check blocks that deployment even without GitHub branch rules.
- Publishing from the editor is a GitHub commit by the signed-in user; it triggers the same flow. No extra deploy token is required.
- RSS (`/feed.xml`), sitemap, robots.txt, and article-specific social metadata are regenerated on every build.
- No posts are fabricated as examples in the public journal. It starts empty, ready for your writing.

## Local development

Use Node 22+ and `npm ci`, then `npm run dev`. Vite previews the public site and local draft editor; serverless authentication/publishing requires Vercel. `npm test` runs meaningful validator, session security, authorization, CSRF, and conflict tests without credentials or writes to GitHub. `npm run build` creates `dist`.

## Verification still required after setup

Complete one real owner sign-in and publish a real post, then inspect its GitHub commit and successful Vercel deployment. This cannot be fully verified before the GitHub App credentials are installed. Sign out after testing. Browser-local drafts are not encrypted and should only be written on a trusted device.
