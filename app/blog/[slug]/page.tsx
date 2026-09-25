import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { posts, formatPostDate } from '@/lib/blog';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return posts.map(post => ({ slug: post.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find(item => item.slug === slug);
  if (!post) return {};
  return { title: `${post.title} — Zijian Jin`, description: post.description, alternates: { canonical: `https://jinzijian.github.io/blog/${post.slug}/` } };
}
export default async function Post({ params }: Props) {
  const { slug } = await params;
  const post = posts.find(item => item.slug === slug);
  if (!post) notFound();
  return <article className="blog-article" lang={post.lang}>
    <a className="blog-back" href="/blog/">← All posts</a>
    <header className="post-heading"><time dateTime={post.date}>{formatPostDate(post.date)}</time><h1>{post.title}</h1><p className="post-summary">{post.description}</p><p className="post-author">Zijian Jin</p></header>
    <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
    <a className="blog-back post-end" href="/blog/">← Back to all posts</a>
  </article>;
}
