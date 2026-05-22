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
import { TiktokCaptions } from "@/components/atoms/TiktokCaptions";
import { ASSET_PATH } from "../../constants";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, SCENE_DURATION], [1.0, 1.08], {
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill>
      <Audio src={staticFile(`${ASSET_PATH}/audio/vo/short/ep02_s1.wav`)} />
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/explosion_distant.wav`)}
        volume={0.8}
      />

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
          className="font-bebas text-offWhite text-center text-8xl tracking-[0.15em]"
          style={{ opacity: titleOpacity }}
        >
          CHERNOBYL
        </div>
        <div
          className="font-inter text-offWhite text-center text-[28px] font-normal tracking-[0.15em]"
          style={{ opacity: subtitleOpacity }}
        >
          UKRAINE · 1986
        </div>
      </AbsoluteFill>

      <TiktokCaptions
        transcript={TRASCRIPT_DATA}
        highlightedWords={["exploded", "forever"]}
        position="youtube-shorts"
        startFrame={0}
        switchCaptionsEveryMs={1500}
      />
    </AbsoluteFill>
  );
};
