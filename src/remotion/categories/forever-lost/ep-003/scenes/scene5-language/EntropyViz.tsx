import { interpolate, Easing } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cinzel";
import { C } from "@/remotion/categories/forever-lost/ep-003/constants";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

const WAVE_POINTS = Array.from({ length: 80 }, (_, i) => {
  const t = (i / 80) * Math.PI * 5;
  return (
    60 + Math.sin(t) * 25 + Math.sin(t * 2.3) * 12 + Math.sin(t * 0.7) * 10
  );
});

const W = 800;
const H = 160;
const pts = WAVE_POINTS.map(
  (y, i) => `${(i / (WAVE_POINTS.length - 1)) * W},${y}`,
).join(" ");

export const EntropyViz: React.FC<{
  frame: number;
  triggerFrame: number;
}> = ({ frame, triggerFrame }) => {
  const local = Math.max(0, frame - triggerFrame);

  const opacity = interpolate(local, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const drawProgress = interpolate(local, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  const labelFade = interpolate(local, [80, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const voynichPulse = interpolate(Math.sin(local * 0.06), [-1, 1], [1, 1.15]);

  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: "50%",
        top: "62%",
        transform: "translateX(-50%)",
        opacity,
      }}
    >
      <div
        className="flex flex-col items-center rounded-xl px-10 py-6"
        style={{ backgroundColor: "rgba(10,10,10,0.94)" }}
      >
        <svg
          width={W}
          height={H}
          className="overflow-visible"
          style={{ clipPath: `inset(0 ${100 - drawProgress * 100}% 0 0)` }}
        >
          <polyline
            points={pts}
            fill="none"
            stroke="#4A90D9"
            strokeWidth={3}
            strokeOpacity={0.7}
          />
          <polyline
            points={WAVE_POINTS.map(
              (y, i) => `${(i / (WAVE_POINTS.length - 1)) * W},${y + 4}`,
            ).join(" ")}
            fill="none"
            stroke="#4CAF50"
            strokeWidth={3}
            strokeOpacity={0.6}
          />
          <polyline
            points={WAVE_POINTS.map(
              (y, i) => `${(i / (WAVE_POINTS.length - 1)) * W},${y - 4}`,
            ).join(" ")}
            fill="none"
            stroke={C.gold}
            strokeWidth={4}
            strokeOpacity={0.9 * voynichPulse}
          />
        </svg>

        <div
          className="mt-4 text-center text-3xl font-semibold tracking-wider"
          style={{
            opacity: labelFade,
            fontFamily: cinzelFont,
            color: C.white,
          }}
        >
          <span style={{ color: C.gold }}>Statistical fingerprint:</span>{" "}
          IDENTICAL
        </div>
      </div>
    </div>
  );
};
