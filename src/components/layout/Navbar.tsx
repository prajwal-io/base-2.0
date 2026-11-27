"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, CircleHelp, Info, Mail, Users, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { LiquidNavbar, NimbusIcons, type LiquidNavItem } from "@/components/ui/liquid-glass-navbar";
import { FlowButton } from "@/components/ui/flow-button";

const NAV_ITEMS: (LiquidNavItem & { href: string })[] = [
  { label: "Home", href: "/", icon: NimbusIcons.home, fx: "none" },
  { label: "Events", href: "/events", icon: <CalendarDays aria-hidden="true" />, fx: "none" },
  { label: "Community", href: "/community", icon: <Users aria-hidden="true" />, fx: "none" },
  { label: "About", href: "/about", icon: <Info aria-hidden="true" />, fx: "none" },
  { label: "FAQs", href: "/#faqs", icon: <CircleHelp aria-hidden="true" />, fx: "none" },
  { label: "Contact Us", href: "/#contact-us", icon: <Mail aria-hidden="true" />, fx: "none" },
];

const subscribeToMobileLayout = (onChange: () => void) => {
  const query = window.matchMedia("(max-width: 1023px)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const getMobileLayout = () => window.matchMedia("(max-width: 1023px)").matches;

export function Navbar({ introPhase = "complete" }: { introPhase?: "loading" | "handoff" | "complete" } = {}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const isMobileLayout = useSyncExternalStore(subscribeToMobileLayout, getMobileLayout, () => false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuButton = useRef<HTMLButtonElement>(null);
  const [pendingNav, setPendingNav] = useState<number | null>(null);
  const [hash, setHash] = useState("");
  const pendingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Keep the current section highlighted on the homepage and its related sub-pages.
  const routeNav = (() => {
    if (pathname === "/" && hash) {
      const section = NAV_ITEMS.findIndex((item) => item.href === `/${hash}`);
      if (section !== -1) return section;
    }
    if (pathname.startsWith("/founder")) return 3; // About
    const exact = NAV_ITEMS.findIndex((item) => item.href === pathname);
    return exact;
  })();
  const activeNav = pendingNav ?? routeNav;
  const mobileLogo = (
    <Image
      src="/images/backtobase-logo.png"
      alt="BacktoBase"
      width={977}
      height={178}
      unoptimized
      className="block h-auto w-[126px] max-[359px]:w-[110px] sm:w-[154px]"
      priority
    />
  );
  const desktopLogo = (
    <Image
      src="/images/backtobase-logo.png"
      alt="BacktoBase"
      width={977}
      height={178}
      unoptimized
      className="block h-auto w-[154px]"
      priority
    />
  );

  const selectNav = (index: number) => {
    const href = NAV_ITEMS[index]?.href;
    if (href) setHash(new URL(href, window.location.href).hash);
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

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setMobileMenuOpen(false);
      mobileMenuButton.current?.focus();
    };
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMobileMenuOpen(false);
    };
    const closeAtDesktopBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileMenuOpen(false);
    };

    const desktopBreakpoint = window.matchMedia("(min-width: 1024px)");
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    desktopBreakpoint.addEventListener("change", closeAtDesktopBreakpoint);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      desktopBreakpoint.removeEventListener("change", closeAtDesktopBreakpoint);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full pt-3 pb-2 px-4 sm:px-6 lg:px-8 pointer-events-none"
    >
      <div className="relative mx-auto grid min-h-[54px] max-w-7xl grid-cols-[auto_minmax(0,1fr)] items-center pointer-events-auto lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        {/* Mobile-only logo pill (on desktop the logo lives inside the nav pill) */}
        <Link
          href="/"
          aria-label="BacktoBase home"
          className="group flex lg:hidden items-center rounded-full border border-[#E8E3DA] bg-white/90 px-3 py-2 shadow-pill backdrop-blur-md transition-transform duration-150 hover:scale-[1.015] motion-safe:active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange motion-reduce:transition-none max-[359px]:px-2 sm:px-5"
        >
          {introPhase === "complete" ? mobileLogo : introPhase === "handoff" && isMobileLayout ? (
            <motion.span
              layoutId="backtobase-intro-logo"
              transition={{ type: "spring", duration: 0.14, bounce: 0 }}
              className="block"
            >
              {mobileLogo}
            </motion.span>
          ) : null}
        </Link>

        <LiquidNavbar
          items={NAV_ITEMS}
          active={activeNav}
          onChange={selectNav}
          tone="light"
          effects={false}
          compact={false}
          brand={
            <Link href="/" aria-label="BacktoBase home" className="nimbus-brand shrink-0">
              {introPhase === "complete" ? desktopLogo : introPhase === "handoff" && !isMobileLayout ? (
                <motion.span
                  layoutId="backtobase-intro-logo"
                  transition={{ type: "spring", duration: 0.14, bounce: 0 }}
                  className="block"
                >
                  {desktopLogo}
                </motion.span>
              ) : null}
            </Link>
          }
          className="!hidden lg:!inline-flex lg:col-start-2 lg:row-start-1 lg:justify-self-center"
        />

        {/* Right CTA Button */}
        <div className="col-start-2 flex items-center gap-2 justify-self-end sm:gap-3 lg:col-start-3 lg:row-start-1">
          <FlowButton text="Partner with us" compactText="Partner" className="!pl-4 !pr-5 !text-sm !py-3 max-[359px]:!px-3" />

          {/* Mobile Menu Toggle Button */}
          <button
            ref={mobileMenuButton}
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="grid size-11 place-items-center rounded-full border border-[#E8E3DA] bg-white/90 text-charcoal-900 shadow-sm transition-[background-color,transform] duration-150 hover:bg-canvas-subtle motion-safe:active:scale-[0.96] aria-expanded:bg-canvas-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange motion-reduce:transition-none lg:hidden"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
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
            initial={reduceMotion ? false : { opacity: 0, transform: "translateY(-6px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={reduceMotion ? undefined : { opacity: 0, transform: "translateY(-6px)" }}
            transition={{ duration: reduceMotion ? 0 : 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="pointer-events-auto absolute inset-x-4 top-full mx-auto max-h-[calc(100dvh-5.5rem)] max-w-sm overflow-y-auto overscroll-contain rounded-3xl border border-[#E8E3DA] bg-white/95 p-4 shadow-xl backdrop-blur-sm lg:hidden"
          >
            <nav id="mobile-navigation" aria-label="Mobile navigation" className="flex flex-col gap-1">
              {NAV_ITEMS.map((item, index) => {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setHash(new URL(item.href, window.location.href).hash);
                    }}
                    aria-current={routeNav === index ? "page" : undefined}
                    className="flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-semibold text-charcoal-800 transition-colors hover:bg-canvas-subtle hover:text-charcoal-950 aria-[current=page]:bg-canvas-subtle aria-[current=page]:text-brand-orange-ink"
                  >
                    <span className="flex w-4 h-4 items-center justify-center text-brand-orange [&_svg]:h-4 [&_svg]:w-4">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
