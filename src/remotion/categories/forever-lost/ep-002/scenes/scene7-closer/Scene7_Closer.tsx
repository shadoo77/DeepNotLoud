import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Audio } from "@remotion/media";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { ASSET_PATH, C } from "../../constants";
import { TRASCRIPT_DATA, SCENE_DURATION } from "./constants";

export const Scene7Closer: React.FC = () => {
  const frame = useCurrentFrame();

  const driftY = interpolate(frame, [0, SCENE_DURATION], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [105, 125], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeToBlack = interpolate(
    frame,
    [SCENE_DURATION - 30, SCENE_DURATION],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Audio src={staticFile(`${ASSET_PATH}/audio/vo/ep02L_s7.mp3`)} />

      <Sequence from={360} durationInFrames={22}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/heartbeat_slow.mp3`)}
          volume={0.4}
        />
      </Sequence>

      <Img
        src={staticFile(`${ASSET_PATH}/images/ep02L_s7_sky.jpeg`)}
        className="h-full w-full object-cover"
        style={{ transform: `translateY(${driftY}px)` }}
      />

      <AbsoluteFill style={{ backgroundColor: "rgba(0,0,0,0.35)" }} />

      <AbsoluteFill className="items-center justify-center">
        <div
          className="font-bebas text-center text-white"
          style={{ fontSize: 80, letterSpacing: 12, opacity: titleOpacity }}
        >
          FOREVER LOST
        </div>
        <div
          className="font-inter mt-3 text-center text-white/90"
          style={{ fontSize: 28, opacity: subtitleOpacity }}
        >
          Episode 2 · Chernobyl
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ backgroundColor: C.bg, opacity: fadeToBlack }} />

      <YouTubeCaptions
        transcript={TRASCRIPT_DATA}
        highlightedWords={["outlive", "children", "problem", "fact", "nothing"]}
        position="bottom-center"
        mode="sentence"
        showOverlay
      />
    </AbsoluteFill>
  );
};
