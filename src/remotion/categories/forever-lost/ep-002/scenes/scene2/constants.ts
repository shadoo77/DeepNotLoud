import transcriptData from "./transcript_scene2.json";

const FPS = 30;

export const TRASCRIPT_DATA = transcriptData;

export const VO_START_FRAME = 60;

// Calculate Scene 1 length based on its voiceover
const scene1LastEndMs = transcriptData[transcriptData.length - 1]?.endMs ?? 0;
export const SCENE_DURATION =
  Math.ceil((scene1LastEndMs / 1000) * FPS) + FPS * 2; // +2 sec buffer
