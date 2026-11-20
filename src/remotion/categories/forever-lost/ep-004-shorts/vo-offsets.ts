// ─── EP004-SHORTS VO OFFSETS ─────────────────────────────────────────────
// Maps each short scene to its offset (seconds) in the combined shorts WAV.
// Updated from actual transcript timestamps.

export const SHORTS_WAV =
  "assets/forever-lost/ep-004/audio/vo/short/ep004_S_full.wav";

export type ShortSceneKey =
  "S01" | "S02" | "S03" | "S04" | "S05" | "S06" | "S07";

export interface ShortVoOffset {
  startFromSec: number;
  estimatedSceneEndSec: number;
}

export const SHORTS_VO_OFFSETS: Record<ShortSceneKey, ShortVoOffset> = {
  S01: { startFromSec: 0.26, estimatedSceneEndSec: 12.0 },
  S02: { startFromSec: 12.0, estimatedSceneEndSec: 23.72 },
  S03: { startFromSec: 23.72, estimatedSceneEndSec: 35.44 },
  S04: { startFromSec: 35.44, estimatedSceneEndSec: 48.8 },
  S05: { startFromSec: 48.8, estimatedSceneEndSec: 62.4 },
  S06: { startFromSec: 62.4, estimatedSceneEndSec: 77.12 },
  S07: { startFromSec: 77.12, estimatedSceneEndSec: 90.32 },
};

/** Convert seconds to frames at 30 fps, rounded */
export const secToFrames = (sec: number): number => Math.round(sec * 30);

/** Convenience: get startFrom in frames for a given scene */
export const startFromFrames = (scene: ShortSceneKey): number =>
  secToFrames(SHORTS_VO_OFFSETS[scene].startFromSec);
