import { ArrowDown, ArrowUpRight } from 'lucide-react';

const papers = [
  { name: 'ChainSWE', title: 'Benchmarking Coding Agents on Multi-Bug Software Maintenance', description: 'What happens when a coding agent has to fix the next bug, and the one after that? Evaluating software maintenance as a continuous process.', authors: 'Qirui Jin, Lingching Tung, Kenan Li, et al.', href: 'https://arxiv.org/abs/2607.02606', category: 'Evaluation', date: 'Jul 2026' },
  { name: 'SWE-Edit', title: 'Rethinking Code Editing for Efficient SWE-Agent', description: 'Separating code inspection from editing, with an editor trained to choose how to make each change.', authors: 'Yikai Zhang, Jiaxin Pei, Kenan Li, et al.', href: 'https://arxiv.org/abs/2604.26102', code: 'https://github.com/microsoft/SWE-Edit', category: 'Agent systems', date: 'Apr 2026' },
  { name: 'ORACLE-SWE', title: 'Quantifying the Contribution of Oracle Information Signals on SWE Agents', description: 'Measuring which information helps coding agents succeed—from finding edit locations to understanding tests.', authors: 'Kenan Li, Qirui Jin, Liao Zhu, et al.', href: 'https://arxiv.org/abs/2604.07789', category: 'Agent analysis', date: 'Apr 2026' },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="site-shell">
        <header className="site-header">
          <a className="wordmark" href="#main" aria-label="Zijian Jin home">zj<span>.</span></a>
          <nav aria-label="Main navigation">
            <a href="#research">Research</a><a href="#projects">Projects</a><a href="#experience">Experience</a>
          </nav>
        </header>
        <main id="main">
          <section className="intro" aria-labelledby="intro-title">
            <div className="intro-copy">
              <p className="eyebrow"><span className="small-square" /> Senior Research Engineer · Meta</p>
              <h1 id="intro-title">Zijian Jin<span className="name-period">.</span></h1>
              <p className="also-name">You can call me Alex.</p>
              <p className="intro-statement">Coding agents &amp;<br />asynchronous RL.</p>
              <p className="bio">My research interests center on coding agents and asynchronous reinforcement learning. I’m interested in how language models learn from interaction and feedback to solve complex coding tasks.</p>
              <p className="bio bio-secondary">More broadly, I’m interested in scalable post-training and reliable, long-horizon agent behavior. Previously, I was a Research Scientist at Microsoft and TikTok.</p>
              <div className="intro-links">
                <a className="primary-link" href="#research">Explore my research <ArrowDown size={17} aria-hidden="true" /></a>
                <a className="quiet-link" href="https://github.com/jinzijian">GitHub <ArrowUpRight size={15} aria-hidden="true" /></a>
              </div>
              <div className="contact-links"><a href="mailto:zijianjin0730@gmail.com">Email <ArrowUpRight size={14} aria-hidden="true" /></a><a href="https://scholar.google.com/citations?user=cZu17HsAAAAJ&hl=en">Google Scholar <ArrowUpRight size={14} aria-hidden="true" /></a><a href="https://www.linkedin.com/in/zijianjin/">LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a></div>
            </div>
            <figure className="portrait-block">
              <div className="portrait-frame"><img src="/portrait-2026.jpg" alt="Zijian Jin" width={480} height={560} fetchPriority="high" /></div>
              <figcaption><span>Zijian Jin / Alex</span><span aria-hidden="true">↗</span></figcaption>
            </figure>
          </section>
          <section className="research-section" id="research" aria-labelledby="research-title">
            <div className="section-heading"><div><p className="eyebrow">01 / Research</p><h2 id="research-title">Selected work</h2></div><span className="section-note">2021–2026</span></div>
            <div className="paper-list">
              {papers.map((paper, index) => <article className="paper" key={paper.name}>
                <div className="paper-aside"><span className="paper-index">0{index + 1}</span><span className="paper-date">{paper.date}</span></div>
                <div className="paper-main">
                  <div className="paper-kicker">{paper.name === 'ORACLE-SWE' ? 'arXiv 2026' : 'EMNLP 2026'}<span className="venue-divider">/</span>{paper.category}</div>
                  <h3><a href={paper.href}>{paper.name}<ArrowUpRight size={23} aria-hidden="true" /></a></h3>
                  <p className="paper-title">{paper.title}</p>
                  <p className="paper-description">{paper.description}</p>
                  <p className="authors">{paper.authors} <span className="author-separator">/</span> Co-author: <strong>Zijian Jin</strong></p>
                  <div className="paper-links"><a href={paper.href}>Paper <ArrowUpRight size={14} aria-hidden="true" /></a>{paper.code && <a href={paper.code}>Code <ArrowUpRight size={14} aria-hidden="true" /></a>}</div>
                </div>
              </article>)}
            </div>
          </section>
          <section className="related-work" aria-label="More selected publications">
            {[
              { title: 'RepoLaunch: Automating Build & Test Pipelines Across Languages and Platforms', venue: 'arXiv 2026', url: 'https://arxiv.org/abs/2603.05026' },
              { title: 'Lita: Light Agent Uncovers the Agentic Coding Capabilities of LLMs', venue: 'arXiv 2025', url: 'https://arxiv.org/abs/2509.25873' },
              { title: 'CoCoT: Contrastive Chain-of-Thought Prompting for Large Multimodal Models', venue: 'ICPR 2024', url: 'https://arxiv.org/abs/2401.02582' },
              { title: 'Neuralizing Regular Expressions for Slot Filling', venue: 'EMNLP 2021 · Oral', url: 'https://aclanthology.org/2021.emnlp-main.747/' },
            ].map(paper => <a className="related-paper" href={paper.url} key={paper.url}><span className="related-venue">{paper.venue}</span><span>{paper.title}</span><ArrowUpRight size={18} aria-hidden="true" /></a>)}
            <a className="all-code" href="https://scholar.google.com/citations?user=cZu17HsAAAAJ&hl=en">All publications on Google Scholar <ArrowUpRight size={16} aria-hidden="true" /></a>
          </section>
          <section className="code-section" id="projects" aria-labelledby="code-title">
            <div className="section-heading"><div><p className="eyebrow">02 / Projects</p><h2 id="code-title">From ideas to systems.</h2></div></div>
            <article className="world-model-project"><span className="eyebrow">World models / Adaptive computation</span><h3>RefineJEPA</h3><p>How much thinking does each state need?</p><p className="project-description">An adaptive refinement framework for latent world models. It learns when another refinement step is useful, allocating computation to the states that need it most.</p></article>
            <a className="code-feature" href="https://github.com/microsoft/SWE-Edit">
              <span className="code-symbol" aria-hidden="true">&lt;/&gt;</span>
              <div><span className="eyebrow">Research implementation</span><h3>SWE-Edit</h3><p>A framework for more effective, more efficient code editing.</p><span className="repo-path">microsoft / SWE-Edit</span></div>
              <ArrowUpRight className="code-arrow" size={29} aria-hidden="true" />
            </a>
            <a className="all-code" href="https://github.com/jinzijian">More on GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>
          </section>
          <section className="experience-section" id="experience" aria-labelledby="experience-title">
            <div className="section-heading"><div><p className="eyebrow">03 / Experience</p><h2 id="experience-title">Where I’ve been building.</h2></div></div>
            {[
              { company: 'Meta', role: 'Senior Research Engineer', dates: 'Jan 2026 — Present' },
              { company: 'Microsoft', role: 'Research Scientist', dates: 'Sep 2024 — Jan 2026' },
              { company: 'TikTok', role: 'Research Scientist', dates: 'Jul 2022 — Sep 2024' },
            ].map(job => <article className="experience-row" key={job.company}><p className="job-dates">{job.dates}</p><div><h3>{job.company}</h3><p className="job-role">{job.role}</p></div></article>)}
            <p className="education">M.S. Computer Engineering, New York University <span>2022</span><br />B.S. Electronic Science and Technology, Xidian University <span>2019</span></p>
          </section>
        </main>
        <footer><a className="footer-name" href="#main">Zijian Jin<span> / Alex</span></a><a href="mailto:zijianjin0730@gmail.com">zijianjin0730@gmail.com</a><a href="#main">Back to top ↑</a></footer>
      </div>
    </>
  );
}
