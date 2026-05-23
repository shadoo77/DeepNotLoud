import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { C } from "../constants";

interface Props {
  text: string;
  startFrame?: number;
  fontSize?: number;
  color?: string;
  highlightWords?: string[];
  staggerFrames?: number;
  center?: boolean;
}

export const KineticText: React.FC<Props> = ({
  text,
  startFrame = 0,
  fontSize = 52,
  color = C.white,
  highlightWords = [],
  staggerFrames = 4,
  center = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0 12px",
        justifyContent: center ? "center" : "flex-start",
      }}
    >
      {words.map((word, i) => {
        const wordFrame = startFrame + i * staggerFrames;
        const wordProgress = spring({
          fps,
          frame: frame - wordFrame,
          config: { damping: 14, stiffness: 180 },
          durationInFrames: 20,
        });
        const isHighlighted = highlightWords.includes(
          word.replace(/[.,!?]/g, ""),
        );
        return (
          <span
            key={i}
            className="font-inter"
            style={{
              fontSize,
              fontWeight: 800,
              color: isHighlighted ? C.green : color,
              opacity: wordProgress,
              transform: `translateY(${interpolate(wordProgress, [0, 1], [20, 0])}px)`,
              display: "inline-block",
              lineHeight: 1.3,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
