import { AbsoluteFill, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SCENES, T, TOTAL_FRAMES, ASSET_PATH } from "./constants";
import { Scene1Intro } from "./scenes/scene1-intro";
import { Scene2Discovery } from "./scenes/scene2-discovery";
import { Scene3WhatIsIt } from "./scenes/scene3-what-is-it";
import { Scene4Stats } from "./scenes/scene4-stats";
import { Scene5Language } from "./scenes/scene5-language";
export { TOTAL_FRAMES };

const S1_END = SCENES.s1.durationInFrames;
const S2_END = S1_END + T.fade + SCENES.s2.durationInFrames;
const S3_END = S2_END + T.fade + SCENES.s3.durationInFrames;
const S4_END = S3_END + T.fade + SCENES.s4.durationInFrames;

export const ForeverLostEp3 = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      {/* <Audio
        src={staticFile(`${ASSET_PATH}/audio/bgm/ep003_bgm_landscape.mp3`)}
        volume={(f) => {
          if (f < S1_END) return 0.18;
          if (f < S2_END) return 0.12;
          if (f < S3_END) return 0.12;
          if (f < S4_END) return 0.12;
          return 0.12;
        }}
        loop
      /> */}

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

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T.fade })}
        />

        <TransitionSeries.Sequence
          durationInFrames={SCENES.s3.durationInFrames}
          premountFor={30}
        >
          <Scene3WhatIsIt />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T.fade })}
        />

        <TransitionSeries.Sequence
          durationInFrames={SCENES.s4.durationInFrames}
          premountFor={30}
        >
          <Scene4Stats />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T.fade })}
        />

        <TransitionSeries.Sequence
          durationInFrames={SCENES.s5.durationInFrames}
          premountFor={30}
        >
          <Scene5Language />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
