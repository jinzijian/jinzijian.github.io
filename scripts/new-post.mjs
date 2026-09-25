import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const [slug, ...words] = process.argv.slice(2);
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !words.length) {
  console.error('Usage: npm run blog:new -- my-post "My post title"');
  process.exit(1);
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const directory = path.join(root, 'content/blog');
await mkdir(directory, { recursive: true });
const target = path.join(directory, `${slug}.md`);
const date = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });
await writeFile(target, `---\ntitle: ${JSON.stringify(words.join(' '))}\ndate: "${date}"\ndescription: "Write a short summary here."\ndraft: true\n---\n\nWrite your article here.\n`, { flag: 'wx' });
console.log(`Created ${target}\nSet draft: false when the article is ready to publish.`);
