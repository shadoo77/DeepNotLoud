import { spring, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cinzel";
import { C } from "@/remotion/categories/forever-lost/ep-003/constants";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const LABEL_DELAY = 50;

export interface StatDef {
  id: string;
  target: number;
  label: string;
  prefix?: string;
  suffix?: string;
  delay: number;
}

export const STATS: StatDef[] = [
  { id: "words", target: 38000, label: "WORDS — UNREADABLE", delay: 0 },
  { id: "chars", target: 170, label: "UNIQUE CHARACTERS", suffix: "+", delay: 15 },
  { id: "pages", target: 240, label: "PAGES", delay: 30 },
  { id: "value", target: 100, label: "ESTIMATED VALUE", prefix: "$", suffix: "M+", delay: 45 },
];

export const StatCounter: React.FC<{ stat: StatDef; frame: number; fps: number }> = ({
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
        className="text-7xl leading-none font-black tracking-tight"
        style={{ fontFamily: cinzelFont, color: C.white }}
      >
        {stat.prefix || ""}
        {current.toLocaleString()}
        {stat.suffix || ""}
      </div>
      <div
        className="mt-4 text-2xl font-semibold tracking-widest"
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
