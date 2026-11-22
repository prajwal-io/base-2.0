import { HeroSection } from "@/components/home/HeroSection";
import { HeroCommunityStage } from "@/components/home/HeroCommunityStage";
import { StatsBar } from "@/components/home/StatsBar";
import { VenueStrip } from "@/components/home/VenueStrip";
import EditorialLearnConnectGrow from "@/components/home/EditorialLearnConnectGrow";
import EventArchiveFolders from "@/components/home/EventArchiveFolders";
import { CommunityBanner } from "@/components/home/CommunityBanner";
import { MemberStories } from "@/components/home/MemberStories";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";
import { Footer } from "@/components/layout/Footer";
import { EDITIONS, EDITION_COUNT, VENUE_COUNT } from "@/data/communityData";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col bg-canvas-base selection:bg-brand-amber-light selection:text-amber-900">
      <main className="flex-grow">
        <HeroSection communityStage={<HeroCommunityStage variant="floor" />} editionCount={EDITION_COUNT} />
        <StatsBar editionCount={EDITION_COUNT} venueCount={VENUE_COUNT} />
        <VenueStrip />
        <EditorialLearnConnectGrow />
        <EventArchiveFolders
          archiveHref="/events"
          events={EDITIONS.slice().reverse().map((edition) => ({
            edition: `Edition ${edition.editionNumber}`,
            editionNumber: edition.editionNumber,
            title: edition.title,
            date: edition.date,
            venue: edition.venue,
            speakerCount: edition.speakers.length,
            href: `/events#edition-${edition.editionNumber}`,
          }))}
        />
        <CommunityBanner />
        <MemberStories />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
