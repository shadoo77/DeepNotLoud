import { AbsoluteFill, staticFile } from "remotion";
import { Audio } from "@remotion/media";

export const Scene5VisualOnly: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#1A1A1A" }}>
    {/* No VO — silence is intentional */}
    <Audio src={staticFile("assets/forever-lost/ep-002/audio/sfx/geiger_loop.wav")} volume={0.12} loop />
  </AbsoluteFill>
);
