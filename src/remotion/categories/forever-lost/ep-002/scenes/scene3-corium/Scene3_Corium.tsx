import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
} from "remotion";
import { Audio } from "@remotion/media";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { KineticText, LowerThird } from "../../components";
import { ASSET_PATH, C } from "../../constants";
import { TRASCRIPT_DATA } from "./constants";

const VO_TEXT =
  "When the reactor core melted, the nuclear fuel didn't burn away. It melted downward. Mixing with concrete, steel, and sand as it went, it formed a new substance. Scientists eventually named it corium. The most famous deposit in Chernobyl's basement is known as the elephant's foot. In 1986, standing next to it for just four minutes would have been a fatal dose of radiation. Today, that same mass is still sitting in the basement of reactor 4. Exactly where it landed.";

export const Scene3Corium: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imagePulse = interpolate(
    frame % (fps * 4),
    [0, fps * 2, fps * 4],
    [1.0, 1.02, 1.0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const dividerH = interpolate(frame, [30, 70], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const badgeFrames = [60, 120, 200] as const;
  const badgePops = badgeFrames.map((start) =>
    spring({
      fps,
      frame: Math.max(0, frame - start),
      config: { damping: 14, stiffness: 180 },
    }),
  );

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Audio src={staticFile(`${ASSET_PATH}/audio/vo/ep02L_s3.wav`)} />
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/geiger_loop.wav`)}
        volume={0.18}
        loop
      />
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/radiation_hum.wav`)}
        volume={0.18}
        loop
      />

      {/* Right image panel (60%) */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "60%",
          height: "100%",
        }}
      >
        <Img
          src={staticFile(`${ASSET_PATH}/images/ep02L_s3_corium.jpeg`)}
          className="h-full w-full object-cover"
          style={{ transform: `scale(${imagePulse})` }}
        />
      </div>

      {/* Left panel background */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "40%",
          height: "100%",
          background:
            "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.35), rgba(0,0,0,0))",
        }}
      />

      {/* Divider line draw */}
      <div
        className="absolute left-[40%] top-0 w-[2px]"
        style={{
          height: `${dividerH}%`,
          backgroundColor: C.green,
          boxShadow: `0 0 12px ${C.green}`,
        }}
      />

      <LowerThird
        title="THE ELEPHANT'S FOOT"
        subtitle="Reactor 4 Basement · 1986–Present"
        startFrame={30}
      />

      {/* Left VO kinetic text */}
      <div className="absolute left-0 top-0 h-full w-[40%] px-10 pt-36 pb-28">
        <div className="rounded-xl border border-white/15 bg-black/30 p-6 backdrop-blur-[2px]">
          <KineticText
            text={VO_TEXT}
            startFrame={0}
            fontSize={25}
            color={C.white}
            staggerFrames={8}
          />
        </div>
      </div>

      {/* Right floating data badges */}
      <div className="absolute right-8 top-20 flex w-[52%] flex-col gap-5">
        <div
          className="rounded-lg border p-4"
          style={{
            borderColor: C.red,
            backgroundColor: "rgba(17,17,17,0.8)",
            transform: `scale(${badgePops[0]})`,
            opacity: interpolate(frame, [60, 80], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div className="font-inter text-sm tracking-wider text-white/70">TEMP AT FORMATION</div>
          <div className="font-mono text-5xl font-bold" style={{ color: C.white }}>
            ~2,000°C
          </div>
        </div>

        <div
          className="rounded-lg border p-4"
          style={{
            borderColor: C.green,
            backgroundColor: "rgba(17,17,17,0.8)",
            transform: `scale(${badgePops[1]})`,
            opacity: interpolate(frame, [120, 140], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div className="font-inter text-sm tracking-wider text-white/70">CURRENT RADIATION</div>
          <div className="font-mono text-5xl font-bold" style={{ color: C.green }}>
            ~8 Sievert/hour
          </div>
        </div>

        <div
          className="rounded-lg border p-4"
          style={{
            borderColor: C.red,
            backgroundColor: "rgba(17,17,17,0.8)",
            transform: `scale(${badgePops[2]})`,
            opacity: interpolate(frame, [200, 220], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div className="font-inter text-sm tracking-wider text-white/70">LETHAL DOSE TIME</div>
          <div className="font-mono text-5xl font-bold" style={{ color: C.red }}>
            4 minutes (1986)
          </div>
        </div>
      </div>

      <YouTubeCaptions
        transcript={TRASCRIPT_DATA}
        highlightedWords={["corium", "elephant", "foot", "four", "minutes"]}
        position="bottom-center"
        startFrame={0}
        mode="sentence"
      />
    </AbsoluteFill>
  );
};
