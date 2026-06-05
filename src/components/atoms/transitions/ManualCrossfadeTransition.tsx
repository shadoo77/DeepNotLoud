import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type ManualTransitionProps = {
  durationInFrames: number;
  transitionInFrames: number;
  fadeIn?: boolean;
  fadeOut?: boolean;
  children: React.ReactNode;
};

export const ManualCrossfadeTransition: React.FC<ManualTransitionProps> = ({
  durationInFrames,
  transitionInFrames,
  fadeIn = true,
  fadeOut = true,
  children,
}) => {
  const frame = useCurrentFrame();

  const inOpacity = fadeIn
    ? interpolate(frame, [0, transitionInFrames], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  const outOpacity = fadeOut
    ? interpolate(
        frame,
        [durationInFrames - transitionInFrames, durationInFrames],
        [1, 0],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        },
      )
    : 1;

  return <AbsoluteFill style={{ opacity: Math.min(inOpacity, outOpacity) }}>{children}</AbsoluteFill>;
};
