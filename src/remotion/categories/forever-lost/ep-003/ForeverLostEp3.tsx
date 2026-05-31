import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SCENES, T, ASSET_PATH } from "./constants";
import { Scene1Intro } from "./scenes/scene1-intro";
import { Scene2Discovery } from "./scenes/scene2-discovery";
import { Scene3WhatIsIt } from "./scenes/scene3-what-is-it";
import { Scene4Stats } from "./scenes/scene4-stats";
import { Scene5Language } from "./scenes/scene5-language";
import { Scene6Attempts } from "./scenes/scene6-attempts";
import { Scene7Theories } from "./scenes/scene7-theories";
import { Scene8Closer } from "./scenes/scene8-closer";

const S1 = SCENES.s1.durationInFrames;
const S5 = S1 + T.fade + SCENES.s2.durationInFrames + T.fade + SCENES.s3.durationInFrames + T.fade + SCENES.s4.durationInFrames;
const S6 = S5 + T.fade + SCENES.s5.durationInFrames;
const S7 = S6 + T.fade + SCENES.s6.durationInFrames;
const TOTAL = S7 + T.fade + SCENES.s7.durationInFrames + T.fade + SCENES.s8.durationInFrames;
export { TOTAL as TOTAL_FRAMES };

const BgmAudio = () => {
  const f = useCurrentFrame();
  const LOOP = 2641;
  const pos = f % LOOP;
  const loopFadeOut = pos > LOOP - 90 ? (LOOP - pos) / 90 : 1;
  const loopFadeIn = pos < 30 ? pos / 30 : 1;

  let sceneVolume;
  if (f < 1554) sceneVolume = 0.18;
  else if (f < 12834) sceneVolume = 0.12;
  else if (f < 16277) sceneVolume = 0.10;
  else if (f < 19557) sceneVolume = 0.08;
  else sceneVolume = 0.22;

  const FINAL_FADE_START = 21876 - 180;
  const finalFadeOut = f > FINAL_FADE_START ? Math.max(0, (21876 - f) / 180) : 1;
  const computedVolume = sceneVolume * Math.min(loopFadeOut, loopFadeIn) * finalFadeOut;

  return (
    <Audio
      src={staticFile(`${ASSET_PATH}/audio/bgm/ep003_bgm_landscape.mp3`)}
      volume={computedVolume}
      loop
    />
  );
};

export const ForeverLostEp3 = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      <BgmAudio />
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
