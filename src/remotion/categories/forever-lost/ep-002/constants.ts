import transcriptIntro from "./scenes/intro/transcript_intro.json";
import transcriptS1 from "./scenes/scene1-hook/transcript_scene1.json";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const T = {
  fade: 20,
  slide: 25,
  wipe: 25,
} as const;

export const C = {
  bg: "#111111",
  green: "#39FF14",
  red: "#8B0000",
  white: "#F0EEE4",
  dimBg: "rgba(0,0,0,0.7)",
  panel: "rgba(17,17,17,0.92)",
} as const;

export const ASSET_PATH = "assets/forever-lost/ep-002";
export const BLACK_HOLD_FRAMES = 30;

const lastEndMsIntro = transcriptIntro[transcriptIntro.length - 1]?.endMs ?? 0;
const lastEndMsS1 = transcriptS1[transcriptS1.length - 1]?.endMs ?? 0;

const getSceneDuration = (lastEndMs: number) =>
  Math.ceil((lastEndMs / 1000) * FPS) + BLACK_HOLD_FRAMES;

const estimateDuration = (seconds: number) => Math.ceil(seconds * FPS);

export const SCENES = {
  intro: { durationInFrames: getSceneDuration(lastEndMsIntro) },
  s1: { durationInFrames: getSceneDuration(lastEndMsS1) },
  mg01: { durationInFrames: estimateDuration(12) },
  s2: { durationInFrames: estimateDuration(30) },
  mg02: { durationInFrames: estimateDuration(35) },
  s3: { durationInFrames: estimateDuration(35) },
  mg03: { durationInFrames: estimateDuration(40) },
  s4: { durationInFrames: estimateDuration(40) },
  mg04: { durationInFrames: estimateDuration(30) },
  s5: { durationInFrames: estimateDuration(35) },
  mg05: { durationInFrames: estimateDuration(40) },
  s6: { durationInFrames: estimateDuration(35) },
  mg06: { durationInFrames: estimateDuration(35) },
  s7: { durationInFrames: estimateDuration(25) },
  outro: { durationInFrames: estimateDuration(15) },
} as const;

export const TOTAL_FRAMES =
  Object.values(SCENES).reduce((a, b) => a + b.durationInFrames, 0) -
  (8 * T.fade + 3 * T.slide + 3 * T.wipe);
