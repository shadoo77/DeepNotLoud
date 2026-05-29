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
import { getPhraseFrames } from "@/lib/utils";
import { TickerBar } from "@/components/atoms/TickerBar";
import { DustParticles } from "@/components/atoms/DustParticles";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { SceneBadges } from "@/components/atoms/SceneBadges";
import { C } from "@/remotion/categories/forever-lost/ep-003/constants";
import { TRASCRIPT_DATA, VO_START_FRAME } from "./constants";
import { BADGES } from "./badges";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const CardContent: React.FC<{ card: CardDef }> = ({ card }) => (
  <div
    className="relative flex h-full items-center justify-between px-16"
    style={{
      backgroundColor: "rgba(10,10,10,0.92)",
      borderTop: `2px solid ${C.gold}`,
    }}
  >
    <div className="flex items-center gap-8">
      <div className="text-7xl">{card.emoji}</div>
      <div>
        <div
          className="text-4xl font-black tracking-wider"
          style={{ fontFamily: cinzelFont, color: C.gold }}
        >
          {card.name}
        </div>
        <div className="mt-2 text-xl" style={{ color: C.gray }}>
          {card.desc}
        </div>
      </div>
    </div>
    <div
      className="rounded-full px-6 py-4 text-2xl font-bold tracking-wider"
      style={{
        backgroundColor: C.red,
        color: C.white,
        fontFamily: cinzelFont,
      }}
    >
      STATUS: UNEXPLAINED
    </div>
  </div>
);

const ASSET = "assets/forever-lost/ep-003";

interface CardDef {
  emoji: string;
  name: string;
  desc: string;
  phrase: string;
  fallbackFrame: number;
}

const SECTION_CARDS: CardDef[] = [
  {
    emoji: "\uD83C\uDF3F",
    name: "HERBAL",
    desc: "217 plant species. 0 identified.",
    phrase: "herbal section",
    fallbackFrame: 311,
  },
  {
    emoji: "\u2B50",
    name: "ASTRONOMICAL",
    desc: "Circular diagrams. No known star system.",
    phrase: "astronomical section",
    fallbackFrame: 866,
  },
  {
    emoji: "\uD83E\uDDEC",
    name: "BIOLOGICAL",
    desc: "Human figures. Impossible plumbing.",
    phrase: "biological section",
    fallbackFrame: 1324,
  },
  {
    emoji: "\u2697\uFE0F",
    name: "PHARMACEUTICAL",
    desc: "Containers and roots. Purpose unknown.",
    phrase: "pharmaceutical section",
    fallbackFrame: 2023,
  },
  {
    emoji: "\uD83D\uDCDC",
    name: "RECIPES",
    desc: "Star-marked paragraphs. Unknown instructions.",
    phrase: "recipe section",
    fallbackFrame: 2277,
  },
  {
    emoji: "\uD83D\uDCD6",
    name: "TEXT",
    desc: "Dense columns. Dense silence.",
    phrase: "pages of pure",
    fallbackFrame: 2672,
  },
];

const HOLD_FRAMES = 200;
const SLIDE_DURATION = 20;
const EXIT_DURATION = 15;
const imageHoldDuration = 270;

const RIGHT_IMAGES = [
  { src: "ep003_plant_illustrations.jpeg", label: "Herbal Section" },
  { src: "ep003_astronomical_wheel.jpeg", label: "Astronomical Section" },
  { src: "ep003_biological_section.jpeg", label: "Biological Section" },
];

interface Annotation {
  label: string;
  triggerPhrase: string;
  fallbackFrame: number;
  top: number;
  left: number;
  width: number;
}

const ANNOTATIONS: Annotation[] = [
  {
    label: "Unknown Species",
    triggerPhrase: "has been identified",
    fallbackFrame: 810,
    top: 20,
    left: 5,
    width: 60,
  },
  {
    label: "Repeated Pattern",
    triggerPhrase: "each marked with a star",
    fallbackFrame: 2590,
    top: 40,
    left: 15,
    width: 50,
  },
  {
    label: "No Known Match",
    triggerPhrase: "any known constellation",
    fallbackFrame: 1190,
    top: 60,
    left: 8,
    width: 55,
  },
];

export const Scene3WhatIsIt: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const cardTriggers = SECTION_CARDS.map((card) => {
    const result = getPhraseFrames({
      phrase: card.phrase,
      transcriptData: TRASCRIPT_DATA,
      fps,
      voiceOverStartFrame: VO_START_FRAME,
    });
    return result.from > 0 ? result.from : card.fallbackFrame;
  });

  const annotationTriggers = ANNOTATIONS.map((ann) => {
    const result = getPhraseFrames({
      phrase: ann.triggerPhrase,
      transcriptData: TRASCRIPT_DATA,
      fps,
      voiceOverStartFrame: VO_START_FRAME,
    });
    return result.from > 0 ? result.from : ann.fallbackFrame;
  });

  const kenBurns = interpolate(frame, [0, durationInFrames], [1.0, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  const image1Start = 0;
  const image2Start = image1Start + imageHoldDuration;
  const image3Start = image2Start + imageHoldDuration;

  const getImageOpacity = (imgIndex: number) => {
    const starts = [image1Start, image2Start, image3Start];
    const enterFrame = starts[imgIndex];
    const exitFrame = enterFrame + imageHoldDuration;
    const fadeIn = 15;
    const fadeOut = 15;
    return (
      interpolate(frame, [enterFrame, enterFrame + fadeIn], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }) *
      interpolate(frame, [exitFrame - fadeOut, exitFrame], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    );
  };

  const bioRumble = getPhraseFrames({
    phrase: "biological section",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const bioRumbleFrame = bioRumble.from > 0 ? bioRumble.from - 15 : 1309;

  const renderSectionCard = (card: CardDef, index: number) => {
    const triggerFrame = cardTriggers[index];

    // Not yet triggered
    if (frame < triggerFrame) return null;

    const localFrame = frame - triggerFrame;

    // Is there a newer card that's already started?
    const nextTrigger =
      index < SECTION_CARDS.length - 1 ? cardTriggers[index + 1] : Infinity;
    const isSuperseded = frame >= nextTrigger;

    // ── SUPERSDED: forced quick exit ──
    if (isSuperseded) {
      const exitLocalFrame = frame - nextTrigger;
      if (exitLocalFrame > EXIT_DURATION) return null; // fully gone

      const exitProgress = exitLocalFrame / EXIT_DURATION;
      const yExit = interpolate(exitProgress, [0, 1], [0, -80], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      const opacity = interpolate(exitProgress, [0, 0.5, 1], [1, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

      return (
        <div
          key={card.name}
          className="pointer-events-none absolute right-0 left-0"
          style={{
            bottom: 44,
            height: 240,
            transform: `translateY(${yExit}px)`,
            opacity,
          }}
        >
          {/* same card content JSX as below */}
          <CardContent card={card} />
        </div>
      );
    }

    // ── NORMAL: entry → hold → natural exit ──
    const slideIn = spring({
      frame: localFrame,
      fps,
      config: { damping: 14, stiffness: 120 },
    });
    const yEntry = interpolate(slideIn, [0, 1], [100, 0]);

    const exitStart = SLIDE_DURATION + HOLD_FRAMES;
    let yExit = 0;
    let opacity = 1;

    if (localFrame > exitStart) {
      const exitProgress = Math.min(
        (localFrame - exitStart) / EXIT_DURATION,
        1,
      );
      yExit = interpolate(exitProgress, [0, 1], [0, -80], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      opacity = interpolate(exitProgress, [0, 0.5, 1], [1, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
    }

    if (localFrame > SLIDE_DURATION + HOLD_FRAMES + EXIT_DURATION) return null;

    return (
      <div
        key={card.name}
        className="pointer-events-none absolute right-0 left-0"
        style={{
          bottom: 44,
          height: 240,
          transform: `translateY(${yEntry + yExit}px)`,
          opacity,
        }}
      >
        <CardContent card={card} />
      </div>
    );
  };

  const renderAnnotation = (ann: Annotation, index: number) => {
    const trigger = annotationTriggers[index];
    const localFrame = Math.max(0, frame - trigger);
    if (localFrame > 200) return null;

    const drawProgress = interpolate(
      Math.min(localFrame / 40, 1),
      [0, 1],
      [0, 100],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
    const labelOpacity = interpolate(
      Math.min(localFrame - 40, 0),
      [-20, 0],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );

    return (
      <div
        key={ann.label}
        className="pointer-events-none absolute"
        style={{
          top: `${ann.top}%`,
          left: `${ann.left}%`,
        }}
      >
        <svg width="100%" height={2}>
          <line
            x1={0}
            y1={0}
            x2={drawProgress + "%"}
            y2={0}
            stroke={C.gold}
            strokeWidth={8}
            strokeOpacity={0.6}
          />
        </svg>
        {drawProgress > 80 && (
          <div
            className="mt-1 rounded-sm px-2 py-0.5 text-xl font-bold tracking-wider whitespace-nowrap"
            style={{
              color: C.gold,
              opacity: labelOpacity,
            }}
          >
            {ann.label}
          </div>
        )}
      </div>
    );
  };

  return (
    <AbsoluteFill className="overflow-hidden" style={{ backgroundColor: C.bg }}>
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: `scale(${kenBurns})` }}
      >
        <Img
          src={staticFile(`${ASSET}/images/ep003_manuscript_spread.jpeg`)}
          className="size-full object-cover"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.70) 100%)",
        }}
      />

      <DustParticles count={120} />

      <SceneBadges
        badges={BADGES}
        transcriptData={TRASCRIPT_DATA}
        voiceOverStartFrame={VO_START_FRAME}
      />

      <div
        className="pointer-events-none absolute"
        style={{
          right: 0,
          top: 0,
          width: "50%",
          height: "100%",
        }}
      >
        {RIGHT_IMAGES.map((img, i) => (
          <div
            key={img.src}
            className="absolute inset-0"
            style={{ opacity: getImageOpacity(i) }}
          >
            <Img
              src={staticFile(`${ASSET}/images/${img.src}`)}
              className="size-full object-cover"
            />
          </div>
        ))}
      </div>

      <TickerBar opacity={1} color={C.gold} />

      {ANNOTATIONS.map((ann, i) => renderAnnotation(ann, i))}

      {SECTION_CARDS.map((card, i) => renderSectionCard(card, i))}

      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET}/audio/vo/ep003_L_s3_what_is_it.wav`)}
          volume={1}
        />
        <YouTubeCaptions
          transcript={TRASCRIPT_DATA}
          highlightedWords={[
            "herbal",
            "astronomical",
            "biological",
            "pharmaceutical",
            "recipes",
            "plants",
            "stars",
            "moons",
            "zodiac",
            "women",
            "bathing",
            "plumbing",
            "nobody",
            "knows",
            "instructions",
            "star",
            "text",
            "silence",
          ]}
          position="top-center"
          fontSize="small"
          captionWidth="70%"
          startFrame={0}
          showOverlay
        />
      </Sequence>

      <Sequence durationInFrames={durationInFrames}>
        <Audio
          src={staticFile(`${ASSET}/audio/sfx/quill_scratch.wav`)}
          volume={(f) =>
            interpolate(f % 450, [0, 15, 430, 450], [0, 0.12, 0.12, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>

      <Sequence from={bioRumbleFrame} durationInFrames={120}>
        <Audio
          src={staticFile(`${ASSET}/audio/sfx/deep_rumble.wav`)}
          volume={(f) =>
            interpolate(f, [0, 120], [0.25, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>
    </AbsoluteFill>
  );
};
