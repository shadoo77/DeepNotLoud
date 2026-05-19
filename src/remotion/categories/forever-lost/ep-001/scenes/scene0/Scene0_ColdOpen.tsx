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

const ASSET = "assets/forever-lost/ep-001";

const Particle = ({
  delay,
  x,
  y,
  index,
}: {
  delay: number;
  x: number;
  y: number;
  index: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = Math.max(0, (frame - delay) / (fps * 12));
  const opacity = Math.min(0.6, progress * 0.4);
  const yOffset = -progress * 200;
  const blur = 1 + ((index * 7) % 5);

  return (
    <div
      className="rounded-full"
      style={{
        position: "absolute",
        left: x,
        top: y + yOffset,
        width: 3,
        height: 3,
        backgroundColor: "var(--color-biolumTeal)",
        opacity,
        filter: `blur(${blur}px)`,
        boxShadow: `0 0 6px var(--color-biolumTeal)`,
      }}
    />
  );
};

const LightShaft = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 90, 450], [0, 0.12, 0.15]);

  return (
    <div
      className="absolute top-0 w-1/5 h-full pointer-events-none"
      style={{
        left: "40%",
        background: `linear-gradient(
          to bottom,
          oklch(0.35 0.10 250 / ${opacity}),
          transparent 70%
        )`,
        filter: "blur(40px)",
      }}
    />
  );
};

const GrainOverlay = () => {
  return (
    <AbsoluteFill
      style={{ opacity: 0.03 }}
      className="mix-blend-overlay pointer-events-none"
    >
      <svg viewBox="0 0 256 256" width="100%" height="100%">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" opacity="0.04" />
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
    config: { damping: 12, stiffness: 100 },
    durationInFrames: fps * 12,
  });

  const scale = interpolate(zoomSpring, [0, 1], [4, 1]);

  const bowOpacity = interpolate(frame, [180, 300], [0, 1], {
    extrapolateRight: "clamp",
  });

  const particles = Array.from({ length: 25 }, (_, i) => ({
    delay: i * SCENE_DURATION,
    x: 100 + ((i * 137 + 50) % 1720),
    y: 400 + ((i * 89 + 200) % 680),
    index: i,
  }));

  const highlightedWords = ["3.8", "km", "never"];

  return (
    <AbsoluteFill
      style={{ backgroundColor: "var(--color-abyssBlack)" }}
      className="overflow-hidden"
    >
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "50% 40%",
        }}
      >
        <Sequence durationInFrames={SCENE_DURATION}>
          <Img
            src={staticFile(`${ASSET}/images/img_coldopen_rivet.jpeg`)}
            className="object-cover"
            style={{
              width: "100%",
              height: "100%",
              opacity: interpolate(bowOpacity, [0, 1], [1, 0.3]),
            }}
          />
        </Sequence>

        <Sequence durationInFrames={SCENE_DURATION}>
          <Img
            src={staticFile(`${ASSET}/images/img_coldopen_bow.jpeg`)}
            className="object-cover"
            style={{
              width: "100%",
              height: "100%",
              opacity: bowOpacity,
            }}
          />
        </Sequence>
      </AbsoluteFill>

      <LightShaft />

      {particles.map((p) => (
        <Particle
          key={p.index}
          delay={p.delay}
          x={p.x}
          y={p.y}
          index={p.index}
        />
      ))}

      <GrainOverlay />

      <Audio
        src={staticFile(`${ASSET}/voices/bgm/bgm_scene0_cello.mp3`)}
        volume={(f) =>
          interpolate(f, [0, fps * 8], [0, 0.3], {
            extrapolateRight: "clamp",
          })
        }
      />

      <Audio
        src={staticFile(`${ASSET}/voices/sfx/sfx_sub_bass_rumble.wav`)}
        volume={0.4}
      />

      <Sequence from={120}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_metal_creak.wav`)}
          volume={0.3}
        />
      </Sequence>

      <Sequence from={240}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_pressure_groan.wav`)}
          volume={0.25}
        />
      </Sequence>

      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET}/voices/vo/vo_scene0.wav`)}
          volume={0.8}
        />
      </Sequence>

      <TiktokCaptions
        transcript={transcriptData}
        highlightedWords={highlightedWords}
        position="bottom-center"
        startFrame={VO_START_FRAME}
      />
    </AbsoluteFill>
  );
};
