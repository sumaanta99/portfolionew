import { ProjectCard } from "@/components/ProjectCard";

export const metadata = {
  title: "Projects — Sumaanta Munde",
  description: "Open source projects and public repos by Sumaanta Munde.",
};

export const revalidate = 3600;

async function getRepos() {
  try {
    const res = await fetch(
      "https://api.github.com/users/sumaanta99/repos?sort=updated&per_page=50",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const repos = await res.json();
    return repos;
    // return repos.filter((r: any) => !r.fork); // exclude forks
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const repos = await getRepos();

  return (
    <div className="pt-14">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="mb-16">
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-3">
            Projects
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-800 leading-none text-ink mb-4">
            Built in public
          </h1>
          <p className="font-body text-base text-muted max-w-xl">
            All public repos from{" "}
            <a
              href="https://github.com/sumaanta99"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              github.com/sumaanta99
            </a>
            . Auto-syncs every hour.
          </p>
        </div>

        {repos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo: any) => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        ) : (
          <div className="border border-subtle p-16 text-center">
            <p className="font-mono text-sm text-muted">
              No public repos found.
            </p>
          </div>
        )}

        <div className="mt-12 border-t border-subtle pt-6 flex items-center justify-between">
          <p className="font-mono text-xs text-muted">
            Excludes forks · updates every hour
          </p>
          <a
            href="https://github.com/sumaanta99"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-accent hover:underline"
          >
            View on GitHub ↗
          </a>
        </div>
      </div>
    </div>
  );
}
