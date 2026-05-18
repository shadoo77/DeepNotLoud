import transcriptAct1 from "./acts/transcript_act1.json";
import transcriptAct2 from "./acts/transcript_act2.json";
import transcriptAct3 from "./acts/transcript_act3.json";

export const FPS = 30;
export const VO_START_FRAME = 60;

export const TRASCRIPT_DATA_ACT1 = transcriptAct1;
export const TRASCRIPT_DATA_ACT2 = transcriptAct2;
export const TRASCRIPT_DATA_ACT3 = transcriptAct3;

const lastEndMs1 = transcriptAct1[transcriptAct1.length - 1]?.endMs ?? 0;
const lastEndMs2 = transcriptAct2[transcriptAct2.length - 1]?.endMs ?? 0;
const lastEndMs3 = transcriptAct3[transcriptAct3.length - 1]?.endMs ?? 0;

export const ACT1_DURATION =
  VO_START_FRAME + Math.ceil((lastEndMs1 / 1000) * FPS) + FPS;
export const ACT2_DURATION =
  VO_START_FRAME + Math.ceil((lastEndMs2 / 1000) * FPS) + FPS;
export const ACT3_DURATION =
  VO_START_FRAME + Math.ceil((lastEndMs3 / 1000) * FPS) + FPS;
