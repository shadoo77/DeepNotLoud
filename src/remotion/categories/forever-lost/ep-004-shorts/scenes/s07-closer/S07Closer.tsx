import {
  AbsoluteFill,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { Audio } from "@remotion/media";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { TRASCRIPT_DATA } from "./constants";

const ASSET_PATH = "assets/forever-lost/ep-004";

export const S07Closer: React.FC = () => {
  const frame = useCurrentFrame();
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const endFade = interpolate(frame, [380, 426], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const shutterFlash = interpolate(frame, [120, 124, 128], [0, 0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="overflow-hidden"
      style={{ backgroundColor: "#08080f" }}
    >
      <Img
        src={staticFile(
          `${ASSET_PATH}/images/short/ep004-s07-dark-treeline.jpeg`,
        )}
        className="size-full object-cover"
        style={{ opacity: bgOpacity }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
        }}
      />
      <AbsoluteFill
        style={{ backgroundColor: "white", opacity: shutterFlash }}
      />
      <AbsoluteFill
        style={{ opacity: endFade, backgroundColor: "#08080f" }}
        className="pointer-events-none"
      />
      <Sequence>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/camera-shutter.mp3`)}
          volume={(f) =>
            interpolate(f, [120, 122, 130], [0, 0.8, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
        <YouTubeCaptions
          transcript={TRASCRIPT_DATA}
          highlightedWords={["cameras", "photo", "darkness", "blur", "died"]}
          position="youtube-shorts"
          fontSize="small"
          startFrame={0}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
