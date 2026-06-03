import {
  AbsoluteFill,
  Img,
  Sequence,
  useCurrentFrame,
  staticFile,
  interpolate,
} from "remotion";
import { Audio } from "@remotion/media";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { TRASCRIPT_DATA, VO_START_FRAME, SCENE_DURATION } from "./constants";
import { ASSET_PATH } from "../../constants";

export const Scene7Closer: React.FC = () => {
  const frame = useCurrentFrame();

  const imgY = interpolate(frame, [0, SCENE_DURATION], [10, 0], {
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const blackOverlay = interpolate(
    frame,
    [SCENE_DURATION - 20, SCENE_DURATION],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill className="bg-ash">
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/vo/short/ep02_s7.mp3`)}
        from={VO_START_FRAME}
      />
      <Sequence from={180} premountFor={10}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/heartbeat_slow.mp3`)}
          volume={0.4}
        />
      </Sequence>

      <AbsoluteFill>
        <Img
          src={staticFile(`${ASSET_PATH}/images/short/ep02_s7_sky.jpeg`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `translateY(${imgY}px)`,
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill style={{ background: "rgba(0,0,0,0.35)" }} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div
          className="font-bebas text-center text-9xl tracking-wider text-white"
          style={{
            opacity: titleOpacity,
          }}
        >
          FOREVER LOST
        </div>
        <div className="text-center" style={{ opacity: subtitleOpacity }}>
          <span className="font-inter text-4xl font-semibold tracking-wider text-white">
            Episode 2 · Chernobyl
          </span>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background: "var(--color-ash)",
          opacity: blackOverlay,
          pointerEvents: "none",
        }}
      />

      <YouTubeCaptions
        transcript={TRASCRIPT_DATA}
        highlightedWords={["outlive", "children", "problem", "fact", "earth"]}
        position="youtube-shorts"
        startFrame={VO_START_FRAME}
        mode="sentence"
        showOverlay
      />
    </AbsoluteFill>
  );
};
