# 🎬 FOREVER LOST — EP004 | LANDSCAPE 16:9
## *Dyatlov Pass — The Deaths Still Officially Unexplained*
### LANDSCAPE PRODUCTION FILE · YouTube

---

## 📋 EPISODE METADATA

| Field | Value |
|---|---|
| Episode | 04 |
| Format | Landscape · 1920 × 1080 |
| FPS | 30 |
| Target Duration | **6:00 – 6:30** |
| Estimated Duration | **~6:37** (11,910 frames) |
| Voice | **Charon** |
| Total VO Words | ~773 words across 10 scenes |

---

## 🎵 AUDIO OVERVIEW

### Voice
- **Voice:** Charon · Deep, measured documentary narrator
- **Pace estimate:** ~2.3 words/second
- **TTS tags used:** `[pause]`, `[slow]`, `[serious]`, `[whispers]`

### VO — 3-Act Combined System
This episode uses **1 combined VO per act** (3 WAVs total) instead of 1 per scene. This gives consistent pacing across scenes in each act while still allowing per-scene transcript/caption sync.

| Act | Scenes | Content Arc | Words | Est. Length | File |
|---|---|---|---|---|---|
| **Act 1 (Setup)** | S01–S03 | Cold open → who they were → the mountain | ~180 | ~78s | `ep004_L_act1_setup.wav` |
| **Act 2 (Horror)** | S04–S08 | The night → discovery → bodies → theories → verdict | ~361 | ~157s | `ep004_L_act2_horror.wav` |
| **Act 3 (Resolution)** | S09–S10 | Why it's still wrong → closer | ~134 | ~58s | `ep004_L_act3_resolution.wav` |

### BGM — 3 Cue System
| Cue | Scenes | Mood | YouTube Audio Library Search |
|---|---|---|---|
| `bgm-intro.mp3` | S01–S03 | Cold, eerie, sparse piano + drone | `"cold documentary intro"` · `"arctic tension minimal"` |
| `bgm-tension.mp3` | S04–S08 | Building dread, subtle percussion | `"dark thriller tension buildup"` · `"mystery underscore"` |
| `bgm-closer.mp3` | S09–S10 + Outro | Quiet, reflective, sparse | `"sad ambient reflection"` · `"melancholic piano drone"` |

> **Crossfade rule:** 2-second crossfade between cues · All at –20 dB under VO · –3 dB duck when VO is speaking

### SFX Master List
| File | Scene | Moment | Level |
|---|---|---|---|
| `wind-arctic.mp3` | S01, S03, S04 | Scene start, under VO | –18 dB |
| `snow-crunch.mp3` | S04 | "Footprints" beat | –14 dB |
| `heartbeat-slow.mp3` | S06 | "The body positions" | –22 dB |
| `radio-static.mp3` | S08 | "Official verdict" stamp moment | –15 dB |
| `paper-rustle.mp3` | S08, S09 | Document transitions | –18 dB |
| `camera-shutter.mp3` | S10 | "Last photograph" | –10 dB |
| `low-rumble.mp3` | S07 | Theory card reveals | –20 dB |

---

## 📁 PUBLIC FOLDER STRUCTURE

```
public/
└── assets/
    └── forever-lost/
        └── ep-004/
            ├── audio/
            │   ├── vo/
            │   │   ├── ep004_L_act1_setup.wav         ← S01-S03 combined
            │   │   ├── ep004_L_act2_horror.wav        ← S04-S08 combined
            │   │   └── ep004_L_act3_resolution.wav    ← S09-S10 combined
            │   └── vo/short/
            │       └── ep004_S_full.wav              ← Shorts: all scenes combined
            ├── images/
            │   ├── ep004-l-s01-title-bg.jpg        ← dark mountain aerial
            │   ├── ep004-l-s02-hikers-1959.jpg     ← group silhouette winter
            │   ├── ep004-l-s03-dead-mountain.jpg   ← Kholat Syakhl slope
            │   ├── ep004-l-s04-tent-wide.jpg       ← abandoned tent on slope
            │   ├── ep004-l-s05-cedar-tree.jpg      ← lone cedar tree winter
            │   ├── ep004-l-s06-ravine.jpg          ← dark ravine in snow
            │   ├── ep004-l-s07-theories-bg.jpg     ← abstract dark bg for cards
            │   ├── ep004-l-s08-document.jpg        ← Soviet document texture
            │   ├── ep004-l-s09-mountain-mist.jpg   ← misty Ural landscape
            │   └── ep004-l-s10-treeline-night.jpg  ← dark pine treeline
            ├── sfx/
            │   ├── wind-arctic.mp3
            │   ├── snow-crunch.mp3
            │   ├── heartbeat-slow.mp3
            │   ├── radio-static.mp3
            │   ├── paper-rustle.mp3
            │   ├── camera-shutter.mp3
            │   └── low-rumble.mp3
            └── bgm/
                ├── ep004-l-bgm-intro.mp3
                ├── ep004-l-bgm-tension.mp3
                └── ep004-l-bgm-closer.mp3
```

---

## 🎨 MOTION GRAPHICS SYSTEM

### Component Library Overview
All reusable banner components live in `src/ep004-landscape/components/`.
Each accepts `delayFrames` so it can be triggered independently within a scene.

| Component | Style | Usage |
|---|---|---|
| `AnimatedLowerThird` | News-style bar slides from left | Names, locations, dates |
| `FactBanner` | Floating panel slides from right | Key evidence points |
| `StatCounter` | Large counting number | Body counts, distances, temperatures |
| `CaseFileStamp` | Rotating stamp drops in | CLASSIFIED · CASE REOPENED · OFFICIALLY CLOSED |
| `TheoryCard` | Panel slides from right | Theory name + bullet points |
| `TitleReveal` | Letter-by-letter or clip reveal | Scene titles |
| `TimelineMarker` | Bottom bar with date pin | Chronology beats |

---

## 🎬 SCENE BREAKDOWN

---

### SCENE 01 — COLD OPEN
> **Duration target:** 25 sec · **Words:** ~50 · **Est. WAV:** ~22 sec

**Voiceover (clean):**
```
Somewhere in the Ural Mountains... nine people died.
The Soviet government closed the investigation in two weeks.
Their official cause of death: an unknown compelling force.
Russia reopened the case sixty years later.
They still couldn't explain it.
This is Dyatlov Pass.
```

**📊 Timing check:**
- ~50 words ÷ 2.3 = ~21.7 sec · padded to 25 sec (750 frames)

---

**🖼️ Image Prompts — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|
| 1 | Full-frame bg | `Aerial cinematic view of desolate Ural Mountains in deep winter, dark overcast sky, pale cold light, vast snowfields, no human presence, photorealistic 4K, Russian wilderness, cold documentary atmosphere --ar 16:9 --style raw` |

---

**🎨 Motion Graphics — Scene 01:**
- `CaseFileStamp` type `"CLASSIFIED"` · delay: frame 90 · auto-removes at frame 200
- Title card: `"DYATLOV PASS"` — `TitleReveal` clip animation, frame 480–570
- `"FEB 1959 · URAL MOUNTAINS, USSR"` — `AnimatedLowerThird` · delay: frame 520
- Full scene: slow zoom-in on bg image (scale 1.0 → 1.08 over 750 frames)
- Fade from black: frames 0–30

---

### SCENE 02 — WHO WERE THEY
> **Duration target:** 35 sec · **Words:** ~72 · **Est. WAV:** ~31 sec

**Voiceover (clean):**
```
It was February 1959.
Ten students and graduates from the Ural Polytechnic Institute had set off on a winter expedition to climb Otorten Mountain.
Their route would take them through a remote mountain pass in the northern Urals.
The group was led by 23-year-old Igor Dyatlov — a respected and experienced mountaineer.
Every member of that team had completed multiple expeditions before.
None of them should have died on this one.
```

**📊 Timing check:**
- ~72 words ÷ 2.3 = ~31 sec · padded to 35 sec (1050 frames)

---

**🖼️ Image Prompts — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|
| 1 | Background | `Vintage Soviet-era photograph aesthetic, group of young university students in winter hiking gear, smiling, mountain setting, grainy film, warm-cold contrast, 1950s photographic style --ar 16:9 --style raw` |

---

**🎨 Motion Graphics — Scene 02:**
- `AnimatedLowerThird` · title: `"IGOR DYATLOV"` · subtitle: `"Expedition Leader, Age 23"` · delay: frame 180
- `AnimatedLowerThird` · title: `"URAL POLYTECHNIC INSTITUTE"` · subtitle: `"Sverdlovsk, Soviet Russia"` · delay: frame 400
- `StatCounter` from 0 to 10 · label: `"EXPEDITION MEMBERS"` · delay: frame 80 · count over 45 frames
- `FactBanner` · text: `"All held Grade II hiking certification"` · delay: frame 600
- Subtle image: slow parallax left-to-right pan

---

### SCENE 03 — THE MOUNTAIN
> **Duration target:** 30 sec · **Words:** ~58 · **Est. WAV:** ~25 sec

**Voiceover (clean):**
```
The pass they were crossing had a name in the language of the local Mansi people.
Kholat Syakhl.
Dead Mountain.
On the evening of February 1st, the group pitched their tent on its eastern slope.
That night the temperature dropped to minus thirty Celsius.
That was the last night any of them were seen alive.
```

**📊 Timing check:**
- ~58 words ÷ 2.3 = ~25 sec · padded to 30 sec (900 frames)

---

**🖼️ Image Prompts — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|
| 1 | BG | `Dramatic wide shot of Kholat Syakhl mountain (Dead Mountain) in Ural Mountains, winter, harsh cold light from low angle, grey-blue sky, desolate, no vegetation on upper slopes, cinematic 4K --ar 16:9 --style raw` |
| 2 | Map overlay (cutout) | `Minimalist topographic map section showing northern Ural Mountains, Soviet cartography style, lines and elevation marks, red dot marker for pass location, aged paper color, transparent background --ar 16:9` |

---

**🎨 Motion Graphics — Scene 03:**
- `TitleReveal` · `"KHOLAT SYAKHL"` in Cyrillic-style lettering · delay: frame 90 · hold 90 frames
- Subtitle below: `"— DEAD MOUNTAIN"` · fades in after title · delay: frame 180
- `AnimatedLowerThird` · `"Ural Mountains, Northern Russia"` · `"Elevation: 1,079m"` · delay: frame 300
- Map overlay appears top-right corner · animated pin drop onto pass location · delay: frame 400
- `StatCounter` showing `−30` then `°C` · label: `"TEMPERATURE, FEB 1–2, 1959"` · delay: frame 600
- Wind SFX starts at frame 0

---

### SCENE 04 — THE NIGHT OF FEBRUARY 1–2
> **Duration target:** 45 sec · **Words:** ~95 · **Est. WAV:** ~41 sec

**Voiceover (clean):**
```
Search teams were sent when the group failed to return on schedule.
They found the abandoned camp on February 26th — three weeks after the group went silent.
The tent was still standing on the slope.
But it had been sliced open from the inside.
All footprints led downhill — toward the treeline, one and a half kilometers away.
The hikers had abandoned everything.
Their food. Their skis. Their warm clothing.
In temperatures that would kill an unprotected adult within hours, they walked barefoot into the dark.
```

**📊 Timing check:**
- ~95 words ÷ 2.3 = ~41 sec · padded to 45 sec (1350 frames)

---

**🖼️ Image Prompts — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|
| 1 | BG | `A canvas tent standing on a desolate snow-covered mountain slope, cut open and flapping in harsh wind, cold moonlight, no people, cinematic horror atmosphere, ultra-realistic, Ural Mountains USSR --ar 16:9 --style raw` |

---

**🎨 Motion Graphics — Scene 04:**
- `AnimatedLowerThird` · `"February 26, 1959"` · `"Discovery — 21 Days After Silence"` · delay: frame 60 · accent color: amber
- `FactBanner` · `"Tent cut open from the INSIDE"` · delay: frame 280 · color: danger red border
- `FactBanner` · `"Footprints: 1.5 km toward treeline"` · delay: frame 500 · slide from left this time
- `FactBanner` · `"Temperature: −30°C · No boots · No coats"` · delay: frame 780 · color: cold blue border
- Snow crunch SFX at frame 500
- Slow parallax zoom on bg image throughout

---

### SCENE 05 — THE DISCOVERY
> **Duration target:** 40 sec · **Words:** ~79 · **Est. WAV:** ~34 sec

**Voiceover (clean):**
```
Following the footprints, rescuers found the first two bodies near a large cedar tree.
Three more were found scattered between the tree and the tent.
The remaining four were buried under four meters of compacted snow in a ravine nearby.
They weren't found until May.
By then, the Soviet investigation had already begun — and already stalled.
Because what the autopsies revealed had no clean explanation.
```

**📊 Timing check:**
- ~79 words ÷ 2.3 = ~34 sec · padded to 40 sec (1200 frames)

---

**🖼️ Image Prompts — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|
| 1 | BG | `Lone large cedar tree in deep snow, Ural Mountains winter, dark atmospheric, cold light filtering through clouds, no people, haunting and desolate, ultra-realistic 4K --ar 16:9 --style raw` |
| 2 | Overlay (map cutout) | `Simple illustrated map showing discovery locations of 9 bodies in Ural Mountains pass, minimalist investigative diagram style, white lines on dark background, numbered position markers, transparent bg --ar 16:9` |

---

**🎨 Motion Graphics — Scene 05:**
- `AnimatedLowerThird` · `"CEDAR TREE"` · `"2 Bodies Found — ~1.5 km from tent"` · delay: frame 90
- Map overlay fades in top-right · numbered dots appear one by one (each dot: 45-frame interval)
- `StatCounter` · 0 → 5 · label: `"BODIES FOUND — FEBRUARY"` · delay: frame 200
- `StatCounter` · 5 → 9 · label: `"TOTAL RECOVERED — MAY"` · delay: frame 600 (same position, transitions)
- `CaseFileStamp` · `"INVESTIGATION STALLED"` · color: cold blue · delay: frame 900

---

### SCENE 06 — WHAT THE BODIES REVEALED
> **Duration target:** 55 sec · **Words:** ~112 · **Est. WAV:** ~49 sec

**Voiceover (clean):**
```
Five of the nine had died of hypothermia. That, at least, made sense.
But the remaining four told a different story.
Two had fractured ribs. One had a shattered skull.
The force required to cause these injuries — without leaving any external wounds — was comparable, according to investigators, to a high-speed vehicle impact.
Not a fall. Not a fight.
Something had compressed them.
And then there was Lyudmila Dubinina.
She was found in the ravine, in a kneeling position.
Her tongue, her eyes, and parts of her lips were gone.
Not cut. Not torn by animals.
Simply... missing.
```

**📊 Timing check:**
- ~112 words ÷ 2.3 = ~49 sec · padded to 55 sec (1650 frames)

---

**🖼️ Image Prompts — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|
| 1 | BG (dark) | `Dark snow-filled ravine at night, Ural Mountains, deep shadows, cold blue moonlight barely visible, empty and oppressive, ultra-cinematic, extremely high contrast --ar 16:9 --style raw` |

---

**🎨 Motion Graphics — Scene 06:**
- Heartbeat SFX at frame 0 · low and slow
- `AnimatedLowerThird` · `"CAUSE OF DEATH: HYPOTHERMIA"` · delay: frame 0 · green accent
- `AnimatedLowerThird` · `"CAUSE OF DEATH: UNKNOWN FORCE"` · delay: frame 180 · red accent · replaces first
- `FactBanner` · `"Rib fractures = force of 60 mph vehicle impact"` · delay: frame 320
- `FactBanner` · `"No external wounds — none"` · delay: frame 480 · danger color
- `CaseFileStamp` · `"UNEXPLAINED"` · color: danger red · delay: frame 750
- `FactBanner` · `"Dubinina: tongue, eyes, lips — missing"` · delay: frame 950 · slow fade in (no slide)
- Bg image gets progressively darker overlay (0.55 → 0.80) over the scene

---

### SCENE 07 — THE THEORIES
> **Duration target:** 55 sec · **Words:** ~110 · **Est. WAV:** ~48 sec

**Voiceover (clean):**
```
Over sixty-five years, investigators and researchers have proposed dozens of theories.
The most credible: a katabatic wind event that triggered a slab avalanche — causing sudden compression injuries and forcing a panicked evacuation.
But critics note: no avalanche debris was found on the tent. No snow disturbed around it.
Others suggest military involvement — secret weapons testing in the region. Infrasound devices capable of triggering mass panic and disorientation.
Some cite paradoxical undressing — a known symptom of late-stage hypothermia where victims feel burning hot and tear off their clothing.
Each theory explains some of the evidence.
None explains all of it.
```

**📊 Timing check:**
- ~110 words ÷ 2.3 = ~48 sec · padded to 55 sec (1650 frames)

---

**🖼️ Image Prompts — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|
| 1 | BG (neutral, dark) | `Abstract dark background with faint texture, deep cold blue-black gradient, subtle snow particle bokeh, investigation board aesthetic, clean and cinematic --ar 16:9 --style raw` |

---

**🎨 Motion Graphics — Scene 07:**
Three `TheoryCard` components appear sequentially:
- **Card 1** — delay: frame 60
  - Number: `"01"` · Color: `#1a6b8b`
  - Title: `"Katabatic Wind + Slab Avalanche"`
  - Points: `["Most accepted by Russian authorities (2021)", "Explains compression injuries from snow weight", "✕ No debris on tent — no disturbed snow around camp"]`
- **Card 2** — delay: frame 390
  - Number: `"02"` · Color: `#6b1a6b`
  - Title: `"Military Testing / Infrasound"`
  - Points: `["Closed military test zone nearby in 1959", "Infrasound can cause panic, disorientation, paranoia", "✕ No physical mechanism for injuries explained"]`
- **Card 3** — delay: frame 720
  - Number: `"03"` · Color: `#1a6b2d`
  - Title: `"Paradoxical Undressing + Hypothermia"`
  - Points: `["Documented medical phenomenon — victims feel overheated", "Explains removal of clothing in cold conditions", "✕ Does not explain skull fractures or missing tissue"]`
- Low rumble SFX at each card entry
- Final 2 lines: cards fade out, text `"NONE EXPLAINS ALL OF IT"` appears centered, large, cold white

---

### SCENE 08 — THE OFFICIAL VERDICT
> **Duration target:** 35 sec · **Words:** ~63 · **Est. WAV:** ~27 sec

**Voiceover (clean):**
```
In 2019, Russian prosecutors formally reopened the Dyatlov Pass investigation.
Two years later, they announced their conclusion:
A small slab avalanche had struck the tent while the group slept.
Disoriented and frost-damaged, they fled in the wrong direction.
The internal injuries, they said, were caused by the weight of the snow.
The case was officially closed.
```

**📊 Timing check:**
- ~63 words ÷ 2.3 = ~27 sec · padded to 35 sec (1050 frames)

---

**🖼️ Image Prompts — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|
| 1 | BG | `Aged Soviet government document on dark table, official stamps and Cyrillic text visible, harsh desk lighting, investigative atmosphere, photorealistic --ar 16:9 --style raw` |

---

**🎨 Motion Graphics — Scene 08:**
- Radio static SFX brief burst at frame 0
- Paper rustle SFX at frame 90
- `AnimatedLowerThird` · `"OFFICIAL VERDICT — 2021"` · `"Russian Prosecutor General's Office"` · delay: frame 60 · accent: cold blue
- `CaseFileStamp` · `"OFFICIALLY CLOSED"` · color: `#1a5c1a` (green) · delay: frame 420 · spring animation
- `FactBanner` · `"Conclusion: Slab avalanche"` · delay: frame 240
- The bg image zooms very slowly out (scale 1.08 → 1.0) — the document "revealing" itself

---

### SCENE 09 — WHY IT'S STILL WRONG
> **Duration target:** 37 sec · **Words:** ~76 · **Est. WAV:** ~33 sec

**Voiceover (clean):**
```
But most independent researchers reject this conclusion.
Snow scientists found no evidence of avalanche debris in the original photographs.
The victims' body positions suggest controlled movement — not blind panic.
And the missing soft tissue on Dubinina's body has never been satisfactorily explained by any snow or炭 model.
The Dyatlov Foundation — formed by relatives of the victims — officially disputes the government's findings.
In their view, the case is far from closed.
```

**📊 Timing check:**
- ~76 words ÷ 2.3 = ~33 sec · padded to 37 sec (1110 frames)

---

**🖼️ Image Prompts — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|
| 1 | BG | `Misty Ural Mountains landscape at dawn, cold blue-grey tones, soft atmospheric haze, quiet and unresolved feeling, contemplative, 4K cinematic --ar 16:9 --style raw` |

---

**🎨 Motion Graphics — Scene 09:**
- `CaseFileStamp` · `"CASE REOPENED"` · color: `#1a4b8b` (blue) · delay: frame 0 · fades out by frame 150
- `FactBanner` · `"No avalanche debris found in original photos"` · delay: frame 90 · left side
- `FactBanner` · `"Body positions: deliberate, not panicked"` · delay: frame 320 · right side
- `AnimatedLowerThird` · `"DYATLOV FOUNDATION"` · `"Family-led organization, est. 2018 — disputes all official conclusions"` · delay: frame 680
- Paper rustle SFX at frame 680

---

### SCENE 10 — THE CLOSER
> **Duration target:** 30 sec · **Words:** ~58 · **Est. WAV:** ~25 sec

**Voiceover (clean):**
```
The group's cameras were recovered from the snow.
Thirty-four photographs survived.
The last image taken that night shows the campsite in daylight — quiet, ordinary, undisturbed.
Whatever came for them, came after dark.
Nine people entered this mountain.
None of them walked out.
And whatever reason they had for running... died with them in the snow.
```

**📊 Timing check:**
- ~58 words ÷ 2.3 = ~25 sec · padded to 30 sec (900 frames)

---

**🖼️ Image Prompts — Nano Banana 2:**

| # | Usage | Prompt |
|---|---|---|
| 1 | BG | `Dark pine treeline at night in Ural Mountains, cold, still, utterly silent, faint moonlight, cinematic, extremely dark atmosphere, sense of deep unease --ar 16:9 --style raw` |
| 2 | Overlay (film frame) | `Vintage 35mm film photograph borders and grain overlay, slightly overexposed edges, aged and damaged, transparent center, film negative aesthetic, transparent background --ar 16:9` |

---

**🎨 Motion Graphics — Scene 10:**
- Camera shutter SFX at frame 90
- Brief white flash at shutter (opacity 0.5 over 6 frames)
- `StatCounter` · 0 → 34 · label: `"PHOTOGRAPHS RECOVERED"` · delay: frame 60
- Film frame overlay appears at frame 90, slight flicker
- `StatCounter` · 10 → 9 · label: `"SURVIVORS"` · delay: frame 380 · color: danger red
- Fade to black: starts frame 750, complete by frame 900
- BGM cue switches to `bgm-closer.mp3` at start of this scene (crossfade from S09)

---

### OUTRO — 10 sec (300 frames)
- No voiceover
- Black screen
- Channel logo + `"FOREVER LOST"` title fade in
- Subscribe animation
- Next episode teaser card (optional)

---

## 🎙️ TTS DIRECTOR PROMPTS — 3-ACT SYSTEM

> Each combined prompt includes `[pause] 2s` markers between scenes within the act.
> Generate one WAV per act, then split the resulting transcript by scene boundaries.

---

### ACT 1 — SETUP (S01 + S02 + S03)

**Approximate length:** ~80 sec · **Words:** ~180

```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — Dyatlov Pass" · Act 01 · SETUP
## Scenes 01–03 (Cold Open → Who Were They → The Mountain)

### DIRECTOR'S NOTES
Act 1 evolves through three emotional phases:
1. S01: [whispers] — we are discovering the case with the voice
2. S02: [serious] — matter-of-fact dignity for the victims
3. S03: Careful, almost reverential — the mountain's name is a warning

Pacing: Scene transitions must feel natural but distinct. After S02, there's a moment — like turning a page. After S03, the silence persists.

#### SCENE 01 — COLD OPEN
[whispers] Somewhere in the Ural Mountains... nine people died.
The Soviet government closed the investigation in two weeks.
Their official cause of death: an unknown compelling force.
[pause]
[serious] Russia reopened the case sixty years later.
They still couldn't explain it.
[slow] This is Dyatlov Pass.

[pause 2s]

#### SCENE 02 — WHO WERE THEY
It was February 1959.
Ten students and graduates from the Ural Polytechnic Institute had set off on a winter expedition to climb Otorten Mountain.
Their route would take them through a remote mountain pass in the northern Urals.
The group was led by 23-year-old Igor Dyatlov — a respected and experienced mountaineer.
Every member of that team had completed multiple expeditions before.
[serious] None of them should have died on this one.

[pause 2s]

#### SCENE 03 — THE MOUNTAIN
The pass they were crossing had a name in the language of the local Mansi people.
Kholat Syakhl.
[pause]
Dead Mountain.
[pause]
On the evening of February 1st, the group pitched their tent on its eastern slope.
That night — the temperature dropped to minus thirty Celsius.
[slow] That was the last night any of them were seen alive.
```

---

### ACT 2 — HORROR (S04 + S05 + S06 + S07 + S08)

**Approximate length:** ~165 sec · **Words:** ~361

```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — Dyatlov Pass" · Act 02 · HORROR
## Scenes 04–08 (The Night → Discovery → Bodies → Theories → Verdict)

### DIRECTOR'S NOTES
Act 2 is a five-scene descent into the inexplicable.
Each scene adds a new layer of impossibility.
S04 builds dread. S05 finds the bodies. S06 reveals the clinical horror.
S07 presents the theories — each one failing. S08 drops the official stamp.

Pacing: Starts tense, escalates toward S06, then shifts to analytical in S07, and detachment in S08.

#### SCENE 04 — THE NIGHT
Search teams were sent when the group failed to return on schedule.
They found the abandoned camp on February 26th — three weeks after the group went silent.
[pause]
The tent was still standing on the slope.
[serious] But it had been sliced open from the inside.
[pause]
All footprints led downhill — toward the treeline, one and a half kilometers away.
The hikers had abandoned everything.
Their food. Their skis. Their warm clothing.
[slow] In temperatures that would kill an unprotected adult within hours, they walked barefoot into the dark.

[pause 2s]

#### SCENE 05 — THE DISCOVERY
Following the footprints, rescuers found the first two bodies near a large cedar tree.
Three more were found scattered between the tree and the tent.
The remaining four were buried under four meters of compacted snow in a ravine nearby.
[pause]
They weren't found until May.
[serious] By then, the Soviet investigation had already begun — and already stalled.
Because what the autopsies revealed had no clean explanation.

[pause 2s]

#### SCENE 06 — WHAT THE BODIES REVEALED
Five of the nine had died of hypothermia. That, at least, made sense.
[serious] But the remaining four told a different story.
Two had fractured ribs. One had a shattered skull.
[pause]
The force required to cause these injuries — without leaving any external wounds — was comparable, according to investigators, to a high-speed vehicle impact.
Not a fall. Not a fight.
Something had compressed them.
[pause]
And then there was Lyudmila Dubinina.
She was found in the ravine, in a kneeling position.
Her tongue, her eyes, and parts of her lips were gone.
Not cut意见的. Not torn by animals.
[slow] Simply... missing.

[pause 2s]

#### SCENE 07 — THE THEORIES
Over sixty-five years, investigators and researchers have proposed dozens of theories.
[serious] The most credible: a katabatic wind event that triggered a slab avalanche — causing sudden compression injuries and forcing a panicked evacuation.
But critics note: no avalanche debris was found on the tent. No snow disturbed around it.
[pause]
Others suggest military involvement — secret weapons testing in the region. Infrasound devices capable of triggering mass panic and disorientation.
Some cite paradoxical undressing — a known symptom of late-stage hypothermia where victims feel burning hot and tear off their clothing.
[pause]
[slow] Each theory explains some of the evidence.
None explains all of it.

[pause 2s]

#### SCENE 08 — THE OFFICIAL VERDICT
In 2019, Russian prosecutors formally reopened the Dyatlov Pass investigation.
Two years later, they announced their conclusion:
[pause]
A small slab avalanche had struck the tent while the group slept.
Disoriented and frost-damaged, they fled in the wrong direction.
The internal injuries, they said, were caused by the weight of the snow.
[serious] The case was officially closed.
```

---

### ACT 3 — RESOLUTION (S09 + S10)

**Approximate length:** ~60 sec · **Words:** ~134

```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — Dyatlov Pass" · Act 03 · RESOLUTION
## Scenes 09–10 (Why It's Still Wrong → Closer)

### DIRECTOR'S NOTES
Act 3 is a quiet rejection, then a door closing on darkness.
S09: the evidence against the official verdict — measured, not angry, but final.
S10: a meditation on what photographic evidence cannot capture — the last light, then nothing.

Pacing: S09 natural, conversational. S10 slows and becomes almost whispered.

#### SCENE 09 — WHY IT'S STILL WRONG
But most independent researchers reject this conclusion.
Snow scientists found no evidence of avalanche debris in the original photographs.
The victims' body positions suggest controlled movement — not blind panic.
[pause]
And the missing soft tissue on Dubinina's body has never been satisfactorily explained by any snow or weather model.
[serious] The Dyatlov Foundation — formed by relatives of the victims — officially disputes the government's findings.
[slow] In their view, the case is far from closed.

[pause 2s]

#### SCENE 10 — THE CLOSER
The group's cameras were recovered from the snow.
Thirty-four photographs survived.
The last image taken that night shows the campsite in daylight — quiet, ordinary, undisturbed.
[pause]
Whatever came for them, came after dark.
[slow] Nine people entered this mountain.
None of them walked out.
[whispers] And whatever reason they had for running... died with them in the snow.
```

---

## ⚙️ REMOTION — VO-OFFSETS CONFIGURATION

### `src/ep004-landscape/vo-offsets.ts`

> ⚠️ **UPDATE after WAV generation** — these are описания. Use the actual scene boundary times from the act WAV to set precise `startFromSec` values.

```typescript
// ─── EP004 DYATLOV PASS — VO OFFSETS ────────────────────────────────────────
// Maps each scene to its act WAV and the offset (seconds) where its VO starts.
// ⚠️ UPDATE these values after generating the act WAVs — use ffprobe or a DAW
//    to find the exact MS each scene begins within the combined act WAV.

export const VO = {
  act1: "assets/forever-lost/ep-004/audio/vo/ep004_L_act1_setup.wav",
  act2: "assets/forever-lost/ep-004/audio/vo/ep004_L_act2_horror.wav",
  act3: "assets/forever-lost/ep-004/audio/vo/ep004_L_act3_resolution.wav",
} as const;

// ⚠️ ESTIMATED values below — update after WAV generation
// Format: scene key → { WAV path, start offset in seconds }
export const VO_OFFSETS: Record<
  string,
  { src: string; startFromSec: number; estimatedSceneEndSec: number }
> = {
  // ─── ACT 1 ──────────────────────
  S01: {
    src: VO.act1,
    startFromSec: 0,
    estimatedSceneEndSec: 22, // S01 ends ~22s into act1
  },
  S02: {
    src: VO.act1,
    startFromSec: 24, // S02 starts ~24s into act1 (after 2s pause)
    estimatedSceneEndSec: 55,
  },
  S03: {
    src: VO.act1,
    startFromSec: 57, // S03 starts ~57s into act1 (after 2s pause)
    estimatedSceneEndSec: 78,
  },

  // ─── ACT 2 ──────────────────────
  S04: {
    src: VO.act2,
    startFromSec: 0,
    estimatedSceneEndSec: 41,
  },
  S05: {
    src: VO.act2,
    startFromSec: 43,
    estimatedSceneEndSec: 75,
  },
  S06: {
    src: VO.act2,
    startFromSec: 77,
    estimatedSceneEndSec: 124,
  },
  S07: {
    src: VO.act2,
    startFromSec: 126,
    estimatedSceneEndSec: 176,
  },
  S08: {
    src: VO.act2,
    startFromSec: 178,
    estimatedSceneEndSec: 207,
  },

  // ─── ACT 3 ──────────────────────
  S09: {
    src: VO.act3,
    startFromSec: 0,
    estimatedSceneEndSec: 33,
  },
  S10: {
    src: VO.act3,
    startFromSec: 35,
    estimatedSceneEndSec: 58,
  },
} as const;

// Helper: convert seconds to frames (30 fps)
export const secToFrames = (sec: number) => Math.round(sec * 30);
```

---

## ⚙️ REMOTION CODE — PER-SCENE AUDIO PATTERN

### Updated Scene Component — Example: `S01_ColdOpen.tsx`

```typescript
import React from 'react';
import { AbsoluteFill, Audio, staticFile, Sequence } from 'remotion';
import { VO_OFFSETS, secToFrames } from '../vo-offsets';
import { TRASCRIPT_DATA, VO_START_FRAME } from './constants';

const SCENE = "S01"; // Change per scene
const { src, startFromSec } = VO_OFFSETS[SCENE];
const startFromFrames = secToFrames(startFromSec);

export const S01_ColdOpen: React.FC = () => (
  <AbsoluteFill>
    {/* ─── Act 1 VO, jumping to S01's position ─── */}
    <Audio
      src={staticFile(src)}
      startFrom={startFromFrames}
      // Note: stopAt is optional — Remotion will mute audio when scene unmounts.
    />

    {/* ─── Scene-specific captions ─── */}
    <Sequence from={VO_START_FRAME}>
      <YouTubeCaptions
        transcript={TRASCRIPT_DATA}
        position="bottom-center"
        startFrame={0}
      />
    </Sequence>

    {/* ─── Background, Motion Graphics, SFX ─── */}
    {/* ... existing S01 content unchanged ... */}
  </AbsoluteFill>
);
```

> **Important:** `<Audio startFrom={frames} />` tells Remotion to start playing the act WAV at the specified frame count. The scene component still owns its own `TRASCRIPT_DATA` for per-scene captions.

---

## ⚙️ REMOTION CODE — EPISODE LEVEL

### `src/ep004-landscape/constants.ts`

> Same as before — each scene defines its own `SCENE_DURATION` in its `constants.ts`, and the episode-level file imports and aggregates them.

```typescript
// ─── EP004 DYATLOV PASS — LANDSCAPE ─────────────────────────────────────────
// ⚠️  UPDATE durationSec after WAV generation: duration = ceil(wav_sec) + 2

import { SCENE_DURATION as S1_DUR } from "./scenes/s01-cold-open/constants";
import { SCENE_DURATION as S2_DUR } from "./scenes/s02-who-were-they/constants";
import { SCENE_DURATION as S3_DUR } from "./scenes/s03-the-mountain/constants";
import { SCENE_DURATION as S4_DUR } from "./scenes/s04-the-night/constants";
import { SCENE_DURATION as S5_DUR } from "./scenes/s05-discovery/constants";
import { SCENE_DURATION as S6_DUR } from "./scenes/s06-the-bodies/constants";
import { SCENE_DURATION as S7_DUR } from "./scenes/s07-theories/constants";
import { SCENE_DURATION as S8_DUR } from "./scenes/s08-verdict/constants";
import { SCENE_DURATION as S9_DUR } from "./scenes/s09-still-wrong/constants";
import { SCENE_DURATION as S10_DUR } from "./scenes/s10-closer/constants";

export const FPS = 30;

export const SCENES = {
  s1:  { durationInFrames: S1_DUR },
  s2:  { durationInFrames: S2_DUR },
  s3:  { durationInFrames: S3_DUR },
  s4:  { durationInFrames: S4_DUR },
  s5:  { durationInFrames: S5_DUR },
  s6:  { durationInFrames: S6_DUR },
  s7:  { durationInFrames: S7_DUR },
  s8:  { durationInFrames: S8_DUR },
  s9:  { durationInFrames: S9_DUR },
  s10: { durationInFrames: S10_DUR },
} as const;

const NUM_SCENES = Object.keys(SCENES).length;

export const TOTAL_FRAMES =
  Object.values(SCENES).reduce((a, b) => a + b.durationInFrames, 0) -
  (NUM_SCENES - 1) * 20; // 20-frame fade between scenes

export const FPS = 30;

export const PALETTE = {
  bg: '#08080f',
  text: '#e8f0f5',
  accent: '#c17f24',
  danger: '#8b1a1a',
  cold: '#1a3d6b',
  official: '#1a5c1a',
  mystery: '#3d1a6b',
  muted: 'rgba(232,240,245,0.55)',
  overlay: 'rgba(0,0,0,0.62)',
};

export const FONTS = {
  display: '"Bebas Neue", sans-serif',
  body: '"Inter", sans-serif',
  mono: '"JetBrains Mono", monospace',
};
```

---

### `src/ep004-landscape/ForeverLostEp4.tsx` (Main)

```typescript
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { TransitionSeries } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { SCENES, T, TOTAL_FRAMES } from './constants';
import { BgmWithFade } from './BgmWithFade';
import { S01_ColdOpen } from './scenes/s01-cold-open';
import { S02_WhoWereThey } from './scenes/s02-who-were-they';
import { S03_TheMountain } from './scenes/riven otherwise is fine (the mountain);
import { S04_TheNight } from './scenes/s04-the-night';
import { S05_Discovery } from './scenes/s05-discovery';
import { S06_TheBodies } from './scenes/s06-the-bodies';
import { S07_Theories } from './scenes/s07-theories';
import { S08_Verdict } from './scenes/s08-verdict';
import { S09_StillWrong } from './scenes/s09-still-wrong';
import { S10_Closer } from './scenes/s10-closer';

export { TOTAL_FRAMES };

export const ForeverLostEp4 = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#08080f' }}>
      <BgmWithFade />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENES.s1.durationInFrames} premountFor={30}>
          <S01_ColdOpen />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T.fade })} />
        <TransitionSeries.Sequence durationInFrames={SCENES.s2.durationInFrames} premountFor={30}>
          <S02_WhoWereThey />
        </TransitionSeries.Sequence>
        {/* ... continues for all 10 scenes ... */}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
```

---

## 🔄 NEW WORKFLOW — TTS + TRANSCRIPT SPLIT

### Step 1 — Generate 3 Act WAVs
Use the combined TTS prompts above. Each prompt will produce one WAV file (act1, act2, act3).

### Step 2 — Run generate-captions.ts per Act
```bash
# Generate transcript for the full act WAV
npx tsx scripts/generate-captions.ts \
  "public/assets/forever-lost/ep-004/audio/vo/ep004_L_act1_setup.wav" \
  "src/remotion/categories/forever-lost/ep-004/scenes/transcript_act1_raw.json"

# Repeat for act2 and act3
npx tsx scripts/generate-captions.ts \
  "public/assets/forever-lost/ep-004/audio/vo/ep004_L_act2_horror.wav" \
  ".../transcript_act2_raw.json"

npx tsx scripts/generate-captions.ts \
  "public/assets/forever-lost/ep-004/audio/vo/ep004_L_act3_resolution.wav" \
  ".../transcript_act3_raw.json"
```

### Step 3 — Clean and Split Transcripts
1. Open each act's `transcript_actN_raw.json`
2. Clean: merge split words, fix punctuation per script, capitalize sentence starts, fix acronyms
3. Find where each scene begins within the act transcript (using the first words of each scene)
4. Split into per-scene arrays, **subtracting each scene's start offset** so its first `startMs` is ~0
5. Save as `transcript_s01.json`, `transcript_s02.json`, etc.

### Step 4 — Update per-scene constants.ts
Each scene imports its own `transcript_sN.json` into `TRASCRIPT_DATA` and exports `SCENE_DURATION`.

### Step 5 — Measure Actual Scene Boundaries
Use `ffprobe` or a DAW to find the exact second each scene begins in the act WAV. Update `vo-offsets.ts` with real `startFromSec` values.

---

## 🔧 RENDER COMMAND

```bash
npx remotion render ForeverLostEp4 out/ep004-dyatlov-landscape.mp4 \
  --codec=h264 \
  --crf=18 \
  --fps=30 \
  --log=verbose
```

> For YouTube: CRF 18 gives excellent quality at manageable file size.
> Add `--audio-codec=mp3` if using Lambda to speed up the combine stage.
