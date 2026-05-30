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
    phrase: "1400s",
    fallbackFrame: 500,
    position: { left: 50, top: 200 },
    borderColor: C.red,
    title: "1404–1438 CE",
    subtitle: "Carbon dated",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    hideAfterFrames: 500,
  },
  {
    phrase: "two hundred and forty",
    fallbackFrame: 338,
    position: { right: 40, top: "28%" },
    borderColor: C.gold,
    title: "240 PAGES",
    subtitle: "More text than a short novel",
    titleSize: "text-4xl",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    hideAfterFrames: 700,
  },
  {
    phrase: "never been identified",
    fallbackFrame: 960,
    position: { right: 40, top: "48%" },
    borderColor: C.red,
    title: "LANGUAGE: UNKNOWN",
    subtitle: "No known match on earth",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    hideAfterFrames: 400,
  },
  {
    phrase: "six hundred",
    fallbackFrame: 900,
    position: { right: 40, top: "68%" },
    borderColor: C.gold,
    title: "600 YEARS",
    subtitle: "Of silence",
    titleSize: "text-4xl",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
  },
];
