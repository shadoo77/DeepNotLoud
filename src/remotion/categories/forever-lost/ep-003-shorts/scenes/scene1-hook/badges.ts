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
    phrase: "book",
    fallbackFrame: 10,
    position: { right: 30, top: 100 },
    borderColor: C.gold,
    title: "BOOK",
    subtitle: "Ancient mystery",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-2xl",
    hideAfterFrames: 100,
  },
  {
    phrase: "decoded",
    fallbackFrame: 145,
    position: { left: 30, top: 100 },
    borderColor: C.gold,
    title: "UNDECODED",
    subtitle: "Six centuries",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-2xl",
  },
];
