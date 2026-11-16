import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle pt-12 pb-8 bg-canvas-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-border-subtle">
          
          {/* Logo + Tagline */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link href="/" className="relative h-12 w-48 shrink-0">
              <Image
                src="/images/backtobase-logo.png"
                alt="BacktoBase Logo"
                fill
                sizes="192px"
                className="brand-mark object-contain"
              />
            </Link>
            <div className="h-4 w-[1px] bg-charcoal-300 hidden sm:block" />
            <span className="text-xs text-charcoal-700 font-medium">
              A student-driven community to learn, build, and grow together.
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6 text-xs font-semibold text-charcoal-700 flex-wrap">
            <Link href="/" className="hover:text-charcoal-950 transition-colors">
              Home
            </Link>
            <Link href="/events" className="hover:text-charcoal-950 transition-colors">
              Events
            </Link>
            <Link href="/community" className="hover:text-charcoal-950 transition-colors">
              Community
            </Link>
            <Link href="/about" className="hover:text-charcoal-950 transition-colors">
              About
            </Link>
            <Link href="/#faqs" className="hover:text-charcoal-950 transition-colors">
              FAQs
            </Link>
          </nav>

          {/* Social Icons (Accessible SVGs) */}
          <div className="flex items-center gap-4 text-charcoal-700">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/backtobase"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full hover:bg-canvas-subtle hover:text-charcoal-950 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full hover:bg-canvas-subtle hover:text-charcoal-950 transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full hover:bg-canvas-subtle hover:text-charcoal-950 transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>

            {/* X (formerly Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full hover:bg-canvas-subtle hover:text-charcoal-950 transition-colors"
              aria-label="X"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-charcoal-500">
          <div>
            © 2025 BacktoBase. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Founded by Yashwanth Bondapalli</span>
            <span>|</span>
            <span>Built for the student community.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
