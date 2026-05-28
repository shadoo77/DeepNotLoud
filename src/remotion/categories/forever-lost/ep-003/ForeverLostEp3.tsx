import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SCENES, T, TOTAL_FRAMES } from "./constants";
import { Scene1Intro } from "./scenes/scene1-intro";
import { Scene2Discovery } from "./scenes/scene2-discovery";

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

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T.fade })}
        />

        <TransitionSeries.Sequence
          durationInFrames={SCENES.s2.durationInFrames}
          premountFor={30}
        >
          <Scene2Discovery />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
