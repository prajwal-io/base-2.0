import Link from "next/link";
import { CustomVisualSlot } from "@/components/ui/CustomVisualSlot";

export function StatsBar() {
  return (
    <section className="py-6 sm:py-8 border-y border-border-subtle bg-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-border-subtle">
          
          {/* Stat 1: 09 Editions */}
          <div className="flex items-center gap-4 justify-start md:justify-center pt-2 md:pt-0">
            <span className="font-display font-extrabold text-5xl sm:text-6xl tracking-tight text-charcoal-950">
              09
            </span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-charcoal-900 leading-tight">
                Editions
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-charcoal-500 leading-tight">
                So Far
              </span>
            </div>
          </div>

          {/* Stat 2: 7+ Venues */}
          <div className="flex items-center gap-4 justify-start md:justify-center pt-4 md:pt-0 md:pl-8">
            <span className="font-display font-extrabold text-5xl sm:text-6xl tracking-tight text-charcoal-950">
              7+
            </span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-charcoal-900 leading-tight">
                Venues
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-charcoal-500 leading-tight">
                Across Cities
              </span>
            </div>
          </div>

          {/* Stat 3: Founder */}
          <Link
            href="/about#founder"
            className="flex items-center gap-4 justify-start md:justify-center pt-4 md:pt-0 md:pl-8 group"
          >
            <CustomVisualSlot className="size-14 shrink-0 rounded-full border-2 border-brand-amber/50 shadow-sm transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500">
                Founded By
              </span>
              <span className="text-sm sm:text-base font-display font-bold uppercase tracking-wide text-charcoal-950 group-hover:text-brand-orange transition-colors">
                Yashwanth Bondapalli
              </span>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
