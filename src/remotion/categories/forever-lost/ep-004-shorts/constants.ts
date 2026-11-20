import { SHORTS_VO_OFFSETS, type ShortSceneKey } from "./vo-offsets";

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const T = {
  fade: 20,
  slide: 15,
} as const;

export const C = {
  bg: "#08080f",
  text: "#e8f0f5",
  gold: "#c17f24",
  amber: "#c17f24",
  red: "#8b1a1a",
  cold: "#1a3d6b",
  white: "#FFFFFF",
  gray: "#AAAAAA",
  muted: "rgba(232,240,245,0.55)",
  overlay: "rgba(0,0,0,0.62)",
  danger: "#8b1a1a",
} as const;

export const ASSET_PATH = "assets/forever-lost/ep-004";

const _sf = (k: ShortSceneKey) =>
  Math.round(SHORTS_VO_OFFSETS[k].startFromSec * FPS);
const _ef = (k: ShortSceneKey) =>
  Math.round(SHORTS_VO_OFFSETS[k].estimatedSceneEndSec * FPS);

export const SCENE_DURATIONS = {
  s1_hook: _sf("S02") - _sf("S01") + T.fade,
  s2_setup: _sf("S03") - _sf("S02") + T.fade,
  s3_stats: _sf("S04") - _sf("S03") + T.fade,
  s4_tent: _sf("S05") - _sf("S04") + T.fade,
  s5_bodies: _sf("S06") - _sf("S05") + T.fade,
  s6_unexplained: _sf("S07") - _sf("S06") + T.fade,
  s7_closer: _ef("S07") - _sf("S07") + FPS,
} as const;

export const SCENES = {
  s1_hook: { durationInFrames: SCENE_DURATIONS.s1_hook },
  s2_setup: { durationInFrames: SCENE_DURATIONS.s2_setup },
  s3_stats: { durationInFrames: SCENE_DURATIONS.s3_stats },
  s4_tent: { durationInFrames: SCENE_DURATIONS.s4_tent },
  s5_bodies: { durationInFrames: SCENE_DURATIONS.s5_bodies },
  s6_unexplained: { durationInFrames: SCENE_DURATIONS.s6_unexplained },
  s7_closer: { durationInFrames: SCENE_DURATIONS.s7_closer },
} as const;

const NUM_SCENES = Object.keys(SCENES).length;

export const TOTAL_FRAMES =
  Object.values(SCENES).reduce((a, b) => a + b.durationInFrames, 0) -
  (NUM_SCENES - 1) * T.fade;
