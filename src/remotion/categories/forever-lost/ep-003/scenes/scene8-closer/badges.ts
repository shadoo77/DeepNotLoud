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
    phrase: "sat down",
    fallbackFrame: 278,
    position: { right: 30, top: 80 },
    borderColor: C.gold,
    title: "A REASON",
    subtitle: "Knowledge to preserve",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-3xl",
    hideAfterFrames: 1200,
  },
  {
    phrase: "castle",
    fallbackFrame: 1585,
    position: { left: 30, top: 80 },
    borderColor: C.gold,
    title: "FIVE CENTURIES",
    subtitle: "Waiting in silence",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-3xl",
    hideAfterFrames: 800,
  },
];
