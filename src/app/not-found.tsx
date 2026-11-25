import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
	title: "Page Not Found — BacktoBase",
	robots: { index: false, follow: false },
};

export default function NotFound() {
	return (
		<div className="flex flex-1 flex-col bg-canvas-base">
			<main
				id="main-content"
				tabIndex={-1}
				aria-labelledby="not-found-title"
				className="flex flex-1 items-center py-16 sm:py-24"
			>
				<div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
					<p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-orange-ink">
						404 · Page not found
					</p>
					<h1
						id="not-found-title"
						className="font-display text-4xl font-black uppercase tracking-tight text-charcoal-950 sm:text-6xl"
					>
						This page isn’t here.
					</h1>
					<p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-charcoal-700 sm:text-base">
						The link may be out of date or the address may have a typo. Head back to BacktoBase and keep exploring.
					</p>
					<Link
						href="/"
						className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-orange-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
					>
						<ArrowLeft aria-hidden="true" className="size-4" />
						Back to the homepage
					</Link>
				</div>
			</main>
			<Footer />
		</div>
	);
}
