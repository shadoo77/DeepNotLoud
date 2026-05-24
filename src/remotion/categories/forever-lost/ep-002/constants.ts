import transcriptIntro from "./scenes/intro/transcript_intro.json";
import transcriptS1 from "./scenes/scene1-hook/transcript_scene1.json";
import transcriptS2 from "./scenes/scene2-stats/transcript_scene2.json";
import transcriptS3 from "./scenes/scene3-corium/transcript_scene3.json";
import transcriptS4 from "./scenes/scene4-sarcophagus/transcript_scene4.json";
import transcriptS5 from "./scenes/scene5-human-cost/transcript_scene5.json";

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
const lastEndMsS2 = transcriptS2[transcriptS2.length - 1]?.endMs ?? 0;
const lastEndMsS3 = transcriptS3[transcriptS3.length - 1]?.endMs ?? 0;
const lastEndMsS4 = transcriptS4[transcriptS4.length - 1]?.endMs ?? 0;
const lastEndMsS5 = transcriptS5[transcriptS5.length - 1]?.endMs ?? 0;

const getSceneDuration = (lastEndMs: number) =>
  Math.ceil((lastEndMs / 1000) * FPS) + BLACK_HOLD_FRAMES;

const estimateDuration = (seconds: number) => Math.ceil(seconds * FPS);

export const SCENES = {
  intro: { durationInFrames: getSceneDuration(lastEndMsIntro) },
  s1: {
    // Add 11 seconds buffer for the MG01Timeline visuals to play after the VO ends
    durationInFrames: getSceneDuration(lastEndMsS1) + estimateDuration(11),
  },
  mg01: { durationInFrames: estimateDuration(11) },
  s2: { durationInFrames: getSceneDuration(lastEndMsS2) },
  mg02: { durationInFrames: estimateDuration(10) },
  s3: { durationInFrames: getSceneDuration(lastEndMsS3) },
  mg03: { durationInFrames: estimateDuration(18) },
  s4: { durationInFrames: getSceneDuration(lastEndMsS4) },
  mg04: { durationInFrames: estimateDuration(14) },
  s5: { durationInFrames: getSceneDuration(lastEndMsS5) },
  mg05: { durationInFrames: estimateDuration(10) },
  s6: { durationInFrames: estimateDuration(35) },
  mg06: { durationInFrames: estimateDuration(35) },
  s7: { durationInFrames: estimateDuration(25) },
  outro: { durationInFrames: estimateDuration(15) },
} as const;

export const TOTAL_FRAMES =
  Object.values(SCENES).reduce((a, b) => a + b.durationInFrames, 0) -
  (8 * T.fade + 2 * T.wipe);

export const mg01StartFrame =
  SCENES.s1.durationInFrames - SCENES.mg01.durationInFrames;
