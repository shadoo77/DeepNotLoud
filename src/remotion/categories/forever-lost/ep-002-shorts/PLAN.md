# Forever Lost Ep 2 — YouTube Shorts Cut

## Goal
Condense the 7-scene, ~6-minute landscape episode into a punchy 60–90s vertical (1080×1920) Short with 3 rapid-fire Acts.

## Structure

```
ep-002-shorts/
├── ForeverLostShorts.tsx       # Master composition at 1080×1920
├── acts/
│   ├── Act1_ImpossibleDepth.tsx
│   ├── Act2_ConsumingOcean.tsx
│   └── Act3_TheGrave.tsx
├── constants.ts
└── PLAN.md
```

Registered in `Root.tsx` as `ForeverLostEp2-Shorts` at 1080×1920.

## Act 1 — The Impossible Depth (0:00–0:18)

**Source scenes**: 0 (Cold Open) + 1 (Scale)

**Visuals**: Rivet zoom-out → depth ruler stacking → Burj/Eiffel tower stack → 380 ATM badge

**VO** (~17s):
> "There it sits. 3.8 kilometers down. That's stacking the Burj Khalifa on top of itself four times. At this depth, the water pressure is 380 atmospheres—385 kilograms crushing every single square centimeter."

**Assets reused**: `img_deep_ocean_dark.jpeg`, depth/scale wireframe, Burj/Eiffel SVGs, `380 ATM` badge. All reframed via `object-cover` centered upper-third.

---

## Act 2 — The Consuming Ocean (0:18–0:45)

**Source scenes**: 2 (Pressure) + 3 (Rusticle)

**Visuals**: FEA stress heat-map → rusticle macro zoom → bacteria timelapse → dissolution timeline sweep (1912→2030)

**VO** (~27s):
> "The hull isn't solid anymore. Bacteria called Halomonas titanicae are literally eating it alive, forming fragile rusticles. It loses 100 kilograms of iron every single day. By 2030, it will have largely collapsed. If you tried to lift it, the structure would simply... disintegrate."

**Assets reused**: `img_stress_analysis.jpeg`, `img_rusticle_macro.png`, `img_bacteria_timelapse.png`, `DissolutionTimeline` component. Crack lines + rusticle particles.

---

## Act 3 — The Grave (0:45–1:15)

**Source scenes**: 4 (Weight) + 5 (Structure) + 6 (Legal) + 7 (Outro)

**Visuals**: 52,000 TONS count-up + punch zoom → ship split + shatter → "A DEBRIS FIELD" → fade to porthole motes → `@DeepNotLoud` title card

**VO** (~30s):
> "Even if you could lift 52,000 tons—which you can't—the ship broke in half. It would shatter into a debris field. But it doesn't matter. It's a grave for 1,500 people, and an ecosystem. We don't have the right to destroy one world to reclaim the ruins of another. It's returning to the earth... Forever lost."

**Assets reused**: `img_weight_scale.png`, `img_barge_lift_attempt.png`, `img_ship_breaking.jpeg`, `img_porthole_light.jpeg`, `img_legal_treaty.jpeg`, `CountUp` component, `GlitchText` component, `Mote` particles, title card animation.

---

## VO Generation

3 new WAV files using Gemini 3.1 TTS Preview.
- `vo_act1.wav`
- `vo_act2.wav`
- `vo_act3.wav`

Each → transcript via `generate-captions.ts` → merge fix → timing constants.

## Timeline

| Act | Frames (30fps) | Real time |
|-----|----------------|-----------|
| Act 1 | 540 | 18s |
| Act 2 | 810 | 27s |
| Act 3 | 900 | 30s |
| Transitions (2 × 15f) | 30 | 1s |
| Black hold | 15 | 0.5s |
| **Total** | **~2295** | **~76.5s** |

## Aspect Ratio Strategy

Existing assets are landscape (1920×1080). All `<Img>` elements use `object-cover` which naturally crops the sides for portrait. Text overlays remain centered. A subtle dark vignette (`inset box-shadow`) masks the cropped edges.

## Implementation Order

1. Create `ep-002-shorts/` folder + constants
2. Generate 3 VO WAVs → transcripts → merge fix
3. Build Act 1 (cold open + scale) → transitions at 0s/18s
4. Build Act 2 (pressure + rusticle) → transitions at 18s/45s
5. Build Act 3 (weight + structure + grave + outro) → transitions at 45s/75s
6. Wire up `ForeverLostShorts.tsx` with `TransitionSeries`
7. Register in `Root.tsx`
