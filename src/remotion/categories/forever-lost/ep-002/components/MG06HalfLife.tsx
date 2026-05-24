import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import { AnimatedBanner } from "./AnimatedBanner";
import { KineticText } from "./KineticText";
import { ASSET_PATH, C } from "../constants";

const linePath = {
  iodine: "M 120 180 C 290 190, 360 400, 530 470",
  cesium: "M 120 170 C 340 190, 580 300, 900 420",
  strontium: "M 120 190 C 350 210, 600 320, 930 445",
  plutonium: "M 120 210 C 420 215, 760 235, 1080 270",
};

const axisPoints = ["NOW", "100yr", "1,000yr", "10,000yr", "24,000yr"];

export const MG06HalfLife: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleX = interpolate(frame, [0, 20], [-120, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const axisProgress = interpolate(frame, [20, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lineDraw = (start: number) =>
    interpolate(frame, [start, start + 70], [1000, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  const highlightPop = spring({
    fps,
    frame: Math.max(0, frame - 180),
    config: { damping: 14, stiffness: 180 },
  });

  const dissolveOut = interpolate(
    frame,
    [Math.max(0, durationInFrames - 60), durationInFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/radiation_hum.wav`)}
        volume={0.15}
        loop
      />

      <AbsoluteFill style={{ opacity: 0.26 }}>
        <Img
          src={staticFile(`${ASSET_PATH}/images/ep02L_s6_exclusion.jpeg`)}
          className="h-full w-full object-cover"
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.66), rgba(0,0,0,0.62), rgba(0,0,0,0.58))",
        }}
      />

      <div
        className="absolute top-10 right-0 left-0 text-center"
        style={{ transform: `translateX(${titleX}px)` }}
      >
        <div
          className="font-bebas text-white"
          style={{ fontSize: 76, letterSpacing: 5 }}
        >
          HOW LONG DOES RADIATION LAST?
        </div>
      </div>

      <div className="absolute top-[20%] right-[8%] bottom-[16%] left-[8%]">
        <svg viewBox="0 0 1200 560" style={{ width: "100%", height: "100%" }}>
          <line
            x1="120"
            y1="500"
            x2={120 + 960 * axisProgress}
            y2="500"
            stroke={C.white}
            strokeWidth="3"
          />

          {axisPoints.map((label, i) => {
            const x = 120 + i * 240;
            return (
              <g key={label}>
                <line
                  x1={x}
                  y1="492"
                  x2={x}
                  y2="508"
                  stroke={C.white}
                  strokeWidth="2"
                />
                <text
                  x={x}
                  y="538"
                  textAnchor="middle"
                  fill={C.white}
                  fontSize="20"
                  fontFamily="Inter"
                >
                  {label}
                </text>
              </g>
            );
          })}

          <path
            d={linePath.iodine}
            fill="none"
            stroke="#6fa8ff"
            strokeWidth="4"
            strokeDasharray="1000"
            strokeDashoffset={lineDraw(40)}
          />
          <path
            d={linePath.cesium}
            fill="none"
            stroke="#f7d24f"
            strokeWidth="4"
            strokeDasharray="1000"
            strokeDashoffset={lineDraw(70)}
          />
          <path
            d={linePath.strontium}
            fill="none"
            stroke="#f4a460"
            strokeWidth="4"
            strokeDasharray="1000"
            strokeDashoffset={lineDraw(100)}
          />
          <path
            d={linePath.plutonium}
            fill="none"
            stroke={C.red}
            strokeWidth="5"
            strokeDasharray="1000"
            strokeDashoffset={lineDraw(130)}
          />

          <line
            x1="120"
            y1="120"
            x2="120"
            y2="500"
            stroke={C.white}
            strokeWidth="2"
            strokeDasharray="8 8"
            opacity={Math.sin(frame * 0.1) * 0.25 + 0.75}
          />
        </svg>

        <div className="font-inter absolute top-[12%] left-[7%] text-xl text-[#6fa8ff]">
          Iodine-131 · 8 days
        </div>
        <div className="font-inter absolute top-[16%] left-[35%] text-xl text-[#f7d24f]">
          Cesium-137 · 30 years
        </div>
        <div className="font-inter absolute top-[28%] left-[34%] text-xl text-[#f4a460]">
          Strontium-90 · 29 years
        </div>
        <div className="font-inter text-bloodRed absolute top-[8%] right-[7%] text-xl">
          Plutonium-239 · 24,110 years
        </div>
      </div>

      <div
        className="border-bloodRed absolute top-[55%] left-1/2 -translate-x-1/2 rounded-md border px-6 py-3"
        style={{
          backgroundColor: "rgba(17,17,17,0.88)",
          opacity: interpolate(frame, [180, 205], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `translateX(-50%) scale(${highlightPop})`,
        }}
      >
        <div className="font-bebas text-bloodRed text-4xl">
          50% POTENCY IN YEAR 26,096 AD
        </div>
      </div>

      <div className="absolute top-[70%] right-[12%] left-[12%]">
        <KineticText
          text="HALF OF CHERNOBYL'S PLUTONIUM-239 WILL STILL BE RADIOACTIVE"
          startFrame={220}
          fontSize={46}
          color={C.white}
          highlightWords={["PLUTONIUM-239", "RADIOACTIVE"]}
          staggerFrames={3}
          center
          showOverlay
        />
      </div>

      <AnimatedBanner
        items={[
          "IODINE-131: DAYS",
          "CESIUM-137: DECADES",
          "PLUTONIUM-239: 24,110 YEARS",
          "RADIATION OUTLASTS CIVILIZATIONS",
        ]}
        bgColor={C.red}
        textColor={C.white}
        fontSize={18}
        speed={1.15}
        position="bottom"
      />

      <AbsoluteFill
        style={{
          backgroundColor: C.bg,
          opacity: dissolveOut,
        }}
      />
    </AbsoluteFill>
  );
};
