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
    phrase: "someone",
    fallbackFrame: 60,
    position: { right: 30, top: "12%" },
    borderColor: C.gold,
    title: "SOMEONE",
    subtitle: "A real person wrote this",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-2xl",
    hideAfterFrames: 60,
  },
  {
    phrase: "thoughts",
    fallbackFrame: 155,
    position: { left: 30, top: "20%" },
    borderColor: C.gold,
    title: "THOUGHTS",
    subtitle: "Ideas locked in ink",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-2xl",
    hideAfterFrames: 70,
  },
  {
    phrase: "secrets",
    fallbackFrame: 270,
    position: { right: 30, bottom: "28%" },
    borderColor: C.red,
    title: "SECRETS",
    subtitle: "Maybe forever hidden",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-2xl",
    hideAfterFrames: 80,
  },
  {
    phrase: "probably",
    fallbackFrame: 385,
    position: { left: 30, bottom: "15%" },
    borderColor: C.gray,
    title: "PROBABLY",
    subtitle: "We may never know",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-2xl",
    hideAfterFrames: 100,
  },
];
