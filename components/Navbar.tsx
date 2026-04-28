"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { clsx } from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  // { href: "/fitness", label: "Fitness" },
];
export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/80 backdrop-blur-md border-b border-subtle">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-display font-700 text-lg tracking-tight text-ink hover:text-accent transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          SM<span className="text-accent">.</span>
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(
                  "font-body text-sm font-500 transition-colors relative group",
                  pathname === link.href
                    ? "text-accent"
                    : "text-muted hover:text-ink"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href="mailto:sumaantamunde@gmail.com"
          className="hidden md:inline-block text-sm font-mono font-500 bg-ink text-paper px-4 py-1.5 hover:bg-accent transition-colors"
        >
          Hire me
        </a>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 border border-subtle text-ink hover:text-accent hover:border-accent transition-colors"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
          {isMenuOpen ? (
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden border-t border-subtle bg-paper">
          <div className="max-w-5xl mx-auto px-4 py-4 space-y-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={clsx(
                  "block font-body text-sm py-1.5 transition-colors",
                  pathname === link.href ? "text-accent" : "text-muted hover:text-ink"
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="mailto:sumaantamunde@gmail.com"
              className="inline-block mt-2 text-sm font-mono font-500 bg-ink text-paper px-4 py-2 hover:bg-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Hire me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
