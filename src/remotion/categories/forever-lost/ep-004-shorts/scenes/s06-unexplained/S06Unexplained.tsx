import { AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame, interpolate } from "remotion";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { TRASCRIPT_DATA } from "./constants";

const ASSET_PATH = "assets/forever-lost/ep-004";

export const S06Unexplained: React.FC = () => {
  const frame = useCurrentFrame();
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="overflow-hidden" style={{ backgroundColor: "#08080f" }}>
      <Img
        src={staticFile(`${ASSET_PATH}/images/short/ep004-s06-document-soviet.jpeg`)}
        className="size-full object-cover"
        style={{ opacity: bgOpacity }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%)" }}
      />
      <Sequence>
        <YouTubeCaptions
          transcript={TRASCRIPT_DATA}
          highlightedWords={["reopened", "verdict", "avalanche", "nobody", "agrees"]}
          position="youtube-shorts"
          fontSize="small"
          startFrame={0}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
