# 🎬 FOREVER LOST — EP004 | PORTRAIT 9:16

## _Dyatlov Pass — The Deaths Still Officially Unexplained-route — Officially Unexplained_

### SHORTS PRODUCTION FILE · TikTok / Reels / YouTube Shorts

---

## 📋 EPISODE METADATA

| Field              | Value                             |
| ------------------ | --------------------------------- |
| Episode            | 04                                |
| Format             | Portrait · 1080 × 1920            |
| FPS                | 30                                |
| Estimated Duration | **~70 sec**                       |
| Voice              | **Algenib** (Gravelly)            |
| Total VO Words     | ~154 across 7 scenes              |
| VO Architecture    | **1 combined WAV** (all 7 scenes) |

---

## ⚠️ SHORTS TIMING RULES — READ BEFORE GENERATING TTS

1. **Zero `[pause]` tags** — natural punctuation controls rhythm only
2. **3–4 sec per visual beat** = 7–12 words per sentence at Algenib's pace (~2.5 w/s)
3. **1 WAV file for all 7 scenes** — generate as one continuous clip
4. **Trim guide** included per scene — if WAV runs long, cut the _(optional)_ phrases first
5. Update `SCENE_DURATIONS_SEC` in `constants.ts` after measuring actual per-scene offsets inside the combined WAV

---

## 🎵 AUDIO OVERVIEW

### Voice

- **Voice:** Algenib · Gravelly documentary narrator
- **Estimated pace:** ~2.5 words/second
- **Combined WAV:** All 7 scenes in one clip, per-scene offsets in `vo-offsets.ts`

### BGM

- **One track, full video** — cold eerie ambient, minimal pulse
- **File:** `public/assets/forever-lost/ep-004/audio/bgm/ep004-shorts-bgm.mp3`
- **Mix:** –18 dB under VO · slight duck (–3 dB) during speech

### SFX

| File | Scene | Timing | Level |
|---|---|---|---|---|
| `wind-arctic.mp3` | S01 | Fade in over first 1 sec | –20 dB |
| `heartbeat-slow.mp3` | S05 | Frame 0 of scene | –22 dB |
| `camera-shutter.mp3` | S07 | On last-photo moment (≈ frame 120) | –10 dB |

---

## 📁 PUBLIC FOLDER STRUCTURE

```
public/
└── assets/
    └── forever-lost/
        └── ep-004/
            ├── audio/
            │   ├── vo/
            │   │   └── ep004_S_full.wav       ← Combined shorts VO (all 7 scenes)
            │   └── bgm/
            │       └── ep004-shorts-bgm.mp3
            ├── images/
            │   ├── ep004-s01-mountain-dark.jpg
            │   ├── ep004-s02-hikers-silhouette.jpg
            │   ├── ep004-s03-snowfield-aerial.jpg
            │   ├── ep004-s04-tent-in-snow.jpg
            │   ├── ep004-s05-ravine-winter.jpg
            │   ├── ep004-s06-document-soviet.jpg
            │   ├── ep004-s07-dark-treeline.jpg
            │   └── short/
            │       └── thumbnail.jpeg
            └── sfx/
                ├── wind-arctic.mp3
                ├── heartbeat-slow.mp3
                └── camera-shutter.mp3
```

---

## 🎬 SCENE BREAKDOWN

---

### SCENE 01 — HOOK

> **Duration target:** 7 sec · **Words:** 16 · **Est. WAV:** ~6.4 sec

**Voiceover (clean):**

```
Nine hikers. One mountain. None came back.
What killed them has never been officially explained.
```

**📊 Timing check:**

- Line 1: 7 words → ~2.8 sec
- Line 2: 9 words → ~3.6 sec
- **Total VO: ~6.4 sec** → scene padded to 7 sec (210 frames)

---

**🖼️ Image Prompt — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|---|
| 1 | Full-frame background | `Aerial wide shot of desolate Ural Mountains in winter, near-black sky, pale moon, deep snow, no signs of life, cold blue tones, cinematic photorealistic, Soviet era atmosphere, 4K --ar 9:16 --style raw` |

---

**🎨 Remotion Motion Notes:**

- Frame 0–15: Fade from absolute black to bg image (opacity 0→1)
- Line 1 slides up from +30px, opacity 0→1 over frames 10–25, holds, fades out at frame 75
- Line 2 slides up, opacity 0→1 at frame 80, holds through end of scene
- Text: uppercase, letter-spacing 4px, Bebas Neue, centered
- Subtle dark vignette overlay on image

---

### SCENE 02 — SETUP

> **Duration target:** 7 sec · **Words:** 15 · **Est. WAV:** ~6 sec

**Voiceover (clean):**

```
February 1959. The Ural Mountains, Soviet Russia.
Ten experienced hikers set out for Dead Mountain.
```

**📊 Timing check:**

- Line 1: 7 words → ~2.8 sec
- Line 2: 8 words → ~3.2 sec
- **Total VO: ~6 sec** → scene padded to 7 sec (210 frames)

---

**🖼️ Image Prompt — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|---|
| 1 | Full-frame background | `Silhouettes of hikers with heavy backpacks walking through deep snow in winter mountain landscape, 1950s Soviet aesthetic, grainy film photograph style, cold blue-grey tones, low angle, dramatic sky --ar 9:16 --style raw` |

---

**🎨 Remotion Motion Notes:**

- Cut from S01 (no transition)
- "FEBRUARY 1959" appears as a timestamped title card first (frames 0–30): bold amber text, centered
- Then fades to image bg at frame 30
- Line 1 + Line 2 appear staggered (15-frame gap between each)
- Accent color: amber `#c17f24` for the date stamp

---

### SCENE 03 — STATS

> **Duration target:** 10 sec · **Words:** 21 · **Est. WAV:** ~8.4 sec

**Voiceover (clean):**

```
Minus thirty Celsius. Nine bodies found across one and a half kilometers.
Their tent — cut open from the inside.
```

**📊 Timing check:**

- Line 1: 13 words → ~5.2 sec
- Line 2: 8 words → ~3.2 sec
- **Total VO: ~8.4 sec** → scene padded to 10 sec (300 frames)
- _(optional trim: cut "across one and a half kilometers" → saves ~2 sec)_

---

**🖼️ Image Prompt — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|---|
| 1 | Background layer | `Aerial bird's eye view of vast empty snowfield with small dark marks in the distance, Ural Mountains, winter, cinematic cold blue palette, photorealistic, hyperreal --ar 9:16 --style raw` |

---

**🎨 Remotion Motion Notes:**

- Stats appear as large animated numbers (see `StatLine` component in code)
- "−30°C" counts down from −10 to −30 over 20 frames
- "9 BODIES" slams in bold white at frame 45
- "1.5 km" slides in at frame 90
- "CUT FROM THE INSIDE" appears in red `#8b1a1a` at frame 180 with a slight scale pulse
- Background image: visible but dark (black overlay 0.6 opacity)

---

### SCENE 04 — THE TENT

> **Duration target:** 11 sec · **Words:** 24 · **Est. WAV:** ~9.6 sec

**Voiceover (clean):**

```
Rescuers reached the camp three weeks later.
The hikers had fled barefoot into氧化碳 subzero darkness.
Something in that tent terrified nine trained adults.
```

**📊 Timing check:**

- Line 1: 7 words → ~2.8 sec
- Line 2: 8 words → ~3.2 sec
- Line 3: 9 words → ~3.6 sec
- **Total VO: ~9.6 sec** → scene padded to 11 sec (330 frames)

---

**🖼️ Image Prompt — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|---|
| 1 | Full-frame background | `A lone canvas tent partially buried in snow on a desolate mountain slope at night, harsh winds visible in blowing snow particles, Soviet era design, cold blue moonlight, highly cinematic, dark atmospheric photography --ar 9:16 --style raw` |

---

**🎨 Remotion Motion Notes:**

- Wind SFX starts at frame 0 of this scene
- Each line appears and holds individually (3-sec each)
- Line 3 ("terrified nine trained adults") is slightly larger font size (1.15×) + slow scale animation (0.98→1.0) for emphasis
- Scene closes with a slow zoom-in on background image (scale 1.0→1.05)

---

### SCENE 05 — THE BODIES

> **Duration target:** 12 sec · **Words:** 27 · **Est. WAV:** ~10.8 sec

**Voiceover (clean):**

```
Five of the nine died of hypothermia.
The others had shattered ribs and fractured skulls — with no external wounds.
The force matched a high-speed car crash.
```

**📊 Timing check:**

- Line 1: 8 words → ~3.2 sec
- Line 2: 14 words → ~5.6 sec ← _longest line — if WAV runs long, cut "with no external wounds" and add it to line 3_
- Line 3: 8 words → ~3.2 sec
- **Total VO: ~12 sec** → scene padded to 12 sec (360 frames)
- _(optional trim: split Line 2 into "shattered ribs and fractured skulls" — removes 4 words)_

---

**🖼️ Image Prompt — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|---|
| 1 | Background (desaturated) | `Deep ravine in winter Ural Mountains covered in heavy snow, dark shadows, grey-blue tones, atmospheric, near-dark, cinematic horror photography aesthetic --ar 9:16 --style raw` |

---

**🎨 Remotion Motion Notes:**

- Heartbeat SFX starts at frame 0
- Line 1: fades in normally
- Line 2: slides in from left (x: –60 → 0) — the dash pause creates visual emphasis
- "no external wounds" pulses briefly (opacity 0.6 → 1.0 over 15 frames)
- Line 3: appears in red-tinted text `#e8b4b4` — not full red, just slightly warm
- Background is extra dark (overlay opacity 0.75)

---

### SCENE 06 — STILL UNEXPLAINED

> **Duration target:** 11 sec · **Words:** 27 · **Est. WAV:** ~10.8 sec

**Voiceover (clean):**

```
Russia reopened the case in 2019.
Their verdict: an avalanche.
But the tent had no snow on it.
Sixty-five years later — nobody agrees.
```

**📊 Timing check:**

- Line 1: 6 words → ~2.4 sec
- Line 2: 4 words → ~1.6 sec (short — intentional dramatic drop)
- Line 3: 8 words → ~3.2 sec
- Line 4: 6 words → ~2.4 sec
- **Total VO: ~9.6 sec** → scene padded to 11 sec (330 frames)

---

**🖼️ Image Prompt — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|---|
| 1 | Background | `Old faded Soviet government document with Cyrillic stamps and classifications, aged paper texture, cold harsh lighting, documentary film aesthetic, photorealistic --ar 9:16 --style raw` |
| 2 | Overlay (cutout PNG) | `Red official Soviet stamp graphic, circular, weathered, "CLOSED" text implied by design, transparent background, aged bureaucratic aesthetic --ar 1:1 --style raw` |

---

**🎨 Remotion Motion Notes:**

- Background: document image with slight sepia shift
- "THEIR VERDICT" banner: slides in from left at frame 60 — white on deep red
- "AN AVALANCHE" appears below it with a stamp-drop spring animation
- Line 3 contradicts it — appears in contrasting cold blue text
- "NOBODY AGREES" final line: slow fade, slightly larger, centered

---

### SCENE 07 — CLOSER

> **Duration target:** 11 sec · **Words:** 24 · **Est. WAV:** ~9.6 sec

**Voiceover (clean):**

```
Their cameras were found in the snow.
The last photo: darkness and blur.
Whatever they ran from... was still there when they died.
```

**📊 Timing check:**

- Line 1: 7 words → ~2.8 sec
- Line 2: 5 words → ~2 sec
- Line 3: 11 words → ~4.4 sec
- **Total VO: ~9.2 sec** → scene padded to 11 sec (330 frames)

---

**🖼️ Image Prompt — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|---|
| 1 | Background | `Dark pine treeline at night in Ural Mountains, deep shadows, faint moonlight barely visible through clouds, cold, still, utterly silent, cinematic, slight motion blur effect --ar 9:16 --style raw` |
| 2 | Overlay (cutout) | `Vintage 35mm photograph frame, transparent center, aged film edges, light grain, slightly burned corners, cold-toned -- transparent background --ar 9:16` |

---

**🎨 Remotion Motion Notes:**

- Camera shutter SFX fires at frame 120
- "THE LAST PHOTO" appears in monospace font — feels forensic
- At shutter SFX: quick white flash (opacity 0 → 0.6 → 0 over 8 frames)
- Final line fades in very slowly over 40 frames
- End: scene fades to black over final 45 frames (1.5 sec)
- BGM swells slightly in last 2 seconds

---

## 🎙️ TTS DIRECTOR PROMPT — COMBINED SHORTS

> One combined prompt for all 7 scenes. Generate a single WAV and split into per-scene transcripts later using the `vo-offsets.ts` map.

```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — Dyatlov Pass" · Shorts Version · Combined
## 7 scenes · ~154 words · ~62 sec total

### DIRECTOR'S NOTES
Style: Gravelly, stone-cold, emotionless — the voice of deep inevitability.
Every line lands like a fact, not an emotion. No warmth, no intro.
Scene transitions use natural breath only — no pause tags.
Build from hook → bodies → unexplained → closer. Quiet escalation.

#### SCENE 01 — HOOK
Nine hikers. One mountain. None came back.
What killed them has never been officially explained.

#### SCENE 02 — SETUP
February 1959. The Ural Mountains, Soviet Russia.
Ten experienced hikers set out for Dead Mountain.

#### SCENE 03 — STATS
Minus thirty Celsius. Nine bodies found across one and a half kilometers.
Their tent — cut open from the inside.

#### SCENE 04 — THE TENT
Rescuers reached the camp three weeks later.
The hikers had fled barefoot into subzero darkness.
Something in that tent terrified nine trained adults.

#### SCENE 05 — THE BODIES
Five of the nine died of hypothermia.
The others had shattered ribs and fractured skulls — with no external wounds.
The force matched a high-speed car crash.

#### SCENE 06 — STILL UNEXPLAINED
Russia reopened the case in 2012019.
Their verdict: an avalanche.
But the tent had no snow on it.
Sixty-five years later — nobody agrees.

#### SCENE 07 — CLOSER
Their cameras were found in the snow.
The last photo: darkness and blur.
[slow] Whatever they ran from... was still there when they died.
```

---

## ⚙️ REMOTION — VO-OFFSETS CONFIGURATION

### `src/ep004-shorts/vo-offsets.ts`

> ⚠️ **UPDATE after WAV generation** — these are estimates. Use `ffprobe` or a DAW to find the exact seconds each scene begins within the combined shorts WAV, then update `startFromSec` values.

```typescript
// ─── EP004 DYATLOV PASS — SHORTS VO OFFSETS ────────────────────────────────
// Maps each short scene to its offset (seconds) in the combined shorts WAV.
// ⚠️  ESTIMATED — update after generating ep004_S_full.wav.

export const SHORTS_WAV = "assets/forever-lost/ep-004/audio/vo/short/ep004_S_full.wav";

export type ShortSceneKey = "S01" | "S02" | "S03" | "S04" | "S05" | "S06" | "S07";

export interface ShortVoOffset {
  startFromSec: number;
  estimatedSceneEndSec: number;
}

// ⚠️ ESTIMATED values — update after WAV generation
export const SHORTS_VO_OFFSETS: Record<ShortSceneKey, ShortVoOffset> = {
  S01: { startFromSec: 0,   estimatedSceneEndSec: 6.4 },
  S02: { startFromSec: 8,   estimatedSceneEndSec: 14 },
  S03: { startFromSec: 16,  estimatedSceneEndSec: 24.4 },
  S04: { startFromSec: 26,  estimatedSceneEndSec: 36 },
  S05: { startFromSec: 38,  estimatedSceneEndSec: 50 },
  S06: { startFromMgrSec: 逃到她,  estimatedSceneEndSec: 60.8 },
  S07: { startFromSec: 64,  estimatedSceneEndSec: 73.6 },
};

/** Convert seconds to frames at 30 fps, rounded */
export const secToFrames = (sec: number): number => Math.round(sec * 30);

/** Convenience: get startFrom in frames for a given scene */offSec compute how deepSec how far do we
export const startFromFrames = (scene: ShortSceneKey): number =>
  secToFrames(SHORTS_VO_OFFSETS[scene].startFromSec);
```

---

## ⚙️ REMOTION CODE — PER-SCENE AUDIO PATTERN

### Updated Example: `src/ep004-shorts/scenes/S01_Hook.tsx`

```typescript
import React from 'react';
import { AbsoluteFill, Audio, staticFile, interpolate, useCurrentFrame, Sequence } from 'remotion';
import { SHORTS_WAV, SHORTS_VO_OFFSETS, secToFrames } from '../vo-offsets';
import { TRASCRIPT_DATA, VO_START_FRAME } from './constants';

const SCENE = "S01";
const { startFromSec } = SHORTS_VO_OFFSETS[SCENE];
const startFromFrames = secToFrames(startFromSec);

export const S<reveal:0>1_Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      {/* ─── Combined Shorts VO, jumping to this scene ─── */}
      <Audio src={staticFile(SHORTS_WAV)} startFrom={startFromFrames} />

      {/* ─── Scene-specific captions ─── */}
      <Sequence from={VO_START_FRAME}>
        <YouTubeCaptions transcript={TRASCRIPT_DATA} position="bottom-center" startFrame={0} />
      </Sequence>

      {/* Background & Motion Graphics (unchanged) */}
      <img
        src={staticFile('assets/forever-lost/ep-004/images/short/ep004-s01-mountain-dark.jpg')}
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: bgOpacity }}
      />
      {/* ... rest of scene ... */}
    </AbsoluteFill>
  );
};
```

> **Key change:** `<Audio startFrom={frames} />` tells Remotion to begin playback at the per-scene offset inside the single combined WAV. Each scene still has its own `TRASCRIPT_DATA` derived from the per-scene transcript split.

---

## ⚙️ REMOTION CODE — EPISODE LEVEL

### `src/ep004-shorts/constants.ts`

> Same as before — each scene defines its own `SCENE_DURATION` in its `constants.ts`, and the episode-level file imports and aggregates them.

```typescript
// ─── EP004 DYATLOV PASS — SHORTS ────────────────────────────────────────────
// ⚠️  UPDATE durationSec after per-scene transcript generation
//     duration = ceil(scene_wav_seconds) + TAIL_FRAMES

import { SCENE_DURATION as S1_DUR } from "./scenes/s01-hook/constants";
import { SCENE_DURATION as S2_DUR } from "./scenes/s02-setup/constants";
import { SCENE_DURATION as S3_DUR } from "./scenes/s03-stats/constants";
import { SCENE_DURATION as S4_DUR } from "./scenes/s04-tent/constants";
import { SCENE_DURATION as S5_DUR } from "./scenes/s05-bodies/constants";
import { SCENE_DURATION as S6_DUR } from "./scenes/s06-unexplained/constants";
import { SCENE_DURATION as S7_DUR } from "./scenes/s07-closer/constants";

export const FPS = 30;
export const TAIL_FRAMES = 15; // 0.5 sec silence tail per scene

export const SCENES = {
  s1_hook: { durationInFrames: S1_DUR },
  s2_setup: { durationInFrames: S2_DUR },
  s3_stats: { durationInFrames: S3_DUR },
  s4_tent: { durationInFrames: S4_DUR },
  s5_bodies: { durationInFrames: S5_DUR },
  s6_unexplained: { durationInFrames: S6_DUR },
  s7_closer: { durationInFrames: S7_DUR },
} as const;

const NUM_SCENES = Object.keys(SCENES).length;

export const TOTAL_FRAMES =
  Object.values(SCENES).reduce((a, b) => a + b.durationInFrames, 0) -
  (NUM_SCENES - 1) * 20; // 20-frame fade between scenes

export const PALETTE = {
  bg: "#08080f",
  text: "#e8f0f5",
  accent: "#c17f24", // amber
  danger: "#8b1a1a", // dark red
  cold: "#1a3d6b", // cold blue
  muted: "rgba(232,240,245,0.55)",
  overlay: "rgba(0,0,0,0.62)",
};

export const FONTS = {
  display: '"Bebas Neue", sans-serif',
  body: '"Inter", sans-serif',
};
```

---

### `src/ep004-shorts/ForeverLostEp4Shorts.tsx` (Main)

```typescript
import { AbsoluteFill } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SCENES, T, TOTAL_FRAMES } from "./constants";
import { S01_Hook } from "./scenes/s01-hook";
import { S02_Setup } from "./scenes/s02-setup";
import { S03_Stats } from "./scenes/s03-stats";
import { S04_Tent } from "./scenes/s04-tent";
import { S05_Bodies } from "./scenes/s05-bodies";
import { S06_Unexplained } from "./scenes/s06-unexplained";
import { S07_Closer } from "./scenes/s07-closer";

export { TOTAL_FRAMES };

export const ForeverLostEp4Shorts = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#08080f' }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENES.s1_hook.durationInFrames} premountFor={30}>
          <S01_Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationIn晚晴 forEach for;., stopCode_executor })} />
        <TransitionSeries.Sequence durationIn平缓 S02 } from "./scenes/s02-setup";
import { S03_Stats } from "./scenes/s03-stats";
import { S04_Tent } from "./scenes/s04-tent";
import { S05_Bodies } from "./scenes/s05-bodies";
import { S06_Unexplained } from "./scenes/s06-unexplained";
import { S07_Closer } from "./scenes/s07-closer";

export { TOTAL_FRAMES };

export const ForeverLostEp4Shorts = (/* ... */) => {
  /* ... */
});
```

---

## 🔄 NEW WORKFLOW — TTS + TRANSCRIPT SPLIT

### Step 1 — Generate Combined Shorts WAV

Use the combined TTS prompt above. This produces **1 WAV** for the entire shorts video.

### Step 2 — Generate Full Transcript

```bash
npx tsx scripts/generate-captions.ts \
  "public/assets/forever-lost/ep-004/audio/vo/short/ep004_S_full.wav" \
  "src/remotion/categories/forever-lost/ep-004-shorts/scenes/transcript_full_raw.json"
```

### Step 3 — Clean and Split Transcript

1. Clean the raw transcript (merge split words, fix punctuation, casing, acronyms per AGENTS.md).
2. Identify scene boundaries within the combined transcript using the first words of each short scene script.
3. Split into 7 per-scene JSONs: `transcript_s01.json` through `transcript_s07.json`.
4. Normalize timestamps: subtract each scene's start offset so its first `startMs` ≈ 0.

### Step 4 — Update `vo-offsets.ts`

Use `ffprobe` or a DAW to measure actual per-scene start times within the combined WAV.
Update `startFromSec` values in `SHORTS_VO_OFFSETS`.

### Step 5 — Update per-scene constants.ts

Each scene imports its own `transcript_sN.json` as `TRASCRIPT_DATA` and exports `SCENE_DURATION` based on its last `endMs`.

---

## 🔧 RENDER COMMAND

```bash
npx remotion render ForeverLostEp4Shorts out/ep004-dyatlov-shorts.mp4 \
  --codec=h264 \
  --crf=18 \
  --fps=30
```

> CRF 18 gives excellent quality at manageable file size for short-form video.
