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
import { getPhraseFrames } from "@/lib/utils";
import { TickerBar } from "@/components/atoms/TickerBar";
import { DustParticles } from "@/components/atoms/DustParticles";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { SceneBadges } from "@/components/atoms/SceneBadges";
import {
  C,
  ASSET_PATH,
} from "@/remotion/categories/forever-lost/ep-003/constants";

import { TRASCRIPT_DATA, VO_START_FRAME, SCENE_DURATION } from "./constants";
import { BADGES } from "./badges";
import { TheoryCards } from "./TheoryCards";
import { SuspectPortrait } from "./SuspectPortrait";
import { MessageBottleText } from "./MessageBottleText";

export const Scene7Theories: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneEndFrame = SCENE_DURATION;

  const kenBurns = interpolate(frame, [0, sceneEndFrame], [1.0, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  // ── Phrase triggers ──
  const tOne = getPhraseFrames({
    phrase: "Theory one",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const tOneFrame = tOne.from > 0 ? tOne.from : 200;

  const tTwo = getPhraseFrames({
    phrase: "Theory two",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const tTwoFrame = tTwo.from > 0 ? tTwo.from : 680;

  const tThree = getPhraseFrames({
    phrase: "Theory three",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const tThreeFrame = tThree.from > 0 ? tThree.from : 1160;

  const tFour = getPhraseFrames({
    phrase: "Theory four",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const tFourFrame = tFour.from > 0 ? tFour.from : 1640;

  const tFive = getPhraseFrames({
    phrase: "Theory five",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const tFiveFrame = tFive.from > 0 ? tFive.from : 2120;

  const tBacon = getPhraseFrames({
    phrase: "Roger Bacon",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const tBaconFrame = tBacon.from > 0 ? tBacon.from : 860;

  const tDee = getPhraseFrames({
    phrase: "John Dee",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const tDeeFrame = tDee.from > 0 ? tDee.from : 1020;

  const tDrone = getPhraseFrames({
    phrase: "keeps researchers awake",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const tDroneFrame = tDrone.from > 0 ? tDrone.from : 2400;

  const tBottle = getPhraseFrames({
    phrase: "bottle",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const tBottleFrame = tBottle.from > 0 ? tBottle.from : 2680;

  // ── Theory cards data ──
  const theoryCards = [
    {
      number: 1,
      title: "THE HOAX",
      description:
        "Medieval forgery — sophisticated enough to fool AI and the NSA for six centuries",
      color: "#CC3333",
      triggerFrame: tOneFrame,
      nextTriggerFrame: tTwoFrame,
    },
    {
      number: 2,
      title: "CONSTRUCTED LANGUAGE",
      description: "Proto-Esperanto, centuries ahead of its time",
      color: "#3366CC",
      triggerFrame: tTwoFrame,
      nextTriggerFrame: tThreeFrame,
    },
    {
      number: 3,
      title: "MEDICAL ENCYCLOPEDIA",
      description: "Symbolic plants, bathing stages, private medical shorthand",
      color: "#339933",
      triggerFrame: tThreeFrame,
      nextTriggerFrame: tFourFrame,
    },
    {
      number: 4,
      title: "UNBREAKABLE CIPHER",
      description: "A key that died with its author",
      color: C.gold,
      triggerFrame: tFourFrame,
      nextTriggerFrame: tFiveFrame,
    },
    {
      number: 5,
      title: "ALL OF THE ABOVE",
      description:
        "Constructed language + cipher + medical text — the theory that keeps researchers awake",
      color: "#FFFFFF",
      triggerFrame: tFiveFrame,
      nextTriggerFrame: Infinity,
    },
  ];

  // ── Micro-reveals ──
  // Ink drip at scene open
  const inkDripping = interpolate(
    frame,
    [VO_START_FRAME + 20, VO_START_FRAME + 25, VO_START_FRAME + 35],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const inkSplat = spring({
    frame: Math.max(0, frame - (VO_START_FRAME + 35)),
    fps,
    config: { damping: 8, stiffness: 300 },
  });
  const inkScaleY = interpolate(inkSplat, [0, 1], [0.1, 1]);

  // Count pulse on "six hundred" / "gold"
  const coinRing = spring({
    frame: Math.max(0, frame - (tOneFrame + 200)),
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const coinScale = interpolate(coinRing, [0, 1], [0.5, 1.2], {
    extrapolateRight: "clamp",
  });
  const coinOpacity = interpolate(
    Math.max(0, frame - (tOneFrame + 200)),
    [0, 20, 60, 250, 280],
    [0, 1, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Quill line draw between T1 and T2
  const quillDraw = interpolate(
    Math.max(0, frame - (tOneFrame + 350)),
    [0, 50],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const quillOpacity = interpolate(
    Math.max(0, frame - (tOneFrame + 400)),
    [0, 20],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Glyph carousel between T3 and T4
  const glyphCycle =
    Math.floor(Math.max(0, frame - (tThreeFrame + 200)) / 40) % 3;
  const glyphOpacity = interpolate(
    Math.max(0, frame - (tThreeFrame + 200)),
    [0, 300, 350],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const glyphChars = ["⊕", "ꝏ", "ⴲ"];

  // Corner flare between T4 and T5
  const flareOpacity = interpolate(
    frame,
    [tFourFrame + 150, tFourFrame + 180, tFourFrame + 380, tFourFrame + 410],
    [0, 0.5, 0.5, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Diamond highlight — dead zone between Card 5 settle and cipher badge
  const diamondHighlight = interpolate(
    frame,
    [2240, 2250, 2280, 2290],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Gold flash after cipher badge
  const gapFlash = interpolate(frame, [2400, 2404, 2412], [0, 0.15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade manuscript BG when bottle appears
  const manuscriptOpacity = interpolate(
    frame,
    [tBottleFrame - 10, tBottleFrame + 30],
    [0.35, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // "ALL AT ONCE" text — fills dead zone before bottle sequence
  const allAtOnceFade = interpolate(
    Math.max(0, frame - 2520),
    [0, 30, 140, 170],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const allAtOnceY = interpolate(Math.max(0, frame - 2520), [0, 30], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="overflow-hidden" style={{ backgroundColor: C.bg }}>
      {/* BG */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: `scale(${kenBurns})` }}
      >
        <Img
          src={staticFile(`${ASSET_PATH}/images/ep003_manuscript_spread.jpeg`)}
          className="size-full object-cover"
          style={{ opacity: manuscriptOpacity }}
        />
      </div>

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      <DustParticles count={25} />

      {/* Theory Cards */}
      <TheoryCards frame={frame} fps={fps} cards={theoryCards} />

      {/* Suspect Portraits */}
      <SuspectPortrait
        frame={frame}
        fps={fps}
        triggerFrame={tBaconFrame}
        exitFrame={tDeeFrame}
        image="ep003_roger_bacon.jpeg"
        name="ROGER BACON"
        subtitle="Franciscan Friar · c. 1214–1294"
        effectType="illumination"
      />
      <SuspectPortrait
        frame={frame}
        fps={fps}
        triggerFrame={tDeeFrame}
        exitFrame={tFiveFrame}
        image="ep003_john_dee.jpeg"
        name="JOHN DEE"
        subtitle="Royal Court Magician · 1527–1608"
        effectType="constellation"
      />

      {/* Message bottle text (closing sequence) */}
      {frame >= tBottleFrame - 10 && (
        <MessageBottleText
          frame={frame}
          triggerFrame={tBottleFrame}
          sceneEndFrame={sceneEndFrame}
        />
      )}

      {/* Ink drip micro-reveal */}
      <div
        className="pointer-events-none absolute"
        style={{ top: 0, left: "50%" }}
      >
        <svg width={6} height={60}>
          <ellipse
            cx={3}
            cy={0}
            rx={3}
            ry={interpolate(inkDripping, [0, 1], [0, 20])}
            fill={C.gold}
            opacity={inkDripping}
          />
          <ellipse
            cx={3}
            cy={30}
            rx={interpolate(inkScaleY, [0.1, 1], [0, 12])}
            ry={interpolate(inkScaleY, [0.1, 1], [0, 4])}
            fill={C.gold}
            opacity={inkDripping * inkSplat * 0.3}
          />
        </svg>
      </div>

      {/* Count pulse: 600 gold ducats */}
      <div
        className="pointer-events-none absolute"
        style={{
          right: "12%",
          top: "25%",
          opacity: coinOpacity,
          transform: `scale(${coinScale})`,
        }}
      >
        <span
          className="text-6xl font-black tracking-widest"
          style={{
            fontFamily: "Courier New",
            color: C.gold,
            textShadow: `0 0 ${interpolate(Math.sin(frame * 0.08), [-1, 1], [5, 20])}px ${C.gold}`,
          }}
        >
          600
        </span>
        <span className="ml-3 text-2xl font-semibold" style={{ color: C.gray }}>
          GOLD DUCATS
        </span>
      </div>

      {/* Quill line draw */}
      <div
        className="pointer-events-none absolute"
        style={{ top: "55%", left: 0, width: "100%", opacity: quillOpacity }}
      >
        <svg width="100%" height={2}>
          <line
            x1={0}
            y1={0}
            x2={`${quillDraw}%`}
            y2={0}
            stroke={C.gold}
            strokeWidth={1.5}
            strokeOpacity={0.5}
          />
        </svg>
      </div>

      {/* Glyph carousel */}
      <div
        className="pointer-events-none absolute"
        style={{ right: "15%", bottom: "25%", opacity: glyphOpacity }}
      >
        <span
          className="text-5xl tracking-widest"
          style={{
            color: C.gold,
            textShadow: "0 0 10px rgba(200,169,110,0.5)",
            filter: "brightness(1.2)",
          }}
        >
          {glyphChars[glyphCycle]}
        </span>
      </div>

      {/* Corner flare */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: 0,
          right: 0,
          width: 250,
          height: 250,
          background:
            "radial-gradient(circle at top right, rgba(200,169,110,0.25), transparent 70%)",
          opacity: flareOpacity,
        }}
      />

      {/* Diamond highlight — fills dead zone after Card 5 */}
      <div
        className="pointer-events-none absolute"
        style={{ top: "35%", right: "18%", opacity: diamondHighlight }}
      >
        <span
          style={{
            color: C.gold,
            fontSize: 72,
            fontFamily: "serif",
            textShadow: "0 0 12px rgba(200,169,110,0.6)",
            filter: "brightness(1.3)",
          }}
        >
          ◆
        </span>
      </div>

      {/* "ALL AT ONCE" text — fills dead zone before bottle */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "40%",
          right: "10%",
          opacity: allAtOnceFade,
          transform: `translateY(${allAtOnceY}px)`,
        }}
      >
        <span
          className="text-3xl font-semibold tracking-wider"
          style={{ color: C.gold, fontFamily: "Cinzel, serif" }}
        >
          ALL AT ONCE
        </span>
        <div
          style={{
            width: "100%",
            height: 2,
            backgroundColor: C.gold,
            marginTop: 8,
            opacity: 0.4,
          }}
        />
      </div>

      <SceneBadges
        badges={BADGES}
        transcriptData={TRASCRIPT_DATA}
        voiceOverStartFrame={VO_START_FRAME}
        defaultAutoHideFrames={500}
      />

      <TickerBar opacity={1} color={C.gold} />

      {/* Color flash: pairs with silence drone start */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: C.gold, opacity: gapFlash }}
      />

      {/* VO + Captions */}
      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/vo/ep003_L_s7_theories.wav`)}
          volume={1}
        />
        <YouTubeCaptions
          transcript={TRASCRIPT_DATA}
          highlightedWords={[
            "hoax",
            "forger",
            "convincingly",
            "Esperanto",
            "Roger",
            "Bacon",
            "John",
            "Dee",
            "cipher",
            "key",
            "constructed",
            "medical",
            "private",
            "defeat",
            "imagination",
          ]}
          position="bottom-center"
          fontSize="small"
          startFrame={0}
          showOverlay
        />
      </Sequence>

      {/* SFX — paper rustle at scene open */}
      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/paper_rustle.wav`)}
          volume={(f) =>
            interpolate(f, [0, 90], [0.2, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>

      {/* SFX — silence drone when theory 5 lands */}
      <Sequence from={tDroneFrame}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/silence_drone.wav`)}
          volume={(f) =>
            interpolate(
              f,
              [
                0,
                60,
                sceneEndFrame - tDroneFrame - 60,
                sceneEndFrame - tDroneFrame,
              ],
              [0, 0.18, 0.18, 0],
            )
          }
          loop
        />
      </Sequence>

      {/* SFX — impact_thud with blue flash on "bottle" */}
      <Sequence from={tBottleFrame + 80}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/impact_thud.wav`)}
          volume={(f) =>
            interpolate(f, [0, 60], [0.5, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>

      {/* Gold flash — fills dead zone after cipher badge */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: C.gold, opacity: gapFlash }}
      />
    </AbsoluteFill>
  );
};
