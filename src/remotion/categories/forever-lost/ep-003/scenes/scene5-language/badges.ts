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
    phrase: "left to right",
    fallbackFrame: 410,
    position: { right: 40, bottom: "15%" },
    borderColor: C.gold,
    title: "READS LEFT TO RIGHT",
    subtitle: "Standard word lengths (4–6 char)",
    titleSize: "text-3xl",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    hideAfterFrames: 150,
  },
  {
    phrase: "entropy",
    fallbackFrame: 806,
    position: { left: 50, bottom: "15%" },
    borderColor: C.gold,
    title: "ENTROPY: NORMAL",
    subtitle: "Matches natural language randomness",
    titleSize: "text-3xl",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    hideAfterFrames: 300,
  },
  {
    phrase: "corrections",
    fallbackFrame: 1597,
    position: { left: 50, bottom: "15%" },
    borderColor: C.red,
    title: "ALMOST NO CORRECTIONS",
    subtitle: "Scribes always made mistakes — except here",
    titleSize: "text-2xl",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
  },
  {
    phrase: "no category",
    fallbackFrame: 3267,
    position: { right: 40, bottom: "15%" },
    borderColor: C.gold,
    title: "NO EXISTING CATEGORY",
    subtitle: "Beyond known linguistics",
    titleSize: "text-3xl",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
  },
];
