# Forever Lost — Production Workflow

## Overview

Pipeline for building Remotion scenes with voiceover, frame-synced captions, and scene transitions.

---

## 1. Add a New VO Audio

1. Place the WAV file in `public/assets/forever-lost/ep-002/voices/vo/vo_sceneN.wav`
2. Create scene folder at `src/remotion/categories/forever-lost/ep-002/scenes/sceneN/`
3. Create `constants.ts`:

```ts
import transcriptData from "./transcript_sceneN.json";

const FPS = 30;
const lastEndMs = transcriptData[transcriptData.length - 1]?.endMs ?? 0;

export const TRASCRIPT_DATA = transcriptData;
export const VO_START_FRAME = 60;
export const SCENE_DURATION =
  VO_START_FRAME + Math.ceil((lastEndMs / 1000) * FPS) + FPS;
```

4. Create `index.tsx` barrel:
```ts
export { SceneN_Component as SceneN } from "./SceneN_Component";
export { SCENE_DURATION } from "./constants";
```

---

## 2. Generate Transcript

```bash
npx tsx scripts/generate-captions.ts \
  "public/assets/forever-lost/ep-002/voices/vo/vo_sceneN.wav" \
  "src/remotion/categories/forever-lost/ep-002/scenes/sceneN/transcript_sceneN.json"
```

---

## 3. Merge Fix (Split Words)

Whisper.cpp sometimes splits compound words across adjacent tokens. Merge them:

**Common patterns to check**:
- `" atmosp" + "heres"` → `" atmospheres"`
- `" sty" + "ro" + "fo" + "am"` → `" styrofoam"`
- `" corro" + "ding"` → `" corroding"`
- `" rust" + "icles"` → `" rusticles"`
- `" disinteg" + "rate"` → `" disintegrate"`
- `" 52" + "," + "000"` → `" 52,000"`
- `" 10" + "," + "000"` → `" 10,000"`
- `" struct" + "urally"` → `" structurally"`
- `" unrecogn" + "izable"` → `" unrecognizable"`
- `" impl" + "osion"` → `" implosion"`
- `" deep" + " sea"` → `" deep sea"` (or `" deep" + "-" + "sea"` → `" deep-sea"`)
- Contractions: `" isn" + "'t"`, `" don" + "'t"`, `" it" + "'s"`, `" that" + "'s"`, `" let" + "'s"`, `" You" + "'d"`, `" wouldn" + "'t"`

**Script**:
```python
# python3 script to find + merge split patterns
# See also: the full merge function used across scenes
```

Also remove:
- Phantom `[BLANK_AUDIO]` tokens (low-confidence artifacts at end)
- Zero-duration duplicate tokens (whisper re-processing artifacts)
- Trailing tokens with `< 0.1` confidence

---

## 4. Build Scene Component

```tsx
// Minimal skeleton with audio + captions:
import { getPhraseFrames } from "@/lib/utils";
import { TRASCRIPT_DATA as transcriptData, VO_START_FRAME } from "./constants";

const gpf = (phrase: string) =>
  getPhraseFrames({ phrase, transcriptData, fps, voiceOverStartFrame: VO_START_FRAME }).from;

const highlightedWords = ["word1", "word2"];

// In JSX:
<Audio src={staticFile(`${ASSET}/voices/vo/vo_sceneN.wav`)} volume={0.85} />
<TiktokCaptions
  transcript={transcriptData}
  highlightedWords={highlightedWords}
  position="center"
  startFrame={VO_START_FRAME}
/>
```

### Visual Trigger Pattern

Use `getPhraseFrames` to sync animations to spoken words:

```tsx
const frameWord = gpf("keyword"); // Returns absolute frame when word is spoken

// Then use frameWord in:
// - <Sequence from={frameWord}> for timed reveals
// - interpolate(frame, [frameWord, frameWord + 30], ...)
// - spring({ frame: Math.max(0, frame - frameWord), ... })
```

### Key Rules

- `useCurrentFrame()` returns **absolute** frames (not relative to `<Sequence>`)
- Always guard `spring()` with `Math.max(0, frame - trigger)` to prevent negative frame crashes
- `interpolate()` inputRange must be strictly monotonically increasing
- No CSS transitions or Tailwind animation classes (use `interpolate` / `spring`)
- Use `<Img>` from Remotion (not `<img>`)
- Use `<Audio>` from `@remotion/media`
- Assets go in `public/`, referenced via `staticFile()`

---

## 5. Shared Components

| Component | Purpose |
|-----------|---------|
| `TiktokCaptions` | TikTok-style paginated captions with word highlighting |
| `CountUp` | Animated number counter |
| `DissolutionTimeline` | 1912→2030 timeline bar |
| `Explode` | Character-shatter text effect |
| `GlitchText` | Glitch/distortion text effect |

### TiktokCaptions Props

```tsx
<TiktokCaptions
  transcript={data}         // Caption[]
  highlightedWords={["a"]}  // Exact-match single words
  position="center"         // or "bottom-center"
  startFrame={60}           // VO_START_FRAME offset
  switchCaptionsEveryMs={1000}  // Page advance rate (default 1500)
  showOverlay               // Optional dark bg behind text
/>
```

### getPhraseFrames (from @/lib/utils)

```tsx
const result = getPhraseFrames({
  phrase: "keyword",         // Single or multi-word
  transcriptData,           // The raw transcript array
  fps,
  voiceOverStartFrame: 60,  // VO_START_FRAME
  bufferFrames: 8,          // Padding after phrase ends
});
// result.from      → start frame
// result.duration  → phrase duration + buffer
```

Handles: punctuation stripping, hyphenated-word splitting (e.g., `" five-ton"` → tokens `["five", "ton"]`), multi-word phrase matching.

---

## 6. Wire into Master Composition

In `ForeverLost.tsx`:

```tsx
import { SceneN, SCENE_DURATION as SCENE_N_DURATION } from "./scenes/sceneN";

export const TOTAL_DURATION =
  SCENE0_DURATION + ... + SCENE_N_DURATION + BLACK_HOLD_FRAMES - N * TRANSITION_DURATION;

<TransitionSeries>
  ...
  <TransitionSeries.Sequence durationInFrames={SCENE_N_DURATION}>
    <SceneN />
  </TransitionSeries.Sequence>
  <TransitionSeries.Transition presentation={presentation} timing={timing} />
  <TransitionSeries.Sequence durationInFrames={...}><BlackFrame /></TransitionSeries.Sequence>
</TransitionSeries>
```

---

## 7. Common Bugs & Fixes

| Symptom | Cause | Fix |
|---------|-------|-----|
| `inputRange must be strictly monotonically increasing` | Negative or out-of-order keyframe values in `interpolate()` | Guard word-lookup results: only include keyframes if `frameDebris > frameShatter + offset` |
| Spring renders at wrong time / spinner | Negative frame in `spring()` | Wrap with `Math.max(0, frame - trigger)` |
| Captions appear at start of scene | `getWordFrame` using old single-word `.includes()` | Use multi-word `getPhraseFrames` or the new `getWordFrame` with part splitting |
| Progress bar / year counter stuck | `useCurrentFrame()` returns absolute frame but `startFrame` was set to 0 inside `<Sequence>` | Set `startFrame` to the **absolute** frame number (e.g., `frame100kg`), not 0 |
| Custom Tailwind colors not recognized | `eslint-plugin-tailwindcss` can't resolve Tailwind v4's CSS-based config | Disable `tailwindcss/no-custom-classname` rule; keep `classnames-order` |
| Phantom `[BLANK_AUDIO]` in transcript | Whisper transcribes silence at end of audio | Remove tokens after the last meaningful word |

---

## 8. Scene File Checklist

Each scene folder should contain:
- [ ] `transcript_sceneN.json` — cleaned + merged
- [ ] `constants.ts` — imports transcript, exports `TRASCRIPT_DATA`, `VO_START_FRAME`, `SCENE_DURATION`
- [ ] `SceneN_Component.tsx` — component with audio + captions + visuals
- [ ] `index.tsx` — barrel re-export of component + duration
- [ ] `meta.ts` — voiceover instructions for TTS generation

---

## 9. Composition Registry

In `Root.tsx`:
```tsx
<Composition
  id="ForeverLost-Ep2"
  component={ForeverLostEp2}
  durationInFrames={EP2_TOTAL_DURATION}
  fps={FPS}
  width={1920}
  height={1080}
/>
```
