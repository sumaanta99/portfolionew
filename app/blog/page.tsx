import { getMediumPosts } from "@/lib/medium";
import { BlogCard } from "@/components/BlogCard";

export const metadata = {
  title: "Blog — Sumaanta Munde",
  description: "Writings on frontend architecture, React Native, and software engineering.",
};

export const revalidate = 3600; // regenerate every hour

export default async function BlogPage() {
  const posts = await getMediumPosts();

  return (
    <div className="pt-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">

        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-3">
            Blog
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-800 leading-none text-ink mb-4">
            Writing
          </h1>
          <p className="font-body text-base text-muted max-w-xl">
            Thoughts on frontend architecture, React Native, design systems, and building products at scale.
            Published on{" "}
            <a
              href="https://medium.com/@sumaantamunde"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Medium
            </a>
            , auto-synced here.
          </p>
        </div>

        {posts.length > 0 ? (
          <>
            {/* Featured post */}
            <div className="mb-12">
              <a
                href={posts[0].link}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-subtle p-5 sm:p-8 hover:border-ink transition-colors group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-accent border border-accent/30 px-2 py-0.5">
                    Latest
                  </span>
                  {posts[0].categories.slice(0, 2).map((cat) => (
                    <span
                      key={cat}
                      className="font-mono text-xs text-muted"
                    >
                      #{cat}
                    </span>
                  ))}
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-700 text-ink mb-3 group-hover:text-accent transition-colors">
                  {posts[0].title}
                </h2>
                <p className="font-body text-sm text-muted leading-relaxed mb-4 max-w-2xl">
                  {posts[0].description}
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-mono text-xs text-muted">
                  <span>{posts[0].pubDate}</span>
                  <span>·</span>
                  <span>{posts[0].readTime}</span>
                  <span className="sm:ml-auto text-accent group-hover:translate-x-1 transition-transform">
                    Read →
                  </span>
                </div>
              </a>
            </div>

            {/* Grid */}
            {posts.length > 1 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.slice(1).map((post) => (
                  <BlogCard key={post.link} post={post} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="border border-subtle p-8 sm:p-16 text-center">
            <p className="font-display text-2xl font-700 text-ink mb-3">
              No posts yet
            </p>
            <p className="font-body text-sm text-muted mb-6">
              Publish your first story on Medium and it'll appear here automatically.
            </p>
            <a
              href="https://medium.com/new-story"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono text-sm bg-ink text-paper px-6 py-3 hover:bg-accent transition-colors"
            >
              Write on Medium →
            </a>
          </div>
        )}

        {/* Medium CTA */}
        {posts.length > 0 && (
          <div className="mt-12 border-t border-subtle pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="font-mono text-xs text-muted">
              Posts auto-sync from Medium every hour
            </p>
            <a
              href="https://medium.com/@sumaantamunde"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-accent hover:underline"
            >
              Follow on Medium ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
