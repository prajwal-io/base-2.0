"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, CircleHelp, Info, Users, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidNavbar, NimbusIcons, type LiquidNavItem } from "@/components/ui/liquid-glass-navbar";
import { FlowButton } from "@/components/ui/flow-button";

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
  // Sub-pages keep a sensible nav item highlighted so the sliding pill never gets stranded.
  const routeNav = (() => {
    if (pathname === "/" && hash === "#faqs") return 4;
    if (pathname.startsWith("/founder")) return 3; // About
    if (pathname.startsWith("/join")) return 2; // Community
    const exact = NAV_ITEMS.findIndex((item) => item.href === pathname);
    return exact === -1 ? 0 : exact;
  })();
  const activeNav = pendingNav ?? routeNav;

  const selectNav = (index: number) => {
    setPendingNav(index);
    if (pendingTimer.current) clearTimeout(pendingTimer.current);
    pendingTimer.current = setTimeout(() => {
      setPendingNav(null);
      pendingTimer.current = null;
    }, 450);
  };

  useEffect(() => () => {
    if (pendingTimer.current) clearTimeout(pendingTimer.current);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full pt-3 pb-2 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Mobile-only logo pill (on desktop the logo lives inside the nav pill) */}
        <Link
          href="/"
          aria-label="BacktoBase home"
          className="group flex md:hidden items-center rounded-full border border-[#E8E3DA] bg-white/85 px-4 py-2 shadow-pill backdrop-blur-md transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange sm:px-5"
        >
          <Image
            src="/images/backtobase-logo.png"
            alt="BacktoBase"
            width={977}
            height={178}
            quality={95}
            sizes="(max-width: 640px) 150px, 190px"
            className="block h-7 w-auto sm:h-8 lg:h-9"
            priority
          />
        </Link>

        <LiquidNavbar
          items={NAV_ITEMS}
          active={activeNav}
          onChange={selectNav}
          tone="light"
          compact={false}
          brand={
            <Link href="/" aria-label="BacktoBase home" className="nimbus-brand">
              <Image
                src="/images/backtobase-logo.png"
                alt="BacktoBase"
                width={977}
                height={178}
                quality={95}
                sizes="170px"
                className="block h-7 w-auto"
                priority
              />
            </Link>
          }
          className="hidden md:inline-flex"
        />

        {/* Right CTA Button */}
        <div className="flex items-center gap-3">
          <FlowButton text="Join the Community" className="hidden sm:flex px-5 py-2.5" />

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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.14, ease: [0.2, 0, 0, 1] }}
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
                <FlowButton
                  text="Join the Community"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full justify-center"
                />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
