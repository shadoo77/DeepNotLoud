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
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { getPhraseFrames } from "@/lib/utils";
import { SCENE_DURATION, TRASCRIPT_DATA } from "./constants";
import { ASSET_PATH } from "@/remotion/categories/forever-lost/ep-002-shorts/constants";

export const Scene2Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const frame400 = getPhraseFrames({
    phrase: "400",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: 0,
  }).from;

  const frame200 = getPhraseFrames({
    phrase: "200",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: 0,
  }).from;

  const frame600 = getPhraseFrames({
    phrase: "600000",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: 0,
  }).from;

  const badge400 = spring({
    frame: Math.max(0, frame - frame400),
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const badge200 = spring({
    frame: Math.max(0, frame - frame200),
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const badge600 = spring({
    frame: Math.max(0, frame - frame600),
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const currentMs = (frame / fps) * 1000;
  const isVODuring = TRASCRIPT_DATA.some(
    (t) => currentMs >= t.startMs && currentMs < t.endMs,
  );
  const geigerBase = isVODuring ? 0.15 : 0.25;
  const geigerPulse = interpolate(frame % 120, [0, 60, 120], [0.9, 1, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bgScale = interpolate(frame, [0, SCENE_DURATION], [1.0, 1.08], {
    extrapolateRight: "clamp",
  });
  const bgOpacity = interpolate(
    frame,
    [0, 30, SCENE_DURATION - 30, SCENE_DURATION],
    [0, 0.7, 0.4, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const geigerFade = interpolate(
    frame,
    [SCENE_DURATION - 60, SCENE_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const geigerVolume = geigerBase * geigerPulse * geigerFade;

  return (
    <AbsoluteFill style={{ backgroundColor: "var(--color-abyssBlack)" }}>
      <Audio src={staticFile(`${ASSET_PATH}/audio/vo/short/ep02_s2.wav`)} />
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/geiger_loop.wav`)}
        volume={geigerVolume}
        loop
      />

      <AbsoluteFill>
        <Img
          src={staticFile(`${ASSET_PATH}/images/short/ep02_s2_texture.jpeg`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: bgOpacity,
            transform: `scale(${bgScale})`,
            transformOrigin: "center center",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8))",
        }}
      />

      {/* ×400 badge */}
      {frame400 > 0 && (
        <div
          className="absolute inset-x-0 flex justify-center"
          style={{
            top: "25%",
            opacity: interpolate(
              Math.max(0, frame - frame400),
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
              border: "1px solid var(--color-toxicGreen)",
              transform: `scale(${badge400})`,
            }}
          >
            <div className="text-toxicGreen text-center font-mono text-7xl font-bold">
              ×400
            </div>
            <div className="text-offWhite text-center text-2xl font-semibold">
              Hiroshima bombs of radiation
            </div>
          </div>
        </div>
      )}

      {/* 200t badge */}
      {frame200 > 0 && (
        <div
          className="absolute inset-x-0 flex justify-center"
          style={{
            top: "45%",
            opacity: interpolate(
              Math.max(0, frame - frame200),
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
              transform: `scale(${badge200})`,
            }}
          >
            <div className="text-offWhite text-center font-mono text-7xl font-bold">
              200t
            </div>
            <div className="text-surfaceWhite text-center text-2xl font-semibold">
              nuclear fuel — still inside
            </div>
          </div>
        </div>
      )}

      {/* 600K+ badge */}
      {frame600 > 0 && (
        <div
          className="absolute inset-x-0 flex justify-center"
          style={{
            top: "65%",
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
              600K+
            </div>
            <div className="text-surfaceWhite text-center text-2xl font-semibold">
              cleanup workers deployed
            </div>
          </div>
        </div>
      )}

      <YouTubeCaptions
        transcript={TRASCRIPT_DATA}
        highlightedWords={["400", "200"]}
        position="youtube-shorts"
        startFrame={0}
        mode="sentence"
      />
    </AbsoluteFill>
  );
};
