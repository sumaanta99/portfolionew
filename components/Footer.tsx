import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-subtle bg-paper mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted text-center md:text-left">
          © {new Date().getFullYear()} Sumaanta Munde. Built with Next.js.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <a
            href="https://linkedin.com/in/sumaantamunde"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-accent transition-colors"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://medium.com/@sumaantamunde"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-accent transition-colors"
          >
            Medium ↗
          </a>
          <a
            href="mailto:sumaantamunde@gmail.com"
            className="font-mono text-xs text-muted hover:text-accent transition-colors"
          >
            Email ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
