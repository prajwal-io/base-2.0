export function VenueStrip() {
  return (
    <section className="py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col md:flex-row items-center justify-between gap-4 py-3 px-6 rounded-2xl md:rounded-full bg-white/70 backdrop-blur-sm border border-border-subtle shadow-sm">
          
          {/* Eyebrow Label */}
          <div className="flex items-center gap-2 shrink-0 pr-4 md:border-r border-border-subtle">
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-charcoal-700">
              Our Venues
            </span>
            <span className="text-charcoal-300 hidden md:inline">|</span>
          </div>

          {/* Venues Logos Row */}
          <div className="grid w-full grid-cols-2 justify-items-center gap-x-2 gap-y-3 sm:grid-cols-3 md:flex md:w-auto md:flex-wrap md:gap-10">
            
            {/* Health Catalyst */}
            <div className="flex items-center gap-1.5 opacity-85 hover:opacity-100 transition-opacity">
              <svg className="w-4 h-4 text-[#0066CC]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.4 6.8h7.2l-5.8 4.4 2.2 6.8-6-4.2-6 4.2 2.2-6.8-5.8-4.4h7.2z" />
              </svg>
              <span className="font-semibold text-xs tracking-tight text-[#003B70]">
                Health Catalyst<span className="text-brand-cyan font-bold">*</span>
              </span>
            </div>

            {/* Microsoft */}
            <div className="flex items-center gap-2 opacity-85 hover:opacity-100 transition-opacity">
              <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
                <div className="bg-[#F25022] w-1.5 h-1.5" />
                <div className="bg-[#7FBA00] w-1.5 h-1.5" />
                <div className="bg-[#00A4EF] w-1.5 h-1.5" />
                <div className="bg-[#FFB900] w-1.5 h-1.5" />
              </div>
              <span className="font-semibold text-xs text-[#5E5E5E] tracking-tight">
                Microsoft
              </span>
            </div>

            {/* EPAM Systems */}
            <div className="flex items-center opacity-85 hover:opacity-100 transition-opacity">
              <span className="font-bold text-xs tracking-wider text-[#00C0E8]">
                &lt;epam&gt;
              </span>
            </div>

            {/* Thoughtworks */}
            <div className="flex items-center opacity-85 hover:opacity-100 transition-opacity">
              <span className="font-semibold text-xs text-[#3C3C3D]">
                <span className="text-[#FF2C55]">/</span>thoughtworks<span className="text-[#FF2C55]">/</span>
              </span>
            </div>

            {/* DEVX */}
            <div className="flex items-center opacity-85 hover:opacity-100 transition-opacity">
              <span className="font-display font-extrabold text-xs tracking-widest text-charcoal-950">
                DEVX
              </span>
            </div>

            {/* Nanospace */}
            <div className="flex items-center opacity-85 hover:opacity-100 transition-opacity">
              <span className="font-semibold text-xs tracking-tight text-charcoal-900">
                Nanospace<span className="text-brand-orange">®</span>
              </span>
            </div>

            {/* Medicover Hospitals */}
            <div className="flex items-center gap-1.5 opacity-85 hover:opacity-100 transition-opacity">
              <div className="w-3.5 h-3.5 rounded bg-[#ED1C24] flex items-center justify-center text-white font-bold text-[9px]">
                +
              </div>
              <span className="font-display font-bold text-[11px] tracking-tight text-[#004A99]">
                MEDICOVER
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
