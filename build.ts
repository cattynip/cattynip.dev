import fs from "fs";

async function build() {
  fs.unlink("./dist", () => {});

  const buildOutput = await Bun.build({
    entrypoints: ["./src/index.html"],
    outdir: "./dist",
    minify: true
  });

  if (buildOutput.outputs.length !== 2) return;

  const compiledHTML = buildOutput.outputs.find(
    currentFile => currentFile.kind === "asset"
  );

  if (!compiledHTML) return;

  const HTMLFilePath = compiledHTML.path;
  const distDirectory = HTMLFilePath.substring(
    0,
    HTMLFilePath.lastIndexOf("/") + 1
  );
  const newHTMLFilePath = distDirectory + "index.html";
  const indexJSFilePath = distDirectory + "index.js";

  fs.rename(HTMLFilePath, newHTMLFilePath, () => {});
  fs.unlink(indexJSFilePath, () => {});

  await Bun.build({
    entrypoints: ["./src/index.ts"],
    outdir: "./dist",
    minify: true
  });
}

await build();
