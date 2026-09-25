import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const markdown = new MarkdownIt({ html: false, linkify: true });

export async function readPosts(directory) {
  const entries = await readdir(directory);
  const posts = [];
  for (const filename of entries.filter(name => name.endsWith('.md'))) {
    const slug = filename.slice(0, -3);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid blog filename: ${filename}`);
    const { data, content } = matter(await readFile(path.join(directory, filename), 'utf8'));
    if (data.draft === true) continue;
    if (data.draft !== false) throw new Error(`${filename}: explicitly set draft: true or false`);
    for (const field of ['title', 'description', 'date']) {
      if (typeof data[field] !== 'string' || !data[field].trim()) throw new Error(`${filename}: ${field} must be a nonempty string`);
    }
    const date = data.date;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) {
      throw new Error(`${filename}: use a valid quoted date, e.g. "2026-09-25"`);
    }
    if (!content.trim()) throw new Error(`${filename}: article body is empty`);
    posts.push({ slug, title: data.title.trim(), description: data.description.trim(), date, lang: typeof data.lang === 'string' ? data.lang : 'en', html: markdown.render(content) });
  }
  return posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const posts = await readPosts(path.join(root, 'content/blog'));
  await mkdir(path.join(root, 'lib'), { recursive: true });
  await writeFile(path.join(root, 'lib/blog-posts.json'), JSON.stringify(posts, null, 2) + '\n');
  console.log(`Prepared ${posts.length} published blog post(s).`);
}
