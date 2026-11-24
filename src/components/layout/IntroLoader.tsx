"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function IntroLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    try {
      if (sessionStorage.getItem("backtobase-intro-seen")) return;
    } catch {
      // Keep the intro available when browser storage is disabled.
    }

    const startedAt = performance.now();
    let finished = false;
    let minimumTimer: number | undefined;
    let removeTimer: number | undefined;
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
      removeTimer = window.setTimeout(() => {
        loader.dataset.state = "hidden";
      }, 180);
    };

    const onLoad = () => {
      window.clearTimeout(fallbackTimer);
      minimumTimer = window.setTimeout(finish, Math.max(0, 600 - (performance.now() - startedAt)));
    };

    loader.dataset.state = "visible";
    loader.setAttribute("aria-hidden", "false");
    const fallbackTimer = window.setTimeout(finish, 1600);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      window.removeEventListener("load", onLoad);
      window.cancelAnimationFrame(markSeenFrame);
      window.clearTimeout(minimumTimer);
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div
      ref={loaderRef}
      className="intro-loader"
      data-state="hidden"
      role="status"
      aria-label="Loading BacktoBase"
      aria-hidden="true"
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
      </div>
    </div>
  );
}
