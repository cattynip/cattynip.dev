import fs from "fs";
import buildPages from "./utils/buildPages";
import buildImages from "./utils/buildImages";

async function build() {
  fs.rmSync("./dist", { recursive: true, force: true });

  await buildPages();

  await Bun.build({
    entrypoints: ["./src/index.ts"],
    outdir: "./dist/scripts",
    minify: true
  });

  await buildImages();
}

await build();
