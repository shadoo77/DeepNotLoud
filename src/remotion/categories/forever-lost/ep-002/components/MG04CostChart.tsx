import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import { AnimatedBanner } from "./AnimatedBanner";
import { DataTicker } from "./DataTicker";
import { ASSET_PATH, C } from "../constants";

type CostItem = {
  label: string;
  valueB: number;
  note?: string;
  highlight?: boolean;
};

const COST_DATA: CostItem[] = [
  { label: "International Space Station", valueB: 150 },
  { label: "Channel Tunnel", valueB: 21 },
  { label: "Large Hadron Collider", valueB: 4.75 },
  { label: "Hubble Space Telescope", valueB: 2.5 },
  {
    label: "Chernobyl New Safe Confinement",
    valueB: 1.5,
    note: "JUST A CONTAINMENT SHELL",
    highlight: true,
  },
];

const MAX_VALUE = 150;

export const MG04CostChart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleY = interpolate(frame, [0, 20], [-80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [12, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitStart = Math.max(240, durationInFrames - 60);
  const exitX = interpolate(frame, [exitStart, durationInFrames], [0, 1920], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <AbsoluteFill style={{ opacity: 0.22 }}>
        <Img
          src={staticFile(`${ASSET_PATH}/images/ep02L_s4_sarcophagus.jpeg`)}
          className="h-full w-full object-cover"
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.76), rgba(0,0,0,0.72), rgba(0,0,0,0.68))",
        }}
      />

      <Sequence from={30} durationInFrames={24}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/chart_build.mp3`)}
          volume={0.35}
        />
      </Sequence>

      <AbsoluteFill style={{ transform: `translateX(${exitX}px)` }}>
        <div
          className="absolute left-0 right-0 top-10 text-center"
          style={{ transform: `translateY(${titleY}px)` }}
        >
          <div className="font-bebas text-white" style={{ fontSize: 80, letterSpacing: 6 }}>
            WHAT $1.5 BILLION BUYS
          </div>
          <div className="font-inter mt-1 text-3xl text-white/70" style={{ opacity: subtitleOpacity }}>
            Global mega-project comparison
          </div>
        </div>

        <div className="absolute left-[8%] right-[8%] top-[20%] bottom-[13%] flex flex-col justify-center gap-6">
          {COST_DATA.map((item, i) => {
            const start = 40 + i * 20;
            const barProgress = spring({
              fps,
              frame: Math.max(0, frame - start),
              config: { damping: 16, stiffness: 130 },
            });
            const fillPct = (item.valueB / MAX_VALUE) * 100;
            const fillWidth = `${barProgress * fillPct}%`;

            return (
              <div key={item.label} className="relative">
                <div className="mb-2 flex items-center justify-between">
                  <div
                    className="font-inter text-2xl font-semibold"
                    style={{ color: item.highlight ? C.white : "rgba(240,238,228,0.9)" }}
                  >
                    {item.label}
                  </div>
                  <DataTicker
                    from={0}
                    to={item.valueB}
                    startFrame={start}
                    duration={44}
                    suffix="B"
                    prefix="$"
                    decimals={item.valueB % 1 === 0 ? 0 : 2}
                    fontSize={36}
                    color={item.highlight ? C.red : C.green}
                  />
                </div>

                <div className="h-7 w-full overflow-hidden rounded-md bg-white/10">
                  <div
                    className="h-full rounded-md"
                    style={{
                      width: fillWidth,
                      backgroundColor: item.highlight ? C.red : C.green,
                      boxShadow: item.highlight ? `0 0 20px ${C.red}` : "none",
                    }}
                  />
                </div>

                {item.note ? (
                  <div className="font-inter mt-2 text-xl font-semibold text-white/90">{item.note}</div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div
          className="absolute left-1/2 top-[62%] -translate-x-1/2 rounded-md border border-white/35 px-6 py-3"
          style={{
            backgroundColor: "rgba(17,17,17,0.9)",
            opacity: interpolate(frame, [200, 220], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div className="font-inter text-2xl italic text-white/95">This did not fix anything.</div>
        </div>
      </AbsoluteFill>

      <AnimatedBanner
        items={[
          "NSC COST: $1.5B",
          "NOT A REPAIR",
          "ONLY A CONTAINMENT SHELL",
          "THE CORE REMAINS INSIDE",
        ]}
        bgColor={C.red}
        textColor={C.white}
        fontSize={18}
        speed={1.15}
        position="bottom"
      />
    </AbsoluteFill>
  );
};
