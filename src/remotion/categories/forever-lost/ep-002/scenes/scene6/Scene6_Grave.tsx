import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Img,
  staticFile,
  interpolate,
  Easing,
  random,
} from "remotion";
import { Audio } from "@remotion/media";
import { TiktokCaptions } from "@/components/atoms/TiktokCaptions";
import { getPhraseFrames } from "@/lib/utils";
import {
  TRASCRIPT_DATA as transcriptData,
  VO_START_FRAME,
  SCENE_DURATION,
} from "./constants";

const ASSET = "assets/forever-lost/ep-002";

// --- Mote data computed ONCE at module level (not recreated every frame) ---
const MOTES = Array.from({ length: 25 }, (_, i) => ({
  delay: i * 20,
  x: 600 + random(`mote-x-${i}`) * 800,
  y: 300 + random(`mote-y-${i}`) * 500,
}));

// --- Floating Mote Component ---
const Mote: React.FC<{ delay: number; x: number; y: number }> = ({
  delay,
  x,
  y,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [delay, delay + 60], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const yOffset = Math.sin((frame - delay) * 0.02) * 30;
  const xOffset = Math.cos((frame - delay) * 0.015) * 20;

  return (
    <div
      style={{
        position: "absolute",
        left: x + xOffset,
        top: y + yOffset,
        width: 2,
        height: 2,
        borderRadius: "50%",
        backgroundColor: "var(--color-surfaceWhite)",
        opacity,
        filter: "blur(1px)",
        boxShadow: "0 0 4px var(--color-biolumTeal)",
      }}
    />
  );
};

export function Scene6_Grave() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- VISUAL TRIGGERS ---
  const frameUNESCO = getPhraseFrames({
    phrase: "unesco",
    transcriptData,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
    bufferFrames: 12,
  });

  const frameEcosystem = getPhraseFrames({
    phrase: "ecosystem",
    transcriptData,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
    bufferFrames: 12,
  });

  // --- ANIMATIONS ---

  // 1. Respectful Slow Zoom — scoped to actual scene duration
  const slowZoom = interpolate(frame, [0, SCENE_DURATION], [1, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. UNESCO Document Opacity — split into two separate interpolations
  //    so each segment gets its own easing properly applied.
  const docFadeIn = interpolate(
    frame,
    [frameUNESCO.from, frameUNESCO.from + 30],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    },
  );

  const docFadeOut = interpolate(
    frame,
    [frameEcosystem.from - 15, frameEcosystem.from + 45],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.quad),
    },
  );

  const docOpacity = frame < frameEcosystem.from - 15 ? docFadeIn : docFadeOut;

  // 3. Fade to solid black over the last 3 seconds
  const fadeToBlackStart = SCENE_DURATION - fps * 3;
  const fadeToBlackOpacity = interpolate(
    frame,
    [fadeToBlackStart, SCENE_DURATION],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // 4. Breathing Light Effect
  const lightPulse = Math.sin(frame * 0.03) * 0.05 + 0.95;

  // --- HIGHLIGHTED WORDS ---
  const highlightedWords = [
    "grave",
    "1,500",
    "underwater",
    "heritage",
    "ecosystem",
    "ruins",
  ];

  return (
    <AbsoluteFill className="bg-abyssBlack overflow-hidden">
      {/* ====== BACKGROUND: Porthole Light ====== */}
      <AbsoluteFill
        style={{
          transform: `scale(${slowZoom})`,
          transformOrigin: "50% 50%",
          opacity: lightPulse,
        }}
      >
        <Img
          src={staticFile(`${ASSET}/images/img_porthole_light.jpeg`)}
          className="h-full w-full object-cover"
        />
      </AbsoluteFill>

      {/* ====== ATMOSPHERE: Deep Vignette ====== */}
      {/* Reduced spread so it doesn't bleed into caption area at bottom */}
      <AbsoluteFill
        style={{
          boxShadow: "inset 0 0 160px 80px oklch(0.15 0.02 260)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      {/* ====== ATMOSPHERE: Floating Ocean Motes ====== */}
      <AbsoluteFill style={{ zIndex: 6 }}>
        {MOTES.map((m, i) => (
          <Mote key={i} delay={m.delay} x={m.x} y={m.y} />
        ))}
      </AbsoluteFill>

      {/* ====== OVERLAY: UNESCO Document & HUD Ring ====== */}
      <AbsoluteFill
        className="flex items-center justify-center"
        style={{ opacity: docOpacity, zIndex: 10 }}
      >
        {/* Slow spinning ghostly ring behind document */}
        <div
          style={{
            position: "absolute",
            width: "60%",
            aspectRatio: "1 / 1",
            border: "1px solid var(--color-oceanBlue)",
            borderRadius: "50%",
            opacity: 0.2,
            transform: `rotate(${frame * 0.2}deg)`,
            boxShadow: "0 0 40px var(--color-oceanBlue)",
          }}
        />

        <div className="w-[45%] shadow-2xl">
          <Img
            src={staticFile(`${ASSET}/images/img_legal_treaty.jpeg`)}
            className="h-auto w-full object-contain"
          />
        </div>
      </AbsoluteFill>

      {/* ====== AUDIO LAYERS ====== */}

      {/* BGM: Sparse piano */}
      <Audio
        src={staticFile(`${ASSET}/voices/bgm/bgm_scene6_piano.mp3`)}
        volume={0.2}
      />

      {/* SFX: Muffled underwater room tone */}
      <Audio
        src={staticFile(`${ASSET}/voices/sfx/sfx_underwater_ambience.wav`)}
        volume={0.4}
      />

      {/* SFX: Distant whale song */}
      <Sequence from={fps * 2}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_whale_song.wav`)}
          volume={0.3}
        />
      </Sequence>

      {/* SFX: Document rustle (synced with document appearance) */}
      <Sequence from={frameUNESCO.from}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_document_rustle.wav`)}
          volume={0.25}
        />
      </Sequence>

      {/* Voiceover */}
      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET}/voices/vo/vo_scene6.wav`)}
          volume={0.85}
        />
      </Sequence>

      {/* ====== CAPTIONS (TikTok Style) ====== */}
      <TiktokCaptions
        className="z-20"
        transcript={transcriptData}
        highlightedWords={highlightedWords}
        position="bottom-center"
        startFrame={VO_START_FRAME}
        switchCaptionsEveryMs={2500}
        showOverlay
      />

      {/* ====== FADE TO SOLID BLACK OVERLAY ====== */}
      <AbsoluteFill
        className="bg-abyssBlack"
        style={{ opacity: fadeToBlackOpacity, zIndex: 40 }}
      />
    </AbsoluteFill>
  );
}
