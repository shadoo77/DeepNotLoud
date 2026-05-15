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
import { TRASCRIPT_DATA as transcriptData, VO_START_FRAME } from "./constants";

const ASSET = "assets/forever-lost/ep-002";

const getWordFrame = (wordToFind: string, fps: number) => {
  const word = transcriptData.find((w) =>
    w.text
      .toLowerCase()
      .replace(/[.,!?]/g, "")
      .includes(wordToFind.toLowerCase()),
  );
  return word ? Math.round((word.startMs / 1000) * fps) + VO_START_FRAME : 0;
};

export function Scene3_Rusticle() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const frameRusticle = getWordFrame("rusticles", fps);
  const frame100kg = getWordFrame("100", fps);

  const zoomStage1 = interpolate(frame, [0, fps * 8], [1, 4]);
  const zoomStage2 = interpolate(
    frame,
    [frameRusticle, frameRusticle + fps * 8],
    [1, 3],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const highlightedWords = [
    "eaten",
    "alive",
    "halomonas",
    "titanicae",
    "100",
    "kilograms",
    "dissolving",
  ];

  return (
    <AbsoluteFill className="bg-abyssBlack overflow-hidden">
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
          className="w-full h-full object-cover"
          style={{
            transform: `scale(${zoomStage1})`,
            transformOrigin: "50% 60%",
          }}
        />
      </AbsoluteFill>

      <Sequence from={frameRusticle}>
        <AbsoluteFill>
          <Img
            src={staticFile(`${ASSET}/images/img_bacteria_timelapse.png`)}
            className="w-full h-full object-cover"
            style={{
              opacity: interpolate(
                frame,
                [frameRusticle, frameRusticle + 30],
                [0, 1],
                { extrapolateRight: "clamp" },
              ),
              transform: `scale(${zoomStage2})`,
              transformOrigin: "50% 50%",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={frame100kg}>
        <DissolutionTimeline
          startFrame={frame100kg}
          durationFrames={fps * 10}
        />
      </Sequence>

      <Audio
        src={staticFile(`${ASSET}/voices/bgm/bgm_scene3_choir.mp3`)}
        volume={0.2}
      />
      <Audio
        src={staticFile(`${ASSET}/voices/sfx/sfx_micro_bubbles.wav`)}
        volume={0.3}
      />

      <Sequence from={frame100kg}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_clock_tick.wav`)}
          volume={0.4}
        />
      </Sequence>

      <Sequence from={getWordFrame("dissolving", fps)}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_dissolution.wav`)}
          volume={0.5}
        />
      </Sequence>

      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET}/voices/vo/vo_scene3.wav`)}
          volume={0.8}
        />
      </Sequence>

      <TiktokCaptions
        transcript={transcriptData}
        highlightedWords={highlightedWords}
        position="center"
        startFrame={VO_START_FRAME}
      />
    </AbsoluteFill>
  );
}
