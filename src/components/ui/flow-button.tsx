import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { MouseEventHandler } from "react";

type FlowButtonProps = {
  text?: string;
  href?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function FlowButton({ text = "Join the Community", href = "/join", className, onClick }: FlowButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative flex cursor-pointer items-center gap-1 overflow-hidden rounded-full border border-brand-orange/60 bg-transparent px-8 py-3 text-sm font-semibold text-charcoal-950 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-xl hover:border-transparent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 motion-reduce:transition-none ${className ?? ""}`}
    >
      <ArrowRight
        aria-hidden="true"
        className="absolute left-[-25%] z-[9] h-4 w-4 text-charcoal-950 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:left-4 group-hover:text-white motion-reduce:transition-none"
      />
      <span className="relative z-[1] -translate-x-3 transition-transform duration-500 ease-out group-hover:translate-x-3 motion-reduce:transition-none">
        {text}
      </span>
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange opacity-0 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:h-[220px] group-hover:w-[220px] group-hover:opacity-100 motion-reduce:transition-none"
      />
      <ArrowRight
        aria-hidden="true"
        className="absolute right-4 z-[9] h-4 w-4 text-charcoal-950 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:right-[-25%] group-hover:text-white motion-reduce:transition-none"
      />
    </Link>
  );
}
