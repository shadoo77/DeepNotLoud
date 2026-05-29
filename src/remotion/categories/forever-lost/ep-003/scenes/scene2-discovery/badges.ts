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
    phrase: "1912",
    fallbackFrame: 90,
    position: { left: 370, top: 230 },
    borderColor: C.gold,
    title: "1912",
    subtitle: "Discovery at Villa Mondragone",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
  },
  {
    phrase: "never seen before",
    fallbackFrame: 620,
    position: { left: 370, top: 370 },
    borderColor: C.red,
    title: "NEVER BEFORE SEEN",
    subtitle: "Unlike anything found before",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
  },
  {
    phrase: "dies having failed",
    fallbackFrame: 1800,
    position: { left: 370, top: 530 },
    borderColor: C.gold,
    title: "1930",
    subtitle: "Voynich died without an answer",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
  },
  {
    phrase: "carbon dating",
    fallbackFrame: 1885,
    position: { left: 370, top: 690 },
    borderColor: C.gold,
    title: "2009",
    subtitle: "Carbon dated: 1404–1438 CE",
    titleFontFamily: cinzelFont,
    subtitleFontFamily: interFont,
  },
];
