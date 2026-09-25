export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="site-shell blog-shell">
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Zijian Jin home">zj<span>.</span></a>
        <nav aria-label="Main navigation">
          <a href="/#research">Research</a><a href="/#projects">Projects</a><a href="/blog/" aria-current="page">Blog</a><a href="/#experience">Experience</a>
        </nav>
      </header>
      <main id="main">{children}</main>
      <footer><a className="footer-name" href="/">Zijian Jin<span> / Alex</span></a><a href="mailto:zijianjin0730@gmail.com">Get in touch ↗</a><a href="/">Back to home ↑</a></footer>
    </div>
  </>;
}
