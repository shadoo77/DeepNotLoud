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

const ASSET = "assets/forever-lost/ep-002";

const getWordFrame = (wordToFind: string, fps: number) => {
  const word = transcriptData.find((w) =>
    w.text
      .toLowerCase()
      .replace(/[.,!?]/g, "")
      .includes(wordToFind.toLowerCase()),
  );
  return word ? Math.round((word.startMs / 1000) * fps) + VO_START_FRAME : 0;
};

export function Scene4_Weight() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- VISUAL TRIGGERS FROM VOICEOVER ---
  const frame52000 = getWordFrame("52,000", fps);
  const frameNoCrane = getWordFrame("no crane", fps);
  const frame5tons = getWordFrame("5-ton", fps);
  const frameNearlyKilled = getWordFrame("nearly killed", fps);
  const frame10000x = getWordFrame("ten thousand", fps);

  // --- ANIMATIONS ---

  // 1. Punch Zoom (Hits when 52,000 is spoken)
  // Creates a heavy "slam" effect by scaling up 5% and snapping back
  const punchZoom = spring({
    frame: frame - frame52000,
    fps,
    config: { damping: 10, stiffness: 200, mass: 0.5 },
  });
  const dynamicScale = interpolate(punchZoom, [0, 1], [1, 1.05]);

  // 2. Screen Shake (Triggered at the exact moment 52,000 is spoken)
  const shakeStartFrame = frame52000;
  const isShaking = frame > shakeStartFrame;

  // Dampened sine wave for organic earthquake feel
  const shakeIntensity = isShaking
    ? Math.exp(-(frame - shakeStartFrame) * 0.3) * 10 // Heavy 10px shake that decays rapidly
    : 0;
  const shakeY = Math.sin((frame - shakeStartFrame) * 1.5) * shakeIntensity;

  // 3. Barge image crossfade (starts when 1998 salvage is mentioned)
  const bargeOpacity = interpolate(
    frame,
    [frame5tons, frame5tons + 30], // 1 second crossfade
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // --- HIGHLIGHTED WORDS ---
  const highlightedWords = [
    "52,000",
    "tons",
    "no crane",
    "nearly killed",
    "ten thousand",
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
          src={staticFile(`${ASSET}/images/img_weight_scale.png`)}
          className="h-full w-full object-cover"
          style={{
            opacity: interpolate(bargeOpacity, [0, 1], [1, 0]), // Fades out when barge fades in
          }}
        />
      </AbsoluteFill>

      {/* ====== BACKGROUND LAYER 2: The Barge/Salvage Image ====== */}
      <AbsoluteFill style={{ opacity: bargeOpacity }}>
        <Img
          src={staticFile(`${ASSET}/images/img_barge_lift_attempt.png`)}
          className="h-full w-full object-cover"
        />
      </AbsoluteFill>

      {/* ====== DYNAMIC COUNT OVERLAY ====== */}
      {/* This overlays on top of the scale image */}
      {frame >= frame52000 && (
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 text-center">
          <CountUp
            to={52000}
            durationInFrames={fps * 2}
            delay={frame52000}
            className="text-ghostWhite font-mono text-8xl drop-shadow-[0_0_30px_var(--color-rustOrange)]"
            suffix=" TONS"
          />
        </div>
      )}

      {/* ====== TEXT SHOCKS (Triggered by VO) ====== */}

      {/* "NO CRANE ON EARTH" Flash */}
      <Sequence from={frameNoCrane} durationInFrames={fps * 2}>
        <AbsoluteFill className="bg-abyssBlack/80 flex items-center justify-center backdrop-blur-sm">
          <h1
            className="font-inter text-surfaceWhite text-7xl font-extrabold tracking-tight"
            style={{
              transform: `scale(${spring({
                frame: frame - frameNoCrane,
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
      <Sequence from={frameNearlyKilled} durationInFrames={fps * 2}>
        <AbsoluteFill className="bg-abyssBlack/90 flex items-center justify-center backdrop-blur-md">
          <h1
            className="font-inter text-rustOrange text-8xl font-extrabold tracking-tight"
            style={{
              transform: `scale(${spring({
                frame: frame - frameNearlyKilled,
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
      <Sequence from={frame10000x} durationInFrames={fps * 3}>
        <AbsoluteFill className="bg-abyssBlack/95 flex flex-col items-center justify-center gap-4 backdrop-blur-lg">
          <h1
            className="text-rustOrange font-mono text-[12rem] leading-none font-extrabold tracking-tighter"
            style={{
              transform: `scale(${spring({
                frame: frame - frame10000x,
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
      <Sequence from={frame52000}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_heavy_impact.wav`)}
          volume={0.6}
        />
      </Sequence>

      {/* SFX: Cable snap on "Nearly killed" (Syncs with the Barge image) */}
      <Sequence from={frameNearlyKilled}>
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
