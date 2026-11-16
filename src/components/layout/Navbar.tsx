"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Users, Info, HelpCircle, ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { name: "Home", href: "/", icon: Home },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Community", href: "/community", icon: Users },
  { name: "About", href: "/about", icon: Info },
  { name: "FAQs", href: "/#faqs", icon: HelpCircle },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full pt-3 pb-2 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-[1.02]">
          <div className="relative h-9 w-32 sm:w-36">
            <Image
              src="/images/backtobase-logo.png"
              alt="BacktoBase Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Center Floating Pill Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/85 backdrop-blur-md border border-[#E8E3DA] rounded-full px-2 py-1.5 shadow-pill">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href) && item.href !== "/#faqs";

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-charcoal-950 bg-canvas-subtle shadow-sm"
                    : "text-charcoal-600 hover:text-charcoal-950 hover:bg-black/[0.03]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-brand-orange" : "text-charcoal-500"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/join"
            className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-brand-dark-pill hover:bg-brand-dark-pill-hover text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Join the Community</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-cyan" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/90 border border-[#E8E3DA] text-charcoal-900 shadow-sm"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pointer-events-auto mt-2 mx-auto max-w-sm rounded-3xl bg-white border border-[#E8E3DA] p-4 shadow-xl"
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-semibold text-charcoal-800 hover:bg-canvas-subtle hover:text-charcoal-950 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-brand-orange" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="pt-3 mt-2 border-t border-[#E8E3DA]">
                <Link
                  href="/join"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-brand-dark-pill text-white text-sm font-semibold"
                >
                  <span>Join the Community</span>
                  <ArrowRight className="w-4 h-4 text-brand-cyan" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
