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
    phrase: "38,000",
    fallbackFrame: 420,
    position: { right: 40, top: "15%" },
    borderColor: C.gold,
    title: "38,000 WORDS",
    subtitle: "More than a short novel",
    titleSize: "text-3xl",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
  },
  {
    phrase: "170 unique",
    fallbackFrame: 900,
    position: { left: 50, top: "30%" },
    borderColor: C.gold,
    title: "170+ CHARACTERS",
    subtitle: "Twice any known alphabet",
    titleSize: "text-3xl",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
  },
  {
    phrase: "zipf's law",
    fallbackFrame: 1380,
    position: { right: 40, top: "45%" },
    borderColor: C.gold,
    title: "ZIPF'S LAW",
    subtitle: "Matches natural language patterns",
    titleSize: "text-3xl",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
  },
  {
    phrase: "100 million",
    fallbackFrame: 1900,
    position: { left: 50, top: "60%" },
    borderColor: C.red,
    title: "$100M+",
    subtitle: "Priceless silence",
    titleSize: "text-4xl",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
  },
];
