import { useCurrentFrame, interpolate } from "remotion";

const ARROWS = [
  {
    id: "plant",
    label: "Unknown plant species",
    x: 120,
    y: 100,
    angle: 40,
    delay: 0,
  },
  {
    id: "roots",
    label: "Invented root system",
    x: 280,
    y: 220,
    angle: 25,
    delay: 30,
  },
  {
    id: "script",
    label: "Script flows RTL in sections",
    x: 200,
    y: 360,
    angle: -15,
    delay: 60,
  },
];

export const Scene2Annotations: React.FC<{
  startFrame: number;
  imageWidth?: number;
  imageHeight?: number;
}> = ({ startFrame }) => {
  const frame = useCurrentFrame();

  return (
    <div className="pointer-events-none absolute inset-0">
      {ARROWS.map((arrow) => {
        const localFrame = Math.max(0, frame - startFrame - arrow.delay);
        const progress = Math.min(
          1,
          localFrame / 40,
        );
        const opacity = interpolate(
          progress,
          [0, 0.3, 1],
          [0, 1, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const drawLength = interpolate(progress, [0, 1], [0, 90], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const labelOpacity = interpolate(
          progress,
          [0.5, 0.8],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        const angleRad = (arrow.angle * Math.PI) / 180;
        const endX = arrow.x + drawLength * Math.cos(angleRad);
        const endY = arrow.y + drawLength * Math.sin(angleRad);

        return (
          <div key={arrow.id} style={{ opacity }}>
            <svg
              className="absolute"
              style={{
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <line
                x1={arrow.x}
                y1={arrow.y}
                x2={endX}
                y2={endY}
                stroke="rgba(0,0,0,0.85)"
                strokeWidth={7}
                strokeLinecap="round"
              />
              <line
                x1={arrow.x}
                y1={arrow.y}
                x2={endX}
                y2={endY}
                stroke="#C8A96E"
                strokeWidth={3}
                strokeLinecap="round"
              />
              <polygon
                points={`${endX},${endY} ${endX - 14},${endY - 8} ${endX - 14},${endY + 8}`}
                fill="rgba(0,0,0,0.85)"
                stroke="rgba(0,0,0,0.85)"
                strokeWidth={2}
              />
              <polygon
                points={`${endX},${endY} ${endX - 12},${endY - 6} ${endX - 12},${endY + 6}`}
                fill="#C8A96E"
                style={{ transform: `rotate(${arrow.angle}deg)`, transformOrigin: `${endX}px ${endY}px` }}
              />
            </svg>
            <div
              className="absolute rounded-xl px-5 py-3 text-2xl font-bold whitespace-nowrap"
              style={{
                left: arrow.x + 100,
                top: arrow.y - 14,
                opacity: labelOpacity,
                backgroundColor: "rgba(10,10,10,0.92)",
                border: "1px solid #C8A96E",
                color: "#C8A96E",
                fontFamily: "Courier New, monospace",
                textShadow:
                  "0 2px 8px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.9)",
              }}
            >
              {arrow.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
