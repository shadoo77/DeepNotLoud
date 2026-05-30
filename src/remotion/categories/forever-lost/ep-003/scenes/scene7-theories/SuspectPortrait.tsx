import { interpolate, spring, staticFile } from "remotion";
import { Img } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cinzel";
import { loadFont as loadInterFont } from "@remotion/google-fonts/Inter";
import { C } from "@/remotion/categories/forever-lost/ep-003/constants";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

const { fontFamily: interFont } = loadInterFont("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

const ASSET_PATH = "assets/forever-lost/ep-003";

export const SuspectPortrait: React.FC<{
  frame: number;
  fps: number;
  triggerFrame: number;
  exitFrame: number;
  image: string;
  name: string;
  subtitle: string;
  effectType: "illumination" | "constellation";
}> = ({
  frame,
  fps,
  triggerFrame,
  exitFrame,
  image,
  name,
  subtitle,
  effectType,
}) => {
  const local = Math.max(0, frame - triggerFrame);

  const panelSpring = spring({ frame: local, fps, config: { damping: 13 } });
  const panelX = interpolate(panelSpring, [0, 1], [400, 0]);
  const panelOpacity = interpolate(local, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitFade = Number.isFinite(exitFrame)
    ? interpolate(frame, [exitFrame - 20, exitFrame], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  const totalOpacity = panelOpacity * exitFade;

  // Illumination effect: radial gradient sweeps left-to-right
  const illuminationPos = interpolate(local, [5, 35], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Constellation effect: dots appear sequentially
  const dotPositions = [
    { cx: 20, cy: 15 },
    { cx: 80, cy: 10 },
    { cx: 85, cy: 60 },
    { cx: 50, cy: 85 },
    { cx: 15, cy: 60 },
    { cx: 50, cy: 50 },
    { cx: 10, cy: 35 },
    { cx: 90, cy: 35 },
    { cx: 50, cy: 20 },
  ];

  return (
    <div
      className="pointer-events-none absolute overflow-hidden rounded-xl"
      style={{
        left: "62%",
        top: "15%",
        width: "33%",
        opacity: totalOpacity,
        transform: `translateX(${panelX}px)`,
        backgroundColor: "rgba(10,10,10,0.88)",
        border: "1px solid rgba(200,169,110,0.25)",
      }}
    >
      {/* Portrait image */}
      <div className="relative overflow-hidden" style={{ height: 340 }}>
        <Img
          src={staticFile(`${ASSET_PATH}/images/${image}`)}
          className="size-full object-cover"
          style={{ filter: "grayscale(40%)" }}
        />

        {/* Illumination effect */}
        {effectType === "illumination" && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at ${illuminationPos}% 50%, transparent 20%, rgba(0,0,0,0.85) 60%)`,
            }}
          />
        )}

        {/* Constellation effect */}
        {effectType === "constellation" && (
          <svg className="absolute inset-0 size-full" viewBox="0 0 100 100">
            {dotPositions.map((dot, i) => {
              const dotSpring = spring({
                frame: Math.max(0, local - 10 - i * 3),
                fps,
                config: { damping: 20, stiffness: 200 },
              });
              const dotOpacity = interpolate(dotSpring, [0, 1], [0, 0.8]);
              const dotScale = interpolate(dotSpring, [0, 1], [0, 1]);
              return (
                <g key={i}>
                  {i > 0 && (
                    <line
                      x1={dotPositions[i - 1].cx}
                      y1={dotPositions[i - 1].cy}
                      x2={dot.cx}
                      y2={dot.cy}
                      stroke={C.gold}
                      strokeWidth={0.3}
                      opacity={dotOpacity * 0.5}
                    />
                  )}
                  <circle
                    cx={dot.cx}
                    cy={dot.cy}
                    r={2 * dotScale}
                    fill={C.gold}
                    opacity={dotOpacity}
                  />
                </g>
              );
            })}
          </svg>
        )}
      </div>

      {/* Name card */}
      <div className="px-5 py-4">
        <div
          className="text-3xl font-bold tracking-wider"
          style={{ fontFamily: cinzelFont, color: C.white }}
        >
          {name}
        </div>
        <div
          className="mt-1 text-xl"
          style={{ fontFamily: interFont, color: C.gold }}
        >
          {subtitle}
        </div>
        <div
          className="mt-3"
          style={{
            width: "60%",
            height: 2,
            backgroundColor: C.gold,
            transform: `scaleX(${panelSpring})`,
            transformOrigin: "left",
          }}
        />
      </div>
    </div>
  );
};
