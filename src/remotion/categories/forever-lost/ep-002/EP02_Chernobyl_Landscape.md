# FOREVER LOST — Episode 2 (LANDSCAPE)
# "Why Chernobyl's Core Can Never Be Removed"
### YouTube Long-Form · 16:9 · 1920×1080 · 5–6 Minutes · Maximum Motion Graphics

> Full Production Bible — Script · TTS · Infographic Sequences · Animated Banners ·
> Lower Thirds · Kinetic Text · Charts · Image Prompts · BGM · SFX · Remotion Code
> Built against official Remotion best practices (remotion-dev/skills, May 2026)

---

## ARCHITECTURE OVERVIEW

The landscape version expands the 7 portrait scenes into **12 segments**:
each original scene now has a dedicated **MG Interlude** (Motion Graphics-only sequence)
after it, except the final closer. This is how we hit 5–6 minutes with dense visual content.

```
INTRO TITLE CARD        (~15s)  — Full-screen animated opener
│
├── SCENE 1: Hook                  (~20s)
├── MG-01: Timeline Banner         (~25s) ← Chernobyl event timeline
│
├── SCENE 2: Stats                 (~30s)
├── MG-02: Radiation Comparison    (~35s) ← animated bar chart
│
├── SCENE 3: Corium                (~35s)
├── MG-03: Reactor Diagram         (~40s) ← labeled cutaway infographic
│
├── SCENE 4: Sarcophagus           (~40s)
├── MG-04: Cost Comparison Chart   (~30s) ← bar chart vs other mega-projects
│
├── SCENE 5: Human Cost            (~35s)
├── MG-05: Liquidator Stats Panel  (~40s) ← multi-stat animated banner
│
├── SCENE 6: Exclusion Zone        (~35s)
├── MG-06: Radiation Half-Life     (~35s) ← animated timeline / line chart
│
├── SCENE 7: Emotional Closer      (~25s)
│
└── OUTRO                          (~15s) ← channel end card

TOTAL: ~460s ≈ 7.6 min (trim VO/pauses to hit 5–6 min target)
```

---

## GLOBAL SPECS

| Field | Value |
|---|---|
| Resolution | 1920 × 1080 |
| FPS | 30 |
| Aspect ratio | 16:9 |
| Voice | `Algenib` (Gravelly) |
| Color palette | Ash `#111111` · Toxic green `#39FF14` · Blood red `#8B0000` · Off-white `#F0EEE4` · Dim overlay `rgba(0,0,0,0.6)` |
| Fonts | Titles: `Bebas Neue` · Body/stats: `Inter` · Data labels: `JetBrains Mono` (monospace data feel) |
| Lower third style | Dark band bottom-left, green left border, slides in from left |
| Animated banner style | Full-width horizontal strip, dark BG, kinetic text + icon |
| Chart style | SVG-native, green/red accent on dark, no third-party chart lib animations |

---

## FOLDER STRUCTURE

```
remotion-forever-lost-landscape/
├── public/
│   ├── audio/
│   │   ├── ep02L_intro.wav
│   │   ├── ep02L_s1.wav
│   │   ├── ep02L_s2.wav
│   │   ├── ep02L_s3.wav
│   │   ├── ep02L_s4.wav
│   │   ├── ep02L_s5.wav
│   │   ├── ep02L_s6.wav
│   │   └── ep02L_s7.wav
│   ├── sfx/
│   │   ├── geiger_loop.wav
│   │   ├── metal_groan.wav
│   │   ├── radiation_hum.wav
│   │   ├── explosion_distant.wav
│   │   ├── heartbeat_slow.wav
│   │   ├── whoosh_data.wav        # data panel slide-in sound
│   │   ├── tick_counter.wav       # counter increment tick
│   │   └── chart_build.wav        # bar chart building sound
│   ├── bgm/
│   │   └── ep02L_bgm.mp3
│   └── images/
│       ├── ep02L_s1_aerial.png
│       ├── ep02L_s2_texture.png
│       ├── ep02L_s3_corium.png
│       ├── ep02L_s4_sarcophagus.png
│       ├── ep02L_s5_liquidators.png
│       ├── ep02L_s6_exclusion.png
│       └── ep02L_s7_sky.png
├── src/
│   ├── Root.tsx
│   ├── Episode02L.tsx
│   ├── constants.ts
│   ├── fonts.ts
│   ├── components/
│   │   ├── LowerThird.tsx          # reusable lower-third component
│   │   ├── AnimatedBanner.tsx      # reusable scrolling banner
│   │   ├── KineticText.tsx         # word-by-word reveal component
│   │   ├── StatCard.tsx            # animated stat card
│   │   ├── ProgressBar.tsx         # animated fill bar
│   │   ├── Typewriter.tsx          # typewriter text component
│   │   └── DataTicker.tsx          # animated counter
│   ├── scenes/
│   │   ├── Intro.tsx
│   │   ├── Scene1_Hook.tsx
│   │   ├── Scene2_Stats.tsx
│   │   ├── Scene3_Corium.tsx
│   │   ├── Scene4_Sarcophagus.tsx
│   │   ├── Scene5_HumanCost.tsx
│   │   ├── Scene6_Exclusion.tsx
│   │   ├── Scene7_Closer.tsx
│   │   └── Outro.tsx
│   └── mg/                         # Motion Graphic Interludes
│       ├── MG01_Timeline.tsx
│       ├── MG02_RadiationChart.tsx
│       ├── MG03_ReactorDiagram.tsx
│       ├── MG04_CostChart.tsx
│       ├── MG05_LiquidatorStats.tsx
│       └── MG06_HalfLife.tsx
```

---

## PACKAGES TO INSTALL

```bash
npx remotion add @remotion/media
npx remotion add @remotion/transitions
npx remotion add @remotion/google-fonts
npx remotion add @remotion/paths       # for line chart animation
```

---

## `src/fonts.ts`

```ts
import { loadFont } from "@remotion/google-fonts/BebasNeue";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

export const { fontFamily: bebasNeue } = loadFont();
export const { fontFamily: inter } = loadInter();
export const { fontFamily: jetbrainsMono } = loadMono();
```

---

## `src/constants.ts`

```ts
export const FPS = 30;
export const W = 1920;
export const H = 1080;

// ─── UPDATE AFTER WAV GENERATION ───────────────────────────
// Narrated scenes (seconds × 30 = frames)
export const SCENES = {
  intro:  { durationInFrames: 450  }, // ~15s
  s1:     { durationInFrames: 600  }, // ~20s
  mg01:   { durationInFrames: 750  }, // ~25s  Timeline
  s2:     { durationInFrames: 900  }, // ~30s
  mg02:   { durationInFrames: 1050 }, // ~35s  Radiation chart
  s3:     { durationInFrames: 1050 }, // ~35s
  mg03:   { durationInFrames: 1200 }, // ~40s  Reactor diagram
  s4:     { durationInFrames: 1200 }, // ~40s
  mg04:   { durationInFrames: 900  }, // ~30s  Cost chart
  s5:     { durationInFrames: 1050 }, // ~35s
  mg05:   { durationInFrames: 1200 }, // ~40s  Liquidator stats
  s6:     { durationInFrames: 1050 }, // ~35s
  mg06:   { durationInFrames: 1050 }, // ~35s  Half-life chart
  s7:     { durationInFrames: 750  }, // ~25s
  outro:  { durationInFrames: 450  }, // ~15s
} as const;

// Transition frames
export const T = { fade: 20, slide: 25, wipe: 25 } as const;

// Transitions total overlap: 14 transitions × avg 23f = 322
export const TOTAL_FRAMES =
  Object.values(SCENES).reduce((a, b) => a + b.durationInFrames, 0) - 322;

export const C = {
  bg:      "#111111",
  green:   "#39FF14",
  red:     "#8B0000",
  white:   "#F0EEE4",
  dimBg:   "rgba(0,0,0,0.7)",
  panel:   "rgba(17,17,17,0.92)",
} as const;
```

---

## REUSABLE COMPONENTS

### `src/components/LowerThird.tsx`

```tsx
// Reusable lower-third: slides in from left, green border, dark band
// Usage: <LowerThird title="REACTOR 4" subtitle="Chernobyl, Ukraine · 1986" startFrame={30} />

import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";
import { inter, bebasNeue } from "../fonts";
import { C } from "../constants";

interface Props {
  title: string;
  subtitle?: string;
  startFrame?: number;
  exitFrame?: number;
  accentColor?: string;
}

export const LowerThird: React.FC<Props> = ({
  title, subtitle, startFrame = 0, exitFrame, accentColor = C.green,
}) => {
  const frame = useCurrentFrame();

  // Slide in
  const enterProgress = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  // Slide out
  const exitProgress = exitFrame
    ? interpolate(frame, [exitFrame, exitFrame + 15], [0, 1], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp",
        easing: Easing.in(Easing.cubic),
      })
    : 0;

  const progress = enterProgress - exitProgress;
  const translateX = interpolate(progress, [0, 1], [-500, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div style={{
      position: "absolute", bottom: 80, left: 60,
      transform: `translateX(${translateX}px)`,
      opacity,
      display: "flex", flexDirection: "row",
    }}>
      {/* Green left border */}
      <div style={{ width: 5, background: accentColor, borderRadius: 2, marginRight: 14 }} />
      <div style={{
        background: C.panel, padding: "12px 24px",
        borderRadius: 4,
      }}>
        <div style={{ fontFamily: bebasNeue, fontSize: 32, color: C.white, letterSpacing: 3 }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontFamily: inter, fontSize: 18, color: "rgba(240,238,228,0.7)",
            fontWeight: 400, marginTop: 2 }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};
```

---

### `src/components/KineticText.tsx`

```tsx
// Word-by-word animated reveal — documentary kinetic text
// Each word pops in staggered using spring()

import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { inter } from "../fonts";
import { C } from "../constants";

interface Props {
  text: string;
  startFrame?: number;
  fontSize?: number;
  color?: string;
  highlightWords?: string[];   // words to highlight in green
  staggerFrames?: number;       // frames between each word
  center?: boolean;
}

export const KineticText: React.FC<Props> = ({
  text, startFrame = 0, fontSize = 52, color = C.white,
  highlightWords = [], staggerFrames = 4, center = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  return (
    <div style={{
      display: "flex", flexWrap: "wrap", gap: "0 12px",
      justifyContent: center ? "center" : "flex-start",
    }}>
      {words.map((word, i) => {
        const wordFrame = startFrame + i * staggerFrames;
        const wordProgress = spring({
          fps,
          frame: frame - wordFrame,
          config: { damping: 14, stiffness: 180 },
          durationInFrames: 20,
        });
        const isHighlighted = highlightWords.includes(word.replace(/[.,!?]/g, ""));
        return (
          <span
            key={i}
            style={{
              fontFamily: inter,
              fontSize,
              fontWeight: 800,
              color: isHighlighted ? C.green : color,
              opacity: wordProgress,
              transform: `translateY(${interpolate(wordProgress, [0, 1], [20, 0])}px)`,
              display: "inline-block",
              lineHeight: 1.3,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
```

---

### `src/components/AnimatedBanner.tsx`

```tsx
// Animated scrolling ticker banner — repeating text strip
// Driven entirely by useCurrentFrame, NO CSS animation

import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { inter } from "../fonts";
import { C } from "../constants";

interface Props {
  items: string[];
  speed?: number;       // pixels per frame
  bgColor?: string;
  textColor?: string;
  fontSize?: number;
  position?: "top" | "bottom";
}

export const AnimatedBanner: React.FC<Props> = ({
  items, speed = 1.5, bgColor = C.red,
  textColor = C.white, fontSize = 22, position = "bottom",
}) => {
  const frame = useCurrentFrame();
  const fullText = items.join("   ·   ") + "   ·   ";
  const offset = (frame * speed) % (fullText.length * 14); // approx char width

  return (
    <div style={{
      position: "absolute",
      [position]: 0, left: 0, right: 0,
      background: bgColor,
      height: 44, overflow: "hidden",
      display: "flex", alignItems: "center",
    }}>
      <div style={{
        transform: `translateX(${-offset}px)`,
        whiteSpace: "nowrap",
        fontFamily: inter, fontSize, fontWeight: 700,
        color: textColor, letterSpacing: 2,
      }}>
        {fullText.repeat(8)}
      </div>
    </div>
  );
};
```

---

### `src/components/DataTicker.tsx`

```tsx
// Animated number counter with optional decimal
import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";
import { jetbrainsMono } from "../fonts";
import { C } from "../constants";

interface Props {
  from?: number;
  to: number;
  startFrame?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  fontSize?: number;
  color?: string;
  decimals?: number;
}

export const DataTicker: React.FC<Props> = ({
  from = 0, to, startFrame = 0, duration = 60,
  suffix = "", prefix = "", fontSize = 96, color = C.green, decimals = 0,
}) => {
  const frame = useCurrentFrame();
  const value = interpolate(frame, [startFrame, startFrame + duration], [from, to], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 1, 0.5, 1),
  });
  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();

  return (
    <span style={{ fontFamily: jetbrainsMono, fontSize, color, fontWeight: 700 }}>
      {prefix}{display}{suffix}
    </span>
  );
};
```

---

### `src/components/ProgressBar.tsx`

```tsx
// Animated fill bar — horizontal or vertical
import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";
import { C } from "../constants";

interface Props {
  startFrame?: number;
  duration?: number;
  fillColor?: string;
  bgColor?: string;
  height?: number;
  width?: number;
  label?: string;
  targetPercent?: number; // 0–100
}

export const ProgressBar: React.FC<Props> = ({
  startFrame = 0, duration = 45, fillColor = C.green,
  bgColor = "rgba(255,255,255,0.1)", height = 12,
  width = 600, label, targetPercent = 100,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, startFrame + duration], [0, targetPercent], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div>
      {label && (
        <div style={{ fontFamily: "Inter", fontSize: 18, color: C.white,
          marginBottom: 6, fontWeight: 600 }}>
          {label}
        </div>
      )}
      <div style={{ width, height, background: bgColor, borderRadius: height / 2, overflow: "hidden" }}>
        <div style={{
          width: `${progress}%`, height: "100%",
          background: fillColor, borderRadius: height / 2,
        }} />
      </div>
    </div>
  );
};
```

---

## SCENE-BY-SCENE — NARRATION + MOTION DIRECTION

---

### INTRO TITLE CARD (~15s)

**No voiceover — pure motion graphics**

**Motion sequence:**
1. Frame 0–30: Black. Single Geiger tick from sfx.
2. Frame 30–60: `FOREVER LOST` in Bebas Neue 180px, letters appear one-by-one using string slice typewriter over 30 frames
3. Frame 60–90: Green underline bar `width 0→100%` sweeps under the title
4. Frame 90–120: Episode subtitle `"Episode 2"` fades in Inter 400 36px
5. Frame 120–180: Full title `"Why Chernobyl's Core Can Never Be Removed"` appears word-by-word using `KineticText` component, stagger 3 frames/word
6. Frame 180–300: Image fades in behind text (aerial Chernobyl) at 40% opacity — KenBurns slow zoom
7. Frame 300–420: Text fades out, image takes full opacity → transitions into Scene 1
8. Throughout: `AnimatedBanner` at bottom scrolls red strip: `"UKRAINE · 1986 · REACTOR 4 EXPLOSION · APRIL 26 · 01:23 LOCAL TIME"` at speed 1.2

---

### SCENE 1 — HOOK (~20s)

#### TTS SCRIPT

```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — Why Chernobyl's Core Can Never Be Removed"
## THE SCENE: Cold open. Night aerial. Explosion echo.
Desolate. Toxic. Ancient.

### DIRECTOR'S NOTES
Style: Grave, absolute. The word "forever" must sit alone.
Pacing: One sentence, pause, then the closing line.

#### TRANSCRIPT
[serious] [slow]
It has been burning since 1986.
[pause]
And it will keep burning... [pause] forever.
[pause]
[slow] This is not a crisis that was handled.
[pause]
This is a wound... that the earth simply learned to live with.
```

**Voice:** `Algenib`
**SFX:** `explosion_distant.wav` at frame 0, 60%

**Image prompt (Nano Banana 2):**
```
Aerial night photo of Chernobyl Nuclear Power Plant, reactor 4 with amber glow,
New Safe Confinement dome visible, dark surrounding forest, overcast sky,
photorealistic, cinematic, desaturated with faint green tint, no people, no text
```

**Motion Direction — Scene 1:**
- Background: Ken Burns `scale 1.0 → 1.06` over full scene
- Dark vignette overlay: `radial-gradient` opacity 0→0.5 over 30 frames
- `LowerThird`: title `"CHERNOBYL, UKRAINE"`, subtitle `"April 26, 1986 · 01:23 Local Time"`, appears at frame 30
- Large center text: `"BURNING FOR 39 YEARS"` — Bebas Neue 90px, fades in at frame 90, green `#39FF14`
- Frame counter (decorative): bottom-right, small JetBrains Mono, white 50% opacity: `"26.04.1986"` with scanline flicker — `opacity` oscillates using `Math.sin(frame * 0.3) * 0.2 + 0.5` driven by `useCurrentFrame()`
- `AnimatedBanner` top: `"CHERNOBYL · REACTOR 4 · FOREVER LOST · EPISODE 02"` scrolling white on dark strip, 18px

---

### MG-01: TIMELINE BANNER (~25s)

**No voiceover — pure MG sequence**
**Concept:** Animated horizontal timeline of key Chernobyl events, drawing from left to right

**Motion sequence:**

```
Timeline events:
  Apr 26 1986   → Explosion
  May 1986      → First sarcophagus built
  1990          → Liquidator program ends
  1991          → USSR collapses, funding stops
  2000          → Reactor finally shut down
  2016          → New Safe Confinement completed
  2065          → NSC estimated lifespan ends
  24,000 AD     → Plutonium-239 half-life point
```

1. Frame 0–20: Dark panel slides in from bottom — `translateY H→0` via `interpolate` + `Easing.bezier(0.16,1,0.3,1)`
2. Frame 20–30: Title `"CHERNOBYL: A TIMELINE"` Bebas Neue 64px white, letter-by-letter from left
3. Frame 30: Horizontal green timeline line begins drawing — `evolvePath` from `@remotion/paths`, progresses left to right over 120 frames
4. Frame 60–360: Events drop in one by one — each: small vertical tick mark grows upward `height 0→40px`, label fades in above in Inter 700 20px, date below in JetBrains Mono 16px green. Stagger: 25 frames each
5. Frame 240+: `"24,000 AD"` event uses glitch text effect — oscillates opacity `Math.sin(frame*0.5)*0.3 + 0.7`
6. Throughout: `AnimatedBanner` bottom strip: `"600,000 WORKERS · $1.5 BILLION · 200 TONNES FUEL · 30KM EXCLUSION ZONE"` scrolling red

**SFX:** `whoosh_data.wav` at frame 20 (panel arrives)

---

### SCENE 2 — STATS (~30s)

#### TTS SCRIPT

```
# AUDIO PROFILE: Documentary Narrator
## THE SCENE: Three stats. Each one lands.

### DIRECTOR'S NOTES
Style: Factual, weightless. Let numbers horrify.
Pacing: Pause after each stat. Build rhythm.

#### TRANSCRIPT
[serious]
When reactor four exploded, it released four hundred times
the radiation of the Hiroshima bomb.
[pause]
Two hundred tonnes of nuclear fuel remain inside —
fused into the floor, the walls, and the basement.
[pause]
To attempt cleanup, the Soviet government deployed
over six hundred thousand workers.
[pause]
[slow] They were called liquidators.
[pause]
Many of them... were not told what they were walking into.
```

**Voice:** `Algenib`
**SFX:** `geiger_loop.wav` loops throughout at 25%

**Image prompt:**
```
Dark grey cracked Soviet concrete texture, industrial surface, extreme close-up,
faint radiation warning symbol barely visible, cinematic, desaturated, no text
```

**Motion Direction — Scene 2:**
- Background: texture at 12% opacity — subtle
- Left panel (40% width): 3 stat cards stagger in, each `translateY 40→0` + `opacity 0→1`, `Easing.bezier(0.16,1,0.3,1)`, 60-frame stagger between them
- Right panel (60% width): `KineticText` of VO text animates word-by-word in sync with narration — words appear at Inter 28px, white
- Per stat card: large `DataTicker` counts up to value, suffix label below in Inter 400
  - Card 1: `×400` green
  - Card 2: `200t` white
  - Card 3: `600K+` red
- `LowerThird` at frame 0: `"RADIATION OUTPUT"`, `"Unit 4 Explosion · April 26, 1986"`
- `AnimatedBanner` bottom: scrolls red `"HIROSHIMA × 400 · 200T FUEL STILL INSIDE · 600,000 WORKERS DEPLOYED"`

---

### MG-02: RADIATION COMPARISON CHART (~35s)

**No voiceover — pure MG**
**Concept:** Animated vertical bar chart comparing radiation events

```
Data:
  Hiroshima bomb          → 1× (baseline)
  Fukushima 2011          → 10×
  Chernobyl explosion     → 400×
  Total Chernobyl release → 400×  (glowing bar, extra tall)
```

**Motion sequence:**
1. Frame 0–20: Panel fades in, title `"RADIATION COMPARISON"` Bebas Neue 72px sweeps in
2. Frame 20: Subtitle `"Hiroshima = baseline"` appears in JetBrains Mono 20px green
3. Frame 30–180: Bars grow up using `spring({ fps, frame, delay: i * 20, config: { damping: 200 } })` × bar height
4. Each bar: colored fill, data label at top counts up via `DataTicker`, name below in Inter 500 20px
5. Chernobyl bar: `#39FF14` glow — add `boxShadow: "0 0 30px #39FF14"` (inline style, correct in Remotion)
6. Frame 200–240: Callout arrow SVG appears pointing at Chernobyl bar, label: `"400× MORE THAN HIROSHIMA"` in red Bebas Neue 36px
7. Throughout: `ProgressBar` components show proportional scale comparison at bottom
8. Frame 300–360: Stats hold, then entire panel slides out bottom `translateY 0→H`

**SFX:** `chart_build.wav` at frame 30, 40%

---

### SCENE 3 — CORIUM (~35s)

#### TTS SCRIPT

```
# AUDIO PROFILE: Documentary Narrator
## THE SCENE: The Elephant's Foot. Horror made physical.

### DIRECTOR'S NOTES
Style: Near-whisper on "elephant's foot". Return to gravitas.
Pacing: Slow throughout.

#### TRANSCRIPT
[serious]
When the reactor core melted, the nuclear fuel didn't burn away.
[pause]
It melted downward.
[pause]
[slow] Mixing with concrete, steel, and sand as it went —
it formed a new substance.
[pause]
[whispers] Scientists eventually named it... corium.
[pause]
[serious] The most famous deposit — in Chernobyl's basement —
is known as the Elephant's Foot.
[pause]
[slow] In 1986, standing next to it for just four minutes
would have been a fatal dose of radiation.
[pause]
Today, that same mass is still sitting in the basement of reactor four.
[pause]
[whispers] Exactly where it landed.
```

**Voice:** `Algenib`
**SFX:** `geiger_loop.wav` + `radiation_hum.wav` both looping

**Image prompt:**
```
Close-up photograph of Chernobyl "Elephant's Foot" corium mass in basement,
eerie amber-red glow, dark cavern, grainy low-light, cinematic, no people, no text
```

**Motion Direction — Scene 3:**
- Layout: 60/40 split — image right, text/data left
- Left side: `KineticText` delivers each sentence as VO progresses
- Right side: image with gentle scale pulse `1.0→1.02→1.0` every 4s via `frame % (fps*4)`
- Data callouts appear floating over image (right panel):
  - Badge 1 at frame 60: `"TEMP AT FORMATION"` / `"~2,000°C"` — white badge, red border
  - Badge 2 at frame 120: `"CURRENT RADIATION"` / `"~8 Sievert/hour"` — green badge
  - Badge 3 at frame 200: `"LETHAL DOSE TIME"` / `"4 minutes (1986)"` — red badge
- Badges: each uses `spring()` scale pop + `opacity 0→1`
- `LowerThird`: `"THE ELEPHANT'S FOOT"`, `"Reactor 4 Basement · 1986–Present"` appears at frame 30
- Horizontal glowing green line separator between left/right panels, draws from top to bottom via `height 0→H` `interpolate`

---

### MG-03: REACTOR CUTAWAY DIAGRAM (~40s)

**No voiceover — pure MG**
**Concept:** Animated SVG diagram of reactor 4 cross-section, labeling key components with animated callouts

**Diagram labels (appear staggered, each slides + fades in):**

```
Components:
  Graphite moderator core
  Fuel rods (200 tonnes)
  Control rods
  Primary coolant circuit
  Steam turbines
  Containment vessel (destroyed)
  Corium deposit location (BASEMENT - highlighted red)
```

**Motion sequence:**
1. Frame 0–30: Title `"REACTOR 4 · ANATOMY"` Bebas Neue 72px, white, slides down from top
2. Frame 30: Diagram background fades in — large SVG illustration drawn as simplified reactor schematic (build as React SVG, no external image needed)
3. Frame 60–360: Labels appear one by one — each: thin line draws from component to text label `evolvePath`, then label fades in in Inter 600 18px
4. Frame 120: `"CORIUM LOCATION"` label appears in `#8B0000` red with pulsing `opacity Math.sin(frame*0.1)*0.3+0.7`
5. Frame 180: Animated fill indicator — `"200 TONNES"` banner highlights the fuel rod area
6. Frame 240: `DataTicker` counts up `0→10,000` showing current roentgen/hour inside — huge number, green
7. Frame 300–360: Zoom effect `scale 1→1.3` on corium area, red highlight rectangle pulses
8. Frame 360–420: Wide shot re-establishes, all labels hold

**SVG Reactor Diagram (simplified code):**
```tsx
// Build inline as React SVG — no external file needed
const ReactorDiagram: React.FC<{ progress: number }> = ({ progress }) => (
  <svg viewBox="0 0 800 600" style={{ width: "100%", height: "100%" }}>
    {/* Outer containment */}
    <rect x="150" y="50" width="500" height="500" rx="8"
      fill="none" stroke="#F0EEE4" strokeWidth="2" opacity={0.4} />
    {/* Core */}
    <rect x="250" y="150" width="300" height="250" rx="4"
      fill="rgba(57,255,20,0.1)" stroke="#39FF14" strokeWidth="2" />
    {/* Fuel rods (vertical lines) */}
    {Array.from({ length: 8 }).map((_, i) => (
      <line key={i} x1={270 + i * 35} y1="160" x2={270 + i * 35} y2="390"
        stroke="#F0EEE4" strokeWidth="4" opacity={0.7} />
    ))}
    {/* Corium basement */}
    <rect x="200" y="430" width="400" height="80" rx="4"
      fill="rgba(139,0,0,0.4)" stroke="#8B0000" strokeWidth="3" />
    <text x="400" y="477" textAnchor="middle"
      fill="#8B0000" fontSize="16" fontFamily="Inter" fontWeight="700">
      CORIUM DEPOSIT
    </text>
  </svg>
);
```

**SFX:** `whoosh_data.wav` at each label appearance (low volume 25%)

---

### SCENE 4 — SARCOPHAGUS (~40s)

#### TTS SCRIPT

```
# AUDIO PROFILE: Documentary Narrator
## THE SCENE: Why the world built a tomb. Engineering impossibility made real.

### DIRECTOR'S NOTES
Style: Measured disbelief. Facts that sound like science fiction.
Pacing: Slightly faster mid-section, slow final line.

#### TRANSCRIPT
[serious]
By the late 1980s, the world had a problem with no solution.
[pause]
The corium was radioactive beyond any machine's tolerance.
[pause]
Robots sent in to clean the roof of reactor four
began malfunctioning within hours.
[pause]
[slow] The radiation was destroying their circuits.
[pause]
The radiation level inside reactor four still measures
ten thousand roentgens per hour.
[pause]
[serious] That level kills an unprotected human in less than a minute.
It disables electronics within hours. It destroys every robotic system ever built.
[pause]
So the world did the only thing it could.
[pause]
[slow] It built a tomb.
[pause]
In 2016, after decades of planning and one point five billion dollars —
a steel arch was slid over the entire reactor.
[pause]
[whispers] Not to fix it. Not to clean it. [pause] Just to keep it contained.
[pause]
[slow] The New Safe Confinement is designed to last one hundred years.
[pause]
After that... [pause] we'll need to build another one.
```

**Voice:** `Algenib`
**SFX:** `metal_groan.wav` at frame 5 · `radiation_hum.wav` low loop throughout

**Image prompt:**
```
Wide angle photograph of New Safe Confinement steel arch dome at Chernobyl,
massive silver metallic structure covering reactor 4, overcast grey sky,
barren industrial foreground, foggy, no people, photorealistic, cinematic,
desaturated cool tones, ground level looking up
```

**Motion Direction — Scene 4:**
- Parallax scroll: image `translateY -30→0` over first 45 frames
- `LowerThird`: `"NEW SAFE CONFINEMENT"`, `"Commissioned 2016 · $1.5B USD"` at frame 30
- Left side data panel (35% width) builds up:
  - `DataTicker` `0→10000` for roentgen/hour, prefix `""`, suffix `" R/hr"`, green — starts at frame 60
  - Label below: `"CURRENT RADIATION INSIDE"` Inter 700 22px
  - `ProgressBar` below: fill to 100% over 45 frames, red, label `"FATAL TO HUMANS IN <60 SECONDS"`
  - Second `ProgressBar`: fill 100% green, label `"DISABLES ELECTRONICS IN <HOURS"`
- Right side (65% width): full image
- At frame 120: `"$1.5 BILLION"` spring-pops in center overlay — Bebas Neue 120px white
- At frame 180: `"100-YEAR LIFESPAN"` counter appears below in red
- `AnimatedBanner` bottom: `"NO ROBOT CAN SURVIVE INSIDE · 10,000 RÖNTGEN/HOUR · ELECTRONICS FAIL WITHIN HOURS"`

---

### MG-04: COST COMPARISON CHART (~30s)

**Concept:** Animated horizontal bar chart — NSC cost vs other mega-projects

```
Data (approximate):
  International Space Station    → $150B
  Large Hadron Collider          → $4.75B
  Hubble Space Telescope         → $2.5B
  Chernobyl New Safe Confinement → $1.5B  ← highlighted
  Channel Tunnel                 → $21B
```

**Motion sequence:**
1. Frame 0–20: Title `"WHAT $1.5 BILLION BUYS"` Bebas Neue 80px slides in from top
2. Frame 20: Subtitle `"Global mega-project comparison"` Inter 400 24px fades in
3. Frame 40–240: Bars grow left to right — `spring` stagger, 20 frames between bars
4. Chernobyl bar: red `#8B0000` fill, label `"JUST A CONTAINMENT SHELL"` in white Inter 600 20px
5. Labels at bar ends: `DataTicker` counts to value in billions
6. Frame 200: Callout box highlights NSC bar: `"This didn't fix anything"` — italic Inter 400
7. Frame 240–300: Entire chart slides out right

---

### SCENE 5 — HUMAN COST (~35s)

#### TTS SCRIPT

```
# AUDIO PROFILE: Documentary Narrator
## THE SCENE: The emotional turning point. Quieter. Personal.

### DIRECTOR'S NOTES
Style: Quiet grief. Not dramatic. Just facts, gently.
Pacing: Very slow. Long pauses. Silence matters.

#### TRANSCRIPT
[slow]
The men who tried to clean Chernobyl were called liquidators.
[pause]
Between 1986 and 1990,
the Soviet government deployed over six hundred thousand of them.
[pause]
[serious] Many came from the military. Many were civilians.
Many were told the danger was manageable.
[pause]
[slow] It was not manageable.
[pause]
Hundreds of thousands experienced lasting health effects —
thyroid cancer, leukemia, chronic illness.
[pause]
[whispers] Many are gone now.
[pause]
[slow] The Soviet government classified the true casualty data
for decades.
[pause]
[serious] Independent estimates put long-term deaths from radiation exposure
at anywhere between four thousand and nearly one million —
depending on which study you read.
[pause]
[slow] We may never have a definitive number.
[pause]
[whispers] That is also a kind of loss.
```

**Voice:** `Algenib`
**BGM:** Drop to 12% — silence carries the weight

**Image prompt:**
```
Black and white photograph of Soviet liquidator workers at Chernobyl in heavy
protective gear and respirator masks, solemn documentary photography, high
contrast, cinematic grain, no color, no text
```

**Motion Direction — Scene 5:**
- Grayscale filter: `filter: "grayscale(100%)"` inline style
- Vignette: `opacity 0→0.7` over 30 frames
- Right 40%: dark panel with staggered text stats — each fades in as VO lands:
  - `"600,000+"` — DataTicker, white, 80px
  - `"Workers deployed"` — Inter 400 24px
  - separator line `width 0→100%` green
  - `"~4,000 – 1,000,000"` — JetBrains Mono 40px red
  - `"Estimated deaths (disputed)"` — Inter 400 20px
- `LowerThird`: `"THE LIQUIDATORS"`, `"Soviet Cleanup Workers · 1986–1990"` frame 30
- Frame 200: `KineticText` quote overlay: `"We may never have a definitive number."` center, 48px, italic, white, slow stagger

---

### MG-05: LIQUIDATOR STATS MULTI-PANEL (~40s)

**Concept:** Full-screen dark infographic panel — 4 animated stat blocks + progress bars + comparison data

```
Blocks:
  1. Workers deployed timeline:    1986 → 1990, animated year counter
  2. Countries of origin:          Animated pie chart — Russia/Ukraine/Belarus/Other
  3. Health outcome bars:          Thyroid cancer · Leukemia · Chronic illness (3 progress bars)
  4. Average exposure dose:        DataTicker counting up to 100+ mSv
```

**Motion sequence:**
1. Frame 0–25: Full panel slides up from bottom `translateY H→0`
2. Frame 25: Header `"LIQUIDATORS: THE DATA"` Bebas Neue 72px, letter-by-letter
3. Frame 40: 4 blocks fade + slide in staggered — 20 frames each
4. Block 1 (top-left): year counter `1986→1990` DataTicker, then `"600,000 WORKERS"` appears
5. Block 2 (top-right): Pie chart (SVG, `stroke-dashoffset` animation)
6. Block 3 (bottom-left): 3 `ProgressBar` components stagger — each fills over 40 frames
7. Block 4 (bottom-right): `DataTicker` counts `0→>100` mSv with glow on hit
8. `AnimatedBanner` red bottom: `"CLASSIFIED FOR DECADES · STILL NO OFFICIAL TOTAL · FOREVER LOST"`
9. Frame 360–420: Slow fade to black, hold 2 seconds

**SFX:** `tick_counter.wav` at low volume during Block 4 counter

---

### SCENE 6 — EXCLUSION ZONE (~35s)

#### TTS SCRIPT

```
# AUDIO PROFILE: Documentary Narrator
## THE SCENE: Zone of alienation. A world frozen in 1986.

### DIRECTOR'S NOTES
Style: Eerie calm. Not sad — permanent.
Pacing: Measured, slightly detached.

#### TRANSCRIPT
[serious]
Within thirty kilometres of the reactor sits the exclusion zone —
named officially the Zone of Alienation.
[pause]
Fifty thousand people were evacuated from Pripyat in 1986.
They were told they would be back in three days.
[pause]
[slow] Most never returned.
[pause]
[serious] Today, the city of Pripyat remains abandoned.
Trees grow through apartment floors.
A Ferris wheel that never opened still stands in the fairground.
[pause]
[slow] In some areas of the exclusion zone,
radiation will remain at dangerous levels
for another twenty thousand years.
[pause]
[serious] To put that in perspective —
twenty thousand years ago, humans were still in the Stone Age.
[pause]
[slow] The land remembers what we did to it
far longer than we will be alive to regret it.
```

**Voice:** `Algenib`
**SFX:** `geiger_loop.wav` very soft 12%

**Image prompt:**
```
Aerial drone photograph of Pripyat abandoned city, overgrown streets reclaimed by
forest, faded Soviet apartment blocks through trees, Ferris wheel visible, overcast
sky, desaturated tones, faint green cast, no people, no text, wide shot
```

**Motion Direction — Scene 6:**
- Slow zoom OUT `scale 1.08→1.0` — emphasizes emptiness
- `LowerThird`: `"ZONE OF ALIENATION"`, `"Chernobyl Exclusion Zone · 2,600 km²"` frame 30
- Floating labels appear over image at different points (absolute position, spring pop):
  - `"50,000 EVACUATED"` white badge at frame 60
  - `"NEVER RETURNED"` red badge at frame 120
  - `"FERRIS WHEEL"` labeled marker at frame 180 (positioned at image area where wheel would be)
- Large `DataTicker` center: `0→20,000` suffix `" years"` — Bebas Neue 110px, JetBrains Mono number
- Below counter: Inter 400 28px `"until safe again"`
- `AnimatedBanner` bottom red: `"ZONE OF ALIENATION · 30KM RADIUS · 2,600 KM² · 50,000 RESIDENTS DISPLACED PERMANENTLY"`

---

### MG-06: RADIATION HALF-LIFE TIMELINE (~35s)

**Concept:** Animated SVG line chart — decay curve of different isotopes over thousands of years

```
Isotopes to show:
  Iodine-131       → half-life 8 days    (decays almost immediately on chart)
  Cesium-137       → half-life 30 years  (decays ~300 years)
  Strontium-90     → half-life 29 years  (similar)
  Plutonium-239    → half-life 24,110 years (stays dangerously high entire chart)
```

**Motion sequence:**
1. Frame 0–20: Dark panel, title `"HOW LONG DOES RADIATION LAST?"` sweeps in
2. Frame 20: X-axis draws left to right via `evolvePath` — labeled with years: `NOW → 100yr → 1,000yr → 10,000yr → 24,000yr`
3. Frame 40–200: Each isotope line draws using `evolvePath` staggered 30 frames
   - Color coding: Iodine blue, Cesium yellow, Strontium orange, Plutonium-239 red
4. Frame 100: Vertical dashed line at `"TODAY"` — pulses opacity
5. Frame 180: Callout on Plutonium line: `"Still 50% potency in year 26,096 AD"` — Bebas Neue 32px red
6. Frame 220: `"HALF OF CHERNOBYL'S PLUTONIUM-239"` kinetic text, word by word
7. Frame 260: `"WILL STILL BE RADIOACTIVE WHEN THIS STAR DIES"` — Bebas Neue 48px white, dramatic

**SFX:** `radiation_hum.wav` very low 15% throughout

---

### SCENE 7 — EMOTIONAL CLOSER (~25s)

#### TTS SCRIPT

```
# AUDIO PROFILE: Documentary Narrator
## THE SCENE: Quiet ending. Permanence. No stats.

### DIRECTOR'S NOTES
Style: Whisper. Resigned. Eternal.
Pacing: The slowest of the entire episode.

#### TRANSCRIPT
[slow] [whispers]
The core will outlive every person alive today.
[pause]
[slow] It will outlive their children.
[pause]
[slow] And their children's children.
[pause]
[serious] It is not a problem waiting to be solved.
[pause]
It is not a wound that will heal.
[pause]
[slow] It is simply... [pause] [whispers] a fact of the earth now.
[pause]
[serious] There is a steel dome over it.
There are warning signs around it.
[pause]
[slow] And there is nothing else anyone can do.
```

**Voice:** `Algenib`
**BGM:** Fade to 0% by last frame
**SFX:** `heartbeat_slow.wav` — one beat at fps*12, then silence

**Image prompt:**
```
Wide angle dawn sky above Chernobyl, NSC dome silhouette at bottom of frame,
dramatic cloud formation, pale orange-grey sunrise, vast emptiness,
photorealistic, cinematic, no people, no text, melancholic beauty
```

**Motion Direction — Scene 7:**
- Slow `translateY 15→0` drift
- NO stats, NO banners — clean and silent
- `"FOREVER LOST"` fades in at frame 90, Bebas Neue 80px white, centered, letter-spacing 12
- `"Episode 2 · Chernobyl"` fades in 15 frames later, Inter 400 28px
- Final 30 frames: `opacity 1→0` entire composition fades to black
- No `AnimatedBanner` in this scene — break from the pattern, feels final

---

### OUTRO (~15s)

**No voiceover**

**Motion sequence:**
1. Frame 0–15: Black
2. Frame 15–45: `"FOREVER LOST"` appears Bebas Neue 120px white, centered
3. Frame 45–90: Episode list fades in below:
   - `"EP.01 · WHY THE TITANIC CAN NEVER BE RAISED"` — green checkmark ✓
   - `"EP.02 · WHY CHERNOBYL'S CORE CAN NEVER BE REMOVED"` — highlighted white (current)
   - `"EP.03 · THE VOYNICH MANUSCRIPT"` — dimmed, white 40%
   - `"EP.04 · DYATLOV PASS"` — dimmed
   - `"EP.05 · THE PACIFIC GARBAGE PATCH"` — dimmed
4. Frame 90: Subscribe prompt `"FOLLOW FOR MORE"` slides up — Bebas Neue 48px green
5. Frame 90–420: Hold. `AnimatedBanner` red: `"SUBSCRIBE · NEW EPISODE EVERY WEEK · FOREVER LOST"`
6. Frame 380–420: Fade to black

---

## EPISODE02L.TSX — MAIN COMPOSITION

```tsx
import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { SCENES, T, C } from "./constants";

// Scenes
import { Intro } from "./scenes/Intro";
import { Scene1Hook } from "./scenes/Scene1_Hook";
import { Scene2Stats } from "./scenes/Scene2_Stats";
import { Scene3Corium } from "./scenes/Scene3_Corium";
import { Scene4Sarcophagus } from "./scenes/Scene4_Sarcophagus";
import { Scene5HumanCost } from "./scenes/Scene5_HumanCost";
import { Scene6Exclusion } from "./scenes/Scene6_Exclusion";
import { Scene7Closer } from "./scenes/Scene7_Closer";
import { Outro } from "./scenes/Outro";

// MG Interludes
import { MG01Timeline } from "./mg/MG01_Timeline";
import { MG02RadiationChart } from "./mg/MG02_RadiationChart";
import { MG03ReactorDiagram } from "./mg/MG03_ReactorDiagram";
import { MG04CostChart } from "./mg/MG04_CostChart";
import { MG05LiquidatorStats } from "./mg/MG05_LiquidatorStats";
import { MG06HalfLife } from "./mg/MG06_HalfLife";

export const Episode02L: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {/* Global BGM with full envelope */}
      <Audio
        src={staticFile("bgm/ep02L_bgm.mp3")}
        volume={(f) => {
          if (f < 450)  return 0.12; // intro
          if (f < 1050) return 0.15; // s1 + mg01
          if (f < 2400) return interpolateLocal(f, 1050, 2400, 0.15, 0.30); // s2–mg02
          if (f < 4800) return 0.30; // core scenes peak
          if (f < 6600) return 0.20; // s5 human cost, quieter
          if (f < 8400) return 0.25; // s6 + mg06
          return Math.max(0, interpolateLocal(f, 8400, 9600, 0.25, 0)); // fade out
        }}
        loop
      />

      <TransitionSeries>

        {/* INTRO */}
        <TransitionSeries.Sequence durationInFrames={SCENES.intro.durationInFrames} premountFor={30}>
          <Intro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T.fade })} />

        {/* SCENE 1 */}
        <TransitionSeries.Sequence durationInFrames={SCENES.s1.durationInFrames} premountFor={30}>
          <Scene1Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: T.slide })} />

        {/* MG-01 TIMELINE */}
        <TransitionSeries.Sequence durationInFrames={SCENES.mg01.durationInFrames} premountFor={30}>
          <MG01Timeline />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T.fade })} />

        {/* SCENE 2 */}
        <TransitionSeries.Sequence durationInFrames={SCENES.s2.durationInFrames} premountFor={30}>
          <Scene2Stats />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={linearTiming({ durationInFrames: T.wipe })} />

        {/* MG-02 RADIATION CHART */}
        <TransitionSeries.Sequence durationInFrames={SCENES.mg02.durationInFrames} premountFor={30}>
          <MG02RadiationChart />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T.fade })} />

        {/* SCENE 3 */}
        <TransitionSeries.Sequence durationInFrames={SCENES.s3.durationInFrames} premountFor={30}>
          <Scene3Corium />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: T.slide })} />

        {/* MG-03 REACTOR DIAGRAM */}
        <TransitionSeries.Sequence durationInFrames={SCENES.mg03.durationInFrames} premountFor={30}>
          <MG03ReactorDiagram />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T.fade })} />

        {/* SCENE 4 */}
        <TransitionSeries.Sequence durationInFrames={SCENES.s4.durationInFrames} premountFor={30}>
          <Scene4Sarcophagus />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-top" })} timing={linearTiming({ durationInFrames: T.wipe })} />

        {/* MG-04 COST CHART */}
        <TransitionSeries.Sequence durationInFrames={SCENES.mg04.durationInFrames} premountFor={30}>
          <MG04CostChart />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T.fade })} />

        {/* SCENE 5 */}
        <TransitionSeries.Sequence durationInFrames={SCENES.s5.durationInFrames} premountFor={30}>
          <Scene5HumanCost />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: T.slide })} />

        {/* MG-05 LIQUIDATOR STATS */}
        <TransitionSeries.Sequence durationInFrames={SCENES.mg05.durationInFrames} premountFor={30}>
          <MG05LiquidatorStats />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T.fade })} />

        {/* SCENE 6 */}
        <TransitionSeries.Sequence durationInFrames={SCENES.s6.durationInFrames} premountFor={30}>
          <Scene6Exclusion />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-right" })} timing={linearTiming({ durationInFrames: T.wipe })} />

        {/* MG-06 HALF LIFE */}
        <TransitionSeries.Sequence durationInFrames={SCENES.mg06.durationInFrames} premountFor={30}>
          <MG06HalfLife />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T.fade })} />

        {/* SCENE 7 */}
        <TransitionSeries.Sequence durationInFrames={SCENES.s7.durationInFrames} premountFor={30}>
          <Scene7Closer />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T.fade })} />

        {/* OUTRO */}
        <TransitionSeries.Sequence durationInFrames={SCENES.outro.durationInFrames} premountFor={30}>
          <Outro />
        </TransitionSeries.Sequence>

      </TransitionSeries>
    </AbsoluteFill>
  );
};

// Helper (keep in this file, or move to utils.ts)
function interpolateLocal(f: number, s: number, e: number, from: number, to: number): number {
  const p = Math.min(1, Math.max(0, (f - s) / (e - s)));
  return from + (to - from) * p;
}
```

---

## MG COMPONENT SAMPLES (FULL CODE)

### `src/mg/MG02_RadiationChart.tsx`

```tsx
import React from "react";
import {
  AbsoluteFill, interpolate, useCurrentFrame,
  useVideoConfig, spring, Easing, staticFile,
} from "remotion";
import { Audio } from "@remotion/media";
import { bebasNeue, inter, jetbrainsMono } from "../fonts";
import { C } from "../constants";
import { AnimatedBanner } from "../components/AnimatedBanner";

const BAR_DATA = [
  { label: "Hiroshima\nBomb", value: 1,   color: "#888888", unit: "×1 (baseline)" },
  { label: "Fukushima\n2011",  value: 10,  color: "#F0EEE4", unit: "×10" },
  { label: "Chernobyl\nTotal", value: 400, color: C.green,   unit: "×400", glow: true },
];

const MAX_HEIGHT = 480;
const BAR_WIDTH = 180;

export const MG02RadiationChart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Audio src={staticFile("sfx/chart_build.wav")} volume={0.4} />
      <Audio src={staticFile("sfx/geiger_loop.wav")} volume={0.15} loop />

      {/* Title */}
      <div style={{
        position: "absolute", top: 60, left: 0, right: 0,
        textAlign: "center", opacity: titleOpacity,
      }}>
        <div style={{ fontFamily: bebasNeue, fontSize: 72, color: C.white, letterSpacing: 6 }}>
          RADIATION COMPARISON
        </div>
        <div style={{ fontFamily: inter, fontSize: 22, color: C.green, marginTop: 4, fontWeight: 400 }}>
          Hiroshima = baseline (×1)
        </div>
      </div>

      {/* Chart area */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center",
        flexDirection: "row", gap: 80, paddingBottom: 120, paddingTop: 160 }}>
        {BAR_DATA.map((bar, i) => {
          const barProgress = spring({
            fps, frame,
            delay: i * 20 + 30,
            config: { damping: 200 },
          });
          const barHeight = barProgress * (bar.value / 400) * MAX_HEIGHT;

          // Label count-up
          const countVal = Math.round(
            interpolate(frame, [i * 20 + 30, i * 20 + 90], [0, bar.value], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
              easing: Easing.bezier(0.25, 1, 0.5, 1),
            })
          );

          return (
            <div key={i} style={{ alignItems: "center", display: "flex",
              flexDirection: "column", width: BAR_WIDTH }}>

              {/* Value label at top */}
              <div style={{
                fontFamily: jetbrainsMono, fontSize: 32, color: bar.color,
                marginBottom: 10, fontWeight: 700,
                opacity: interpolate(frame, [i * 20 + 30, i * 20 + 50], [0, 1], {
                  extrapolateLeft: "clamp", extrapolateRight: "clamp",
                }),
              }}>
                ×{countVal.toLocaleString()}
              </div>

              {/* Bar */}
              <div style={{
                width: BAR_WIDTH, height: barHeight,
                background: bar.color,
                borderRadius: "4px 4px 0 0",
                boxShadow: bar.glow ? `0 0 40px ${bar.color}` : "none",
                transition: "none", // inline style — correct
              }} />

              {/* Bar label */}
              <div style={{
                fontFamily: inter, fontSize: 18, color: C.white,
                textAlign: "center", marginTop: 10, fontWeight: 600,
                lineHeight: 1.3, whiteSpace: "pre",
              }}>
                {bar.label}
              </div>
            </div>
          );
        })}
      </AbsoluteFill>

      {/* Callout arrow for Chernobyl */}
      {frame > 200 && (
        <div style={{
          position: "absolute", top: 200, right: 260,
          opacity: interpolate(frame, [200, 220], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
          background: C.red, padding: "10px 20px", borderRadius: 4,
        }}>
          <div style={{ fontFamily: bebasNeue, fontSize: 28, color: C.white }}>
            400× MORE THAN HIROSHIMA
          </div>
        </div>
      )}

      <AnimatedBanner
        items={["HIROSHIMA × 400", "200T FUEL STILL INSIDE", "600,000 WORKERS DEPLOYED", "REACTOR 4 EXPLODED 1986"]}
        bgColor={C.red}
        position="bottom"
        speed={1.2}
      />
    </AbsoluteFill>
  );
};
```

---

### `src/mg/MG06_HalfLife.tsx`

```tsx
import React from "react";
import {
  AbsoluteFill, interpolate, useCurrentFrame,
  useVideoConfig, Easing, staticFile,
} from "remotion";
import { Audio } from "@remotion/media";
import { evolvePath } from "@remotion/paths";
import { bebasNeue, inter, jetbrainsMono } from "../fonts";
import { C } from "../constants";
import { KineticText } from "../components/KineticText";

// Chart dimensions
const CW = 1400, CH = 500;
const PADDING = { left: 80, right: 40, top: 40, bottom: 60 };
const PLOT_W = CW - PADDING.left - PADDING.right;
const PLOT_H = CH - PADDING.top - PADDING.bottom;

// X axis: 0 to 30000 years
const X_MAX = 30000;
// Y axis: 0 to 1 (1 = full potency)

const scaleX = (years: number) => PADDING.left + (years / X_MAX) * PLOT_W;
const scaleY = (potency: number) => PADDING.top + PLOT_H - potency * PLOT_H;

// Half-life decay: potency = 0.5^(years/halfLife)
const decay = (years: number, halfLife: number) => Math.pow(0.5, years / halfLife);

// Generate path string for an isotope
const buildPath = (halfLife: number, steps = 200): string => {
  const pts = Array.from({ length: steps + 1 }, (_, i) => {
    const y = (i / steps) * X_MAX;
    return { x: scaleX(y), y: scaleY(decay(y, halfLife)) };
  });
  return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
};

const ISOTOPES = [
  { name: "Iodine-131",    halfLife: 0.022,   color: "#4A9EFF", path: buildPath(0.022) },
  { name: "Cesium-137",    halfLife: 30,      color: "#FFD700", path: buildPath(30) },
  { name: "Strontium-90",  halfLife: 29,      color: "#FF8C00", path: buildPath(29) },
  { name: "Plutonium-239", halfLife: 24110,   color: C.red,     path: buildPath(24110) },
];

export const MG06HalfLife: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // X axis draws first
  const xAxisProgress = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Audio src={staticFile("sfx/radiation_hum.wav")} volume={0.15} loop />

      {/* Title */}
      <div style={{
        position: "absolute", top: 40, left: 0, right: 0, textAlign: "center",
        opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}>
        <div style={{ fontFamily: bebasNeue, fontSize: 64, color: C.white, letterSpacing: 4 }}>
          HOW LONG DOES RADIATION LAST?
        </div>
        <div style={{ fontFamily: inter, fontSize: 20, color: "rgba(240,238,228,0.6)", marginTop: 4 }}>
          Decay curves by isotope released at Chernobyl
        </div>
      </div>

      {/* Chart SVG */}
      <div style={{ position: "absolute", top: 140, left: 260, width: CW, height: CH }}>
        <svg viewBox={`0 0 ${CW} ${CH}`} width={CW} height={CH}>

          {/* X axis */}
          <line
            x1={PADDING.left} y1={PADDING.top + PLOT_H}
            x2={PADDING.left + PLOT_W * xAxisProgress} y2={PADDING.top + PLOT_H}
            stroke={C.white} strokeWidth={2} opacity={0.5}
          />

          {/* X labels */}
          {[0, 100, 1000, 10000, 24110, 30000].map((yr) => (
            <text key={yr} x={scaleX(yr)} y={PADDING.top + PLOT_H + 24}
              textAnchor="middle" fill="rgba(240,238,228,0.5)"
              fontSize={14} fontFamily="JetBrains Mono">
              {yr === 0 ? "Now" : yr >= 1000 ? `${yr / 1000}k yr` : `${yr} yr`}
            </text>
          ))}

          {/* Y axis */}
          <line
            x1={PADDING.left} y1={PADDING.top}
            x2={PADDING.left} y2={PADDING.top + PLOT_H}
            stroke={C.white} strokeWidth={2} opacity={0.5}
          />

          {/* "TODAY" dashed line */}
          <line
            x1={scaleX(0)} y1={PADDING.top}
            x2={scaleX(0)} y2={PADDING.top + PLOT_H}
            stroke={C.green} strokeWidth={2} strokeDasharray="6 4"
            opacity={interpolate(frame, [60, 80], [0, 0.8], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            })}
          />

          {/* Isotope curves */}
          {ISOTOPES.map((iso, i) => {
            const lineProgress = interpolate(
              frame, [i * 30 + 60, i * 30 + 180], [0, 1], {
                extrapolateLeft: "clamp", extrapolateRight: "clamp",
                easing: Easing.out(Easing.quad),
              }
            );
            const { strokeDasharray, strokeDashoffset } = evolvePath(lineProgress, iso.path);
            return (
              <path
                key={i}
                d={iso.path}
                fill="none"
                stroke={iso.color}
                strokeWidth={iso.name === "Plutonium-239" ? 4 : 2.5}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                opacity={0.9}
              />
            );
          })}

          {/* Plutonium callout */}
          {frame > 220 && (
            <g opacity={interpolate(frame, [220, 240], [0, 1], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            })}>
              <rect x={scaleX(15000) - 10} y={scaleY(0.6) - 30}
                width={340} height={36} rx={4} fill={C.red} />
              <text x={scaleX(15000)} y={scaleY(0.6) - 8}
                fill={C.white} fontSize={18} fontFamily="Bebas Neue" letterSpacing={2}>
                STILL 50% POTENCY IN YEAR 26,096 AD
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Legend */}
      <div style={{
        position: "absolute", bottom: 80, left: 260,
        display: "flex", gap: 40,
        opacity: interpolate(frame, [100, 120], [0, 1], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp",
        }),
      }}>
        {ISOTOPES.map((iso) => (
          <div key={iso.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 4, background: iso.color, borderRadius: 2 }} />
            <span style={{ fontFamily: inter, fontSize: 18, color: iso.color, fontWeight: 600 }}>
              {iso.name}
            </span>
          </div>
        ))}
      </div>

      {/* Dramatic closing text */}
      {frame > 260 && (
        <div style={{
          position: "absolute", bottom: 140, left: 0, right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [260, 280], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        }}>
          <KineticText
            text="HALF OF CHERNOBYL'S PLUTONIUM WILL STILL BE RADIOACTIVE WHEN CIVILIZATIONS RISE AND FALL"
            startFrame={260}
            fontSize={32}
            highlightWords={["PLUTONIUM", "RADIOACTIVE"]}
            center
          />
        </div>
      )}
    </AbsoluteFill>
  );
};
```

---

## BGM SOURCING

**Style:** Cold ambient, dark documentary drone — no melody, no drums
**Sources:**
- YouTube Audio Library → filter `Ambient` + `Dark` + `No attribution`
- freemusicarchive.org → search `dark ambient`
- pixabay.com/music → search `tension documentary`

**Volume envelope (frame-based, coded in Episode02L.tsx):**
- Intro: 12%
- S1–MG01: 15%
- S2–MG03: ramp 15→30%
- S4 Sarcophagus peak: 30%
- S5 Human Cost: 12% (quiet grief)
- S6–MG06: 25%
- S7 Closer: fade 25→0%

---

## TIMING WORKFLOW

```
1. Generate 8 WAVs via Next.js TTS route (intro + s1–s7)
2. Measure each duration in seconds
3. Multiply × 30 → frames
4. Add ~50% buffer for pauses to MG segments (they're silent — design at runtime)
5. Update src/constants.ts SCENES object
6. TOTAL_FRAMES recalculates automatically
7. npx remotion studio → preview all 15 segments
8. Final render: npx remotion render ForeverLost_EP02L out/ep02_landscape.mp4 --codec h264
```

---

## FULL PRODUCTION CHECKLIST

- [ ] Generate 8 WAVs (intro narration opt. or leave silent)
- [ ] Update `constants.ts` frame counts
- [ ] Generate 7 images via Nano Banana 2
- [ ] Source & rename all 8 SFX files
- [ ] Download BGM → `public/bgm/ep02L_bgm.mp3`
- [ ] `npx remotion add @remotion/media`
- [ ] `npx remotion add @remotion/transitions`
- [ ] `npx remotion add @remotion/google-fonts`
- [ ] `npx remotion add @remotion/paths`
- [ ] Build all components in order: shared → scenes → mg → Episode02L
- [ ] `npm run dev` → preview each segment individually
- [ ] Adjust timing constants to match WAV durations
- [ ] Final render at H264 for YouTube upload
