# BacktoBase — Component Inventory

## 1. Global & Layout Components
- **`Header / Navbar`** (`src/components/layout/Navbar.tsx`):
  - Brand Logo wrapper (`<Logo />`)
  - Center floating pill (`<FloatingPillNav />`) with animated indicator and Lucide icons
  - Right CTA button (`<Button variant="dark-pill">Join the Community →</Button>`)
  - Mobile responsive drawer/sheet with accessible Radix trigger
- **`Footer`** (`src/components/layout/Footer.tsx`):
  - Logo + Community mission statement
  - Navigation links
  - Social media links (LinkedIn, YouTube, Instagram, X)
  - Copyright & Founder credits

## 2. Homepage Section Components
1. **`HeroSection`** (`src/components/home/HeroSection.tsx`):
   - Eyebrow with hairline rule
   - Massive editorial condensed typography (`STUDENTS BUILDERS CREATORS FOUNDERS & PROFESSIONALS`)
   - Subtitle copy
   - Primary & Secondary CTA buttons
   - Right: Angled photographic collage (`<HeroCollage />`) with tilted amber backplate and 4 layered photo frames
2. **`StatsBar`** (`src/components/home/StatsBar.tsx`):
   - `09 EDITIONS SO FAR`
   - `7+ VENUES ACROSS CITIES`
   - Founder avatar + `FOUNDED BY YASHWANTH BONDAPALLI`
3. **`VenueStrip`** (`src/components/home/VenueStrip.tsx`):
   - Pill container with `OUR VENUES |`
   - Vector logos for: Health Catalyst, Microsoft, EPAM Systems, Thoughtworks, DEVX, Nanospace, Medicover Hospitals
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
   - Left: Testimonial carousel with Sriya Reddy, Aditya Varma, Meghana K. + navigation arrows
   - Right: `<FounderSpotlight />` featuring Yashwanth Bondapalli portrait, bio, and link
9. **`TeamSection`** (`src/components/home/TeamSection.tsx`):
   - Headline: `PEOPLE WHO MAKE IT HAPPEN.`
   - 4-item photo gallery showing real hosts and organizers in action
10. **`FaqSection`** (`src/components/home/FaqSection.tsx`):
    - Headline: `QUESTIONS? WE'VE GOT YOU.`
    - Accessible accordion component (Radix primitive base) with smooth expansion
11. **`FinalCta`** (`src/components/home/FinalCta.tsx`):
    - Full-width dark photographic card
    - `BE A PART OF WHAT'S NEXT.` + copy + `Join the Community →` button

## 3. UI Primitives (`src/components/ui/`)
- `Button.tsx`: Variants for `orange-pill`, `dark-pill`, `ivory-outline`, `ghost`
- `Badge.tsx`: Pill badges with category colors (orange, cyan, amber)
- `Accordion.tsx`: Accessible Radix-powered accordion with spring height transition
- `Modal / Dialog.tsx`: Accessible dialog for "Watch a Highlight" video player
- `Eyebrow.tsx`: Consistent uppercase letter-spaced section header with hairline rule
- `SectionContainer.tsx`: Standardized padding and responsive constraints

## 4. Supporting / Archive Pages
- `/events`: Full archive of all 9 editions with speaker rosters, venue details, dates, and topics
- `/about`: Detailed community story, mission, Yashwanth Bondapalli's founding philosophy, timeline
- `/community`: Team, student contributors, community guidelines, and get-involved form
- `/join`: Membership registration / interest form with validation (Zod)
