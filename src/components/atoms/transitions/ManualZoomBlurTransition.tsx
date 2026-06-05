import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type ManualTransitionProps = {
  durationInFrames: number;
  transitionInFrames: number;
  fadeIn?: boolean;
  fadeOut?: boolean;
  children: React.ReactNode;
};

export const ManualZoomBlurTransition: React.FC<ManualTransitionProps> = ({
  durationInFrames,
  transitionInFrames,
  fadeIn = true,
  fadeOut = true,
  children,
}) => {
  const frame = useCurrentFrame();

  const inProgress = fadeIn
    ? interpolate(frame, [0, transitionInFrames], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  const outProgress = fadeOut
    ? interpolate(frame, [durationInFrames - transitionInFrames, durationInFrames], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const inOpacity = inProgress;
  const outOpacity = 1 - outProgress;
  const opacity = Math.min(inOpacity, outOpacity);

  const inScale = fadeIn
    ? interpolate(frame, [0, transitionInFrames], [1.06, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  const outScale = fadeOut
    ? interpolate(frame, [durationInFrames - transitionInFrames, durationInFrames], [1, 1.04], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  const inBlur = fadeIn
    ? interpolate(frame, [0, transitionInFrames], [10, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const outBlur = fadeOut
    ? interpolate(frame, [durationInFrames - transitionInFrames, durationInFrames], [0, 8], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `scale(${inScale * outScale})`,
        filter: `blur(${Math.max(inBlur, outBlur)}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
