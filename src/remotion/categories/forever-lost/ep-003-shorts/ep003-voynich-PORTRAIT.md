# FOREVER LOST — Episode 003 (PORTRAIT / SHORTS)
## "The Voynich Manuscript — Why Nobody Can Decode It"
### Format: 9:16 · TikTok / Reels / YouTube Shorts · ~60 sec target

---

> **TIMING PHILOSOPHY FOR SHORTS**
> Each voiceover below is **pre-timed by word count** at ~2.8 words/sec (Charon gravelly pace).
> Scene budgets are strict. After WAV generation, update `constants.ts` only — all components auto-adjust.
> **Do NOT add pauses inside scenes 1–5.** Pauses reserved for Scene 6–7 only (emotional closer).

---

## 🗂️ PUBLIC FOLDER STRUCTURE

```
public/
├── audio/
│   ├── ep003_s1_hook.wav
│   ├── ep003_s2_discovery.wav
│   ├── ep003_s3_stats.wav
│   ├── ep003_s4_language.wav
│   ├── ep003_s5_attempts.wav
│   ├── ep003_s6_theories.wav
│   └── ep003_s7_closer.wav
├── images/
│   ├── ep003_manuscript_page.png         ← S1 BG + S3 BG (reused)
│   ├── ep003_castle_exterior.png         ← S2 BG (Italian castle)
│   ├── ep003_wilfrid_voynich.png         ← S2 cutout portrait PNG
│   ├── ep003_cipher_closeup.png          ← S4 BG (glyph close-up)
│   ├── ep003_yale_beinecke.png           ← S5 BG (Yale exterior)
│   ├── ep003_plant_botanical.png         ← S6 BG (herbal illustration)
│   └── ep003_scribe_hand.png             ← S7 BG (hand + quill)
├── sfx/
│   ├── paper_rustle.mp3
│   ├── quill_scratch.mp3
│   ├── deep_rumble.mp3
│   ├── clock_tick.mp3
│   └── silence_drone.mp3
└── music/
    └── ep003_bgm_shorts.mp3
```

---

## 🎵 BACKGROUND MUSIC

**Track:** Dark ambient / medieval mystery
**Recommendation:** "Cipher" or "Forgotten Scroll" style — YouTube Audio Library
**Volume envelope:**
- Scenes 1–2: 0.15 (under hook)
- Scenes 3–5: 0.10 (info-dense)
- Scenes 6–7: 0.20 (emotional swell)

---

## 📋 SCENE-BY-SCENE BREAKDOWN

---

### SCENE 1 — HOOK (0–8s · ~240 frames)

**Target duration:** 7–9 seconds
**Word count target:** ~20 words (~7s at Charon pace)

#### 🎙️ TTS PROMPT

```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — The Voynich Manuscript"

## THE SCENE: Cold open — mystery hook
A dark library. Candlelight. Ancient parchment.

### DIRECTOR'S NOTES
Style: Hushed, conspiratorial, pulling the viewer in
Pacing: Slow and deliberate. Each word lands.

#### TRANSCRIPT
[serious] A book exists... that no human has ever decoded. [pause] Not one word. [pause] In six hundred years.
```

**Estimated duration:** ~7 sec
**SFX:** `paper_rustle.mp3` at frame 0, vol 0.4 → fade by frame 60

#### 🖼️ IMAGE PROMPTS (Nano Banana 2)

**Image A — `ep003_manuscript_page.png` — Background layer (full frame)**
> Extreme close-up of aged yellowed manuscript pages covered in unknown script, candlelight glow from left, deep shadow on right, cinematic, photorealistic, moody, mysterious, 9:16 vertical

**Image B — none** — Text overlay is motion graphics only

#### 🎬 MOTION DIRECTION
- Background image: slow Ken Burns — scale from 1.0 → 1.08 over full scene
- Title text "FOREVER LOST" fades in at frame 20, size 28px, color #C8A96E (gold), font: Cinzel
- Hook line appears word-by-word with 8-frame stagger
- "Not one word." — bold white, large, center, spring-in from below
- Vignette overlay: radial gradient, 60% opacity black edges

---

### SCENE 2 — DISCOVERY (8–18s · frames 240–540)

**Target duration:** 10 seconds
**Word count target:** ~25 words (~9s at Charon pace)

#### 🎙️ TTS PROMPT

```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — The Voynich Manuscript"

## THE SCENE: Setting the historical context
1912. A rare book dealer named Wilfrid Voynich finds it in an Italian castle.

### DIRECTOR'S NOTES
Style: Matter-of-fact historian. Slightly ominous.
Pacing: Medium. Conversational but weighted.

#### TRANSCRIPT
[serious] In 1912, a rare book dealer named Wilfrid Voynich discovered it in an Italian castle. Carbon dating places it in the early 1400s. Nobody knew who wrote it. Nobody knows now.
```

**Estimated duration:** ~10 sec
**SFX:** `quill_scratch.mp3` at frame 240, vol 0.3, 2s duration

#### 🖼️ IMAGE PROMPTS (Nano Banana 2)

**Image A — `ep003_wilfrid_voynich.png` — Cutout portrait PNG**
> Black and white vintage portrait photo style, mustachioed man in early 1900s formal attire, dramatic side lighting, isolated on transparent background, slightly worn photograph effect

**Image B — `ep003_castle_exterior.png` — Background**
> Italian renaissance castle exterior, overcast sky, moody, cinematic, photorealistic, desaturated green-brown tones, 9:16 vertical composition

#### 🎬 MOTION DIRECTION
- Castle BG: static with subtle parallax (moves -5px on y over 300 frames)
- Voynich portrait: slides in from right (x: 400 → 80) with spring easing, frame 260–310
- Year "1412–1438" appears as animated counter (digit roll-up effect)
- Subtitle bar: thin gold line (#C8A96E) slides in from left under name
- Location tag "Villa Mondragone, Italy" — small badge, bottom left

---

### SCENE 3 — STATS (18–30s · frames 540–900)

**Target duration:** 12 seconds
**Word count target:** ~28 words (~10s at Charon pace)

#### 🎙️ TTS PROMPT

```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — The Voynich Manuscript"

## THE SCENE: Hard numbers — the scale of failure
How many have tried to crack it.

### DIRECTOR'S NOTES
Style: Cold. Statistical. Like reading a verdict.
Pacing: Each number gets its own beat. No rushing.

#### TRANSCRIPT
[serious] Two hundred and forty pages. An unknown alphabet — over one hundred unique characters. World War Two codebreakers tried. The NSA tried. AI tried. All failed.
```

**Estimated duration:** ~11 sec
**SFX:** `clock_tick.mp3` looping under stats, vol 0.25

#### 🖼️ IMAGE PROMPTS (Nano Banana 2)

**Image A — `ep003_manuscript_page.png` — Background (reused from S1)**
> Same file. Used at 40% opacity behind stat cards.

#### 🎬 MOTION DIRECTION (STAT CARDS — Primary motion graphics)

Three stat cards animate in sequence:

**Card 1** (frame 560–660):
- "240" — 120px white Cinzel Bold
- Subtitle: "pages of unknown text"
- Animation: scale 0 → 1 with spring, then slight float
- Color: white on dark charcoal panel (#1A1A1A, 85% opacity)

**Card 2** (frame 660–760):
- "100+" — same style
- Subtitle: "unique characters, no Rosetta Stone"
- Slide in from right

**Card 3** (frame 760–880):
- "600" — red tint (#CC3333)
- Subtitle: "years. Still unsolved."
- Pulse glow animation: box-shadow 0 → 20px red, loop 2×

---

### SCENE 4 — THE LANGUAGE ANOMALY (30–42s · frames 900–1260)

**Target duration:** 12 seconds
**Word count target:** ~30 words (~11s at Charon pace)

#### 🎙️ TTS PROMPT

```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — The Voynich Manuscript"

## THE SCENE: The linguistics mystery — why it resists analysis
The script follows real language patterns but matches no known language.

### DIRECTOR'S NOTES
Style: Analytical. Slightly unsettled. Like a scientist who can't explain a result.
Pacing: Medium. Building unease.

#### TRANSCRIPT
[serious] The text follows natural language patterns — word frequency, structure, flow. It behaves like a real language. But it matches nothing. Not Latin. Not Arabic. Not any cipher ever invented.
```

**Estimated duration:** ~11 sec
**SFX:** `deep_rumble.mp3` fade in at frame 900, vol 0.2

#### 🖼️ IMAGE PROMPTS (Nano Banana 2)

**Image A — `ep003_cipher_closeup.png` — Background**
> Extreme macro close-up of Voynich manuscript text, individual unknown glyphs visible, shallow depth of field, warm parchment color, mysterious, photorealistic texture detail, portrait orientation

#### 🎬 MOTION DIRECTION

- BG: cipher text image, very slow zoom in (1.0 → 1.06)
- Animated text comparison banners (three rows, staggered entry):

  Row 1: `Latin:  Lorem ipsum dolor sit...` — strikethrough red ✗
  Row 2: `Arabic: بسم الله الرحمن...` — strikethrough red ✗
  Row 3: `Voynich: ⊕∂ꝏꝑ꜀ɵ꟟...` — GLOWS gold ✓ (but "unknown")

- Each row: slide in from left, 20-frame stagger
- Strikethrough animation: line draws left-to-right on frame entry
- Font for Voynich glyphs: approximate with Unicode symbols or custom SVG path letters

---

### SCENE 5 — WHO TRIED & FAILED (42–52s · frames 1260–1560)

**Target duration:** 10 seconds
**Word count target:** ~24 words (~9s at Charon pace)

#### 🎙️ TTS PROMPT

```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — The Voynich Manuscript"

## THE SCENE: The roster of failure
Elite institutions and intelligence agencies, all defeated.

### DIRECTOR'S NOTES
Style: List-style delivery, each name landing like a name on a wall
Pacing: Slightly faster. Rhythmic. Almost percussive.

#### TRANSCRIPT
[serious] Yale University holds it now. The FBI studied it. Britain's top codebreakers during the war — stumped. In 2018, artificial intelligence analyzed every pattern. Still nothing.
```

**Estimated duration:** ~9–10 sec
**SFX:** `clock_tick.mp3` single ticks synced to each institution name

#### 🖼️ IMAGE PROMPTS (Nano Banana 2)

**Image A — `ep003_yale_beinecke.png` — Background**
> Yale Beinecke Rare Book Library exterior at dusk, dramatic sky, architectural photography, slightly desaturated cinematic look, 9:16 portrait crop

#### 🎬 MOTION DIRECTION

- Institution "Failure Wall" — animated list, each entry drops in from top:
  - `🏛️ Yale University — HOLDS IT — UNSOLVED`
  - `🔐 NSA / FBI — ANALYZED — UNSOLVED`
  - `⚔️ WWII Codebreakers — ATTEMPTED — UNSOLVED`
  - `🤖 AI (2018) — PATTERN ANALYZED — UNSOLVED`
- Each row: dark panel, thin left border in red (#CC3333)
- Row text color: white, subtitle gray (#AAAAAA)
- Entry animation: Y from -30px → 0, opacity 0→1, 15-frame stagger
- "UNSOLVED" tag: red badge, slight pulse

---

### SCENE 6 — THE THEORIES (52–58s · frames 1560–1740)

**Target duration:** 6 seconds
**Word count target:** ~16 words (~6s at Charon pace)

#### 🎙️ TTS PROMPT

```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — The Voynich Manuscript"

## THE SCENE: The desperate theories — none proven
What people believe vs. what's known.

### DIRECTOR'S NOTES
Style: Quieter. Reflective. Almost tired.
Pacing: Slower. Each theory is a shrug.

#### TRANSCRIPT
[slow] Some say it's a hoax. Some say it's a lost language. Some say it's a medieval medical manual... written in a code that died with its author.
```

**Estimated duration:** ~6 sec
**SFX:** none (music swells slightly)

#### 🖼️ IMAGE PROMPTS (Nano Banana 2)

**Image A — `ep003_plant_botanical.png` — Background**
> Stylized medieval herbal manuscript illustration of an unidentifiable plant with roots, in warm ink-on-parchment style, photorealistic aged paper texture, full frame portrait

#### 🎬 MOTION DIRECTION

- Three theory pills fade in one by one (center-aligned):
  - 💀 `"Medieval Hoax"` — gray
  - 🌿 `"Lost Language"` — muted green
  - ⚕️ `"Coded Medical Manual"` — muted blue
- Each pill: rounded rect, 12px border-radius, semi-transparent
- Fade in: opacity 0→1 over 10 frames each, 20-frame stagger
- Soft question mark "?" watermark behind — large, 30% opacity white

---

### SCENE 7 — CLOSER (58–67s · frames 1740–2010)

**Target duration:** 9 seconds
**Word count target:** ~22 words (~8s at Charon pace)

#### 🎙️ TTS PROMPT

```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — The Voynich Manuscript"

## THE SCENE: The emotional human closer — the unknowing
The quiet weight of something that may never be understood.

### DIRECTOR'S NOTES
Style: Somber. Intimate. Almost a whisper at the end.
Pacing: Slow. Deliberate pauses.

#### TRANSCRIPT
[slow] Somewhere, someone wrote this. [pause] They had thoughts, ideas, maybe secrets. [pause] And we will [whispers] probably never know what they were trying to say.
```

**Estimated duration:** ~8–9 sec
**SFX:** `silence_drone.mp3` fade in at frame 1760, vol 0.15 → fade out at frame 2010

#### 🖼️ IMAGE PROMPTS (Nano Banana 2)

**Image A — `ep003_scribe_hand.png` — Background (hero closer)**
> Dark cinematic shot of a medieval scribe's hand holding a quill, writing on candlelit parchment, only hand and page visible, deep shadows, warm amber candlelight, photorealistic, 9:16 vertical, emotional, lonely

#### 🎬 MOTION DIRECTION

- BG image: slowest Ken Burns yet (1.0 → 1.04 over 270 frames)
- Text fades in line by line, center, large serif font
- Final line "probably never know" — opacity 1→0.4 (fade to near-invisible) on [whispers] cue
- End card: "FOREVER LOST" logo animates in bottom center, opacity 0→1 over 30 frames
- Black fade-to-black: starts frame 1980, full black by frame 2010
- Music: crescendo then cut to silence at frame 2000

---

## 📐 CONSTANTS.TS (PLACEHOLDER — update after WAV generation)

```typescript
// src/constants.ts — PORTRAIT VERSION
export const FPS = 30;

export const SCENES = {
  s1_hook:       { start: 0,    durationSec: 8  },
  s2_discovery:  { start: 8,    durationSec: 10 },
  s3_stats:      { start: 18,   durationSec: 12 },
  s4_language:   { start: 30,   durationSec: 12 },
  s5_attempts:   { start: 42,   durationSec: 10 },
  s6_theories:   { start: 52,   durationSec: 6  },
  s7_closer:     { start: 58,   durationSec: 9  },
} as const;

// Helper
export const secToFrames = (sec: number) => Math.round(sec * FPS);
export const totalFrames = secToFrames(SCENES.s7_closer.start + SCENES.s7_closer.durationSec);
// → 2010 frames ≈ 67 seconds
```

---

## 📦 ROOT.TSX (PORTRAIT)

```tsx
// src/Root.tsx
import { Composition } from 'remotion';
import { VoynichShort } from './compositions/VoynichShort';
import { SCENES, FPS, totalFrames } from './constants';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="VoynichShort"
        component={VoynichShort}
        durationInFrames={totalFrames}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
```

---

## 📦 VOYNICHSHORT.TSX — MAIN COMPOSITION

```tsx
// src/compositions/VoynichShort.tsx
import { AbsoluteFill, Sequence, staticFile } from 'remotion';
import { Audio } from '@remotion/media';
import { SCENES, secToFrames } from '../constants';
import { Scene1Hook } from '../scenes/portrait/Scene1Hook';
import { Scene2Discovery } from '../scenes/portrait/Scene2Discovery';
import { Scene3Stats } from '../scenes/portrait/Scene3Stats';
import { Scene4Language } from '../scenes/portrait/Scene4Language';
import { Scene5Attempts } from '../scenes/portrait/Scene5Attempts';
import { Scene6Theories } from '../scenes/portrait/Scene6Theories';
import { Scene7Closer } from '../scenes/portrait/Scene7Closer';

const SCENE_COMPONENTS: Record<keyof typeof SCENES, React.FC> = {
  s1_hook: Scene1Hook,
  s2_discovery: Scene2Discovery,
  s3_stats: Scene3Stats,
  s4_language: Scene4Language,
  s5_attempts: Scene5Attempts,
  s6_theories: Scene6Theories,
  s7_closer: Scene7Closer,
};

export const VoynichShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0A0A0A' }}>
      {/* BGM */}
      <Audio src={staticFile('music/ep003_bgm_shorts.mp3')} volume={0.12} />

      {/* SCENES */}
      {(Object.keys(SCENES) as Array<keyof typeof SCENES>).map((key) => {
        const scene = SCENES[key];
        const Component = SCENE_COMPONENTS[key];
        return (
          <Sequence
            key={key}
            from={secToFrames(scene.start)}
            durationInFrames={secToFrames(scene.durationSec)}
          >
            <Component />
            <Audio src={staticFile(`audio/ep003_${key}.wav`)} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
```

---

## 📦 SCENE COMPONENTS (PORTRAIT)

### Scene1Hook.tsx

```tsx
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Cinzel';

const { fontFamily: cinzelFont } = loadFont('normal', {
  weights: ['400', '700', '900'],
  subsets: ['latin'],
});

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgScale = interpolate(frame, [0, 8 * fps], [1.0, 1.08], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const titleOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const hookOpacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const impactY = spring({ frame: frame - 80, fps, config: { damping: 12, stiffness: 180 } });
  const impactTranslate = interpolate(impactY, [0, 1], [60, 0]);

  return (
    <AbsoluteFill>
      {/* BG Image with Ken Burns */}
      <AbsoluteFill style={{ transform: `scale(${bgScale})`, transformOrigin: 'center' }}>
        <Img src={staticFile('images/ep003_manuscript_page.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>

      {/* Vignette */}
      <AbsoluteFill style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)',
      }} />

      {/* FOREVER LOST label */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-start', paddingTop: 80 }}>
        <div style={{ opacity: titleOpacity, fontFamily: cinzelFont, fontSize: 22, color: '#C8A96E', letterSpacing: 6 }}>
          FOREVER LOST
        </div>
      </AbsoluteFill>

      {/* Hook text */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ opacity: hookOpacity, textAlign: 'center', padding: '0 60px' }}>
          <p style={{ fontFamily: cinzelFont, fontSize: 32, color: 'white', lineHeight: 1.4, margin: 0 }}>
            A book exists that no human has ever decoded.
          </p>
        </div>
      </AbsoluteFill>

      {/* Impact line */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 180 }}>
        <div style={{ transform: `translateY(${impactTranslate}px)`, textAlign: 'center' }}>
          <p style={{ fontFamily: cinzelFont, fontSize: 52, fontWeight: 900, color: 'white', margin: 0 }}>
            Not one word.
          </p>
          <p style={{ fontFamily: cinzelFont, fontSize: 28, color: '#C8A96E', margin: '8px 0 0' }}>
            In 600 years.
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
```

### Scene3Stats.tsx (stat cards example)

```tsx
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Cinzel';
import { loadFont as loadInterFont } from '@remotion/google-fonts/Inter';

const { fontFamily: cinzelFont } = loadFont('normal', {
  weights: ['400', '700', '900'],
  subsets: ['latin'],
});

const { fontFamily: interFont } = loadInterFont('normal', {
  weights: ['400'],
  subsets: ['latin'],
});

const stats = [
  { number: '240', label: 'pages of unknown text', color: '#FFFFFF', delay: 0 },
  { number: '100+', label: 'unique characters — no Rosetta Stone', color: '#FFFFFF', delay: 30 },
  { number: '600', label: 'years. Still unsolved.', color: '#CC3333', delay: 60 },
];

export const Scene3Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: 0.4 }}>
        <Img src={staticFile('images/ep003_manuscript_page.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} />

      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', gap: 24, flexDirection: 'column', padding: '0 40px' }}>
        {stats.map(({ number, label, color, delay }) => {
          const progress = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 120 } });
          const scale = interpolate(progress, [0, 1], [0.6, 1]);
          const opacity = interpolate(progress, [0, 0.3], [0, 1], {
            extrapolateRight: 'clamp',
          });
          return (
            <div key={number} style={{ transform: `scale(${scale})`, opacity, backgroundColor: 'rgba(26,26,26,0.88)', borderRadius: 16, padding: '24px 40px', width: '100%', textAlign: 'center' }}>
              <div style={{ fontFamily: cinzelFont, fontSize: 72, fontWeight: 900, color, lineHeight: 1 }}>{number}</div>
              <div style={{ fontFamily: interFont, fontSize: 18, color: '#AAAAAA', marginTop: 8 }}>{label}</div>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
```

---

## 🔢 TIMING WORKFLOW

```
1. Generate 7 WAV files via TTS (voice: Charon)
2. Note exact duration in seconds for each
3. Update SCENES object in constants.ts:
   s1_hook.durationSec = [actual WAV duration]
   s2_discovery.durationSec = [actual WAV duration]
   ... etc
4. Recalculate start values: each scene.start = previous.start + previous.durationSec
5. All Sequence components auto-adjust — no other changes needed
```

---

## 🎨 DESIGN TOKENS

```
Background base:   #0A0A0A
Gold accent:       #C8A96E
Red danger:        #CC3333
Text primary:      #FFFFFF
Text secondary:    #AAAAAA
Panel bg:          rgba(26,26,26,0.88)
Font — Display:    Cinzel (via @remotion/google-fonts/Cinzel)
Font — Body:       Inter (via @remotion/google-fonts/Inter)
Font — Mono:       Courier New (cipher text)
```

---

## ⚠️ REMOTION GOTCHAS

> **CSS transitions/animations are FORBIDDEN** — they will not render correctly in Remotion. All animation must use `interpolate()`, `spring()`, or `Easing`.
>
> **Tailwind animation class names are FORBIDDEN** — they will not render correctly.
>
> **Fonts must be loaded via `@remotion/google-fonts`** — CSS `fontFamily` strings like `'Cinzel, serif'` will not guarantee the font is available at render time. Use `loadFont()` and the returned `fontFamily` value.
>
> **Audio must be imported from `@remotion/media`** — not from `remotion` directly. Run `npx remotion add @remotion/media` if not installed.
>
> **Images must use the `<Img>` component** — not a plain `<img>` tag, for proper loading behavior during rendering.
>
> **Sequence `from` values are in frames** — when `start` is stored in seconds, always convert via `secToFrames()` before passing to `<Sequence from={...}>`.
>
> **`useVideoConfig()` is preferred** over hardcoding `fps = 30` inside components. This ensures components stay in sync with the composition definition.
