import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { T, SCENES, TOTAL_FRAMES } from "./constants";
import { Intro, SCENE_DURATION as INTRO_DURATION } from "./scenes/intro";

const ScenePlaceholder = ({ label }: { label: string }) => (
  <AbsoluteFill className="bg-ash items-center justify-center">
    <div className="font-inter text-white/40 text-4xl font-bold">{label}</div>
  </AbsoluteFill>
);

export const ForeverLostEp2 = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={INTRO_DURATION}>
        <Intro />
      </TransitionSeries.Sequence>

      {/* Scene 1 — Hook */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: T.fade })}
      />
      <TransitionSeries.Sequence durationInFrames={SCENES.s1.durationInFrames}>
        <ScenePlaceholder label="S1 · April 26, 1986" />
      </TransitionSeries.Sequence>

      {/* MG 01 */}
      <TransitionSeries.Transition
        presentation={slide()}
        timing={linearTiming({ durationInFrames: T.slide })}
      />
      <TransitionSeries.Sequence durationInFrames={SCENES.mg01.durationInFrames}>
        <ScenePlaceholder label="MG·01 · The Explosion" />
      </TransitionSeries.Sequence>

      {/* Scene 2 */}
      <TransitionSeries.Transition
        presentation={wipe()}
        timing={linearTiming({ durationInFrames: T.wipe })}
      />
      <TransitionSeries.Sequence durationInFrames={SCENES.s2.durationInFrames}>
        <ScenePlaceholder label="S2 · What the Core Became" />
      </TransitionSeries.Sequence>

      {/* MG 02 */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: T.fade })}
      />
      <TransitionSeries.Sequence durationInFrames={SCENES.mg02.durationInFrames}>
        <ScenePlaceholder label="MG·02 · Physical Scale" />
      </TransitionSeries.Sequence>

      {/* Scene 3 */}
      <TransitionSeries.Transition
        presentation={slide()}
        timing={linearTiming({ durationInFrames: T.slide })}
      />
      <TransitionSeries.Sequence durationInFrames={SCENES.s3.durationInFrames}>
        <ScenePlaceholder label="S3 · Physically Inaccessible" />
      </TransitionSeries.Sequence>

      {/* MG 03 */}
      <TransitionSeries.Transition
        presentation={wipe()}
        timing={linearTiming({ durationInFrames: T.wipe })}
      />
      <TransitionSeries.Sequence durationInFrames={SCENES.mg03.durationInFrames}>
        <ScenePlaceholder label="MG·03 · The Elephant's Foot" />
      </TransitionSeries.Sequence>

      {/* Scene 4 */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: T.fade })}
      />
      <TransitionSeries.Sequence durationInFrames={SCENES.s4.durationInFrames}>
        <ScenePlaceholder label="S4 · The Cage Cannot Be Opened" />
      </TransitionSeries.Sequence>

      {/* MG 04 */}
      <TransitionSeries.Transition
        presentation={slide()}
        timing={linearTiming({ durationInFrames: T.slide })}
      />
      <TransitionSeries.Sequence durationInFrames={SCENES.mg04.durationInFrames}>
        <ScenePlaceholder label="MG·04 · The Sarcophagus" />
      </TransitionSeries.Sequence>

      {/* Scene 5 */}
      <TransitionSeries.Transition
        presentation={wipe()}
        timing={linearTiming({ durationInFrames: T.wipe })}
      />
      <TransitionSeries.Sequence durationInFrames={SCENES.s5.durationInFrames}>
        <ScenePlaceholder label="S5 · The Liquidators" />
      </TransitionSeries.Sequence>

      {/* MG 05 */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: T.fade })}
      />
      <TransitionSeries.Sequence durationInFrames={SCENES.mg05.durationInFrames}>
        <ScenePlaceholder label="MG·05 · Human Cost" />
      </TransitionSeries.Sequence>

      {/* Scene 6 */}
      <TransitionSeries.Transition
        presentation={slide()}
        timing={linearTiming({ durationInFrames: T.slide })}
      />
      <TransitionSeries.Sequence durationInFrames={SCENES.s6.durationInFrames}>
        <ScenePlaceholder label="S6 · The Exclusion Zone" />
      </TransitionSeries.Sequence>

      {/* MG 06 */}
      <TransitionSeries.Transition
        presentation={wipe()}
        timing={linearTiming({ durationInFrames: T.wipe })}
      />
      <TransitionSeries.Sequence durationInFrames={SCENES.mg06.durationInFrames}>
        <ScenePlaceholder label="MG·06 · Chernobyl Today" />
      </TransitionSeries.Sequence>

      {/* Scene 7 */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: T.fade })}
      />
      <TransitionSeries.Sequence durationInFrames={SCENES.s7.durationInFrames}>
        <ScenePlaceholder label="S7 · A 20,000-Year Promise" />
      </TransitionSeries.Sequence>

      {/* Outro */}
      <TransitionSeries.Transition
        presentation={slide()}
        timing={linearTiming({ durationInFrames: T.slide })}
      />
      <TransitionSeries.Sequence durationInFrames={SCENES.outro.durationInFrames}>
        <ScenePlaceholder label="OUTRO · Subscribe / End Card" />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

export {
  TOTAL_FRAMES,
  INTRO_DURATION as SCENE_DURATION,
};
