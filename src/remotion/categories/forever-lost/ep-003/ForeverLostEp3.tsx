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
import { Scene6Attempts } from "./scenes/scene6-attempts";
import { Scene7Theories } from "./scenes/scene7-theories";
import { Scene8Closer } from "./scenes/scene8-closer";
export { TOTAL_FRAMES };

const S1_END = SCENES.s1.durationInFrames;
const S2_END = S1_END + T.fade + SCENES.s2.durationInFrames;
const S3_END = S2_END + T.fade + SCENES.s3.durationInFrames;
const S4_END = S3_END + T.fade + SCENES.s4.durationInFrames;
const S5_END = S4_END + T.fade + SCENES.s5.durationInFrames;
const S6_END = S5_END + T.fade + SCENES.s6.durationInFrames;
const S7_END = S6_END + T.fade + SCENES.s7.durationInFrames;

export const ForeverLostEp3 = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/bgm/ep003_bgm_landscape.mp3`)}
        volume={(f) => {
          const LOOP_FRAMES = 2641;
          const pos = f % LOOP_FRAMES;
          const loopFadeOut =
            pos > LOOP_FRAMES - 90 ? (LOOP_FRAMES - pos) / 90 : 1;
          const loopFadeIn = pos < 30 ? pos / 30 : 1;

          let sceneVolume;
          if (f < S1_END) sceneVolume = 0.18;
          else if (f < S5_END) sceneVolume = 0.12;
          else if (f < S6_END) sceneVolume = 0.1;
          else if (f < S7_END) sceneVolume = 0.08;
          else sceneVolume = 0.22;

          const finalFadeOut =
            f > TOTAL_FRAMES - 120 ? Math.max(0, (TOTAL_FRAMES - f) / 120) : 1;

          return sceneVolume * Math.min(loopFadeOut, loopFadeIn) * finalFadeOut;
        }}
        loop
      />
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

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T.fade })}
        />

        <TransitionSeries.Sequence
          durationInFrames={SCENES.s6.durationInFrames}
          premountFor={30}
        >
          <Scene6Attempts />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T.fade })}
        />

        <TransitionSeries.Sequence
          durationInFrames={SCENES.s7.durationInFrames}
          premountFor={30}
        >
          <Scene7Theories />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T.fade })}
        />

        <TransitionSeries.Sequence
          durationInFrames={SCENES.s8.durationInFrames}
          premountFor={30}
        >
          <Scene8Closer />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
