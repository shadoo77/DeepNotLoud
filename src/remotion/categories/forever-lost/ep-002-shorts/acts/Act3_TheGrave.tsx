import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Img,
  staticFile,
  interpolate,
} from "remotion";
import { Audio } from "@remotion/media";
import { TiktokCaptions } from "@/components/atoms/TiktokCaptions";
import { CountUp } from "@/components/atoms/CountUp";
import { getPhraseFrames } from "@/lib/utils";
import {
  VO_START_FRAME,
  TRASCRIPT_DATA_ACT3 as TRASCRIPT_DATA,
} from "../constants";

const ASSET = "assets/forever-lost/ep-002";
const SHORT = "assets/forever-lost/ep-002/images/short";

export const Act3_TheGrave: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const frame52000 = getPhraseFrames({
    phrase: "52,000",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  const frameShatter = getPhraseFrames({
    phrase: "shatter",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  const frameGrave = getPhraseFrames({
    phrase: "grave",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  const badge52k = spring({
    frame: Math.max(0, frame - frame52000),
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const weightOpacity = interpolate(
    frame,
    [frameShatter - 15, frameShatter + 15],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const shipOpacity = interpolate(
    frame,
    [frameShatter - 15, frameShatter + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const portholeOpacity = interpolate(
    frame,
    [frameGrave - 15, frameGrave + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const highlightedWords = ["52,000", "1,500"];

  return (
    <AbsoluteFill style={{ backgroundColor: "var(--color-abyssBlack)" }}>
      <AbsoluteFill style={{ opacity: weightOpacity }}>
        <Img
          src={staticFile(`${SHORT}/img_shorts_act3_weight_scale.jpeg`)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: shipOpacity }}>
        <Img
          src={staticFile(`${SHORT}/img_shorts_act3_ship_split.jpeg`)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: portholeOpacity }}>
        <Img
          src={staticFile(`${SHORT}/img_shorts_act3_porthole.jpeg`)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      {frame52000 > 0 && (
        <div
          style={{
            position: "absolute",
            top: "12%",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: interpolate(Math.max(0, frame - frame52000), [0, 12], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ transform: `scale(${badge52k})` }}>
            <CountUp
              to={52000}
              durationInFrames={fps * 2}
              delay={0}
              fontSize={56}
              suffix=" TONS"
            />
          </div>
        </div>
      )}

      <Audio
        src={staticFile(`${ASSET}/voices/vo/short/vo_scene3.wav`)}
        volume={0.85}
      />
      <TiktokCaptions
        transcript={TRASCRIPT_DATA}
        highlightedWords={highlightedWords}
        position="bottom-center"
        startFrame={0}
        switchCaptionsEveryMs={1500}
      />
    </AbsoluteFill>
  );
};
