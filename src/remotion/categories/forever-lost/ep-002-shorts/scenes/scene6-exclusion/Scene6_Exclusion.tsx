import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  spring,
  staticFile,
  interpolate,
} from "remotion";
import { Audio } from "@remotion/media";
import { CountUp } from "@/components/atoms/CountUp";
import { getPhraseFrames } from "@/lib/utils";
import { TRASCRIPT_DATA, VO_START_FRAME } from "./constants";
import { ASSET_PATH } from "../../constants";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";

export const Scene6Exclusion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const frame50 = getPhraseFrames({
    phrase: "50",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  const frame20000 = getPhraseFrames({
    phrase: "20",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  const badge50 = spring({
    frame: Math.max(0, frame - frame50),
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const zoom = interpolate(frame, [0, fps * 8], [1.06, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const badgeOpacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const counterOpacity = interpolate(
    frame,
    [frame20000, frame20000 + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill className="bg-ash">
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/vo/short/ep02_s6.mp3`)}
        from={VO_START_FRAME}
      />
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/geiger_loop.mp3`)}
        volume={0.15}
        loop
      />

      <Img
        src={staticFile(
          `${ASSET_PATH}/images/short/ep02_s6_exclusion_zone.jpeg`,
        )}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${zoom})`,
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))",
        }}
      />

      <div
        className="absolute inset-x-0 flex justify-center"
        style={{ top: "10%", opacity: badgeOpacity }}
      >
        <div
          className="rounded-lg px-10 py-8 text-center"
          style={{
            backgroundColor: "oklch(0.22 0.04 260 / 0.8)",
            backdropFilter: "blur(8px)",
            border: "1px solid var(--color-toxicGreen)",
          }}
        >
          <span className="font-inter text-4xl font-bold text-white">
            EXCLUSION ZONE · 2,600 km²
          </span>
        </div>
      </div>

      {/* 50,000 PEOPLE badge */}
      {frame50 > 0 && (
        <div
          className="absolute inset-x-0 flex justify-center"
          style={{
            top: "20%",
            opacity: interpolate(
              Math.max(0, frame - frame50),
              [0, 12],
              [0, 1],
              { extrapolateRight: "clamp" },
            ),
          }}
        >
          <div
            className="rounded-lg px-10 py-8 text-center"
            style={{
              backgroundColor: "oklch(0.22 0.04 260 / 0.8)",
              backdropFilter: "blur(8px)",
              border: "1px solid var(--color-bloodRed)",
              transform: `scale(${badge50})`,
            }}
          >
            <span className="font-inter text-4xl font-bold text-white">
              50,000 PEOPLE
            </span>
          </div>
        </div>
      )}

      <AbsoluteFill className="items-center justify-center">
        <div style={{ opacity: counterOpacity }}>
          <CountUp
            from={0}
            to={20000}
            durationInFrames={fps * 4}
            delay={frame20000}
            fontSize={120}
            color="var(--color-toxicGreen)"
            suffix=""
          />
          <div
            className="font-inter mt-4 text-center text-4xl font-normal text-white/70"
            style={{
              opacity: interpolate(
                frame,
                [frame20000 + 30, frame20000 + 50],
                [0, 1],
                { extrapolateRight: "clamp" },
              ),
            }}
          >
            years until this land is safe again
          </div>
        </div>
      </AbsoluteFill>

      <YouTubeCaptions
        transcript={TRASCRIPT_DATA}
        highlightedWords={["50", "000", "three", "days", "20", "years"]}
        position="youtube-shorts"
        startFrame={VO_START_FRAME}
        mode="sentence"
      />
    </AbsoluteFill>
  );
};
