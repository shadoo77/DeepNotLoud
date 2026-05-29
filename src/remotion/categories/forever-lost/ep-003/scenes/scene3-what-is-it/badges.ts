import type { BadgeDef } from "@/components/atoms/SceneBadges";
import { C } from "@/remotion/categories/forever-lost/ep-003/constants";
import { loadFont } from "@remotion/google-fonts/Cinzel";
import { loadFont as loadInterFont } from "@remotion/google-fonts/Inter";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const { fontFamily: interFont } = loadInterFont("normal", {
  weights: ["400", "600"],
  subsets: ["latin"],
});

export const BADGES: BadgeDef[] = [
  {
    phrase: "has been identified",
    fallbackFrame: 810,
    position: { right: 40, top: "20%" },
    borderColor: C.gold,
    title: "ZERO IDENTIFIED",
    subtitle: "217 plant species, none identified",
    titleSize: "text-3xl",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
  },
  {
    phrase: "any known constellation",
    fallbackFrame: 1190,
    position: { right: 40, top: "40%" },
    borderColor: C.gold,
    title: "NO KNOWN STAR SYSTEM",
    subtitle: "Diagrams match no known constellation",
    titleSize: "text-3xl",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
  },
  {
    phrase: "connects nothing",
    fallbackFrame: 1880,
    position: { right: 40, top: "60%" },
    borderColor: C.red,
    title: "IMPOSSIBLE PLUMBING",
    subtitle: "Architecture follows no law of physics",
    titleSize: "text-3xl",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
  },
  {
    phrase: "more unknown plants",
    fallbackFrame: 2380,
    position: { left: 50, top: "25%" },
    borderColor: C.gold,
    title: "PURPOSE UNKNOWN",
    subtitle: "Jars, roots, leaves — no known use",
    titleSize: "text-3xl",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
  },
  {
    phrase: "each marked with a star",
    fallbackFrame: 2590,
    position: { left: 50, top: "50%" },
    borderColor: C.gold,
    title: "STAR-MARKED",
    subtitle: "Every paragraph starts with an instruction",
    titleSize: "text-4xl",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
  },
  {
    phrase: "dense columns",
    fallbackFrame: 2960,
    position: { left: 50, top: "75%" },
    borderColor: C.red,
    title: "DENSE SILENCE",
    subtitle: "Page after page of unreadable text",
    titleSize: "text-4xl",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
  },
];
