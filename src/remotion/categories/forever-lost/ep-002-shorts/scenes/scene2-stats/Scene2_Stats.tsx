import { AbsoluteFill, staticFile } from "remotion";
import { Audio } from "@remotion/media";

export const Scene2Stats: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#1A1A1A" }}>
    <Audio src={staticFile("assets/forever-lost/ep-002/audio/vo/short/ep02_s2.wav")} />
    <Audio src={staticFile("assets/forever-lost/ep-002/audio/sfx/geiger_loop.wav")} volume={0.25} loop />
  </AbsoluteFill>
);
