import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
  staticFile,
} from "remotion";
import { Audio } from "@remotion/media";
import { DataTicker } from "./DataTicker";
import { ReactorDiagram } from "./ReactorDiagram";
import { C, ASSET_PATH } from "../constants";

type LabelDef = {
  text: string;
  start: number;
  x: number;
  y: number;
  lineW: number;
  color?: string;
  pulse?: boolean;
};

const LABELS: LabelDef[] = [
  { text: "Graphite moderator core", start: 60, x: 220, y: 210, lineW: 170 },
  { text: "Fuel rods (200 tonnes)", start: 95, x: 220, y: 300, lineW: 180 },
  { text: "Control rods", start: 130, x: 220, y: 390, lineW: 140 },
  { text: "Primary coolant circuit", start: 165, x: 1160, y: 230, lineW: 180 },
  { text: "Steam turbines", start: 200, x: 1160, y: 310, lineW: 140 },
  { text: "Containment vessel (destroyed)", start: 235, x: 1160, y: 390, lineW: 230 },
  {
    text: "CORIUM LOCATION (BASEMENT)",
    start: 270,
    x: 1040,
    y: 530,
    lineW: 250,
    color: C.red,
    pulse: true,
  },
];

const LabelCallout: React.FC<LabelDef & { frame: number }> = ({
  text,
  start,
  x,
  y,
  lineW,
  color = C.white,
  pulse = false,
  frame,
}) => {
  const local = Math.max(0, frame - start);
  const lineProgress = interpolate(local, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const textOpacity = interpolate(local, [10, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulseOpacity = pulse ? Math.sin(frame * 0.1) * 0.3 + 0.7 : 1;

  return (
    <div className="absolute" style={{ left: x, top: y }}>
      <div
        style={{
          width: lineW * lineProgress,
          height: 2,
          backgroundColor: color,
          boxShadow: pulse ? `0 0 8px ${color}` : "none",
          marginBottom: 8,
        }}
      />
      <div
        className="font-inter text-lg font-semibold"
        style={{ color, opacity: textOpacity * pulseOpacity }}
      >
        {text}
      </div>
    </div>
  );
};

export const MG03ReactorDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const titleY = interpolate(frame, [0, 30], [-90, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const titleOpacity = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const diagramOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const progress = interpolate(frame, [30, 360], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const zoomScale = interpolate(frame, [300, 360, 420], [1, 1.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {LABELS.map((l) => (
        <Sequence key={`sfx-${l.start}`} from={l.start} durationInFrames={6}>
          <Audio
            src={staticFile(`${ASSET_PATH}/audio/sfx/whoosh_data.wav`)}
            volume={0.25}
          />
        </Sequence>
      ))}

      {/* Title */}
      <div
        className="absolute left-0 right-0 top-8 text-center"
        style={{
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
        }}
      >
        <div className="font-bebas text-white" style={{ fontSize: 72, letterSpacing: 6 }}>
          REACTOR 4 · ANATOMY
        </div>
      </div>

      {/* Diagram */}
      <AbsoluteFill
        className="items-center justify-center"
        style={{ opacity: diagramOpacity }}
      >
        <div
          style={{
            width: 1200,
            height: 760,
            transform: `scale(${zoomScale})`,
            transformOrigin: "65% 72%",
          }}
        >
          <ReactorDiagram progress={progress} />
        </div>
      </AbsoluteFill>

      {/* Labels */}
      {LABELS.map((label) => (
        <LabelCallout key={label.text} frame={frame} {...label} />
      ))}

      {/* 200 tonnes banner */}
      <div
        className="absolute left-1/2 top-[18%] -translate-x-1/2 rounded-md border px-6 py-2"
        style={{
          borderColor: C.green,
          backgroundColor: "rgba(17,17,17,0.82)",
          opacity: interpolate(frame, [180, 210], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div className="font-bebas text-toxicGreen text-5xl">200 TONNES</div>
      </div>

      {/* DataTicker roentgen */}
      <div
        className="absolute right-10 top-10 rounded-lg border border-toxicGreen px-5 py-3"
        style={{
          backgroundColor: "rgba(17,17,17,0.84)",
          opacity: interpolate(frame, [240, 270], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div className="font-inter mb-1 text-sm tracking-wider text-white/70">RADIATION INSIDE</div>
        <DataTicker
          to={10000}
          startFrame={240}
          duration={80}
          suffix=" R/hr"
          fontSize={56}
          color={C.green}
        />
      </div>

      {/* Corium pulse rectangle */}
      <div
        className="absolute"
        style={{
          left: 760,
          top: 610,
          width: 400,
          height: 110,
          border: `3px solid ${C.red}`,
          borderRadius: 8,
          opacity: frame >= 300 ? Math.sin(frame * 0.2) * 0.3 + 0.7 : 0,
          boxShadow: `0 0 20px ${C.red}`,
        }}
      />

      {/* Soft hold fade near end */}
      <AbsoluteFill
        style={{
          background: C.bg,
          opacity: interpolate(frame, [durationInFrames - 30, durationInFrames], [0, 0.35], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
