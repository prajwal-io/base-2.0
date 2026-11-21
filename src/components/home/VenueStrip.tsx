import Image from "next/image";
import { Building2 } from "lucide-react";

interface VenueLogo {
  name: string;
  src: string;
  width: number;
  height: number;
  sizeClass: string;
}

const VENUE_LOGOS: VenueLogo[] = [
  {
    name: "Health Catalyst",
    src: "/images/venues/health-catalyst.svg",
    width: 224,
    height: 41,
    sizeClass: "h-8 sm:h-9 max-w-[195px]",
  },
  {
    name: "Microsoft",
    src: "/images/venues/microsoft.svg",
    width: 338,
    height: 72,
    sizeClass: "h-8 sm:h-9 max-w-[175px]",
  },
  {
    name: "EPAM Systems",
    src: "/images/venues/epam.svg",
    width: 108,
    height: 42,
    sizeClass: "h-9 sm:h-10 max-w-[138px]",
  },
  {
    name: "Thoughtworks",
    src: "/images/venues/thoughtworks.svg",
    width: 409,
    height: 65,
    sizeClass: "h-7 sm:h-8 max-w-[198px]",
  },
  {
    name: "DEVX",
    src: "/images/venues/devx.svg",
    width: 519,
    height: 158,
    sizeClass: "h-8 sm:h-9 max-w-[148px]",
  },
  {
    name: "Nanospace",
    src: "/images/venues/nanospace.png",
    width: 565,
    height: 248,
    sizeClass: "h-12 sm:h-14 max-w-[168px]",
  },
  {
    name: "Medicover Hospitals",
    src: "/images/venues/medicover.svg",
    width: 265,
    height: 166,
    sizeClass: "h-14 sm:h-16 max-w-[146px]",
  },
];

export function VenueStrip() {
  return (
    <section aria-labelledby="our-venues-heading" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white/95 backdrop-blur-sm border border-[#E5DED2] shadow-[0_14px_40px_-14px_rgba(17,18,21,0.09)] px-6 py-8 sm:px-10 sm:py-11">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-7 border-b border-border-subtle">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="inline-flex items-center gap-2.5">
                <Building2
                  aria-hidden="true"
                  className="size-5 shrink-0 text-brand-orange"
                />
                <h2
                  id="our-venues-heading"
                  className="font-display text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-charcoal-950"
                >
                  Our Venues
                </h2>
              </div>
              <span
                aria-hidden="true"
                className="hidden sm:inline-block h-4 w-px bg-border-strong"
              />
              <p className="text-xs sm:text-sm font-medium text-charcoal-600">
                Hosted across leading tech campuses, innovation hubs &amp; auditoriums in Hyderabad
              </p>
            </div>

            <span className="inline-flex items-center self-start sm:self-auto rounded-full bg-canvas-subtle border border-border-subtle px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-charcoal-800 shrink-0">
              7+ Host Venues
            </span>
          </div>

          {/* Official Venue Logos Showcase (4 + 3 centered on desktop, responsive below) */}
          <ul
            aria-label="BacktoBase host venues"
            className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
          >
            {VENUE_LOGOS.map((venue) => (
              <li
                key={venue.name}
                title={venue.name}
                className="group flex items-center justify-center w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.85rem)] lg:w-[calc(25%-0.95rem)] h-24 sm:h-28 px-5 sm:px-6 rounded-2xl bg-canvas-base/80 hover:bg-white border border-border-subtle/80 hover:border-border-strong shadow-[0_2px_10px_-4px_rgba(17,18,21,0.06)] hover:shadow-card transition-all duration-200"
              >
                <Image
                  src={venue.src}
                  alt={venue.name}
                  width={venue.width}
                  height={venue.height}
                  className={`${venue.sizeClass} w-auto object-contain transition-transform duration-200 group-hover:scale-[1.05]`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
