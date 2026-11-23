const JOURNEY_STEPS = [
	{
		step: "01",
		title: "Show up curious",
		description:
			"Walk into an edition as a student, fresher, or builder — ready to ask questions and meet people doing the work.",
	},
	{
		step: "02",
		title: "Connect and build",
		description:
			"Turn a conversation with engineers, founders, mentors, and peers into an idea you can explore together.",
	},
	{
		step: "03",
		title: "Take the stage",
		description:
			"Share what you know, present something you made, or help shape a future edition of the community.",
	},
] as const;

export function CommunityJourney() {
	return (
		<section aria-labelledby="journey-heading" className="mb-16">
			<div className="mb-7 max-w-2xl">
				<span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
					A place to begin
				</span>
				<h2
					id="journey-heading"
					className="font-display text-3xl font-black uppercase leading-tight tracking-tight text-charcoal-950 sm:text-4xl"
				>
					Your journey with <span className="text-brand-cyan">BacktoBase.</span>
				</h2>
			</div>

			<ol className="grid gap-7 border-y border-[#d5c8b9] py-7 md:grid-cols-3 md:gap-0 md:py-8">
				{JOURNEY_STEPS.map(({ step, title, description }, index) => (
					<li
						key={step}
						className={`grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 md:px-6 ${
							index === 0 ? "md:pl-0" : "md:border-l md:border-[#d5c8b9]"
						}`}
					>
						<span className="pt-0.5 font-display text-2xl font-black tabular-nums text-brand-orange">
							{step}
						</span>
						<div>
							<h3 className="font-display text-lg font-bold text-charcoal-950">{title}</h3>
							<p className="mt-2 max-w-sm text-sm leading-relaxed text-charcoal-700">
								{description}
							</p>
						</div>
					</li>
				))}
			</ol>
		</section>
	);
}
