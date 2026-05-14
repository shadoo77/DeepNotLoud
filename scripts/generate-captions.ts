import {
  transcribe,
  toCaptions,
  downloadWhisperModel,
  installWhisperCpp,
} from "@remotion/install-whisper-cpp";
import fs from "fs/promises";
import path from "path";
import { execSync } from "child_process";

const WHISPER_VERSION = "1.5.5";
const MODEL = "base.en";

async function ensureWhisper() {
  const whisperDir = path.join(process.cwd(), "whisper.cpp");
  console.info("Installing Whisper.cpp...");
  await installWhisperCpp({ to: whisperDir, version: WHISPER_VERSION });
  console.info("Downloading Whisper model...");
  await downloadWhisperModel({ model: MODEL, folder: whisperDir });
  return whisperDir;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error(
      "Usage: npx tsx scripts/generate-captions.ts <input.wav> <output.json>",
    );
    process.exit(1);
  }

  const inputPath = path.resolve(args[0]);
  const outputPath = path.resolve(args[1]);
  const resampledPath = inputPath.replace(/\.\w+$/, "_16khz.wav");
  const whisperPath = await ensureWhisper();

  console.info(`Resampling ${inputPath} to 16kHz...`);
  execSync(`ffmpeg -y -i "${inputPath}" -ar 16000 "${resampledPath}"`, {
    stdio: "inherit",
  });

  console.info("Transcribing...");
  const whisperCppOutput = await transcribe({
    model: MODEL,
    whisperPath,
    whisperCppVersion: WHISPER_VERSION,
    inputPath: resampledPath,
    tokenLevelTimestamps: true,
  });

  const { captions } = toCaptions({ whisperCppOutput });

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(captions, null, 2));

  await fs.unlink(resampledPath);

  console.info(`Captions written to ${outputPath}`);
}

main().catch(console.error);
