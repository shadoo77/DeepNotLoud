import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cinzel";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

interface SidebarField {
  label: string;
  value: string;
}

export const SidebarPanel: React.FC<{
  fields: SidebarField[];
  delayFrames?: number;
  color?: string;
}> = ({ fields, delayFrames = 0, color = "#C8A96E" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 14 },
  });
  const x = interpolate(progress, [0, 1], [-300, 0]);

  return (
    <div
      className="pointer-events-none absolute top-20 left-0 w-[340px] rounded-r-xl px-6 py-7"
      style={{
        transform: `translateX(${x}px)`,
        backgroundColor: "rgba(10,10,10,0.88)",
        borderLeft: `3px solid ${color}`,
        borderRight: "1px solid #333",
      }}
    >
      {fields.map(({ label, value }) => (
        <div key={label} className="mb-6">
          <div
            className="text-xl font-bold tracking-widest uppercase"
            style={{
              fontFamily: "Courier New, monospace",
              color,
            }}
          >
            {label}
          </div>
          <div
            className="mt-1 text-3xl font-bold"
            style={{ fontFamily: cinzelFont, color: "#FFFFFF" }}
          >
            {value}
          </div>
        </div>
      ))}
    </div>
  );
};
