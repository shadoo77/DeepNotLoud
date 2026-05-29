import { spring, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cinzel";
import { C } from "@/remotion/categories/forever-lost/ep-003/constants";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const STAGGER_FRAMES = 6;
const zipfHeights = [200, 142, 115, 100, 89, 82, 76, 71, 67, 63];
const BAR_COLORS = ["#4A90D9", "#50B86C", C.gold];
const BAR_GAP = 3;
const GROUP_GAP = 12;
const BAR_W = 14;
const langLabels = [
  { label: "ENGLISH", flag: "🇬🇧" },
  { label: "ARABIC", flag: "🇸🇦" },
  { label: "VOYNICH", flag: "📜" },
];

export const ZipfChart: React.FC<{
  frame: number;
  fps: number;
  triggerFrame: number;
  opacity: number;
}> = ({ frame, fps, triggerFrame, opacity }) => {
  const localFrame = Math.max(0, frame - triggerFrame);
  const totalBars = 30;
  const chartW = 140 + totalBars * (BAR_W + BAR_GAP) + 9 * GROUP_GAP;
  const chartH = 350;
  const yAxis = chartH - 50;
  const barBaseY = yAxis - 10;

  return (
    <div
      className="pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-2xl px-8 pt-6 pb-8"
      style={{
        opacity,
        backgroundColor: "rgba(10,10,10,0.94)",
        border: `1px solid ${C.gold}`,
        width: "78%",
      }}
    >
      <svg
        viewBox={`0 0 ${chartW} ${chartH}`}
        className="w-full"
        style={{ height: "auto", maxHeight: 580 }}
      >
        <text
          x={chartW / 2}
          y={20}
          textAnchor="middle"
          fill={C.gray}
          className="text-2xl font-bold tracking-wide"
          fontFamily="Courier New, monospace"
        >
          Word Frequency Distribution
        </text>

        <text
          x={20}
          y={chartH / 2}
          textAnchor="middle"
          fill={C.gray}
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
            const barHeight =
              h + variation[rank] * (lang === 1 ? 1 : lang === 2 ? -0.5 : 0);
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
              y={chartH}
              fill={BAR_COLORS[i]}
              className="text-lg font-bold tracking-wide"
              fontFamily="Courier New, monospace"
            >
              {lang.flag} {lang.label}
            </text>
          );
        })}
      </svg>

      <div
        className="mt-4 text-center text-2xl font-bold tracking-wider"
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
        className="mt-1 text-center text-xl tracking-widest"
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
