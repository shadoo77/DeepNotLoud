// constants.ts
// ─────────────────────────────────────────────────────────────────────────────
// AUTO-UPDATE THIS FILE after generating all WAVs.
// Replace estimated_duration_seconds with real WAV durations,
// then recalculate start/end frames.
//
// Formula: frames = Math.round(durationSeconds * FPS)
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

// ── Transition durations (frames) per scene ──────────────────────────────────
// Each scene has a transition-in at the start. Voice starts after this buffer.
export const TRANSITION_DURATIONS = {
  scene_01: FPS, // fade in (1s)
  scene_02: FPS, // fade (1s)
  scene_03: FPS, // fade (1s)
  scene_04: FPS, // fade (1s)
  scene_05: FPS, // fade (1s)
  scene_06: FPS, // fade (1s)
  scene_07: FPS, // fade in (1s)
};

// ── Real WAV durations (seconds) — fill these in after TTS generation ────────
// Replace each value with: actual_wav_duration_in_seconds
export const DURATIONS = {
  scene_01: 26, // Hook
  scene_02: 36, // The Depth
  scene_03: 40, // Crushing Pressure
  scene_04: 44, // Scale & Wreckage
  scene_05: 44, // Fragility
  scene_06: 50, // Failed Plans
  scene_07: 50, // Outro
};

// ── Scene frame ranges (auto-derived from DURATIONS) ─────────────────────────
const toFrames = (s: number) => Math.round(s * FPS);

let _cursor = 0;
const _build = (key: keyof typeof DURATIONS) => {
  const start = _cursor;
  const durationInFrames = toFrames(DURATIONS[key]);
  _cursor += durationInFrames;
  return { start, end: _cursor, durationInFrames };
};

export const SCENES = {
  SCENE_01: _build("scene_01"), // Hook
  SCENE_02: _build("scene_02"), // The Depth
  SCENE_03: _build("scene_03"), // Crushing Pressure
  SCENE_04: _build("scene_04"), // Scale & Wreckage
  SCENE_05: _build("scene_05"), // Fragility
  SCENE_06: _build("scene_06"), // Failed Plans
  SCENE_07: _build("scene_07"), // Outro
};

// ── Full video total frames ───────────────────────────────────────────────────
export const TOTAL_FRAMES = _cursor; // 8,700 frames @ 30fps ≈ 4:50 min

// ── Teaser: Scene 01 + Scene 02 + 90-frame CTA (3 sec) ──────────────────────
export const TEASER_FRAMES =
  SCENES.SCENE_01.durationInFrames + SCENES.SCENE_02.durationInFrames + 90; // CTA card at end

// ── Voice files (in public/forever-lost/ep-001/voices/) ──────────────────────────────────────────
export const VOICE_FILES = {
  scene_01: "assets/forever-lost/ep-001/voices/scene_01_hook.wav",
  scene_02: "assets/forever-lost/ep-001/voices/scene_02_depth.wav",
  scene_03: "assets/forever-lost/ep-001/voices/scene_03_pressure.wav",
  scene_04: "assets/forever-lost/ep-001/voices/scene_04_scale.wav",
  scene_05: "assets/forever-lost/ep-001/voices/scene_05_fragility.wav",
  scene_06: "assets/forever-lost/ep-001/voices/scene_06_plans.wav",
  scene_07: "assets/forever-lost/ep-001/voices/scene_07_outro.wav",
};

// ── SFX files (in public/forever-lost/ep-001/sfx/) ────────────────────────────────────────────────
export const SFX = {
  deepRumble: "assets/forever-lost/ep-001/sfx/deep-rumble.wav",
  sonarPing: "assets/forever-lost/ep-001/sfx/sonar-ping.wav",
  whooshDown: "assets/forever-lost/ep-001/sfx/whoosh-down.wav",
  pressureHum: "assets/forever-lost/ep-001/sfx/water-pressure-hum.wav",
  counterTick: "assets/forever-lost/ep-001/sfx/counter-tick.wav",
  impactBoom: "assets/forever-lost/ep-001/sfx/impact-boom.wav",
  crushCreak: "assets/forever-lost/ep-001/sfx/crush-creak.wav",
  explosionUnderwater:
    "assets/forever-lost/ep-001/sfx/explosion-underwater.wav",
  crumble: "assets/forever-lost/ep-001/sfx/crumble.wav",
  eerieLoop: "assets/forever-lost/ep-001/sfx/eerie-tone.wav",
  stampReject: "assets/forever-lost/ep-001/sfx/stamp-reject.wav",
  cashRegister: "assets/forever-lost/ep-001/sfx/cash-register.wav",
  emotionalPiano: "assets/forever-lost/ep-001/sfx/emotional-piano.wav",
  oceanAmbience: "assets/forever-lost/ep-001/sfx/ocean-ambience.wav",
};

// ── Image files (in public/forever-lost/ep-001/images/) ──────────────────────────────────────────
export const IMAGES = {
  oceanBg: "assets/forever-lost/ep-001/images/ocean-bg.jpeg",
  titanicCutout: "assets/forever-lost/ep-001/images/titanic-cutout.jpeg",
  depthScroll: "assets/forever-lost/ep-001/images/depth-scroll.jpeg",
  titanicHero: "assets/forever-lost/ep-001/images/titanic-hero.jpeg",
  depthDiagram: "assets/forever-lost/ep-001/images/depth-diagram.jpeg",
  pressureBg: "assets/forever-lost/ep-001/images/pressure-bg.jpeg",
  debrisField: "assets/forever-lost/ep-001/images/debris-field.jpeg",
  rusticles: "assets/forever-lost/ep-001/images/rusticles.jpeg",
  blueprintPlans: "assets/forever-lost/ep-001/images/blueprint-plans.jpeg",
  artifactsFloor: "assets/forever-lost/ep-001/images/artifacts-floor.jpeg",
  sizeComparison: "assets/forever-lost/ep-001/images/size-comparison.jpeg",
};
