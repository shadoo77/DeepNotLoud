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
    // Spoken at 6,650ms → frame ~260. Triggered by " hoax" in transcript.
    phrase: "hoax",
    fallbackFrame: 300,
    position: { right: 40, bottom: 200 },
    borderColor: C.red,
    title: "THE HOAX",
    subtitle: "Six centuries undetected",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    hideAfterFrames: 200,
  },
  {
    // "Esperanto." at 43,140ms → frame ~1,354.
    phrase: "Esperanto",
    fallbackFrame: 800,
    position: { right: 40, bottom: "20%" },
    borderColor: C.gold,
    title: "CONSTRUCTED LANGUAGE",
    subtitle: "Before its time",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-2xl",
    hideAfterFrames: 300,
  },
  {
    // "cipher," at 77,870ms → frame ~2,396.  Short title → text-4xl.
    phrase: "cipher",
    fallbackFrame: 1800,
    position: { right: 50, bottom: "30%" },
    borderColor: C.gold,
    title: "UNBREAKABLE",
    subtitle: "Key died with author",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-4xl",
    // Hide before the closing bottle sequence (tBottleFrame ≈ 2,680)
    // so this badge doesn't overlap badge 4 + MessageBottleText.
    hideAfterFrames: 280,
  },
  {
    // "bottle" is NOT in the transcript — the closing bottle sequence is a
    // poetic visual overlay, not narrated.  fallbackFrame places this badge
    // just as the bottle image fades in (tBottleFrame = 2,680).
    phrase: "bottle",
    fallbackFrame: 2700,
    position: { right: 40, top: "65%" },
    borderColor: C.gold,
    title: "MESSAGE IN A BOTTLE",
    subtitle: "Thrown into time",
    subtitleColor: C.gray,
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
    titleSize: "text-2xl",
    hideAfterFrames: 120,
  },
];
