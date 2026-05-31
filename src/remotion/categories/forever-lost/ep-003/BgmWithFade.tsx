import { interpolate, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { SCENES, T, ASSET_PATH, BGM_LOOP_DURATION } from "./constants";

const LOOP_DURATION = BGM_LOOP_DURATION;
const LOOP_FADE_IN = 30;
const LOOP_FADE_OUT = 90;
const FINAL_FADE = 180;

const S1 = SCENES.s1.durationInFrames;
const S2 = SCENES.s2.durationInFrames;
const S3 = SCENES.s3.durationInFrames;
const S4 = SCENES.s4.durationInFrames;
const S5 = SCENES.s5.durationInFrames;
const S6 = SCENES.s6.durationInFrames;
const S7 = SCENES.s7.durationInFrames;
const S8 = SCENES.s8.durationInFrames;

const B1 = S1;
const B2 = B1 + (S2 - T.fade) + (S3 - T.fade) + (S4 - T.fade);
const B3 = B2 + (S5 - T.fade);
const B4 = B3 + (S6 - T.fade);
const TOTAL = B4 + (S7 - T.fade) + (S8 - T.fade);

export const BgmWithFade: React.FC = () => (
  <Audio
    src={staticFile(`${ASSET_PATH}/audio/bgm/ep003_bgm_landscape.mp3`)}
    volume={(f) => {
      let sceneVol: number;
      if (f < B1) sceneVol = 0.18;
      else if (f < B2) sceneVol = 0.12;
      else if (f < B3) sceneVol = 0.1;
      else if (f < B4) sceneVol = 0.08;
      else sceneVol = 0.22;

      const finalMul = interpolate(f, [TOTAL - FINAL_FADE, TOTAL], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

      const pos = f % LOOP_DURATION;
      const loopMul =
        pos > LOOP_DURATION - LOOP_FADE_OUT
          ? (LOOP_DURATION - pos) / LOOP_FADE_OUT
          : pos < LOOP_FADE_IN
            ? pos / LOOP_FADE_IN
            : 1;

      return sceneVol * finalMul * loopMul;
    }}
    loop
    loopVolumeCurveBehavior="extend"
  />
);
