import { interpolate, staticFile } from "remotion";
import { Audio } from "@remotion/media";

const BGM_FADE_FRAMES = 45;
const BGM_TARGET_VOLUME = 0.2;

export default function BgmWithFade({ totalFrames }: { totalFrames: number }) {
  const fadeInEnd = BGM_FADE_FRAMES;
  const fadeOutStart = totalFrames - BGM_FADE_FRAMES;
  console.log({ fadeInEnd, fadeOutStart, totalFrames });
  //  Safeguard: ensure fadeOutStart never overlaps with fadeInEnd
  //   const fadeInEnd = BGM_FADE_FRAMES;
  //   const fadeOutStart = Math.max(fadeInEnd, totalFrames - BGM_FADE_FRAMES);

  return (
    <Audio
      src={staticFile(
        "assets/forever-lost/ep-002/voices/bgm/bgm_scene0_cello.mp3",
      )}
      volume={(f) =>
        interpolate(
          f,
          [0, fadeInEnd, fadeOutStart, totalFrames],
          [0, BGM_TARGET_VOLUME, BGM_TARGET_VOLUME, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        )
      }
      loop
      loopVolumeCurveBehavior="extend"
    />
  );
}
