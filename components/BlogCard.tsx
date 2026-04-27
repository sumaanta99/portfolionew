import { MediumPost } from "@/lib/medium";

interface BlogCardProps {
  post: MediumPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-subtle p-5 hover:border-ink transition-colors group"
    >
      <div className="flex flex-wrap gap-2 mb-3">
        {post.categories.slice(0, 2).map((cat) => (
          <span key={cat} className="font-mono text-xs text-muted">
            #{cat}
          </span>
        ))}
      </div>
      <h3 className="font-display font-700 text-base text-ink mb-2 group-hover:text-accent transition-colors leading-snug line-clamp-2">
        {post.title}
      </h3>
      <p className="font-body text-xs text-muted leading-relaxed line-clamp-3 mb-4">
        {post.description}
      </p>
      <div className="flex items-center justify-between font-mono text-xs text-muted">
        <span>{post.pubDate}</span>
        <span>{post.readTime}</span>
      </div>
    </a>
  );
}
