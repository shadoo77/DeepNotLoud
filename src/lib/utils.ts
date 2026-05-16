import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TranscriptEntry } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper to get both the start frame and the exact duration of a spoken phrase
export const getPhraseFrames = ({
  phrase,
  transcriptData,
  fps,
  bufferFrames = 8,
  voiceOverStartFrame = 0,
}: {
  phrase: string;
  transcriptData: TranscriptEntry[];
  fps: number;
  bufferFrames?: number;
  voiceOverStartFrame?: number;
}) => {
  const normalizeText = (t: string) =>
    t
      .toLowerCase()
      .replace(/[.,!?'",]/g, "") // also strip commas so "52,000" → "52000"
      .replace(/-/g, " ")
      .trim();

  // Expand every transcript entry into individual word-tokens, preserving
  // the original entry's timing on every token it produced.
  // " five-ton"  →  [{ text:"five", startMs, endMs }, { text:"ton", startMs, endMs }]
  // "52,000"     →  [{ text:"52000", startMs, endMs }]
  const flatTokens = transcriptData.flatMap((entry) => {
    const words = normalizeText(entry.text).split(/\s+/).filter(Boolean);
    return words.map((word) => ({ ...entry, text: word }));
  });

  // Normalize the search phrase the same way
  const parts = normalizeText(phrase).split(/\s+/).filter(Boolean);

  // Search entirely within flatTokens — indices are now consistent
  let startIdx = -1;
  for (let i = 0; i <= flatTokens.length - parts.length; i++) {
    const match = parts.every((part, pi) => flatTokens[i + pi].text === part);
    if (match) {
      startIdx = i;
      break;
    }
  }

  if (startIdx === -1) {
    console.warn(`[getPhraseFrames] No match for phrase: "${phrase}"`);
    return { from: 0, duration: fps };
  }

  const startWord = flatTokens[startIdx];
  const endWord = flatTokens[startIdx + parts.length - 1];

  const startFrame =
    Math.round((startWord.startMs / 1000) * fps) + voiceOverStartFrame;
  const endFrame =
    Math.round((endWord.endMs / 1000) * fps) + voiceOverStartFrame;

  return {
    from: startFrame,
    duration: Math.max(1, endFrame - startFrame + bufferFrames),
  };
};
