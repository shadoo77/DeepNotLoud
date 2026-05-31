import { interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cinzel";
import { loadFont as loadInterFont } from "@remotion/google-fonts/Inter";
import { C } from "@/remotion/categories/forever-lost/ep-003/constants";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const { fontFamily: interFont } = loadInterFont("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

export const EndCard: React.FC<{
  frame: number;
  fps: number;
  triggerFrame: number;
  sceneEndFrame: number;
}> = ({ frame, fps, triggerFrame, sceneEndFrame }) => {
  const local = Math.max(0, frame - triggerFrame);

  const bgFade = interpolate(local, [0, 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const titleSpring = spring({
    frame: local,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const titleScale = interpolate(titleSpring, [0, 1], [0.8, 1]);
  const titleOpacity = interpolate(local, [0, 25], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const lineProgress = spring({
    frame: Math.max(0, local - 15),
    fps,
    config: { damping: 20, stiffness: 60 },
  });
  const lineScaleX = interpolate(lineProgress, [0, 1], [0, 1]);

  const subtitleFade = interpolate(local, [30, 50], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Final 60f fade to black
  const finalFade = interpolate(frame, [sceneEndFrame - 60, sceneEndFrame], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <>
      {/* Black overlay behind card */}
      <div className="pointer-events-none absolute inset-0" style={{ backgroundColor: "#000000", opacity: bgFade }} />

      {/* Title card content */}
      <div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
      >
        <span
          className="text-7xl font-black tracking-widest"
          style={{ fontFamily: cinzelFont, color: C.gold }}
        >
          FOREVER LOST
        </span>

        <div className="mt-4 flex justify-center" style={{ width: "40%" }}>
          <div
            style={{
              height: 2,
              width: "100%",
              backgroundColor: C.gold,
              transform: `scaleX(${lineScaleX})`,
              transformOrigin: "center",
            }}
          />
        </div>

        <div className="mt-6 flex flex-col items-center gap-2" style={{ opacity: subtitleFade }}>
          <span className="text-xl tracking-widest" style={{ fontFamily: interFont, color: C.gray }}>
            EPISODE 003
          </span>
          <span className="text-2xl tracking-wide" style={{ fontFamily: cinzelFont, color: "#888888" }}>
            The Voynich Manuscript
          </span>
        </div>
      </div>

      {/* Final fade to black */}
      <div className="pointer-events-none absolute inset-0" style={{ backgroundColor: "#000000", opacity: finalFade }} />
    </>
  );
};
