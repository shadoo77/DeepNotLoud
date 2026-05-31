# AGENTS.md — claude-code (Remotion video project)

## What this is

Remotion 4.0.469 project for **FOREVER LOST** — a YouTube documentary channel.  
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

## Audio & BGM

- `volume={(f) => ...}` callback form works everywhere — top-level, inside `<Sequence>`, inside `<TransitionSeries.Sequence>` — in both Studio and `npx remotion render`.
- Always use `interpolate()` inside the callback (not raw JS math). Remotion optimizes `interpolate()` calls; equivalent manual math may not produce the same volume curve in the render pipeline.
- For looped audio with volume curves, use `loopVolumeCurveBehavior="extend"`.
- `useCurrentFrame()` + literal `volume={number}` works inside `<Sequence>` components but triggers a Remotion warning — prefer callback form.
- Each episode gets its own `BgmWithFade.tsx` in the episode folder:
  - Imports `SCENES`, `T`, `ASSET_PATH`, `BGM_LOOP_DURATION` from its `constants.ts`
  - Computes scene boundaries and per-scene volume levels (step-function via if/else, not interpolate ramps)
  - Uses `volume={(f) => { ... interpolate(...) }}` callback for final fade-out
  - Uses manual `f % BGM_LOOP_DURATION` math for loop-seam crossfade (works alongside `loopVolumeCurveBehavior="extend"`)
  - Placed outside `<TransitionSeries>` at composition root level
- BGM loop duration: store as `export const BGM_LOOP_DURATION = N;` in the episode's `constants.ts`. Add an ffprobe comment showing the recompute command. Static files don't change — no Mediabunny, `calculateMetadata`, or `delayRender`. Verify once, done.

## Styling

- Tailwind CSS v4 (`@import "tailwindcss"`), configured via `@remotion/tailwind-v4` in webpack
- Prettier with `prettier-plugin-tailwindcss` for class sorting
- Custom theme tokens defined in `src/index.css` via `@theme` directive (abyssBlack, biolumTeal, gold, etc.)
- Fonts: Inter (sans, `font-inter`), Patua One (display, `font-patua`), JetBrains Mono (mono, `font-mono`)

## Loaded skills & instruction files

- `.agents/skills/forever-lost/SKILL.md` — channel concept, creative workflow
- `.agents/skills/remotion-best-practices/SKILL.md` — Remotion domain knowledge
- `src/remotion/categories/forever-lost/WORKFLOW.md` — scene production pipeline

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, invoke the `skill` tool with `skill: "graphify"` before doing anything else.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
