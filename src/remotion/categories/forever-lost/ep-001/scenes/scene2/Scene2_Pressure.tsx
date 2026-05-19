import { useMemo } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Img,
  staticFile,
  interpolate,
  spring,
} from "remotion";
import { Audio } from "@remotion/media";
import { TiktokCaptions } from "@/components/atoms/TiktokCaptions";
import { Explode } from "@/components/atoms/Explode";
import { getPhraseFrames } from "@/lib/utils";
import { VO_START_FRAME, TRASCRIPT_DATA } from "./constants";

const ASSET = "assets/forever-lost/ep-001";

const HIGHLIGHTED_WORDS = [
  "380",
  "crushed",
  "corroding",
  "century",
  "disintegrate",
];

// Rusticle particle — falls downward from the sphere
const Rusticle = ({
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

  const progress = Math.max(0, (frame - delay) / (fps * 6));
  const opacity = Math.min(0.8, progress * 0.6);
  const yOffset = progress * 300;
  const blur = 1 + ((index * 7) % 4);

  return (
    <div
      className="rounded-full"
      style={{
        position: "absolute",
        left: x,
        top: y + yOffset,
        width: 4,
        height: 6,
        backgroundColor: "var(--color-rustOrange)",
        opacity,
        filter: `blur(${blur}px)`,
        boxShadow: `0 0 4px var(--color-rustOrange)`,
      }}
    />
  );
};

// Crack lines drawn on the sphere
const CrackLines = ({ triggerFrame }: { triggerFrame: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const drawProgress = interpolate(
    frame,
    [triggerFrame, triggerFrame + fps * 3],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );

  if (drawProgress <= 0) return null;

  const crackPaths = [
    "M960 380 L920 420 L940 460 L900 500 L930 540",
    "M960 380 L1000 430 L980 470 L1020 510 L990 560",
    "M960 420 L910 440 L930 480 L890 520 L920 560",
    "M960 420 L1010 450 L990 490 L1030 530 L1000 570",
    "M960 460 L920 500 L950 540 L910 580 L940 620",
    "M960 460 L1000 500 L970 540 L1010 580 L980 620",
  ];

  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      className="absolute pointer-events-none"
    >
      {crackPaths.map((d, i) => {
        const pathLength = 300;
        const dashOffset = pathLength * (1 - drawProgress);
        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="var(--color-rustOrange)"
            strokeWidth="2"
            strokeDasharray={pathLength}
            strokeDashoffset={dashOffset}
            opacity={0.7}
          />
        );
      })}
    </svg>
  );
};

export function Scene2_Pressure() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gpf = (phrase: string) =>
    getPhraseFrames({ phrase, transcriptData: TRASCRIPT_DATA, fps, voiceOverStartFrame: VO_START_FRAME }).from;

  const frame380 = gpf("380");
  const frameCup = gpf("crushed");
  const frameHull = gpf("corroding");
  const frameSolid = gpf("solid");
  const frameRusticles = gpf("rusticles");
  const frameDisintegrate = gpf("disintegrate");
  const frameCentury = gpf("century");

  const pressureScale = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 8, stiffness: 60 },
  });

  const compressionScale = interpolate(pressureScale, [0, 1], [1, 0.85]);

  const rusticles = Array.from({ length: 30 }, (_, i) => ({
    delay: frameRusticles + i * 3,
    x: 800 + ((i * 137 + 50) % 320),
    y: 400 + ((i * 89 + 100) % 280),
    index: i,
  }));

  const highlightedWords = HIGHLIGHTED_WORDS;

  const captionsData = useMemo(
    () =>
      TRASCRIPT_DATA.filter(
        (w) =>
          !HIGHLIGHTED_WORDS.includes("disintegrate") ||
          !w.text.toLowerCase().includes("disintegrate"),
      ),
    [],
  );

  return (
    <AbsoluteFill className="bg-abyssBlack overflow-hidden">
      {/* ====== HULL DEFORMATION BACKGROUND ====== */}
      {/* ====== HULL DEFORMATION BACKGROUND (PERSISTENT) ====== */}
      <AbsoluteFill
        style={{
          // Dynamic opacity: Fades in at scene start, then pulses brighter when "380" and "corroding" are mentioned
          opacity: (() => {
            // Base fade-in at scene start
            const baseFade = interpolate(frame, [0, 30], [0, 0.15], {
              extrapolateRight: "clamp",
            });

            // Pulse brighter when "380 ATM" appears
            const pulse380 =
              frame380 > 0
                ? interpolate(frame, [frame380, frame380 + 20], [0, 0.15], {
                    extrapolateRight: "clamp",
                    extrapolateLeft: "clamp",
                  })
                : 0;

            // Pulse brighter again when "corroding" is mentioned
            const pulseHull =
              frameHull > 0
                ? interpolate(frame, [frameHull, frameHull + 20], [0, 0.15], {
                    extrapolateRight: "clamp",
                    extrapolateLeft: "clamp",
                  })
                : 0;

            // Combine: Base (0.15) + Pulse 1 (0.15) + Pulse 2 (0.15) = Max 0.45 opacity
            return Math.min(0.45, baseFade + pulse380 + pulseHull);
          })(),
        }}
      >
        <Img
          src={staticFile(`${ASSET}/images/img_hull_deformation.jpeg`)}
          className="h-full w-full object-cover"
          style={{
            // Optional: Add a very subtle slow zoom to make the mesh feel alive
            transform: `scale(${interpolate(frame, [0, fps * 15], [1, 1.1], {
              extrapolateRight: "clamp",
            })})`,
          }}
        />
      </AbsoluteFill>

      {/* ====== PRESSURE ARROWS + COMPRESSING SPHERE ====== */}
      <AbsoluteFill className="flex items-center justify-center">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1920 1080"
          className="absolute opacity-60"
        >
          <path
            d={`M960 50 L960 ${interpolate(compressionScale, [0.85, 1], [200, 50])}`}
            className="stroke-rustOrange"
            strokeWidth="4"
          />
          <path
            d={`M960 1030 L960 ${interpolate(compressionScale, [0.85, 1], [880, 1030])}`}
            className="stroke-rustOrange"
            strokeWidth="4"
          />
          <path
            d={`M50 540 L${interpolate(compressionScale, [0.85, 1], [200, 50])} 540`}
            className="stroke-rustOrange"
            strokeWidth="4"
          />
          <path
            d={`M1870 540 L${interpolate(compressionScale, [0.85, 1], [1720, 1870])} 540`}
            className="stroke-rustOrange"
            strokeWidth="4"
          />
        </svg>

        <div
          className="h-[400px] w-[400px] rounded-full border-2"
          style={{
            backgroundColor: "var(--color-deepNavy)",
            borderColor: "var(--color-oceanBlue)",
            transform: `scale(${compressionScale})`,
            boxShadow: "0 0 40px var(--color-oceanBlue)",
          }}
        />

        {/* Crack lines appear when "hull isn't solid" */}
        {frameSolid > 0 && <CrackLines triggerFrame={frameSolid} />}

        {/* Rusticle particles fall when "rusticles" is mentioned */}
        {frameRusticles > 0 &&
          rusticles.map((p) => (
            <Rusticle
              key={p.index}
              delay={p.delay}
              x={p.x}
              y={p.y}
              index={p.index}
            />
          ))}
      </AbsoluteFill>

      {/* ====== "380 ATM" PRESSURE BADGE ====== */}
      {frame380 > 0 && (
        <div
          className="absolute top-[15%] right-[8%]"
          style={{
            opacity: interpolate(frame, [frame380, frame380 + 15], [0, 1], {
              extrapolateRight: "clamp",
            }),
            transform: `scale(${spring({
              frame: frame - frame380,
              fps,
              config: { damping: 10, stiffness: 200 },
            })})`,
          }}
        >
          <div
            className="rounded-xl p-5 backdrop-blur-md"
            style={{
              backgroundColor: "oklch(0.22 0.04 260 / 0.8)",
              border: "1px solid var(--color-oceanBlue)",
            }}
          >
            <div className="text-biolumTeal font-mono text-[48px] font-bold">
              380 ATM
            </div>
            <div className="text-surfaceWhite text-base">Water Pressure</div>
          </div>
        </div>
      )}

      {/* ====== "113 YEARS" CENTURY BADGE ====== */}
      {frameCentury > 0 && (
        <div
          className="absolute top-[15%] left-[8%]"
          style={{
            opacity: interpolate(
              frame,
              [frameCentury, frameCentury + 15],
              [0, 1],
              { extrapolateRight: "clamp" },
            ),
            transform: `scale(${spring({
              frame: frame - frameCentury,
              fps,
              config: { damping: 10, stiffness: 200 },
            })})`,
          }}
        >
          <div
            className="rounded-xl p-5 backdrop-blur-md"
            style={{
              backgroundColor: "oklch(0.22 0.04 260 / 0.8)",
              border: "1px solid var(--color-rustOrange)",
            }}
          >
            <div className="text-rustOrange font-mono text-[48px] font-bold">
              113 YRS
            </div>
            <div className="text-surfaceWhite text-base">Corroding</div>
          </div>
        </div>
      )}

      {/* ====== STYROFOAM CUP COMPARISON ====== */}
      <Sequence
        from={frameCup}
        durationInFrames={frameHull > 0 ? frameHull - frameCup : fps * 5}
      >
        <AbsoluteFill className="flex items-center justify-center">
          <Img
            src={staticFile(`${ASSET}/images/img_pressure_crushed_cup.png`)}
            className="h-[70%] w-[70%] object-contain"
            style={{
              opacity: (() => {
                const cupDuration =
                  frameHull > 0 ? frameHull - frameCup : fps * 5;
                const fadeInEnd = frameCup + 20;
                const fadeOutStart = frameCup + cupDuration - 15;
                if (frame <= fadeInEnd) {
                  return interpolate(frame, [frameCup, fadeInEnd], [0, 1], {
                    extrapolateRight: "clamp",
                  });
                }
                if (frame >= fadeOutStart) {
                  return interpolate(
                    frame,
                    [fadeOutStart, frameCup + cupDuration],
                    [1, 0],
                    {
                      extrapolateRight: "clamp",
                    },
                  );
                }
                return 1;
              })(),
              transform: (() => {
                const cupDuration =
                  frameHull > 0 ? frameHull - frameCup : fps * 5;
                const fadeInEnd = frameCup + 20;
                const fadeOutStart = frameCup + cupDuration - 15;
                if (frame <= fadeInEnd) {
                  return `scale(${interpolate(
                    frame,
                    [frameCup, fadeInEnd],
                    [0.5, 1],
                    {
                      extrapolateRight: "clamp",
                    },
                  )})`;
                }
                if (frame >= fadeOutStart) {
                  return `scale(${interpolate(
                    frame,
                    [fadeOutStart, frameCup + cupDuration],
                    [1, 1.3],
                    {
                      extrapolateRight: "clamp",
                    },
                  )})`;
                }
                return "scale(1)";
              })(),
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ====== "DISINTEGRATE" EXPLOSION ====== */}
      <Sequence from={frameDisintegrate}>
        <AbsoluteFill
          className="bg-abyssBlack flex items-center justify-center"
          style={{
            opacity: interpolate(
              frame,
              [frameDisintegrate, frameDisintegrate + 15],
              [0, 1],
              { extrapolateRight: "clamp" },
            ),
          }}
        >
          <Explode
            text="DISINTEGRATE"
            triggerFrame={frameDisintegrate}
            color="var(--color-rustOrange)"
            fontSize={120}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ====== AUDIO LAYERS ====== */}
      <Audio
        src={staticFile(`${ASSET}/voices/bgm/bgm_scene0_cello.mp3`)}
        volume={0.25}
      />

      <Sequence from={frameCup}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_crushing.wav`)}
          volume={0.4}
        />
      </Sequence>

      <Sequence from={frameHull}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_metal_shriek.wav`)}
          volume={0.3}
        />
      </Sequence>

      <Audio
        src={staticFile(`${ASSET}/voices/sfx/sfx_heartbeat.wav`)}
        volume={0.3}
      />

      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET}/voices/vo/vo_scene2.wav`)}
          volume={0.8}
        />
      </Sequence>

      <TiktokCaptions
        transcript={captionsData}
        highlightedWords={highlightedWords}
        position="center"
        startFrame={VO_START_FRAME}
      />
    </AbsoluteFill>
  );
}
