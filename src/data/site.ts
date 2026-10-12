import type { ImageMetadata } from "astro";

import elenaMityushina from "@/assets/team/elena-mityushina.webp";
import emiliaPshenichnova from "@/assets/team/emilia-pshenichnova.webp";
import maximSokolov from "@/assets/team/maxim-sokolov.jpg";
import ninaKostina from "@/assets/team/nina-kostina.jpg";
import kirillVanderberg from "@/assets/team/kirill-vanderberg.jpg";

export const site = {
  name: "Portraits of Hope",
  url: "https://portraitsofhope.art",
  description:
    "An art project amplifying the voices of political prisoners in Russia. Part of the People for Free Russia Coalition.",
  email: "PeopleForFreeRussia@protonmail.com",
  copyright: "© 2025 Portraits of Hope. All Rights Reserved",
};

export const links = {
  donate: "https://givebutter.com/portraits-of-hope-wpsecq",
  // TODO: this form currently requires a Google sign-in (HTTP 401); replace with the public
  // "Send > link" URL once the form's access settings allow anyone to respond.
  submitPortrait:
    "https://docs.google.com/forms/d/1fbae9GCXthNjeWynZQhdNuUn2CM848We8EXXLXvsDHc/viewform",
  hostExhibition:
    "https://docs.google.com/forms/d/e/1FAIpQLScq-CFS0xG-3KxVeb_M3wXOcQFy1QC64QXK3Koxiil5cwsqgg/viewform",
  instagram: "https://www.instagram.com/portraitsofhope.art",
  coalition: "https://www.instagram.com/peopleforfreerussia",
  contact: `mailto:${site.email}`,
  prisonerSource: "https://memopzk.org",
};

export type NavItem = { label: string; href: string; external?: boolean; highlight?: boolean };

export const nav: NavItem[] = [
  { label: "Gallery", href: "/gallery" },
  { label: "donate", href: links.donate, external: true },
  { label: "host exhibit", href: "/host", highlight: true },
];

export const stats = [
  { value: 1400, suffix: "+", label: "political prisoners total", source: { label: "memopzk.org", href: links.prisonerSource } },
  { value: 15, suffix: "+", label: "art exhibitions hosted" },
];

export type TeamMember = { name: string; role: string; photo: ImageMetadata };

export const team: TeamMember[] = [
  { name: "Elena Mityushina", role: "Founder & Project Lead", photo: elenaMityushina },
  { name: "Emilia Pshenichnova", role: "Exhibit Coordinator & Artist Relations", photo: emiliaPshenichnova },
  { name: "Maxim Sokolov", role: "Digital Designer", photo: maximSokolov },
  { name: "Nina Kostina", role: "Social Media & Content Producer", photo: ninaKostina },
  { name: "Kirill Vanderberg", role: "Data & Project Support Assistant", photo: kirillVanderberg },
];

export const ctas = [
  {
    title: "make a donation",
    text: "Your support provides direct, tangible help to those imprisoned for speaking out.",
    label: "donate",
    href: links.donate,
  },
  {
    title: "Apply to submit a portrait",
    text: "Join the project by contributing a portrait that restores visibility and dignity.",
    label: "apply",
    href: links.submitPortrait,
  },
  {
    title: "host an exhibition",
    text: "Bring the portraits to your community and help spark awareness, dialogue, and action.",
    label: "get in touch",
    href: links.hostExhibition,
  },
];
