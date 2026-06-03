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
import { getPhraseFrames } from "@/lib/utils";
import {
  VO_START_FRAME,
  TRASCRIPT_DATA_ACT1 as TRASCRIPT_DATA,
} from "../constants";

const ASSET = "assets/forever-lost/ep-001";
const SHORT = "assets/forever-lost/ep-001/images/short";

export const Act1_ImpossibleDepth: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === VOICE-TRIGGERED TIMINGS ===
  const frame380 = getPhraseFrames({
    phrase: "380",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  const frame385 = getPhraseFrames({
    phrase: "385",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  // === ANIMATIONS ===

  // Bow: slow zoom in
  const bowZoom = interpolate(frame, [0, fps * 8], [1, 1.15], {
    extrapolateRight: "clamp",
  });

  // Depth column: slow pan down (starts at 6s)
  const depthZoom = interpolate(frame, [fps * 6, fps * 14], [1, 1.2], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const depthPanY = interpolate(frame, [fps * 6, fps * 14], [0, -30], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Badge pop-in
  const badge380 = spring({
    frame: Math.max(0, frame - frame380),
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const badge385 = spring({
    frame: Math.max(0, frame - frame385),
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  // Subtle screen shake on "crushing"
  const shakeX = 0;

  // === LAYER TRANSITIONS (time-based) ===
  const bowOpacity = interpolate(frame, [fps * 5, fps * 7], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const depthOpacity = interpolate(frame, [fps * 5, fps * 7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const highlightedWords = ["3.8", "380", "385"];

  return (
    <AbsoluteFill
      className="bg-abyssBlack overflow-hidden"
      style={{ transform: `translateX(${shakeX}px)` }}
    >
      {/* === LAYER 1: Bow === */}
      <AbsoluteFill style={{ opacity: bowOpacity }}>
        <Img
          src={staticFile(`${SHORT}/img_shorts_act1_bow.jpeg`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${bowZoom})`,
            transformOrigin: "50% 40%",
          }}
        />
      </AbsoluteFill>

      {/* === LAYER 2: Depth column === */}
      <AbsoluteFill style={{ opacity: depthOpacity }}>
        <Img
          src={staticFile(`${SHORT}/img_shorts_act1_depth_column.jpeg`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${depthZoom}) translateY(${depthPanY}px)`,
            transformOrigin: "50% 50%",
          }}
        />
      </AbsoluteFill>

      {/* === 380 ATM badge === */}
      {frame380 > 0 && (
        <div
          style={{
            position: "absolute",
            top: "35%",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: interpolate(
              Math.max(0, frame - frame380),
              [0, 12],
              [0, 1],
              { extrapolateRight: "clamp" },
            ),
          }}
        >
          <div
            style={{
              backgroundColor: "oklch(0.22 0.04 260 / 0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--color-oceanBlue)",
              borderRadius: "12px",
              padding: "16px 24px",
              transform: `scale(${badge380})`,
            }}
          >
            <div
              style={{
                color: "var(--color-biolumTeal)",
                fontSize: 48,
                fontFamily: "monospace",
                fontWeight: "bold",
              }}
            >
              380 ATM
            </div>
            <div
              style={{
                color: "var(--color-surfaceWhite)",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              Water Pressure
            </div>
          </div>
        </div>
      )}

      {/* === 385 KG badge === */}
      {frame385 > 0 && (
        <div
          style={{
            position: "absolute",
            top: "55%",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: interpolate(
              Math.max(0, frame - frame385),
              [0, 12],
              [0, 1],
              { extrapolateRight: "clamp" },
            ),
          }}
        >
          <div
            style={{
              backgroundColor: "oklch(0.22 0.04 260 / 0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--color-rustOrange)",
              borderRadius: "12px",
              padding: "16px 24px",
              transform: `scale(${badge385})`,
            }}
          >
            <div
              style={{
                color: "var(--color-rustOrange)",
                fontSize: 48,
                fontFamily: "monospace",
                fontWeight: "bold",
              }}
            >
              385 KG
            </div>
            <div
              style={{
                color: "var(--color-surfaceWhite)",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              per cm²
            </div>
          </div>
        </div>
      )}

      {/* === AUDIO === */}
      <Audio
        src={staticFile(`${ASSET}/voices/sfx/sfx_sub_bass_rumble.mp3`)}
        volume={0.25}
      />
      <Audio
        src={staticFile(`${ASSET}/voices/vo/short/vo_scene1.mp3`)}
        volume={0.85}
      />

      {/* === CAPTIONS === */}
      <TiktokCaptions
        transcript={TRASCRIPT_DATA}
        highlightedWords={highlightedWords}
        position="youtube-shorts"
        startFrame={0}
        switchCaptionsEveryMs={1500}
      />
    </AbsoluteFill>
  );
};
