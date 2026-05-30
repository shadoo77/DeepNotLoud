import { interpolate, staticFile, Img } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cinzel";
import { C } from "@/remotion/categories/forever-lost/ep-003/constants";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

const ASSET_PATH = "assets/forever-lost/ep-003";

export const MessageBottleText: React.FC<{
  frame: number;
  triggerFrame: number;
  sceneEndFrame: number;
}> = ({ frame, triggerFrame, sceneEndFrame }) => {
  const local = Math.max(0, frame - triggerFrame);

  // Bottle image fades in
  const bottleOpacity = interpolate(local, [0, 40], [0, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bottleBreath = interpolate(Math.sin(frame * 0.02), [-1, 1], [0.85, 1]);

  // Line 1: "A message in a bottle."
  const line1Fade = interpolate(local, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line1Y = interpolate(local, [0, 30], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Line 2: "Thrown into time."
  const line2Fade = interpolate(local, [40, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2Y = interpolate(local, [40, 70], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Line 3: "Never received."
  const line3FadeIn = interpolate(local, [80, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line3Dim = interpolate(local, [200, 320], [1, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line3Opacity = line3FadeIn * line3Dim;
  const line3Y = interpolate(local, [80, 110], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Water ripples — one per line
  const ripple1 = interpolate(local, [0, 80], [10, 250], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ripple1Opacity = interpolate(local, [0, 40, 80], [0, 0.12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ripple2 = interpolate(local, [40, 120], [10, 250], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ripple2Opacity = interpolate(local, [40, 80, 120], [0, 0.12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ripple3 = interpolate(local, [80, 160], [10, 250], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ripple3Opacity = interpolate(local, [80, 120, 160], [0, 0.12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Blue flash on "Never received."
  const blueFlash = interpolate(local, [80, 84, 95], [0, 0.18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final fade to black
  const finalFade = interpolate(
    frame,
    [sceneEndFrame - 60, sceneEndFrame],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <>
      {/* Bottle image */}
      <Img
        src={staticFile(`${ASSET_PATH}/images/ep003_message_bottle.jpeg`)}
        className="pointer-events-none absolute inset-0 size-full object-cover"
        style={{ opacity: bottleOpacity * bottleBreath }}
      />

      {/* Water ripples */}
      <svg className="pointer-events-none absolute inset-0 size-full">
        <circle
          cx="50%"
          cy="40%"
          r={ripple1}
          fill="none"
          stroke={C.gold}
          strokeWidth={0.5}
          opacity={ripple1Opacity}
        />
        <circle
          cx="50%"
          cy="45%"
          r={ripple2}
          fill="none"
          stroke={C.gold}
          strokeWidth={0.5}
          opacity={ripple2Opacity}
        />
        <circle
          cx="50%"
          cy="50%"
          r={ripple3}
          fill="none"
          stroke={C.gold}
          strokeWidth={0.5}
          opacity={ripple3Opacity}
        />
      </svg>

      {/* Full-width bottom card with all 3 text lines */}
      <div
        className="pointer-events-none absolute flex flex-col items-center justify-center"
        style={{
          top: "22%",
          left: 0,
          width: "100%",
          paddingTop: 48,
          paddingBottom: 48,
          borderTop: "1px solid rgba(200,169,110,0.15)",
          borderBottom: "1px solid rgba(200,169,110,0.15)",
          opacity: line1Fade,
        }}
      >
        <div
          className="text-center"
          style={{
            opacity: line1Fade,
            transform: `translateY(${line1Y}px)`,
          }}
        >
          <span
            className="text-5xl font-bold tracking-wide"
            style={{ fontFamily: cinzelFont, color: C.white }}
          >
            A message in a bottle.
          </span>
        </div>
        <div
          className="mt-6 text-center"
          style={{
            opacity: line2Fade,
            transform: `translateY(${line2Y}px)`,
          }}
        >
          <span
            className="text-4xl font-bold tracking-wide"
            style={{ fontFamily: cinzelFont, color: C.gold }}
          >
            Thrown into time.
          </span>
        </div>
        <div
          className="mt-6 text-center"
          style={{
            opacity: line3Opacity,
            transform: `translateY(${line3Y}px)`,
          }}
        >
          <span
            className="text-4xl font-bold tracking-wide"
            style={{ fontFamily: cinzelFont, color: C.white }}
          >
            Never received.
          </span>
        </div>
      </div>

      {/* Blue flash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: "#1A2744", opacity: blueFlash }}
      />

      {/* Final fade to black */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: "#000000", opacity: finalFade }}
      />
    </>
  );
};
