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
import { DustParticles } from "@/components/atoms/DustParticles";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { C } from "@/remotion/categories/forever-lost/ep-003/constants";
import { TRASCRIPT_DATA, VO_START_FRAME } from "./constants";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const { fontFamily: interFont } = loadInterFont("normal", {
  weights: ["400", "600"],
  subsets: ["latin"],
});

const ASSET = "assets/forever-lost/ep-003";

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleSpring = spring({
    frame: frame - 120,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const underlineSpring = spring({
    frame: frame - 160,
    fps,
    config: { damping: 18, stiffness: 100 },
  });

  const chapterSpring = spring({
    frame: frame - 600,
    fps,
    config: { damping: 14, stiffness: 70 },
  });

  const glowPhase = Math.min(Math.max(0, frame - 600), 600);
  const glowPulse = interpolate(
    Math.sin(glowPhase * 0.02094),
    [-1, 1],
    [0, 20],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const kenBurns = interpolate(frame, [0, durationInFrames], [1.0, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  const wheelOpacity = interpolate(frame, [450, 480], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const beineckeOpacity = interpolate(frame, [900, 930], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleExitOpacity = interpolate(frame, [370, 400], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const chapterOpacity = interpolate(chapterSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const chapterScale = interpolate(chapterSpring, [0, 1], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const chapterExitOpacity = interpolate(frame, [1170, 1200], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const silencePhrase = getPhraseFrames({
    phrase: "six hundred years of silence",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });

  const impactFrame = silencePhrase.from > 0 ? silencePhrase.from : 900;

  const finalPhrase = getPhraseFrames({
    phrase: "forever lost",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });

  const finalImpactFrame =
    finalPhrase.from > 0 ? finalPhrase.from : impactFrame + 600;

  const silenceFlash = interpolate(
    frame,
    [impactFrame, impactFrame + 4, impactFrame + 12],
    [0, 0.18, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const finalFlash = interpolate(
    frame,
    [finalImpactFrame, finalImpactFrame + 4, finalImpactFrame + 12],
    [0, 0.18, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const impactFlash = Math.max(silenceFlash, finalFlash);

  const badgeSpring = (trigger: number) =>
    spring({
      frame: Math.max(0, frame - trigger),
      fps,
      config: { damping: 12, stiffness: 200 },
    });

  const badgeOpacity = (trigger: number) =>
    interpolate(Math.max(0, frame - trigger), [0, 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  const badge240 = getPhraseFrames({
    phrase: "two hundred and forty",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const badge240Frame = badge240.from > 0 ? badge240.from : 338;

  const badgeLanguage = getPhraseFrames({
    phrase: "never been identified",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const badgeLanguageFrame = badgeLanguage.from > 0 ? badgeLanguage.from : 960;

  const badge600 = getPhraseFrames({
    phrase: "six hundred",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const badge600Frame = badge600.from > 0 ? badge600.from : impactFrame;

  return (
    <AbsoluteFill className="overflow-hidden" style={{ backgroundColor: C.bg }}>
      {/* <Audio
        src={staticFile(`${ASSET}/audio/bgm/ep003_bgm_landscape.mp3`)}
        volume={(f) => {
          if (f < durationInFrames) return 0.18;
          return 0;
        }}
        loop
      /> */}

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: `scale(${kenBurns})` }}
      >
        <Img
          src={staticFile(`${ASSET}/images/ep003_manuscript_spread.jpeg`)}
          className="size-full object-cover"
        />

        <div className="absolute inset-0" style={{ opacity: wheelOpacity }}>
          <Img
            src={staticFile(`${ASSET}/images/ep003_astronomical_wheel.jpeg`)}
            className="size-full object-cover"
          />
        </div>

        <div className="absolute inset-0" style={{ opacity: beineckeOpacity }}>
          <Img
            src={staticFile(
              `${ASSET}/images/ep003_yale_beinecke_interior.jpeg`,
            )}
            className="size-full object-cover"
          />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.70) 100%)",
        }}
      />

      <DustParticles count={180} />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.70) 100%)",
        }}
      />

      {badge240Frame > 0 && (
        <div
          className="pointer-events-none absolute rounded-xl px-6 py-4"
          style={{
            right: 40,
            top: "28%",
            opacity: badgeOpacity(badge240Frame),
            transform: `scale(${badgeSpring(badge240Frame)})`,
            backgroundColor: "rgba(10,10,10,0.88)",
            border: `1px solid ${C.gold}`,
          }}
        >
          <div
            className="text-4xl font-black tracking-wider"
            style={{ fontFamily: cinzelFont, color: C.gold }}
          >
            240 PAGES
          </div>
          <div
            className="mt-1.5 text-2xl"
            style={{ fontFamily: interFont, color: C.gray }}
          >
            More text than a short novel
          </div>
        </div>
      )}

      {badgeLanguageFrame > 0 && (
        <div
          className="pointer-events-none absolute rounded-xl px-6 py-4"
          style={{
            right: 40,
            top: "48%",
            opacity: badgeOpacity(badgeLanguageFrame),
            transform: `scale(${badgeSpring(badgeLanguageFrame)})`,
            backgroundColor: "rgba(10,10,10,0.88)",
            border: `1px solid ${C.red}`,
          }}
        >
          <div
            className="text-3xl font-black tracking-wider"
            style={{ fontFamily: cinzelFont, color: C.red }}
          >
            LANGUAGE: UNKNOWN
          </div>
          <div
            className="mt-1.5 text-2xl"
            style={{ fontFamily: interFont, color: C.gray }}
          >
            No known match on earth
          </div>
        </div>
      )}

      {badge600Frame > 0 && (
        <div
          className="pointer-events-none absolute rounded-xl px-6 py-4"
          style={{
            right: 40,
            top: "68%",
            opacity: badgeOpacity(badge600Frame),
            transform: `scale(${badgeSpring(badge600Frame)})`,
            backgroundColor: "rgba(10,10,10,0.88)",
            border: `1px solid ${C.gold}`,
          }}
        >
          <div
            className="text-4xl font-black tracking-wider"
            style={{ fontFamily: cinzelFont, color: C.gold }}
          >
            600 YEARS
          </div>
          <div
            className="mt-1.5 text-2xl"
            style={{ fontFamily: interFont, color: C.gray }}
          >
            Of silence
          </div>
        </div>
      )}

      <div
        className="absolute rounded-lg px-5 py-3"
        style={{
          top: 50,
          left: 50,
          opacity: Math.min(titleOpacity, 1 - titleExitOpacity),
          transform: `translateY(${interpolate(titleSpring, [0, 1], [-20, 0])}px)`,
          backgroundColor: "rgba(0,0,0,0.55)",
        }}
      >
        <div
          className="text-5xl font-black tracking-widest"
          style={{ fontFamily: cinzelFont, color: C.gold }}
        >
          FOREVER LOST
        </div>
        <div
          className="mt-1 text-3xl font-semibold tracking-wider"
          style={{ fontFamily: interFont, color: C.gray }}
        >
          EPISODE 003
        </div>
        <div
          className="mt-2 h-[3px] rounded-sm"
          style={{
            backgroundColor: C.gold,
            width: interpolate(underlineSpring, [0, 1], [0, 220]),
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute text-center"
        style={{
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${chapterScale})`,
          opacity:
            Math.min(chapterOpacity, 1 - chapterExitOpacity) * chapterOpacity,
        }}
      >
        <div
          className="rounded-xl px-10 py-6"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
        >
          <div
            className="text-5xl font-black tracking-wider"
            style={{
              fontFamily: cinzelFont,
              color: C.white,
              textShadow: `0 0 ${glowPulse}px ${C.gold}`,
            }}
          >
            The Voynich Manuscript
          </div>
          <div
            className="mt-4 text-4xl font-bold tracking-wider"
            style={{ fontFamily: interFont, color: C.gold }}
          >
            Why Nobody Can Decode It
          </div>
        </div>
      </div>

      <TickerBar opacity={1} color={C.gold} />

      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: C.gold, opacity: impactFlash }}
      />

      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET}/audio/vo/ep003_L_s1_intro.wav`)}
          volume={1}
        />
        <YouTubeCaptions
          transcript={TRASCRIPT_DATA}
          highlightedWords={[
            "1400s",
            "Six",
            "hundred",
            "years",
            "Voynich",
            "manuscript",
            "Beinecke",
            "Rare",
            "Book",
            "Yale",
            "University",
            "forever",
            "lost",
          ]}
          position="bottom-center"
          startFrame={0}
          showOverlay
        />
      </Sequence>

      <Sequence durationInFrames={120}>
        <Audio
          src={staticFile(`${ASSET}/audio/sfx/deep_rumble.wav`)}
          volume={(f) =>
            interpolate(f, [0, 120], [0.5, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>

      <Sequence from={60}>
        <Audio
          src={staticFile(`${ASSET}/audio/sfx/paper_rustle.wav`)}
          volume={0.5}
        />
      </Sequence>

      <Sequence from={impactFrame}>
        <Audio
          src={staticFile(`${ASSET}/audio/sfx/impact_thud.wav`)}
          volume={0.6}
        />
      </Sequence>

      <Sequence from={finalImpactFrame}>
        <Audio
          src={staticFile(`${ASSET}/audio/sfx/impact_thud.wav`)}
          volume={0.6}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
