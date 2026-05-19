# AGENTS.md — claude-code (Remotion video project)

## What this is

Remotion 4.0.459 project for **FOREVER LOST** — a YouTube documentary channel.  
Three compositions registered in `src/Root.tsx`, all under the "Forever-Lost" folder:

| ID | Resolution | FPS | Status |
|---|---|---|---|
| `ForeverLost` | 1280×720 | 30 | Titanic (done) |
| `ForeverLost-Ep2` | 1920×1080 | 30 | Chernobyl (WIP) |
| `ForeverLost-Ep2-Shorts` | 1080×1920 | 30 | Shorts cut (WIP) |

## Commands

| Action | Command |
|---|---|
| Dev server (port **3002**) | `npm run dev` |
| Lint (ESLint + tsc) | `npm run lint` |
| Build | `npm run build` |
| Render | `npx remotion render` |
| Single-frame check | `npx remotion still <composition-id> --scale=0.25 --frame=30` |
| Generate captions from WAV | `npx tsx scripts/generate-captions.ts <input.wav> <output.json>` |

## Project structure

```
src/
  index.ts                    ← registerRoot entrypoint
  Root.tsx                    ← Composition definitions
  index.css                   ← Tailwind v4 + theme tokens (Google Fonts @import)
  components/Theme.ts         ← OKLCH design tokens
  components/atoms/           ← Shared: TiktokCaptions, CountUp, Explode, GlitchText, etc.
  lib/utils.ts                ← cn(), getPhraseFrames()
  types/index.ts              ← TranscriptEntry type
  remotion/categories/forever-lost/
    WORKFLOW.md               ← Detailed production workflow
    ep-001/                   ← Flat scene files (Scene01_Hook.tsx, etc.)
    ep-001/scenes/sceneN/     ← Per-scene folders (constants.ts + index.tsx barrel)
    ep-001-shorts/acts/       ← Shorts version acts
```

## Path alias

`@/*` maps to `src/*` — configured in both `tsconfig.json` and Remotion's webpack config (`remotion.config.ts`).

## Caption generation workflow

1. Place WAV in `public/assets/forever-lost/ep-XXX/voices/vo/`
2. Run: `npx tsx scripts/generate-captions.ts "<input.wav>" "<output transcript>.json"`
3. Clean transcript JSON: merge split words (`" atmosp"+"heres"`→`" atmospheres"`), remove `[BLANK_AUDIO]`, zero-duration dupes, low-confidence trailing tokens
4. The transcript variable is intentionally spelled `TRASCRIPT_DATA` (not `TRANSCRIPT`) across the codebase

## Timing gotchas

- `useCurrentFrame()` returns **absolute** frames (not relative to `<Sequence>`)
- `spring()` must be wrapped with `Math.max(0, frame - trigger)` to prevent negative-frame crashes
- `interpolate()` inputRange must be strictly monotonically increasing
- `getPhraseFrames()` from `@/lib/utils` is the canonical way to sync animations to spoken words
- `<Audio>` from `@remotion/media`, `<Img>` from `remotion`, assets via `staticFile()` from `public/`
- **No CSS transitions or Tailwind animation classes** — use `interpolate()`/`spring()` instead

## Styling

- Tailwind CSS v4 (`@import "tailwindcss"`), configured via `@remotion/tailwind-v4` in webpack
- Prettier with `prettier-plugin-tailwindcss` for class sorting
- Custom theme tokens defined in `src/index.css` via `@theme` directive (abyssBlack, biolumTeal, gold, etc.)
- Fonts: Inter (sans, `font-inter`), Patua One (display, `font-patua`), JetBrains Mono (mono, `font-mono`)

## Loaded skills & instruction files

- `.agents/skills/forever-lost/SKILL.md` — channel concept, creative workflow
- `.agents/skills/remotion-best-practices/SKILL.md` — Remotion domain knowledge
- `src/remotion/categories/forever-lost/WORKFLOW.md` — scene production pipeline
