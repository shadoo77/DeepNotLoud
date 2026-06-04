import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  staticFile,
  Easing,
} from "remotion";
import { Audio } from "@remotion/media";
import { TRASCRIPT_DATA, SCENE_DURATION } from "./constants";
import { ASSET_PATH } from "../../constants";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, SCENE_DURATION], [1.0, 1.08], {
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const subtitleOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill>
      <Audio src={staticFile(`${ASSET_PATH}/audio/vo/short/ep02_s1.mp3`)} />
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/explosion_distant.mp3`)}
        volume={0.8}
      />

      {frame < 6 ? (
        <AbsoluteFill>
          <Img
            src={staticFile(`${ASSET_PATH}/images/short/thumbnail-9:16.jpeg`)}
            className="h-full w-full object-cover"
          />
        </AbsoluteFill>
      ) : (
        <>
          <AbsoluteFill>
            <Img
              src={staticFile(`${ASSET_PATH}/images/short/ep02_s1_aerial.jpeg`)}
              className="h-full w-full object-cover"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "center center",
              }}
            />
          </AbsoluteFill>

          <AbsoluteFill className="bg-gradient-to-b from-black/20 to-black/65" />

          <AbsoluteFill className="flex-col items-center justify-center gap-4">
            <div
              className="font-bebas text-offWhite text-center text-9xl font-bold tracking-[0.15em]"
              style={{ opacity: titleOpacity }}
            >
              CHERNOBYL
            </div>
            <div
              className="font-inter text-offWhite text-center text-4xl font-bold tracking-[0.15em]"
              style={{ opacity: subtitleOpacity }}
            >
              UKRAINE · 1986
            </div>
          </AbsoluteFill>
        </>
      )}

      <YouTubeCaptions
        transcript={TRASCRIPT_DATA}
        highlightedWords={["exploded", "forever"]}
        position="youtube-shorts"
        startFrame={0}
        mode="sentence"
      />
    </AbsoluteFill>
  );
};
