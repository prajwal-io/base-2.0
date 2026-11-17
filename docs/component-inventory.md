# BacktoBase — Component Inventory

## 1. Global & Layout Components
- **`Header / Navbar`** (`src/components/layout/Navbar.tsx`):
  - Brand Logo wrapper (`<Logo />`)
  - Center liquid glass pill (`<LiquidNavbar />`) for Home, Events, Community, About, and FAQs
  - Right CTA button (`<Button variant="dark-pill">Join the Community →</Button>`)
  - Mobile responsive drawer toggled by an accessible button
- **`Footer`** (`src/components/layout/Footer.tsx`):
  - Logo + Community mission statement
  - Navigation links
  - LinkedIn profile link
  - Copyright & Founder credits

## 2. Homepage Section Components
1. **`HeroSection`** (`src/components/home/HeroSection.tsx`):
   - Eyebrow with hairline rule
   - Massive editorial condensed typography (`STUDENTS BUILDERS CREATORS FOUNDERS & PROFESSIONALS`)
   - Subtitle copy
   - Primary join CTA and a non-interactive highlight video coming-soon notice
   - Right: Angled photographic collage (`<HeroCollage />`) with tilted amber backplate and 4 layered photo frames
2. **`StatsBar`** (`src/components/home/StatsBar.tsx`):
   - `09 EDITIONS SO FAR`
   - `7+ VENUES ACROSS CITIES`
   - Founder avatar + `FOUNDED BY YASHWANTH BONDAPALLI`
3. **`VenueStrip`** (`src/components/home/VenueStrip.tsx`):
   - Pill container with `OUR VENUES |`
   - Readable partner names until approved logo assets are available
4. **`NextChapterBanner`** (`src/components/home/NextChapterBanner.tsx`):
   - Dark wide container with auditorium stage photo overlay
   - Headline: `THE NEXT CHAPTER IS TAKING SHAPE.` with amber gradient accent
   - Split description text
5. **`CorePillars`** (`src/components/home/CorePillars.tsx`):
   - Left stacked title: `LEARN. CONNECT. GROW.`
   - 3 Feature Cards:
     - Learn card (photo, icon badge, copy)
     - Connect card (photo, icon badge, copy)
     - Grow card (photo, icon badge, copy)
6. **`EventArchiveSection`** (`src/components/home/EventArchiveSection.tsx`):
   - Left headline: `NINE EDITIONS. A GROWING COMMUNITY.` with amber ray doodle
   - Interactive layered folder stack (`<FolderTabStack />`) displaying Edition 09 (latest), 08, 07, 06...
   - `Explore All Editions →` CTA link
7. **`CommunityBanner`** (`src/components/home/CommunityBanner.tsx`):
   - Dark container with `A COMMUNITY BUILT BY STUDENTS, FOR STUDENTS.`
   - Wide panoramic community group photograph
8. **`MemberStories`** (`src/components/home/MemberStories.tsx`):
   - Left: Three testimonial cards with previous/next controls for Sriya Reddy, Aditya Varma, and Meghana K.
   - Right: `<FounderSpotlight />` featuring Yashwanth Bondapalli portrait, bio, and link
9. **`TeamSection`** (`src/components/home/TeamSection.tsx`):
   - Headline: `PEOPLE WHO MAKE IT HAPPEN.`
   - 4-item photo gallery showing real hosts and organizers in action
10. **`FaqSection`** (`src/components/home/FaqSection.tsx`):
    - Headline: `QUESTIONS? WE'VE GOT YOU.`
    - Accessible custom accordion with smooth expansion
11. **`FinalCta`** (`src/components/home/FinalCta.tsx`):
    - Full-width dark photographic card
    - `BE A PART OF WHAT'S NEXT.` + copy + `Join the Community →` button

## 3. Supporting / Archive Pages
- `/events`: Full archive of all 9 editions with speaker rosters, venue details, dates, and topics
- `/about`: Detailed community story, mission, Yashwanth Bondapalli's founding philosophy, timeline
- `/community`: Team, student contributors, community guidelines, and get-involved form
- `/join`: Membership registration / interest form with validation (Zod)
