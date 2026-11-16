import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function TeamSection() {
  const teamPhotos = [
    { src: "/images/team-1.jpg", alt: "BacktoBase team organizers collaborating" },
    { src: "/images/team-2.jpg", alt: "BacktoBase discussion and event management" },
    { src: "/images/team-3.jpg", alt: "BacktoBase speaker and host on stage" },
    { src: "/images/team-4.jpg", alt: "BacktoBase anchor addressing the room" },
  ];

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

        {/* Candid Photo Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {teamPhotos.map((photo, idx) => (
            <div
              key={idx}
              className="group relative aspect-[16/11] rounded-2xl overflow-hidden bg-charcoal-900 border border-border-subtle shadow-card hover:shadow-photo transition-all duration-300"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
