// ─── EP004 DYATLOV PASS — LANDSCAPE VO OFFSETS ─────────────────────────────
// Maps each scene to its act WAV offset (seconds).
// ⚠️  ESTIMATED values — update after generating the act WAVs.
//    Use ffprobe or a DAW to find actual scene boundaries inside each act WAV.
//    Then update startFromSec to the real values.

export const VO = {
  act1: "assets/forever-lost/ep-004/audio/vo/ep004_L_act1_setup.wav",
  act2: "assets/forever-lost/ep-004/audio/vo/ep004_L_act2_horror.wav",
  act3: "assets/forever-lost/ep-004/audio/vo/ep004_L_act3_resolution.wav",
} as const;

export type SceneKey =
  "S01" | "S02" | "S03" | "S04" | "S05" | "S06" | "S07" | "S08" | "S09" | "S10";

export interface VoOffset {
  src: string;
  startFromSec: number;
  estimatedSceneEndSec: number;
}

// ⚠️ ESTIMATED — update after ACT WAV generation
export const VO_OFFSETS: Record<SceneKey, VoOffset> = {
  // ─── ACT 1: Setup ────────────────────
  S01: {
    src: VO.act1,
    startFromSec: 0,
    estimatedSceneEndSec: 22,
  },
  S02: {
    src: VO.act1,
    startFromSec: 24,
    estimatedSceneEndSec: 55,
  },
  S03: {
    src: VO.act1,
    startFromSec: 57,
    estimatedSceneEndSec: 78,
  },

  // ─── ACT 2: Horror ───────────────────
  S04: {
    src: VO.act2,
    startFromSec: 0,
    estimatedSceneEndSec: 41,
  },
  S05: {
    src: VO.act2,
    startFromSec: 43,
    estimatedSceneEndSec: 75,
  },
  S06: {
    src: VO.act2,
    startFromSec: 77,
    estimatedSceneEndSec: 124,
  },
  S07: {
    src: VO.act2,
    startFromSec: 126,
    estimatedSceneEndSec: 176,
  },
  S08: {
    src: VO.act2,
    startFromSec: 178,
    estimatedSceneEndSec: 207,
  },

  // ─── ACT 3: Resolution ───────────────
  S09: {
    src: VO.act3,
    startFromSec: 0,
    estimatedSceneEndSec: 33,
  },
  S10: {
    src: VO.act3,
    startFromSec: 35,
    estimatedSceneEndSec: 58,
  },
};

/** Convert seconds to frames at 30 fps, rounded */
export const secToFrames = (sec: number): number => Math.round(sec * 30);

/** Convenience: get startFrom in frames for a given scene */
export const startFromFrames = (scene: SceneKey): number =>
  secToFrames(VO_OFFSETS[scene].startFromSec);
