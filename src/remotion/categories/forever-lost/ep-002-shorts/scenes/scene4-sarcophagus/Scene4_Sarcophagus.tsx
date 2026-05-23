import {
  AbsoluteFill,
  Img,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  spring,
  staticFile,
  interpolate,
} from "remotion";
import { Audio } from "@remotion/media";
import { TiktokCaptions } from "@/components/atoms/TiktokCaptions";
import { getPhraseFrames } from "@/lib/utils";
import { TRASCRIPT_DATA, VO_START_FRAME } from "./constants";
import { ASSET_PATH } from "../../constants";

export const Scene4Sarcophagus: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const parallaxY = interpolate(frame, [0, 30], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const frameBillion = getPhraseFrames({
    phrase: "2",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  const frame600 = getPhraseFrames({
    phrase: "600",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  const badgeBillion = spring({
    frame: Math.max(0, frame - frameBillion),
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const badge600 = spring({
    frame: Math.max(0, frame - frame600),
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const barProgress = Math.max(0, frame - VO_START_FRAME - 90);
  const barX = interpolate(barProgress, [0, 25], [-100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const barOpacity = interpolate(barProgress, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subLabelOpacity = interpolate(
    Math.max(0, frame - frameBillion - 20),
    [0, 20],
    [0, 1],
    { extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#1A1A1A" }}>
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/vo/short/ep02_s4.wav`)}
        from={VO_START_FRAME}
      />
      <Sequence from={5} premountFor={10}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/metal_groan.wav`)}
          volume={0.45}
        />
      </Sequence>

      <Img
        src={staticFile(`${ASSET_PATH}/images/short/ep02_s4_sarcophagus.jpeg`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `translateY(${parallaxY}px)`,
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.85))",
        }}
      />

      {frameBillion > 0 && (
        <div
          className="absolute inset-x-0 flex justify-center"
          style={{
            top: "30%",
            opacity: interpolate(
              Math.max(0, frame - frameBillion),
              [0, 12],
              [0, 1],
              { extrapolateRight: "clamp" },
            ),
          }}
        >
          <div
            className="rounded-xl px-6 py-4"
            style={{
              backgroundColor: "oklch(0.22 0.04 260 / 0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--color-offWhite)",
              transform: `scale(${badgeBillion})`,
            }}
          >
            <div className="font-bebas text-center text-[100px] leading-tight font-bold text-white">
              $2.7B
            </div>
            <div
              className="text-surfaceWhite text-center text-4xl font-semibold"
              style={{ opacity: subLabelOpacity }}
            >
              to build a steel dome over it
            </div>
          </div>
        </div>
      )}

      {frame600 > 0 && (
        <div
          className="absolute inset-x-0 flex justify-center"
          style={{
            top: "55%",
            opacity: interpolate(
              Math.max(0, frame - frame600),
              [0, 12],
              [0, 1],
              { extrapolateRight: "clamp" },
            ),
          }}
        >
          <div
            className="rounded-xl px-6 py-4"
            style={{
              backgroundColor: "oklch(0.22 0.04 260 / 0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--color-bloodRed)",
              transform: `scale(${badge600})`,
            }}
          >
            <div className="text-bloodRed text-center font-mono text-7xl font-bold">
              600,000 MEN
            </div>
            <div className="text-surfaceWhite text-center text-xl font-semibold">
              sent to clean it
            </div>
          </div>
        </div>
      )}

      <div
        className="absolute top-0 left-0 flex h-16 items-center"
        style={{
          width: "100%",
          backgroundColor: "var(--color-bloodRed)",
          opacity: barOpacity,
          transform: `translateX(${barX}%)`,
        }}
      >
        <div className="ml-8 font-mono text-4xl font-bold tracking-wider text-white">
          10,000 RÖNTGEN/HOUR — STILL INSIDE REACTOR 4
        </div>
      </div>

      <TiktokCaptions
        transcript={TRASCRIPT_DATA}
        highlightedWords={["robot", "radiation", "billion", "600", "men"]}
        position="youtube-shorts"
        startFrame={VO_START_FRAME}
        switchCaptionsEveryMs={1800}
      />
    </AbsoluteFill>
  );
};
