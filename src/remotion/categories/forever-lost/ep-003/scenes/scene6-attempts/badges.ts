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
    phrase: "1919",
    fallbackFrame: 430,
    position: { right: 40, top: "8%" },
    borderColor: C.gold,
    title: "1919 — NEWBOLD",
    subtitle: "First major decipherment claim",
    titleSize: "text-3xl",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    hideAfterFrames: 500,
  },
  {
    phrase: "gave up",
    fallbackFrame: 1749,
    position: { left: 50, top: "12%" },
    borderColor: C.red,
    title: "THEY GAVE UP",
    subtitle: "US Army codebreakers defeated",
    titleSize: "text-3xl",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    hideAfterFrames: 400,
  },
  {
    phrase: "nonsense",
    fallbackFrame: 3236,
    position: { right: 50, top: "65%" },
    borderColor: C.red,
    title: "FOOLED THE MACHINE",
    subtitle: "AI claimed Hebrew — completely wrong",
    titleSize: "text-3xl",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
  },
];
