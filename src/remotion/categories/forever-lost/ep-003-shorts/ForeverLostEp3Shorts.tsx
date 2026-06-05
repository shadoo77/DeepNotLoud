import { AbsoluteFill, Sequence } from "remotion";
import { SCENES, TOTAL_FRAMES, T, C, ASSET_PATH } from "./constants";
import { Scene1Hook } from "./scenes/scene1-hook/Scene1Hook";
import { Scene2Discovery } from "./scenes/scene2-discovery/Scene2Discovery";
import { Scene3Stats } from "./scenes/scene3-stats/Scene3Stats";
import { Scene4Language } from "./scenes/scene4-language/Scene4Language";
import { Scene5Attempts } from "./scenes/scene5-attempts/Scene5Attempts";
import BgmWithFade from "@/components/atoms/BgmWithFade";
import { ManualCrossfadeTransition } from "@/components/atoms/transitions/ManualCrossfadeTransition";

export { TOTAL_FRAMES };

export const ForeverLostEp3Shorts: React.FC = () => {
  const s1From = 0;
  const s2From = s1From + SCENES.s1_hook.durationInFrames - T.fade;
  const s3From = s2From + SCENES.s2_discovery.durationInFrames - T.fade;
  const s4From = s3From + SCENES.s3_stats.durationInFrames - T.fade;
  const s5From = s4From + SCENES.s4_language.durationInFrames - T.fade;

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <BgmWithFade
        totalFrames={TOTAL_FRAMES}
        srcPath={`${ASSET_PATH}/audio/bgm/ep003_bgm_shorts.wav`}
        volume={0.15}
        fadeInFrames={21}
        loop={false}
      />

      <Sequence from={s1From} durationInFrames={SCENES.s1_hook.durationInFrames}>
        <ManualCrossfadeTransition
          durationInFrames={SCENES.s1_hook.durationInFrames}
          transitionInFrames={T.fade}
          fadeIn={false}
          fadeOut
        >
          <Scene1Hook />
        </ManualCrossfadeTransition>
      </Sequence>

      <Sequence from={s2From} durationInFrames={SCENES.s2_discovery.durationInFrames}>
        <ManualCrossfadeTransition
          durationInFrames={SCENES.s2_discovery.durationInFrames}
          transitionInFrames={T.fade}
          fadeIn
          fadeOut
        >
          <Scene2Discovery />
        </ManualCrossfadeTransition>
      </Sequence>

      <Sequence from={s3From} durationInFrames={SCENES.s3_stats.durationInFrames}>
        <ManualCrossfadeTransition
          durationInFrames={SCENES.s3_stats.durationInFrames}
          transitionInFrames={T.fade}
          fadeIn
          fadeOut
        >
          <Scene3Stats />
        </ManualCrossfadeTransition>
      </Sequence>

      <Sequence from={s4From} durationInFrames={SCENES.s4_language.durationInFrames}>
        <ManualCrossfadeTransition
          durationInFrames={SCENES.s4_language.durationInFrames}
          transitionInFrames={T.fade}
          fadeIn
          fadeOut
        >
          <Scene4Language />
        </ManualCrossfadeTransition>
      </Sequence>

      <Sequence from={s5From} durationInFrames={SCENES.s5_attempts.durationInFrames}>
        <ManualCrossfadeTransition
          durationInFrames={SCENES.s5_attempts.durationInFrames}
          transitionInFrames={T.fade}
          fadeIn
          fadeOut
        >
          <Scene5Attempts />
        </ManualCrossfadeTransition>
      </Sequence>
    </AbsoluteFill>
  );
};
