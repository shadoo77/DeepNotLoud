import {
  AbsoluteFill,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  spring,
} from "remotion";
import { Audio } from "@remotion/media";
import { loadFont } from "@remotion/google-fonts/Cinzel";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { SceneBadges } from "@/components/atoms/SceneBadges";
import { getPhraseFrames } from "@/lib/utils";
import { C, ASSET_PATH } from "../../constants";
import { TRASCRIPT_DATA, SCENE_DURATION } from "./constants";
import { BADGES } from "./badges";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const sceneDuration = SCENE_DURATION;

const hookWords = [
  "A",
  "book",
  "exists",
  "that",
  "no",
  "human",
  "has",
  "ever",
  "decoded.",
];
const WORD_STAGGER = 8;

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const VO_AUDIO_OFFSET = 6;

  const frameNotOneWord = getPhraseFrames({
    phrase: "not one word",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_AUDIO_OFFSET,
    bufferFrames: 12,
  });

  const frameHookLine = getPhraseFrames({
    phrase: "a book exists",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_AUDIO_OFFSET,
    bufferFrames: 4,
  });

  const bgScale = interpolate(frame, [0, sceneDuration], [1.0, 1.08], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const titleOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const impactProgress = spring({
    frame: Math.max(0, frame - frameNotOneWord.from),
    fps,
    config: { damping: 12, stiffness: 180 },
  });
  const impactY = interpolate(impactProgress, [0, 1], [60, 0]);
  const impactScale = interpolate(impactProgress, [0, 0.7, 1], [0.8, 1.05, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const impactOpacity = interpolate(
    Math.max(0, frame - frameNotOneWord.from),
    [0, 20],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const subtitleOpacity = interpolate(
    frame,
    [frameNotOneWord.from + 20, frameNotOneWord.from + 50],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const goldFlareOpacity = interpolate(
    frame,
    [170, 200, 290, 320],
    [0, 0.35, 0.35, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const thumbnailOpacity = interpolate(frame, [0, 6, 18], [1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const drawProgress = interpolate(Math.max(0, frame - 230), [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const drawLineOpacity = interpolate(
    Math.max(0, frame - 270),
    [0, 15],
    [0.4, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill className="overflow-hidden" style={{ backgroundColor: C.bg }}>
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: `scale(${bgScale})` }}
      >
        <Img
          src={staticFile(
            `${ASSET_PATH}/images/short/ep003_manuscript_page.jpeg`,
          )}
          className="size-full object-cover"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          top: 0,
          right: 0,
          width: 300,
          height: 300,
          background: `radial-gradient(circle at top right, ${C.gold}26, transparent 70%)`,
          opacity: goldFlareOpacity,
        }}
      />
      <div
        className="pointer-events-none absolute flex justify-center"
        style={{
          top: 120,
          width: "100%",
          opacity: drawLineOpacity,
        }}
      >
        <div
          style={{
            width: `${drawProgress * 180}px`,
            height: 1,
            backgroundColor: C.gold,
            opacity: 0.4,
          }}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 flex items-start justify-center"
        style={{ paddingTop: 80 }}
      >
        <span
          className="text-3xl tracking-widest"
          style={{
            fontFamily: cinzelFont,
            color: C.gold,
            opacity: titleOpacity,
          }}
        >
          FOREVER LOST
        </span>
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          style={{
            textAlign: "center",
            padding: "0 40px",
          }}
        >
          <span
            className="text-4xl leading-relaxed font-black tracking-wide"
            style={{ fontFamily: cinzelFont, color: C.white }}
          >
            {hookWords.map((word, i) => {
              const wordStart = frameHookLine.from + i * WORD_STAGGER;
              const wordOpacity = interpolate(
                frame,
                [wordStart, wordStart + 12],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              );
              const wordY = interpolate(
                frame,
                [wordStart, wordStart + 12],
                [12, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              );
              return (
                <span
                  key={i}
                  style={{
                    opacity: wordOpacity,
                    display: "inline-block",
                    transform: `translateY(${wordY}px)`,
                    marginRight: 8,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </span>
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 flex items-end justify-center"
        style={{ paddingBottom: 180, opacity: impactOpacity }}
      >
        <div
          style={{
            transform: `translateY(${impactY}px) scale(${impactScale})`,
            textAlign: "center",
          }}
        >
          <p
            className="m-0 text-5xl font-black"
            style={{ fontFamily: cinzelFont, color: C.white }}
          >
            Not one word.
          </p>
          <p
            className="m-0 mt-2 text-2xl"
            style={{
              fontFamily: cinzelFont,
              color: C.gold,
              opacity: subtitleOpacity,
            }}
          >
            In six hundred years.
          </p>
        </div>
      </div>
      <SceneBadges
        badges={BADGES}
        transcriptData={TRASCRIPT_DATA}
        voiceOverStartFrame={VO_AUDIO_OFFSET}
      />
      <AbsoluteFill
        style={{
          opacity: thumbnailOpacity,
          zIndex: 50,
        }}
      >
        <Img
          src={staticFile(`${ASSET_PATH}/images/short/thumbnail-9:16.jpeg`)}
          className="h-full w-full object-cover"
        />
      </AbsoluteFill>
      <Sequence from={6} durationInFrames={60}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/paper_rustle.wav`)}
          volume={(f) =>
            interpolate(f, [0, 60], [0.4, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>
      <Sequence from={6}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/vo/short/ep003_s1_hook.wav`)}
          volume={1}
        />
        <YouTubeCaptions
          transcript={TRASCRIPT_DATA}
          highlightedWords={["book", "decoded", "word", "hundred"]}
          position="youtube-shorts"
          fontSize="small"
          startFrame={0}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
