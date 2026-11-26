import type { ReactNode } from "react";

type ResponsiveEmailLinkProps = {
  desktopHref: string;
  mobileHref: string;
  className?: string;
  children: ReactNode;
};

export function ResponsiveEmailLink({ desktopHref, mobileHref, className = "", children }: ResponsiveEmailLinkProps) {
  return (
    <>
      <a href={desktopHref} target="_blank" rel="noopener noreferrer" className={`!hidden lg:!inline-flex ${className}`}>
        {children}
      </a>
      <a href={mobileHref} className={`!inline-flex lg:!hidden ${className}`}>
        {children}
      </a>
    </>
  );
}
