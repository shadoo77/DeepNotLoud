import { AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame, interpolate } from "remotion";
import { Audio } from "@remotion/media";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { TRASCRIPT_DATA } from "./constants";

const ASSET_PATH = "assets/forever-lost/ep-004";

export const S04Tent: React.FC = () => {
  const frame = useCurrentFrame();
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="overflow-hidden" style={{ backgroundColor: "#08080f" }}>
      <Img
        src={staticFile(`${ASSET_PATH}/images/short/ep004-s04-tent-in-snow.jpeg`)}
        className="size-full object-cover"
        style={{ opacity: bgOpacity }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)" }}
      />
      <Sequence>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/wind-arctic.mp3`)}
          volume={(f) => interpolate(f, [0, 30, 400, 431], [0, 0.2, 0.2, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        />
        <YouTubeCaptions
          transcript={TRASCRIPT_DATA}
          highlightedWords={["Rescuers", "fled", "subzero", "terrified"]}
          position="youtube-shorts"
          fontSize="small"
          startFrame={0}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
