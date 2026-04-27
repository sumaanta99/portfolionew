import { personal, experiences, skills, stats } from "@/data/resume";

export const metadata = {
  title: "About — Sumaanta Munde",
  description: "Full resume and background of Sumaanta Munde, Senior Software Developer.",
};

export default function AboutPage() {
  return (
    <div className="pt-14">
      <div className="max-w-5xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-3">
            About
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-800 leading-none text-ink mb-6">
            {personal.name}
          </h1>
          <p className="font-body text-base text-muted max-w-2xl leading-relaxed">
            {personal.summary}
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <a
              href={`mailto:${personal.email}`}
              className="font-mono text-xs text-ink border border-ink px-4 py-2 hover:border-accent hover:text-accent transition-colors"
            >
              {personal.email}
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-ink border border-ink px-4 py-2 hover:border-accent hover:text-accent transition-colors"
            >
              LinkedIn ↗
            </a>
            <span className="font-mono text-xs text-muted border border-subtle px-4 py-2">
              {personal.college}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 border border-subtle p-8">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl font-800 text-ink">{s.value}</p>
              <p className="font-mono text-xs text-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Experience */}
        <div className="mb-20">
          <h2 className="font-display text-2xl font-700 text-ink mb-8">
            Professional Experience
          </h2>
          <div className="space-y-0">
            {experiences.map((exp) => (
              <div
                key={exp.company}
                className="border-t border-subtle py-10 grid md:grid-cols-[220px_1fr] gap-8"
              >
                <div className="sticky top-20 self-start">
                  <span className="inline-block font-mono text-xs text-accent border border-accent/30 px-2 py-0.5 mb-3">
                    {exp.type}
                  </span>
                  <h3 className="font-display font-700 text-xl text-ink">
                    {exp.company}
                  </h3>
                  <p className="font-body text-sm text-muted mt-1">{exp.role}</p>
                  <p className="font-mono text-xs text-muted mt-2">{exp.period}</p>
                </div>
                <ul className="space-y-3">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted leading-relaxed">
                      <span className="text-accent mt-0.5 shrink-0">—</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="border-t border-subtle" />
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 className="font-display text-2xl font-700 text-ink mb-8">
            Key Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <p className="font-mono text-xs text-accent tracking-widest uppercase mb-4">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs text-ink border border-subtle px-3 py-1.5 hover:border-ink transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
