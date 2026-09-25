import { readdir, mkdir, rename, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist/client');
// Vinext's trailingSlash redirect currently prevents nested routes from being
// prerendered. Export without it, then use directory indexes for GitHub Pages.
async function directoryIndexes(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) await directoryIndexes(filename);
    else if (entry.name.endsWith('.html') && !['index.html', '404.html'].includes(entry.name)) {
      const target = filename.slice(0, -5);
      await mkdir(target, { recursive: true });
      await rename(filename, path.join(target, 'index.html'));
    }
  }
}
await directoryIndexes(output);
const posts = JSON.parse(await readFile(path.join(root, 'lib/blog-posts.json'), 'utf8'));
for (const route of ['', 'blog', ...posts.map(post => `blog/${post.slug}`)]) {
  await readFile(path.join(output, route, 'index.html'));
}
console.log(`Verified ${posts.length + 2} static pages, including all published articles.`);
