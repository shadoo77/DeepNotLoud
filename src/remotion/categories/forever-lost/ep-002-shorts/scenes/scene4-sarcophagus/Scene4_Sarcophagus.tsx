import { AbsoluteFill, staticFile, Sequence } from "remotion";
import { Audio } from "@remotion/media";

export const Scene4Sarcophagus: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#1A1A1A" }}>
    <Audio src={staticFile("assets/forever-lost/ep-002/audio/vo/short/ep02_s4.wav")} />
    <Sequence from={5} premountFor={10}>
      <Audio src={staticFile("assets/forever-lost/ep-002/audio/sfx/metal_groan.wav")} volume={0.45} />
    </Sequence>
  </AbsoluteFill>
);
