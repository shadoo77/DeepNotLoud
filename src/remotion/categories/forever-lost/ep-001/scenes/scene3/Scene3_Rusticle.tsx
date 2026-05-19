import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Img,
  staticFile,
  interpolate,
} from "remotion";
import { Audio } from "@remotion/media";
import { TiktokCaptions } from "@/components/atoms/TiktokCaptions";
import { DissolutionTimeline } from "@/components/atoms/DissolutionTimeline";
import { getPhraseFrames } from "@/lib/utils";
import { TRASCRIPT_DATA as transcriptData, VO_START_FRAME } from "./constants";

const ASSET = "assets/forever-lost/ep-001";

export function Scene3_Rusticle() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gpf = (phrase: string) =>
    getPhraseFrames({
      phrase,
      transcriptData,
      fps,
      voiceOverStartFrame: VO_START_FRAME,
    }).from;

  const frameRusticle = gpf("rusticles");
  const frame100kg = gpf("100");
  const dissolvingFrame = gpf("dissolving");

  // ✅ FIX 1: Capped Zoom & Pan (Ken Burns Effect)
  // Instead of zooming 3x (which destroys resolution), we zoom max 1.4x
  // and add a slight downward pan to create the illusion of movement.
  const zoomStage1 = interpolate(frame, [0, fps * 8], [1, 1.4]);
  const panY1 = interpolate(frame, [0, fps * 8], [0, -100]); // Pan up slowly

  const zoomStage2 = interpolate(
    frame,
    [frameRusticle, frameRusticle + fps * 8],
    [1, 1.5], // Capped at 1.5x
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // ✅ FIX 2: Advanced BGM Ducking & "Dissolving Silence"
  const bgmVolume = interpolate(
    frame,
    [
      0,
      VO_START_FRAME - 15,
      VO_START_FRAME, // VO starts: duck to 15%
      frame100kg - 30, // Approaching clock: start dipping more
      frame100kg, // Clock starts: deep duck to 5% (makes room for high frequencies)
      dissolvingFrame - 15, // Right before "dissolving"
      dissolvingFrame + 45, // 1.5 seconds after "dissolving" starts -> absolute silence
    ],
    [0.25, 0.25, 0.15, 0.15, 0.05, 0.05, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // ✅ FIX 3: SFX Volume Balancing to prevent audio clipping (static)
  // Lowering base volumes so they don't exceed 1.0 when stacked with VO
  const bubblesVol = 0.15;
  const clockVol = 0.2;
  const dissolveVol = 0.3;

  const highlightedWords = [
    "eaten",
    "alive",
    "halomonas",
    "titanicae",
    "100",
    "kilograms",
    "dissolving",
  ];

  // Caption Sway (Underwater drift - 4-second cycle)
  const swayX = Math.sin((frame / fps) * (Math.PI / 2)) * 15;

  return (
    <AbsoluteFill className="bg-abyssBlack overflow-hidden">
      {/* ====== LAYER 1: RUSTICLES ====== */}
      <AbsoluteFill
        style={{
          opacity:
            frame < frameRusticle
              ? 1
              : interpolate(
                  frame,
                  [frameRusticle, frameRusticle + 30],
                  [1, 0],
                  { extrapolateRight: "clamp" },
                ),
        }}
      >
        <Img
          src={staticFile(`${ASSET}/images/img_rusticle_macro.png`)}
          className="h-full w-full object-cover"
          style={{
            // Added slight blur to hide compression artifacts when scaling
            filter:
              zoomStage1 > 1.2 ? `blur(${(zoomStage1 - 1) * 2}px)` : "none",
            transform: `scale(${zoomStage1}) translateY(${panY1}px)`,
            transformOrigin: "50% 60%",
          }}
        />
      </AbsoluteFill>

      {/* ====== LAYER 2: BACTERIA ====== */}
      <Sequence from={frameRusticle}>
        <AbsoluteFill>
          <Img
            src={staticFile(`${ASSET}/images/img_bacteria_timelapse.png`)}
            className="h-full w-full object-cover"
            style={{
              opacity: interpolate(
                frame,
                [frameRusticle, frameRusticle + 30],
                [0, 1],
                { extrapolateRight: "clamp" },
              ),
              // Artifact blur for heavy zooms
              filter:
                zoomStage2 > 1.2 ? `blur(${(zoomStage2 - 1) * 2}px)` : "none",
              transform: `scale(${zoomStage2})`,
              transformOrigin: "50% 50%",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ====== TIMELINE ====== */}
      <Sequence from={frame100kg}>
        <DissolutionTimeline
          // startFrame={frame100kg}
          durationFrames={fps * 10}
        />
      </Sequence>

      {/* ====== AUDIO LAYERS ====== */}
      <Audio
        src={staticFile(`${ASSET}/voices/sfx/sfx_micro_bubbles.wav`)}
        volume={bubblesVol}
      />

      <Sequence from={frame100kg}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_clock_tick.wav`)}
          volume={clockVol}
        />
      </Sequence>

      <Sequence from={dissolvingFrame}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_dissolution.wav`)}
          volume={dissolveVol}
        />
      </Sequence>

      {/* BGM with Advanced Ducking */}
      <Audio
        src={staticFile(`${ASSET}/voices/bgm/bgm_scene3_choir.mp3`)}
        volume={bgmVolume}
      />

      {/* Voiceover */}
      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET}/voices/vo/vo_scene3.wav`)}
          volume={0.85} // Slightly lowered to leave headroom for SFX
        />
      </Sequence>

      {/* ====== CAPTIONS (With Underwater Sway) ====== */}
      <div
        style={{
          transform: `translateX(${swayX}px)`,
          width: "100%",
          height: "100%",
        }}
      >
        <TiktokCaptions
          transcript={transcriptData}
          highlightedWords={highlightedWords}
          position="bottom-center"
          startFrame={VO_START_FRAME}
          switchCaptionsEveryMs={2000}
          showOverlay
        />
      </div>
    </AbsoluteFill>
  );
}
