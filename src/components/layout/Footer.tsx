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
            <Link href="/" className="relative h-8 w-32 shrink-0">
              <Image
                src="/images/backtobase-logo.png"
                alt="BacktoBase Logo"
                fill
                sizes="128px"
                className="object-contain object-left"
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

          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-charcoal-500">
          <div>
            © 2025–{new Date().getFullYear()} BacktoBase. All rights reserved.
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
