import data from './blog-posts.json';

export type BlogPost = { slug: string; title: string; description: string; date: string; lang?: string; translationOf?: string; html: string };
export const posts: BlogPost[] = data;
export const originalPosts = posts.filter(post => !post.translationOf);
export function translationsFor(post: BlogPost) {
  const original = post.translationOf || post.slug;
  return posts.filter(item => (item.translationOf || item.slug) === original).sort((a, b) => Number(!!a.translationOf) - Number(!!b.translationOf));
}
export function languageLabel(lang?: string) { return lang?.startsWith('zh') ? '中文' : lang === 'en' ? 'English' : lang || 'English'; }
export function formatPostDate(date: string, lang = 'en-US') {
  return new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
}
