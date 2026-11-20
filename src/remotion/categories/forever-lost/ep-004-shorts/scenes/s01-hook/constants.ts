import transcriptData from "./transcript_s01.json";
import { SHORTS_VO_OFFSETS } from "../../vo-offsets";
import { T } from "../../constants";

const FPS = 30;

export const TRASCRIPT_DATA = transcriptData;
export const VO_START_FRAME = 0;
export const SCENE_DURATION =
  Math.round(SHORTS_VO_OFFSETS.S02.startFromSec * FPS) -
  Math.round(SHORTS_VO_OFFSETS.S01.startFromSec * FPS) +
  T.fade;
