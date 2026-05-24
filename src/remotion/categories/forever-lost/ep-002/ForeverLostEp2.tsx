import { AbsoluteFill, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { T, SCENES, C, TOTAL_FRAMES, ASSET_PATH } from "./constants";
import { Intro, SCENE_DURATION as INTRO_DURATION } from "./scenes/intro";
import { Scene1Hook } from "./scenes/scene1-hook";
import { Scene2Stats } from "./scenes/scene2-stats";
import { Scene3Corium } from "./scenes/scene3-corium";
import { MG02RadiationChart } from "./components/MG02RadiationChart";
import { MG03ReactorDiagram } from "./components/MG03ReactorDiagram";

const ScenePlaceholder = ({ label }: { label: string }) => (
  <AbsoluteFill className="bg-ash items-center justify-center">
    <div className="font-inter text-4xl font-bold text-white/40">{label}</div>
  </AbsoluteFill>
);

function interpolateLocal(
  f: number,
  s: number,
  e: number,
  from: number,
  to: number,
): number {
  const p = Math.min(1, Math.max(0, (f - s) / (e - s)));
  return from + (to - from) * p;
}

export const ForeverLostEp2 = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {/* <Audio
        src={staticFile(`${ASSET_PATH}/audio/bgm/ep02_bgm.mp3`)}
        volume={(f) => {
          if (f < 450) return 0.12;
          if (f < 1050) return 0.15;
          if (f < 2400) return interpolateLocal(f, 1050, 2400, 0.15, 0.3);
          if (f < 4800) return 0.3;
          if (f < 6600) return 0.2;
          if (f < 8400) return 0.25;
          return Math.max(0, interpolateLocal(f, 8400, 9600, 0.25, 0));
        }}
        loop
      /> */}

      <TransitionSeries>
        {/* INTRO */}
        <TransitionSeries.Sequence
          durationInFrames={INTRO_DURATION}
          premountFor={30}
        >
          <Intro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T.fade })}
        />

        {/* SCENE 1 */}
        <TransitionSeries.Sequence
          durationInFrames={SCENES.s1.durationInFrames}
          premountFor={30}
        >
          <Scene1Hook />
        </TransitionSeries.Sequence>
        {/* Note: MG01Timeline is technically part of the SCENE 1 hook, but we want to start it at a specific frame (570) to sync with the audio. */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T.fade })}
        />

        {/* SCENE 2 */}
        <TransitionSeries.Sequence
          durationInFrames={SCENES.s2.durationInFrames}
          premountFor={30}
        >
          <Scene2Stats />
        </TransitionSeries.Sequence>

        {/* MG-02 RADIATION CHART */}
        <TransitionSeries.Sequence
          durationInFrames={SCENES.mg02.durationInFrames}
          premountFor={30}
        >
          <MG02RadiationChart />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T.fade })}
        />

        {/* SCENE 3 */}
        <TransitionSeries.Sequence
          durationInFrames={SCENES.s3.durationInFrames}
          premountFor={30}
        >
          <Scene3Corium />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T.slide })}
        />

        {/* MG-03 REACTOR DIAGRAM */}
        <TransitionSeries.Sequence
          durationInFrames={SCENES.mg03.durationInFrames}
          premountFor={30}
        >
          <MG03ReactorDiagram />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T.fade })}
        />

        {/* SCENE 4 */}
        <TransitionSeries.Sequence
          durationInFrames={SCENES.s4.durationInFrames}
          premountFor={30}
        >
          <ScenePlaceholder label="S4 · The Cage Cannot Be Opened" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-top" })}
          timing={linearTiming({ durationInFrames: T.wipe })}
        />

        {/* MG-04 COST CHART */}
        <TransitionSeries.Sequence
          durationInFrames={SCENES.mg04.durationInFrames}
          premountFor={30}
        >
          <ScenePlaceholder label="MG·04 · Cost Chart" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T.fade })}
        />

        {/* SCENE 5 */}
        <TransitionSeries.Sequence
          durationInFrames={SCENES.s5.durationInFrames}
          premountFor={30}
        >
          <ScenePlaceholder label="S5 · The Liquidators" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: T.slide })}
        />

        {/* MG-05 LIQUIDATOR STATS */}
        <TransitionSeries.Sequence
          durationInFrames={SCENES.mg05.durationInFrames}
          premountFor={30}
        >
          <ScenePlaceholder label="MG·05 · Liquidator Stats" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T.fade })}
        />

        {/* SCENE 6 */}
        <TransitionSeries.Sequence
          durationInFrames={SCENES.s6.durationInFrames}
          premountFor={30}
        >
          <ScenePlaceholder label="S6 · The Exclusion Zone" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T.wipe })}
        />

        {/* MG-06 HALF LIFE */}
        <TransitionSeries.Sequence
          durationInFrames={SCENES.mg06.durationInFrames}
          premountFor={30}
        >
          <ScenePlaceholder label="MG·06 · Half Life" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T.fade })}
        />

        {/* SCENE 7 */}
        <TransitionSeries.Sequence
          durationInFrames={SCENES.s7.durationInFrames}
          premountFor={30}
        >
          <ScenePlaceholder label="S7 · A 20,000-Year Promise" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T.fade })}
        />

        {/* OUTRO */}
        <TransitionSeries.Sequence
          durationInFrames={SCENES.outro.durationInFrames}
          premountFor={30}
        >
          <ScenePlaceholder label="OUTRO · Subscribe / End Card" />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

export { TOTAL_FRAMES };
