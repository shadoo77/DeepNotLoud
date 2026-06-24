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
└── ep004/
    ├── audio/landscape/
    │   ├── s01-cold-open.wav
    │   ├── s02-who-were-they.wav
    │   ├── s03-the-mountain.wav
    │   ├── s04-the-night.wav
    │   ├── s05-discovery.wav
    │   ├── s06-the-bodies.wav
    │   ├── s07-theories.wav
    │   ├── s08-verdict.wav
    │   ├── s09-still-wrong.wav
    │   └── s10-closer.wav
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

**🎙️ TTS Director Prompt:**
```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — Dyatlov Pass" · Scene 01 · COLD OPEN

## THE SCENE: Total darkness. Wind. Then a voice from far away.
The feeling of being handed a classified file you were never meant to read.

### DIRECTOR'S NOTES
Style: [whispers] on first two lines, then [serious] from "Russia reopened"
Pacing: Long natural breath after "nine people died" — the voice is discovering this too
Final line: slow, final, almost reverential

#### TRANSCRIPT
[whispers] Somewhere in the Ural Mountains... nine people died.
The Soviet government closed the investigation in two weeks.
Their official cause of death: an unknown compelling force.
[pause]
[serious] Russia reopened the case sixty years later.
They still couldn't explain it.
[slow] This is Dyatlov Pass.
```

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

**🎙️ TTS Director Prompt:**
```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — Dyatlov Pass" · Scene 02 · WHO WERE THEY

## THE SCENE: Photographs of young people. Happy faces before the mountain.
The voice is giving them dignity — these are not just statistics.

### DIRECTOR'S NOTES
Style: [serious] throughout — matter-of-fact but carrying weight
Pacing: Natural conversational pace, no dramatic pauses — this is setup, not payoff
Slight emphasis on "None of them should have died on this one"

#### TRANSCRIPT
It was February 1959.
Ten students and graduates from the Ural Polytechnic Institute had set off on a winter expedition to climb Otorten Mountain.
Their route would take them through a remote mountain pass in the northern Urals.
The group was led by 23-year-old Igor Dyatlov — a respected and experienced mountaineer.
Every member of that team had completed multiple expeditions before.
[serious] None of them should have died on this one.
```

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

**🎙️ TTS Director Prompt:**
```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — Dyatlov Pass" · Scene 03 · THE MOUNTAIN

## THE SCENE: The mountain reveals its name. The name is a warning.
Cold. Desolate. The kind of place that was always going to be dangerous.

### DIRECTOR'S NOTES
Style: The name "Kholat Syakhl" should land carefully, almost syllable by syllable
Pacing: [pause] after "Dead Mountain" — let the translation sink in
Final line: quiet, final — a door closing

#### TRANSCRIPT
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

**🎙️ TTS Director Prompt:**
```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — Dyatlov Pass" · Scene 04 · THE NIGHT

## THE SCENE: The discovery. The tent. The inexplicable.
Each new piece of evidence makes the situation more impossible, not less.

### DIRECTOR'S NOTES
Style: [serious] throughout, building tension — each revelation is delivered like a fact that cannot be explained
Pacing: Natural breath before "But it had been sliced open from the inside"
Short sentences like "Their food. Their skis. Their warm clothing." — deliver each flat and final
Final sentence: slow down slightly on "walked barefoot into the dark"

#### TRANSCRIPT
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
```

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

**🎙️ TTS Director Prompt:**
```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — Dyatlov Pass" · Scene 05 · THE DISCOVERY

## THE SCENE: Bodies being found, one by one. A map of death.
The investigation that couldn't answer its own questions.

### DIRECTOR'S NOTES
Style: [serious] — each body discovery is spoken with the weight of finality
Pacing: [pause] before "They weren't found until May" — let the timeline register
Final line is the pivot into horror — lean into it slightly

#### TRANSCRIPT
Following the footprints, rescuers found the first two bodies near a large cedar tree.
Three more were found scattered between the tree and the tent.
The remaining four were buried under four meters of compacted snow in a ravine nearby.
[pause]
They weren't found until May.
[serious] By then, the Soviet investigation had already begun — and already stalled.
Because what the autopsies revealed had no clean explanation.
```

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

**🎙️ TTS Director Prompt:**
```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — Dyatlov Pass" · Scene 06 · THE BODIES

## THE SCENE: The autopsy. The injuries that made no sense.
Clinical horror. The voice stays controlled — facts delivered without flinching.

### DIRECTOR'S NOTES
Style: [serious] — clinical, forensic, no editorializing
Pacing: [pause] before "And then there was Lyudmila Dubinina" — this is the pivot
"Not cut. Not torn by animals." — deliver each as its own flat sentence
Final word "missing" — [slow], quiet, almost nothing

#### TRANSCRIPT
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
Not cut. Not torn by animals.
[slow] Simply... missing.
```

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

**🎙️ TTS Director Prompt:**
```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — Dyatlov Pass" · Scene 07 · THE THEORIES

## THE SCENE: A wall of theories. Each one credible. Each one incomplete.
The frustration of a case that resists every attempt at explanation.

### DIRECTOR'S NOTES
Style: [serious] — analytical, slightly faster pace than previous scenes
Pacing: Natural breath before each new theory — they are separate ideas
Final two lines: [slow] — deliberate, the point of the entire episode

#### TRANSCRIPT
Over sixty-five years, investigators and researchers have proposed dozens of theories.
[serious] The most credible: a katabatic wind event that triggered a slab avalanche — causing sudden compression injuries and forcing a panicked evacuation.
But critics note: no avalanche debris was found on the tent. No snow disturbed around it.
[pause]
Others suggest military involvement — secret weapons testing in the region. Infrasound devices capable of triggering mass panic and disorientation.
Some cite paradoxical undressing — a known symptom of late-stage hypothermia where victims feel burning hot and tear off their clothing.
[pause]
[slow] Each theory explains some of the evidence.
None explains all of it.
```

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
  - Points: `["Most accepted by Russian authorities", "Explains compression injuries", "Does NOT explain: no snow on tent, no debris"]`
- **Card 2** — delay: frame 390
  - Number: `"02"` · Color: `#6b1a6b`
  - Title: `"Military Weapons Testing / Infrasound"`
  - Points: `["Closed military zone nearby", "Explains panic behavior", "Does NOT explain: physical injuries, radiation"]`
- **Card 3** — delay: frame 720
  - Number: `"03"` · Color: `#1a6b2d`
  - Title: `"Paradoxical Undressing + Hypothermia"`
  - Points: `["Documented medical phenomenon", "Explains clothing removal", "Does NOT explain: skull fractures, missing tissue"]`
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

**🎙️ TTS Director Prompt:**
```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — Dyatlov Pass" · Scene 08 · THE OFFICIAL VERDICT

## THE SCENE: A government announcement. An official file being stamped closed.
The weight of bureaucracy attempting to end a story that isn't over.

### DIRECTOR'S NOTES
Style: Slightly detached — reporting what the government said, not endorsing it
Pacing: [pause] before "A small slab avalanche" — letting the verdict be heard fully
Final line: flat and final, like a stamp on paper

#### TRANSCRIPT
In 2019, Russian prosecutors formally reopened the Dyatlov Pass investigation.
Two years later, they announced their conclusion:
[pause]
A small slab avalanche had struck the tent while the group slept.
Disoriented and frost-damaged, they fled in the wrong direction.
The internal injuries, they said, were caused by the weight of the snow.
[serious] The case was officially closed.
```

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
And the missing soft tissue on Dubinina's body has never been satisfactorily explained by any snow or weather model.
The Dyatlov Foundation — formed by relatives of the victims — officially disputes the government's findings.
In their view, the case is far from closed.
```

**📊 Timing check:**
- ~76 words ÷ 2.3 = ~33 sec · padded to 37 sec (1110 frames)

---

**🎙️ TTS Director Prompt:**
```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — Dyatlov Pass" · Scene 09 · WHY IT'S STILL WRONG

## THE SCENE: The rebuttals. The families who refuse to let it be closed.
Quiet resistance against an official verdict that doesn't add up.

### DIRECTOR'S NOTES
Style: Measured, factual — this is not anger, it's evidence
Pacing: [pause] before "The Dyatlov Foundation" — humanizing the opposition
Final line: [slow] and final — this is the thesis of the episode

#### TRANSCRIPT
But most independent researchers reject this conclusion.
Snow scientists found no evidence of avalanche debris in the original photographs.
The victims' body positions suggest controlled movement — not blind panic.
[pause]
And the missing soft tissue on Dubinina's body has never been satisfactorily explained by any snow or weather model.
[serious] The Dyatlov Foundation — formed by relatives of the victims — officially disputes the government's findings.
[slow] In their view, the case is far from closed.
```

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

**🎙️ TTS Director Prompt:**
```
# AUDIO PROFILE: Documentary Narrator
## "FOREVER LOST — Dyatlov Pass" · Scene 10 · CLOSER

## THE SCENE: The last photograph. The last light. Then nothing.
The quietest moment in the video — we are staring into the dark.

### DIRECTOR'S NOTES
Style: [slow] from "Nine people entered this mountain" to end
Pacing: Generous natural breath before final sentence — the weight of it deserves space
[whispers] on final line — almost nothing, like the mountain itself speaking

#### TRANSCRIPT
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

## ⚙️ REMOTION CODE

### `src/ep004-landscape/constants.ts`

```typescript
// ─── EP004 DYATLOV PASS — LANDSCAPE ─────────────────────────────────────────
// ⚠️  UPDATE durationSec after WAV generation: duration = ceil(wav_sec) + 2

export const FPS = 30;

export const SCENE_DURATIONS_SEC = {
  S01: 25,  // Cold Open
  S02: 35,  // Who Were They
  S03: 30,  // The Mountain
  S04: 45,  // The Night
  S05: 40,  // Discovery
  S06: 55,  // The Bodies
  S07: 55,  // Theories
  S08: 35,  // Official Verdict
  S09: 37,  // Why Wrong
  S10: 30,  // Closer
  OUTRO: 10,
} as const;

const toFrames = (sec: number) => Math.ceil(sec * FPS);

export const SCENES = (() => {
  const keys = Object.keys(SCENE_DURATIONS_SEC) as Array<keyof typeof SCENE_DURATIONS_SEC>;
  let cursor = 0;
  const result = {} as Record<keyof typeof SCENE_DURATIONS_SEC, { start: number; duration: number; end: number }>;
  for (const key of keys) {
    const dur = toFrames(SCENE_DURATIONS_SEC[key]);
    result[key] = { start: cursor, duration: dur, end: cursor + dur };
    cursor += dur;
  }
  return result;
})();

export const TOTAL_FRAMES = Object.values(SCENES).reduce((sum, s) => Math.max(sum, s.end), 0);
// Expected: ~11,910 frames = 6:37

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

### `src/ep004-landscape/Root.tsx`

```typescript
import React from 'react';
import { Composition } from 'remotion';
import { DyatlovLandscapeMain } from './Main';
import { TOTAL_FRAMES, FPS } from './constants';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="DyatlovPassLandscape"
    component={DyatlovLandscapeMain}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={1920}
    height={1080}
    defaultProps={{}}
  />
);
```

---

### `src/ep004-landscape/Main.tsx`

```typescript
import React from 'react';
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import { SCENES } from './constants';
import { S01_ColdOpen } from './scenes/S01_ColdOpen';
import { S02_WhoWereThey } from './scenes/S02_WhoWereThey';
import { S03_TheMountain } from './scenes/S03_TheMountain';
import { S04_TheNight } from './scenes/S04_TheNight';
import { S05_Discovery } from './scenes/S05_Discovery';
import { S06_TheBodies } from './scenes/S06_TheBodies';
import { S07_Theories } from './scenes/S07_Theories';
import { S08_OfficialVerdict } from './scenes/S08_OfficialVerdict';
import { S09_StillWrong } from './scenes/S09_StillWrong';
import { S10_Closer } from './scenes/S10_Closer';
import { Outro } from './scenes/Outro';

export const DyatlovLandscapeMain: React.FC = () => (
  <AbsoluteFill style={{ background: '#08080f' }}>

    {/* ─── BGM Cues ─── */}
    <Sequence from={SCENES.S01.start} durationInFrames={SCENES.S03.end - SCENES.S01.start}>
      <Audio src={staticFile('ep004/bgm/ep004-l-bgm-intro.mp3')} volume={0.15} />
    </Sequence>
    <Sequence from={SCENES.S04.start} durationInFrames={SCENES.S08.end - SCENES.S04.start}>
      <Audio src={staticFile('ep004/bgm/ep004-l-bgm-tension.mp3')} volume={0.15} />
    </Sequence>
    <Sequence from={SCENES.S09.start} durationInFrames={SCENES.OUTRO.end - SCENES.S09.start}>
      <Audio src={staticFile('ep004/bgm/ep004-l-bgm-closer.mp3')} volume={0.12} />
    </Sequence>

    {/* ─── Scenes ─── */}
    <Sequence from={SCENES.S01.start} durationInFrames={SCENES.S01.duration}><S01_ColdOpen /></Sequence>
    <Sequence from={SCENES.S02.start} durationInFrames={SCENES.S02.duration}><S02_WhoWereThey /></Sequence>
    <Sequence from={SCENES.S03.start} durationInFrames={SCENES.S03.duration}><S03_TheMountain /></Sequence>
    <Sequence from={SCENES.S04.start} durationInFrames={SCENES.S04.duration}><S04_TheNight /></Sequence>
    <Sequence from={SCENES.S05.start} durationInFrames={SCENES.S05.duration}><S05_Discovery /></Sequence>
    <Sequence from={SCENES.S06.start} durationInFrames={SCENES.S06.duration}><S06_TheBodies /></Sequence>
    <Sequence from={SCENES.S07.start} durationInFrames={SCENES.S07.duration}><S07_Theories /></Sequence>
    <Sequence from={SCENES.S08.start} durationInFrames={SCENES.S08.duration}><S08_OfficialVerdict /></Sequence>
    <Sequence from={SCENES.S09.start} durationInFrames={SCENES.S09.duration}><S09_StillWrong /></Sequence>
    <Sequence from={SCENES.S10.start} durationInFrames={SCENES.S10.duration}><S10_Closer /></Sequence>
    <Sequence from={SCENES.OUTRO.start} durationInFrames={SCENES.OUTRO.duration}><Outro /></Sequence>
  </AbsoluteFill>
);
```

---

### `src/ep004-landscape/components/AnimatedLowerThird.tsx`

```typescript
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { FONTS } from '../constants';

interface Props {
  title: string;
  subtitle?: string;
  accentColor?: string;
  delayFrames?: number;
  holdFrames?: number;
}

export const AnimatedLowerThird: React.FC<Props> = ({
  title,
  subtitle,
  accentColor = '#c17f24',
  delayFrames = 0,
  holdFrames = 120,
}) => {
  const frame = useCurrentFrame();
  const lf = frame - delayFrames;
  if (lf < 0) return null;

  const slideX = interpolate(lf, [0, 22], [-420, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const exitOpacity = interpolate(lf, [holdFrames - 18, holdFrames], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const barH = interpolate(lf, [0, 18], [0, subtitle ? 72 : 50], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{
      position: 'absolute', bottom: 80, left: 0,
      transform: `translateX(${slideX}px)`,
      opacity: exitOpacity,
      display: 'flex', alignItems: 'stretch',
    }}>
      {/* Accent bar */}
      <div style={{ width: 5, background: accentColor, height: barH, alignSelf: 'center' }} />
      {/* Content box */}
      <div style={{
        background: 'rgba(6, 8, 18, 0.88)',
        borderBottom: `1px solid rgba(232,240,245,0.12)`,
        paddingLeft: 18, paddingRight: 32,
        paddingTop: 10, paddingBottom: 10,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <div style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: 22, color: '#ffffff', letterSpacing: 1 }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontFamily: FONTS.body, fontSize: 14, color: accentColor, marginTop: 3, letterSpacing: 1 }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};
```

---

### `src/ep004-landscape/components/FactBanner.tsx`

```typescript
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { FONTS, PALETTE } from '../constants';

interface Props {
  text: string;
  side?: 'left' | 'right';
  accentColor?: string;
  delayFrames?: number;
  holdFrames?: number;
  verticalPosition?: string; // CSS top value e.g. '30%'
}

export const FactBanner: React.FC<Props> = ({
  text,
  side = 'right',
  accentColor = PALETTE.cold,
  delayFrames = 0,
  holdFrames = 150,
  verticalPosition = '35%',
}) => {
  const frame = useCurrentFrame();
  const lf = frame - delayFrames;
  if (lf < 0) return null;

  const dist = side === 'right' ? 500 : -500;
  const x = interpolate(lf, [0, 28], [dist, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.exp),
  });
  const exitOpacity = interpolate(lf, [holdFrames - 18, holdFrames], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const entryOpacity = interpolate(lf, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{
      position: 'absolute',
      [side]: 0,
      top: verticalPosition,
      transform: `translateX(${x}px)`,
      opacity: Math.min(entryOpacity, exitOpacity),
      background: 'rgba(6, 8, 18, 0.90)',
      borderLeft: side === 'right' ? `4px solid ${accentColor}` : 'none',
      borderRight: side === 'left' ? `4px solid ${accentColor}` : 'none',
      padding: '14px 28px 14px 20px',
      maxWidth: 520,
    }}>
      <p style={{
        fontFamily: FONTS.body, fontSize: 18,
        color: PALETTE.text, margin: 0, lineHeight: 1.5,
        fontWeight: 500,
      }}>
        {text}
      </p>
    </div>
  );
};
```

---

### `src/ep004-landscape/components/StatCounter.tsx`

```typescript
import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { FONTS, PALETTE } from '../constants';

interface Props {
  from?: number;
  to: number;
  unit?: string;
  label: string;
  delayFrames?: number;
  countDuration?: number;
  color?: string;
  size?: number;
}

export const StatCounter: React.FC<Props> = ({
  from = 0,
  to,
  unit = '',
  label,
  delayFrames = 0,
  countDuration = 60,
  color = PALETTE.text,
  size = 120,
}) => {
  const frame = useCurrentFrame();
  const lf = frame - delayFrames;
  if (lf < 0) return null;

  const count = Math.round(interpolate(lf, [0, countDuration], [from, to], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));
  const opacity = interpolate(lf, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{ opacity, textAlign: 'center' }}>
      <div style={{
        fontFamily: FONTS.display,
        fontSize: size,
        color,
        lineHeight: 1,
        letterSpacing: -2,
      }}>
        {count.toLocaleString()}{unit}
      </div>
      <div style={{
        fontFamily: FONTS.body,
        fontSize: 14,
        color: PALETTE.muted,
        letterSpacing: 4,
        textTransform: 'uppercase',
        marginTop: 8,
      }}>
        {label}
      </div>
    </div>
  );
};
```

---

### `src/ep004-landscape/components/CaseFileStamp.tsx`

```typescript
import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { FONTS } from '../constants';

type StampType = 'CLASSIFIED' | 'CASE REOPENED' | 'OFFICIALLY CLOSED' | 'UNEXPLAINED' | 'INVESTIGATION STALLED';

const STAMP_COLORS: Record<StampType, string> = {
  'CLASSIFIED': '#8b1a1a',
  'CASE REOPENED': '#1a4b8b',
  'OFFICIALLY CLOSED': '#1a5c1a',
  'UNEXPLAINED': '#5c1a1a',
  'INVESTIGATION STALLED': '#5c4a1a',
};

interface Props {
  type: StampType;
  delayFrames?: number;
  holdFrames?: number;
  x?: string;
  y?: string;
}

export const CaseFileStamp: React.FC<Props> = ({
  type,
  delayFrames = 0,
  holdFrames = 180,
  x = '50%',
  y = '42%',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lf = frame - delayFrames;
  if (lf < 0) return null;

  const scale = spring({ frame: lf, fps, config: { damping: 7, stiffness: 260 } });
  const exitOpacity = interpolate(lf, [holdFrames - 18, holdFrames], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const entryOpacity = interpolate(lf, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const color = STAMP_COLORS[type];

  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      transform: `translate(-50%, -50%) scale(${scale}) rotate(-8deg)`,
      opacity: Math.min(entryOpacity, exitOpacity),
      border: `3px solid ${color}`,
      padding: '8px 24px',
      pointerEvents: 'none',
    }}>
      <div style={{
        fontFamily: FONTS.display,
        fontSize: 38,
        color,
        letterSpacing: 8,
        whiteSpace: 'nowrap',
      }}>
        {type}
      </div>
    </div>
  );
};
```

---

### `src/ep004-landscape/components/TheoryCard.tsx`

```typescript
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { FONTS, PALETTE } from '../constants';

interface Props {
  number: string;
  title: string;
  points: string[];
  accentColor?: string;
  delayFrames?: number;
  holdFrames?: number;
  top?: string;
}

export const TheoryCard: React.FC<Props> = ({
  number,
  title,
  points,
  accentColor = PALETTE.cold,
  delayFrames = 0,
  holdFrames = 300,
  top = '15%',
}) => {
  const frame = useCurrentFrame();
  const lf = frame - delayFrames;
  if (lf < 0) return null;

  const x = interpolate(lf, [0, 32], [1000, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.exp),
  });
  const exitOpacity = interpolate(lf, [holdFrames - 24, holdFrames], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const entryOpacity = interpolate(lf, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{
      position: 'absolute',
      right: 60, top,
      transform: `translateX(${x}px)`,
      opacity: Math.min(entryOpacity, exitOpacity),
      background: 'rgba(6, 8, 18, 0.92)',
      borderLeft: `6px solid ${accentColor}`,
      padding: '18px 28px',
      width: 520,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10 }}>
        <span style={{ fontFamily: FONTS.display, fontSize: 52, color: accentColor, lineHeight: 1 }}>
          {number}
        </span>
        <span style={{ fontFamily: FONTS.body, fontSize: 20, fontWeight: 700, color: PALETTE.text, lineHeight: 1.2 }}>
          {title}
        </span>
      </div>
      {points.map((p, i) => (
        <div key={i} style={{
          fontFamily: FONTS.body, fontSize: 15,
          color: PALETTE.muted, marginBottom: 6,
          paddingLeft: 14,
          borderLeft: `2px solid rgba(232,240,245,0.18)`,
          lineHeight: 1.4,
        }}>
          {p}
        </div>
      ))}
    </div>
  );
};
```

---

### `src/ep004-landscape/scenes/S01_ColdOpen.tsx`

```typescript
import React from 'react';
import { AbsoluteFill, Audio, staticFile, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { AnimatedLowerThird } from '../components/AnimatedLowerThird';
import { CaseFileStamp } from '../components/CaseFileStamp';
import { PALETTE, FONTS } from '../constants';

export const S01_ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bgScale = interpolate(frame, [0, durationInFrames], [1.0, 1.08], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Title reveal at frame 480
  const titleOpacity = interpolate(frame, [480, 530], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [480, 530], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill>
      <Audio src={staticFile('ep004/audio/landscape/s01-cold-open.wav')} />
      <Audio src={staticFile('ep004/sfx/wind-arctic.mp3')} volume={0.10} />

      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <img
          src={staticFile('ep004/images/ep004-l-s01-title-bg.jpg')}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: bgOpacity, transform: `scale(${bgScale})` }}
        />
      </div>
      <AbsoluteFill style={{ background: PALETTE.overlay }} />

      {/* Classified stamp */}
      <CaseFileStamp type="CLASSIFIED" delayFrames={90} holdFrames={200} x="75%" y="25%" />

      {/* Title */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 12 }}>
        <div style={{
          opacity: titleOpacity, transform: `translateY(${titleY}px)`, textAlign: 'center',
        }}>
          <div style={{ fontFamily: FONTS.display, fontSize: 88, color: PALETTE.text, letterSpacing: 6, lineHeight: 1 }}>
            DYATLOV PASS
          </div>
          <div style={{ fontFamily: FONTS.body, fontSize: 18, color: PALETTE.muted, letterSpacing: 8, marginTop: 12, textTransform: 'uppercase' }}>
            The Deaths Still Officially Unexplained
          </div>
        </div>
      </AbsoluteFill>

      {/* Lower third */}
      <AnimatedLowerThird
        title="FEBRUARY 1–2, 1959 · URAL MOUNTAINS, USSR"
        subtitle="Nine hikers · All deceased · No official explanation"
        accentColor={PALETTE.accent}
        delayFrames={520}
        holdFrames={220}
      />

      {/* Fade from black */}
      <AbsoluteFill style={{ background: `rgba(0,0,0,${interpolate(frame, [0, 30], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})` }} />
    </AbsoluteFill>
  );
};
```

---

### `src/ep004-landscape/scenes/S07_Theories.tsx`

```typescript
import React from 'react';
import { AbsoluteFill, Audio, staticFile, interpolate, useCurrentFrame } from 'remotion';
import { TheoryCard } from '../components/TheoryCard';
import { PALETTE, FONTS } from '../constants';

export const S07_Theories: React.FC = () => {
  const frame = useCurrentFrame();

  const finalLineOpacity = interpolate(frame, [1350, 1420], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Audio src={staticFile('ep004/audio/landscape/s07-theories.wav')} />
      <Audio src={staticFile('ep004/sfx/low-rumble.mp3')} volume={0.08} />

      <img
        src={staticFile('ep004/images/ep004-l-s07-theories-bg.jpg')}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <AbsoluteFill style={{ background: 'rgba(0,0,0,0.75)' }} />

      {/* Left side: section header */}
      <div style={{ position: 'absolute', left: 60, top: 60 }}>
        <div style={{ fontFamily: FONTS.display, fontSize: 18, color: PALETTE.muted, letterSpacing: 8 }}>
          THE THEORIES — 65 YEARS OF INVESTIGATION
        </div>
        <div style={{ width: 180, height: 2, background: PALETTE.accent, marginTop: 10 }} />
      </div>

      {/* Theory Cards */}
      <TheoryCard
        number="01" title="Katabatic Wind + Slab Avalanche"
        points={[
          'Most accepted by Russian authorities (2021)',
          'Explains compression injuries from snow weight',
          '✕ No debris on tent — no disturbed snow around camp',
        ]}
        accentColor="#1a6b8b"
        delayFrames={60} holdFrames={900}
        top="15%"
      />
      <TheoryCard
        number="02" title="Military Testing / Infrasound"
        points={[
          'Closed military test zone nearby in 1959',
          'Infrasound can cause panic, disorientation, paranoia',
          '✕ No physical mechanism for injuries explained',
        ]}
        accentColor="#6b1a6b"
        delayFrames={390} holdFrames={900}
        top="42%"
      />
      <TheoryCard
        number="03" title="Paradoxical Undressing / Hypothermia"
        points={[
          'Documented medical phenomenon — victims feel overheated',
          'Explains removal of clothing in cold conditions',
          '✕ Does not explain skull fractures or missing tissue',
        ]}
        accentColor="#1a6b2d"
        delayFrames={720} holdFrames={900}
        top="68%"
      />

      {/* Final statement */}
      <div style={{
        position: 'absolute', bottom: 80, left: 60, right: 60,
        opacity: finalLineOpacity, textAlign: 'center',
      }}>
        <div style={{
          fontFamily: FONTS.display, fontSize: 42, color: PALETTE.text,
          letterSpacing: 4, borderTop: `1px solid ${PALETTE.muted}`, paddingTop: 20,
        }}>
          NONE EXPLAINS ALL OF IT
        </div>
      </div>
    </AbsoluteFill>
  );
};
```

> **Note:** All other scene components (`S02` through `S10`) follow the same pattern — `AbsoluteFill` + background image + overlay + `Audio` + component library calls using the `delayFrames` offsets specified in each scene's Motion Graphics section above.

---

## 🔄 TIMING UPDATE WORKFLOW

```
1. Generate all 10 WAV files via TTS API
2. For each WAV: measure duration_seconds
3. Open constants.ts → update SCENE_DURATIONS_SEC
   → rule: duration = ceil(wav_seconds) + 2  (2 sec buffer)
4. Verify: TOTAL_FRAMES stays between 10,800–14,400 (6–8 min)
5. Adjust motion graphic delayFrames in each scene if needed
   → rule: first banner = frame 60, each subsequent = +240–300
6. Preview: npx remotion preview
7. Spot-check key frames: npx remotion still DyatlovPassLandscape --frame=750 --scale=0.5
```

---

## 🔧 RENDER COMMAND

```bash
npx remotion render DyatlovPassLandscape out/ep004-dyatlov-landscape.mp4 \
  --codec=h264 \
  --crf=18 \
  --fps=30 \
  --log=verbose
```

> For YouTube: CRF 18 gives excellent quality at manageable file size.
> Add `--audio-codec=mp3` if using Lambda to speed up the combine stage.
