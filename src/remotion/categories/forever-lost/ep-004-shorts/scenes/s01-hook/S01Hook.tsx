import {
  AbsoluteFill,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { Audio } from "@remotion/media";
import { loadFont } from "@remotion/google-fonts/BebasNeue";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { SceneBadges } from "@/components/atoms/SceneBadges";
import { GlitchText } from "@/components/atoms/GlitchText";
import { DustParticles } from "@/components/atoms/DustParticles";
import { TRASCRIPT_DATA, SCENE_DURATION } from "./constants";
import { BADGES } from "./badges";
import { C } from "../../constants";

const { fontFamily: bebasFont } = loadFont();

const sceneDuration = SCENE_DURATION;
const ASSET_PATH = "assets/forever-lost/ep-004";

export const S01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s1Transcript = TRASCRIPT_DATA;

  const bgScale = interpolate(frame, [0, sceneDuration], [1.0, 1.12], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const bgOpacity = interpolate(frame, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const phrase1Trigger = 8;
  const phrase1Spring = spring({
    frame: Math.max(0, frame - phrase1Trigger),
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const phrase1Opacity = interpolate(
    Math.max(0, frame - phrase1Trigger),
    [0, 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const phrase2Trigger = 75;
  const phrase2Spring = spring({
    frame: Math.max(0, frame - phrase2Trigger),
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const phrase2Opacity = interpolate(
    Math.max(0, frame - phrase2Trigger),
    [0, 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const phrase3Trigger = 128;
  const glitchActive = frame >= phrase3Trigger;

  const fadeOutStart = 200;
  const fadeOutEnd = 220;
  const phraseFadeOut = interpolate(frame, [fadeOutStart, fadeOutEnd], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const phrase4Trigger = 230;
  const phrase4Spring = spring({
    frame: Math.max(0, frame - phrase4Trigger),
    fps,
    config: { damping: 14, stiffness: 150 },
  });
  const phrase4Opacity = interpolate(
    Math.max(0, frame - phrase4Trigger),
    [0, 15],
    [0, 0.85],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const windVolume = (f: number) =>
    interpolate(
      f,
      [0, 30, sceneDuration - 30, sceneDuration],
      [0, 0.2, 0.2, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );

  return (
    <AbsoluteFill
      className="overflow-hidden"
      style={{ backgroundColor: C.bg }}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: `scale(${bgScale})`, opacity: bgOpacity }}
      >
        <Img
          src={staticFile(
            `${ASSET_PATH}/images/short/ep004-s01-mountain-dark.jpeg`,
          )}
          className="size-full object-cover"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      <DustParticles count={50} />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="text-center" style={{ padding: "0 60px" }}>
          <p
            className="m-0 text-7xl font-black uppercase"
            style={{
              fontFamily: bebasFont,
              color: C.text,
              opacity: phrase1Opacity * phraseFadeOut,
              transform: `scale(${phrase1Spring})`,
              letterSpacing: "0.05em",
            }}
          >
            NINE HIKERS.
          </p>

          <p
            className="m-0 mt-4 text-7xl font-black uppercase"
            style={{
              fontFamily: bebasFont,
              color: C.text,
              opacity: phrase2Opacity * phraseFadeOut,
              transform: `scale(${phrase2Spring})`,
              letterSpacing: "0.05em",
            }}
          >
            ONE MOUNTAIN.
          </p>

          {glitchActive && (
            <p
              className="m-0 mt-4 text-7xl font-black uppercase"
              style={{
                fontFamily: bebasFont,
                letterSpacing: "0.05em",
                opacity: phraseFadeOut,
              }}
            >
              <GlitchText
                text="NONE CAME BACK."
                triggerFrame={phrase3Trigger}
                color={C.red}
                className="text-7xl"
              />
            </p>
          )}

          <p
            className="m-0 mt-12 text-4xl font-bold uppercase"
            style={{
              fontFamily: bebasFont,
              color: C.muted,
              opacity: phrase4Opacity,
              transform: `scale(${phrase4Spring})`,
              letterSpacing: "0.03em",
            }}
          >
            What killed them has never been
            <br />
            officially explained.
          </p>
        </div>
      </div>

      <SceneBadges
        badges={BADGES}
        transcriptData={s1Transcript}
        voiceOverStartFrame={0}
      />

      <Sequence>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/wind-arctic.mp3`)}
          volume={windVolume}
        />
        <YouTubeCaptions
          transcript={s1Transcript}
          highlightedWords={["hikers", "mountain", "killed", "explained"]}
          position="youtube-shorts"
          fontSize="small"
          startFrame={0}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
