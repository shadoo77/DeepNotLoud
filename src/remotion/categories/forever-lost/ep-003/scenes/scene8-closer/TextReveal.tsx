import { interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cinzel";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

type RevealLine = {
  text: string;
  triggerFrame: number;
  color: string;
};

export const TextReveal: React.FC<{
  frame: number;
  lines: RevealLine[];
}> = ({ frame, lines }) => {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center" style={{ paddingBottom: 80 }}>
      {lines.map((line, i) => {
        const local = Math.max(0, frame - line.triggerFrame);
        const fade = interpolate(local, [0, 30], [0, 1], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp",
        });
        const y = interpolate(local, [0, 30], [24, 0], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp",
        });

        // Line 4 ("We may never know") slowly dims after appearing
        const dim = i === 3
          ? interpolate(local, [200, 400], [1, 0.2], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            })
          : 1;

        return (
          <div
            key={i}
            className="mb-6 text-center"
            style={{
              opacity: fade * dim,
              transform: `translateY(${y}px)`,
            }}
          >
            <span
              className="text-4xl font-bold tracking-wide"
              style={{
                fontFamily: cinzelFont,
                color: line.color,
                textShadow: i === 3 ? "0 0 20px rgba(200,169,110,0.3)" : "none",
              }}
            >
              {line.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};
