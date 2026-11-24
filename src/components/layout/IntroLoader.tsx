"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function IntroLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    if (document.documentElement.hasAttribute("data-intro-seen")) {
      loader.dataset.state = "hidden";
      loader.setAttribute("aria-hidden", "true");
      return;
    }

    try {
      if (sessionStorage.getItem("backtobase-intro-seen")) {
        loader.dataset.state = "hidden";
        loader.setAttribute("aria-hidden", "true");
        return;
      }
    } catch {
      // Keep the intro available when browser storage is disabled.
    }

    const appContent = document.querySelector<HTMLElement>("[data-intro-content]");
    const startedAt = performance.now();
    let finished = false;
    let minimumTimer: number | undefined;
    let removeTimer: number | undefined;
    const minimumDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 600 : 1050;
    const markSeenFrame = window.requestAnimationFrame(() => {
      try {
        sessionStorage.setItem("backtobase-intro-seen", "1");
      } catch {
        // Keep the intro available when browser storage is disabled.
      }
    });

    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(fallbackTimer);
      loader.dataset.state = "exiting";
      loader.setAttribute("aria-hidden", "true");
      appContent?.removeAttribute("inert");
      appContent?.removeAttribute("aria-hidden");
      removeTimer = window.setTimeout(() => {
        loader.dataset.state = "hidden";
      }, 300);
    };

    const onLoad = () => {
      window.clearTimeout(fallbackTimer);
      minimumTimer = window.setTimeout(finish, Math.max(0, minimumDuration - (performance.now() - startedAt)));
    };

    appContent?.setAttribute("inert", "");
    appContent?.setAttribute("aria-hidden", "true");
    const fallbackTimer = window.setTimeout(finish, 2400);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      window.removeEventListener("load", onLoad);
      window.cancelAnimationFrame(markSeenFrame);
      window.clearTimeout(minimumTimer);
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(removeTimer);
      appContent?.removeAttribute("inert");
      appContent?.removeAttribute("aria-hidden");
    };
  }, []);

  return (
    <div
      ref={loaderRef}
      className="intro-loader"
      data-state="visible"
      role="status"
      aria-label="Loading BacktoBase"
      aria-hidden="false"
    >
      <div className="intro-loader__mark">
        <span className="intro-loader__ring" aria-hidden="true" />
        <Image
          src="/images/backtobase-logo.png"
          alt=""
          width={977}
          height={178}
          unoptimized
          className="intro-loader__logo"
        />
        <span className="intro-loader__tagline" aria-hidden="true">
          Learn. Connect. Grow.
        </span>
      </div>
    </div>
  );
}
