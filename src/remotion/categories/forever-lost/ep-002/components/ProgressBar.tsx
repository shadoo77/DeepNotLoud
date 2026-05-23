import { interpolate, useCurrentFrame, Easing } from "remotion";
import { C } from "../constants";

interface Props {
  startFrame?: number;
  duration?: number;
  fillColor?: string;
  bgColor?: string;
  height?: number;
  width?: number;
  label?: string;
  targetPercent?: number; // 0–100
}

export const ProgressBar: React.FC<Props> = ({
  startFrame = 0,
  duration = 45,
  fillColor = C.green,
  bgColor = "rgba(255,255,255,0.1)",
  height = 12,
  width = 600,
  label,
  targetPercent = 100,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, targetPercent],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );

  return (
    <div>
      {label && (
        <div
          style={{
            fontFamily: "Inter",
            fontSize: 18,
            color: C.white,
            marginBottom: 6,
            fontWeight: 600,
          }}
        >
          {label}
        </div>
      )}
      <div
        style={{
          width,
          height,
          background: bgColor,
          borderRadius: height / 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: fillColor,
            borderRadius: height / 2,
          }}
        />
      </div>
    </div>
  );
};
