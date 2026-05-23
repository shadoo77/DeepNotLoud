import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";
import { C } from "../constants";

interface Props {
  title: string;
  subtitle?: string;
  startFrame?: number;
  exitFrame?: number;
  accentColor?: string;
}

export const LowerThird: React.FC<Props> = ({
  title,
  subtitle,
  startFrame = 0,
  exitFrame,
  accentColor = C.green,
}) => {
  const frame = useCurrentFrame();

  const enterProgress = interpolate(
    frame,
    [startFrame, startFrame + 20],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );
  const exitProgress = exitFrame
    ? interpolate(frame, [exitFrame, exitFrame + 15], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.in(Easing.cubic),
      })
    : 0;

  const progress = enterProgress - exitProgress;
  const translateX = interpolate(progress, [0, 1], [-500, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      className="absolute bottom-20 left-16 flex flex-row"
      style={{
        transform: `translateX(${translateX}px)`,
        opacity,
      }}
    >
      <div
        className="mr-3.5 rounded-sm"
        style={{ width: 5, background: accentColor }}
      />
      <div
        className="rounded-md px-6 py-3"
        style={{ background: C.panel }}
      >
        <div
          className="font-bebas text-white"
          style={{ fontSize: 32, letterSpacing: 3 }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            className="font-inter mt-0.5"
            style={{ fontSize: 18, color: "rgba(240,238,228,0.7)", fontWeight: 400 }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};
