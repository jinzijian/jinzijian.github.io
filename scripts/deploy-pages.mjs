import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(project, 'dist/client');
const remote = 'https://github.com/jinzijian/jinzijian.github.io.git';
if (!existsSync(join(output, 'index.html'))) throw new Error('Run npm run build:pages first.');
const temp = mkdtempSync(join(tmpdir(), 'zijian-pages-'));
const git = (args, cwd = temp) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });

try {
  const existing = git(['ls-remote', '--heads', remote, 'refs/heads/gh-pages']);
  if (existing.trim()) {
    git(['clone', '--depth', '1', '--single-branch', '--branch', 'gh-pages', remote, temp]);
  } else {
    git(['init', '-b', 'gh-pages']);
    git(['remote', 'add', 'origin', remote]);
  }
  // This checkout is a newly created temporary directory containing only the
  // deployment branch. Keep its history while replacing generated output.
  for (const name of readdirSync(temp)) {
    if (name !== '.git') rmSync(join(temp, name), { recursive: true, force: true });
  }
  cpSync(output, temp, { recursive: true });
  writeFileSync(join(temp, '.nojekyll'), '');
  git(['add', '--all']);
  if (!git(['status', '--porcelain']).trim()) {
    console.log('Published files are already up to date.');
  } else {
    const source = git(['rev-parse', 'HEAD'], project).trim();
    git(['commit', '-m', `Publish website from ${source}`]);
    git(['push', 'origin', 'HEAD:gh-pages']);
    console.log('Uploaded to GitHub Pages: https://jinzijian.github.io/');
  }
} finally {
  rmSync(temp, { recursive: true, force: true });
}
