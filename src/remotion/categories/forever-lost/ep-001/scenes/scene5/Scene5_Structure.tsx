import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  staticFile,
  interpolate,
  spring,
  Img,
} from "remotion";
import { Audio } from "@remotion/media";
import { TiktokCaptions } from "@/components/atoms/TiktokCaptions";
import { GlitchText } from "@/components/atoms/GlitchText";
import { getPhraseFrames } from "@/lib/utils";
import { TRASCRIPT_DATA as transcriptData, VO_START_FRAME } from "./constants";

const ASSET = "assets/forever-lost/ep-001";

export function Scene5_Structure() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gpf = (phrase: string) =>
    getPhraseFrames({ phrase, transcriptData, fps, voiceOverStartFrame: VO_START_FRAME }).from;

  const frameBrokeHalf = gpf("broke in half");
  const frameShatter = gpf("shatter");
  const frameDebris = gpf("a debris field");

  // --- ANIMATIONS ---

  // 1. The Break Split (Activated on "shatter")
  // Separates the image into left (bow) and right (stern) and pulls them apart
  const breakSpring = spring({
    frame: Math.max(0, frame - frameShatter),
    fps,
    config: { damping: 20, stiffness: 80, mass: 1.5 },
  });

  const bowTranslateX = interpolate(breakSpring, [0, 1], [0, -150]);
  const sternTranslateX = interpolate(breakSpring, [0, 1], [0, 150]);
  const midGap = interpolate(breakSpring, [0, 1], [0, 80]); // Black gap in the middle

  // 2. Stress Heatmap Pulse (Before the break)
  const stressPulse = Math.sin(frame * 0.3) * 0.2 + 0.6; // Pulses between 0.4 and 0.8 opacity

  // 3. BGM Volume (Massive hit, then DEAD SILENCE for 2 seconds after shatter)
  const hasDebrisKeyframe = frameDebris > frameShatter + fps * 2;
  const bgmVolume = interpolate(
    frame,
    hasDebrisKeyframe
      ? [
          0,
          frameShatter - 5,
          frameShatter,
          frameShatter + 5,
          frameShatter + fps * 2 - 10,
          frameDebris - 15,
          frameDebris,
        ]
      : [0, frameShatter - 5, frameShatter, frameShatter + 5],
    hasDebrisKeyframe ? [0.4, 0.8, 1.0, 0, 0, 0, 0.15] : [0.4, 0.8, 1.0, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // --- HIGHLIGHTED WORDS ---
  const highlightedWords = [
    "broke",
    "half",
    "compromised",
    "shatter",
    "crumble",
    "debris",
  ];

  return (
    <AbsoluteFill className="bg-abyssBlack overflow-hidden">
      {/* ====== LAYER 1: STRESS ANALYSIS WIREFRAME ====== */}
      <AbsoluteFill
        style={{
          opacity:
            frame < frameShatter
              ? 1
              : interpolate(frame, [frameShatter, frameShatter + 15], [1, 0], {
                  extrapolateRight: "clamp",
                }),
        }}
      >
        <Img
          src={staticFile(`${ASSET}/images/img_stress_analysis.jpeg`)}
          className="h-full w-full object-cover"
        />
        {/* Pulsing Heatmap Overlay */}
        <AbsoluteFill
          className="bg-rustOrange mix-blend-overlay"
          style={{ opacity: frame >= frameBrokeHalf ? stressPulse : 0 }}
        />
      </AbsoluteFill>

      {/* ====== LAYER 2: THE BREAKING SHIP (Split in half) ====== */}
      {frame >= frameShatter && (
        <>
          {/* LEFT SIDE (BOW) - Clips right half of the image */}
          <AbsoluteFill
            style={{
              clipPath: "inset(0 50% 0 0)",
              transform: `translateX(${bowTranslateX}px)`,
            }}
          >
            <Img
              src={staticFile(`${ASSET}/images/img_ship_breaking.jpeg`)}
              className="h-full w-full object-cover"
            />
          </AbsoluteFill>

          {/* RIGHT SIDE (STERN) - Clips left half of the image */}
          <AbsoluteFill
            style={{
              clipPath: "inset(0 0 0 50%)",
              transform: `translateX(${sternTranslateX}px)`,
            }}
          >
            <Img
              src={staticFile(`${ASSET}/images/img_ship_breaking.jpeg`)}
              className="h-full w-full object-cover"
            />
          </AbsoluteFill>

          {/* THE VOID (Black gap in the middle representing the break) */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              width: `${midGap}px`,
              transform: "translateX(-50%)",
              backgroundColor: "var(--color-abyssBlack)",
              boxShadow: `0 0 60px 20px var(--color-abyssBlack)`, // Blurs the edges into the gap
            }}
          />
        </>
      )}

      {/* ====== TEXT SHOCK: "SHATTER" GLITCH ====== */}
      <Sequence from={frameShatter} durationInFrames={fps * 2}>
        <AbsoluteFill className="bg-abyssBlack/70 z-30 flex items-center justify-center backdrop-blur-sm">
          <GlitchText
            text="SHATTER"
            triggerFrame={frameShatter}
            className="font-inter text-[10rem] leading-none font-extrabold tracking-tighter"
            color="var(--color-rustOrange)"
          />
        </AbsoluteFill>
      </Sequence>

      {/* ====== TEXT SHOCK: "DEBRIS FIELD" FINAL WHISPER ====== */}
      <Sequence from={frameDebris} durationInFrames={fps * 3}>
        <AbsoluteFill className="bg-abyssBlack/90 z-30 flex items-center justify-center backdrop-blur-lg">
          <h1
            className="font-inter text-steelGrey text-7xl font-extrabold tracking-tight"
            style={{
              transform: `scale(${spring({
                frame: frame - frameDebris,
                fps,
                config: { damping: 20, stiffness: 100 },
              })})`,
              textShadow: "0 0 30px var(--color-oceanBlue)",
            }}
          >
            A DEBRIS FIELD
          </h1>
        </AbsoluteFill>
      </Sequence>

      {/* ====== AUDIO LAYERS ====== */}

      {/* BGM: Climax -> Sudden Silence -> Quiet Drone */}
      <Audio
        src={staticFile(`${ASSET}/voices/bgm/bgm_scene5_climax.mp3`)}
        volume={bgmVolume}
      />

      {/* SFX: Catastrophic break synced with "shatter" */}
      <Sequence from={frameShatter}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_metal_break.wav`)}
          volume={0.8}
        />
      </Sequence>

      {/* SFX: Underwater implosion boom (delayed slightly to rattle after the snap) */}
      <Sequence from={frameShatter + 10}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_implosion.wav`)}
          volume={0.6}
        />
      </Sequence>

      {/* Voiceover */}
      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET}/voices/vo/vo_scene5.wav`)}
          volume={0.85}
        />
      </Sequence>

      {/* ====== CAPTIONS ====== */}
      <TiktokCaptions
        transcript={transcriptData.filter(
          (w) => !w.text.toLowerCase().includes("shatter"),
        )} // Filter out "shatter" so the Glitch component handles it
        highlightedWords={highlightedWords}
        position="bottom-center"
        startFrame={VO_START_FRAME}
      />
    </AbsoluteFill>
  );
}
