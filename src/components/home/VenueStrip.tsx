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
    sizeClass: "h-8 sm:h-9",
  },
  {
    name: "Microsoft",
    src: "/images/venues/microsoft.svg",
    width: 338,
    height: 72,
    sizeClass: "h-8 sm:h-9",
  },
  {
    name: "EPAM Systems",
    src: "/images/venues/epam.svg",
    width: 108,
    height: 42,
    sizeClass: "h-9 sm:h-10",
  },
  {
    name: "Thoughtworks",
    src: "/images/venues/thoughtworks.svg",
    width: 409,
    height: 65,
    sizeClass: "h-7 sm:h-8",
  },
  {
    name: "DEVX",
    src: "/images/venues/devx.svg",
    width: 519,
    height: 158,
    sizeClass: "h-8 sm:h-9",
  },
  {
    name: "Nanospace",
    src: "/images/venues/nanospace.png",
    width: 565,
    height: 248,
    sizeClass: "h-12 sm:h-14",
  },
  {
    name: "Medicover Hospitals",
    src: "/images/venues/medicover.svg",
    width: 265,
    height: 166,
    sizeClass: "h-14 sm:h-16",
  },
];

export function VenueStrip() {
  return (
    <section aria-labelledby="our-venues-heading" className="py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white/95 border border-border-subtle px-6 py-7 sm:px-10 sm:py-8">
          {/* Header Row */}
          <div className="flex flex-col gap-3 border-b border-border-subtle pb-5 sm:flex-row sm:items-center sm:gap-4">
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
          </div>

          {/* Official venue logos in one responsive strip */}
          <ul
            aria-label="BacktoBase host venues"
            className="mt-5 grid grid-cols-2 items-center gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-y-6 lg:grid-cols-7"
          >
            {VENUE_LOGOS.map((venue) => (
              <li
                key={venue.name}
                title={venue.name}
                className="group flex min-h-14 items-center justify-center px-2 sm:min-h-16"
              >
                <Image
                  src={venue.src}
                  alt={venue.name}
                  width={venue.width}
                  height={venue.height}
                  className={`${venue.sizeClass} w-auto max-w-full object-contain`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
