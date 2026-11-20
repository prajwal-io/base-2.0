import { HeroSection } from "@/components/home/HeroSection";
import { StatsBar } from "@/components/home/StatsBar";
import { VenueStrip } from "@/components/home/VenueStrip";
import { NextChapterBanner } from "@/components/home/NextChapterBanner";
import EditorialLearnConnectGrow from "@/components/home/EditorialLearnConnectGrow";
import EventArchiveFolders from "@/components/home/EventArchiveFolders";
import { CommunityBanner } from "@/components/home/CommunityBanner";
import { MemberStories } from "@/components/home/MemberStories";
import { TeamSection } from "@/components/home/TeamSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";
import { Footer } from "@/components/layout/Footer";
import { EDITIONS } from "@/data/communityData";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col bg-canvas-base selection:bg-brand-amber-light selection:text-amber-900">
      <main className="flex-grow">
        <HeroSection />
        <StatsBar />
        <VenueStrip />
        <NextChapterBanner />
        <EditorialLearnConnectGrow />
        <EventArchiveFolders
          archiveHref="/events"
          events={EDITIONS.slice(-3).reverse().map((edition) => ({
            edition: `Edition ${edition.editionNumber}`,
            title: edition.title,
            href: `/events#edition-${edition.editionNumber}`,
          }))}
        />
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
