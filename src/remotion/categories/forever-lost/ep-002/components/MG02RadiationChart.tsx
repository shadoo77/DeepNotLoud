import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Easing,
  staticFile,
} from "remotion";
import { Audio } from "@remotion/media";
import { AnimatedBanner } from "./AnimatedBanner";
import { DataTicker } from "./DataTicker";
import { ASSET_PATH, C } from "../constants";

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
  const { fps } = useVideoConfig();

  const panelOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const panelTranslateY = interpolate(frame, [300, 360], [0, 1080], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const titleSweepX = interpolate(frame, [0, 20], [-80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/chart_build.wav`)}
        volume={(f) => (f >= 30 && f < 70 ? 0.4 : 0)}
      />
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
        <div
          className="absolute left-0 right-0 top-14 text-center"
          style={{ transform: `translateX(${titleSweepX}px)` }}
        >
          <div
            className="font-bebas text-white"
            style={{ fontSize: 72, letterSpacing: 6 }}
          >
            RADIATION COMPARISON
          </div>
          <div
            className="font-mono text-toxicGreen mt-1"
            style={{ fontSize: 20, fontWeight: 500 }}
          >
            Hiroshima = baseline
          </div>
        </div>

        <AbsoluteFill
          className="items-center"
          style={{
            justifyContent: "flex-end",
            flexDirection: "row",
            gap: 80,
            paddingBottom: 120,
            paddingTop: 160,
          }}
        >
          {BAR_DATA.map((bar, i) => {
            const barProgress = spring({
              fps,
              frame,
              delay: i * 20 + 30,
              config: { damping: 200 },
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
                <div className="font-mono text-steelGrey mt-1 text-sm">{bar.unit}</div>
              </div>
            );
          })}
        </AbsoluteFill>

        {frame > 200 && (
          <div
            className="absolute right-60 top-48 rounded px-5 py-2"
            style={{
              opacity: interpolate(frame, [200, 240], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              background: C.red,
            }}
          >
            <div className="font-bebas text-white" style={{ fontSize: 36 }}>
              400x MORE THAN HIROSHIMA
            </div>
          </div>
        )}
      </AbsoluteFill>

      <AnimatedBanner
        items={[
          "HIROSHIMA x 400",
          "200T FUEL STILL INSIDE",
          "600,000 WORKERS DEPLOYED",
          "REACTOR 4 EXPLODED 1986",
        ]}
        bgColor={C.red}
        position="bottom"
        speed={1.2}
      />
    </AbsoluteFill>
  );
};
