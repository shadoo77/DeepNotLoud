import {
  AbsoluteFill,
  Img,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { Audio } from "@remotion/media";
import { loadFont } from "@remotion/google-fonts/Cinzel";
import { getPhraseFrames } from "@/lib/utils";
import { TickerBar } from "@/components/atoms/TickerBar";
import { DustParticles } from "@/components/atoms/DustParticles";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { SceneBadges } from "@/components/atoms/SceneBadges";
import { C, ASSET_PATH } from "@/remotion/categories/forever-lost/ep-003/constants";
import { TRASCRIPT_DATA, VO_START_FRAME } from "./constants";
import { BADGES } from "./badges";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

interface StatDef {
  id: string;
  target: number;
  label: string;
  prefix?: string;
  suffix?: string;
  delay: number;
}

const STATS: StatDef[] = [
  { id: "words", target: 38000, label: "WORDS — UNREADABLE", delay: 0 },
  { id: "chars", target: 170, label: "UNIQUE CHARACTERS", suffix: "+", delay: 15 },
  { id: "pages", target: 240, label: "PAGES", delay: 30 },
  { id: "value", target: 100, label: "ESTIMATED VALUE", prefix: "$", suffix: "M+", delay: 45 },
];

const LABEL_DELAY = 50;
const STAGGER_FRAMES = 6;

const zipfHeights = [200, 142, 115, 100, 89, 82, 76, 71, 67, 63];
const BAR_COLORS = ["#4A90D9", "#50B86C", C.gold];
const BAR_GAP = 3;
const GROUP_GAP = 12;
const BAR_W = 14;

const StatCounter: React.FC<{ stat: StatDef; frame: number; fps: number }> = ({
  stat,
  frame,
  fps,
}) => {
  const progress = spring({
    frame: Math.max(0, frame - stat.delay),
    fps,
    config: { damping: 18, stiffness: 60 },
  });
  const current = Math.round(
    interpolate(progress, [0, 1], [0, stat.target], {
      extrapolateRight: "clamp",
    }),
  );
  const labelOpacity = interpolate(
    Math.max(0, frame - stat.delay - LABEL_DELAY),
    [0, 15],
    [0, 1],
    { extrapolateRight: "clamp" },
  );

  return (
    <div className="flex flex-col items-center justify-center px-6 py-4">
      <div
        className="text-7xl font-black leading-none tracking-tight"
        style={{ fontFamily: cinzelFont, color: C.white }}
      >
        {stat.prefix || ""}
        {current.toLocaleString()}
        {stat.suffix || ""}
      </div>
      <div
        className="mt-4 text-sm font-semibold tracking-widest"
        style={{
          fontFamily: "Courier New, monospace",
          color: C.gold,
          opacity: labelOpacity,
        }}
      >
        {stat.label}
      </div>
      <div
        className="mt-3 h-0.5"
        style={{
          width: "60%",
          backgroundColor: C.gold,
          transform: `scaleX(${progress})`,
          transformOrigin: "left",
        }}
      />
    </div>
  );
};

const ZipfChart: React.FC<{
  frame: number;
  fps: number;
  triggerFrame: number;
  opacity: number;
}> = ({ frame, fps, triggerFrame, opacity }) => {
  const localFrame = Math.max(0, frame - triggerFrame);
  const totalBars = 30;
  const chartW = 140 + totalBars * (BAR_W + BAR_GAP) + 9 * GROUP_GAP;
  const chartH = 260;
  const yAxis = chartH - 30;
  const barBaseY = yAxis - 10;

  const langLabels = [
    { label: "ENGLISH", flag: "🇬🇧" },
    { label: "ARABIC", flag: "🇸🇦" },
    { label: "VOYNICH", flag: "📜" },
  ];

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-2xl px-8 pb-8 pt-6"
      style={{
        opacity,
        backgroundColor: "rgba(10,10,10,0.92)",
        border: `1px solid ${C.gold}`,
        width: "78%",
      }}
    >
      <svg
        viewBox={`0 0 ${chartW} ${chartH}`}
        className="w-full"
        style={{ height: "auto", maxHeight: 280 }}
      >
        <text
          x={chartW / 2}
          y={20}
          textAnchor="middle"
          fill={C.gray}
          fontSize={14}
          fontFamily="Courier New, monospace"
        >
          Word Frequency Distribution
        </text>

        <text
          x={20}
          y={chartH / 2}
          textAnchor="middle"
          fill={C.gray}
          fontSize={11}
          fontFamily="Courier New, monospace"
          transform={`rotate(-90, 20, ${chartH / 2})`}
        >
          FREQUENCY
        </text>

        {zipfHeights.map((h, rank) => {
          const baseX = 140 + rank * (BAR_W * 3 + BAR_GAP * 2 + GROUP_GAP);
          const variation = [0, -2, 3, -1, 2, 0, -3, 1, -2, 0];
          return [0, 1, 2].map((lang) => {
            const idx = rank * 3 + lang;
            const barHeight = h + variation[rank] * (lang === 1 ? 1 : lang === 2 ? -0.5 : 0);
            const x = baseX + lang * (BAR_W + BAR_GAP);
            const p = spring({
              frame: Math.max(0, localFrame - idx * STAGGER_FRAMES),
              fps,
              config: { damping: 14, stiffness: 80 },
            });
            const currentH = interpolate(p, [0, 1], [0, barHeight], {
              extrapolateRight: "clamp",
            });
            const labelOpacity = interpolate(
              Math.max(0, localFrame - idx * STAGGER_FRAMES - 30),
              [0, 10],
              [0, 1],
              { extrapolateRight: "clamp" },
            );

            return (
              <g key={`${rank}-${lang}`}>
                <rect
                  x={x}
                  y={barBaseY - currentH}
                  width={BAR_W}
                  height={Math.max(currentH, 1)}
                  fill={BAR_COLORS[lang]}
                  rx={2}
                  opacity={0.85}
                />
                {lang === 1 && (
                  <text
                    x={x + BAR_W / 2}
                    y={barBaseY + 16}
                    textAnchor="middle"
                    fill={C.gray}
                    fontSize={9}
                    fontFamily="Courier New, monospace"
                    opacity={labelOpacity}
                  >
                    {rank + 1}
                  </text>
                )}
              </g>
            );
          });
        })}

        {langLabels.map((lang, i) => {
          const x = 20 + i * ((chartW - 100) / 3);
          return (
            <text
              key={lang.label}
              x={x}
              y={chartH - 4}
              fill={BAR_COLORS[i]}
              fontSize={11}
              fontFamily="Courier New, monospace"
            >
              {lang.flag} {lang.label}
            </text>
          );
        })}
      </svg>

      <div
        className="mt-4 text-center text-lg font-bold tracking-wider"
        style={{
          fontFamily: cinzelFont,
          color: C.gold,
          opacity: interpolate(
            Math.max(0, localFrame - 30 * STAGGER_FRAMES),
            [0, 20],
            [0, 1],
            { extrapolateRight: "clamp" },
          ),
        }}
      >
        Matches natural language patterns
      </div>
      <div
        className="mt-1 text-center text-sm tracking-widest"
        style={{
          fontFamily: "Courier New, monospace",
          color: C.gray,
          opacity: interpolate(
            Math.max(0, localFrame - 30 * STAGGER_FRAMES - 20),
            [0, 20],
            [0, 1],
            { extrapolateRight: "clamp" },
          ),
        }}
      >
        Statistical fingerprint: IDENTICAL
      </div>
    </div>
  );
};

export const Scene4Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const kenBurns = interpolate(frame, [0, 2280], [1.0, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  const zipfResult = getPhraseFrames({
    phrase: "zipf's law",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const zipfTrigger =
    zipfResult.from > 0 ? zipfResult.from : 1200;
  const zipfLocal = Math.max(0, frame - zipfTrigger);

  const zipfOpacity = interpolate(
    zipfLocal,
    [0, 20, 400, 500],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const terrifyingResult = getPhraseFrames({
    phrase: "terrifying",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const terrifyingFrame =
    terrifyingResult.from > 0 ? terrifyingResult.from : 1700;

  return (
    <AbsoluteFill className="overflow-hidden" style={{ backgroundColor: C.bg }}>
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: `scale(${kenBurns})` }}
      >
        <Img
          src={staticFile(`${ASSET_PATH}/images/ep003_manuscript_spread.jpeg`)}
          className="size-full object-cover"
          style={{ opacity: 0.4 }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.70) 100%)",
        }}
      />

      <DustParticles count={50} />

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0"
        style={{
          height: "55%",
          backgroundColor: "#0D0D0D",
          borderTop: `1px solid #222`,
        }}
      >
        <div className="grid h-full grid-cols-2 grid-rows-2">
          {STATS.map((stat) => (
            <StatCounter key={stat.id} stat={stat} frame={frame} fps={fps} />
          ))}
        </div>
      </div>

      <SceneBadges
        badges={BADGES}
        transcriptData={TRASCRIPT_DATA}
        voiceOverStartFrame={VO_START_FRAME}
      />

      <ZipfChart
        frame={frame}
        fps={fps}
        triggerFrame={zipfTrigger}
        opacity={zipfOpacity}
      />

      <TickerBar opacity={1} color={C.gold} />

      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/vo/ep003_L_s4_stats.wav`)}
          volume={1}
        />
        <YouTubeCaptions
          transcript={TRASCRIPT_DATA}
          highlightedWords={[
            "mystery",
            "pages",
            "38,000",
            "thousand",
            "words",
            "nobody",
            "characters",
            "alphabet",
            "zipf",
            "law",
            "statistical",
            "mathematical",
            "terrifying",
            "million",
            "online",
            "unreadable",
          ]}
          position="top-center"
          startFrame={0}
          showOverlay
        />
      </Sequence>

      <Sequence from={VO_START_FRAME} durationInFrames={2280}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/clock_tick.wav`)}
          volume={(f) =>
            [0, 15, 30, 45].includes(f)
              ? 0.25
              : 0
          }
        />
      </Sequence>

      <Sequence from={terrifyingFrame}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/impact_thud.wav`)}
          volume={(f) =>
            interpolate(f, [0, 60], [0.5, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>
    </AbsoluteFill>
  );
};
