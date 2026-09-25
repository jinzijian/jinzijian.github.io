import data from './blog-posts.json';

export type BlogPost = { slug: string; title: string; description: string; date: string; html: string };
export const posts: BlogPost[] = data;
export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
}
