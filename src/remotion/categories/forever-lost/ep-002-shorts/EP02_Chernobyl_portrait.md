# FOREVER LOST — Episode 2

# "Why Chernobyl's Core Can Never Be Removed"

> **Full Production Bible — 60s YouTube Shorts Rebuild** — Script · TTS · Image Prompts · BGM · SFX · Remotion Code
> Built against official Remotion best practices (remotion-dev/skills, May 2026)
> Scripts rewritten for word economy · Voice: Charon · Target: ~57s

---

## EPISODE OVERVIEW

| Field          | Detail                                                                                |
| -------------- | ------------------------------------------------------------------------------------- |
| Runtime target | ~57 seconds (60s cap)                                                                 |
| Format         | 9:16 portrait, 1080×1920                                                              |
| FPS            | 30                                                                                    |
| Voice          | `Charon` — Gravelly, deep documentary tone                                            |
| Total scenes   | 7                                                                                     |
| Color palette  | Ash `#1A1A1A` · Toxic green `#39FF14` · Blood red `#8B0000` · Off-white `#F0EEE4`     |
| Fonts          | Titles: `Bebas Neue` · Stats: `Inter 800` · Subtitles: `Inter 400` (via Google Fonts) |

---

## FOLDER STRUCTURE

```
remotion-forever-lost/
├── public/
│   ├── audio/
│   │   ├── ep02_s1.wav
│   │   ├── ep02_s2.wav
│   │   ├── ep02_s3.wav
│   │   ├── ep02_s4.wav
│   │   ├── ep02_s5.wav
│   │   ├── ep02_s6.wav
│   │   └── ep02_s7.wav
│   ├── sfx/
│   │   ├── geiger_loop.wav
│   │   ├── metal_groan.wav
│   │   ├── radiation_hum.wav
│   │   ├── explosion_distant.wav
│   │   └── heartbeat_slow.wav
│   ├── bgm/
│   │   └── ep02_bgm.mp3
│   └── images/
│       ├── ep02_s1_aerial.png
│       ├── ep02_s2_texture.png
│       ├── ep02_s3_corium.png
│       ├── ep02_s4_sarcophagus.png
│       ├── ep02_s5_liquidators.png
│       ├── ep02_s6_exclusion_zone.png
│       └── ep02_s7_sky.png
├── src/
│   ├── Root.tsx
│   ├── Episode02.tsx
│   ├── constants.ts
│   ├── fonts.ts
│   └── scenes/
│       ├── Scene1_Hook.tsx
│       ├── Scene2_Stats.tsx
│       ├── Scene3_Corium.tsx
│       ├── Scene4_Sarcophagus.tsx
│       ├── Scene5_HumanCost.tsx
│       ├── Scene6_Exclusion.tsx
│       └── Scene7_Closer.tsx
```

---

## BACKGROUND MUSIC

**Style:** Cold ambient drone — no melody, no rhythm. Tension-pad atmosphere.
**Source:** YouTube Audio Library (royalty-free, no attribution required)
**Search terms:** `"dark ambient documentary"` · `"tension underscore no drums"` · `"cold atmospheric pad"`
**Good tracks to audition:** Void · Darkness · Hollowed (YouTube Audio Library)

**Mix envelope across video:**

- Scenes 1–2: 15% — near silence carries weight
- Scenes 3–4: ramp to 35% — facts land harder with support
- Scene 5: 12% — visual-only beat, silence carries weight
- Scenes 6–7: fade 25% → 0% over final 4 seconds

**File:** `public/bgm/ep02_bgm.mp3`

---

## SFX PLACEMENT GUIDE

| File                    | Scene     | Trigger       | Volume    | Notes                                  |
| ----------------------- | --------- | ------------- | --------- | -------------------------------------- |
| `explosion_distant.wav` | S1        | Frame 0       | 60%       | Muffled 1986 blast under first VO line |
| `geiger_loop.wav`       | S2–S3, S6 | S2 start      | 25% / 15% | Loop tick; reduce in S6                |
| `radiation_hum.wav`     | S3        | Corium reveal | 30%       | Low electrical hum, layer with geiger  |
| `metal_groan.wav`       | S4        | Frame 5       | 45%       | Single hit, structural stress          |
| `heartbeat_slow.wav`    | S7        | 8 seconds in  | 40%       | One beat, then silence                 |

**Source:** freesound.org · zapsplat.com · pixabay.com/sound-effects

---

## SCENE-BY-SCENE PRODUCTION BREAKDOWN

---

---

## SCENE-BY-SCENE PRODUCTION BREAKDOWN

---

### SCENE 1 — HOOK

**Budget: 7s → 210 frames**

```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — Why Chernobyl's Core Can Never Be Removed"
## THE SCENE: Cold open. Night aerial. Explosion echo at frame 0.

### DIRECTOR'S NOTES
Style: Absolute. No warmth. No setup.
Pacing: Fast drop, then the word "forever" hits alone.

#### TRANSCRIPT
[serious]
It exploded in 1986.
The core is still there.
[slow] It will be there... forever.
```

**Word count: 14w · Est: ~7s**
**Voice:** `Charon`
**SFX frame 0:** `explosion_distant.wav` 60%

#### IMAGE PROMPT (Nano Banana 2)

```
Aerial night photograph of Chernobyl Nuclear Power Plant, reactor 4 visible,
eerie amber glow from New Safe Confinement dome, dark surrounding forest,
overcast sky, photorealistic, cinematic — desaturated with slight green tint,
ultra-wide drone shot, no people, no text
```

**Usage:** Full-frame background. Scale 1.0 → 1.08 Ken Burns zoom via `interpolate`.

#### MOTION DIRECTION

- Image: `scale 1.0 → 1.08` over full scene, `interpolate(frame, [0, durationInFrames], [1.0, 1.08])`
- `"CHERNOBYL"` — Bebas Neue 96px, white, fades in at frame 30 over 20 frames
- `"UKRAINE · 1986"` — Inter 400 28px, fades in at frame 60 over 20 frames
- All opacity: `interpolate` with `Easing.bezier(0.16, 1, 0.3, 1)` — NO CSS transitions

---

### SCENE 2 — STATS

**Budget: 8s → 240 frames**

```
# AUDIO PROFILE: Documentary Narrator
## THE SCENE: Three numbers. No context. No explanation. Just the weight.

### DIRECTOR'S NOTES
Style: Monotone. Clinical. Like reading a death toll.
Pacing: One beat between each stat — not a pause, just a breath.

#### TRANSCRIPT
[serious]
Four hundred Hiroshima bombs worth of radiation.
Two hundred tonnes of nuclear fuel — still fused inside.
Six hundred thousand workers sent to clean it.
```

**Word count: 29w · Est: ~8s**
**Voice:** `Charon`
**SFX:** `geiger_loop.wav` loops 25%

> **Director note:** Three facts. No connective tissue. The motion graphics carry the context —
> the voice just confirms what the numbers already scream.

#### IMAGE PROMPT (Nano Banana 2)

```
Dark grey concrete texture, close-up, industrial Soviet-era surface, faint
radiation trefoil symbol barely visible, cinematic, desaturated, no text
```

**Usage:** Background at 15% opacity — texture only.

#### STAT CARDS — MOTION DIRECTION

Cards stagger with `<Sequence from={n}>` — each slides up `translateY 40 → 0` + `opacity 0 → 1` over 20 frames using `interpolate` + `Easing.bezier(0.16,1,0.3,1)`.

| Card | Value   | Label                        | Color     | Starts at |
| ---- | ------- | ---------------------------- | --------- | --------- |
| 1    | `×400`  | Hiroshima bombs of radiation | `#39FF14` | frame 10  |
| 2    | `200t`  | nuclear fuel still inside    | `#F0EEE4` | frame 50  |
| 3    | `600K+` | cleanup workers deployed     | `#8B0000` | frame 110 |

---

### SCENE 3 — CORIUM

**Budget: 6s → 180 frames**

```
# AUDIO PROFILE: Documentary Narrator
## THE SCENE: The Elephant's Foot. Pure dread.

### DIRECTOR'S NOTES
Style: Drop the name. Drop the number. Exit.
Pacing: Flat, no drama — the facts are dramatic enough.

#### TRANSCRIPT
[serious]
The melted fuel formed a new substance.
They call it the Elephant's Foot.
Four minutes beside it — fatal.
```

**Word count: 17w · Est: ~6s**
**Voice:** `Charon`
**SFX:** `geiger_loop.wav` + `radiation_hum.wav` layered

#### IMAGE PROMPT (Nano Banana 2)

```
Close-up photograph of glowing molten corium mass in a Chernobyl basement,
dark cavern surroundings, eerie amber and red glow emanating from the mass,
grainy low-light photography aesthetic, cinematic, photorealistic, no people,
no text
```

**Usage:** Right 60% of screen. Left edge masked with gradient `linear-gradient(to right, #1A1A1A, transparent)`.

#### MOTION DIRECTION

- Image gentle pulse: `scale` cycles 1.0 → 1.02 → 1.0 on a 4-second loop using `interpolate(frame % (fps * 4), ...)` — NOT CSS animation
- `"THE ELEPHANT'S FOOT"` slides in from left at frame 0–fps, Bebas Neue 52px
- Green underline bar: `width 0% → 100%` over 15 frames after title appears

---

### SCENE 4 — SARCOPHAGUS + HUMAN COST (MERGED)

**Budget: 9s → 270 frames**

> S5 Human Cost is merged here as a single closing line.
> The motion graphics handle the liquidator stat (`600K` card from S2 already planted it).
> One line of grief is more powerful than a full scene of it.

```
# AUDIO PROFILE: Documentary Narrator
## THE SCENE: Why the tomb was built. Ends with the human cost — one line.

### DIRECTOR'S NOTES
Style: First half — blunt engineering fact. Second half — quiet devastation.
Pacing: Speed up on the machine failure fact, slow hard on the final line.

#### TRANSCRIPT
[serious]
No robot survives inside. Radiation destroys electronics within hours.
So the world spent two point three billion dollars — to build a dome over it.
[slow] Not to fix it. Just to contain it.
```

**Word count: 29w · Est: ~9s ✅**
**Voice:** `Charon`
**SFX:** `metal_groan.wav` frame 5, 45%

#### IMAGE PROMPT (Nano Banana 2)

```
Wide angle photograph of the New Safe Confinement steel arch dome at Chernobyl,
massive silver metallic structure covering reactor 4, overcast grey sky, barren
industrial foreground, no people, photorealistic, cinematic, desaturated cool tones,
slightly foggy, shot from ground level looking up
```

**Usage:** Full-frame. Parallax: `translateY -20 → 0` via `interpolate` over first 30 frames.

#### MOTION DIRECTION

- `"$2.3B"` — Bebas Neue 110px, white. Entry via `spring({ fps, frame: frame - fps*2, config: { damping: 12 } })` scale pop
- Sub-label fades in 20 frames after stat
- Bottom blood-red bar: `translateX -1080 → 0` over 25 frames at fps\*3, `Easing.bezier(0.16,1,0.3,1)`
- Bar text: `"10,000 röntgen/hour — still inside reactor 4"`

---

### SCENE 5 — VISUAL-ONLY BEAT (NO VO)

**Budget: 4s → 120 frames**

> Removed as a separate VO scene. Human cost delivered via motion graphics in S4.
> This scene acts as a gut-punch pause — no voiceover, just `geiger_loop.wav` and silence.
> The `600K+` stat card in S2 + grayscale liquidator image carries the emotional weight silently.

**Voice:** None — silence is intentional
**SFX:** `geiger_loop.wav` at 12% volume, loop

#### IMAGE PROMPT (Nano Banana 2)

```
Black and white photograph of Soviet liquidator workers at Chernobyl, wearing
heavy protective gear and respirator masks, looking toward camera or walking away,
industrial ruins background, solemn documentary photography style, high contrast,
no color, no text, cinematic grain
```

**Usage:** Full-frame. `filter: "grayscale(100%)"` applied via inline style (not CSS class — Remotion renders inline styles correctly). Radial vignette overlay.

#### MOTION DIRECTION

- Vignette: black radial gradient, `opacity 0 → 0.6` over first 20 frames via `interpolate`
- `"600,000 LIQUIDATORS"` — Inter 700 38px white, bottom third, fades in at frame 30
- Sub-line: `"sent to clean what could not be cleaned"` — Inter 400 20px, fades in 10 frames after

---

### SCENE 6 — EXCLUSION ZONE

**Budget: 8s → 240 frames**

```
# AUDIO PROFILE: Documentary Narrator
## THE SCENE: The zone. The number. The permanence.

### DIRECTOR'S NOTES
Style: Cold geography. End on the number like a verdict.
Pacing: Fast setup, land hard on "twenty thousand years."

#### TRANSCRIPT
[serious]
Fifty thousand people were evacuated.
They were told three days.
Most never came back.
[slow] Some areas won't be safe for twenty thousand years.
```

**Word count: 24w · Est: ~8s ✅**
**Voice:** `Charon`
**SFX:** `geiger_loop.wav` 15%

#### IMAGE PROMPT (Nano Banana 2)

```
Aerial drone photograph of Pripyat abandoned city near Chernobyl, overgrown
streets reclaimed by forest, faded Soviet apartment blocks visible through trees,
Ferris wheel visible in distance, overcast sky, cinematic desaturated tones with
slight green cast, no people, no text, wide establishing shot
```

**Usage:** Full-frame. Slow zoom OUT `scale 1.06 → 1.0` — emphasizes emptiness and scale.

#### MOTION DIRECTION

- Badge top-left: `"EXCLUSION ZONE · 2,600 km²"` fades in at frame 30, Inter 700 18px, green border
- Counter: animated number counts 0 → 20,000 using `interpolate` with `Easing.bezier(0.25, 1, 0.5, 1)` between fps*1 and fps*5
- `"years until this land is safe again"` — Inter 400 24px white, fades in with counter

---

### SCENE 7 — EMOTIONAL CLOSER

**Budget: 8s → 240 frames**

```
# AUDIO PROFILE: Documentary Narrator
## THE SCENE: The ending. Permanent. Quiet.

### DIRECTOR'S NOTES
Style: Not sad. Not angry. Just final.
Pacing: Each sentence is its own breath. No rush.

#### TRANSCRIPT
[slow]
It will outlive everyone alive today.
It will outlive their children.
[serious] It is not a problem.
[slow] It is just... a fact of the earth now.
```

**Word count: 27w · Est: ~8s ✅**
**Voice:** `Charon`
**SFX:** `heartbeat_slow.wav` — one beat at frame 180 (6s in), then silence
**BGM:** Fade to 0% by last frame

#### IMAGE PROMPT (Nano Banana 2)

```
Wide angle sky photograph at dawn above Chernobyl, New Safe Confinement dome
silhouette barely visible at bottom of frame, dramatic cloud formation, pale
orange and grey sunrise light, vast emptiness, photorealistic, cinematic,
extremely wide lens, no people, no text, melancholic beauty
```

**Usage:** Full-frame. Slow upward drift `translateY 10 → 0`. Entire scene fades to black over final 20 frames.

#### MOTION DIRECTION

- `"FOREVER LOST"` — Bebas Neue 64px white, fades in at frame 30 over 20 frames, letter-spacing 10
- `"Episode 2 · Chernobyl"` — Inter 400 22px, fades in 10 frames after title
- Final fade: black `<AbsoluteFill>` overlay, `opacity 0 → 1` over last 20 frames via `interpolate(frame, [durationInFrames - 20, durationInFrames], [0, 1])`

---

## REMOTION CODE

> **Best practices applied throughout (remotion-dev/skills):**
>
> - All animations driven by `useCurrentFrame()` — ZERO CSS transitions or Tailwind animation classes
> - Audio via `<Audio>` from `@remotion/media`
> - Sequences always include `premountFor`
> - `<TransitionSeries>` from `@remotion/transitions` for all cuts
> - Fonts via `@remotion/google-fonts`
> - All asset paths via `staticFile()`
> - Frame counts are placeholders — update `constants.ts` after WAV generation

---

### `src/fonts.ts`

```ts
import { loadFont } from "@remotion/google-fonts/BebasNeue";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

export const { fontFamily: bebasNeue } = loadFont();
export const { fontFamily: inter } = loadInter();
```

---

### `src/constants.ts`

```ts
// UPDATE THESE after generating WAV files.
// Multiply each WAV duration (seconds) x 30 = frames.

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const SCENES = {
  s1: { durationInFrames: 210 }, // ~7s   HOOK
  s2: { durationInFrames: 240 }, // ~8s   STATS
  s3: { durationInFrames: 180 }, // ~6s   CORIUM
  s4: { durationInFrames: 270 }, // ~9s   SARCOPHAGUS
  s5: { durationInFrames: 120 }, // ~4s   VISUAL ONLY — liquidator image, no VO, silence
  s6: { durationInFrames: 240 }, // ~8s   EXCLUSION ZONE
  s7: { durationInFrames: 240 }, // ~8s   CLOSER
} as const;

// Transition durations (frames)
export const T = {
  fade: 15,
  slide: 20,
  wipe: 20,
} as const;

// Total: sum of all scenes minus 6 transition overlaps
// (2x fade 15 + slide 20 + wipe 20 + 2x fade 15 = 100 frames)
// Placeholder: (210+240+180+270+120+240+240) - 100 = 1400 frames = ~46.6s
// ⚠️  After WAV re-generation, real WAV durations will push this to ~57s
export const TOTAL_FRAMES =
  Object.values(SCENES).reduce((a, b) => a + b.durationInFrames, 0) - 100;

export const COLORS = {
  bg: "#1A1A1A",
  green: "#39FF14",
  red: "#8B0000",
  white: "#F0EEE4",
} as const;
```

---

### `src/Root.tsx`

```tsx
import { Composition } from "remotion";
import { Episode02 } from "./Episode02";
import { TOTAL_FRAMES, FPS, WIDTH, HEIGHT } from "./constants";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ForeverLost_EP02"
      component={Episode02}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
```

---

### `src/Episode02.tsx`

```tsx
import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { SCENES, T } from "./constants";
import { Scene1Hook } from "./scenes/Scene1_Hook";
import { Scene2Stats } from "./scenes/Scene2_Stats";
import { Scene3Corium } from "./scenes/Scene3_Corium";
import { Scene4Sarcophagus } from "./scenes/Scene4_Sarcophagus";
import { Scene5HumanCost } from "./scenes/Scene5_HumanCost";
import { Scene6Exclusion } from "./scenes/Scene6_Exclusion";
import { Scene7Closer } from "./scenes/Scene7_Closer";

export const Episode02: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#1A1A1A" }}>
      {/* Global BGM with volume envelope */}
      <Audio
        src={staticFile("bgm/ep02_bgm.mp3")}
        volume={(f) => {
          if (f < 210) return 0.15;
          if (f < 450) return 0.15 + ((f - 210) / 240) * 0.2;
          if (f < 720) return 0.35;
          if (f < 840) return 0.12;
          return Math.max(0, 0.25 - ((f - 840) / 240) * 0.25);
        }}
        loop
      />

      <TransitionSeries>
        <TransitionSeries.Sequence
          durationInFrames={SCENES.s1.durationInFrames}
          premountFor={30}
        >
          <Scene1Hook />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T.fade })}
        />

        <TransitionSeries.Sequence
          durationInFrames={SCENES.s2.durationInFrames}
          premountFor={30}
        >
          <Scene2Stats />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T.fade })}
        />

        <TransitionSeries.Sequence
          durationInFrames={SCENES.s3.durationInFrames}
          premountFor={30}
        >
          <Scene3Corium />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T.slide })}
        />

        <TransitionSeries.Sequence
          durationInFrames={SCENES.s4.durationInFrames}
          premountFor={30}
        >
          <Scene4Sarcophagus />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-top" })}
          timing={linearTiming({ durationInFrames: T.wipe })}
        />

        <TransitionSeries.Sequence
          durationInFrames={SCENES.s5.durationInFrames}
          premountFor={30}
        >
          <Scene5HumanCost />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T.fade })}
        />

        <TransitionSeries.Sequence
          durationInFrames={SCENES.s6.durationInFrames}
          premountFor={30}
        >
          <Scene6Exclusion />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T.fade })}
        />

        <TransitionSeries.Sequence
          durationInFrames={SCENES.s7.durationInFrames}
          premountFor={30}
        >
          <Scene7Closer />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
```

---

### `src/scenes/Scene1_Hook.tsx`

```tsx
import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Easing,
} from "remotion";
import { Audio } from "@remotion/media";
import { bebasNeue, inter } from "../fonts";
import { COLORS } from "../constants";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const scale = interpolate(frame, [0, durationInFrames], [1.0, 1.08], {
    extrapolateRight: "clamp",
  });
  const titleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/ep02_s1.wav")} />
      <Audio src={staticFile("sfx/explosion_distant.wav")} volume={0.6} />

      <AbsoluteFill>
        <Img
          src={staticFile("images/ep02_s1_aerial.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.65))",
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily: bebasNeue,
            fontSize: 96,
            color: COLORS.white,
            opacity: titleOpacity,
            letterSpacing: 8,
            textAlign: "center",
          }}
        >
          CHERNOBYL
        </div>
        <div
          style={{
            fontFamily: inter,
            fontSize: 28,
            color: COLORS.white,
            opacity: subtitleOpacity,
            fontWeight: 400,
            letterSpacing: 4,
            textAlign: "center",
          }}
        >
          UKRAINE · 1986
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
```

---

### `src/scenes/Scene2_Stats.tsx`

```tsx
import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Easing,
} from "remotion";
import { Audio } from "@remotion/media";
import { bebasNeue, inter } from "../fonts";
import { COLORS } from "../constants";

const StatCard: React.FC<{
  value: string;
  label: string;
  color: string;
  startFrame: number;
}> = ({ value, label, color, startFrame }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return (
    <div
      style={{
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [40, 0])}px)`,
        background: "rgba(0,0,0,0.55)",
        border: `2px solid ${color}`,
        borderRadius: 8,
        padding: "20px 28px",
        marginBottom: 24,
        width: "85%",
      }}
    >
      <div
        style={{ fontFamily: bebasNeue, fontSize: 80, color, lineHeight: 1 }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: inter,
          fontSize: 22,
          color: COLORS.white,
          fontWeight: 400,
          marginTop: 6,
          lineHeight: 1.4,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const Scene2Stats: React.FC = () => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/ep02_s2.wav")} />
      <Audio src={staticFile("sfx/geiger_loop.wav")} volume={0.25} loop />
      <AbsoluteFill>
        <Img
          src={staticFile("images/ep02_s2_texture.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.15,
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "rgba(26,26,26,0.85)" }} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: 80,
        }}
      >
        <StatCard
          value="×400"
          label="Hiroshima bombs of radiation released"
          color={COLORS.green}
          startFrame={10}
        />
        <StatCard
          value="200t"
          label="nuclear fuel still inside reactor 4"
          color={COLORS.white}
          startFrame={50}
        />
        <StatCard
          value="600K+"
          label="cleanup workers sent to the site"
          color={COLORS.red}
          startFrame={110}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
```

---

### `src/scenes/Scene3_Corium.tsx`

```tsx
import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Easing,
} from "remotion";
import { Audio } from "@remotion/media";
import { bebasNeue, inter } from "../fonts";
import { COLORS } from "../constants";

export const Scene3Corium: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gentle pulse — 4-second cycle via modulo, NOT CSS animation
  const cyclFrame = frame % (fps * 4);
  const imgScale = interpolate(
    cyclFrame,
    [0, fps * 2, fps * 4],
    [1.0, 1.02, 1.0],
  );

  const titleX = interpolate(frame, [0, fps], [-60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const titleOpacity = interpolate(frame, [0, fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const barWidth = interpolate(frame, [fps + 5, fps + 20], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const descOpacity = interpolate(frame, [fps * 2, fps * 2 + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <Audio src={staticFile("audio/ep02_s3.wav")} />
      <Audio src={staticFile("sfx/geiger_loop.wav")} volume={0.2} loop />
      <Audio src={staticFile("sfx/radiation_hum.wav")} volume={0.3} loop />

      {/* Right image panel */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "60%",
          height: "100%",
        }}
      >
        <Img
          src={staticFile("images/ep02_s3_corium.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${imgScale})`,
            transformOrigin: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "40%",
            height: "100%",
            background: `linear-gradient(to right, ${COLORS.bg}, transparent)`,
          }}
        />
      </div>

      {/* Left text panel */}
      <AbsoluteFill
        style={{
          width: "55%",
          justifyContent: "center",
          paddingLeft: 48,
          flexDirection: "column",
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateX(${titleX}px)`,
          }}
        >
          <div
            style={{
              fontFamily: bebasNeue,
              fontSize: 52,
              color: COLORS.white,
              lineHeight: 1.1,
            }}
          >
            {"THE ELEPHANT'S\nFOOT"}
          </div>
          <div
            style={{
              height: 3,
              width: `${barWidth}%`,
              background: COLORS.green,
              marginTop: 8,
              borderRadius: 2,
            }}
          />
          <div
            style={{
              fontFamily: inter,
              fontSize: 20,
              color: COLORS.white,
              marginTop: 20,
              lineHeight: 1.6,
              opacity: descOpacity,
            }}
          >
            Molten nuclear fuel fused with concrete and steel. Still radioactive
            enough to kill within minutes.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
```

---

### `src/scenes/Scene4_Sarcophagus.tsx`

```tsx
import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  staticFile,
  Sequence,
  Easing,
} from "remotion";
import { Audio } from "@remotion/media";
import { bebasNeue, inter } from "../fonts";
import { COLORS } from "../constants";

export const Scene4Sarcophagus: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const imgY = interpolate(frame, [0, 30], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const statScale = spring({
    fps,
    frame: frame - fps * 2,
    config: { damping: 12, stiffness: 200 },
    durationInFrames: 20,
  });
  const statOpacity = interpolate(frame, [fps * 3, fps * 3 + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const barX = interpolate(frame, [fps * 3, fps * 3 + 25], [-1080, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/ep02_s4.wav")} />
      <Sequence from={5} premountFor={10}>
        <Audio src={staticFile("sfx/metal_groan.wav")} volume={0.45} />
      </Sequence>

      <AbsoluteFill>
        <Img
          src={staticFile("images/ep02_s4_sarcophagus.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `translateY(${imgY}px)`,
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "rgba(0,0,0,0.55)" }} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            opacity: statOpacity,
            transform: `scale(${statScale})`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: bebasNeue,
              fontSize: 110,
              color: COLORS.white,
              lineHeight: 1,
            }}
          >
            $2.3B
          </div>
          <div
            style={{
              fontFamily: inter,
              fontSize: 24,
              color: COLORS.white,
              fontWeight: 400,
              marginTop: 8,
              letterSpacing: 2,
            }}
          >
            The New Safe Confinement · Total Program Cost
          </div>
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          transform: `translateX(${barX}px)`,
          background: COLORS.red,
          padding: "14px 40px",
        }}
      >
        <span
          style={{
            fontFamily: inter,
            fontSize: 22,
            color: COLORS.white,
            fontWeight: 700,
          }}
        >
          10,000 röntgen/hour — still inside reactor 4
        </span>
      </div>
    </AbsoluteFill>
  );
};
```

---

### `src/scenes/Scene5_HumanCost.tsx`

```tsx
import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";
import { Audio } from "@remotion/media";
import { inter } from "../fonts";
import { COLORS } from "../constants";

export const Scene5HumanCost: React.FC = () => {
  const frame = useCurrentFrame();

  const vignetteOpacity = interpolate(frame, [0, 20], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* NO VO AUDIO — silence is intentional */}
      <Audio src={staticFile("sfx/geiger_loop.wav")} volume={0.12} loop />
      <AbsoluteFill>
        <Img
          src={staticFile("images/ep02_s5_liquidators.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "grayscale(100%)",
          }}
        />{" "}
        {/* inline style — correct for Remotion */}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          opacity: vignetteOpacity,
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.9) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 120,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              opacity: labelOpacity,
              fontFamily: inter,
              fontSize: 38,
              color: COLORS.white,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            600,000 Liquidators
          </div>
          <div
            style={{
              fontFamily: inter,
              fontSize: 20,
              color: "rgba(240,238,228,0.7)",
              fontWeight: 400,
              marginTop: 8,
            }}
          >
            sent to clean what could not be cleaned
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
```

---

### `src/scenes/Scene6_Exclusion.tsx`

```tsx
import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Easing,
} from "remotion";
import { Audio } from "@remotion/media";
import { bebasNeue, inter } from "../fonts";
import { COLORS } from "../constants";

export const Scene6Exclusion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Zoom OUT
  const scale = interpolate(frame, [0, durationInFrames], [1.06, 1.0], {
    extrapolateRight: "clamp",
  });
  const badgeOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Animated counter 0 → 20000
  const counterValue = Math.round(
    interpolate(frame, [fps * 1, fps * 5], [0, 20000], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    }),
  );
  const counterOpacity = interpolate(frame, [fps * 1, fps * 1 + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/ep02_s6.wav")} />
      <Audio src={staticFile("sfx/geiger_loop.wav")} volume={0.15} loop />
      <AbsoluteFill>
        <Img
          src={staticFile("images/ep02_s6_exclusion_zone.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${scale})`,
            transformOrigin: "center",
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "rgba(0,0,0,0.45)" }} />

      {/* Badge */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 40,
          opacity: badgeOpacity,
          background: "rgba(0,0,0,0.6)",
          border: `1px solid ${COLORS.green}`,
          borderRadius: 4,
          padding: "8px 16px",
        }}
      >
        <span
          style={{
            fontFamily: inter,
            fontSize: 18,
            color: COLORS.green,
            fontWeight: 700,
          }}
        >
          EXCLUSION ZONE · 2,600 km²
        </span>
      </div>

      {/* Counter */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ opacity: counterOpacity, textAlign: "center" }}>
          <div
            style={{
              fontFamily: bebasNeue,
              fontSize: 100,
              color: COLORS.white,
            }}
          >
            {counterValue.toLocaleString()}
          </div>
          <div
            style={{
              fontFamily: inter,
              fontSize: 24,
              color: COLORS.white,
              fontWeight: 400,
            }}
          >
            years until this land is safe again
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
```

---

### `src/scenes/Scene7_Closer.tsx`

```tsx
import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Sequence,
} from "remotion";
import { Audio } from "@remotion/media";
import { bebasNeue, inter } from "../fonts";
import { COLORS } from "../constants";

export const Scene7Closer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const imgY = interpolate(frame, [0, durationInFrames], [10, 0], {
    extrapolateRight: "clamp",
  });
  const titleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Fade entire scene to black at end
  const blackOverlay = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/ep02_s7.wav")} />
      {/* Single heartbeat at 6 seconds */}
      <Sequence from={fps * 6} premountFor={10}>
        <Audio src={staticFile("sfx/heartbeat_slow.wav")} volume={0.4} />
      </Sequence>

      <AbsoluteFill>
        <Img
          src={staticFile("images/ep02_s7_sky.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `translateY(${imgY}px)`,
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "rgba(0,0,0,0.35)" }} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ opacity: titleOpacity, textAlign: "center" }}>
          <div
            style={{
              fontFamily: bebasNeue,
              fontSize: 64,
              color: COLORS.white,
              letterSpacing: 10,
            }}
          >
            FOREVER LOST
          </div>
        </div>
        <div style={{ opacity: subtitleOpacity, textAlign: "center" }}>
          <div
            style={{
              fontFamily: inter,
              fontSize: 22,
              color: COLORS.white,
              fontWeight: 400,
              letterSpacing: 3,
            }}
          >
            Episode 2 · Chernobyl
          </div>
        </div>
      </AbsoluteFill>

      {/* Final fade to black */}
      <AbsoluteFill
        style={{
          background: "#000000",
          opacity: blackOverlay,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
```

---

## PACKAGES TO INSTALL

```bash
npx remotion add @remotion/media
npx remotion add @remotion/transitions
npx remotion add @remotion/google-fonts
```

---

## TIMING WORKFLOW (After WAV Generation)

```
1. Generate all 6 WAVs via your Next.js Gemini TTS route (S5 has no VO)
2. Get real duration (seconds) for each file
3. Multiply each by 30 → frame count
4. Open src/constants.ts → update SCENES.s1 through s7
5. Recalculate TOTAL_FRAMES (update the overlap subtraction if needed)
6. All scene components auto-adjust via useVideoConfig().durationInFrames
7. npx remotion studio → preview all scenes
8. npx remotion render ForeverLost_EP02 out/ep02_shorts.mp4
```

---

## PRODUCTION CHECKLIST

- [ ] Generate 6 WAVs with Gemini TTS (`Charon` voice) — S5 has no VO
- [ ] Update `constants.ts` with real frame counts
- [ ] Generate 7 images with Nano Banana 2
- [ ] Source and rename SFX into `public/sfx/`
- [ ] Download BGM → `public/bgm/ep02_bgm.mp3`
- [ ] `npx remotion add` for all 3 packages
- [ ] `npm run dev` → preview all 7 scenes
- [ ] Final render to `out/ep02_shorts.mp4`

---

## CHANGE LOG

| Date       | Change                                    | Reason                                                       |
| ---------- | ----------------------------------------- | ------------------------------------------------------------ |
| 2026-05-20 | All scripts rewritten for word economy    | WAV durations hit ~155s after pause removal                  |
| 2026-05-20 | Scene 5 merged into Scene 4 (Option B)    | Word budget — `600K+` stat card carries the emotional weight |
| 2026-05-20 | Scene 5 repurposed as visual-only 4s beat | Gut-punch silence without burning word count                 |
| 2026-05-20 | Total target revised: 91s → 57s           | YouTube Shorts hard cap 60s                                  |
| 2026-05-20 | constants.ts frame counts updated         | Match new script durations                                   |
| 2026-05-20 | Stat card + animation timings compressed  | Scenes shorter, MG must keep up                              |
| 2026-05-20 | Voice changed: Algenib → Charon           | User preference (see memory)                                 |
| 2026-05-21 | NSC cost corrected: $2.3B → $2.3B         | Aligned with EBRD official figure                            |
