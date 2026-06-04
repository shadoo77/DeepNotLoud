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
    phrase: "1912",
    fallbackFrame: 30,
    position: { right: 30, top: "30%" },
    borderColor: C.gold,
    title: "DISCOVERED",
    subtitle: "Villa Mondragone",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-2xl",
    hideAfterFrames: 120,
  },
  {
    phrase: "book",
    fallbackFrame: 80,
    position: { left: 30, top: "30%" },
    borderColor: C.gold,
    title: "RARE BOOK",
    subtitle: "Dealer's collection",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-2xl",
    hideAfterFrames: 100,
  },
  {
    phrase: "castle",
    fallbackFrame: 210,
    position: { left: 30, bottom: 300 },
    borderColor: C.gold,
    title: "ITALIAN CASTLE",
    subtitle: "Hidden for centuries",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-2xl",
    hideAfterFrames: 100,
  },
  {
    phrase: "carbon",
    fallbackFrame: 260,
    position: { right: 30, bottom: 300 },
    borderColor: C.gold,
    title: "CARBON DATED",
    subtitle: "1412–1438",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-2xl",
  },
  {
    phrase: "nobody",
    fallbackFrame: 390,
    position: { left: 30, top: "50%" },
    borderColor: C.red,
    title: "UNKNOWN AUTHOR",
    subtitle: "Medieval mystery",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-2xl",
    hideAfterFrames: 80,
  },
];
