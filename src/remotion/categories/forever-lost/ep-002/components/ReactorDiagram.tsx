import { interpolate } from "remotion";

export const ReactorDiagram: React.FC<{ progress: number }> = ({
  progress,
}) => {
  const bgOpacity = interpolate(progress, [0, 0.2], [0, 0.4], {
    extrapolateRight: "clamp",
  });
  const coreOpacity = interpolate(progress, [0.1, 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rodOpacity = interpolate(progress, [0.2, 0.4], [0, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const coriumScale = interpolate(progress, [0.7, 1], [1, 1.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const redPulseOpacity =
    progress > 0.7 ? 0.6 + Math.sin(progress * 20) * 0.4 : 0;

  return (
    <svg viewBox="0 0 800 600" className="h-full w-full">
      <rect
        x="150"
        y="50"
        width="500"
        height="500"
        rx="8"
        fill="none"
        stroke="#F0EEE4"
        strokeWidth="2"
        opacity={bgOpacity}
      />
      <rect
        x="250"
        y="150"
        width="300"
        height="250"
        rx="4"
        fill="rgba(57,255,20,0.1)"
        stroke="#39FF14"
        strokeWidth="2"
        opacity={coreOpacity}
      />
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={i}
          x1={270 + i * 35}
          y1="160"
          x2={270 + i * 35}
          y2="390"
          stroke="#F0EEE4"
          strokeWidth="4"
          opacity={rodOpacity}
        />
      ))}
      <g
        transform={`translate(400, 470) scale(${coriumScale}) translate(-400, -470)`}
      >
        <rect
          x="200"
          y="430"
          width="400"
          height="80"
          rx="4"
          fill="rgba(139,0,0,0.4)"
          stroke="#8B0000"
          strokeWidth="3"
          opacity={progress > 0.5 ? 1 : 0}
        />
        <rect
          x="200"
          y="430"
          width="400"
          height="80"
          rx="4"
          fill="none"
          stroke="#FF0000"
          strokeWidth="5"
          opacity={redPulseOpacity}
        />
        <text
          x="400"
          y="477"
          textAnchor="middle"
          fill="#8B0000"
          className="font-inter font-bold"
          style={{ fontSize: 16 }}
          opacity={progress > 0.5 ? 1 : 0}
        >
          CORIUM DEPOSIT
        </text>
      </g>
    </svg>
  );
};
