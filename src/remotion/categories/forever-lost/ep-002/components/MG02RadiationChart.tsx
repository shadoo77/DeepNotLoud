import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Easing,
  staticFile,
  Sequence,
} from "remotion";
import { Audio } from "@remotion/media";
import { AnimatedBanner } from "./AnimatedBanner";
import { DataTicker } from "./DataTicker";
import { ASSET_PATH, C } from "../constants";
import { ProgressBar } from "./ProgressBar"; // Added ProgressBar

const BAR_DATA: ReadonlyArray<{
  label: string;
  value: number;
  color: string;
  unit: string;
  glow?: boolean;
}> = [
  {
    label: "Hiroshima\nBomb",
    value: 1,
    color: "#888888",
    unit: "x1 (baseline)",
  },
  { label: "Fukushima\n2011", value: 10, color: C.white, unit: "x10" },
  {
    label: "Chernobyl\nTotal",
    value: 400,
    color: C.green,
    unit: "x400",
    glow: true,
  },
];

const MAX_HEIGHT = 480;
const BAR_WIDTH = 180;

export const MG02RadiationChart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const panelOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const holdStart = Math.max(241, durationInFrames - 90);
  const exitEnd = Math.max(holdStart + 1, durationInFrames);

  const panelTranslateY = interpolate(
    frame,
    [holdStart, exitEnd],
    [0, 1080],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );

  const titleSweepX = interpolate(frame, [0, 20], [-80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {/* Reuse Scene 2 texture for continuity */}
      <AbsoluteFill style={{ opacity: 0.2 }}>
        <Img
          src={staticFile(`${ASSET_PATH}/images/ep02L_s2_texture.jpeg`)}
          className="h-full w-full object-cover"
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.1) 100%)",
        }}
      />

      {/* FIX 3: Use Sequence to start the SFX exactly at frame 30 */}
      <Sequence from={30} durationInFrames={40}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/chart_build.wav`)}
          volume={0.4}
        />
      </Sequence>

      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/geiger_loop.wav`)}
        volume={0.15}
        loop
      />

      <AbsoluteFill
        style={{
          opacity: panelOpacity,
          transform: `translateY(${panelTranslateY}px)`,
        }}
      >
        {/* Title area */}
        <div
          className="absolute top-14 right-0 left-0 text-center"
          style={{ transform: `translateX(${titleSweepX}px)` }}
        >
          <div
            className="font-bebas text-white"
            style={{ fontSize: 72, letterSpacing: 6 }}
          >
            RADIATION COMPARISON
          </div>
          <div
            className="mt-1 font-mono text-2xl font-semibold"
            style={{ color: C.green }}
          >
            Hiroshima = baseline
          </div>
        </div>

        {/* Chart Area Container */}
        <AbsoluteFill
          className="items-center"
          style={{
            justifyContent: "flex-end",
            flexDirection: "row",
            gap: 80,
            paddingBottom: 180, // Increased padding to make room for ProgressBars
            paddingTop: 160,
          }}
        >
          {BAR_DATA.map((bar, i) => {
            // FIX 1b: MD requested damping: 200 for a snappy chart build
            const barProgress = spring({
              fps,
              frame,
              delay: i * 20 + 30,
              config: { damping: 200, stiffness: 130 },
            });
            const barHeight = barProgress * (bar.value / 400) * MAX_HEIGHT;

            const labelOpacity = interpolate(
              frame,
              [i * 20 + 30, i * 20 + 50],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            );

            return (
              <div
                key={bar.label}
                className="flex flex-col items-center"
                style={{ width: BAR_WIDTH }}
              >
                <div className="mb-2" style={{ opacity: labelOpacity }}>
                  <DataTicker
                    to={bar.value}
                    startFrame={i * 20 + 30}
                    duration={60}
                    prefix="x"
                    fontSize={32}
                    color={bar.color}
                  />
                </div>

                <div
                  style={{
                    width: BAR_WIDTH,
                    height: barHeight,
                    background: bar.color,
                    borderRadius: "4px 4px 0 0",
                    boxShadow: bar.glow ? `0 0 30px ${bar.color}` : "none",
                  }}
                />

                <div
                  className="font-inter mt-2 text-center whitespace-pre text-white"
                  style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.3 }}
                >
                  {bar.label}
                </div>
                <div
                  className="mt-1 font-mono text-sm"
                  style={{ color: "rgba(240,238,228,0.5)" }}
                >
                  {bar.unit}
                </div>

                {/* FIX 2: Added ProgressBars under each bar for proportional scale comparison */}
                <div className="mt-4" style={{ opacity: labelOpacity }}>
                  <ProgressBar
                    startFrame={i * 20 + 50}
                    duration={45}
                    fillColor={bar.color}
                    height={8}
                    width={BAR_WIDTH}
                    targetPercent={(bar.value / 400) * 100} // Normalized to Chernobyl's 100%
                  />
                </div>
              </div>
            );
          })}
        </AbsoluteFill>

        {/* Callout box with Arrow */}
        {frame > 200 && (
          <div
            className="absolute top-48 right-60"
            style={{
              opacity: interpolate(
                frame,
                [200, 240, holdStart, exitEnd],
                [0, 1, 1, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              ),
            }}
          >
            {/* The "Bold" Callout Box */}
            <div
              className="rounded-md px-6 py-3" // Increased padding
              style={{
                background: C.red,
                border: "3px solid #F0EEE4", // Thick white border adds massive weight
                boxShadow:
                  "0 0 30px rgba(139, 0, 0, 0.6), 0 10px 20px rgba(0,0,0,0.5)", // Heavy red glow + dark shadow to lift it
              }}
            >
              <div
                className="font-bebas text-white"
                style={{
                  fontSize: 40, // Bumped from 36 to 40
                  letterSpacing: 2, // Added letter spacing for impact
                  fontWeight: 700, // Force max bold
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)", // Text shadow for depth
                }}
              >
                400x MORE THAN HIROSHIMA
              </div>
            </div>

            {/* Arrow pointing to the bar */}
            <svg
              width="60"
              height="40"
              viewBox="0 0 60 40"
              style={{ position: "absolute", bottom: -37, left: 20 }}
            >
              <path
                d="M10 0 L30 30 L50 0"
                fill="#F0EEE4"
                stroke="#F0EEE4" // Match the white border
                strokeWidth="4"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </AbsoluteFill>

      <AnimatedBanner
        items={[
          "HIROSHIMA x 400",
          "200T FUEL STILL INSIDE",
          "600,000 WORKERS DEPLOYED",
        ]}
        bgColor={C.red}
        position="bottom"
        speed={1.2}
      />
    </AbsoluteFill>
  );
};
