# 🎬 FOREVER LOST — EP004 | PORTRAIT 9:16
## *Dyatlov Pass — The Deaths Still Officially Unexplained*
### SHORTS PRODUCTION FILE · TikTok / Reels / YouTube Shorts

---

## 📋 EPISODE METADATA

| Field | Value |
|---|---|
| Episode | 04 |
| Format | Portrait · 1080 × 1920 |
| FPS | 30 |
| Estimated Duration | **68–72 sec** |
| Voice | **Algenib** (Gravelly) |
| Total VO Words | ~154 words |

---

## ⚠️ SHORTS TIMING RULES — READ BEFORE GENERATING TTS

1. **Zero `[pause]` tags** — natural punctuation controls rhythm only
2. **3–4 sec per visual beat** = 7–12 words per sentence at Algenib's pace (~2.5 w/s)
3. Each scene = **one WAV file** — generate separately
4. **Trim guide** included per scene — if WAV runs long, cut the *(optional)* phrases first
5. Update `constants.ts` after every WAV is generated (`duration = wav_seconds × 30`)

---

## 🎵 AUDIO OVERVIEW

### Voice
- **Voice:** Algenib · Gravelly documentary narrator
- **Estimated pace:** ~2.5 words/second

### BGM
- **One track, full video** — cold eerie ambient, minimal pulse
- **YouTube Audio Library** search: `"arctic drone"` · `"dark tense mystery"` · `"cold ambient documentary"`
- **Suggested:** *"Enigmatic"* by Hanu Dixit · or *"Darkness"* category
- **File:** `public/ep004/bgm/ep004-shorts-bgm.mp3`
- **Mix:** –18 dB under VO · slight duck (–3 dB) during speech

### SFX
| File | Scene | Timing | Level |
|---|---|---|---|
| `wind-arctic.mp3` | S01, S04 | Fade in over first 1 sec | –20 dB |
| `heartbeat-slow.mp3` | S05 | Frame 0 of scene | –22 dB |
| `camera-shutter.mp3` | S07 | On last-photo moment (≈ frame 120) | –10 dB |

---

## 📁 PUBLIC FOLDER STRUCTURE

```
public/
└── ep004/
    ├── audio/shorts/
    │   ├── s01-hook.wav
    │   ├── s02-setup.wav
    │   ├── s03-stats.wav
    │   ├── s04-tent.wav
    │   ├── s05-bodies.wav
    │   ├── s06-unexplained.wav
    │   └── s07-closer.wav
    ├── images/
    │   ├── ep004-s01-mountain-dark.jpg
    │   ├── ep004-s02-hikers-silhouette.jpg
    │   ├── ep004-s03-snowfield-aerial.jpg
    │   ├── ep004-s04-tent-in-snow.jpg
    │   ├── ep004-s05-ravine-winter.jpg
    │   ├── ep004-s06-document-soviet.jpg
    │   └── ep004-s07-dark-treeline.jpg
    ├── sfx/
    │   ├── wind-arctic.mp3
    │   ├── heartbeat-slow.mp3
    │   └── camera-shutter.mp3
    └── bgm/
        └── ep004-shorts-bgm.mp3
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

**🎙️ TTS Director Prompt — paste into API route:**
```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — Dyatlov Pass" · Scene 01 · HOOK

## THE SCENE: Black screen. A cold mountain. Nine people who never came back.
An ice-cold void. Absolute silence before the voice drops in.

### DIRECTOR'S NOTES
Style: Gravelly, stone-cold, emotionless — the voice of deep inevitability
Pacing: Slow deliberate drops, each phrase lands like a fact, not an emotion
No warmup, no intro warmth — we are already in the dark

#### TRANSCRIPT
Nine hikers. One mountain. None came back.
What killed them has never been officially explained.
```

---

**🖼️ Image Prompt — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|
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

**🎙️ TTS Director Prompt:**
```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — Dyatlov Pass" · Scene 02 · SETUP

## THE SCENE: A timestamp appears. Cold mountains. Soviet Russia, 1959.
Historical. Anchoring. The feeling of opening a classified document.

### DIRECTOR'S NOTES
Style: Measured, factual, no emotion — this is a report, not a story
Pacing: A brief natural breath between lines, deliberate word placement

#### TRANSCRIPT
February 1959. The Ural Mountains, Soviet Russia.
Ten experienced hikers set out for Dead Mountain.
```

---

**🖼️ Image Prompt — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|
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
- *(optional trim: cut "across one and a half kilometers" → saves ~2 sec)*

---

**🎙️ TTS Director Prompt:**
```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — Dyatlov Pass" · Scene 03 · STATS

## THE SCENE: Numbers hit the screen like hammer blows. Cold hard facts.
The kind of cold that kills. The kind of evidence that haunts.

### DIRECTOR'S NOTES
Style: Precise, clinical — each stat lands as its own devastating sentence
Pacing: Slight natural beat between "Celsius" and "Nine bodies" — let the number breathe

#### TRANSCRIPT
Minus thirty Celsius. Nine bodies found across one and a half kilometers.
Their tent — cut open from the inside.
```

---

**🖼️ Image Prompt — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|
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
The hikers had fled barefoot into subzero darkness.
Something in that tent terrified nine trained adults.
```

**📊 Timing check:**
- Line 1: 7 words → ~2.8 sec
- Line 2: 8 words → ~3.2 sec
- Line 3: 9 words → ~3.6 sec
- **Total VO: ~9.6 sec** → scene padded to 11 sec (330 frames)

---

**🎙️ TTS Director Prompt:**
```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — Dyatlov Pass" · Scene 04 · THE TENT

## THE SCENE: An abandoned tent on a frozen slope. The wind howls.
Something happened here. The evidence is undeniable. The explanation is not.

### DIRECTOR'S NOTES
Style: Building unease — the voice slows slightly on "terrified nine trained adults"
Pacing: Each line is its own revelation, spaced naturally

#### TRANSCRIPT
Rescuers reached the camp three weeks later.
The hikers had fled barefoot into subzero darkness.
Something in that tent terrified nine trained adults.
```

---

**🖼️ Image Prompt — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|
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
- Line 2: 14 words → ~5.6 sec ← *longest line — if WAV runs long, cut "with no external wounds" and add it to line 3*
- Line 3: 8 words → ~3.2 sec
- **Total VO: ~12 sec** → scene padded to 12 sec (360 frames)
- *(optional trim: split Line 2 into "shattered ribs and fractured skulls" — removes 4 words)*

---

**🎙️ TTS Director Prompt:**
```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — Dyatlov Pass" · Scene 05 · THE BODIES

## THE SCENE: What the autopsies found. Cold clinical horror.
Facts so disturbing the Soviet government suppressed them for decades.

### DIRECTOR'S NOTES
Style: Clinical but heavy — each revelation lands like a door closing
Pacing: A very slight beat before "with no external wounds" — let that phrase land alone
The last line is quiet and final

#### TRANSCRIPT
Five of the nine died of hypothermia.
The others had shattered ribs and fractured skulls — with no external wounds.
The force matched a high-speed car crash.
```

---

**🖼️ Image Prompt — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|
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

**🎙️ TTS Director Prompt:**
```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — Dyatlov Pass" · Scene 06 · STILL UNEXPLAINED

## THE SCENE: An official stamp. A closed file. A conclusion that convinced nobody.
The quiet fury of unsatisfying answers to unbearable questions.

### DIRECTOR'S NOTES
Style: Slightly incredulous — the voice carries weight of disbelief without editorializing
Pacing: "Their verdict: an avalanche" — drop it short and flat, like a failed punchline
Final line is slow and definitive

#### TRANSCRIPT
Russia reopened the case in 2019.
Their verdict: an avalanche.
But the tent had no snow on it.
Sixty-five years later — nobody agrees.
```

---

**🖼️ Image Prompt — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|
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

**🎙️ TTS Director Prompt:**
```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — Dyatlov Pass" · Scene 07 · CLOSER

## THE SCENE: The last photograph. The last light. Then nothing.
A quiet ending that feels like staring into darkness.

### DIRECTOR'S NOTES
Style: [slow] — the quietest scene of all, barely above a whisper by the final line
Pacing: Natural breath before "was still there when they died" — the longest pause allowed
This line should feel like a verdict with no appeal

#### TRANSCRIPT
Their cameras were found in the snow.
The last photo: darkness and blur.
[slow] Whatever they ran from... was still there when they died.
```

---

**🖼️ Image Prompt — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|
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

## ⚙️ REMOTION CODE

### `src/ep004-shorts/constants.ts`

```typescript
// ─── EP004 DYATLOV PASS — SHORTS ────────────────────────────────────────────
// ⚠️  UPDATE durationSec for each scene after WAV generation
//     duration = Math.ceil(wav_duration_seconds * FPS) + TAIL_FRAMES

export const FPS = 30;
export const TAIL_FRAMES = 15; // 0.5 sec silence tail per scene

// Word counts for reference:        S01:16  S02:15  S03:21  S04:24  S05:27  S06:27  S07:24
// Estimated WAV @ 2.5 w/s:         6.4s    6.0s    8.4s    9.6s   10.8s   10.8s    9.6s
export const SCENE_DURATIONS_SEC = {
  S01: 7,   // update after WAV
  S02: 7,   // update after WAV
  S03: 10,  // update after WAV
  S04: 11,  // update after WAV
  S05: 12,  // update after WAV
  S06: 11,  // update after WAV
  S07: 11,  // update after WAV
} as const;

// Auto-calculated frame counts — do not edit manually
const toFrames = (sec: number) => Math.ceil(sec * FPS);

export const SCENES = (() => {
  const keys = Object.keys(SCENE_DURATIONS_SEC) as Array<keyof typeof SCENE_DURATIONS_SEC>;
  let cursor = 0;
  const result = {} as Record<keyof typeof SCENE_DURATIONS_SEC, { start: number; duration: number; end: number }>;
  for (const key of keys) {
    const duration = toFrames(SCENE_DURATIONS_SEC[key]);
    result[key] = { start: cursor, duration, end: cursor + duration };
    cursor += duration;
  }
  return result;
})();

export const TOTAL_FRAMES = Object.values(SCENES).reduce((sum, s) => Math.max(sum, s.end), 0);

export const PALETTE = {
  bg: '#08080f',
  text: '#e8f0f5',
  accent: '#c17f24',     // amber
  danger: '#8b1a1a',     // dark red
  cold: '#1a3d6b',       // cold blue
  muted: 'rgba(232,240,245,0.55)',
  overlay: 'rgba(0,0,0,0.62)',
};

export const FONTS = {
  display: '"Bebas Neue", sans-serif',
  body: '"Inter", sans-serif',
};
```

---

### `src/ep004-shorts/Root.tsx`

```typescript
import { Composition } from 'remotion';
import { DyatlovShortsMain } from './Main';
import { TOTAL_FRAMES, FPS } from './constants';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="DyatlovPassShorts"
    component={DyatlovShortsMain}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={1080}
    height={1920}
    defaultProps={{}}
  />
);
```

---

### `src/ep004-shorts/Main.tsx`

```typescript
import React from 'react';
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import { SCENES } from './constants';
import { S01_Hook } from './scenes/S01_Hook';
import { S02_Setup } from './scenes/S02_Setup';
import { S03_Stats } from './scenes/S03_Stats';
import { S04_Tent } from './scenes/S04_Tent';
import { S05_Bodies } from './scenes/S05_Bodies';
import { S06_Unexplained } from './scenes/S06_Unexplained';
import { S07_Closer } from './scenes/S07_Closer';

export const DyatlovShortsMain: React.FC = () => (
  <AbsoluteFill style={{ background: '#08080f' }}>
    {/* ─── Background Music ─── */}
    <Audio src={staticFile('ep004/bgm/ep004-shorts-bgm.mp3')} volume={0.18} />

    {/* ─── Scenes ─── */}
    <Sequence from={SCENES.S01.start} durationInFrames={SCENES.S01.duration}>
      <S01_Hook />
    </Sequence>
    <Sequence from={SCENES.S02.start} durationInFrames={SCENES.S02.duration}>
      <S02_Setup />
    </Sequence>
    <Sequence from={SCENES.S03.start} durationInFrames={SCENES.S03.duration}>
      <S03_Stats />
    </Sequence>
    <Sequence from={SCENES.S04.start} durationInFrames={SCENES.S04.duration}>
      <S04_Tent />
    </Sequence>
    <Sequence from={SCENES.S05.start} durationInFrames={SCENES.S05.duration}>
      <S05_Bodies />
    </Sequence>
    <Sequence from={SCENES.S06.start} durationInFrames={SCENES.S06.duration}>
      <S06_Unexplained />
    </Sequence>
    <Sequence from={SCENES.S07.start} durationInFrames={SCENES.S07.duration}>
      <S07_Closer />
    </Sequence>
  </AbsoluteFill>
);
```

---

### `src/ep004-shorts/components/SceneText.tsx`

```typescript
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { PALETTE, FONTS } from '../constants';

interface SceneTextProps {
  lines: { text: string; startFrame: number; color?: string; size?: number }[];
}

export const SceneText: React.FC<SceneTextProps> = ({ lines }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      justifyContent: 'flex-end', alignItems: 'flex-start',
      padding: '0 52px 140px 52px',
      gap: 16,
    }}>
      {lines.map(({ text, startFrame, color = PALETTE.text, size = 52 }, i) => {
        const localFrame = frame - startFrame;
        const opacity = interpolate(localFrame, [0, 14], [0, 1], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        });
        const y = interpolate(localFrame, [0, 14], [28, 0], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          easing: Easing.out(Easing.quad),
        });
        if (localFrame < 0) return null;
        return (
          <div key={i} style={{ opacity, transform: `translateY(${y}px)` }}>
            <span style={{
              fontFamily: FONTS.display,
              fontSize: size,
              color,
              lineHeight: 1.1,
              letterSpacing: 2,
              textTransform: 'uppercase',
              textShadow: '0 2px 12px rgba(0,0,0,0.9)',
            }}>
              {text}
            </span>
          </div>
        );
      })}
    </div>
  );
};
```

---

### `src/ep004-shorts/scenes/S01_Hook.tsx`

```typescript
import React from 'react';
import { AbsoluteFill, Audio, staticFile, interpolate, useCurrentFrame } from 'remotion';
import { SceneText } from '../components/SceneText';
import { PALETTE } from '../constants';

export const S01_Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Audio src={staticFile('ep004/audio/shorts/s01-hook.wav')} />
      <Audio src={staticFile('ep004/sfx/wind-arctic.mp3')} volume={0.12} />

      {/* Background */}
      <img
        src={staticFile('ep004/images/ep004-s01-mountain-dark.jpg')}
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: bgOpacity }}
      />
      {/* Vignette */}
      <AbsoluteFill style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)',
      }} />
      {/* Dark overlay */}
      <AbsoluteFill style={{ background: PALETTE.overlay }} />

      {/* Text lines — staggered by visual beat (3 sec = 90 frames each) */}
      <SceneText lines={[
        { text: 'Nine hikers. One mountain.', startFrame: 10 },
        { text: 'None came back.', startFrame: 100, color: PALETTE.accent },
        { text: "What killed them — never explained.", startFrame: 175, size: 44 },
      ]} />
    </AbsoluteFill>
  );
};
```

---

### `src/ep004-shorts/scenes/S03_Stats.tsx`

```typescript
import React from 'react';
import { AbsoluteFill, Audio, staticFile, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { PALETTE, FONTS } from '../constants';

export const S03_Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animated temperature counter (−30°C)
  const tempValue = Math.round(interpolate(frame, [20, 70], [-10, -30], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));
  const tempOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // "9 BODIES" slam in
  const bodiesScale = spring({ frame: frame - 90, fps, config: { damping: 10, stiffness: 200 } });
  const bodiesOpacity = interpolate(frame, [90, 105], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // "CUT FROM THE INSIDE" red reveal
  const cutOpacity = interpolate(frame, [185, 210], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Audio src={staticFile('ep004/audio/shorts/s03-stats.wav')} />
      <img
        src={staticFile('ep004/images/ep004-s03-snowfield-aerial.jpg')}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <AbsoluteFill style={{ background: 'rgba(0,0,0,0.72)' }} />

      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', gap: 32, flexDirection: 'column' }}>
        {/* Temperature */}
        <div style={{ opacity: tempOpacity, textAlign: 'center' }}>
          <div style={{ fontFamily: FONTS.display, fontSize: 110, color: '#a8c8f0', lineHeight: 1 }}>
            {tempValue}°C
          </div>
          <div style={{ fontFamily: FONTS.body, fontSize: 22, color: PALETTE.muted, letterSpacing: 6, marginTop: 6 }}>
            TEMPERATURE THAT NIGHT
          </div>
        </div>

        {/* Bodies count */}
        <div style={{ opacity: bodiesOpacity, transform: `scale(${bodiesScale})`, textAlign: 'center', marginTop: 20 }}>
          <div style={{ fontFamily: FONTS.display, fontSize: 130, color: PALETTE.text, lineHeight: 1 }}>9</div>
          <div style={{ fontFamily: FONTS.body, fontSize: 22, color: PALETTE.muted, letterSpacing: 6 }}>
            BODIES FOUND
          </div>
        </div>

        {/* Cut from inside */}
        <div style={{ opacity: cutOpacity, textAlign: 'center', marginTop: 20 }}>
          <div style={{
            fontFamily: FONTS.display, fontSize: 42, color: PALETTE.danger,
            letterSpacing: 4, borderTop: `2px solid ${PALETTE.danger}`,
            borderBottom: `2px solid ${PALETTE.danger}`, padding: '12px 28px',
          }}>
            TENT CUT FROM THE INSIDE
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
```

---

### `src/ep004-shorts/scenes/S07_Closer.tsx`

```typescript
import React from 'react';
import { AbsoluteFill, Audio, staticFile, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { PALETTE, FONTS } from '../constants';

export const S07_Closer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Camera flash at frame 120
  const flashOpacity = interpolate(frame, [118, 122, 128], [0, 0.55, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Final fade to black
  const fadeToBlack = interpolate(
    frame, [durationInFrames - 45, durationInFrames],
    [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const line1Opacity = interpolate(frame, [10, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line2Opacity = interpolate(frame, [100, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line3Opacity = interpolate(frame, [175, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill>
      <Audio src={staticFile('ep004/audio/shorts/s07-closer.wav')} />
      <Audio src={staticFile('ep004/sfx/camera-shutter.mp3')} startFrom={0} playbackRate={1} volume={0.8}
        // Delay shutter to frame 120 — achieved via Sequence offset in Main
      />

      <img
        src={staticFile('ep004/images/ep004-s07-dark-treeline.jpg')}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <AbsoluteFill style={{ background: 'rgba(0,0,0,0.7)' }} />

      {/* Camera flash */}
      <AbsoluteFill style={{ background: `rgba(255,255,255,${flashOpacity})` }} />

      {/* Text */}
      <AbsoluteFill style={{ justifyContent: 'flex-end', padding: '0 52px 160px 52px', flexDirection: 'column', gap: 20 }}>
        <div style={{ opacity: line1Opacity, fontFamily: FONTS.body, fontSize: 26, color: PALETTE.muted, letterSpacing: 3, textTransform: 'uppercase' }}>
          Their cameras were found in the snow.
        </div>
        <div style={{ opacity: line2Opacity, fontFamily: FONTS.display, fontSize: 54, color: PALETTE.text, letterSpacing: 2 }}>
          THE LAST PHOTO: DARKNESS AND BLUR.
        </div>
        <div style={{ opacity: line3Opacity, fontFamily: FONTS.display, fontSize: 46, color: PALETTE.accent, letterSpacing: 2, lineHeight: 1.2 }}>
          WHATEVER THEY RAN FROM... WAS STILL THERE.
        </div>
      </AbsoluteFill>

      {/* Fade to black */}
      <AbsoluteFill style={{ background: `rgba(0,0,0,${fadeToBlack})` }} />
    </AbsoluteFill>
  );
};
```

> **Note:** Scenes `S02_Setup`, `S04_Tent`, `S05_Bodies`, and `S06_Unexplained` follow the same structure as S01/S07. Use `SceneText` component with appropriate `startFrame` offsets based on each scene's line timing.

---

## 🔄 TIMING UPDATE WORKFLOW

```
1. Generate all 7 WAV files via TTS API
2. For each file: get duration_seconds
3. Update SCENE_DURATIONS_SEC in constants.ts
   → duration = ceil(wav_seconds) + 1  (1 sec silence buffer)
4. Run: npx remotion preview
5. Verify: each line of text aligns to the spoken word
6. Fine-tune startFrame offsets in scene components if needed
7. Render: npx remotion render DyatlovPassShorts out/ep004-shorts.mp4
```

---

## 🔧 RENDER COMMAND

```bash
npx remotion render DyatlovPassShorts out/ep004-dyatlov-shorts.mp4 \
  --codec=h264 \
  --crf=18 \
  --fps=30
```
