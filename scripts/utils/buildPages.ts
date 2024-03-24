  import fs from "fs";

  async function buildPages() {
    const buildOutput = await Bun.build({
      entrypoints: ["./pages/index.html"],
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
}

export default buildPages;
