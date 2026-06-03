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
import { CountUp } from "@/components/atoms/CountUp";
import { BurjKhalifaSVG, EiffelTowerSVG } from "@/components/atoms/SvgIcons";
import { getPhraseFrames } from "@/lib/utils";
import { VO_START_FRAME, TRASCRIPT_DATA } from "./constants";

const ASSET = "assets/forever-lost/ep-001";

export const Scene1_Scale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const wireframeRotateY = interpolate(frame, [0, fps * 75], [5, -5]);
  const wireframeZoom = interpolate(frame, [0, fps * 75], [1, 1.1]);

  const dropIn = (delay: number) =>
    spring({ frame, fps, config: { damping: 12, stiffness: 100 }, delay });

  const badgeScale = (triggerFrame: number) =>
    spring({
      frame: frame - triggerFrame,
      fps,
      config: { damping: 10, stiffness: 200 },
    });

  const frame380atm = getPhraseFrames({ phrase: "380", transcriptData: TRASCRIPT_DATA, fps, voiceOverStartFrame: VO_START_FRAME }).from;
  const frame385kg = getPhraseFrames({ phrase: "385", transcriptData: TRASCRIPT_DATA, fps, voiceOverStartFrame: VO_START_FRAME }).from;

  const highlightedWords = ["3", "800", "380", "385"];

  return (
    <AbsoluteFill className="bg-deepNavy overflow-hidden">
      <AbsoluteFill>
        <Img
          src={staticFile(`${ASSET}/images/img_depth_ocean_gradien.jpeg`)}
          className="object-cover w-full h-full opacity-60"
        />
      </AbsoluteFill>

      <AbsoluteFill className="flex flex-row">
        <div
          className="relative w-1/2 h-full overflow-hidden"
          style={{ perspective: "1000px" }}
        >
          <Img
            src={staticFile(`${ASSET}/images/img_titanic_crosssection.png`)}
            className="object-contain w-full h-full opacity-90"
            style={{
              transform: `
                translateY(${interpolate(frame, [0, fps * 75], [0, 50])}px)
                scale(${wireframeZoom})
                rotateY(${wireframeRotateY}deg)
              `,
            }}
          />

          <div
            className="absolute left-0 w-full pointer-events-none"
            style={{
              top: `${interpolate(frame, [0, fps * 5], [0, 100])}%`,
              height: 2,
              backgroundColor: "var(--color-biolumTeal)",
              boxShadow: "0 0 15px 5px var(--color-biolumTeal)",
              opacity: 0.8,
            }}
          />
        </div>

        <div className="relative w-1/2 h-full flex flex-col items-center pt-20 pb-24">
          <div
            className="absolute top-20 bottom-24 w-0.5"
            style={{
              backgroundColor: "var(--color-surfaceWhite)",
              opacity: 0.2,
            }}
          >
            <div
              className="w-full opacity-50"
              style={{
                height: `${interpolate(frame, [0, fps * 10], [0, 100])}%`,
                backgroundColor: "var(--color-biolumTeal)",
                boxShadow: "0 0 10px var(--color-biolumTeal)",
              }}
            />
          </div>

          {[500, 1000, 1500, 2000, 2500, 3000, 3500].map((depth) => {
            const markerFrame = Math.round((depth / 3800) * fps * 10);
            const markerOpacity = interpolate(
              Math.max(0, frame - markerFrame),
              [0, 5],
              [0, 1],
              { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
            );

            return (
              <div
                key={depth}
                className="absolute left-1/2 flex items-center"
                style={{
                  top: `${80 + (depth / 3800) * (1080 - 180)}px`,
                  transform: "translateX(-50%)",
                  opacity: markerOpacity,
                }}
              >
                <div
                  className="w-5 h-0.5 opacity-50"
                  style={{ backgroundColor: "var(--color-surfaceWhite)" }}
                />
                <span className="ml-2.5 font-mono text-steelGrey text-sm whitespace-nowrap">
                  {depth}m
                </span>
              </div>
            );
          })}

          <div className="absolute top-[10%] text-center z-10">
            <CountUp
              to={3800}
              durationInFrames={fps * 4}
              delay={fps * 1}
              fontSize={100}
              suffix="m"
            />
            <div className="text-steelGrey text-2xl mt-2.5">
              Below Sea Level
            </div>
          </div>

          <div
            className="absolute bottom-24 left-[25%] w-10"
            style={{
              height: "12%",
              transform: `translateY(${interpolate(
                dropIn(VO_START_FRAME),
                [0, 1],
                [-500, 0],
              )}px)`,
              opacity: dropIn(VO_START_FRAME) > 0 ? 1 : 0,
            }}
          >
            <EiffelTowerSVG />
          </div>

          <div
            className="absolute bottom-24 left-[55%] w-10"
            style={{
              height: "30%",
              transform: `translateY(${interpolate(
                dropIn(VO_START_FRAME + 30),
                [0, 1],
                [-600, 0],
              )}px)`,
              opacity: dropIn(VO_START_FRAME + 30) > 0 ? 1 : 0,
            }}
          >
            <BurjKhalifaSVG />
          </div>
        </div>
      </AbsoluteFill>

      {frame380atm > 0 && (
        <div
          className="absolute top-[20%] right-[5%] bg-deepNavy/80 backdrop-blur-md border border-oceanBlue rounded-xl p-5"
          style={{ transform: `scale(${badgeScale(frame380atm)})` }}
        >
          <div className="text-biolumTeal text-[48px] font-mono font-bold">
            380 ATM
          </div>
          <div className="text-surfaceWhite text-base">Water Pressure</div>
        </div>
      )}

      {frame385kg > 0 && (
        <div
          className="absolute bottom-[25%] left-[5%] bg-deepNavy/80 backdrop-blur-md border border-rustOrange rounded-xl p-5"
          style={{ transform: `scale(${badgeScale(frame385kg)})` }}
        >
          <div className="text-rustOrange text-[48px] font-mono font-bold">
            385 KG
          </div>
          <div className="text-surfaceWhite text-base">
            Per Square Centimeter
          </div>
        </div>
      )}

      <Audio
        src={staticFile(`${ASSET}/voices/bgm/bgm_scene0_cello.mp3`)}
        volume={0.2}
      />
      <Audio
        src={staticFile(`${ASSET}/voices/sfx/sfx_pressure_groan_2.mp3`)}
        volume={0.15}
      />

      <Sequence from={fps * 1}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_sonar_ping.mp3`)}
          volume={0.4}
        />
      </Sequence>
      <Sequence from={fps * 2}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_sonar_ping.mp3`)}
          volume={0.4}
        />
      </Sequence>
      <Sequence from={fps * 3}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_sonar_ping.mp3`)}
          volume={0.4}
        />
      </Sequence>
      <Sequence from={fps * 4}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_sonar_ping.mp3`)}
          volume={0.5}
        />
      </Sequence>

      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET}/voices/vo/vo_scene1.mp3`)}
          volume={0.8}
        />
      </Sequence>

      <TiktokCaptions
        transcript={TRASCRIPT_DATA}
        highlightedWords={highlightedWords}
        position="bottom-center"
        startFrame={VO_START_FRAME}
        switchCaptionsEveryMs={4000}
      />
    </AbsoluteFill>
  );
};
