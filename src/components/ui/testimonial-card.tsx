import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href: string;
  className?: string;
}

export function TestimonialCard({ author, text, href, className }: TestimonialCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full min-h-64 w-[min(82vw,21rem)] shrink-0 flex-col justify-between rounded-2xl border border-border-subtle bg-white p-5 text-left shadow-card transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-1 hover:border-brand-amber/70 hover:shadow-photo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-4 focus-visible:ring-offset-canvas-base sm:p-6",
        className,
      )}
    >
      <div>
        <span aria-hidden="true" className="font-display text-5xl font-black leading-none text-brand-orange">
          “
        </span>
        <p className="mt-3 font-serif text-base leading-relaxed text-charcoal-900 sm:text-lg">
          {text}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-border-subtle pt-4">
        <div className="flex min-w-0 items-center gap-3">
          <Image
            src={author.avatar}
            alt=""
            width={48}
            height={48}
            className="size-12 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-charcoal-950">{author.name}</p>
            <p className="truncate text-xs text-charcoal-600">{author.handle}</p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-brand-orange">
          Read review
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
