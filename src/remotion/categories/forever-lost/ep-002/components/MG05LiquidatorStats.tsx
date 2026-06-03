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
import { ProgressBar } from "./ProgressBar";
import { ASSET_PATH, C } from "../constants";

const COUNTRIES = [
  { label: "RUSSIA", value: 42, color: "#f0eee4" },
  { label: "UKRAINE", value: 31, color: "#39ff14" },
  { label: "BELARUS", value: 18, color: "#8b0000" },
  { label: "OTHER", value: 9, color: "#8d8d8d" },
];

export const MG05LiquidatorStats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const panelY = interpolate(frame, [0, 25], [1080, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headerText = "LIQUIDATORS: THE DATA";
  const chars = Math.floor(
    interpolate(frame, [25, 55], [0, headerText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  const blockStart = [40, 60, 80, 100] as const;
  const blockIn = blockStart.map((start) => {
    const p = spring({
      fps,
      frame: Math.max(0, frame - start),
      config: { damping: 14, stiffness: 160 },
    });
    return {
      opacity: interpolate(p, [0, 1], [0, 1]),
      y: interpolate(p, [0, 1], [30, 0]),
    };
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 60, durationInFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <AbsoluteFill style={{ opacity: 0.24 }}>
        <Img
          src={staticFile(`${ASSET_PATH}/images/ep02L_s5_liquidators.jpeg`)}
          className="h-full w-full object-cover"
          style={{ filter: "grayscale(100%)" }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.72), rgba(0,0,0,0.68), rgba(0,0,0,0.64))",
          transform: `translateY(${panelY}px)`,
        }}
      >
        <Sequence from={12} durationInFrames={18}>
          <Audio
            src={staticFile(`${ASSET_PATH}/audio/sfx/whoosh_data.mp3`)}
            volume={0.3}
          />
        </Sequence>
        <Sequence from={100} durationInFrames={110}>
          <Audio
            src={staticFile(`${ASSET_PATH}/audio/sfx/tick_counter.mp3`)}
            volume={0.15}
          />
        </Sequence>

        <div className="absolute top-8 right-0 left-0 text-center">
          <div
            className="font-bebas text-white/95"
            style={{ fontSize: 68, letterSpacing: 4 }}
          >
            {headerText.slice(0, chars)}
          </div>
        </div>

        <div className="absolute top-[16%] right-[6%] bottom-[11%] left-[6%] grid grid-cols-2 gap-6">
          <div
            className="rounded-xl border border-white/20 bg-black/24 p-6"
            style={{
              opacity: blockIn[0].opacity,
              transform: `translateY(${blockIn[0].y}px)`,
            }}
          >
            <div className="font-inter text-2xl font-bold tracking-widest text-white/65">
              DEPLOYMENT WINDOW
            </div>
            <div className="mt-4 flex items-end gap-4">
              <DataTicker
                from={1986}
                to={1990}
                startFrame={50}
                duration={70}
                fontSize={78}
                color={C.white}
              />
              <div className="font-inter mb-2 text-2xl text-white/80">
                YEARS
              </div>
            </div>
            <div className="text-toxicGreen mt-3 font-mono text-5xl">
              600,000 WORKERS
            </div>
          </div>

          <div
            className="rounded-xl border border-white/20 bg-black/24 p-6"
            style={{
              opacity: blockIn[1].opacity,
              transform: `translateY(${blockIn[1].y}px)`,
            }}
          >
            <div className="font-inter text-2xl font-bold tracking-[0.12em] text-white/65">
              COUNTRIES OF ORIGIN
            </div>
            <div className="mt-5 flex items-center gap-6">
              <div
                className="relative h-44 w-44 rounded-full"
                style={{
                  background:
                    "conic-gradient(#f0eee4 0% 42%, #39ff14 42% 73%, #8b0000 73% 91%, #8d8d8d 91% 100%)",
                  transform: `scale(${interpolate(frame, [80, 130], [0.75, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  })})`,
                  opacity: interpolate(frame, [80, 130], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                <div className="bg-ash absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full" />
              </div>

              <div className="flex flex-col gap-2.5">
                {COUNTRIES.map((c) => (
                  <div
                    key={c.label}
                    className="font-inter flex items-center gap-3 text-2xl font-bold text-white/95"
                  >
                    <span
                      className="inline-block h-4 w-4 rounded-full"
                      style={{ backgroundColor: c.color }}
                    />
                    <span>{c.label}</span>
                    <span className="font-mono text-2xl font-extrabold text-white">
                      {c.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="rounded-xl border border-white/20 bg-black/24 p-6"
            style={{
              opacity: blockIn[2].opacity,
              transform: `translateY(${blockIn[2].y}px)`,
            }}
          >
            <div className="font-inter text-2xl font-bold tracking-[0.12em] text-white/65">
              HEALTH OUTCOME BANDS
            </div>
            <div className="mt-5 space-y-5">
              <div className="font-inter text-2xl font-bold text-white">
                THYROID CANCER
              </div>
              <ProgressBar
                startFrame={90}
                duration={40}
                fillColor="#8b0000"
                width={760}
                targetPercent={68}
                label=""
              />
              <div className="font-inter text-2xl font-bold text-white">
                LEUKEMIA
              </div>
              <ProgressBar
                startFrame={112}
                duration={40}
                fillColor="#c02525"
                width={760}
                targetPercent={52}
                label=""
              />
              <div className="font-inter text-2xl font-bold text-white">
                CHRONIC ILLNESS
              </div>
              <ProgressBar
                startFrame={134}
                duration={40}
                fillColor={C.green}
                width={760}
                targetPercent={81}
                label=""
              />
            </div>
          </div>

          <div
            className="rounded-xl border border-white/20 bg-black/24 p-6"
            style={{
              opacity: blockIn[3].opacity,
              transform: `translateY(${blockIn[3].y}px)`,
            }}
          >
            <div className="font-inter text-2xl font-bold tracking-widest text-white/65">
              AVERAGE EXPOSURE DOSE
            </div>
            <div className="mt-7 leading-none">
              <DataTicker
                from={0}
                to={100}
                startFrame={120}
                duration={90}
                suffix=" mSv"
                fontSize={88}
                color={C.green}
              />
            </div>
            <div className="font-inter mt-4 text-2xl font-bold text-white/80">
              Many received much higher doses.
            </div>
          </div>
        </div>

        <AbsoluteFill style={{ opacity: fadeOut, backgroundColor: C.bg }} />
      </AbsoluteFill>

      <AnimatedBanner
        items={[
          "CLASSIFIED FOR DECADES",
          "STILL NO OFFICIAL TOTAL",
          "HUMAN COST REMAINS DISPUTED",
          "FOREVER LOST",
        ]}
        bgColor="rgba(139, 0, 0, 0.85)"
        textColor={C.white}
        fontSize={18}
        speed={1.15}
        position="bottom"
      />
    </AbsoluteFill>
  );
};
