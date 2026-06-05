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
    phrase: "hoax",
    fallbackFrame: 50,
    position: { right: 30, top: "12%" },
    borderColor: "#888888",
    title: "MEDIEVAL HOAX",
    subtitle: "Some believe it's fake",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-2xl",
  },
];
