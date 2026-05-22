import { AbsoluteFill, staticFile } from "remotion";
import { Audio } from "@remotion/media";

export const Scene3Corium: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#1A1A1A" }}>
    <Audio src={staticFile("assets/forever-lost/ep-002/audio/vo/short/ep02_s3.wav")} />
    <Audio src={staticFile("assets/forever-lost/ep-002/audio/sfx/geiger_loop.wav")} volume={0.2} loop />
    <Audio src={staticFile("assets/forever-lost/ep-002/audio/sfx/radiation_hum.wav")} volume={0.3} loop />
  </AbsoluteFill>
);
