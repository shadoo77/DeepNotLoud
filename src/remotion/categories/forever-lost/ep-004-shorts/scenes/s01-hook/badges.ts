import type { BadgeDef } from "@/components/atoms/SceneBadges";
import { loadFont } from "@remotion/google-fonts/BebasNeue";
import { loadFont as loadInterFont } from "@remotion/google-fonts/Inter";

const { fontFamily: bebasFont } = loadFont();

const { fontFamily: interFont } = loadInterFont("normal", {
  weights: ["400", "600"],
  subsets: ["latin"],
});

export const BADGES: BadgeDef[] = [
  {
    phrase: "hikers",
    fallbackFrame: 20,
    position: { left: 40, top: 140 },
    borderColor: "#8b1a1a",
    title: "9 HIKERS",
    subtitle: "Ages 21 to 37",
    subtitleColor: "#AAAAAA",
    titleFontFamily: bebasFont,
    subtitleFontFamily: interFont,
    titleSize: "text-3xl",
    hideAfterFrames: 150,
  },
  {
    phrase: "mountain",
    fallbackFrame: 80,
    position: { right: 40, top: 140 },
    borderColor: "#c17f24",
    title: "MOUNTAIN",
    subtitle: "Dead Mountain",
    subtitleColor: "#AAAAAA",
    titleFontFamily: bebasFont,
    subtitleFontFamily: interFont,
    titleSize: "text-3xl",
    hideAfterFrames: 180,
  },
  {
    phrase: "killed",
    fallbackFrame: 222,
    position: { right: 40, top: 280 },
    borderColor: "#8b1a1a",
    title: "WHY?",
    subtitle: "Still unknown",
    subtitleColor: "#AAAAAA",
    titleFontFamily: bebasFont,
    subtitleFontFamily: interFont,
    titleSize: "text-4xl",
    hideAfterFrames: 100,
  },
  {
    phrase: "explained",
    fallbackFrame: 320,
    position: { left: 40, top: 280 },
    borderColor: "#1a3d6b",
    title: "UNEXPLAINED",
    subtitle: "Still a mystery",
    subtitleColor: "#AAAAAA",
    titleFontFamily: bebasFont,
    subtitleFontFamily: interFont,
    titleSize: "text-3xl",
    hideAfterFrames: 120,
  },
];
