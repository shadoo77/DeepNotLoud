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
import { getPhraseFrames } from "@/lib/utils";
import { TickerBar } from "@/components/atoms/TickerBar";
import { SidebarPanel } from "@/components/atoms/SidebarPanel";
import { TimelineBar } from "@/components/atoms/TimelineBar";
import { DustParticles } from "@/components/atoms/DustParticles";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { C } from "@/remotion/categories/forever-lost/ep-003/constants";
import { TRASCRIPT_DATA, VO_START_FRAME } from "./constants";
import { Scene2Annotations } from "./Scene2Annotations";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const { fontFamily: interFont } = loadInterFont("normal", {
  weights: ["400", "600"],
  subsets: ["latin"],
});

const ASSET = "assets/forever-lost/ep-003";

const MILESTONES = [
  { year: "1404", frame: 0 },
  { year: "1440", frame: 60 },
  { year: "1912", frame: 90 },
  { year: "1930", frame: 1800 },
  { year: "2009", frame: 1885 },
];

export const Scene2Discovery: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const kenBurns = interpolate(frame, [0, durationInFrames], [1.0, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  const badgeRome = getPhraseFrames({
    phrase: "outside Rome",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const mapStartFrame = badgeRome.from > 0 ? badgeRome.from : 150;

  const portraitPhrase = getPhraseFrames({
    phrase: "Wilfred Voynich",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const portraitTrigger = portraitPhrase.from > 0 ? portraitPhrase.from : 450;

  const mapOpacity = interpolate(
    frame,
    [
      mapStartFrame,
      mapStartFrame + 30,
      mapStartFrame + 270,
      mapStartFrame + 300,
    ],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const portraitSpring = spring({
    frame: Math.max(0, frame - portraitTrigger),
    fps,
    config: { damping: 14, stiffness: 80 },
  });
  const portraitX = interpolate(portraitSpring, [0, 1], [400, 0]);
  const portraitOpacity = interpolate(
    Math.max(0, frame - portraitTrigger),
    [0, 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const portraitExit = interpolate(Math.max(0, frame - 1050), [0, 40], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const illustrationOpacity = interpolate(
    Math.max(0, frame - 1050),
    [0, 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const underlineSpring = spring({
    frame: Math.max(0, frame - portraitTrigger - 30),
    fps,
    config: { damping: 18, stiffness: 100 },
  });

  // ── MICRO-REVEALS (pacing) ──
  const yr1912Fade = interpolate(frame, [60, 80, 110, 130], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const yrPulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.3, 1]);
  const yrPulseOpacity = interpolate(frame, [650, 670, 900, 920], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lineDraw1100 = interpolate(
    Math.max(0, frame - 1100),
    [0, 40],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const line1100Opacity = interpolate(
    Math.max(0, frame - 1140),
    [0, 10],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const cornerFlare1450 = interpolate(
    frame,
    [1450, 1480, 1680, 1710],
    [0, 0.6, 0.6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const undecipheredFade = interpolate(frame, [1520, 1550, 1580, 1600], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="overflow-hidden" style={{ backgroundColor: C.bg }}>
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: `scale(${kenBurns})` }}
      >
        <Img
          src={staticFile(`${ASSET}/images/ep003_villa_mondragone.jpeg`)}
          className="size-full object-cover"
        />
      </div>

      {/* micro-reveal: 1912 */}
      <div
        className="pointer-events-none absolute"
        style={{ top: "15%", left: "8%", opacity: yr1912Fade }}
      >
        <span
          style={{
            fontFamily: cinzelFont,
            color: C.gold,
            fontSize: 40,
            letterSpacing: 8,
          }}
        >
          1912
        </span>
      </div>

      <div
        className="pointer-events-none absolute"
        style={{
          left: 60,
          bottom: 160,
          width: 500,
          height: 320,
          opacity: mapOpacity,
          zIndex: 10,
        }}
      >
        <Img
          src={staticFile(`${ASSET}/images/ep003_map_italy.jpeg`)}
          className="size-full rounded-lg object-cover"
          style={{ border: "1px solid rgba(200,169,110,0.6)" }} // Brighter border
        />
      </div>

      <DustParticles count={40} />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.70) 100%)",
        }}
      />

      {/* micro-reveal: line draw @1100 */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "12%",
          left: "35%",
          width: "65%",
          opacity: line1100Opacity,
        }}
      >
        <svg width="100%" height={2}>
          <line
            x1={0}
            y1={0}
            x2={`${lineDraw1100}%`}
            y2={0}
            stroke={C.gold}
            strokeWidth={1}
            strokeOpacity={0.4}
          />
        </svg>
      </div>

      {/* micro-reveal: corner flare @1450 */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: 0,
          right: 0,
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle at top right, rgba(200,169,110,0.15), transparent 70%)",
          opacity: cornerFlare1450,
        }}
      />

      {/* micro-reveal: STILL UNDECIPHERED @1520 */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "15%",
          left: "50%",
          opacity: undecipheredFade,
          transform: "translateX(-50%)",
        }}
      >
        <span
          style={{
            fontFamily: cinzelFont,
            color: C.white,
            fontSize: 24,
            letterSpacing: 6,
          }}
        >
          STILL UNDECIPHERED
        </span>
      </div>

      {/* micro-reveal: year pulse @650 */}
      <div
        className="pointer-events-none absolute"
        style={{
          left: "8%",
          bottom: "30%",
          opacity: yrPulseOpacity * yrPulse,
        }}
      >
        <span
          style={{
            color: C.gold,
            fontSize: 48,
            fontFamily: cinzelFont,
            textShadow: `0 0 ${interpolate(yrPulse, [0.3, 1], [5, 20])}px ${C.gold}`,
          }}
        >
          1865
        </span>
        <span
          style={{
            color: C.gray,
            fontSize: 20,
            marginLeft: 10,
            fontFamily: interFont,
          }}
        >
          BORN
        </span>
      </div>

      <SidebarPanel
        fields={[
          { label: "Location", value: "Villa Mondragone" },
          { label: "Year", value: "1912" },
          { label: "Discoverer", value: "Wilfrid Voynich" },
          { label: "Status", value: "UNDECIPHERED" },
        ]}
        delayFrames={30}
        color={C.gold}
      />

      <TimelineBar
        milestones={MILESTONES}
        startFrame={150}
        color={C.gold}
        trackFontSize={36}
      />

      <div
        className="pointer-events-none absolute flex items-center"
        style={{
          right: 60, // Moved in slightly from edge
          top: "5%", // Moved up slightly for better vertical centering
          opacity: portraitOpacity * portraitExit,
          transform: `translateX(${portraitX}px)`,
        }}
      >
        <div className="flex flex-col items-center">
          <div
            className="overflow-hidden rounded-xl"
            style={{
              width: 420, // Increased from 300
              height: 500, // Increased from 360
              border: "2px solid rgba(200,169,110,0.5)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.6)", // Added cinematic drop shadow
            }}
          >
            <Img
              src={staticFile(`${ASSET}/images/ep003_wilfrid_portrait.png`)}
              className="size-full object-cover"
            />
          </div>
          <div
            className="mt-5 text-center"
            style={{
              fontFamily: cinzelFont,
              color: C.white,
            }}
          >
            <div
              className="font-bold tracking-wider"
              style={{ fontSize: 42 }} // Increased from text-4xl (36px) to 42px
            >
              WILFRID VOYNICH
            </div>
            <div
              className="mt-2 font-semibold tracking-wide"
              style={{ fontFamily: interFont, color: C.gray, fontSize: 26 }} // Increased from text-2xl to 26px
            >
              1865–1930
            </div>
            <div
              className="mx-auto mt-3 h-[3px]" // Increased line thickness from 2px to 3px
              style={{
                backgroundColor: C.gold,
                width: interpolate(underlineSpring, [0, 1], [0, 180]), // Widened underline to match bigger text
                borderRadius: 1,
              }}
            />
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute"
        style={{
          right: 40,
          top: "15%",
          width: "55%",
          height: "70%",
          opacity: illustrationOpacity,
        }}
      >
        <Img
          src={staticFile(`${ASSET}/images/ep003_plant_illustrations.jpeg`)}
          className="size-full rounded-xl object-cover"
          style={{ border: "1px solid rgba(200,169,110,0.3)" }}
        />
        <Scene2Annotations startFrame={1050} />
      </div>

      <TickerBar opacity={1} color={C.gold} />

      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET}/audio/vo/ep003_L_s2_discovery.wav`)}
          volume={1}
        />
        <YouTubeCaptions
          transcript={TRASCRIPT_DATA}
          highlightedWords={[
            "1912",
            "Villa",
            "Mondragone",
            "Wilfrid",
            "Voynich",
            "Jesuit",
            "Rome",
            "chest",
            "manuscripts",
            "parchment",
            "illustrated",
            "plants",
            "women",
            "bathing",
            "star",
            "charts",
            "constellation",
            "Renaissance",
            "1404",
            "1438",
            "2009",
            "carbon",
            "America",
            "failed",
            "Europe",
            "decoded",
            "nobody",
            "understand",
          ]}
          position="top-center"
          fontSize="small"
          captionWidth="70%"
          startFrame={0}
          showOverlay
        />
      </Sequence>

      <Sequence from={60}>
        <Audio
          src={staticFile(`${ASSET}/audio/sfx/paper_rustle.wav`)}
          volume={0.35}
        />
      </Sequence>

      <Sequence from={portraitTrigger}>
        <Audio
          src={staticFile(`${ASSET}/audio/sfx/quill_scratch.wav`)}
          volume={0.25}
        />
      </Sequence>

      <Sequence from={1050}>
        <Audio
          src={staticFile(`${ASSET}/audio/sfx/whoosh_in.wav`)}
          volume={0.3}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
