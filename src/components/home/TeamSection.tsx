import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CustomVisualSlot } from "@/components/ui/CustomVisualSlot";

export function TeamSection() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-charcoal-700 block mb-1">
              The Team
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl text-charcoal-950 uppercase tracking-tight">
              People Who Make It <span className="text-brand-cyan">Happen.</span>
            </h3>
          </div>

          <Link
            href="/community#team"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-charcoal-800 hover:text-brand-orange group transition-colors"
          >
            <span>View Full Organizing Team</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Custom component slots */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((slot) => (
            <CustomVisualSlot
              key={slot}
              className="aspect-[16/11] rounded-2xl border border-border-subtle shadow-card"
            />
          ))}
        </div>

      </div>
    </section>
  );
}
