import { interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cinzel";
import { loadFont as loadInterFont } from "@remotion/google-fonts/Inter";
import { C } from "@/remotion/categories/forever-lost/ep-003/constants";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

const { fontFamily: interFont } = loadInterFont("normal", {
  weights: ["400", "600"],
  subsets: ["latin"],
});

const GLYPHS = ["ꝏ", "⊕", "ꝏ"];

export const ReduplicationBanner: React.FC<{
  frame: number;
  fps: number;
  triggerFrame: number;
}> = ({ frame, fps, triggerFrame }) => {
  const local = Math.max(0, frame - triggerFrame);

  const opacity = interpolate(local, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(local, [500, 550], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = spring({
    frame: local,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const middlePulse = interpolate(Math.sin(local * 0.12), [-1, 1], [1, 1.3]);

  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: "50%",
        top: "35%",
        transform: `translateX(-50%) scale(${scale})`,
        opacity: opacity * exitOpacity,
      }}
    >
      <div
        className="flex flex-col items-center rounded-xl px-12 py-8"
        style={{ backgroundColor: "rgba(10,10,10,0.88)" }}
      >
        <div className="flex items-center gap-12">
          {GLYPHS.map((glyph, i) => {
            const isMiddle = i === 1;
            return (
              <span
                key={i}
                style={{
                  fontFamily: "serif",
                  fontSize: isMiddle ? 96 * middlePulse : 80,
                  color: isMiddle ? C.gold : C.white,
                  textShadow: isMiddle
                    ? `0 0 ${interpolate(middlePulse, [1, 1.3], [8, 30])}px ${C.gold}`
                    : "none",
                  opacity: isMiddle ? middlePulse : 0.6,
                }}
              >
                {glyph}
              </span>
            );
          })}
        </div>

        <div
          className="mt-5 text-center"
          style={{
            opacity: interpolate(local, [30, 50], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            className="text-2xl tracking-wider"
            style={{ fontFamily: cinzelFont, color: C.white }}
          >
            SAME WORD · 3× IN A ROW · APPEARS 1000+ TIMES
          </div>
          <div
            className="mt-2 text-xl font-medium"
            style={{ fontFamily: interFont, color: C.gray }}
          >
            Linguistic reduplication — but far too frequent
          </div>
        </div>
      </div>
    </div>
  );
};
