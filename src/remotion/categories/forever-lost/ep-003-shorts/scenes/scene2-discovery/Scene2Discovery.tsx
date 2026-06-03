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

export const Scene2Discovery: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Castle BG slow parallax — slides up slightly over the whole scene
  const bgY = interpolate(frame, [0, sceneDuration], [0, -8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });
  const bgScale = interpolate(frame, [0, sceneDuration], [1.0, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });
  // Pacing fill: subtle image breath on establishing shot (frames 0-27)
  const bgBreath = interpolate(Math.sin(frame * 0.04), [-1, 1], [0.92, 1]);

  // "1912" year top-left
  const yr1912Opacity = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const yrLineWidth = interpolate(Math.max(0, frame - 50), [0, 30], [0, 60], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Voynich portrait slide-in from right (spring)
  const portraitSpring = spring({
    frame: Math.max(0, frame - 70),
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const portraitX = interpolate(portraitSpring, [0, 1], [500, 30]);
  const portraitOpacity = interpolate(Math.max(0, frame - 70), [0, 25], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Portrait name plate
  const nameOpacity = interpolate(Math.max(0, frame - 120), [0, 25], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const nameUnderlineSpring = spring({
    frame: Math.max(0, frame - 155),
    fps,
    config: { damping: 18, stiffness: 120 },
  });
  const nameUnderlineWidth = interpolate(nameUnderlineSpring, [0, 1], [0, 200]);
  const nameUnderlineOpacity = interpolate(
    Math.max(0, frame - 155), [0, 20, 350, 370], [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Location badge bottom-left
  const locBadgeSpring = spring({
    frame: Math.max(0, frame - 170),
    fps,
    config: { damping: 12, stiffness: 150 },
  });
  const locBadgeScale = interpolate(locBadgeSpring, [0, 1], [0.5, 1]);
  const locBadgeOpacity = interpolate(Math.max(0, frame - 170), [0, 15], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Year range "1404–1438" glow (carbon dating section)
  const yrRangeOpacity = interpolate(frame, [270, 300], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const yrPulse = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.6, 1]);

  // "NOBODY KNEW" text section
  const nobodyKnewOpacity = interpolate(frame, [390, 420], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const nobodyKnowsOpacity = interpolate(frame, [465, 490], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Portrait exit fade
  const portraitExit = interpolate(Math.max(0, frame - 430), [0, 60], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // ── Micro-reveals (pacing) ──
  // Corner gold flare during portrait entry
  const flareOpacity = interpolate(
    frame, [80, 110, 160, 190], [0, 0.45, 0.45, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Section-divider line draw at transition to carbon dating section
  const sectionLineDraw = interpolate(Math.max(0, frame - 230), [0, 40], [0, 100], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const sectionLineOpacity = interpolate(Math.max(0, frame - 270), [0, 20], [0.4, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Second section line at transition to mystery section (pacing fill)
  const mysteryLineDraw = interpolate(Math.max(0, frame - 305), [0, 25], [0, 60], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const mysteryLineOpacity = interpolate(Math.max(0, frame - 330), [0, 15], [0.4, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Text fragment "unknowable" during "early 1400s" lull
  const unknowableFade = interpolate(
    frame, [320, 350, 370, 390], [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Micro gold flash at transition to mystery section (pacing fill)
  const mysteryFlash = interpolate(
    Math.max(0, frame - 376), [0, 6, 12], [0, 0.08, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Second flare during mystery section
  const flare2Opacity = interpolate(
    frame, [420, 450, 470, 490], [0, 0.35, 0.35, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Question mark watermark
  const qmarkOpacity = interpolate(
    frame, [410, 440, 470, 500], [0, 0.12, 0.12, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill className="overflow-hidden" style={{ backgroundColor: C.bg }}>
      {/* Castle BG with parallax + subtle breath */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          transform: `scale(${bgScale}) translateY(${bgY}px)`,
          transformOrigin: "center",
          opacity: bgBreath,
        }}
      >
        <Img
          src={staticFile(`${ASSET_PATH}/images/short/ep003_castle_exterior.jpeg`)}
          className="size-full object-cover"
        />
      </div>

      {/* Micro gold flash (mystery section transition) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: C.gold, opacity: mysteryFlash }}
      />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* ── 1912 year top-left ── */}
      <div
        className="pointer-events-none absolute flex items-center gap-3"
        style={{ top: "8%", left: "6%", opacity: yr1912Opacity }}
      >
        <span
          className="text-5xl font-black tracking-wider"
          style={{ fontFamily: cinzelFont, color: C.gold }}
        >
          1912
        </span>
      </div>
      <div
        className="pointer-events-none absolute"
        style={{
          top: "12%",
          left: "6%",
          height: 2,
          width: yrLineWidth,
          backgroundColor: C.gold,
          opacity: yr1912Opacity * 0.6,
          borderRadius: 1,
        }}
      />

      {/* ── Section divider line draw (carbon → mystery) ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "50%",
          left: 0,
          width: "100%",
          opacity: sectionLineOpacity,
        }}
      >
        <svg width="100%" height={1}>
          <line
            x1={0} y1={0}
            x2={`${sectionLineDraw}%`} y2={0}
            stroke={C.gold}
            strokeWidth={1}
            strokeOpacity={0.3}
          />
        </svg>
      </div>

      {/* ── Mystery section line draw ── */}
      <div
        className="pointer-events-none absolute flex justify-center"
        style={{
          top: "55%",
          width: "100%",
          opacity: mysteryLineOpacity,
        }}
      >
        <div
          style={{
            width: `${mysteryLineDraw}%`,
            maxWidth: 200,
            height: 1,
            backgroundColor: C.gold,
            opacity: 0.25,
          }}
        />
      </div>

      {/* ── Voynich portrait right-side ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          right: portraitX,
          top: "6%",
          width: "38%",
          opacity: portraitOpacity * portraitExit,
        }}
      >
        <div className="flex flex-col items-center">
          <div
            className="overflow-hidden rounded-xl"
            style={{
              width: "100%",
              border: "2px solid rgba(200,169,110,0.4)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            }}
          >
            <Img
              src={staticFile(`${ASSET_PATH}/images/short/ep003_wilfrid_voynich.png`)}
              className="size-full object-cover"
              style={{ aspectRatio: "3/4" }}
            />
          </div>

          {/* Name plate */}
          <div
            className="mt-3 text-center"
            style={{ opacity: nameOpacity * portraitExit }}
          >
            <div
              className="text-xl font-bold tracking-wider"
              style={{ fontFamily: cinzelFont, color: C.white }}
            >
              WILFRID VOYNICH
            </div>
            <div
              className="mt-1 text-base font-semibold tracking-wide"
              style={{ fontFamily: interFont, color: C.gray }}
            >
              1865–1930
            </div>
            <div
              className="mx-auto mt-2"
              style={{
                width: nameUnderlineWidth,
                height: 2,
                backgroundColor: C.gold,
                opacity: nameUnderlineOpacity,
                borderRadius: 1,
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Location badge bottom ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          left: 30,
          bottom: 160,
          opacity: locBadgeOpacity,
          transform: `scale(${locBadgeScale})`,
        }}
      >
        <div
          className="rounded-xl px-4 py-3"
          style={{
            backgroundColor: "rgba(10,10,10,0.88)",
            border: "1px solid rgba(200,169,110,0.5)",
          }}
        >
          <div
            className="text-xl font-black tracking-wider"
            style={{ fontFamily: cinzelFont, color: C.gold }}
          >
            VILLA MONDRAGONE
          </div>
          <div
            className="mt-1 text-lg tracking-wide"
            style={{ fontFamily: interFont, color: C.gray }}
          >
            Frascati, Italy
          </div>
        </div>
      </div>

      {/* ── Year range "1404–1438" glow ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "25%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: yrRangeOpacity,
        }}
      >
        <span
          className="text-4xl font-bold tracking-wider"
          style={{
            fontFamily: cinzelFont,
            color: C.gold,
            opacity: yrPulse,
            textShadow: `0 0 ${interpolate(yrPulse, [0.6, 1], [8, 30])}px ${C.gold}`,
          }}
        >
          1404–1438
        </span>
        <div
          className="mt-2 text-center text-lg tracking-wide"
          style={{ fontFamily: interFont, color: C.gray }}
        >
          Carbon dated
        </div>
      </div>

      {/* ── "NOBODY KNEW" / "NOBODY KNOWS" ── */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ opacity: nobodyKnewOpacity }}
      >
        <div className="text-center" style={{ padding: "0 40px" }}>
          <div
            className="text-4xl font-black tracking-wider"
            style={{ fontFamily: cinzelFont, color: C.white }}
          >
            NOBODY KNEW
          </div>
          <div
            className="mt-6 text-4xl font-black tracking-wider"
            style={{
              fontFamily: cinzelFont,
              color: C.white,
              opacity: nobodyKnowsOpacity,
            }}
          >
            NOBODY KNOWS
          </div>
        </div>
      </div>

      {/* ── Question mark watermark ── */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ opacity: qmarkOpacity }}
      >
        <span
          className="text-[300px] font-black"
          style={{ fontFamily: cinzelFont, color: C.gold, opacity: 0.06 }}
        >
          ?
        </span>
      </div>

      {/* ── Micro-reveal: corner flare portrait entry ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: 0,
          right: 0,
          width: 220,
          height: 220,
          background:
            "radial-gradient(circle at top right, rgba(200,169,110,0.18), transparent 70%)",
          opacity: flareOpacity,
        }}
      />

      {/* ── Micro-reveal: "unknowable" text fragment ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: "28%",
          right: "8%",
          opacity: unknowableFade,
        }}
      >
        <span
          className="text-xl font-semibold tracking-wider italic"
          style={{ fontFamily: cinzelFont, color: C.gold }}
        >
          unknowable
        </span>
      </div>

      {/* ── Micro-reveal: mystery corner flare ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: 0,
          left: 0,
          width: 200,
          height: 200,
          background:
            "radial-gradient(circle at bottom left, rgba(200,169,110,0.15), transparent 70%)",
          opacity: flare2Opacity,
        }}
      />

      {/* Badges */}
      <SceneBadges
        badges={BADGES}
        transcriptData={TRASCRIPT_DATA}
        voiceOverStartFrame={VO_START_FRAME}
      />

      {/* SFX — quill scratch at scene open */}
      <Sequence durationInFrames={90}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/quill_scratch.mp3`)}
          volume={(f) =>
            interpolate(f, [0, 90], [0.3, 0], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>

      {/* VO + Captions */}
      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/vo/short/ep003_s2_discovery.mp3`)}
          volume={1}
        />
        <YouTubeCaptions
          transcript={TRASCRIPT_DATA}
          highlightedWords={[
            "1912", "Voynich", "castle", "Carbon",
            "dating", "1400s", "nobody", "knows", "wrote",
          ]}
          position="top-center"
          fontSize="small"
          startFrame={0}
          showOverlay
        />
      </Sequence>
    </AbsoluteFill>
  );
};
