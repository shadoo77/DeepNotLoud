export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const SCENES = {
  s1: { durationInFrames: 240 }, // ~8s  HOOK
  s2: { durationInFrames: 420 }, // ~14s STATS
  s3: { durationInFrames: 450 }, // ~15s CORIUM
  s4: { durationInFrames: 480 }, // ~16s SARCOPHAGUS
  s5: { durationInFrames: 420 }, // ~14s HUMAN COST
  s6: { durationInFrames: 390 }, // ~13s EXCLUSION ZONE
  s7: { durationInFrames: 300 }, // ~10s CLOSER
} as const;

// Transition durations (frames)
export const T = {
  fade: 15,
  slide: 20,
  wipe: 20,
} as const;

// Total: sum of all scenes minus 6 transition overlaps
// (2x fade 15 + slide 20 + wipe 20 + 2x fade 15 = 100 frames)
export const TOTAL_FRAMES =
  Object.values(SCENES).reduce((a, b) => a + b.durationInFrames, 0) - 100;

export const ASSET_PATH = "assets/forever-lost/ep-002";
