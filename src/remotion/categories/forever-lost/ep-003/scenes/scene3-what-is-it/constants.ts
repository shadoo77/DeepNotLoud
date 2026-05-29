import transcriptData from "./transcript_scene3.json";

const FPS = 30;
const lastEndMs = transcriptData[transcriptData.length - 1]?.endMs ?? 75000;

export const TRASCRIPT_DATA = transcriptData;
export const VO_START_FRAME = 60;
export const SCENE_DURATION =
  VO_START_FRAME + Math.ceil((lastEndMs / 1000) * FPS) + FPS;
