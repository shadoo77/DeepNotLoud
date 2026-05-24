import { clsx, type ClassValue } from "clsx";
import { Caption } from "@remotion/captions";
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

// Utility to merge standalone punctuation tokens back into their neighboring word tokens
export function mergePunctuation(transcript: Caption[]): Caption[] {
  const result: Caption[] = [];
  for (let i = 0; i < transcript.length; i++) {
    const token = transcript[i];
    const trimmed = token.text.trim();

    if (trimmed.match(/^[.,!?;:]$/)) {
      const prev = result.length > 0 ? result[result.length - 1] : null;
      const next = i < transcript.length - 1 ? transcript[i + 1] : null;

      const isDecimal =
        trimmed === "." &&
        prev &&
        /\d$/.test(prev.text.trim()) &&
        next &&
        /^\d/.test(next.text.trim()) &&
        !next.text.startsWith(" ");

      if (isDecimal || prev) {
        result[result.length - 1] = {
          ...prev!,
          text: prev!.text + trimmed,
          endMs: token.endMs,
        };
      } else {
        result.push({ ...token });
      }
    } else {
      const prev = result.length > 0 ? result[result.length - 1] : null;
      if (
        prev &&
        /\.$/.test(prev.text.trim()) &&
        /^\d/.test(trimmed) &&
        !token.text.startsWith(" ")
      ) {
        result[result.length - 1] = {
          ...prev,
          text: prev.text + trimmed,
          endMs: token.endMs,
        };
      } else {
        result.push({ ...token });
      }
    }
  }
  return result;
}

// Utility to split a transcript into sentences, based on punctuation.
// This is used for the "sentence mode" in YouTubeCaptions,
// where we want to show one full sentence at a time instead of switching every few words.
export function splitIntoSentences(tokens: Caption[]): Caption[][] {
  const sentences: Caption[][] = [];
  let current: Caption[] = [];

  for (const token of tokens) {
    current.push(token);
    if (token.text.match(/[.!?]\s*$/) && !token.text.match(/^\d+\.[\d.]*$/)) {
      sentences.push(current);
      current = [];
    }
  }

  if (current.length > 0) {
    sentences.push(current);
  }

  return sentences;
}
