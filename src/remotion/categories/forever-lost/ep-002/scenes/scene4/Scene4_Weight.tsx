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
import { CountUp } from "@/components/atoms/CountUp";
import { TRASCRIPT_DATA as transcriptData, VO_START_FRAME } from "./constants";
import { getPhraseFrames } from "@/lib/utils";

const ASSET = "assets/forever-lost/ep-002";

export function Scene4_Weight() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ===== DYNAMIC PHRASE TIMINGS =====
  // These now calculate both the start frame AND the exact duration from the transcript

  const phrase52000 = getPhraseFrames({
    phrase: "52,000",
    transcriptData,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });

  const phrase5tons = getPhraseFrames({
    phrase: "five",
    transcriptData,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });

  const phraseNoCrane = getPhraseFrames({
    phrase: "no crane on earth",
    transcriptData,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
    bufferFrames: 12,
  });

  const phraseNearlyKilled = getPhraseFrames({
    phrase: "nearly killed the crew",
    transcriptData,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
    bufferFrames: 12,
  });

  const phrase10000x = getPhraseFrames({
    phrase: "10,000 times heavier",
    transcriptData,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
    bufferFrames: 15, // Let the final climax linger a bit longer
  });

  // ===== ANIMATION LOGIC =====
  const punchZoom = spring({
    frame: Math.max(0, frame - phrase52000.from),
    fps,
    config: { damping: 10, stiffness: 200, mass: 0.5 },
  });
  const dynamicScale = interpolate(punchZoom, [0, 1], [1, 1.05]);

  const shakeStartFrame = phrase52000.from;
  const isShaking = frame > shakeStartFrame;

  const shakeIntensity = isShaking
    ? Math.exp(-(frame - shakeStartFrame) * 0.3) * 10
    : 0;
  const shakeY = Math.sin((frame - shakeStartFrame) * 1.5) * shakeIntensity;

  const bargeOpacity = interpolate(
    frame,
    [phrase5tons.from, phrase5tons.from + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const highlightedWords = [
    "52,000",
    "tons",
    "crane",
    "nearly",
    "killed",
    "10,000",
  ];

  return (
    // ROOT: Applies the physical screen shake and punch zoom to everything
    <AbsoluteFill
      className="bg-abyssBlack overflow-hidden"
      style={{ transform: `translateY(${shakeY}px) scale(${dynamicScale})` }}
    >
      {/* ====== BACKGROUND LAYER 1: The Scale Image ====== */}
      <AbsoluteFill>
        <Img
          src={staticFile(`${ASSET}/images/img_weight_scale.jpeg`)}
          className="h-full w-full object-cover"
          style={{
            opacity: interpolate(bargeOpacity, [0, 1], [1, 0]), // Fades out when barge fades in
          }}
        />
      </AbsoluteFill>

      {/* ====== BACKGROUND LAYER 2: The Barge/Salvage Image ====== */}
      <AbsoluteFill style={{ opacity: bargeOpacity }}>
        <Img
          src={staticFile(`${ASSET}/images/img_barge_lift_attempt.jpeg`)}
          className="h-full w-full object-cover"
        />
      </AbsoluteFill>

      {/* ====== DYNAMIC COUNT OVERLAY ====== */}
      {frame >= phrase52000.from && (
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 text-center">
          <CountUp
            to={52000}
            durationInFrames={fps * 2}
            delay={phrase52000.from}
            className="text-ghostWhite font-mono text-8xl drop-shadow-[0_0_30px_var(--color-rustOrange)]"
            suffix=" TONS"
          />
        </div>
      )}

      {/* ====== TEXT SHOCKS (Driven by Transcript Durations) ====== */}

      {/* "NO CRANE ON EARTH" Flash */}
      <Sequence
        from={phraseNoCrane.from}
        durationInFrames={phraseNoCrane.duration}
      >
        <AbsoluteFill className="bg-abyssBlack/80 flex items-center justify-center backdrop-blur-sm">
          <h1
            className="font-inter text-surfaceWhite text-7xl font-extrabold tracking-tight"
            style={{
              transform: `scale(${spring({
                frame: frame - phraseNoCrane.from, // Anchor spring to sequence start
                fps,
                config: { damping: 10, stiffness: 200 },
              })})`,
              textShadow: "0 0 30px var(--color-surfaceWhite)",
            }}
          >
            NO CRANE ON EARTH
          </h1>
        </AbsoluteFill>
      </Sequence>

      {/* "NEARLY KILLED THE CREW" Red Flash (Over the Barge Image) */}
      <Sequence
        from={phraseNearlyKilled.from}
        durationInFrames={phraseNearlyKilled.duration}
      >
        <AbsoluteFill className="bg-abyssBlack/90 flex items-center justify-center backdrop-blur-md">
          <h1
            className="font-inter text-rustOrange text-8xl font-extrabold tracking-tight"
            style={{
              transform: `scale(${spring({
                frame: frame - phraseNearlyKilled.from, // Anchor spring to sequence start
                fps,
                config: { damping: 8, stiffness: 300 },
              })})`,
              textShadow: "0 0 40px var(--color-rustOrange)",
            }}
          >
            NEARLY KILLED THE CREW
          </h1>
        </AbsoluteFill>
      </Sequence>

      {/* "10,000x HEAVIER" Final Climax */}
      <Sequence
        from={phrase10000x.from}
        durationInFrames={phrase10000x.duration}
      >
        <AbsoluteFill className="bg-abyssBlack/95 flex flex-col items-center justify-center gap-4 backdrop-blur-lg">
          <h1
            className="text-rustOrange font-mono text-[12rem] leading-none font-extrabold tracking-tighter"
            style={{
              transform: `scale(${spring({
                frame: frame - phrase10000x.from, // Anchor spring to sequence start
                fps,
                config: { damping: 8, stiffness: 200 },
              })})`,
              textShadow: "0 0 80px var(--color-rustOrange)",
            }}
          >
            10,000x
          </h1>
          <p className="font-inter text-surfaceWhite text-5xl font-semibold tracking-wide uppercase opacity-80">
            Heavier
          </p>
        </AbsoluteFill>
      </Sequence>

      {/* ====== AUDIO LAYERS ====== */}

      {/* BGM: Tension strings */}
      <Audio
        src={staticFile(`${ASSET}/voices/bgm/bgm_scene4_tension.mp3`)}
        volume={0.3}
      />

      {/* SFX: Heavy impact synced with 52,000 TONS */}
      <Sequence from={phrase52000.from}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_heavy_impact.wav`)}
          volume={0.6}
        />
      </Sequence>

      {/* SFX: Cable snap on "Nearly killed" (Syncs with the Barge image) */}
      <Sequence from={phraseNearlyKilled.from}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_cable_snap.wav`)}
          volume={0.5}
        />
      </Sequence>

      {/* Voiceover */}
      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET}/voices/vo/vo_scene4.wav`)}
          volume={0.85}
        />
      </Sequence>

      {/* ====== CAPTIONS ====== */}
      <TiktokCaptions
        transcript={transcriptData}
        highlightedWords={highlightedWords}
        position="bottom-center"
        startFrame={VO_START_FRAME}
      />
    </AbsoluteFill>
  );
}
