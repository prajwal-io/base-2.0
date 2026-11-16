import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsBar } from "@/components/home/StatsBar";
import { VenueStrip } from "@/components/home/VenueStrip";
import { NextChapterBanner } from "@/components/home/NextChapterBanner";
import { CorePillars } from "@/components/home/CorePillars";
import { EventArchiveSection } from "@/components/home/EventArchiveSection";
import { CommunityBanner } from "@/components/home/CommunityBanner";
import { MemberStories } from "@/components/home/MemberStories";
import { TeamSection } from "@/components/home/TeamSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="home-page min-h-screen flex flex-col bg-canvas-base selection:bg-brand-amber-light selection:text-amber-900">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <StatsBar />
        <VenueStrip />
        <NextChapterBanner />
        <CorePillars />
        <EventArchiveSection />
        <CommunityBanner />
        <MemberStories />
        <TeamSection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
