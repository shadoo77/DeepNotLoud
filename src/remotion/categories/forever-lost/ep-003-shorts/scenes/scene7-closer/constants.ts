import transcriptData from "./transcript_scene7.json";

const FPS = 30;
const lastEndMs = transcriptData[transcriptData.length - 1]?.endMs ?? 18000;

export const TRASCRIPT_DATA = transcriptData;
export const VO_START_FRAME = 0;
export const SCENE_DURATION = Math.ceil((lastEndMs / 1000) * FPS) + FPS;
