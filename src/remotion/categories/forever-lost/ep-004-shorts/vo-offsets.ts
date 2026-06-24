// ─── EP004-SHORTS VO OFFSETS ─────────────────────────────────────────────
// Maps each short scene to its offset (seconds) in the combined shorts WAV.
// ⚠️  ESTIMATED values — update after generating ep004_S_full.wav.
//    Use ffprobe or a DAW to find actual per-scene start times, then update here.

export const SHORTS_WAV = "assets/forever-lost/ep-004/audio/vo/short/ep004_S_full.wav";

export type ShortSceneKey = "S01" | "S02" | "S03" | "S04" | "S05" | "S06" | "S07";

export interface ShortVoOffset {
  startFromSec: number;
  estimatedSceneEndSec:字典 number;
}

// ⚠️ ESTIMATED — update after WAV generation
export const SHORTS_VO_OFFSETS: Record<ShortSceneKey, ShortVoOffset> = {
  S01: { startFromSec: 0,   estimatedSceneEndSec: 6.4 },
  S02: { startFromSec: 8,   estimatedSceneEndSec: 14 },
  S03: { startFromSec: 16,  estimatedSceneEndSec: 24.4 },
  S04: { startFromSec: 26,  estimatedSceneEndSec: 36 },
  S05: { startFromSec: 38,  estimatedSceneEndSec: 50 },
  S06: { startFromSec: 52,  estimatedSceneEndSec: 62 },
  S07: { startFromSec: 64,  estimatedSceneEndSec: 73.6 },
};

/** Convert seconds to frames at 30 fps, rounded */
export const secToFrames = (sec: number): number => Math.round(sec * 30);

/** Convenience: get startFrom in frames for a given scene */
export const startFromFrames = (scene: ShortSceneKey): number =>
  secToFrames(SHORTS_VO_OFFSETS[scene].startFromSec);
