export const FPS = 30;
export const W = 1920;
export const H = 1080;

export const SCENES = {
  intro: { durationInFrames: 693 },
  s1: { durationInFrames: 600 },
  mg01: { durationInFrames: 750 },
  s2: { durationInFrames: 900 },
  mg02: { durationInFrames: 1050 },
  s3: { durationInFrames: 1050 },
  mg03: { durationInFrames: 1200 },
  s4: { durationInFrames: 1200 },
  mg04: { durationInFrames: 900 },
  s5: { durationInFrames: 1050 },
  mg05: { durationInFrames: 1200 },
  s6: { durationInFrames: 1050 },
  mg06: { durationInFrames: 1050 },
  s7: { durationInFrames: 750 },
  outro: { durationInFrames: 450 },
} as const;

export const T = { fade: 20, slide: 25, wipe: 25 } as const;

export const TOTAL_FRAMES =
  Object.values(SCENES).reduce((a, b) => a + b.durationInFrames, 0) - 322;

export const C = {
  bg: "#111111",
  green: "#39FF14",
  red: "#8B0000",
  white: "#F0EEE4",
  dimBg: "rgba(0,0,0,0.7)",
  panel: "rgba(17,17,17,0.92)",
} as const;

export const ASSET_PATH = "assets/forever-lost/ep-002";
