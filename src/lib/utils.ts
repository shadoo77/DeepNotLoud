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
  const parts = phrase.toLowerCase().split(/\s+/);
  let startIdx = -1;

  // Find the starting index of the phrase in the transcript array
  for (let i = 0; i < transcriptData.length - parts.length + 1; i++) {
    const match = parts.every((part, pi) => {
      const text = transcriptData[i + pi].text
        .toLowerCase()
        .replace(/[.,!?]/g, "")
        .trim();
      return text === part;
    });
    if (match) {
      startIdx = i;
      break;
    }
  }

  if (startIdx === -1) return { from: 0, duration: fps }; // Fallback

  const startWord = transcriptData[startIdx];
  const endWord = transcriptData[startIdx + parts.length - 1];

  // Calculate start and end based on Whisper timestamps
  const startFrame =
    Math.round((startWord.startMs / 1000) * fps) + voiceOverStartFrame;

  // UPDATED LINE: Use endWord.endMs directly instead of startMs + durationMs
  const endFrame =
    Math.round((endWord.endMs / 1000) * fps) + voiceOverStartFrame;

  return {
    from: startFrame,
    // Add a small buffer (e.g., 8 frames) so the text lingers slightly after the word is spoken
    // Math.max ensures we never accidentally pass 0 or a negative duration to a Remotion Sequence
    duration: Math.max(1, endFrame - startFrame + bufferFrames),
  };
};
