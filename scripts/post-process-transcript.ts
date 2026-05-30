/**
 * Post-processes a Whisper-generated transcript:
 * 1. Merge split words (from line breaks/timing cuts)
 * 2. Cross-reference with source script for corrections
 * 3. Merge punctuation into preceding tokens
 *
 * Usage: npx tsx scripts/post-process-transcript.ts <transcript.json>
 */

import fs from "fs/promises";
import path from "path";

// === Types ===
type TranscriptEntry = {
  text: string;
  startMs: number;
  endMs: number;
  timestampMs: number;
  confidence: number;
};

// === Helpers ===

/** Count syllables in a word (for proportional timing) */
function countSyllables(word: string): number {
  const clean = word.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (clean.length === 0) return 1;
  let count = 0;
  const vowels = "aeiouy";
  let prevVowel = false;
  for (const char of clean) {
    const isVowel = vowels.includes(char);
    if (isVowel && !prevVowel) count++;
    prevVowel = isVowel;
  }
  return Math.max(1, count);
}

/** Merge standalone punctuation into the preceding token's text */
function mergePunctuation(entries: TranscriptEntry[]): TranscriptEntry[] {
  const result: TranscriptEntry[] = [];
  for (let i = 0; i < entries.length; i++) {
    const token = entries[i];
    const trimmed = token.text.trim();

    // If this is a standalone punctuation token
    if (trimmed.match(/^[.,!?;:]$/)) {
      // Drop zero-duration punctuation
      if (token.startMs === token.endMs) continue;

      // Merge into previous token if it exists
      const prev = result.length > 0 ? result[result.length - 1] : null;
      if (prev) {
        result[result.length - 1] = {
          ...prev,
          text: prev.text + trimmed,
          endMs: token.endMs,
        };
      } else {
        result.push({ ...token });
      }
    } else {
      result.push({ ...token });
    }
  }
  return result;
}

// =============================================================

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error(
      "Usage: npx tsx scripts/post-process-transcript.ts <transcript.json>",
    );
    process.exit(1);
  }

  const transcriptPath = path.resolve(args[0]);
  const raw = await fs.readFile(transcriptPath, "utf-8");
  const entries: TranscriptEntry[] = JSON.parse(raw);

  console.log(`Loaded ${entries.length} entries from ${transcriptPath}\n`);

  let fixedSplits = 0;
  let sourceCorrections = 0;

  // =========================================================
  // STEP 1: Merge split words
  //
  // Fix word splits from line breaks/timing cuts:
  //   "for" + "ger" → "forger"
  //   "convinc" + "ingly" → "convincingly"
  //   "language" + "-" + "like" → "language-like"
  //   "Esper" + "anto" → "Esperanto"
  //   "Franc" + "isc" + "an" → "Franciscan"
  //   "fri" + "ar" → "friar"
  // =========================================================
  const step1: TranscriptEntry[] = [];
  let i = 0;

  while (i < entries.length) {
    const cur = entries[i];

    // " for" + "ger" → " forger"
    if (
      i + 1 < entries.length &&
      cur.text === " for" &&
      entries[i + 1].text === "ger"
    ) {
      step1.push({
        ...cur,
        text: " forger",
        endMs: entries[i + 1].endMs,
      });
      i += 2;
      fixedSplits++;
      continue;
    }

    // " convinc" + "ingly" → " convincingly"
    if (
      i + 1 < entries.length &&
      cur.text === " convinc" &&
      entries[i + 1].text === "ingly"
    ) {
      step1.push({
        ...cur,
        text: " convincingly",
        endMs: entries[i + 1].endMs,
      });
      i += 2;
      fixedSplits++;
      continue;
    }

    // " Esper" + "anto" → " Esperanto"
    if (
      i + 1 < entries.length &&
      cur.text === " Esper" &&
      entries[i + 1].text === "anto"
    ) {
      step1.push({
        ...cur,
        text: " Esperanto",
        endMs: entries[i + 1].endMs,
      });
      i += 2;
      fixedSplits++;
      continue;
    }

    // " Franc" + "isc" + "an" → " Franciscan"
    if (
      i + 2 < entries.length &&
      cur.text === " Franc" &&
      entries[i + 1].text === "isc" &&
      entries[i + 2].text === "an"
    ) {
      step1.push({
        ...cur,
        text: " Franciscan",
        endMs: entries[i + 2].endMs,
      });
      i += 3;
      fixedSplits++;
      continue;
    }

    // " fri" + "ar" → " friar"
    if (
      i + 1 < entries.length &&
      cur.text === " fri" &&
      entries[i + 1].text === "ar"
    ) {
      step1.push({
        ...cur,
        text: " friar",
        endMs: entries[i + 1].endMs,
      });
      i += 2;
      fixedSplits++;
      continue;
    }

    // " language" + "-" + "like" → " language-like"
    if (
      i + 2 < entries.length &&
      cur.text === " language" &&
      entries[i + 1].text === "-" &&
      entries[i + 2].text === "like"
    ) {
      step1.push({
        ...cur,
        text: " language-like",
        endMs: entries[i + 2].endMs,
      });
      i += 3;
      fixedSplits++;
      continue;
    }

    step1.push({ ...cur });
    i++;
  }

  console.log(`Step 1: ${fixedSplits} split word fixes`);
  console.log(`  Entries: ${entries.length} → ${step1.length}`);

  // =========================================================
  // STEP 2: Source script corrections
  //
  // Cross-reference against the source TRANSCRIPT block:
  //
  // Source corrections:
  //   1. "600" + "gay" + "n" + "uggets" → "six" + "hundred" + "gold" + "ducats"
  //      (source: "six hundred gold ducats")
  //   2. "Rudolph" → "Rudolf"
  //      (source: "Rudolf the Second")
  //   3. "II" → "the" + "Second"
  //      (source: "Rudolf the Second")
  //   4. "D" → "Dee"
  //      (source: "John Dee")
  //   5. "I" (after Elizabeth) → "the" + "First"
  //      (source: "Queen Elizabeth the First")
  //   6. "a" (in "even a fictional") → "if"
  //      (source: "even if fictional")
  //   7. "In" (theory 5) → "And"
  //      (source: "And theory five")
  //   8. Missing "only they understood" at end
  //      (source: "in a cipher only they understood")
  // =========================================================

  const step2: TranscriptEntry[] = [];
  i = 0;

  while (i < step1.length) {
    const cur = step1[i];

    // --- Correction 1: "600" + "gay" + "n" + "uggets" → "six hundred gold ducats" ---
    if (
      i + 3 < step1.length &&
      cur.text === " 600" &&
      step1[i + 1].text === " gay" &&
      step1[i + 2].text === " n" &&
      step1[i + 3].text === "uggets"
    ) {
      const first = cur;
      const last = step1[i + 3];
      const totalMs = last.endMs - first.startMs; // 21730 - 20170 = 1560
      const wordSyls = [
        { text: " six", syl: countSyllables("six") },
        { text: " hundred", syl: countSyllables("hundred") },
        { text: " gold", syl: countSyllables("gold") },
        { text: " ducats", syl: countSyllables("ducats") },
      ];
      const totalSyls = wordSyls.reduce((s, w) => s + w.syl, 0);
      const perSylMs = totalMs / totalSyls;

      let cursor = first.startMs;
      for (const w of wordSyls) {
        const dur = Math.round(perSylMs * w.syl);
        step2.push({
          text: w.text,
          startMs: cursor,
          endMs: cursor + dur,
          timestampMs: cursor + Math.round(dur / 2),
          confidence: cur.confidence,
        });
        cursor += dur;
      }
      i += 4;
      sourceCorrections++;
      console.log(
        `  Corrected: "600"+"gay"+"n"+"uggets" → "six hundred gold ducats"`,
      );
      continue;
    }

    // --- Correction 2: " Rudolph" → " Rudolf" ---
    if (cur.text === " Rudolph") {
      step2.push({ ...cur, text: " Rudolf" });
      i++;
      sourceCorrections++;
      continue;
    }

    // --- Correction 3: " II" → " the" + " Second" ---
    if (cur.text === " II") {
      const totalMs = cur.endMs - cur.startMs; // 160ms
      const wordSyls = [
        { text: " the", syl: countSyllables("the") },
        { text: " Second", syl: countSyllables("Second") },
      ];
      const totalSyls = wordSyls.reduce((s, w) => s + w.syl, 0);
      const perSylMs = totalMs / totalSyls;

      let cursor = cur.startMs;
      for (const w of wordSyls) {
        const dur = Math.round(perSylMs * w.syl);
        step2.push({
          text: w.text,
          startMs: cursor,
          endMs: cursor + dur,
          timestampMs: cursor + Math.round(dur / 2),
          confidence: cur.confidence,
        });
        cursor += dur;
      }
      i++;
      sourceCorrections++;
      console.log(`  Corrected: "II" → "the" + "Second"`);
      continue;
    }

    // --- Correction 4: " D" → " Dee" ---
    if (cur.text === " D") {
      step2.push({ ...cur, text: " Dee" });
      i++;
      sourceCorrections++;
      continue;
    }

    // --- Correction 5: " I" (after Elizabeth) → " the" + " First" ---
    if (
      cur.text === " I" &&
      i > 0 &&
      step1[i - 1].text === " Elizabeth"
    ) {
      const totalMs = cur.endMs - cur.startMs; // ~70ms
      const wordSyls = [
        { text: " the", syl: countSyllables("the") },
        { text: " First", syl: countSyllables("First") },
      ];
      const totalSyls = wordSyls.reduce((s, w) => s + w.syl, 0);
      const perSylMs = totalMs / totalSyls;

      let cursor = cur.startMs;
      for (const w of wordSyls) {
        const dur = Math.round(perSylMs * w.syl);
        step2.push({
          text: w.text,
          startMs: cursor,
          endMs: cursor + dur,
          timestampMs: cursor + Math.round(dur / 2),
          confidence: cur.confidence,
        });
        cursor += dur;
      }
      i++;
      sourceCorrections++;
      console.log(`  Corrected: "I" (after Elizabeth) → "the" + "First"`);
      continue;
    }

    // --- Correction 6: " a" ("even a fictional") → " if" ---
    if (
      cur.text === " a" &&
      i > 0 &&
      step1[i - 1].text === " even" &&
      i + 1 < step1.length &&
      step1[i + 1].text === " fictional"
    ) {
      step2.push({ ...cur, text: " if" });
      i++;
      sourceCorrections++;
      console.log(`  Corrected: "a" → "if" ("even if fictional")`);
      continue;
    }

    // --- Correction 7: " In" (theory 5) → " And" ---
    if (
      cur.text === " In" &&
      i + 1 < step1.length &&
      step1[i + 1].text === " theory"
    ) {
      step2.push({ ...cur, text: " And" });
      i++;
      sourceCorrections++;
      console.log(`  Corrected: "In" → "And"`);
      continue;
    }

    // --- Correction 8: Add missing "only they understood" at end ---
    // Check: last few entries are "... in a cipher ." -> source says "in a cipher only they understood."
    if (
      i === step1.length - 1 &&
      cur.text === " cipher" &&
      i > 0 &&
      step1[i - 1].text === " a"
    ) {
      // Found "cipher" as the second-to-last word before ".".
      // Actually, let's look for " cipher" near the end. The "." is a separate entry.
      // so the sequence is "... a" + " cipher" + "."
      // Push current " cipher" entry, then add " only", " they", " understood"
      const audioEnd = 100000; // 100s
      const remaining = audioEnd - cur.endMs;

      // Check if "." follows
      let dotEntry: TranscriptEntry | null = null;
      if (i + 1 < step1.length && step1[i + 1].text === ".") {
        dotEntry = step1[i + 1];
      }

      step2.push({ ...cur });

      const words = [" only", " they", " understood"];
      const syls = words.map(countSyllables);
      const totalSyls = syls.reduce((a, b) => a + b, 0);

      // Use remaining audio time for these words
      let cursor = cur.endMs;
      const perSylMs = remaining / totalSyls;

      for (let w = 0; w < words.length; w++) {
        const dur = Math.round(perSylMs * syls[w]);
        const end = Math.min(cursor + dur, audioEnd);
        step2.push({
          text: words[w],
          startMs: cursor,
          endMs: end,
          timestampMs: cursor + Math.round((end - cursor) / 2),
          confidence: 0.5,
        });
        cursor = end;
      }

      // If there was a trailing ".", append it to "understood" to keep punctuation
      if (dotEntry && dotEntry.startMs === dotEntry.endMs) {
        // zero-duration, skip
      } else if (dotEntry) {
        step2[step2.length - 1] = {
          ...step2[step2.length - 1],
          text: step2[step2.length - 1].text + ".",
          endMs: dotEntry.endMs,
        };
      }

      i++;
      if (dotEntry) i++; // skip the "." if it was there
      sourceCorrections++;
      console.log(`  Added missing: "only" + "they" + "understood"`);
      continue;
    }

    step2.push({ ...cur });
    i++;
  }

  console.log(`Step 2: ${sourceCorrections} source corrections`);
  console.log(`  Entries: ${step1.length} → ${step2.length}`);

  // =========================================================
  // STEP 3: Merge punctuation
  // =========================================================
  const step3 = mergePunctuation(step2);
  const punctMerged = step2.length - step3.length;
  console.log(`Step 3: ${-punctMerged} punctuation tokens merged (or dropped)`);
  console.log(`  Entries: ${step2.length} → ${step3.length}`);

  // =========================================================
  // WRITE OUTPUT
  // =========================================================
  await fs.writeFile(transcriptPath, JSON.stringify(step3, null, 2));
  console.log(`\n✅ Final transcript written to ${transcriptPath}`);
  console.log(`\n=== SUMMARY ===`);
  console.log(`Split words fixed:     ${fixedSplits}`);
  console.log(`Punctuation merged:    ${-(step2.length - step3.length)}`);
  console.log(`Source corrections:    ${sourceCorrections}`);
  console.log(`Total entries:         ${entries.length} → ${step3.length}`);
}

main().catch(console.error);
