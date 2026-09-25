import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { posts, formatPostDate, translationsFor, languageLabel } from '@/lib/blog';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return posts.map(post => ({ slug: post.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find(item => item.slug === slug);
  if (!post) return {};
  const translations = translationsFor(post);
  return { title: `${post.title} — Zijian Jin`, description: post.description, alternates: { canonical: `https://jinzijian.github.io/blog/${post.slug}/`, languages: Object.fromEntries(translations.map(item => [item.lang || 'en', `https://jinzijian.github.io/blog/${item.slug}/`])) } };
}
export default async function Post({ params }: Props) {
  const { slug } = await params;
  const post = posts.find(item => item.slug === slug);
  if (!post) notFound();
  const translations = translationsFor(post);
  const chinese = post.lang?.startsWith('zh');
  return <article className="blog-article" lang={post.lang}>
    <div className="post-toolbar">
      <a className="blog-back" href="/blog/">{chinese ? '← 所有文章' : '← All posts'}</a>
      {translations.length > 1 && <nav className="language-switch" aria-label={chinese ? '文章语言' : 'Article language'}>
        {translations.map(item => <a key={item.slug} href={`/blog/${item.slug}/`} lang={item.lang} hrefLang={item.lang} aria-current={item.slug === post.slug ? 'page' : undefined}>{languageLabel(item.lang)}</a>)}
      </nav>}
    </div>
    <header className="post-heading"><time dateTime={post.date}>{formatPostDate(post.date, post.lang)}</time><h1>{post.title}</h1><p className="post-summary">{post.description}</p><p className="post-author">Zijian Jin</p></header>
    <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
    <a className="blog-back post-end" href="/blog/">{chinese ? '← 返回文章列表' : '← Back to all posts'}</a>
  </article>;
}
