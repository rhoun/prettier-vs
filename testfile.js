import prettier from "./src/index.cjs";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function run() {
  const sampleFilePath = `${__dirname}/test.json`;

  try {
    const contents = await fs.readFile(sampleFilePath, "utf-8");
    const formatted = await prettier.format(contents, { parser: "json5", printWidth: 120 });
    await fs.writeFile(sampleFilePath.replace(".json", "-result.json"), formatted);
    console.log(`File ${sampleFilePath} formatted successfully!`);
  } catch (err) {
    console.error(err);
  }
}

run();
