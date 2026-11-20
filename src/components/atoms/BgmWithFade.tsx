import { interpolate, staticFile } from "remotion";
import { Audio } from "@remotion/media";

interface BgmWithFadeProps {
  totalFrames: number;
  srcPath: string;
  volume?: number;
  fadeInFrames?: number;
  fadeOutFrames?: number;
  loop?: boolean;
}

const DEFAULT_VOLUME = 0.2;
const DEFAULT_FADE_FRAMES = 45;

export default function BgmWithFade({
  totalFrames,
  srcPath,
  volume = DEFAULT_VOLUME,
  fadeInFrames = DEFAULT_FADE_FRAMES,
  fadeOutFrames = DEFAULT_FADE_FRAMES,
  loop = true,
}: BgmWithFadeProps) {
  // interpolate() requires a strictly increasing input range, and Remotion
  // rejects non-finite volume values. Guard against `fadeOutFrames={0}` and
  // clips shorter than the fade windows.
  const fadeOutStart = Math.max(fadeInFrames + 1, totalFrames - fadeOutFrames);
  const end = Math.max(fadeOutStart + 1, totalFrames);

  return (
    <Audio
      src={staticFile(srcPath)}
      volume={(f) =>
        interpolate(
          f,
          [0, fadeInFrames, fadeOutStart, end],
          [0, volume, volume, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        )
      }
      loop={loop}
      loopVolumeCurveBehavior={loop ? "extend" : undefined}
    />
  );
}
