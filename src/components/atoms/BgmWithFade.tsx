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
  return (
    <Audio
      src={staticFile(srcPath)}
      volume={(f) =>
        interpolate(
          f,
          [0, fadeInFrames, totalFrames - fadeOutFrames, totalFrames],
          [0, volume, volume, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        )
      }
      loop={loop}
      loopVolumeCurveBehavior={loop ? "extend" : undefined}
    />
  );
}
