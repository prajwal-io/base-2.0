"use client";

import DoodleCrewFooter, {
  type CrewMember,
  type FooterNavLink,
  type FooterSocial,
} from "@/components/ui/doodle-crew-footer";
import { displayFont, footerSerifFont } from "@/app/fonts";
import { backtoBaseCrewArtwork } from "@/data/crewArtwork";
import { CONTACT_US_MAILTO_URL, CONTACT_US_URL } from "@/data/contact";

const backtoBaseCrew: CrewMember[] = [
  {
    kind: "founder",
    letter: 0,
    seat: "top",
    offset: -0.14,
    scale: 1,
    name: "Founder",
    says: "Every idea starts somewhere.",
  },
  {
    kind: "connector",
    letter: 3,
    seat: "top",
    offset: -0.04,
    scale: 1,
    name: "Connector",
    says: "Meet your next collaborator.",
  },
  {
    kind: "builder",
    letter: 8,
    seat: "top",
    offset: -0.08,
    scale: 0.96,
    name: "Builder",
    says: "Let's build it together.",
  },
  {
    kind: "creator",
    letter: 6,
    seat: "top",
    offset: 0.06,
    scale: 1,
    name: "Creator",
    says: "Share what you're making.",
  },
  {
    kind: "community",
    letter: 9,
    seat: "top",
    offset: 0.58,
    scale: 1,
    name: "Community",
    says: "Find your people.",
  },
];

const backtoBaseSocials: FooterSocial[] = [
  {
    kind: "instagram",
    label: "BacktoBase on Instagram",
    href: "https://www.instagram.com/backtobase_xyz",
  },
  {
    kind: "linkedin",
    label: "BacktoBase on LinkedIn",
    href: "https://www.linkedin.com/company/backtobasee",
  },
  {
    kind: "youtube",
    label: "BacktoBase on YouTube",
    href: "https://www.youtube.com/@BacktoBase_xyz",
  },
  {
    kind: "whatsapp",
    label: "Join the BacktoBase WhatsApp community",
    href: "https://chat.whatsapp.com/JLCaNCa00Vv1bP0s7fy6MC",
  },
];

const backtoBaseFooterLinks: FooterNavLink[] = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
  { label: "Join", href: "/join", emphasis: true },
  { label: "Contact us", href: CONTACT_US_URL, mobileHref: CONTACT_US_MAILTO_URL, target: "_blank", rel: "noopener noreferrer" },
];

export function Footer() {
  return (
    <DoodleCrewFooter
      id="footer"
      className="backtobase-footer"
      wordmark="BACKTOBASE"
      tagline="Learn. Connect. Grow."
      crew={backtoBaseCrew}
      crewArtwork={backtoBaseCrewArtwork}
      doodleCount={0}
      crewShower
      preset="paper"
      palette={{
        background: "#FFF8F0",
        ink: "#171717",
        accent: "#F4511E",
      }}
      fontFamily={`${displayFont.style.fontFamily}, "Arial Black", sans-serif`}
      serifFamily={`${footerSerifFont.style.fontFamily}, "Iowan Old Style", Georgia, serif`}
      tracking={-0.022}
      interactive={true}
      height="auto"
      links={backtoBaseFooterLinks}
      socials={backtoBaseSocials}
      showCredit={true}
      closingMarquee="Learn · Connect · Build · Grow · BacktoBase"
    />
  );
}

export default Footer;
