"use client";

import DoodleCrewFooter, {
  type CrewMember,
  type DoodleKind,
  type FooterSocial,
} from "@/components/ui/doodle-crew-footer";
import { footerDisplayFont, footerSerifFont } from "@/app/fonts";

const backtoBaseCrew: CrewMember[] = [
  {
    kind: "founder",
    letter: 0,
    seat: "top",
    offset: 0.08,
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
    letter: 4,
    seat: "front",
    offset: -0.14,
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
    seat: "front",
    offset: 0.58,
    scale: 1,
    name: "Community",
    says: "Find your people.",
  },
];

const backtoBaseDoodles: DoodleKind[] = [
  "rocket",
  "bulb",
  "laptop",
  "base",
  "star",
  "sparkle",
  "bolt",
  "plane",
  "sprout",
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
];

export function Footer() {
  return (
    <DoodleCrewFooter
      className="backtobase-footer"
      wordmark="BACKTOBASE"
      tagline="Learn. Connect. Grow."
      crew={backtoBaseCrew}
      doodles={backtoBaseDoodles}
      doodleCount={9}
      preset="paper"
      palette={{
        background: "#FFF8F0",
        ink: "#171717",
        accent: "#F4511E",
      }}
      fontFamily={`${footerDisplayFont.style.fontFamily}, "Arial Black", sans-serif`}
      serifFamily={`${footerSerifFont.style.fontFamily}, "Iowan Old Style", Georgia, serif`}
      tracking={-0.026}
      interactive={true}
      height="auto"
      socials={backtoBaseSocials}
      showCredit={true}
    />
  );
}

export default Footer;
