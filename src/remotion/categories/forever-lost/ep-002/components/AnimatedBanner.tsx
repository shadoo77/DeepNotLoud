import { useCurrentFrame } from "remotion";

interface Props {
  items: string[];
  speed?: number;
  bgColor?: string;
  textColor?: string;
  fontSize?: number;
  position?: "top" | "bottom";
}

export const AnimatedBanner: React.FC<Props> = ({
  items,
  speed = 1.5,
  bgColor = "var(--color-bloodRed)",
  textColor = "#FFFFFF",
  fontSize = 22,
  position = "bottom",
}) => {
  const frame = useCurrentFrame();
  const fullText = items.join("   ·   ") + "   ·   ";
  const offset = (frame * speed) % (fullText.length * 14);

  return (
    <div
      className="absolute left-0 right-0 flex h-11 items-center overflow-hidden"
      style={{ [position]: 0, background: bgColor }}
    >
      <div
        style={{
          transform: `translateX(${-offset}px)`,
          whiteSpace: "nowrap",
          fontSize,
          fontWeight: 700,
          color: textColor,
          letterSpacing: 2,
        }}
      >
        {fullText.repeat(8)}
      </div>
    </div>
  );
};
