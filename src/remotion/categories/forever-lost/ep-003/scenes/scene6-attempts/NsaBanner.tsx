import { interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/CourierPrime";
import { C } from "@/remotion/categories/forever-lost/ep-003/constants";

const { fontFamily: courierFont } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

export const NsaBanner: React.FC<{
  frame: number;
  triggerFrame: number;
}> = ({ frame, triggerFrame }) => {
  const local = Math.max(0, frame - triggerFrame);

  const slideIn = interpolate(local, [0, 20], [1920, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exit = interpolate(local, [250, 280], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const watermarkPulse = interpolate(Math.sin(local * 0.08), [-1, 1], [0.05, 0.15]);

  return (
    <div
      className="pointer-events-none absolute overflow-hidden"
      style={{
        top: 0,
        left: 0,
        right: 0,
        height: 80,
        opacity: exit,
      }}
    >
      <div
        className="relative flex h-full items-center overflow-hidden"
        style={{
          backgroundColor: C.red,
          transform: `translateX(${slideIn}px)`,
        }}
      >
        {/* Watermark */}
        <span
          className="pointer-events-none absolute text-6xl font-black uppercase"
          style={{
            fontFamily: courierFont,
            color: C.white,
            opacity: watermarkPulse,
            right: 40,
            top: "50%",
            transform: "translateY(-50%)",
            letterSpacing: 8,
          }}
        >
          DECLASSIFIED
        </span>

        <span
          className="text-3xl font-bold tracking-wider"
          style={{
            fontFamily: courierFont,
            color: C.white,
            paddingLeft: 40,
          }}
        >
          NSA · CLASSIFIED DOCUMENT RELEASED · 2014 · FINDING: UNKNOWN
        </span>
      </div>
    </div>
  );
};
