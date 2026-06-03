import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
  Img,
  staticFile,
  interpolate,
} from "remotion";
import { Audio } from "@remotion/media";
import { TiktokCaptions } from "@/components/atoms/TiktokCaptions";
import { DissolutionTimeline } from "@/components/atoms/DissolutionTimeline";
import { Explode } from "@/components/atoms/Explode";
import { getPhraseFrames } from "@/lib/utils";
import {
  VO_START_FRAME,
  TRASCRIPT_DATA_ACT2 as TRASCRIPT_DATA,
} from "../constants";

const ASSET = "assets/forever-lost/ep-001";
const SHORT = "assets/forever-lost/ep-001/images/short";

export const Act2_ConsumingOcean: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === VOICE-TRIGGERED TIMINGS ===
  const frameBacteria = getPhraseFrames({
    phrase: "Bacteria",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  const frame100kg = getPhraseFrames({
    phrase: "100",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  const frame2030 = getPhraseFrames({
    phrase: "2030",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  const frameDisintegrate = getPhraseFrames({
    phrase: "disintegrate",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  // === ANIMATIONS ===

  // Rusticle: slow Ken Burns zoom (Scene3-inspired)
  const rusticleZoom = interpolate(frame, [0, fps * 8], [1, 1.2], {
    extrapolateRight: "clamp",
  });

  // Bacteria: slow zoom
  const bacteriaZoom = interpolate(
    frame,
    [frameBacteria, frameBacteria + fps * 10],
    [1, 1.3],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );

  // Dissolution: slow zoom
  const dissolutionZoom = interpolate(
    frame,
    [frame2030, frame2030 + fps * 8],
    [1, 1.2],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );

  // 100 KG badge pop
  const badge100 = spring({
    frame: Math.max(0, frame - frame100kg),
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  // === LAYER TRANSITIONS ===
  // Rusticle → Bacteria at "Bacteria called"
  const rusticleOpacity = interpolate(
    frame,
    [frameBacteria - 15, frameBacteria + 15],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const bacteriaOpacity = interpolate(
    frame,
    [frameBacteria - 15, frameBacteria + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Bacteria → Dissolution at "2030"
  const bacteriaOpacity2 = interpolate(
    frame,
    [frame2030 - 15, frame2030 + 15],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const dissolutionOpacity = interpolate(
    frame,
    [frame2030 - 15, frame2030 + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const highlightedWords = ["100", "2030"];

  return (
    <AbsoluteFill
      style={{ backgroundColor: "var(--color-abyssBlack)" }}
      className="overflow-hidden"
    >
      {/* === LAYER 1: Rusticle macro === */}
      <AbsoluteFill style={{ opacity: rusticleOpacity }}>
        <Img
          src={staticFile(`${SHORT}/img_shorts_act2_rusticle_macro.jpeg`)}
          className="h-full w-full object-cover"
          style={{
            transform: `scale(${rusticleZoom})`,
            transformOrigin: "50% 60%",
          }}
        />
      </AbsoluteFill>

      {/* === LAYER 2: Bacteria === */}
      <AbsoluteFill style={{ opacity: bacteriaOpacity * bacteriaOpacity2 }}>
        <Img
          src={staticFile(`${SHORT}/img_shorts_act2_bacteria.jpeg`)}
          className="h-full w-full object-cover"
          style={{
            transform: `scale(${bacteriaZoom})`,
            transformOrigin: "50% 50%",
          }}
        />
      </AbsoluteFill>

      {/* === LAYER 3: Dissolution === */}
      <AbsoluteFill style={{ opacity: dissolutionOpacity }}>
        <Img
          src={staticFile(`${SHORT}/img_shorts_act2_dissolution.jpeg`)}
          className="h-full w-full object-cover"
          style={{
            transform: `scale(${dissolutionZoom})`,
            transformOrigin: "50% 50%",
          }}
        />
      </AbsoluteFill>

      {/* === 100 KG badge === */}
      {frame100kg > 0 && (
        <div
          className="absolute top-[20%] right-0 left-0 flex justify-center"
          style={{
            opacity: interpolate(
              Math.max(0, frame - frame100kg),
              [0, 12],
              [0, 1],
              { extrapolateRight: "clamp" },
            ),
          }}
        >
          <div
            className="bg-deepNavy/80 border-rustOrange rounded-xl border px-6 py-4 backdrop-blur-md"
            style={{ transform: `scale(${badge100})` }}
          >
            <div className="text-rustOrange font-mono text-5xl font-bold">
              100 KG
            </div>
            <div className="text-surfaceWhite text-center text-sm">
              of iron lost every day
            </div>
          </div>
        </div>
      )}

      {/* === DissolutionTimeline === */}
      {frame2030 > 0 && (
        <div
          className="absolute top-[40%] right-0 left-0 px-8"
          style={{
            opacity: interpolate(
              Math.max(0, frame - frame2030),
              [0, 20],
              [0, 1],
              { extrapolateRight: "clamp" },
            ),
          }}
        >
          <DissolutionTimeline
            startFrame={frame2030}
            durationFrames={fps * 5}
          />
        </div>
      )}

      {/* === DISINTEGRATE explosion === */}
      {frameDisintegrate > 0 && (
        <Sequence from={frameDisintegrate}>
          <AbsoluteFill className="bg-abyssBlack/80 flex items-center justify-center backdrop-blur-sm">
            <Explode
              text="DISINTEGRATE"
              triggerFrame={frameDisintegrate}
              color="var(--color-rustOrange)"
              fontSize={72}
            />
          </AbsoluteFill>
        </Sequence>
      )}

      {/* === AUDIO === */}
      <Audio
        src={staticFile(`${ASSET}/voices/sfx/sfx_micro_bubbles.mp3`)}
        volume={0.15}
      />

      <Sequence from={frame2030}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_clock_tick.mp3`)}
          volume={0.15}
        />
      </Sequence>

      <Sequence from={frameDisintegrate}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_dissolution.mp3`)}
          volume={0.25}
        />
      </Sequence>

      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET}/voices/vo/short/vo_scene2.mp3`)}
          volume={0.85}
        />
      </Sequence>

      {/* === CAPTIONS === */}
      <TiktokCaptions
        transcript={TRASCRIPT_DATA}
        highlightedWords={highlightedWords}
        position="youtube-shorts"
        startFrame={VO_START_FRAME}
        switchCaptionsEveryMs={1800}
        showOverlay
      />
    </AbsoluteFill>
  );
};
