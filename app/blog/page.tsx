import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { originalPosts, formatPostDate, translationsFor, languageLabel } from '@/lib/blog';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Blog — Zijian Jin',
  description: 'Notes on coding agents, reinforcement learning, and research by Zijian Jin.',
  alternates: { canonical: 'https://jinzijian.github.io/blog/' },
};

export default function Blog() {
  return <>
    <section className="blog-heading" aria-labelledby="blog-title">
      <p className="eyebrow">Notes & essays</p>
      <h1 id="blog-title">Blog<span className="name-period">.</span></h1>
      <p className="blog-intro">On coding agents, reinforcement learning, and research.</p>
    </section>
    <section className="blog-list" aria-label="Blog posts">
      {originalPosts.length ? originalPosts.map(post => <article className="blog-row" key={post.slug}>
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        <div><h2><a href={`/blog/${post.slug}/`}>{post.title}<ArrowUpRight size={22} aria-hidden="true" /></a></h2><p>{post.description}</p>{translationsFor(post).length > 1 && <div className="post-languages">{translationsFor(post).map(item => <a href={`/blog/${item.slug}/`} key={item.slug} lang={item.lang} hrefLang={item.lang}>{languageLabel(item.lang)}</a>)}</div>}</div>
      </article>) : <div className="blog-empty"><h2>Notes in progress.</h2><p>The first post is on its way.</p><a href="/#research">Explore my research <ArrowUpRight size={16} aria-hidden="true" /></a></div>}
    </section>
  </>;
}
