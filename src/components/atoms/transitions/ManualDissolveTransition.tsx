import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";

type ManualTransitionProps = {
  durationInFrames: number;
  transitionInFrames: number;
  fadeIn?: boolean;
  fadeOut?: boolean;
  children: React.ReactNode;
};

const DISSOLVE_STEPS = 8;

export const ManualDissolveTransition: React.FC<ManualTransitionProps> = ({
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

  const noiseBucket = random(`dissolve-${frame}`);
  const inQuantized = Math.floor((inProgress + noiseBucket * 0.04) * DISSOLVE_STEPS) / DISSOLVE_STEPS;
  const outQuantized =
    Math.floor((Math.max(0, 1 - outProgress) + noiseBucket * 0.04) * DISSOLVE_STEPS) / DISSOLVE_STEPS;

  return <AbsoluteFill style={{ opacity: Math.min(inQuantized, outQuantized) }}>{children}</AbsoluteFill>;
};
