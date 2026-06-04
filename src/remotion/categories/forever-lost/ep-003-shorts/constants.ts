import { SCENE_DURATION as S1_DURATION } from "./scenes/scene1-hook/constants";
import { SCENE_DURATION as S2_DURATION } from "./scenes/scene2-discovery/constants";
import { SCENE_DURATION as S3_DURATION } from "./scenes/scene3-stats/constants";

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const T = {
  fade: 10,
  slide: 15,
  wipe: 15,
} as const;

export const C = {
  bg: "#0A0A0A",
  gold: "#C8A96E",
  red: "#CC3333",
  white: "#FFFFFF",
  gray: "#AAAAAA",
  panel: "rgba(26,26,26,0.88)",
  tickerBg: "rgba(0,0,0,0.80)",
} as const;

export const ASSET_PATH = "assets/forever-lost/ep-003";

export const SCENES = {
  s1_hook: { durationInFrames: S1_DURATION },
  s2_discovery: { durationInFrames: S2_DURATION },
  s3_stats: { durationInFrames: S3_DURATION },
} as const;

const NUM_SCENES = Object.keys(SCENES).length;

export const TOTAL_FRAMES =
  Object.values(SCENES).reduce((a, b) => a + b.durationInFrames, 0) -
  (NUM_SCENES - 1) * T.fade;
