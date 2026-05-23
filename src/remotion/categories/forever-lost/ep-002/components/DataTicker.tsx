import { interpolate, useCurrentFrame, Easing } from "remotion";
import { C } from "../constants";

interface Props {
  from?: number;
  to: number;
  startFrame?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  fontSize?: number;
  color?: string;
  decimals?: number;
}

export const DataTicker: React.FC<Props> = ({
  from = 0,
  to,
  startFrame = 0,
  duration = 60,
  suffix = "",
  prefix = "",
  fontSize = 96,
  color = C.green,
  decimals = 0,
}) => {
  const frame = useCurrentFrame();
  const value = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [from, to],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    },
  );
  const display =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();

  return (
    <span className="font-mono" style={{ fontSize, color, fontWeight: 700 }}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};
