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
import { loadFont as loadInterFont } from "@remotion/google-fonts/Inter";
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

const { fontFamily: interFont } = loadInterFont("normal", {
  weights: ["400", "600"],
  subsets: ["latin"],
});

const sceneDuration = SCENE_DURATION;

const ROWS = [
  {
    icon: "\u{1F3DB}\uFE0F",
    institution: "Yale University",
    action: "HOLDS IT",
  },
  {
    icon: "\u{1F510}",
    institution: "NSA / FBI",
    action: "ANALYZED",
  },
  {
    icon: "\u{2694}\uFE0F",
    institution: "WWII Codebreakers",
    action: "ATTEMPTED",
  },
  {
    icon: "\u{1F916}",
    institution: "AI (2018)",
    action: "PATTERN ANALYZED",
  },
];

const ROW_ENTRY_DURATION = 40;

const UnsolvedTag: React.FC<{
  trigger: number;
}> = ({ trigger }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = Math.max(0, frame - trigger);

  const scale = spring({
    frame: active,
    fps,
    config: { damping: 10, stiffness: 200 },
  });

  const opacity = interpolate(active, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulse = interpolate(frame % 45, [0, 22, 45], [1, 1.15, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <span
      className="ml-auto rounded-md px-2 py-0.5 text-sm font-bold tracking-wider"
      style={{
        transform: `scale(${scale * pulse})`,
        opacity,
        backgroundColor: C.red,
        color: C.white,
        fontFamily: cinzelFont,
      }}
    >
      UNSOLVED
    </span>
  );
};

const FloatingFragment: React.FC<{
  x: number;
  y: number;
  delay: number;
  text: string;
}> = ({ x, y, delay, text }) => {
  const frame = useCurrentFrame();
  const active = Math.max(0, frame - delay);
  const opacity = interpolate(
    active,
    [0, 20, 200, sceneDuration],
    [0, 0.5, 0.5, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const driftY = interpolate(active % 90, [0, 90], [0, -12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        opacity,
        transform: `translateY(${driftY}px)`,
        fontFamily: cinzelFont,
        fontSize: 14,
        color: C.red,
        letterSpacing: 2,
      }}
    >
      {text}
    </div>
  );
};

export const Scene5Attempts: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phraseYale = getPhraseFrames({
    phrase: "Yale",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const phraseFBI = getPhraseFrames({
    phrase: "FBI",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const phraseCodebreakers = getPhraseFrames({
    phrase: "codebreakers",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const phraseIntelligence = getPhraseFrames({
    phrase: "intelligence",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const phraseNothing = getPhraseFrames({
    phrase: "nothing",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });

  const row1Entry = Math.max(0, frame - phraseYale.from);
  const row2Entry = Math.max(0, frame - phraseFBI.from);
  const row3Entry = Math.max(0, frame - phraseCodebreakers.from);
  const row4Entry = Math.max(0, frame - phraseIntelligence.from);

  const row1Spring = spring({
    frame: row1Entry,
    fps,
    config: { damping: 12, stiffness: 150 },
  });
  const row2Spring = spring({
    frame: row2Entry,
    fps,
    config: { damping: 12, stiffness: 150 },
  });
  const row3Spring = spring({
    frame: row3Entry,
    fps,
    config: { damping: 12, stiffness: 150 },
  });
  const row4Spring = spring({
    frame: row4Entry,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const row1Y = interpolate(row1Spring, [0, 1], [-35, 0]);
  const row2Y = interpolate(row2Spring, [0, 1], [-35, 0]);
  const row3Y = interpolate(row3Spring, [0, 1], [-35, 0]);
  const row4Y = interpolate(row4Spring, [0, 1], [-35, 0]);

  const row1Opacity = interpolate(row1Spring, [0, 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const row2Opacity = interpolate(row2Spring, [0, 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const row3Opacity = interpolate(row3Spring, [0, 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const row4Opacity = interpolate(row4Spring, [0, 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tag1Trigger = phraseYale.from + ROW_ENTRY_DURATION;
  const tag2Trigger = phraseFBI.from + ROW_ENTRY_DURATION;
  const tag3Trigger = phraseCodebreakers.from + ROW_ENTRY_DURATION;
  const tag4Trigger = phraseIntelligence.from + ROW_ENTRY_DURATION;

  const bgScale = interpolate(frame, [0, sceneDuration], [1.0, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  const vignetteOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const redPulse1 = interpolate(
    frame,
    [tag1Trigger, tag1Trigger + 5, tag1Trigger + 20],
    [0, 0.08, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const redPulse2 = interpolate(
    frame,
    [tag2Trigger, tag2Trigger + 5, tag2Trigger + 20],
    [0, 0.08, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const redPulse3 = interpolate(
    frame,
    [tag3Trigger, tag3Trigger + 5, tag3Trigger + 20],
    [0, 0.08, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const redPulse4 = interpolate(
    frame,
    [tag4Trigger, tag4Trigger + 5, tag4Trigger + 20],
    [0, 0.08, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const nothingPulse = interpolate(
    frame,
    [phraseNothing.from, phraseNothing.from + 5, phraseNothing.from + 30],
    [0, 0.15, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const redOverlay = Math.max(
    0,
    redPulse1 + redPulse2 + redPulse3 + redPulse4 + nothingPulse,
  );

  const shakeActive = Math.max(0, frame - phraseNothing.from);
  const shakeAmplitude = interpolate(shakeActive, [0, 15], [8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shakeX = Math.sin(frame * 1.5) * shakeAmplitude;
  const shakeY = Math.cos(frame * 1.7) * shakeAmplitude;

  const bannerSpring = spring({
    frame: Math.max(0, frame - phraseNothing.from),
    fps,
    config: { damping: 8, stiffness: 180 },
  });
  const finalBannerScale = interpolate(bannerSpring, [0, 1], [0.7, 1]);
  const finalBannerOpacity = interpolate(
    frame,
    [phraseNothing.from, phraseNothing.from + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      className="overflow-hidden"
      style={{
        backgroundColor: C.bg,
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
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
            `${ASSET_PATH}/images/short/ep003_yale_beinecke.jpeg`,
          )}
          className="size-full object-cover"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: vignetteOpacity,
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-4 px-6">
        {ROWS.map((row, idx) => {
          const y = [row1Y, row2Y, row3Y, row4Y][idx];
          const opacity = [row1Opacity, row2Opacity, row3Opacity, row4Opacity][
            idx
          ];
          const tagTrigger = [
            tag1Trigger,
            tag2Trigger,
            tag3Trigger,
            tag4Trigger,
          ][idx];

          return (
            <div
              key={row.institution}
              className="rounded-xl px-5 py-3"
              style={{
                opacity,
                transform: `translateY(${y}px)`,
                backgroundColor: "rgba(10,10,10,0.85)",
                borderLeft: `3px solid ${C.red}`,
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{row.icon}</span>
                <span
                  className="text-lg font-bold tracking-wider"
                  style={{ fontFamily: cinzelFont, color: C.white }}
                >
                  {row.institution}
                </span>
                <span
                  className="text-sm tracking-widest"
                  style={{ fontFamily: interFont, color: C.gray }}
                >
                  — {row.action}
                </span>
                <UnsolvedTag trigger={tagTrigger} />
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <FloatingFragment x={10} y={15} delay={60} text="UNSOLVED" />
        <FloatingFragment x={80} y={20} delay={90} text="FAILED" />
        <FloatingFragment x={85} y={75} delay={120} text="NO CLUE" />
        <FloatingFragment x={15} y={80} delay={150} text="MYSTERY" />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: C.red, opacity: redOverlay }}
      />

      <div
        className="pointer-events-none absolute flex w-full justify-center"
        style={{ bottom: 120, opacity: finalBannerOpacity }}
      >
        <div
          className="rounded-full px-8 py-3"
          style={{
            transform: `scale(${finalBannerScale})`,
            backgroundColor: "rgba(204,51,51,0.2)",
            border: `2px solid ${C.red}`,
          }}
        >
          <span
            className="text-2xl font-bold tracking-widest"
            style={{ fontFamily: cinzelFont, color: C.red }}
          >
            STILL NOTHING
          </span>
        </div>
      </div>

      <SceneBadges
        badges={BADGES}
        transcriptData={TRASCRIPT_DATA}
        voiceOverStartFrame={VO_START_FRAME}
      />

      <Sequence from={phraseYale.from} durationInFrames={30}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/clock_tick.wav`)}
          volume={0.4}
        />
      </Sequence>
      <Sequence from={phraseFBI.from} durationInFrames={30}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/clock_tick.wav`)}
          volume={0.4}
        />
      </Sequence>
      <Sequence from={phraseCodebreakers.from} durationInFrames={30}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/clock_tick.wav`)}
          volume={0.4}
        />
      </Sequence>
      <Sequence from={phraseIntelligence.from} durationInFrames={30}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/clock_tick.wav`)}
          volume={0.4}
        />
      </Sequence>

      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(
            `${ASSET_PATH}/audio/vo/short/ep003_s5_attempts.wav`,
          )}
          volume={1}
        />
        <YouTubeCaptions
          transcript={TRASCRIPT_DATA}
          highlightedWords={[
            "Yale",
            "FBI",
            "codebreakers",
            "intelligence",
            "analyzed",
            "pattern",
            "Still",
            "nothing",
          ]}
          position="youtube-shorts"
          fontSize="small"
          startFrame={0}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
