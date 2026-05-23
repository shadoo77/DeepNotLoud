import transcriptAct1 from "./scenes/scene1-hook/transcript_scene1.json";
import transcriptAct2 from "./scenes/scene2-stats/transcript_scene2.json";
import transcriptAct3 from "./scenes/scene3-corium/transcript_scene3.json";
import transcriptAct4 from "./scenes/scene4-sarcophagus/transcript_scene4.json";
import transcriptAct6 from "./scenes/scene6-exclusion/transcript_scene6.json";
import transcriptAct7 from "./scenes/scene7-closer/transcript_scene7.json";

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

// Transition durations (frames)
export const T = {
  fade: 15,
  slide: 20,
  wipe: 20,
} as const;

export const COLORS = {
  bg: "#0d0d0d",
  green: "#39FF14",
  red: "#8B0000",
  white: "#F0EEE4",
} as const;

export const ASSET_PATH = "assets/forever-lost/ep-002";
export const BLACK_HOLD_FRAMES = 30;

const lastEndMs1 = transcriptAct1[transcriptAct1.length - 1]?.endMs ?? 0;
const lastEndMs2 = transcriptAct2[transcriptAct2.length - 1]?.endMs ?? 0;
const lastEndMs3 = transcriptAct3[transcriptAct3.length - 1]?.endMs ?? 0;
const lastEndMs4 = transcriptAct4[transcriptAct4.length - 1]?.endMs ?? 0;
const lastEndMs6 = transcriptAct6[transcriptAct6.length - 1]?.endMs ?? 0;
const lastEndMs7 = transcriptAct7[transcriptAct7.length - 1]?.endMs ?? 0;

const getSceneDuration = (lastEndMs: number) =>
  Math.ceil((lastEndMs / 1000) * FPS) + BLACK_HOLD_FRAMES;

// Transcript-based durations (from whisper captions)
export const SCENES = {
  s1: { durationInFrames: getSceneDuration(lastEndMs1) }, // ~10.2s HOOK
  s2: { durationInFrames: getSceneDuration(lastEndMs2) }, // ~19.0s STATS
  // s2: { durationInFrames: 570 }, // ~19.0s STATS
  s3: { durationInFrames: getSceneDuration(lastEndMs3) }, // ~11.7s CORIUM
  s4: { durationInFrames: getSceneDuration(lastEndMs4) }, // ~22.1s SARCOPHAGUS
  s5: { durationInFrames: 120 }, // ~4s    VISUAL ONLY — liquidator image, no VO
  s6: { durationInFrames: getSceneDuration(lastEndMs6) }, // ~14.6s EXCLUSION ZONE
  s7: { durationInFrames: getSceneDuration(lastEndMs7) }, // ~16.0s CLOSER
} as const;

export const TOTAL_FRAMES =
  Object.values(SCENES).reduce((a, b) => a + b.durationInFrames, 0) - 100;
