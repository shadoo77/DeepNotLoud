import { AbsoluteFill, staticFile, Sequence } from "remotion";
import { Audio } from "@remotion/media";

export const Scene7Closer: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#1A1A1A" }}>
    <Audio src={staticFile("assets/forever-lost/ep-002/audio/vo/short/ep02_s7.wav")} />
    <Sequence from={180} premountFor={10}>
      <Audio src={staticFile("assets/forever-lost/ep-002/audio/sfx/heartbeat_slow.wav")} volume={0.4} />
    </Sequence>
  </AbsoluteFill>
);
