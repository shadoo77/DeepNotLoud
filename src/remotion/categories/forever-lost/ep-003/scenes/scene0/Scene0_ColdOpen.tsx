import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
  Img,
  staticFile,
  interpolate,
} from "remotion";
import { Audio } from "@remotion/media";
import { TiktokCaptions } from "@/components/atoms/TiktokCaptions";
import { VO_START_FRAME, SCENE_DURATION } from "./constants";
import transcriptData from "./transcript_scene0.json";

const ASSET = "assets/forever-lost/ep-003";

const RadiationParticle = ({
  delay,
  x,
  originY,
  size,
}: {
  delay: number;
  x: number;
  originY: number;
  size: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = Math.max(0, (frame - delay) / (fps * 10));
  const opacity = interpolate(progress, [0, 1], [0, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pop = Math.floor((frame - delay) / 3) % 2 === 0 ? 0.8 : 0.2;
  const yOffset = -progress * 150;

  return (
    <div
      className="rounded-full"
      style={{
        position: "absolute",
        left: x,
        top: originY + yOffset,
        width: size,
        height: size,
        backgroundColor: "oklch(0.75 0.15 185 / 0.6)",
        opacity: opacity > 0 ? pop : 0,
        filter: `blur(${size * 0.5}px)`,
      }}
    />
  );
};

const GeigerFlash = () => {
  const frame = useCurrentFrame();
  const flash = Math.floor(frame / 4) % 3 === 0;

  return (
    <AbsoluteFill
      style={{
        opacity: flash ? 0.015 : 0,
        backgroundColor: "white",
        pointerEvents: "none",
      }}
    />
  );
};

const GrainOverlay = () => {
  return (
    <AbsoluteFill
      style={{ opacity: 0.04 }}
      className="mix-blend-overlay pointer-events-none"
    >
      <svg viewBox="0 0 256 256" width="100%" height="100%">
        <filter id="noise-scene0">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#noise-scene0)"
          opacity="0.06"
        />
      </svg>
    </AbsoluteFill>
  );
};

export const Scene0_ColdOpen = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zoomSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 80 },
    durationInFrames: fps * 15,
  });

  const scale = interpolate(zoomSpring, [0, 1], [4, 1.05]);

  const vignetteOpacity = interpolate(
    frame,
    [0, fps, fps * 10],
    [0.6, 0.7, 0.8],
    { extrapolateRight: "clamp" },
  );

  const particles = Array.from({ length: 20 }, (_, i) => ({
    delay: i * 20,
    x: 80 + ((i * 137 + 50) % 1760),
    originY: 900 + ((i * 89 + 200) % 200),
    size: 1.5 + ((i * 3) % 5),
  }));

  const highlightedWords = [
    "most",
    "dangerous",
    "object",
    "30",
    "seconds",
    "death",
    "5",
    "minutes",
    "kill",
    "never",
  ];

  return (
    <AbsoluteFill
      style={{ backgroundColor: "oklch(0.08 0.01 260)" }}
      className="overflow-hidden"
    >
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "50% 50%",
        }}
      >
        <Sequence durationInFrames={SCENE_DURATION}>
          <Img
            src={staticFile(`${ASSET}/images/img_scene00_elephants_foot.jpeg`)}
            className="object-cover"
            style={{
              width: "100%",
              height: "100%",
              filter: "contrast(1.2) brightness(0.7) saturate(0.6)",
            }}
          />
        </Sequence>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 40%, oklch(0 0 0 / ${vignetteOpacity}) 100%)`,
          pointerEvents: "none",
        }}
      />

      <GeigerFlash />

      {particles.map((p) => (
        <RadiationParticle
          key={p.delay}
          delay={p.delay}
          x={p.x}
          originY={p.originY}
          size={p.size}
        />
      ))}

      <GrainOverlay />

      <Audio
        src={staticFile(`${ASSET}/audio/bgm/bgm_eerie_drone.mp3`)}
        volume={(f) =>
          interpolate(f, [0, fps * 8], [0, 0.25], {
            extrapolateRight: "clamp",
          })
        }
      />

      <Sequence from={120}>
        <Audio
          src={staticFile(`${ASSET}/audio/sfx/sfx_deep_rumble.wav`)}
          volume={0.35}
        />
      </Sequence>

      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET}/audio/vo/vo_scene0.wav`)}
          volume={0.85}
        />
      </Sequence>

      <TiktokCaptions
        transcript={transcriptData}
        highlightedWords={highlightedWords}
        position="bottom-center"
        startFrame={VO_START_FRAME}
        showOverlay
      />
    </AbsoluteFill>
  );
};
