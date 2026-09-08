# Zijian Jin — personal website

Live site: https://jinzijian.github.io/

The website uses React and Vinext. Source lives on `master`; generated static HTML lives on `gh-pages`. GitHub Pages serves only the generated files.

## Update the website

- `app/page.tsx`: biography, contact links, publications, projects, and experience.
- `app/globals.css`: layout, colors, and responsive styles.
- `app/layout.tsx`: page title, description, and canonical URL.
- `public/portrait.png`: portrait reused from the original website.
- `CONTENT_SOURCES.md`: sources used for the website copy.

Use Node.js 24, then run:

```sh
npm ci
npm run dev
```

Build the GitHub Pages version with `npm run build:pages`. This sets `GITHUB_PAGES_BUILD=1`, enables static export, and excludes the Cloudflare runtime. The default `npm run build` retains compatibility with the private Sites preview.

## Deployment and rollback

Run `npm run deploy:pages` to build and publish. The script uses a temporary checkout to update `gh-pages` while preserving its history. It does not force-push. Commit source edits on `master` before publishing, then push `master` to keep the source backed up.

The publishing source is the `gh-pages` branch at `/`. GitHub automatically deploys each update to that branch. The GitHub authorization used during setup did not include permission to add custom Actions workflows, so publication does not depend on a custom workflow.

The original Jekyll website remains in the Git history at commit `dbf553378264ebc51484200cd6103ba3f300a9c8`. Its configuration and assets are retained on `master`, but the new deployment does not serve them. To restore it, switch Pages back to deployment from `master` at `/`.

The original resume PDF is not published. The website includes a concise selection of its content.
