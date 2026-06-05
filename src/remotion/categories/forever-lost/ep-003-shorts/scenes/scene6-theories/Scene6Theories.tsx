import {
  AbsoluteFill,
  Img,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { Audio } from "@remotion/media";
import { loadFont } from "@remotion/google-fonts/Cinzel";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { SceneBadges } from "@/components/atoms/SceneBadges";
import { getPhraseFrames } from "@/lib/utils";
import { C, ASSET_PATH } from "../../constants";
import { TRASCRIPT_DATA, VO_START_FRAME, SCENE_DURATION } from "./constants";
import { BADGES } from "./badges";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const sceneDuration = SCENE_DURATION;

const THEORIES = [
  {
    emoji: "\u{1F480}",
    title: "Medieval Hoax",
    pillColor: "#888888",
    pillBorder: "#666666",
  },
  {
    emoji: "\u{1F33F}",
    title: "Lost Language",
    pillColor: "#6B8E6B",
    pillBorder: "#4A7A4A",
  },
  {
    emoji: "\u{2695}\uFE0F",
    title: "Coded Medical Manual",
    pillColor: "#6B8E9E",
    pillBorder: "#4A7A8E",
  },
];

const PILL_FADE_DURATION = 10;

export const Scene6Theories: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phraseHoax = getPhraseFrames({
    phrase: "hoax",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const phraseLost = getPhraseFrames({
    phrase: "lost",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const phraseMedical = getPhraseFrames({
    phrase: "medical",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });

  const pillTriggers = [
    Math.max(0, phraseHoax.from),
    Math.max(0, phraseLost.from),
    Math.max(0, phraseMedical.from),
  ];

  const bgScale = interpolate(frame, [0, sceneDuration], [1.0, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  const vignetteOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // FIX: Gentle fade in to a static 30% opacity (no infinite pulse)
  const watermarkOpacity = interpolate(frame, [0, 40], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="overflow-hidden" style={{ backgroundColor: C.bg }}>
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          transform: `scale(${bgScale})`,
          transformOrigin: "center",
        }}
      >
        <Img
          src={staticFile(
            `${ASSET_PATH}/images/short/ep003_plant_botanical.jpeg`,
          )}
          className="size-full object-cover"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: vignetteOpacity,
          background:
            "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      <div className="pointer-events-none absolute flex size-full items-center justify-center">
        <span
          style={{
            fontFamily: cinzelFont,
            fontSize: 500,
            fontWeight: 900,
            color: C.white,
            opacity: watermarkOpacity,
            lineHeight: 1,
          }}
        >
          ?
        </span>
      </div>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6 px-8">
        {THEORIES.map((theory, idx) => {
          const entryFrame = Math.max(0, frame - pillTriggers[idx]);
          const pillSettle = spring({
            frame: entryFrame,
            fps,
            config: { damping: 12, stiffness: 180 },
          });
          const opacity = interpolate(
            entryFrame,
            [0, PILL_FADE_DURATION],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          );
          const y = interpolate(pillSettle, [0, 1], [25, 0]);

          return (
            <div
              key={theory.title}
              className="flex w-full items-center gap-4 rounded-2xl px-6 py-4"
              style={{
                opacity,
                transform: `translateY(${y}px)`,
                backgroundColor: "rgba(26,26,26,0.75)",
                border: `1.5px solid ${theory.pillBorder}`,
              }}
            >
              <span className="text-5xl">{theory.emoji}</span>
              <span
                className="text-3xl font-bold tracking-wider"
                style={{ fontFamily: cinzelFont, color: theory.pillColor }}
              >
                {theory.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* FIX: Removed the display:none SFX wrapper. SFX removed entirely to match the "Reflective/Quiet" spec */}

      <SceneBadges
        badges={BADGES}
        transcriptData={TRASCRIPT_DATA}
        voiceOverStartFrame={VO_START_FRAME}
      />

      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/vo/short/ep003_s6_theories.wav`)}
          volume={1}
        />
        <YouTubeCaptions
          transcript={TRASCRIPT_DATA}
          highlightedWords={[
            "hoax",
            "language",
            "medical",
            "manual",
            "code",
            "author",
          ]}
          position="youtube-shorts"
          fontSize="small"
          startFrame={0}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
