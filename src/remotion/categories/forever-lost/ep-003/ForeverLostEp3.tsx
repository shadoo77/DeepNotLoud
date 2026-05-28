import { AbsoluteFill } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import { SCENES, TOTAL_FRAMES } from "./constants";
import { Scene1Intro } from "./scenes/scene1-intro";

export { TOTAL_FRAMES };

export const ForeverLostEp3 = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence
          durationInFrames={SCENES.s1.durationInFrames}
          premountFor={30}
        >
          <Scene1Intro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
