import Link from "next/link";
import { personal, stats, experiences, skills } from "@/data/resume";
import { getMediumPosts } from "@/lib/medium";
import { BlogCard } from "@/components/BlogCard";

export default async function Home() {
  const posts = await getMediumPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="pt-14">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-14 sm:pb-16">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-end">
          <div>
            <p className="font-mono text-xs text-accent tracking-widest uppercase mb-4 animate-fade-up stagger-1">
              Available for opportunities
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-800 leading-none tracking-tight text-ink mb-6 animate-fade-up stagger-2">
              {personal.name.split(" ")[0]}
              <br />
              <span className="text-muted font-400">
                {personal.name.split(" ")[1]}
              </span>
            </h1>
            <p className="font-body text-base text-muted max-w-xl leading-relaxed animate-fade-up stagger-3">
              {personal.summary}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mt-8 animate-fade-up stagger-4">
              <a
                href="mailto:sumaantamunde@gmail.com"
                className="bg-ink text-paper font-mono text-sm px-6 py-3 hover:bg-accent transition-colors"
              >
                Get in touch
              </a>
              <Link
                href="/about"
                className="font-mono text-sm text-ink border border-ink px-6 py-3 hover:border-accent hover:text-accent transition-colors"
              >
                Full résumé →
              </Link>
            </div>
          </div>

          {/* Role badge */}
          <div className="hidden md:block animate-fade-up stagger-5">
            <div className="border border-subtle p-6 text-right">
              <p className="font-mono text-xs text-muted mb-1">Current role</p>
              <p className="font-display font-700 text-ink">
                Senior Software
                <br />
                Developer
              </p>
              <p className="font-mono text-xs text-accent mt-2">@ Optym</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="border-y border-subtle bg-ink">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl font-800 text-paper">
                {s.value}
              </p>
              <p className="font-mono text-xs text-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Experience ────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4 mb-10 sm:mb-12">
          <h2 className="font-display text-3xl font-700 text-ink">
            Experience
          </h2>
          <span className="font-mono text-xs text-muted">
            {experiences.length} companies
          </span>
        </div>

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <div
              key={exp.company}
              className="group border-t border-subtle py-8 grid md:grid-cols-[200px_1fr] gap-6 hover:bg-subtle/30 transition-colors px-2 -mx-2"
            >
              <div>
                <p className="font-mono text-xs text-accent mb-1">
                  {exp.type}
                </p>
                <h3 className="font-display font-700 text-ink">
                  {exp.company}
                </h3>
                <p className="font-body text-sm text-muted mt-1">{exp.role}</p>
                <p className="font-mono text-xs text-muted mt-2">
                  {exp.period}
                </p>
              </div>
              <ul className="space-y-2">
                {exp.bullets.slice(0, 2).map((b, bi) => (
                  <li key={bi} className="flex gap-3 text-sm text-muted">
                    <span className="text-accent mt-1 shrink-0">—</span>
                    <span>{b}</span>
                  </li>
                ))}
                {exp.bullets.length > 2 && (
                  <li className="font-mono text-xs text-muted pl-6">
                    +{exp.bullets.length - 2} more on{" "}
                    <Link href="/about" className="text-accent hover:underline">
                      About
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
          <div className="border-t border-subtle" />
        </div>
      </section>

      {/* ── Skills ────────────────────────────────────────────── */}
      <section className="bg-ink py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl font-700 text-paper mb-10">
            Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <p className="font-mono text-xs text-accent tracking-widest uppercase mb-3">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs text-paper border border-muted/30 px-3 py-1 hover:border-accent hover:text-accent transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog preview ──────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4 mb-10 sm:mb-12">
          <h2 className="font-display text-3xl font-700 text-ink">
            From the blog
          </h2>
          <Link
            href="/blog"
            className="font-mono text-xs text-accent hover:underline"
          >
            All posts →
          </Link>
        </div>

        {recentPosts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogCard key={post.link} post={post} />
            ))}
          </div>
        ) : (
          <div className="border border-subtle p-6 sm:p-10 text-center">
            <p className="font-mono text-sm text-muted">
              Blog posts will appear here once you publish on Medium.
            </p>
            <a
              href="https://medium.com/new-story"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 font-mono text-xs text-accent hover:underline"
            >
              Write your first post →
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
