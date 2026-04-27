"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/fitness", label: "Fitness" },
];
export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/80 backdrop-blur-md border-b border-subtle">
      <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-display font-700 text-lg tracking-tight text-ink hover:text-accent transition-colors"
        >
          SM<span className="text-accent">.</span>
        </Link>

        <ul className="flex items-center gap-6">
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
          className="text-sm font-mono font-500 bg-ink text-paper px-4 py-1.5 hover:bg-accent transition-colors"
        >
          Hire me
        </a>
      </nav>
    </header>
  );
}
