import type { BadgeDef } from "@/components/atoms/SceneBadges";
import { C } from "@/remotion/categories/forever-lost/ep-003-shorts/constants";
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
    phrase: "alphabet",
    fallbackFrame: 130,
    position: { left: 40, top: "20%" },
    borderColor: C.gold,
    title: "UNKNOWN ALPHABET",
    subtitle: "No Rosetta Stone",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-3xl",
    hideAfterFrames: 100,
  },
  {
    phrase: "codebreakers",
    fallbackFrame: 325,
    position: { right: 40, top: "25%" },
    borderColor: C.red,
    title: "WWII CODEBREAKERS",
    subtitle: "Bletchley Park",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-3xl",
    hideAfterFrames: 100,
  },
  {
    phrase: "NSA",
    fallbackFrame: 410,
    position: { right: 40, top: "55%" },
    borderColor: C.gold,
    title: "NSA",
    subtitle: "Analyzed, failed",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-3xl",
    hideAfterFrames: 100,
  },
  {
    phrase: "AI",
    fallbackFrame: 465,
    position: { left: 40, top: "65%" },
    borderColor: C.red,
    title: "AI 2018",
    subtitle: "Pattern analysis",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-3xl",
    hideAfterFrames: 100,
  },
];
