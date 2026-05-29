import { SCENE_DURATION as S1_DURATION } from "./scenes/scene1-intro";
import { SCENE_DURATION as S2_DURATION } from "./scenes/scene2-discovery";
import { SCENE_DURATION as S3_DURATION } from "./scenes/scene3-what-is-it";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const T = {
  fade: 20,
  slide: 25,
  wipe: 25,
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
export const BLACK_HOLD_FRAMES = 30;

export const SCENES = {
  s1: { durationInFrames: S1_DURATION },
  s2: { durationInFrames: S2_DURATION },
  s3: { durationInFrames: S3_DURATION },
} as const;

export const TOTAL_FRAMES =
  Object.values(SCENES).reduce((a, b) => a + b.durationInFrames, 0) -
  T.fade;
