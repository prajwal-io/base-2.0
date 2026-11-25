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
      className={`group relative flex min-h-12 cursor-pointer items-center gap-2.5 overflow-hidden rounded-full border border-brand-orange/60 bg-transparent px-5 py-3.5 text-sm font-semibold text-charcoal-950 transition-[color,background-color,border-color,border-radius,transform] duration-150 ease-out hover:rounded-xl hover:border-transparent hover:bg-brand-orange hover:text-charcoal-950 motion-safe:active:scale-[0.96] active:border-transparent active:bg-brand-orange active:text-charcoal-950 focus-visible:rounded-xl focus-visible:border-transparent focus-visible:bg-brand-orange focus-visible:text-charcoal-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 ${className ?? ""}`}
    >
      {compactText ? (
        <>
          <span className="relative z-[1] hidden sm:inline">
            {text}
          </span>
          <span className="relative z-[1] sm:hidden">
            {compactText}
          </span>
        </>
      ) : (
        <span className="relative z-[1]">
          {text}
        </span>
      )}
      <span
        aria-hidden="true"
        className="absolute inset-0 scale-[0.06] rounded-full bg-brand-orange opacity-0 transition-[transform,opacity] duration-200 ease-out motion-safe:group-hover:scale-[1.6] motion-safe:group-hover:opacity-100 group-focus-visible:scale-[1.6] group-focus-visible:opacity-100 group-active:scale-[1.6] group-active:opacity-100 motion-reduce:hidden"
      />
      <ArrowRight
        aria-hidden="true"
        className="relative z-[1] h-4 w-4 shrink-0 text-charcoal-950 transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1 group-focus-visible:translate-x-1 group-active:translate-x-1 motion-reduce:transition-none"
      />
    </Link>
  );
}
