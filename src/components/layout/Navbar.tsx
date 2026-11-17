"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, CircleHelp, Info, Users, ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidNavbar, NimbusIcons, type LiquidNavItem } from "@/components/ui/liquid-glass-navbar";

const NAV_ITEMS: (LiquidNavItem & { href: string })[] = [
  { label: "Home", href: "/", icon: NimbusIcons.home, fx: "none" },
  { label: "Events", href: "/events", icon: <CalendarDays aria-hidden="true" />, fx: "none" },
  { label: "Community", href: "/community", icon: <Users aria-hidden="true" />, fx: "none" },
  { label: "About", href: "/about", icon: <Info aria-hidden="true" />, fx: "none" },
  { label: "FAQs", href: "/#faqs", icon: <CircleHelp aria-hidden="true" />, fx: "none" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pendingNav, setPendingNav] = useState<number | null>(null);
  const pendingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hash = useSyncExternalStore(
    (onChange) => {
      window.addEventListener("hashchange", onChange);
      return () => window.removeEventListener("hashchange", onChange);
    },
    () => window.location.hash,
    () => "",
  );
  const routeNav = pathname === "/" && hash === "#faqs"
    ? 4
    : Math.max(0, NAV_ITEMS.findIndex((item) => item.href === pathname));
  const activeNav = pendingNav ?? routeNav;

  const selectNav = (index: number) => {
    setPendingNav(index);
    if (pendingTimer.current) clearTimeout(pendingTimer.current);
    pendingTimer.current = setTimeout(() => {
      setPendingNav(null);
      pendingTimer.current = null;
    }, 700);
  };

  useEffect(() => () => {
    if (pendingTimer.current) clearTimeout(pendingTimer.current);
  }, []);

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

        <LiquidNavbar
          items={NAV_ITEMS}
          active={activeNav}
          onChange={selectNav}
          tone="light"
          compact={false}
          className="hidden md:inline-flex"
        />

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
            className="md:hidden p-2 rounded-full bg-white/90 border border-[#E8E3DA] text-charcoal-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
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
            <nav id="mobile-navigation" aria-label="Mobile navigation" className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-semibold text-charcoal-800 hover:bg-canvas-subtle hover:text-charcoal-950 transition-colors"
                  >
                    <span className="flex w-4 h-4 items-center justify-center text-brand-orange [&_svg]:h-4 [&_svg]:w-4">{item.icon}</span>
                    <span>{item.label}</span>
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
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
