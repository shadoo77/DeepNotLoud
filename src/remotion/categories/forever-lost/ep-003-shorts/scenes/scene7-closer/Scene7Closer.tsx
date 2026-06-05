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
import { getPhraseFrames } from "@/lib/utils";
import { C, ASSET_PATH } from "../../constants";
import { TRASCRIPT_DATA, VO_START_FRAME, SCENE_DURATION } from "./constants";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const sceneDuration = SCENE_DURATION;

export const Scene7Closer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phraseSomewhere = getPhraseFrames({
    phrase: "Somewhere",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const phraseThey = getPhraseFrames({
    phrase: "They",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const phraseAnd = getPhraseFrames({
    phrase: "And",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const phraseProbably = getPhraseFrames({
    phrase: "probably",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });

  const line1From = Math.max(0, phraseSomewhere.from - 5);
  const line2From = Math.max(0, phraseThey.from);
  const line3From = Math.max(0, phraseAnd.from);
  const whisperFrom = phraseProbably.from;

  const bgScale = interpolate(frame, [0, sceneDuration], [1.0, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  const vignetteOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const silenceVolume = (f: number) => {
    const fadeIn = interpolate(f, [0, 60], [0, 0.15], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const fadeOut = interpolate(
      f,
      [sceneDuration - 60, sceneDuration - 20],
      [0.15, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
    return Math.min(fadeIn, fadeOut);
  };

  const line1FadeIn = interpolate(
    frame,
    [line1From, line1From + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const line1Dim = interpolate(
    frame,
    [line2From, line2From + 30],
    [1, 0.35],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const line1Opacity = Math.min(line1FadeIn, line1Dim);

  const line2FadeIn = interpolate(
    frame,
    [line2From, line2From + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const line2Dim = interpolate(
    frame,
    [line3From, line3From + 30],
    [1, 0.35],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const line2Opacity = Math.min(line2FadeIn, line2Dim);

  const line3FadeIn = interpolate(
    frame,
    [line3From, line3From + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const line3Whisper = interpolate(
    frame,
    [whisperFrom, whisperFrom + 60],
    [1, 0.4],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const line3Opacity = Math.min(line3FadeIn, line3Whisper);

  const endCardOpacity = interpolate(
    frame,
    [sceneDuration - 50, sceneDuration - 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const endCardSpring = spring({
    frame: Math.max(0, frame - (sceneDuration - 50)),
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const endCardScale = interpolate(endCardSpring, [0, 1], [0.8, 1]);

  const blackOpacity = interpolate(
    frame,
    [sceneDuration - 30, sceneDuration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      className="overflow-hidden"
      style={{ backgroundColor: C.bg }}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          transform: `scale(${bgScale})`,
          transformOrigin: "center",
        }}
      >
        <Img
          src={staticFile(
            `${ASSET_PATH}/images/short/ep003_scribe_hand.jpeg`,
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

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-10 px-10">
        <div style={{ opacity: line1Opacity }}>
          <p
            className="text-center text-3xl leading-relaxed"
            style={{ fontFamily: cinzelFont, color: C.white }}
          >
            Somewhere, someone wrote this.
          </p>
        </div>
        <div style={{ opacity: line2Opacity }}>
          <p
            className="text-center text-3xl leading-relaxed"
            style={{ fontFamily: cinzelFont, color: C.white }}
          >
            They had thoughts, ideas, maybe secrets.
          </p>
        </div>
        <div style={{ opacity: line3Opacity }}>
          <p
            className="text-center text-3xl leading-relaxed"
            style={{ fontFamily: cinzelFont, color: C.white }}
          >
            And we will probably never know what they were trying to say.
          </p>
        </div>
      </div>

      <div
        className="pointer-events-none absolute flex w-full justify-center"
        style={{ bottom: 120, opacity: endCardOpacity }}
      >
        <div style={{ transform: `scale(${endCardScale})` }}>
          <p
            className="text-center text-2xl font-bold tracking-[0.2em]"
            style={{ fontFamily: cinzelFont, color: C.gold }}
          >
            FOREVER LOST
          </p>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: "#000000", opacity: blackOpacity }}
      />

      <Sequence durationInFrames={sceneDuration}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/silence_drone.wav`)}
          volume={silenceVolume}
        />
      </Sequence>

      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(
            `${ASSET_PATH}/audio/vo/short/ep003_s7_closer.wav`,
          )}
          volume={1}
        />
        <YouTubeCaptions
          transcript={TRASCRIPT_DATA}
          highlightedWords={[
            "someone",
            "wrote",
            "thoughts",
            "ideas",
            "secrets",
            "probably",
            "never",
            "know",
          ]}
          position="youtube-shorts"
          fontSize="small"
          startFrame={0}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
