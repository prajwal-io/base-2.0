export function VenueStrip() {
  return (
    <section className="py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-3 px-6 rounded-2xl md:rounded-full bg-white/70 backdrop-blur-sm border border-border-subtle shadow-sm overflow-x-auto">
          
          {/* Eyebrow Label */}
          <div className="flex items-center gap-2 shrink-0 pr-4 md:border-r border-border-subtle">
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-charcoal-700">
              Our Venues
            </span>
            <span className="text-charcoal-300 hidden md:inline">|</span>
          </div>

          {/* Partner names stay legible without imitating official logos. */}
          <div className="flex items-center gap-x-6 gap-y-3 shrink-0 flex-wrap justify-center text-xs font-semibold tracking-tight text-charcoal-700">
            <span>Health Catalyst</span>
            <span>Microsoft</span>
            <span>EPAM Systems</span>
            <span>Thoughtworks</span>
            <span>DEVX</span>
            <span>Nanospace</span>
            <span>Medicover</span>
          </div>

        </div>
      </div>
    </section>
  );
}
