const languageColors: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3572A5",
  Rust: "#DEA584",
  Go: "#00ADD8",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  CSS: "#563D7C",
  HTML: "#E34C26",
  Shell: "#89E051",
};

export function ProjectCard({ repo }: { repo: any }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-subtle p-5 hover:border-ink transition-colors group h-full"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-display font-700 text-sm text-ink group-hover:text-accent transition-colors leading-snug">
          {repo.name}
        </h3>
        <span className="text-muted text-xs font-mono shrink-0 mt-0.5">↗</span>
      </div>

      <p className="font-body text-xs text-muted leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
        {repo.description || "No description"}
      </p>

      <div className="flex items-center gap-4 mt-auto font-mono text-xs text-muted">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                background: languageColors[repo.language] || "#8A8680",
              }}
            />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1">
            ★ {repo.stargazers_count}
          </span>
        )}
      </div>
    </a>
  );
}
