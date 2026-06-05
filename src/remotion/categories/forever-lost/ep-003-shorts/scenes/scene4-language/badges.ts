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
    phrase: "language",
    fallbackFrame: 100,
    position: { left: 30, top: "12%" },
    borderColor: C.gold,
    title: "LANGUAGE PATTERNS",
    subtitle: "Natural structure detected",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-2xl",
    hideAfterFrames: 120,
  },
  {
    phrase: "real",
    fallbackFrame: 250,
    position: { right: 30, top: "22%" },
    borderColor: C.gold,
    title: "REAL LANGUAGE",
    subtitle: "But which one?",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-2xl",
    hideAfterFrames: 100,
  },
  {
    phrase: "matches",
    fallbackFrame: 320,
    position: { left: 30, bottom: "35%" },
    borderColor: C.red,
    title: "MATCHES NOTHING",
    subtitle: "No known language",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-2xl",
    hideAfterFrames: 45,
  },
  {
    phrase: "Latin",
    fallbackFrame: 370,
    position: { right: 30, bottom: "25%" },
    borderColor: C.red,
    title: "NOT LATIN",
    subtitle: "Eliminated",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-2xl",
    hideAfterFrames: 60,
  },
  {
    phrase: "Arabic",
    fallbackFrame: 410,
    position: { left: 30, bottom: "15%" },
    borderColor: C.red,
    title: "NOT ARABIC",
    subtitle: "Eliminated",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-2xl",
    hideAfterFrames: 50,
  },
  {
    phrase: "cipher",
    fallbackFrame: 450,
    position: { right: 30, bottom: "8%" },
    borderColor: C.gold,
    title: "NOT A CIPHER",
    subtitle: "Ever invented",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-2xl",
    hideAfterFrames: 50,
  },
];
