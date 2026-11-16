import Image from "next/image";

export function CorePillars() {
  const pillars = [
    {
      title: "Learn",
      description: "Gain real-world insights from practitioners, founders, and builders.",
      image: "/images/pillars-learn.jpg",
    },
    {
      title: "Connect",
      description: "Meet like-minded people, collaborators, mentors, and future co-founders.",
      image: "/images/pillars-connect.jpg",
    },
    {
      title: "Grow",
      description: "Build your skills, expand your network, and explore bigger opportunities.",
      image: "/images/pillars-grow.jpg",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Eyebrow + Headline Stack */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-charcoal-700">
                What BacktoBase is About
              </span>
              <div className="h-[1px] w-12 bg-charcoal-300" />
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-charcoal-950 uppercase">
              Learn.<br />
              Connect.<br />
              <span className="text-brand-cyan">Grow.</span>
            </h2>
          </div>

          {/* Right Column: 3 Photographic Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {pillars.map((pillar) => {
              return (
                <div
                  key={pillar.title}
                  className="pillar-card group overflow-hidden flex flex-col"
                >
                  {/* Photo frame */}
                  <div className="relative aspect-[16/10] w-full bg-charcoal-900 overflow-hidden">
                    <Image
                      src={pillar.image}
                      alt={`BacktoBase ${pillar.title}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 22vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content area */}
                  <div className="pt-3 flex flex-col flex-grow">
                    <h3 className="font-display font-bold text-xl text-charcoal-950 mb-1">
                      {pillar.title}
                    </h3>

                    <p className="text-sm text-charcoal-700 leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
