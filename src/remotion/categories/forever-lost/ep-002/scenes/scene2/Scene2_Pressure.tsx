import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Img,
  staticFile,
  interpolate,
  spring,
} from "remotion";
import { Audio } from "@remotion/media";
import { TiktokCaptions } from "@/components/atoms/TiktokCaptions";
import { Explode } from "@/components/atoms/Explode";
import { VO_START_FRAME, TRASCRIPT_DATA } from "./constants";

const ASSET = "assets/forever-lost/ep-002";

const getWordFrame = (wordToFind: string, fps: number) => {
  const word = TRASCRIPT_DATA.find((w) =>
    w.text
      .toLowerCase()
      .replace(/[.,!?]/g, "")
      .includes(wordToFind.toLowerCase()),
  );
  return word ? Math.round((word.startMs / 1000) * fps) + VO_START_FRAME : 0;
};

export function Scene2_Pressure() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const frameCup = getWordFrame("crushed", fps);
  const frameHull = getWordFrame("corroding", fps);
  const frameDisintegrate = getWordFrame("disintegrate", fps);

  const pressureScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 8, stiffness: 60 },
  });

  const compressionScale = interpolate(pressureScale, [0, 1], [1, 0.85]);

  const highlightedWords = [
    "380",
    "crushed",
    "corroding",
    "century",
    "disintegrate",
  ];

  return (
    <AbsoluteFill className="bg-abyssBlack overflow-hidden">
      <Sequence from={frameHull}>
        <AbsoluteFill
          style={{
            opacity: interpolate(frame, [frameHull, frameHull + 30], [0, 0.4], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Img
            src={staticFile(`${ASSET}/images/img_hull_deformation.jpeg`)}
            className="object-cover w-full h-full"
          />
        </AbsoluteFill>
      </Sequence>

      <AbsoluteFill className="flex justify-center items-center">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1920 1080"
          className="absolute opacity-60"
        >
          <path
            d={`M960 50 L960 ${interpolate(compressionScale, [0.85, 1], [200, 50])}`}
            className="stroke-rustOrange"
            strokeWidth="4"
          />
          {/* Bottom Arrow */}
          <path
            d={`M960 1030 L960 ${interpolate(compressionScale, [0.85, 1], [880, 1030])}`}
            className="stroke-rustOrange"
            strokeWidth="4"
          />
          {/* Left Arrow */}
          <path
            d={`M50 540 L${interpolate(compressionScale, [0.85, 1], [200, 50])} 540`}
            className="stroke-rustOrange"
            strokeWidth="4"
          />
          {/* Right Arrow */}
          <path
            d={`M1870 540 L${interpolate(compressionScale, [0.85, 1], [1720, 1870])} 540`}
            className="stroke-rustOrange"
            strokeWidth="4"
          />
        </svg>

        <div
          className="w-[400px] h-[400px] rounded-full bg-deepNavy border-2 border-oceanBlue"
          style={{
            transform: `scale(${compressionScale})`,
            boxShadow: "0 0 40px var(--color-oceanBlue)",
          }}
        />
      </AbsoluteFill>

      <Sequence
        from={frameCup}
        durationInFrames={frameHull > 0 ? frameHull - frameCup : fps * 5}
      >
        <AbsoluteFill className="flex justify-center items-center">
          <Img
            src={staticFile(`${ASSET}/images/img_pressure_crushed_cup.png`)}
            className="object-contain w-[70%] h-[70%]"
            style={{
              opacity: interpolate(frame, [frameCup, frameCup + 30], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={frameDisintegrate}>
        <AbsoluteFill
          className="flex justify-center items-center bg-abyssBlack"
          style={{
            opacity: interpolate(
              frame,
              [frameDisintegrate, frameDisintegrate + 15],
              [0, 1],
              { extrapolateRight: "clamp" },
            ),
          }}
        >
          <Explode
            text="DISINTEGRATE"
            triggerFrame={frameDisintegrate}
            color="var(--color-rustOrange)"
            fontSize={120}
          />
        </AbsoluteFill>
      </Sequence>

      <Audio
        src={staticFile(`${ASSET}/voices/bgm/bgm_scene0_cello.mp3`)}
        volume={0.25}
      />

      <Sequence from={frameCup}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_crushing.wav`)}
          volume={0.4}
        />
      </Sequence>

      <Sequence from={frameHull}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_metal_shriek.wav`)}
          volume={0.3}
        />
      </Sequence>

      <Audio
        src={staticFile(`${ASSET}/voices/sfx/sfx_heartbeat.wav`)}
        volume={0.3}
      />

      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET}/voices/vo/vo_scene2.wav`)}
          volume={0.8}
        />
      </Sequence>

      <TiktokCaptions
        transcript={TRASCRIPT_DATA.filter(
          (w) => !w.text.toLowerCase().includes("disintegrate"),
        )}
        highlightedWords={highlightedWords}
        position="center"
        startFrame={VO_START_FRAME}
      />
    </AbsoluteFill>
  );
}
