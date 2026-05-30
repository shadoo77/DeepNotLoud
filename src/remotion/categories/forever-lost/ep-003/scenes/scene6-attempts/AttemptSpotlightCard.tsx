import { interpolate, spring } from "remotion";
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

export const AttemptSpotlightCard: React.FC<{
  frame: number;
  fps: number;
  triggerFrame: number;
  nextTriggerFrame: number;
  year: string;
  institution: string;
  description: string;
  result: string;
}> = ({ frame, fps, triggerFrame, nextTriggerFrame, year, institution, description, result }) => {
  const local = Math.max(0, frame - triggerFrame);

  const scale = spring({ frame: local, fps, config: { damping: 14 } });
  const opacity = interpolate(local, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOpacity = Number.isFinite(nextTriggerFrame)
    ? interpolate(frame, [nextTriggerFrame - 40, nextTriggerFrame], [1, 0], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp",
      })
    : 1;

  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: "40%",
        top: "15%",
        width: "55%",
        opacity: opacity * exitOpacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        className="rounded-xl px-8 py-6"
        style={{ backgroundColor: "rgba(10,10,10,0.90)" }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-3xl font-bold"
            style={{ fontFamily: cinzelFont, color: C.white }}
          >
            {institution}
          </span>
          <span
            className="text-lg tracking-widest"
            style={{ fontFamily: "Courier New", color: C.gold }}
          >
            {year}
          </span>
        </div>
        <div
          className="mt-3 text-lg"
          style={{ fontFamily: interFont, color: C.gray }}
        >
          {description}
        </div>
        <div
          className="mt-4 text-xl font-bold"
          style={{ fontFamily: "Courier New", color: C.white }}
        >
          RESULT:{" "}
          <span
            className="inline-block rounded-full px-4 py-1"
            style={{ backgroundColor: C.red, color: C.white }}
          >
            {result}
          </span>
        </div>
      </div>
    </div>
  );
};
