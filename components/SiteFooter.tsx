import Link from 'next/link';
import Image from 'next/image';

const nav_links = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "War Room",
    path: "/war-room",
  },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-secondary py-3 border-t border-accent/20">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between px-2 gap-4 text-muted-foreground text-sm">
        {/* Left: logo + title + copyright, horizontal */}
        <div className="flex items-center gap-2 sm:min-w-[200px]">
          <Image src="/eagle.svg" alt="Imperial Generals Eagle" width={28} height={28} className="inline-block" />
          <span className="font-bold text-accent-foreground">Imperial Generals</span>
          <span>&copy; {year}</span>
        </div>
        {/* Right: nav links vertical */}
        <nav className="flex flex-col items-center gap-1 my-2">
          {nav_links.map((link) => (
            <Link key={link.path} href={link.path} className="hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
