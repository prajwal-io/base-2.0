import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { MouseEventHandler } from "react";
import { PARTNER_CONTACT_URL } from "@/data/contact";

type FlowButtonProps = {
  text?: string;
  compactText?: string;
  href?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function FlowButton({ text = "Partner with us", compactText, href = PARTNER_CONTACT_URL, className, onClick }: FlowButtonProps) {
  return (
    <Link
      href={href}
      target={href.startsWith("https://mail.google.com/") ? "_blank" : undefined}
      rel={href.startsWith("https://mail.google.com/") ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className={`group relative flex cursor-pointer items-center gap-1 overflow-hidden rounded-full border border-brand-orange/60 bg-transparent px-8 py-3 text-sm font-semibold text-charcoal-950 transition-[color,background-color,border-color,border-radius] duration-200 ease-out hover:rounded-xl hover:border-transparent hover:bg-brand-orange hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 ${className ?? ""}`}
    >
      <ArrowRight
        aria-hidden="true"
        className="absolute left-4 z-[9] h-4 w-4 -translate-x-3 text-charcoal-950 opacity-0 transition-[transform,opacity,color] duration-200 ease-out motion-safe:group-hover:translate-x-0 motion-safe:group-hover:opacity-100 group-hover:text-white motion-reduce:transition-none"
      />
      {compactText ? (
        <>
          <span className="relative z-[1] hidden -translate-x-3 transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-3 motion-reduce:transition-none sm:inline">
            {text}
          </span>
          <span className="relative z-[1] -translate-x-3 transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-3 motion-reduce:transition-none sm:hidden">
            {compactText}
          </span>
        </>
      ) : (
        <span className="relative z-[1] -translate-x-3 transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-3 motion-reduce:transition-none">
          {text}
        </span>
      )}
      <span
        aria-hidden="true"
        className="absolute inset-0 scale-[0.06] rounded-full bg-brand-orange opacity-0 transition-[transform,opacity] duration-200 ease-out motion-safe:group-hover:scale-[1.6] motion-safe:group-hover:opacity-100 motion-reduce:hidden"
      />
      <ArrowRight
        aria-hidden="true"
        className="absolute right-4 z-[9] h-4 w-4 text-charcoal-950 transition-[transform,opacity,color] duration-200 ease-out motion-safe:group-hover:translate-x-6 motion-safe:group-hover:opacity-0 group-hover:text-white motion-reduce:transition-none"
      />
    </Link>
  );
}
