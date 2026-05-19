export const FPS = 30;

// Estimated durations (seconds) — replace with real WAV durations after TTS
export const ESTIMATED_DURATIONS = {
  scene_00: 20,  // The Elephant's Foot (Hook)
  scene_01: 25,  // April 26, 1986
  scene_02: 30,  // What the Core Became
  scene_03: 30,  // Physically Inaccessible
  scene_04: 25,  // The Cage Cannot Be Opened
  scene_05: 30,  // A 20,000-Year Grave
};

export const TRANSITION_DURATION = 30; // 1 sec fade
export const BLACK_HOLD_FRAMES = 15;

export const TOTAL_DURATION =
  Object.values(ESTIMATED_DURATIONS).reduce((a, b) => a + b, 0) * FPS +
  BLACK_HOLD_FRAMES -
  6 * TRANSITION_DURATION;

export const ASSET_PATH = "assets/forever-lost/ep-002";
