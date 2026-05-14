import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { Caption } from "@remotion/captions";

interface CaptionProps {
  transcript: Caption[];
  theme: Record<string, string>;
  highlightedWords?: string[];
  position?: "bottom-center" | "bottom-left" | "center";
}

// AbsoluteFill alignment per the official display-captions skill pattern
const positionStyle: Record<string, React.CSSProperties> = {
  "bottom-center": {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 64,
  },
  "bottom-left": {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingBottom: 64,
    paddingLeft: 40,
  },
  center: { justifyContent: "center", alignItems: "center" },
};

export const Captions: React.FC<CaptionProps> = ({
  transcript,
  theme,
  highlightedWords = [],
  position = "bottom-center",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTimeMs = (frame / fps) * 1000;

  return (
    // ✅ AbsoluteFill as the skill prescribes — handles full-canvas positioning reliably
    <AbsoluteFill style={positionStyle[position]}>
      {/* ✅ fontSize: 80 inline as the skill shows — not a Tailwind class */}
      <div
        style={{
          fontSize: 80,
          whiteSpace: "pre",
          textAlign: "center",
          maxWidth: 1400,
        }}
      >
        {transcript.map((caption, i) => {
          const isVisible = currentTimeMs >= caption.startMs;
          const isActive =
            currentTimeMs >= caption.startMs && currentTimeMs < caption.endMs;
          const isHighlighted = highlightedWords.some(
            (hw) =>
              caption.text
                .toLowerCase()
                .replace(/[.,!?]/g, "")
                .trim() === hw.toLowerCase(),
          );

          const elapsed = currentTimeMs - caption.startMs;
          const opacity = isVisible ? Math.min(1, elapsed / 100) : 0;
          const wordScale = isVisible
            ? Math.min(1, 0.85 + (elapsed / 100) * 0.15)
            : 0.85;

          return (
            <span
              key={i}
              // ✅ Tailwind still fine for non-layout classes (font-weight, mr)
              className={`inline-block mr-[0.3em] ${
                isHighlighted
                  ? "font-extrabold"
                  : isActive
                    ? "font-semibold"
                    : "font-normal"
              }`}
              style={{
                opacity,
                transform: `scale(${wordScale})`,
                transformOrigin: "center bottom",
                color: isHighlighted
                  ? theme.biolumTeal
                  : isActive
                    ? theme.surfaceWhite
                    : theme.steelGrey,
                textShadow: isHighlighted
                  ? "0 0 20px oklch(0.75 0.30 185), 0 0 40px oklch(0.75 0.20 185)"
                  : "none",
              }}
            >
              {caption.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
