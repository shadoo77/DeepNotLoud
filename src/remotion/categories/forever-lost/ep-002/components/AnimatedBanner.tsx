import { useCurrentFrame } from "remotion";
import { C } from "../constants";

interface Props {
  items: string[];
  speed?: number; // pixels per frame
  bgColor?: string;
  textColor?: string;
  fontSize?: number;
  position?: "top" | "bottom";
}

export const AnimatedBanner: React.FC<Props> = ({
  items,
  speed = 1.5,
  bgColor = C.red,
  textColor = C.white,
  fontSize = 22,
  position = "bottom",
}) => {
  const frame = useCurrentFrame();
  const fullText = items.join("   ·   ") + "   ·   ";
  const offset = (frame * speed) % (fullText.length * 14); // approx char width

  return (
    <div
      className="flex h-11 items-center overflow-hidden"
      style={{
        position: "absolute",
        [position]: 0,
        left: 0,
        right: 0,
        background: bgColor,
        zIndex: 10,
      }}
    >
      <div
        className="font-inter"
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
